'use strict';

/* =========================================================
   Map quiz: a timer, one text box, type countries (or capitals)
   in any order and watch them fill in on the map.
   Uses helpers from app.js (esc, norm, acceptedFor, flagImg, ...).
   ========================================================= */

const MAP_REGIONS = ['all', ...REGIONS];
const regionLabel = r => (r === 'all' ? 'Whole world' : r);
let mapSetup = { kind: 'countries', region: 'all' };
let mq = null; // running quiz

function mapCleanup() {
  if (mq && mq.tick) clearInterval(mq.tick);
  if (mq && mq.pending) clearTimeout(mq.pending);
  mq = null;
}

function timeLimitFor(region) {
  if (region === 'all') return 15 * 60;
  const n = countriesIn(region).length;
  return Math.max(3, Math.ceil(n * 5 / 60)) * 60;
}
const fmtTime = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const bestKey = (kind, region) => `${kind}:${region}`;

function renderMap() {
  if (mq) return renderMapQuiz();
  const best = state.mapBest || {};
  app.innerHTML = `
    <h1>Map quiz</h1>
    <p class="sub">Type as many as you can before time runs out, in any order. Each correct answer fills in on the map. You don't need to press Enter.</p>
    <h2>Type the…</h2>
    <div class="chips" id="kind">
      <button class="chip ${mapSetup.kind === 'countries' ? 'on' : ''}" data-k="countries">Countries</button>
      <button class="chip ${mapSetup.kind === 'capitals' ? 'on' : ''}" data-k="capitals">Capitals</button>
    </div>
    <h2>Pick a map</h2>
    <div class="regions">
      ${MAP_REGIONS.map(r => {
        const n = countriesIn(r).length;
        const b = best[bestKey(mapSetup.kind, r)];
        return `<button class="region ${r === 'all' ? 'all' : ''}" data-region="${esc(r)}">
          <div class="rn">${esc(regionLabel(r))}</div>
          <div class="rm"><span>${n} ${mapSetup.kind} · ${fmtTime(timeLimitFor(r))}</span>${b ? `<span>Best ${b.score}/${b.total}</span>` : ''}</div>
        </button>`;
      }).join('')}
    </div>`;
  $('#kind').onclick = e => {
    const b = e.target.closest('[data-k]'); if (!b) return;
    mapSetup.kind = b.dataset.k; renderMap();
  };
  for (const b of app.querySelectorAll('[data-region]')) b.onclick = () => startMapQuiz(b.dataset.region, mapSetup.kind);
}

function startMapQuiz(region, kind) {
  mapCleanup();
  const list = countriesIn(region);
  const mode = kind === 'capitals' ? 'c2cap' : 'f2c';
  mq = {
    region, kind, mode,
    codes: new Set(list.map(c => c.code)),
    found: [],               // codes, newest last
    foundSet: new Set(),
    limit: timeLimitFor(region),
    start: Date.now(),
    ended: false,
    result: null,
    vb: WORLD_MAP.views[region].slice(),
    home: WORLD_MAP.views[region].slice(),
  };
  // Lookup of normalised answer -> code, for this quiz's countries.
  mq.lookup = new Map();
  for (const c of list) for (const a of acceptedFor(c, mode)) {
    const k = norm(a);
    if (k && !mq.lookup.has(k)) mq.lookup.set(k, c.code);
  }
  document.body.classList.add('in-session');
  renderMapQuiz();
  mq.tick = setInterval(updateClock, 250);
  setTimeout(() => { const i = $('#mqin'); if (i) i.focus(); }, 50);
}

function remainingSecs() { return Math.max(0, mq.limit - (Date.now() - mq.start) / 1000); }
function updateClock() {
  if (!mq || mq.ended) return;
  const left = remainingSecs();
  const el = $('#mqclock');
  if (el) { el.textContent = fmtTime(Math.ceil(left)); el.classList.toggle('low', left < 30); }
  if (left <= 0) finishMapQuiz('time');
}

function mapSvg() {
  const M = WORLD_MAP;
  const paths = Object.entries(M.c).map(([code, d]) =>
    `<path d="${d}" data-code="${code}" class="${mq.codes.has(code) ? 'q' : 'out'}"/>`).join('');
  const dots = Object.entries(M.dots).filter(([code]) => mq.codes.has(code)).map(([code, [x, y]]) =>
    `<circle cx="${x}" cy="${y}" r="2" data-code="${code}" class="q"/>`).join('');
  return `<svg id="mqsvg" viewBox="${mq.vb.join(' ')}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="World map">
    <rect x="-500" y="-500" width="${M.w + 1000}" height="${M.h + 1000}" class="sea"/>
    <path d="${M.bg}" class="bgland"/>
    <g id="mqland">${paths}</g>
    <g id="mqdots">${dots}</g>
  </svg>`;
}

