/* TeknikalDrill — mesin kuis. Vanilla JS, tanpa build step. */
(function () {
'use strict';

const $  = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const STORE_KEY = 'td_progress_v1';
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
const DIFF_LABEL = { mudah: 'Mudah', sedang: 'Sedang', sulit: 'Sulit' };

/* ---------------- storage ---------------- */
const defaultState = () => ({ theme: 'dark', seen: {}, history: [], imported: [], points: 0 });
let S = defaultState();

function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) S = Object.assign(defaultState(), JSON.parse(raw));
  } catch (e) { S = defaultState(); }
}
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) {}
}

/* ---------------- util ---------------- */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pad(n) { return String(n).padStart(2, '0'); }
function fmtTime(sec) {
  sec = Math.max(0, Math.round(sec));
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return (h ? h + ':' + pad(m) : pad(m)) + ':' + pad(sec % 60);
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}
function toast(msg, kind) {
  const el = document.createElement('div');
  el.className = 'toast' + (kind ? ' ' + kind : '');
  el.textContent = msg;
  $('#toastWrap').appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; }, 2600);
  setTimeout(() => el.remove(), 3000);
}
function allQuestions() { return TD.BANK.concat(S.imported || []); }
function modOf(id) { return TD.MODULE_MAP[id] || { id, name: id, level: '—', emoji: '📌', desc: '' }; }

