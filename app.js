'use strict';

/* =========================================================
   Worldly — learn countries, flags and capitals.
   Plain JS, no build step. Progress lives in localStorage.
   ========================================================= */

const MODES = {
  f2c:   { label: 'Flag → Country',    chip: 'Flags',          kind: 'Name this flag' },
  c2cap: { label: 'Country → Capital', chip: 'Capitals',       kind: 'Capital city' },
  cap2c: { label: 'Capital → Country', chip: 'Capital → Country', kind: 'Which country?' },
  c2f:   { label: 'Country → Flag',    chip: 'Pick the flag',  kind: 'Pick the flag' },
};
const MODE_KEYS = Object.keys(MODES);
const REGIONS = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'];

const DAY = 86400000;
const MIN = 60000;
// Interval after a correct answer, indexed by the box the card moves INTO.
const INTERVALS = [0, 1 * DAY, 2 * DAY, 4 * DAY, 8 * DAY, 16 * DAY, 32 * DAY, 64 * DAY, 120 * DAY];
const MAX_BOX = INTERVALS.length - 1;
const MASTERED_BOX = 4;   // 8+ day interval = mastered
const TYPE_FROM_BOX = 3;  // switch from multiple choice to typing at this box

const BY_CODE = Object.fromEntries(COUNTRIES.map(c => [c.code, c]));
const STORE_KEY = 'worldly.v1';

/* ---------------- storage ---------------- */
function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE_KEY));
    if (s && s.cards) return Object.assign(defaultState(), s);
  } catch (e) { /* ignore */ }
  return defaultState();
}
function defaultState() {
  return { cards: {}, streak: { last: null, count: 0 }, settings: { alwaysChoices: false, mode: 'mixed' }, history: {} };
}
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { toast('Could not save progress'); }
}
let state = loadState();

/* ---------------- helpers ---------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a, n) => shuffle(a.slice()).slice(0, n);
const flagSrc = code => `flags/${code}.svg`;
const flagImg = (code, cls = '', alt = '') => `<img class="flag ${cls}" src="${flagSrc(code)}" alt="${esc(alt)}" draggable="false">`;
const capList = c => c.capitals.join(', ');
const todayStr = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const cardKey = (code, mode) => `${code}:${mode}`;

function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

/* ---------------- answer matching ---------------- */
function norm(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\bsaint\b/g, 'st')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\bthe\b/g, ' ')
    .replace(/\s+/g, '');
}
function lev(a, b) {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}
/** Returns 'exact' | 'typo' | false.
 *  `wrong` = answers belonging to other countries; a typo match is rejected if the
 *  input is just as close to one of those (e.g. "Austria" for Australia). */
function matches(input, accepted, wrong = []) {
  const x = norm(input);
  if (!x) return false;
  let best = Infinity;
  for (const a of accepted) {
    const y = norm(a);
    if (x === y) return 'exact';
    const allowed = y.length <= 5 ? 0 : y.length <= 10 ? 1 : 2;
    const d = lev(x, y);
    if (d <= allowed) best = Math.min(best, d);
  }
  if (best === Infinity) return false;
  for (const w of wrong) if (lev(x, norm(w)) <= best) return false;
  return 'typo';
}
function wrongFor(c, mode) {
  return COUNTRIES.filter(o => o !== c).flatMap(o => acceptedFor(o, mode));
}
function acceptedFor(c, mode) {
  if (mode === 'c2cap') {
    const extra = c.capitals.concat(c.capAlt).flatMap(cap => /\bcity$/i.test(cap) ? [cap, cap.replace(/\s*city$/i, '')] : [cap]);
    return extra;
  }
  return [c.name, ...c.alt];
}

/* ---------------- spaced repetition ---------------- */
function getCard(code, mode) { return state.cards[cardKey(code, mode)]; }

function recordAnswer(code, mode, correct) {
  const k = cardKey(code, mode);
  const now = Date.now();
  const c = state.cards[k] || { b: 0, due: now, n: 0, ok: 0 };
  const isNew = c.n === 0;
  c.n++;
  if (correct) {
    c.ok++;
    // Knew it on first sight: skip ahead.
    c.b = Math.min(MAX_BOX, isNew ? 2 : c.b + 1);
    c.due = now + INTERVALS[c.b];
  } else {
    c.b = 1;
    c.due = now + 10 * MIN;
  }
  c.last = now;
  state.cards[k] = c;

  const today = todayStr();
  if (state.streak.last !== today) {
    const y = todayStr(new Date(Date.now() - DAY));
    state.streak.count = state.streak.last === y ? state.streak.count + 1 : 1;
    state.streak.last = today;
  }
  state.history[today] = (state.history[today] || 0) + 1;
  save();
}

