#!/usr/bin/env node
/* Validator bank soal TeknikalDrill.
   Jalankan: node tools/validate.js
   Cek: id unik, indeks jawaban valid, modul dikenal, duplikasi soal, kelengkapan pembahasan. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const sandbox = { window: {}, console };
sandbox.window = sandbox;
vm.createContext(sandbox);

function run(file) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), sandbox, { filename: file });
}

run('assets/js/data.js');
const dataFiles = fs.readdirSync(path.join(root, 'data')).filter(f => f.endsWith('.js')).sort();
dataFiles.forEach(f => run(path.join('data', f)));

const TD = sandbox.TD;
const bank = TD.BANK;
const errors = [];
const warns = [];
const seenId = new Map();
const seenQ = new Map();

bank.forEach(q => {
  if (seenId.has(q.id)) errors.push('id ganda: ' + q.id);
  seenId.set(q.id, q);

  const key = q.q.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 90);
  if (seenQ.has(key)) warns.push('soal mirip: ' + q.id + ' vs ' + seenQ.get(key));
  seenQ.set(key, q.id);

  if (!TD.MODULE_MAP[q.module]) errors.push(q.id + ': modul tidak dikenal (' + q.module + ')');
  else if (TD.MODULE_MAP[q.module].level !== q.level)
    errors.push(q.id + ': level ' + q.level + ' tidak cocok dengan modul ' + q.module);

  if (q.options.length !== 4) warns.push(q.id + ': jumlah opsi ' + q.options.length);
  if (q.answer < 0 || q.answer >= q.options.length) errors.push(q.id + ': indeks jawaban di luar jangkauan');
  if (new Set(q.options.map(o => o.trim().toLowerCase())).size !== q.options.length)
    errors.push(q.id + ': ada opsi jawaban yang duplikat');
  if (q.options.some(o => !o || !o.trim())) errors.push(q.id + ': ada opsi kosong');
  if (!q.explain || q.explain.length < 40) errors.push(q.id + ': pembahasan terlalu pendek');
  if (!['mudah', 'sedang', 'sulit'].includes(q.difficulty)) warns.push(q.id + ': difficulty ' + q.difficulty);
  if (!/[?.]$|\.\.\.$/.test(q.q.trim())) warns.push(q.id + ': pertanyaan tidak diakhiri tanda baca');
});

// sebaran per modul
const byMod = {};
bank.forEach(q => { byMod[q.module] = (byMod[q.module] || 0) + 1; });

console.log('=== TeknikalDrill — validasi bank soal ===');
console.log('File data   :', dataFiles.length);
console.log('Total soal  :', bank.length);
console.log('  RTA       :', bank.filter(q => q.level === 'RTA').length);
console.log('  CTA       :', bank.filter(q => q.level === 'CTA').length);
console.log('\nSebaran per unit kompetensi:');
TD.MODULES.forEach(m => {
  const n = byMod[m.id] || 0;
  console.log('  ' + (m.level + '  ' + m.id).padEnd(24) + String(n).padStart(4) + ' soal' + (n === 0 ? '   << KOSONG' : ''));
});
const diff = {};
bank.forEach(q => { diff[q.difficulty] = (diff[q.difficulty] || 0) + 1; });
console.log('\nSebaran kesulitan:', JSON.stringify(diff));

// sebaran posisi kunci jawaban (deteksi bias)
const keyPos = [0, 0, 0, 0];
bank.forEach(q => { keyPos[q.answer]++; });
console.log('Posisi kunci A/B/C/D:', keyPos.join(' / '));

if (warns.length) { console.log('\nPeringatan (' + warns.length + '):'); warns.forEach(w => console.log('  ! ' + w)); }
if (errors.length) { console.log('\nERROR (' + errors.length + '):'); errors.forEach(e => console.log('  x ' + e)); process.exit(1); }
console.log('\nSemua soal lolos validasi.');