/* ---------------- views ---------------- */
function show(view) {
  $$('.view').forEach(v => v.classList.toggle('is-active', v.id === 'view-' + view));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---------------- mastery ---------------- */
function moduleStats(moduleId) {
  const qs = allQuestions().filter(q => q.module === moduleId);
  let attempts = 0, correct = 0, touched = 0;
  qs.forEach(q => {
    const r = S.seen[q.id];
    if (!r) return;
    touched++; attempts += r.a || 0; correct += r.c || 0;
  });
  return {
    total: qs.length, touched, attempts, correct,
    pct: attempts ? Math.round((correct / attempts) * 100) : 0
  };
}
function barClass(pct, attempts) {
  if (!attempts) return 'bar';
  if (pct >= 80) return 'bar ok';
  if (pct >= 60) return 'bar warn';
  return 'bar bad';
}

/* ---------------- home ---------------- */
let levelFilter = 'ALL';

function renderHome() {
  const bank = allQuestions();
  $('#bankCount').textContent = bank.length + ' soal';

  const answered = Object.keys(S.seen).length;
  let att = 0, cor = 0;
  Object.values(S.seen).forEach(r => { att += r.a || 0; cor += r.c || 0; });
  const acc = att ? Math.round((cor / att) * 100) : 0;

  $('#heroStats').innerHTML = [
    ['📚', bank.length, 'soal di bank'],
    ['✅', answered, 'soal pernah dikerjakan'],
    ['🎯', acc + '%', 'akurasi keseluruhan'],
    ['🏆', (S.points || 0).toLocaleString('id-ID'), 'total poin']
  ].map(([e, v, l]) => `<div class="hero-stat"><b>${e} ${esc(v)}</b><span>${esc(l)}</span></div>`).join('');

  const mods = TD.MODULES.filter(m => levelFilter === 'ALL' || m.level === levelFilter);
  $('#moduleGrid').innerHTML = mods.map(m => {
    const st = moduleStats(m.id);
    const label = st.attempts ? st.pct + '% akurasi · ' + st.touched + '/' + st.total + ' dikerjakan'
                              : st.total + ' soal · belum disentuh';
    return `<button class="module-card" data-module="${esc(m.id)}" type="button">
      <div class="module-top">
        <h4>${m.emoji} ${esc(m.name)}</h4>
        <span class="muted">${esc(m.level)}</span>
      </div>
      <p class="muted" style="font-weight:500">${esc(m.desc)}</p>
      <div class="${barClass(st.pct, st.attempts)}"><i style="width:${st.attempts ? st.pct : 0}%"></i></div>
      <span class="muted">${esc(label)}</span>
    </button>`;
  }).join('');

  $$('#moduleGrid .module-card').forEach(btn => {
    btn.addEventListener('click', () => openSetup('practice', [btn.dataset.module]));
  });
}

/* ---------------- setup ---------------- */
const setupState = { mode: 'practice', levels: ['RTA', 'CTA'], modules: [], count: 20 };

const MODE_INFO = {
  practice: { title: 'Latihan per Unit', sub: 'Pembahasan muncul tiap kali lo jawab. Tanpa batas waktu.', counts: [10, 20, 30, 50, 0] },
  exam:     { title: 'Simulasi Ujian',   sub: '100 soal, 120 menit, pembahasan baru dibuka di akhir. Passing grade 70%.', counts: [50, 75, 100] },
  rapid:    { title: 'Rapid Fire',       sub: '20 detik per soal. Makin cepat & makin panjang streak, makin gede poinnya.', counts: [10, 20, 30, 50] },
  weak:     { title: 'Drill Soal Salah', sub: 'Khusus soal yang pernah lo jawab salah atau lo tandai.', counts: [10, 20, 30, 0] },
  flash:    { title: 'Flashcard',        sub: 'Balik kartu buat lihat jawaban + pembahasan. Nggak ada skor.', counts: [10, 20, 30, 50] }
};

function openSetup(mode, presetModules) {
  setupState.mode = mode;
  setupState.modules = presetModules ? presetModules.slice() : TD.MODULES.map(m => m.id);
  setupState.levels = presetModules
    ? Array.from(new Set(presetModules.map(id => modOf(id).level)))
    : ['RTA', 'CTA'];
  const info = MODE_INFO[mode];
  setupState.count = mode === 'exam' ? 100 : 20;

  $('#setupTitle').textContent = info.title;
  $('#setupSub').textContent = info.sub;
  $('#setupModuleBlock').hidden = false;
  $('#optShuffle').checked = true;

  $('#setupLevels').innerHTML = ['RTA', 'CTA'].map(l =>
    `<button class="chip ${setupState.levels.includes(l) ? 'is-on' : ''}" data-level="${l}" type="button">${l}</button>`).join('');
  $('#setupCounts').innerHTML = info.counts.map(c =>
    `<button class="chip ${c === setupState.count ? 'is-on' : ''}" data-count="${c}" type="button">${c === 0 ? 'Semua' : c + ' soal'}</button>`).join('');

  renderSetupModules();
  bindSetup();
  updateSetupSummary();
  show('setup');
}

function renderSetupModules() {
  const bank = allQuestions();
  $('#setupModules').innerHTML = TD.MODULES
    .filter(m => setupState.levels.includes(m.level))
    .map(m => {
      const n = bank.filter(q => q.module === m.id).length;
      return `<button class="chip ${setupState.modules.includes(m.id) ? 'is-on' : ''}" data-mod="${esc(m.id)}" type="button">
        ${m.emoji} ${esc(m.name)}<small>${n}</small></button>`;
    }).join('');
  $$('#setupModules .chip').forEach(c => c.addEventListener('click', () => {
    const id = c.dataset.mod;
    const i = setupState.modules.indexOf(id);
    if (i >= 0) setupState.modules.splice(i, 1); else setupState.modules.push(id);
    c.classList.toggle('is-on');
    updateSetupSummary();
  }));
}

function bindSetup() {
  $$('#setupLevels .chip').forEach(c => c.addEventListener('click', () => {
    const l = c.dataset.level;
    const i = setupState.levels.indexOf(l);
    if (i >= 0 && setupState.levels.length > 1) setupState.levels.splice(i, 1);
    else if (i < 0) setupState.levels.push(l);
    $$('#setupLevels .chip').forEach(x => x.classList.toggle('is-on', setupState.levels.includes(x.dataset.level)));
    setupState.modules = TD.MODULES.filter(m => setupState.levels.includes(m.level)).map(m => m.id);
    renderSetupModules();
    updateSetupSummary();
  }));
  $$('#setupCounts .chip').forEach(c => c.addEventListener('click', () => {
    setupState.count = Number(c.dataset.count);
    $$('#setupCounts .chip').forEach(x => x.classList.toggle('is-on', Number(x.dataset.count) === setupState.count));
    updateSetupSummary();
  }));
}

function candidatePool() {
  let pool = allQuestions().filter(q =>
    setupState.levels.includes(q.level) && setupState.modules.includes(q.module));
  if (setupState.mode === 'weak') {
    pool = pool.filter(q => {
      const r = S.seen[q.id];
      return r && ((r.w || 0) > 0 || r.flag);
    });
  }
  return pool;
}

function updateSetupSummary() {
  const pool = candidatePool();
  const n = setupState.count === 0 ? pool.length : Math.min(setupState.count, pool.length);
  $('#setupSummary').innerHTML = `Tersedia <b>${pool.length}</b> soal cocok · sesi ini <b>${n}</b> soal`;
  $('#startBtn').disabled = pool.length === 0;
  $('#startBtn').style.opacity = pool.length === 0 ? .5 : 1;
}

/* ---------------- session ---------------- */
let sess = null;
let tickHandle = null;

function startSession() {
  let pool = candidatePool();
  if (!pool.length) { toast('Nggak ada soal yang cocok sama filter ini.', 'bad'); return; }

  if ($('#optSkipSeen').checked) {
    const fresh = pool.filter(q => !S.seen[q.id]);
    const rest  = pool.filter(q => S.seen[q.id]);
    pool = shuffle(fresh).concat(shuffle(rest));
  } else {
    pool = $('#optShuffle').checked ? shuffle(pool) : pool.slice();
  }

  const n = setupState.count === 0 ? pool.length : Math.min(setupState.count, pool.length);
  const picked = pool.slice(0, n).map(q => {
    if (!$('#optShuffle').checked) return Object.assign({}, q, { order: q.options.map((_, i) => i) });
    const order = shuffle(q.options.map((_, i) => i));
    return Object.assign({}, q, { order });
  });

  sess = {
    mode: setupState.mode,
    qs: picked,
    idx: 0,
    picks: new Array(picked.length).fill(null),
    flags: new Array(picked.length).fill(false),
    score: 0,
    streak: 0,
    bestStreak: 0,
    startTs: Date.now(),
    perQ: setupState.mode === 'rapid' ? 20 : 0,
    totalLimit: setupState.mode === 'exam' ? 120 * 60 : 0,
    qStartTs: Date.now(),
    locked: false
  };

  if (setupState.mode === 'flash') { startFlash(picked); return; }

  $('#scoreMeter').textContent = '0';
  $('#streakMeter').textContent = '🔥 0';
  show('quiz');
  renderQuestion();
  startTicker();
}

function startTicker() {
  stopTicker();
  if (!sess.perQ && !sess.totalLimit) { $('#timerMeter').textContent = '∞'; return; }
  tickHandle = setInterval(() => {
    if (!sess) return stopTicker();
    const m = $('#timerMeter');
    if (sess.totalLimit) {
      const left = sess.totalLimit - (Date.now() - sess.startTs) / 1000;
      m.textContent = fmtTime(left);
      m.classList.toggle('is-low', left < 300);
      if (left <= 0) { toast('Waktu habis!', 'bad'); finishSession(); }
    } else if (sess.perQ) {
      if (sess.locked) return;
      const left = sess.perQ - (Date.now() - sess.qStartTs) / 1000;
      m.textContent = fmtTime(left);
      m.classList.toggle('is-low', left < 6);
      if (left <= 0) { answer(-1); }
    }
  }, 250);
}
function stopTicker() { if (tickHandle) clearInterval(tickHandle); tickHandle = null; }

function currentQ() { return sess.qs[sess.idx]; }

function renderQuestion() {
  const q = currentQ();
  sess.locked = false;
  sess.qStartTs = Date.now();

  $('#progressFill').style.width = ((sess.idx) / sess.qs.length * 100) + '%';
  $('#progressText').textContent = (sess.idx + 1) + ' / ' + sess.qs.length;
  $('#qLevel').textContent = q.level;
  $('#qModule').textContent = modOf(q.module).emoji + ' ' + modOf(q.module).name;
  $('#qDiff').textContent = DIFF_LABEL[q.difficulty] || q.difficulty;
  $('#qId').textContent = q.id;
  $('#qText').textContent = q.q;
  $('#explain').hidden = true;
  $('#qFoot').hidden = false;
  $('#flagBtn').textContent = sess.flags[sess.idx] ? '🔖 Ditandai' : '🔖 Tandai';

  $('#options').innerHTML = q.order.map((origIdx, i) =>
    `<button class="opt" data-orig="${origIdx}" type="button">
       <span class="opt-key">${LETTERS[i]}</span><span>${esc(q.options[origIdx])}</span>
     </button>`).join('');
  $$('#options .opt').forEach(b => b.addEventListener('click', () => answer(Number(b.dataset.orig))));

  if (sess.perQ) $('#timerMeter').textContent = fmtTime(sess.perQ);
}

function answer(origIdx) {
  if (sess.locked) return;
  sess.locked = true;
  const q = currentQ();
  const correct = origIdx === q.answer;
  const elapsed = (Date.now() - sess.qStartTs) / 1000;
  sess.picks[sess.idx] = { pick: origIdx, correct, elapsed };

  // rekam progress jangka panjang
  const rec = S.seen[q.id] || { a: 0, c: 0, w: 0, flag: false };
  rec.a++; if (correct) rec.c++; else rec.w++;
  rec.last = Date.now();
  if (sess.flags[sess.idx]) rec.flag = true;
  S.seen[q.id] = rec;

  if (correct) {
    sess.streak++;
    sess.bestStreak = Math.max(sess.bestStreak, sess.streak);
    let pts = 100 + Math.min(sess.streak - 1, 10) * 10;
    if (sess.perQ) pts += Math.round(Math.max(0, sess.perQ - elapsed) / sess.perQ * 60);
    sess.score += pts;
    S.points = (S.points || 0) + pts;
  } else {
    sess.streak = 0;
  }
  save();

  $('#scoreMeter').textContent = sess.score;
  $('#streakMeter').textContent = '🔥 ' + sess.streak;
  bump(correct ? '#scoreMeter' : '#streakMeter');
  if (correct && sess.streak > 0 && sess.streak % 5 === 0) burstConfetti(60);

  $$('#options .opt').forEach(b => {
    const o = Number(b.dataset.orig);
    b.disabled = true;
    if (o === q.answer) b.classList.add('is-correct');
    else if (o === origIdx) b.classList.add('is-wrong');
    else b.classList.add('is-dim');
  });

  if (sess.mode === 'exam') { setTimeout(next, 220); return; }

  $('#qFoot').hidden = true;
  const badge = $('#explainBadge');
  badge.textContent = origIdx === -1 ? 'Waktu habis' : (correct ? 'Benar!' : 'Belum tepat');
  badge.classList.toggle('is-bad', !correct);
  $('#explainBody').innerHTML = (correct ? '' :
      `<b>Jawaban benar: ${esc(LETTERS[q.order.indexOf(q.answer)])}. ${esc(q.options[q.answer])}</b><br><br>`) + esc(q.explain);
  $('#explain').hidden = false;
  $('#nextBtn').textContent = sess.idx === sess.qs.length - 1 ? 'Lihat hasil →' : 'Lanjut →';
}

function bump(sel) {
  const el = $(sel);
  el.classList.remove('bump');
  void el.offsetWidth;
  el.classList.add('bump');
}

function next() {
  if (sess.idx >= sess.qs.length - 1) return finishSession();
  sess.idx++;
  renderQuestion();
}

function skip() {
  if (sess.locked) return;
  sess.picks[sess.idx] = { pick: null, correct: false, elapsed: 0, skipped: true };
  next();
}

function finishSession() {
  stopTicker();
  const total = sess.qs.length;
  const answered = sess.picks.filter(p => p && !p.skipped).length;
  const correct = sess.picks.filter(p => p && p.correct).length;
  const pct = total ? Math.round(correct / total * 100) : 0;
  const dur = Math.round((Date.now() - sess.startTs) / 1000);

  S.history.unshift({
    ts: Date.now(), mode: sess.mode, total, answered, correct, pct, dur,
    score: sess.score, bestStreak: sess.bestStreak,
    modules: Array.from(new Set(sess.qs.map(q => q.module)))
  });
  S.history = S.history.slice(0, 60);
  save();
  renderResult(pct, correct, total, dur);
  show('result');
  if (pct >= 70) burstConfetti(180);
}

/* ---------------- result ---------------- */
function renderResult(pct, correct, total, dur) {
  $('#scoreRing').style.setProperty('--p', pct);
  $('#scorePct').textContent = pct + '%';

  const passed = pct >= 70;
  const titles = passed
    ? ['Mantap, lolos passing grade! 🎉', 'Solid banget! 🔥', 'Siap maju ujian! 🚀']
    : ['Belum lolos, tapi bisa dikejar 💪', 'Ayo gas ulang lagi 📚', 'Masih ada PR nih 🩹'];
  $('#resultTitle').textContent = titles[Math.floor(Math.random() * titles.length)];
  $('#resultSub').textContent = sess.mode === 'exam'
    ? (passed ? 'Nilai lo di atas passing grade 70%.' : 'Passing grade simulasi ini 70%. Kurang ' + (70 - pct) + ' poin persen lagi.')
    : 'Cek pembahasan di bawah, terutama yang salah.';

  $('#resultStats').innerHTML = [
    [correct + '/' + total, 'benar'],
    [sess.score.toLocaleString('id-ID'), 'poin'],
    ['🔥 ' + sess.bestStreak, 'streak terbaik'],
    [fmtTime(dur), 'durasi'],
    [total ? fmtTime(dur / total) : '00:00', 'rata-rata/soal']
  ].map(([v, l]) => `<div class="rstat"><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join('');

  // breakdown per modul
  const byMod = {};
  sess.qs.forEach((q, i) => {
    const b = byMod[q.module] || (byMod[q.module] = { t: 0, c: 0 });
    b.t++; if (sess.picks[i] && sess.picks[i].correct) b.c++;
  });
  $('#resultBreakdown').innerHTML = Object.keys(byMod).map(id => {
    const b = byMod[id], p = Math.round(b.c / b.t * 100), m = modOf(id);
    return `<div class="bd-item">
      <div class="bd-top"><span>${m.emoji} ${esc(m.name)}</span><span>${b.c}/${b.t}</span></div>
      <div class="${barClass(p, b.t)}"><i style="width:${p}%"></i></div>
    </div>`;
  }).join('');

  renderReview('all');
}

function renderReview(filter) {
  const rows = sess.qs.map((q, i) => ({ q, i, p: sess.picks[i] })).filter(r => {
    if (filter === 'wrong') return !r.p || !r.p.correct;
    if (filter === 'flag') return sess.flags[r.i];
    return true;
  });
  if (!rows.length) { $('#reviewList').innerHTML = '<div class="empty">Nggak ada soal di filter ini. Mantap 👌</div>'; return; }
  $('#reviewList').innerHTML = rows.map(({ q, i, p }) => {
    const skipped = !p || p.skipped || p.pick === null || p.pick === -1;
    const ok = p && p.correct;
    const cls = ok ? '' : (skipped ? 'is-skip' : 'is-wrong');
    const pickTxt = skipped ? '<i>tidak dijawab</i>' : esc(q.options[p.pick]);
    return `<div class="rev ${cls}">
      <div class="q-meta">
        <span class="tag tag-level">${esc(q.level)}</span>
        <span class="tag">${modOf(q.module).emoji} ${esc(modOf(q.module).name)}</span>
        ${sess.flags[i] ? '<span class="tag">🔖 ditandai</span>' : ''}
        <span class="tag tag-id">${esc(q.id)}</span>
      </div>
      <p class="rev-q">${i + 1}. ${esc(q.q)}</p>
      <p class="rev-line ${ok ? 'ok' : 'bad'}">Jawaban lo: <b>${pickTxt}</b></p>
      ${ok ? '' : `<p class="rev-line ok">Kunci: <b>${esc(q.options[q.answer])}</b></p>`}
      <p class="rev-exp">${esc(q.explain)}</p>
    </div>`;
  }).join('');
}

/* ---------------- flashcard ---------------- */
let flash = null;
function startFlash(qs) {
  flash = { qs, idx: 0 };
  show('flash');
  renderFlash();
}
function renderFlash() {
  const q = flash.qs[flash.idx];
  $('#flashCard').classList.remove('is-flipped');
  $('#flashQ').textContent = q.q;
  $('#flashA').textContent = 'Jawaban: ' + q.options[q.answer];
  $('#flashE').textContent = q.explain;
  $('#flashTag').textContent = modOf(q.module).emoji + ' ' + q.level;
  $('#flashCounter').textContent = (flash.idx + 1) + ' / ' + flash.qs.length;
  $('#flashProgress').style.width = ((flash.idx + 1) / flash.qs.length * 100) + '%';
}

/* ---------------- stats ---------------- */
function renderStats() {
  let att = 0, cor = 0;
  Object.values(S.seen).forEach(r => { att += r.a || 0; cor += r.c || 0; });
  const exams = S.history.filter(h => h.mode === 'exam');
  const bestExam = exams.length ? Math.max.apply(null, exams.map(h => h.pct)) : 0;

  $('#statCards').innerHTML = [
    [Object.keys(S.seen).length, 'soal pernah dikerjakan'],
    [att ? Math.round(cor / att * 100) + '%' : '—', 'akurasi keseluruhan'],
    [(S.points || 0).toLocaleString('id-ID'), 'total poin'],
    [S.history.length, 'sesi selesai'],
    [exams.length ? bestExam + '%' : '—', 'skor simulasi terbaik']
  ].map(([v, l]) => `<div class="scard"><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join('');

  const weak = TD.MODULES.map(m => Object.assign({ m }, moduleStats(m.id)))
    .filter(x => x.attempts >= 3)
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 6);
  $('#weakList').innerHTML = weak.length ? weak.map(x => `
    <div class="weak-item">
      <h4>${x.m.emoji} ${esc(x.m.name)}</h4>
      <div class="${barClass(x.pct, x.attempts)}"><i style="width:${x.pct}%"></i></div>
      <small>${x.pct}% · ${x.correct}/${x.attempts} percobaan</small>
      <button class="btn btn-ghost btn-sm" data-drill="${esc(x.m.id)}" type="button">Latih</button>
    </div>`).join('')
    : '<div class="empty">Kerjain minimal beberapa soal dulu, nanti topik terlemah lo muncul di sini.</div>';
  $$('#weakList [data-drill]').forEach(b => b.addEventListener('click', () => openSetup('practice', [b.dataset.drill])));

  $('#historyList').innerHTML = S.history.length ? S.history.slice(0, 20).map(h => {
    const d = new Date(h.ts);
    const label = (MODE_INFO[h.mode] || { title: h.mode }).title;
    return `<div class="hist-item">
      <h4>${esc(label)} · ${h.correct}/${h.total} (${h.pct}%)</h4>
      <small>${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())} · ${fmtTime(h.dur)} · ${(h.score || 0).toLocaleString('id-ID')} poin</small>
    </div>`;
  }).join('') : '<div class="empty">Belum ada riwayat sesi.</div>';
}

/* ---------------- import ---------------- */
function parseCSV(text) {
  const rows = [];
  let row = [], cell = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQ) {
      if (ch === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else inQ = false; }
      else cell += ch;
    } else if (ch === '"') inQ = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
    else if (ch !== '\r') cell += ch;
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }
  return rows.filter(r => r.some(c => c.trim() !== ''));
}