function modesFor(modeSel) { return modeSel === 'mixed' ? MODE_KEYS : [modeSel]; }
function countriesIn(region) { return region === 'all' ? COUNTRIES : COUNTRIES.filter(c => c.region === region); }

function deckStats(region, modeSel) {
  const now = Date.now();
  let total = 0, mastered = 0, due = 0, seen = 0;
  for (const c of countriesIn(region)) {
    for (const m of modesFor(modeSel)) {
      total++;
      const s = getCard(c.code, m);
      if (!s) continue;
      seen++;
      if (s.b >= MASTERED_BOX) mastered++;
      if (s.due <= now) due++;
    }
  }
  return { total, mastered, due, seen, unseen: total - seen };
}

function buildSession(region, modeSel) {
  const now = Date.now();
  const due = [], fresh = [], rest = [];
  for (const c of countriesIn(region)) {
    for (const m of modesFor(modeSel)) {
      const s = getCard(c.code, m);
      const item = { code: c.code, mode: m };
      if (!s) fresh.push(item);
      else if (s.due <= now) due.push({ ...item, due: s.due });
      else rest.push({ ...item, b: s.b, due: s.due });
    }
  }
  // Every due card and every new card in the deck, in random order.
  let items = due.concat(fresh);
  let extra = false;
  if (!items.length) {
    // Everything is learned and nothing is due: practise the whole deck anyway.
    extra = true;
    items = rest;
  }
  return { items: shuffle(items.map(({ code, mode }) => ({ code, mode }))), extra };
}

/* ---------------- question generation ---------------- */
function distractors(c, mode, n = 3) {
  const valueOf = x => mode === 'c2cap' ? x.capitals[0] : mode === 'c2f' ? x.code : x.name;
  const mine = valueOf(c);
  const sameSub = COUNTRIES.filter(x => x !== c && x.sub === c.sub);
  const sameReg = COUNTRIES.filter(x => x !== c && x.region === c.region && x.sub !== c.sub);
  const others = COUNTRIES.filter(x => x !== c && x.region !== c.region);
  const out = [];
  const seen = new Set([mine]);
  const take = (pool, k) => {
    for (const x of shuffle(pool.slice())) {
      if (out.length >= n || k <= 0) break;
      const v = valueOf(x);
      if (seen.has(v)) continue;
      seen.add(v); out.push(x); k--;
    }
  };
  take(sameSub, 2);
  take(sameReg, n - out.length - 1);
  take(others, n - out.length);
  take(COUNTRIES, n - out.length);
  return out;
}

function makeQuestion(item) {
  const c = BY_CODE[item.code];
  const s = getCard(c.code, item.mode);
  const typed = item.mode !== 'c2f' && !state.settings.alwaysChoices && s && s.b >= TYPE_FROM_BOX;
  const q = { ...item, c, typed };
  if (!typed) q.options = shuffle([c, ...distractors(c, item.mode)]);
  return q;
}

/* ---------------- views ---------------- */
let view = { tab: 'study' };
let session = null;
const app = $('#app');

function setTab(tab) {
  view = { tab };
  session = null;
  if (typeof mapCleanup === 'function') mapCleanup();
  document.body.classList.remove('in-session');
  for (const b of document.querySelectorAll('.tabbar button')) b.classList.toggle('active', b.dataset.tab === tab);
  render();
  window.scrollTo(0, 0);
}
$('#tabbar').addEventListener('click', e => {
  const b = e.target.closest('button[data-tab]');
  if (b) setTab(b.dataset.tab);
});

function render() {
  if (session) return renderSession();
  if (view.tab === 'study') return renderHome();
  if (view.tab === 'map') return renderMap();
  if (view.tab === 'browse') return renderBrowse();
  if (view.tab === 'settings') return renderSettings();
}

