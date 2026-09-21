/* TeknikalDrill — registry bank soal & metadata unit kompetensi.
   Bank soal sengaja dipaket sebagai file .js (bukan .json yang di-fetch)
   supaya aplikasi tetap jalan saat index.html dibuka langsung via file://. */

window.TD = window.TD || {};

/* Unit kompetensi mengacu pada skema sertifikasi analis teknikal BNSP:
   RTA = Pelaksanaan Analisis Teknikal, CTA = Pengelolaan Analisis Teknikal. */
TD.MODULES = [
  { id:'rta-dasar',     level:'RTA', name:'Pengertian & Penggunaan Analisis Teknikal', emoji:'🧭',
    desc:'Asumsi dasar, Dow Theory, tipe pasar, teknikal vs fundamental.' },
  { id:'rta-chart',     level:'RTA', name:'Mengkonstruksi Grafik (Chart)', emoji:'📊',
    desc:'Line, bar, candlestick, point & figure, skala, timeframe, volume.' },
  { id:'rta-trend',     level:'RTA', name:'Trend, Reversal & Consolidation', emoji:'📈',
    desc:'Garis tren, channel, pola pembalikan dan penerusan.' },
  { id:'rta-level',     level:'RTA', name:'Menentukan Level Kunci Harga', emoji:'🎚️',
    desc:'Support, resistance, Fibonacci, pivot point, gap.' },
  { id:'rta-indikator', level:'RTA', name:'Menerapkan Indikator Teknikal', emoji:'🧮',
    desc:'Moving average, MACD, RSI, stochastic, Bollinger, indikator volume.' },
  { id:'rta-plan',      level:'RTA', name:'Rencana Trading & Manajemen Risiko', emoji:'🛡️',
    desc:'Entry–exit, stop loss, target, risk/reward, jurnal trading.' },
  { id:'rta-riset',     level:'RTA', name:'Menyusun & Mempublikasikan Riset Teknikal', emoji:'📝',
    desc:'Struktur laporan, disclaimer, etika, komunikasi rekomendasi.' },

  { id:'cta-teori',     level:'CTA', name:'Teori & Filosofi Lanjutan', emoji:'🏛️',
    desc:'Dow lanjutan, efficient market, behavioral finance, random walk.' },
  { id:'cta-elliott',   level:'CTA', name:'Elliott Wave & Rasio Fibonacci', emoji:'🌊',
    desc:'Struktur impulse–koreksi, aturan wave, proyeksi rasio.' },
  { id:'cta-candle',    level:'CTA', name:'Candlestick & Price Action Lanjutan', emoji:'🕯️',
    desc:'Pola candle kompleks, konfirmasi, konteks lokasi pola.' },
  { id:'cta-siklus',    level:'CTA', name:'Siklus, Seasonality & Analisis Waktu', emoji:'🔁',
    desc:'Periodisitas, seasonality, prinsip siklus, time projection.' },
  { id:'cta-breadth',   level:'CTA', name:'Market Breadth, Sentimen & Intermarket', emoji:'🌐',
    desc:'Advance-decline, put/call, VIX, relasi antar kelas aset.' },
  { id:'cta-sistem',    level:'CTA', name:'Sistem Trading, Backtesting & Optimasi', emoji:'⚙️',
    desc:'Desain sistem, metrik kinerja, overfitting, walk-forward.' },
  { id:'cta-portfolio', level:'CTA', name:'Manajemen Portofolio & Position Sizing', emoji:'💼',
    desc:'Alokasi, drawdown, expectancy, money management.' },
  { id:'cta-aset',      level:'CTA', name:'Analisis Multi-Aset', emoji:'🪙',
    desc:'Obligasi, valas, komoditas, derivatif, dan aset kripto.' },
  { id:'cta-statistik', level:'CTA', name:'Statistik & Kuantitatif untuk Analis', emoji:'📐',
    desc:'Volatilitas, korelasi, distribusi return, uji signifikansi.' }
];

TD.MODULE_MAP = TD.MODULES.reduce((m, x) => (m[x.id] = x, m), {});

TD.BANK = [];

/* Dipanggil tiap file bank soal. Menormalkan field & menolak entri cacat. */
TD.register = function (list) {
  if (!Array.isArray(list)) return 0;
  let added = 0;
  list.forEach(function (q, i) {
    if (!q || typeof q.q !== 'string' || !Array.isArray(q.options)) return;
    if (q.options.length < 2) return;
    if (typeof q.answer !== 'number' || q.answer < 0 || q.answer >= q.options.length) return;
    const mod = TD.MODULE_MAP[q.module];
    TD.BANK.push({
      id: q.id || (q.module || 'soal') + '-' + (TD.BANK.length + 1),
      level: q.level || (mod ? mod.level : 'RTA'),
      module: q.module || 'rta-dasar',
      difficulty: q.difficulty || 'sedang',
      q: q.q,
      options: q.options.slice(),
      answer: q.answer,
      explain: q.explain || 'Belum ada pembahasan untuk soal ini.',
      source: q.source || 'bawaan'
    });
    added++;
  });
  return added;
};

TD.NOTES = {};

/* Dipanggil tiap file catatan materi. Mind map diturunkan dari sections[].mm
   supaya isinya tidak perlu ditulis dua kali. */
TD.registerNotes = function (list) {
  if (!Array.isArray(list)) return 0;
  let n = 0;
  list.forEach(function (note) {
    if (!note || !note.module || !Array.isArray(note.sections)) return;
    TD.NOTES[note.module] = {
      module: note.module,
      tagline: note.tagline || '',
      sections: note.sections.map(function (sec) {
        return { h: sec.h || '', mm: sec.mm || [], points: sec.points || [] };
      }),
      jebakan: note.jebakan || []
    };
    n++;
  });
  return n;
};