function importCSV(text) {
  const rows = parseCSV(text);
  if (rows.length < 2) return [];
  const head = rows[0].map(h => h.trim().toLowerCase());
  const col = n => head.indexOf(n);
  const out = [];
  rows.slice(1).forEach((r, i) => {
    const opts = ['a', 'b', 'c', 'd'].map(k => (r[col(k)] || '').trim()).filter(Boolean);
    const key = (r[col('answer')] || '').trim().toUpperCase();
    const ans = /^[0-9]+$/.test(key) ? Number(key) : LETTERS.indexOf(key);
    if (opts.length < 2 || ans < 0 || ans >= opts.length) return;
    out.push({
      id: 'imp-' + Date.now().toString(36) + '-' + i,
      level: (r[col('level')] || 'RTA').trim().toUpperCase(),
      module: (r[col('module')] || 'rta-dasar').trim(),
      difficulty: (r[col('difficulty')] || 'sedang').trim().toLowerCase(),
      q: (r[col('question')] || '').trim(),
      options: opts, answer: ans,
      explain: (r[col('explanation')] || 'Belum ada pembahasan.').trim(),
      source: 'import'
    });
  });
  return out.filter(q => q.q);
}

function importJSON(text) {
  const data = JSON.parse(text);
  const list = Array.isArray(data) ? data : (data.questions || []);
  return list.map((q, i) => ({
    id: q.id || 'imp-' + Date.now().toString(36) + '-' + i,
    level: (q.level || 'RTA').toUpperCase(),
    module: q.module || 'rta-dasar',
    difficulty: q.difficulty || 'sedang',
    q: q.q || q.question || '',
    options: q.options || q.choices || [],
    answer: typeof q.answer === 'number' ? q.answer : LETTERS.indexOf(String(q.answer).toUpperCase()),
    explain: q.explain || q.explanation || 'Belum ada pembahasan.',
    source: 'import'
  })).filter(q => q.q && Array.isArray(q.options) && q.options.length >= 2 &&
                  q.answer >= 0 && q.answer < q.options.length);
}

