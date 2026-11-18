'use strict';

/* =========================================================
   Cloud sync with Supabase (talks to its REST API directly).
   - Sign in with email + password, all inside the app (no email
     links, which on iPhone would open Safari instead of the app).
   - Progress is stored as one JSON row per user.
   - Every sync pulls the cloud copy, merges it with this
     device's progress, saves locally and pushes the result.
   Uses globals from app.js: state, save, toast, render, view.
   ========================================================= */

const SB = self.WORLDLY_SUPABASE || {};
const syncEnabled = !!(SB.url && SB.anonKey);
const AUTH_KEY = 'worldly.auth';
const SYNC_META_KEY = 'worldly.sync';

let auth = readJSON(AUTH_KEY);
let syncMeta = readJSON(SYNC_META_KEY) || {};
let syncTimer = null, syncing = false, syncAgain = false, applyingRemote = false;

function readJSON(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
function writeJSON(k, v) { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } }

/* ---------------- merge two progress states ---------------- */
function mergeStates(a, b) {
  const out = JSON.parse(JSON.stringify(a || defaultState()));
  b = b || {};
  out.cards = out.cards || {}; out.history = out.history || {}; out.mapBest = out.mapBest || {}; out.factIdx = out.factIdx || {};

  // A reset on either device wipes everything answered before it.
  const resetAt = Math.max(out.resetAt || 0, b.resetAt || 0);
  if (resetAt) out.resetAt = resetAt;

  // Cards: keep whichever device answered the card most recently.
  for (const [k, v] of Object.entries(b.cards || {})) {
    const m = out.cards[k];
    if (!m || (v.last || 0) > (m.last || 0)) out.cards[k] = v;
  }
  for (const [d, n] of Object.entries(b.history || {})) out.history[d] = Math.max(out.history[d] || 0, n);
  if (b.streak && b.streak.last && (!out.streak || !out.streak.last || b.streak.last > out.streak.last ||
      (b.streak.last === out.streak.last && b.streak.count > out.streak.count))) out.streak = { ...b.streak };
  for (const [k, v] of Object.entries(b.mapBest || {})) {
    const m = out.mapBest[k];
    if (!m || v.score > m.score || (v.score === m.score && v.secs < m.secs)) out.mapBest[k] = v;
  }
  for (const [k, v] of Object.entries(b.factIdx || {})) out.factIdx[k] = Math.max(out.factIdx[k] || 0, v);

  if (resetAt) {
    const resetDay = todayStr(new Date(resetAt));
    for (const [k, v] of Object.entries(out.cards)) if ((v.last || 0) < resetAt) delete out.cards[k];
    for (const d of Object.keys(out.history)) if (d < resetDay) delete out.history[d];
    for (const [k, v] of Object.entries(out.mapBest)) if ((v.at || 0) < resetAt) delete out.mapBest[k];
    if (out.streak && out.streak.last && out.streak.last < resetDay) out.streak = { last: null, count: 0 };
  }
  // Settings are per device; keep this device's.
  out.settings = (a && a.settings) || out.settings;
  return out;
}