/* ----- home ----- */
function renderHome() {
  const modeSel = state.settings.mode || 'mixed';
  const all = deckStats('all', modeSel);
  const overall = deckStats('all', 'mixed');
  const pct = Math.round(overall.mastered / overall.total * 100);
  const streak = state.streak.last === todayStr() || state.streak.last === todayStr(new Date(Date.now() - DAY)) ? state.streak.count : 0;
  const doneToday = state.history[todayStr()] || 0;

  const chips = [['mixed', 'Mixed'], ...MODE_KEYS.map(k => [k, MODES[k].chip])]
    .map(([k, l]) => `<button class="chip ${k === modeSel ? 'on' : ''}" data-mode="${k}">${esc(l)}</button>`).join('');

  const tile = (r, label) => {
    const st = deckStats(r, modeSel);
    const p = Math.round(st.mastered / st.total * 100);
    return `<button class="region ${r === 'all' ? 'all' : ''}" data-region="${esc(r)}">
      <div class="rn">${esc(label)}</div>
      <div class="bar"><span style="width:${p}%"></span></div>
      <div class="rm"><span>${p}% mastered</span>${st.due ? `<span class="due">${st.due} due${st.unseen ? ` · ${st.unseen} new` : ''}</span>` : st.unseen ? `<span>${st.unseen} new</span>` : '<span>✓ done</span>'}</div>
    </button>`;
  };

  const todo = all.due + all.unseen;
  const cta = todo ? `Start · ${todo} card${todo === 1 ? '' : 's'} (${all.due} due, ${all.unseen} new)` : 'All caught up · practise anyway';

  app.innerHTML = `
    <div class="topline">
      <div><h1>Worldly</h1><p class="sub" style="margin:0">Every country, flag and capital.</p></div>
      <div class="streak" title="Days in a row">🔥 ${streak} day${streak === 1 ? '' : 's'}</div>
    </div>
    <div class="card hero" style="margin-top:16px">
      <div class="row"><div><div class="big">${pct}%</div><div class="muted small">of all ${overall.total} cards mastered</div></div></div>
      <div class="bar"><span style="width:${pct}%"></span></div>
      <div class="stats3">
        <div><b>${overall.due}</b><span>due now</span></div>
        <div><b>${overall.seen}</b><span>cards started</span></div>
        <div><b>${doneToday}</b><span>answers today</span></div>
      </div>
      <button class="btn primary block" id="go">${esc(cta)}</button>
    </div>
    <h2>What to practise</h2>
    <div class="chips" id="modes">${chips}</div>
    <h2>Pick a region</h2>
    <div class="regions">
      ${tile('all', 'Whole world · ' + COUNTRIES.length + ' countries')}
      ${REGIONS.map(r => tile(r, r)).join('')}
    </div>
    <p class="muted small" style="margin-top:20px">Cards you get right come back after longer and longer gaps (1 day, 2, 4, 8…). Cards you miss come back soon. A card counts as mastered once it reaches an 8-day gap.</p>
  `;
  $('#go').onclick = () => startSession('all', modeSel);
  $('#modes').onclick = e => {
    const b = e.target.closest('[data-mode]');
    if (!b) return;
    state.settings.mode = b.dataset.mode; save(); renderHome();
  };
  for (const b of app.querySelectorAll('[data-region]')) b.onclick = () => startSession(b.dataset.region, modeSel);
}

/* ----- session ----- */
function startSession(region, modeSel) {
  const { items, extra } = buildSession(region, modeSel);
  if (!items.length) { toast('Nothing to study here yet'); return; }
  session = { region, modeSel, queue: items, total: items.length, done: 0, right: 0, missed: [], retried: new Set(), extra, q: null, answered: false };
  document.body.classList.add('in-session');
  nextQuestion();
}

function nextQuestion() {
  if (!session.queue.length) return renderSummary();
  session.q = makeQuestion(session.queue.shift());
  session.answered = false;
  renderSession();
}

function promptHtml(q) {
  const c = q.c;
  const kind = `<div class="kind">${esc(MODES[q.mode].kind)}</div>`;
  switch (q.mode) {
    case 'f2c': return `${kind}${flagImg(c.code, 'hero-flag', 'Flag to identify')}`;
    case 'c2cap': return `${kind}<div class="q">${esc(c.name)}<small>What is its capital?</small></div>`;
    case 'cap2c': return `${kind}<div class="q">${esc(c.capitals[0])}<small>is the capital of…</small></div>`;
    case 'c2f': return `${kind}<div class="q">${esc(c.name)}</div>`;
  }
}