function handleFiles(files) {
  let added = 0, bad = 0;
  let pending = files.length;
  Array.from(files).forEach(file => {
    const fr = new FileReader();
    fr.onload = () => {
      try {
        const list = /\.csv$/i.test(file.name) ? importCSV(fr.result) : importJSON(fr.result);
        const known = TD.MODULE_MAP;
        list.forEach(q => { if (!known[q.module]) q.module = q.level === 'CTA' ? 'cta-teori' : 'rta-dasar'; });
        S.imported = (S.imported || []).concat(list);
        added += list.length;
      } catch (e) { bad++; }
      if (--pending === 0) {
        save(); renderHome();
        toast(added ? added + ' soal berhasil diimport 🎉' : 'Nggak ada soal valid yang kebaca.', added ? 'ok' : 'bad');
        if (bad) toast(bad + ' file gagal diparse.', 'bad');
      }
    };
    fr.readAsText(file);
  });
}

/* ---------------- confetti ---------------- */
const cv = $('#confetti'), ctx = cv.getContext('2d');
let parts = [], rafId = null;
function sizeCanvas() { cv.width = innerWidth; cv.height = innerHeight; }
function burstConfetti(n) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  sizeCanvas();
  const colors = ['#8b5cff', '#22d3ee', '#ffa24d', '#ff6fa3', '#32d583'];
  for (let i = 0; i < n; i++) {
    parts.push({
      x: innerWidth / 2 + (Math.random() - .5) * 260, y: innerHeight * .35,
      vx: (Math.random() - .5) * 11, vy: Math.random() * -13 - 3,
      s: Math.random() * 7 + 4, c: colors[i % colors.length],
      rot: Math.random() * 6, vr: (Math.random() - .5) * .35, life: 1
    });
  }
  if (!rafId) rafId = requestAnimationFrame(drawConfetti);
}
function drawConfetti() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  parts = parts.filter(p => p.life > 0);
  parts.forEach(p => {
    p.vy += .42; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
    if (p.y > innerHeight) p.life = 0;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
    ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .62); ctx.restore();
  });
  if (parts.length) rafId = requestAnimationFrame(drawConfetti);
  else { ctx.clearRect(0, 0, cv.width, cv.height); rafId = null; }
}
addEventListener('resize', sizeCanvas);