function renderMapQuiz() {
  const total = mq.codes.size;
  const noun = mq.kind === 'capitals' ? 'capital' : 'country';
  app.innerHTML = `
    <div class="mq-top">
      <button class="iconbtn" id="mqquit" aria-label="Leave quiz">✕</button>
      <div class="mq-clock" id="mqclock">${fmtTime(Math.ceil(mq.ended ? 0 : remainingSecs()))}</div>
      <div class="mq-score"><b id="mqscore">${mq.found.length}</b>/${total}</div>
      <div class="spacer"></div>
      ${mq.ended ? `<button class="btn" id="mqagain">Play again</button>` : `<button class="btn" id="mqgiveup">Give up</button>`}
    </div>
    <div class="mapwrap" id="mapwrap" style="aspect-ratio:${mq.home[2]} / ${mq.home[3]}">
      ${mapSvg()}
      <div class="zoombtns">
        <button class="iconbtn" data-z="in" aria-label="Zoom in">+</button>
        <button class="iconbtn" data-z="out" aria-label="Zoom out">−</button>
        <button class="iconbtn" data-z="home" aria-label="Reset view">⟲</button>
      </div>
      <div class="maplabel" id="maplabel" hidden></div>
    </div>
    ${mq.ended ? resultHtml() : `
    <div class="mq-input">
      <input id="mqin" type="text" placeholder="Type a ${noun}…" autocomplete="off" autocapitalize="words" autocorrect="off" spellcheck="false" enterkeyhint="done">
      <div class="mq-hint muted small" id="mqhint">${mq.kind === 'capitals' ? 'Type capital cities. The country fills in when you get one.' : 'Pinch or scroll to zoom, drag to move. Small countries are dots.'}</div>
    </div>`}
    <h2 id="foundhead">${mq.ended ? 'You got' : 'Found'} (${mq.found.length})</h2>
    <div class="foundlist" id="foundlist">${mq.found.slice().reverse().map(foundChip).join('')}</div>
  `;
  paintMap();
  bindMapControls();
  $('#mqquit').onclick = () => {
    if (!mq.ended && mq.found.length && !confirm('Leave this quiz? Your score won\'t be saved.')) return;
    mapCleanup(); document.body.classList.remove('in-session'); renderMap();
  };
  if (mq.ended) {
    $('#mqagain').onclick = () => startMapQuiz(mq.region, mq.kind);
    const back = $('#mqback'); if (back) back.onclick = () => { mapCleanup(); document.body.classList.remove('in-session'); renderMap(); };
  } else {
    $('#mqgiveup').onclick = () => { if (confirm('Give up and see the answers?')) finishMapQuiz('gaveup'); };
    const input = $('#mqin');
    input.addEventListener('input', onMapInput);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); tryAccept(true); }
    });
  }
}

function foundChip(code) {
  const c = BY_CODE[code];
  const label = mq.kind === 'capitals' ? `${esc(c.capitals[0])} <span class="muted">· ${esc(c.name)}</span>` : esc(c.name);
  return `<span class="fchip">${flagImg(code, 'tiny', '')}${label}</span>`;
}

function resultHtml() {
  const r = mq.result;
  const total = mq.codes.size;
  const missed = [...mq.codes].filter(c => !mq.foundSet.has(c)).map(c => BY_CODE[c]).sort((a, b) => a.name.localeCompare(b.name));
  const msg = r.reason === 'all' ? `All ${total} in ${fmtTime(r.secs)}!` : r.reason === 'time' ? 'Time\'s up!' : 'You gave up.';
  return `<div class="card mq-result">
      <div class="score" style="margin:0">${mq.found.length}/${total}</div>
      <p class="sub" style="text-align:center;margin:4px 0 0">${msg}${r.best ? ' New best!' : ''}</p>
      <p class="muted small" style="text-align:center;margin:6px 0 0">Missed ones are red on the map. Tap any country to see its name.</p>
      <button class="btn block" id="mqback" style="margin-top:12px">Back to maps</button>
    </div>
    ${missed.length ? `<h2>Missed (${missed.length})</h2><div class="list">${missed.map(c => `<div class="li">${flagImg(c.code, 'mini', '')}<div><div class="nm">${esc(c.name)}</div><div class="cp">${esc(capList(c))}</div></div></div>`).join('')}</div>` : ''}`;
}