/* ---------------- Supabase REST helpers ---------------- */
async function sbFetch(path, { method = 'GET', body, token, headers = {} } = {}) {
  const res = await fetch(SB.url.replace(/\/$/, '') + path, {
    method,
    headers: {
      apikey: SB.anonKey,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }
  if (!res.ok) {
    const msg = (data && (data.msg || data.message || data.error_description || data.error)) || `Error ${res.status}`;
    const err = new Error(msg); err.status = res.status; throw err;
  }
  return data;
}

function storeSession(s) {
  auth = {
    access_token: s.access_token,
    refresh_token: s.refresh_token,
    expires_at: Date.now() + (s.expires_in || 3600) * 1000,
    user: { id: s.user.id, email: s.user.email },
  };
  writeJSON(AUTH_KEY, auth);
}

async function accessToken() {
  if (!auth) throw new Error('Not signed in');
  if (Date.now() > auth.expires_at - 60000) {
    try {
      storeSession(await sbFetch('/auth/v1/token?grant_type=refresh_token', { method: 'POST', body: { refresh_token: auth.refresh_token } }));
    } catch (e) {
      if (e.status === 400 || e.status === 401) { auth = null; writeJSON(AUTH_KEY, null); }
      throw e;
    }
  }
  return auth.access_token;
}

async function signIn(email, password) {
  storeSession(await sbFetch('/auth/v1/token?grant_type=password', { method: 'POST', body: { email, password } }));
}
async function signUp(email, password) {
  const r = await sbFetch('/auth/v1/signup', { method: 'POST', body: { email, password } });
  if (!r || !r.access_token) {
    throw new Error('Account created, but Supabase wants the email confirmed first. Turn off "Confirm email" in Supabase, or click the link in the email, then sign in.');
  }
  storeSession(r);
}
async function signOut() {
  try { await sbFetch('/auth/v1/logout', { method: 'POST', token: auth && auth.access_token }); } catch (e) { /* ignore */ }
  auth = null; writeJSON(AUTH_KEY, null);
  syncMeta = {}; writeJSON(SYNC_META_KEY, null);
}

/* ---------------- sync ---------------- */
function scheduleSync(delay = 3000) {
  if (!syncEnabled || !auth || applyingRemote) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(syncNow, delay);
}

async function syncNow({ quiet = true } = {}) {
  if (!syncEnabled || !auth) return false;
  if (!navigator.onLine) return false;
  if (syncing) { syncAgain = true; return false; }
  syncing = true;
  try {
    const token = await accessToken();
    const uid = auth.user.id;
    const rows = await sbFetch(`/rest/v1/progress?select=data&user_id=eq.${uid}`, { token });
    const remote = rows && rows[0] ? rows[0].data : null;
    const before = JSON.stringify(state);
    const merged = remote ? mergeStates(state, remote) : state;
    if (JSON.stringify(merged) !== before) {
      applyingRemote = true;
      state = merged; save();
      applyingRemote = false;
      refreshViewAfterSync();
    }
    // Push the merged progress (without per-device settings).
    const { settings, ...shared } = state;
    await sbFetch('/rest/v1/progress?on_conflict=user_id', {
      method: 'POST', token,
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: { user_id: uid, data: shared, updated_at: new Date().toISOString() },
    });
    syncMeta = { last: Date.now() }; writeJSON(SYNC_META_KEY, syncMeta);
    updateSyncStatus();
    return true;
  } catch (e) {
    syncMeta.error = e.message; updateSyncStatus();
    if (!quiet) toast('Sync failed: ' + e.message);
    return false;
  } finally {
    syncing = false;
    if (syncAgain) { syncAgain = false; scheduleSync(500); }
  }
}

// Re-draw the current screen with merged progress, but never interrupt a session or map quiz.
function refreshViewAfterSync() {
  if (session || (typeof mq !== 'undefined' && mq)) return;
  if (view.tab === 'study' || view.tab === 'browse') render();
}

if (syncEnabled) {
  window.addEventListener('online', () => scheduleSync(500));
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') scheduleSync(300); });
  if (auth) scheduleSync(300);
}

/* ---------------- Settings section ---------------- */
function timeAgo(t) {
  const sec = Math.round((Date.now() - t) / 1000);
  if (sec < 10) return 'just now';
  if (sec < 60) return `${sec} seconds ago`;
  if (sec < 3600) return `${Math.round(sec / 60)} min ago`;
  if (sec < 86400) return `${Math.round(sec / 3600)} h ago`;
  return new Date(t).toLocaleDateString();
}

function syncStatusText() {
  if (!navigator.onLine) return 'Offline. Changes will sync when you reconnect.';
  if (syncMeta.error) return `Last sync failed: ${syncMeta.error}`;
  return syncMeta.last ? `Last synced ${timeAgo(syncMeta.last)}` : 'Not synced yet';
}
function updateSyncStatus() {
  const el = document.getElementById('syncStatus');
  if (el) el.textContent = syncStatusText();
}

function syncSectionHtml() {
  if (!syncEnabled) return '';
  if (auth) {
    return `<h2>Sync</h2>
      <div class="list">
        <div class="setting"><div class="txt">Signed in as <b>${esc(auth.user.email)}</b><small id="syncStatus">${esc(syncStatusText())}</small></div></div>
      </div>
      <div class="stack" style="margin-top:10px">
        <button class="btn block" id="syncNow">Sync now</button>
        <button class="btn block" id="signOut">Sign out</button>
      </div>`;
  }
  return `<h2>Sync</h2>
    <p class="muted small" style="margin-top:-4px">Sign in with the same account on your laptop and phone to keep progress in sync. First time? Choose "Create account".</p>
    <form class="stack" id="signInForm">
      <input class="search" id="syncEmail" type="email" inputmode="email" placeholder="Email" autocomplete="username" required>
      <input class="search" id="syncPass" type="password" placeholder="Password (at least 6 characters)" autocomplete="current-password" minlength="6" required>
      <button class="btn primary block" type="submit" data-act="in">Sign in</button>
      <button class="btn block" type="submit" data-act="up">Create account</button>
    </form>`;
}

function bindSyncSection() {
  if (!syncEnabled) return;
  const b = id => document.getElementById(id);
  if (auth) {
    b('syncNow').onclick = async () => {
      b('syncNow').disabled = true;
      const ok = await syncNow({ quiet: false });
      if (ok) toast('Synced');
      if (b('syncNow')) b('syncNow').disabled = false;
    };
    b('signOut').onclick = async () => {
      if (!confirm('Sign out? Progress stays on this device but stops syncing.')) return;
      await signOut(); renderSettings();
    };
    return;
  }
  const form = b('signInForm');
  form.onsubmit = async e => {
    e.preventDefault();
    const act = (e.submitter && e.submitter.dataset.act) || 'in';
    const buttons = form.querySelectorAll('button');
    buttons.forEach(x => (x.disabled = true));
    try {
      const email = b('syncEmail').value.trim(), pass = b('syncPass').value;
      if (act === 'up') await signUp(email, pass); else await signIn(email, pass);
      toast(act === 'up' ? 'Account created. Syncing…' : 'Signed in. Syncing…');
      await syncNow({ quiet: false });
      renderSettings();
    } catch (err) {
      const msg = /invalid login credentials/i.test(err.message) ? 'Wrong email or password' : err.message;
      toast(msg || 'Something went wrong');
      buttons.forEach(x => (x.disabled = false));
    }
  };
}