/* ---------------- events ---------------- */
function applyTheme() {
  document.documentElement.setAttribute('data-theme', S.theme);
  $('#themeToggle').textContent = S.theme === 'dark' ? '🌙' : '☀️';
}

function bind() {
  $('#themeToggle').addEventListener('click', () => {
    S.theme = S.theme === 'dark' ? 'light' : 'dark'; save(); applyTheme();
  });
  $('#brandHome').addEventListener('click', goHome);
  $$('[data-back]').forEach(b => b.addEventListener('click', goHome));
  $('#backHome').addEventListener('click', goHome);

  $$('.mode-card').forEach(c => c.addEventListener('click', () => {
    const mode = c.dataset.mode;
    if (mode === 'stats') { renderStats(); show('stats'); return; }
    openSetup(mode);
  }));

  $$('#levelSwitch .lvl-btn').forEach(b => b.addEventListener('click', () => {
    levelFilter = b.dataset.level;
    $$('#levelSwitch .lvl-btn').forEach(x => x.classList.toggle('is-active', x === b));
    renderHome();
  }));

  $('#toggleAllModules').addEventListener('click', () => {
    const available = TD.MODULES.filter(m => setupState.levels.includes(m.level)).map(m => m.id);
    setupState.modules = setupState.modules.length === available.length ? [] : available;
    renderSetupModules(); updateSetupSummary();
  });
  $('#startBtn').addEventListener('click', startSession);

  $('#nextBtn').addEventListener('click', next);
  $('#skipBtn').addEventListener('click', skip);
  $('#quitBtn').addEventListener('click', () => {
    if (confirm('Keluar dari sesi ini? Progress sesi nggak disimpan.')) { stopTicker(); sess = null; goHome(); }
  });
  $('#flagBtn').addEventListener('click', () => {
    sess.flags[sess.idx] = !sess.flags[sess.idx];
    const q = currentQ();
    const rec = S.seen[q.id] || { a: 0, c: 0, w: 0 };
    rec.flag = sess.flags[sess.idx]; S.seen[q.id] = rec; save();
    $('#flagBtn').textContent = sess.flags[sess.idx] ? '🔖 Ditandai' : '🔖 Tandai';
  });

  $$('#reviewFilter .lvl-btn').forEach(b => b.addEventListener('click', () => {
    $$('#reviewFilter .lvl-btn').forEach(x => x.classList.toggle('is-active', x === b));
    renderReview(b.dataset.filter);
  }));
  $('#retryWrong').addEventListener('click', () => {
    const wrong = sess.qs.filter((q, i) => !sess.picks[i] || !sess.picks[i].correct);
    if (!wrong.length) { toast('Semua soal bener. Nggak ada yang perlu diulang 😎', 'ok'); return; }
    sess = {
      mode: 'practice', qs: shuffle(wrong), idx: 0, picks: new Array(wrong.length).fill(null),
      flags: new Array(wrong.length).fill(false), score: 0, streak: 0, bestStreak: 0,
      startTs: Date.now(), perQ: 0, totalLimit: 0, qStartTs: Date.now(), locked: false
    };
    $('#scoreMeter').textContent = '0'; $('#streakMeter').textContent = '🔥 0';
    show('quiz'); renderQuestion(); startTicker();
  });
  $('#retrySame').addEventListener('click', () => { openSetup(sess ? sess.mode : 'practice'); });

  $('#flashQuit').addEventListener('click', goHome);
  $('#flashCard').addEventListener('click', () => $('#flashCard').classList.toggle('is-flipped'));
  $('#flashNext').addEventListener('click', () => {
    if (flash.idx >= flash.qs.length - 1) { toast('Kartu terakhir 🎴'); return; }
    flash.idx++; renderFlash();
  });
  $('#flashPrev').addEventListener('click', () => { if (flash.idx > 0) { flash.idx--; renderFlash(); } });

  $('#importFile').addEventListener('change', e => { handleFiles(e.target.files); e.target.value = ''; });
  $('#downloadTemplate').addEventListener('click', () => {
    const csv = 'level,module,difficulty,question,a,b,c,d,answer,explanation\n' +
      'RTA,rta-indikator,sedang,"Periode default RSI menurut Wilder adalah?","7","9","14","21",C,"Wilder memperkenalkan RSI dengan periode default 14."\n';
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url; a.download = 'template-soal-teknikaldrill.csv'; a.click();
    URL.revokeObjectURL(url);
  });
  $('#clearImported').addEventListener('click', () => {
    if (!(S.imported || []).length) { toast('Belum ada soal import.'); return; }
    if (confirm('Hapus semua soal hasil import?')) { S.imported = []; save(); renderHome(); toast('Soal import dihapus.', 'ok'); }
  });
  $('#resetProgress').addEventListener('click', () => {
    if (confirm('Reset semua progress, poin, dan riwayat? Soal import tetap aman.')) {
      const imported = S.imported, theme = S.theme;
      S = defaultState(); S.imported = imported; S.theme = theme;
      save(); renderStats(); renderHome(); toast('Progress direset.', 'ok');
    }
  });

  document.addEventListener('keydown', e => {
    if ($('#view-quiz').classList.contains('is-active') && sess) {
      if (/^[1-6]$/.test(e.key)) {
        const btns = $$('#options .opt');
        const b = btns[Number(e.key) - 1];
        if (b && !b.disabled) b.click();
      } else if (e.key === 'Enter' && !$('#explain').hidden) { next(); }
    } else if ($('#view-flash').classList.contains('is-active') && flash) {
      if (e.key === ' ') { e.preventDefault(); $('#flashCard').click(); }
      else if (e.key === 'ArrowRight') $('#flashNext').click();
      else if (e.key === 'ArrowLeft') $('#flashPrev').click();
    }
  });
}

function goHome() { stopTicker(); renderHome(); show('home'); }

/* ---------------- init ---------------- */
load();
applyTheme();
bind();
renderHome();

if (!TD.BANK.length) {
  toast('Bank soal gagal dimuat — pastikan folder data/ ikut kebawa.', 'bad');
}
})();