/* ----- answering ----- */
function onMapInput() {
  const hint = $('#mqhint');
  if (hint) hint.classList.remove('warn');
  tryAccept(false);
}

function tryAccept(enterPressed) {
  if (!mq || mq.ended) return;
  const input = $('#mqin');
  const x = norm(input.value);
  if (mq.pending) { clearTimeout(mq.pending); mq.pending = null; }
  if (!x) return;
  const code = mq.lookup.get(x);
  if (!code) {
    if (enterPressed) shake(input);
    return;
  }
  if (mq.foundSet.has(code)) {
    if (enterPressed || ![...mq.lookup.keys()].some(k => k.length > x.length && k.startsWith(x) && !mq.foundSet.has(mq.lookup.get(k)))) {
      const hint = $('#mqhint');
      if (hint) { hint.textContent = `You already have ${BY_CODE[code].name}.`; hint.classList.add('warn'); }
    }
    return;
  }
  // If this answer is also the start of another unfound answer ("Niger" / "Nigeria"),
  // wait a moment (or for Enter) before accepting.
  const longer = [...mq.lookup.keys()].some(k => k.length > x.length && k.startsWith(x) && !mq.foundSet.has(mq.lookup.get(k)) && mq.lookup.get(k) !== code);
  if (longer && !enterPressed) {
    mq.pending = setTimeout(() => { mq && (mq.pending = null); if (mq && norm($('#mqin').value) === x) accept(code); }, 900);
    return;
  }
  accept(code);
}

function accept(code) {
  mq.found.push(code);
  mq.foundSet.add(code);
  const input = $('#mqin');
  input.value = '';
  $('#mqscore').textContent = mq.found.length;
  $('#foundhead').textContent = `Found (${mq.found.length})`;
  $('#foundlist').insertAdjacentHTML('afterbegin', foundChip(code));
  const hint = $('#mqhint');
  if (hint) { hint.textContent = `✓ ${BY_CODE[code].name}${mq.kind === 'capitals' ? ' — ' + BY_CODE[code].capitals[0] : ''}`; hint.classList.remove('warn'); }
  for (const el of app.querySelectorAll(`#mqsvg [data-code="${code}"]`)) {
    el.classList.add('ok', 'flash');
    setTimeout(() => el.classList.remove('flash'), 700);
  }
  if (mq.found.length === mq.codes.size) finishMapQuiz('all');
}

function shake(el) {
  el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake');
}

function finishMapQuiz(reason) {
  if (!mq || mq.ended) return;
  mq.ended = true;
  clearInterval(mq.tick);
  const secs = Math.round((Date.now() - mq.start) / 1000);
  const key = bestKey(mq.kind, mq.region);
  state.mapBest = state.mapBest || {};
  const prev = state.mapBest[key];
  const score = mq.found.length;
  const isBest = score > 0 && (!prev || score > prev.score || (score === prev.score && secs < prev.secs));
  if (isBest) { state.mapBest[key] = { score, total: mq.codes.size, secs }; save(); }
  mq.result = { reason, secs, best: isBest };
  renderMapQuiz();
  window.scrollTo(0, 0);
}

/* ----- map painting, zoom & pan ----- */
function paintMap() {
  const svg = $('#mqsvg');
  for (const el of svg.querySelectorAll('[data-code]')) {
    const code = el.dataset.code;
    if (mq.foundSet.has(code)) el.classList.add('ok');
    else if (mq.ended && mq.codes.has(code)) el.classList.add('miss');
  }
  applyViewBox();
}

function applyViewBox() {
  const svg = $('#mqsvg');
  if (!svg) return;
  svg.setAttribute('viewBox', mq.vb.join(' '));
  // Keep dots roughly the same size on screen at any zoom level.
  const px = svg.clientWidth || 600;
  const unitsPerPx = Math.max(mq.vb[2] / px, mq.vb[3] / (svg.clientHeight || 400));
  const r = Math.max(0.15, 4.5 * unitsPerPx);
  for (const c of svg.querySelectorAll('circle')) c.setAttribute('r', r.toFixed(2));
  svg.style.setProperty('--stroke', (0.6 * unitsPerPx).toFixed(3));
}