function optionLabel(q, o) {
  if (q.mode === 'c2cap') return esc(o.capitals[0]);
  return esc(o.name);
}

function renderSession() {
  if (session.summary) return renderSummary();
  const q = session.q;
  const p = Math.round(session.done / Math.max(session.total, 1) * 100);
  let body;
  if (q.typed) {
    body = `<form class="typed" id="typed" autocomplete="off">
      <input id="ans" type="text" placeholder="${q.mode === 'c2cap' ? 'Type the capital' : 'Type the country'}" autocapitalize="words" autocorrect="off" spellcheck="false" enterkeyhint="done">
      <div class="row"><button type="button" class="btn" id="idk">I don't know</button><button class="btn primary" type="submit">Check</button></div>
    </form>`;
  } else if (q.mode === 'c2f') {
    body = `<div class="choices flags">${q.options.map((o, i) => `<button class="choice" data-i="${i}"><span class="k">${i + 1}</span>${flagImg(o.code, '', 'Flag option ' + (i + 1))}</button>`).join('')}</div>`;
  } else {
    body = `<div class="choices">${q.options.map((o, i) => `<button class="choice" data-i="${i}"><span class="k">${i + 1}</span>${optionLabel(q, o)}</button>`).join('')}</div>`;
  }
  app.innerHTML = `
    <div class="sess-top">
      <button class="iconbtn" id="quit" aria-label="End session">✕</button>
      <div class="bar"><span style="width:${p}%"></span></div>
      <div class="muted small">${session.done}/${session.total}</div>
    </div>
    <div class="prompt">${promptHtml(q)}</div>
    ${body}
    <div id="fb"></div>
  `;
  $('#quit').onclick = () => (session.done ? renderSummary() : setTab('study'));
  if (q.typed) {
    const input = $('#ans');
    setTimeout(() => input.focus(), 50);
    $('#typed').onsubmit = e => {
      e.preventDefault();
      if (session.answered) return;
      if (!input.value.trim()) { input.focus(); return; }
      const m = matches(input.value, acceptedFor(q.c, q.mode), wrongFor(q.c, q.mode));
      answer(!!m, { typo: m === 'typo', given: input.value.trim() });
    };
    $('#idk').onclick = () => { if (!session.answered) answer(false, { given: '' }); };
  } else {
    for (const b of app.querySelectorAll('.choice')) {
      b.onclick = () => {
        if (session.answered) return;
        const o = q.options[+b.dataset.i];
        answer(o === q.c, { chosen: +b.dataset.i });
      };
    }
  }
}

function factHtml(c) {
  const caps = c.capitals.length > 1 ? `Capitals: ${esc(capList(c))}` : `Capital: ${esc(c.capitals[0])}`;
  return `<div class="fact">${flagImg(c.code, '', 'Flag of ' + c.name)}<div><b>${esc(c.name)}</b><div>${caps}</div><div class="muted small">${esc(c.sub || c.region)}</div></div></div>`;
}

function answer(correct, info) {
  const q = session.q;
  session.answered = true;
  // Within-session retries don't move the card again (it was already marked wrong).
  const isRetry = session.retried.has(cardKey(q.code, q.mode));
  if (!isRetry) recordAnswer(q.code, q.mode, correct);

  if (correct) { if (!isRetry) session.right++; }
  else {
    if (!isRetry) session.missed.push(q.c);
    {
      // Show it again a few cards later in this session, until it's answered right.
      session.retried.add(cardKey(q.code, q.mode));
      const at = Math.min(session.queue.length, 3 + Math.floor(Math.random() * 6));
      session.queue.splice(at, 0, { code: q.code, mode: q.mode });
      session.total++;
    }
  }
  session.done++;

  if (!q.typed) {
    for (const b of app.querySelectorAll('.choice')) {
      const o = q.options[+b.dataset.i];
      b.disabled = true;
      if (o === q.c) b.classList.add('right');
      else if (+b.dataset.i === info.chosen) b.classList.add('wrong');
    }
  } else {
    $('#ans').disabled = true;
    for (const b of app.querySelectorAll('#typed button')) b.disabled = true;
  }

  let verdict;
  if (correct) verdict = info.typo ? `Correct — watch the spelling` : pickPraise();
  else if (q.typed && info.given) verdict = `Not quite — you wrote “${esc(info.given)}”`;
  else verdict = 'Not quite';

  const fb = $('#fb');
  fb.innerHTML = `<div class="feedback ${correct ? 'good' : 'bad'}">
    <div class="verdict">${verdict}</div>
    ${factHtml(q.c)}
    <button class="btn ${correct ? '' : 'primary'} block" id="next">Continue</button>
  </div>`;
  const next = $('#next');
  next.onclick = advance;
  next.focus({ preventScroll: true });
  fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}
