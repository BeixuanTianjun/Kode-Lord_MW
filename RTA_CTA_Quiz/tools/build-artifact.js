#!/usr/bin/env node
/* Menyiapkan versi halaman untuk publikasi Artifact.
   Artifact membungkus berkas dengan skeleton <!doctype html><head>…<body>,
   jadi wrapper dokumen milik kita dilepas dan hanya menyisakan
   <title>, <link>, lalu seluruh isi <body>. */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

const title = (src.match(/<title>([\s\S]*?)<\/title>/) || [, 'TeknikalDrill'])[1].trim();
const links = (src.match(/<link\b[^>]*rel="(?:stylesheet|preconnect)"[^>]*>/g) || []).join('\n');
const body = src.slice(src.indexOf('<body>') + 6, src.lastIndexOf('</body>')).trim();

const out = `<title>${title}</title>\n${links}\n\n${body}\n`;
const dist = path.join(root, 'dist');
fs.mkdirSync(dist, { recursive: true });
fs.writeFileSync(path.join(dist, 'index.html'), out);

console.log('dist/index.html siap —', out.length.toLocaleString('id-ID'), 'karakter');
console.log('judul  :', title);
console.log('link   :', (links.match(/<link/g) || []).length);
if (/<(?:html|head|body)\b/i.test(out)) { console.error('ERROR: masih ada tag wrapper dokumen'); process.exit(1); }