function zoomAt(factor, cx, cy) {
  const [x, y, w, h] = mq.vb;
  const minW = WORLD_MAP.w / 40, maxW = WORLD_MAP.w * 1.1;
  let nw = Math.min(maxW, Math.max(minW, w * factor));
  const k = nw / w;
  const nh = h * k;
  mq.vb = [cx - (cx - x) * k, cy - (cy - y) * k, nw, nh];
  clampView();
  applyViewBox();
}

function clampView() {
  const [x, y, w, h] = mq.vb;
  const W = WORLD_MAP.w, H = WORLD_MAP.h;
  mq.vb[0] = Math.min(Math.max(x, -w * 0.5), W - w * 0.5);
  mq.vb[1] = Math.min(Math.max(y, -h * 0.5), H - h * 0.5);
}

// Convert a screen point to map units (accounting for preserveAspectRatio="meet").
function toMap(svg, clientX, clientY) {
  const rect = svg.getBoundingClientRect();
  const [x, y, w, h] = mq.vb;
  const s = Math.max(w / rect.width, h / rect.height);
  const ox = (rect.width * s - w) / 2, oy = (rect.height * s - h) / 2;
  return [x - ox + (clientX - rect.left) * s, y - oy + (clientY - rect.top) * s, s];
}

function bindMapControls() {
  const svg = $('#mqsvg');
  const wrap = $('#mapwrap');
  for (const b of wrap.querySelectorAll('[data-z]')) {
    b.onclick = () => {
      const [x, y, w, h] = mq.vb;
      if (b.dataset.z === 'home') { mq.vb = mq.home.slice(); applyViewBox(); }
      else zoomAt(b.dataset.z === 'in' ? 0.6 : 1 / 0.6, x + w / 2, y + h / 2);
      const i = $('#mqin'); if (i && !matchMedia('(hover: none)').matches) i.focus();
    };
  }
  svg.addEventListener('wheel', e => {
    e.preventDefault();
    const [mx, my] = toMap(svg, e.clientX, e.clientY);
    zoomAt(Math.exp(e.deltaY * 0.0015), mx, my);
  }, { passive: false });

  const pointers = new Map();
  let last = null, moved = 0, pinch = null;
  svg.addEventListener('pointerdown', e => {
    svg.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, [e.clientX, e.clientY]);
    moved = 0;
    if (pointers.size === 1) last = [e.clientX, e.clientY];
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), vb: mq.vb.slice(), mid: toMap(svg, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2) };
    }
  });
  svg.addEventListener('pointermove', e => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, [e.clientX, e.clientY]);
    if (pointers.size === 2 && pinch) {
      const [a, b] = [...pointers.values()];
      const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
      mq.vb = pinch.vb.slice();
      zoomAt(pinch.d / Math.max(d, 1), pinch.mid[0], pinch.mid[1]);
      moved += 10;
      return;
    }
    if (pointers.size === 1 && last) {
      const s = toMap(svg, 0, 0)[2];
      const dx = e.clientX - last[0], dy = e.clientY - last[1];
      moved += Math.abs(dx) + Math.abs(dy);
      mq.vb[0] -= dx * s; mq.vb[1] -= dy * s;
      clampView(); applyViewBox();
      last = [e.clientX, e.clientY];
    }
  });
  const end = e => {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinch = null;
    if (pointers.size === 1) last = [...pointers.values()][0];
    if (!pointers.size) last = null;
  };
  svg.addEventListener('pointerup', e => {
    const wasTap = pointers.size === 1 && moved < 6;
    end(e);
    if (wasTap) showLabel(e);
  });
  svg.addEventListener('pointercancel', end);
}

function showLabel(e) {
  const el = document.elementFromPoint(e.clientX, e.clientY);
  const label = $('#maplabel');
  const code = el && el.dataset && el.dataset.code;
  if (!code || !mq.codes.has(code)) { label.hidden = true; return; }
  const c = BY_CODE[code];
  if (mq.foundSet.has(code) || mq.ended) {
    label.innerHTML = `${flagImg(code, 'tiny', '')} <b>${esc(c.name)}</b> · ${esc(c.capitals[0])}`;
  } else {
    label.textContent = 'Not found yet';
  }
  label.hidden = false;
  clearTimeout(showLabel.t);
  showLabel.t = setTimeout(() => { label.hidden = true; }, 2500);
}