function advance() { if (session && session.answered) { session.answered = false; nextQuestion(); } }
function pickPraise() { const p = ['Correct!', 'Nice!', 'Spot on!', 'Yes!', 'Great!']; return p[Math.floor(Math.random() * p.length)]; }

function renderSummary() {
  session.summary = true;
  const answered = session.right + session.missed.length;
  const pct = answered ? Math.round(session.right / answered * 100) : 0;
  const missed = [...new Map(session.missed.map(c => [c.code, c])).values()];
  app.innerHTML = `
    <h1 style="text-align:center">Session done</h1>
    <div class="score">${session.right}/${answered}</div>
    <p class="sub" style="text-align:center">${pct >= 90 ? 'Excellent work.' : pct >= 60 ? 'Good progress — missed cards come back soon.' : 'Tough round — missed cards come back soon.'}</p>
    ${missed.length ? `<h2>To review</h2><div class="list">${missed.map(c => `<div class="li">${flagImg(c.code, 'mini', '')}<div><div class="nm">${esc(c.name)}</div><div class="cp">${esc(capList(c))}</div></div></div>`).join('')}</div>` : ''}
    <div class="stack" style="margin-top:20px">
      <button class="btn primary block" id="again">Go again</button>
      <button class="btn block" id="home">Back to home</button>
    </div>`;
  $('#again').onclick = () => startSession(session.region, session.modeSel);
  $('#home').onclick = () => setTab('study');
}

/* ----- browse ----- */
let browseState = { q: '', region: 'all' };
function masteryDots(c) {
  return `<span class="dots" title="Flag · Capital · Capital→Country · Pick flag">${MODE_KEYS.map(m => {
    const s = getCard(c.code, m);
    const l = !s ? 0 : s.b >= MASTERED_BOX ? 3 : s.b >= 2 ? 2 : 1;
    return `<i class="${l ? 'l' + l : ''}"></i>`;
  }).join('')}</span>`;
}
function renderBrowse() {
  app.innerHTML = `
    <h1>Browse</h1>
    <p class="sub">All ${COUNTRIES.length} countries. Look them over before you quiz yourself.</p>
    <input class="search" id="search" type="search" placeholder="Search country or capital" value="${esc(browseState.q)}" autocomplete="off">
    <div class="chips" id="regionChips">${['all', ...REGIONS].map(r => `<button class="chip ${r === browseState.region ? 'on' : ''}" data-r="${esc(r)}">${r === 'all' ? 'All' : esc(r)}</button>`).join('')}</div>
    <div class="legend"><span><span class="dots"><i></i></span>new</span><span><span class="dots"><i class="l1"></i></span>learning</span><span><span class="dots"><i class="l2"></i></span>getting there</span><span><span class="dots"><i class="l3"></i></span>mastered</span></div>
    <div class="list" id="blist"></div>`;
  const draw = () => {
    const q = norm(browseState.q);
    const rows = countriesIn(browseState.region).filter(c => !q || [c.name, ...c.alt, ...c.capitals, ...c.capAlt].some(s => norm(s).includes(q)));
    $('#blist').innerHTML = rows.length
      ? rows.map(c => `<div class="li">${flagImg(c.code, 'mini', '')}<div><div class="nm">${esc(c.name)}</div><div class="cp">${esc(capList(c))}</div></div>${masteryDots(c)}</div>`).join('')
      : `<div class="li muted">No matches</div>`;
  };
  $('#search').oninput = e => { browseState.q = e.target.value; draw(); };
  $('#regionChips').onclick = e => {
    const b = e.target.closest('[data-r]'); if (!b) return;
    browseState.region = b.dataset.r;
    for (const x of app.querySelectorAll('#regionChips .chip')) x.classList.toggle('on', x === b);
    draw();
  };
  draw();
}

/* ----- settings ----- */
function renderSettings() {
  const st = deckStats('all', 'mixed');
  const perMode = MODE_KEYS.map(m => ({ m, ...deckStats('all', m) }));
  app.innerHTML = `
    <h1>Settings</h1>
    <p class="sub">Progress is saved on this device.</p>
    <div class="list">
      <label class="setting"><div class="txt">Always multiple choice<small>Never switch to typed answers, even for cards you know well.</small></div><input type="checkbox" class="switch" id="alwaysChoices" ${state.settings.alwaysChoices ? 'checked' : ''}></label>
    </div>
    <h2>Progress by mode</h2>
    <div class="list">${perMode.map(p => `<div class="setting"><div class="txt">${esc(MODES[p.m].label)}<small>${p.mastered} mastered · ${p.seen - p.mastered} learning · ${p.unseen} new</small></div><div style="width:80px" class="bar"><span style="width:${Math.round(p.mastered / p.total * 100)}%"></span></div></div>`).join('')}</div>
    <h2>Move progress between devices</h2>
    <p class="muted small" style="margin-top:-4px">Your laptop and phone keep separate progress. Export a backup file here and import it on the other device.</p>
    <div class="stack">
      <button class="btn block" id="export">Export progress</button>
      <button class="btn block" id="import">Import progress…</button>
      <input type="file" id="importFile" accept="application/json,.json" hidden>
    </div>
    <h2>Danger zone</h2>
    <button class="btn block danger" id="reset">Reset all progress</button>
    <p class="muted small" style="margin-top:24px">${st.seen} of ${st.total} cards started. Data: world-countries (ODbL). Flags: flag-icons (MIT).</p>`;
  $('#alwaysChoices').onchange = e => { state.settings.alwaysChoices = e.target.checked; save(); };
  $('#export').onclick = () => {
    const blob = new Blob([JSON.stringify({ app: 'worldly', v: 1, exported: new Date().toISOString(), state })], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `worldly-progress-${todayStr()}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  $('#import').onclick = () => $('#importFile').click();
  $('#importFile').onchange = async e => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      if (data.app !== 'worldly' || !data.state || !data.state.cards) throw new Error('bad file');
      if (!confirm('Merge this backup with the progress on this device? For each card, the more advanced version is kept.')) return;
      for (const [k, v] of Object.entries(data.state.cards)) {
        const mine = state.cards[k];
        if (!mine || v.b > mine.b || (v.b === mine.b && v.last > (mine.last || 0))) state.cards[k] = v;
      }
      for (const [d, n] of Object.entries(data.state.history || {})) state.history[d] = Math.max(state.history[d] || 0, n);
      if (data.state.streak && (!state.streak.last || data.state.streak.last > state.streak.last)) state.streak = data.state.streak;
      save(); toast('Progress imported'); renderSettings();
    } catch (err) { toast('That file is not a Worldly backup'); }
  };
  $('#reset').onclick = () => {
    if (!confirm('Erase all progress on this device? This cannot be undone.')) return;
    const settings = state.settings;
    state = defaultState(); state.settings = settings; save(); toast('Progress reset'); renderSettings();
  };
}

/* ---------------- keyboard shortcuts (desktop) ---------------- */
document.addEventListener('keydown', e => {
  if (!session || session.summary) return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  if (session.answered && (e.key === 'Enter' || e.key === ' ')) {
    if (document.activeElement && document.activeElement.id === 'next') return; // button handles it
    e.preventDefault(); advance(); return;
  }
  if (!session.answered && !session.q.typed && /^[1-4]$/.test(e.key)) {
    const b = app.querySelector(`.choice[data-i="${+e.key - 1}"]`);
    if (b) b.click();
  }
  if (e.key === 'Escape') $('#quit') && $('#quit').click();
});

/* ---------------- boot ---------------- */
// render() is called from index.html once mapquiz.js has loaded.
let reloadedForUpdate = false;
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  // When a new version takes over, reload once so you see it right away
  // (but not in the middle of a study session or map quiz).
  const hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || reloadedForUpdate) return;
    if (session || (typeof mq !== 'undefined' && mq)) { toast('Update ready — it will apply next time you open the app'); return; }
    reloadedForUpdate = true;
    location.reload();
  });
}
