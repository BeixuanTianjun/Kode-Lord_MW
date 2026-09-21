# TeknikalDrill — Mock Test RTA & CTA

Aplikasi web latihan soal bergaya Quizizz untuk persiapan sertifikasi analis teknikal
**RTA® (Regular/Registered Technical Analyst)** dan **CTA® (Certified Technical Analyst)**.
Setiap soal punya **pembahasan**, jadi yang salah langsung ketahuan salahnya di mana.

Statis sepenuhnya — tanpa build, tanpa server, tanpa dependency. Buka `index.html`, langsung jalan.

## Isi bank soal

**428 soal orisinal** yang disusun mengikuti unit kompetensi skema sertifikasi analis teknikal BNSP:

| Level | Unit kompetensi | Soal |
|---|---|---|
| RTA | Pengertian & Penggunaan Analisis Teknikal | 35 |
| RTA | Mengkonstruksi Grafik (Chart) | 31 |
| RTA | Trend, Reversal & Consolidation | 35 |
| RTA | Menentukan Level Kunci Harga | 30 |
| RTA | Menerapkan Indikator Teknikal | 45 |
| RTA | Rencana Trading & Manajemen Risiko | 28 |
| RTA | Menyusun & Mempublikasikan Riset Teknikal | 20 |
| CTA | Teori & Filosofi Lanjutan | 22 |
| CTA | Elliott Wave & Rasio Fibonacci | 25 |
| CTA | Candlestick & Price Action Lanjutan | 25 |
| CTA | Siklus, Seasonality & Analisis Waktu | 18 |
| CTA | Market Breadth, Sentimen & Intermarket | 22 |
| CTA | Sistem Trading, Backtesting & Optimasi | 25 |
| CTA | Manajemen Portofolio & Position Sizing | 22 |
| CTA | Analisis Multi-Aset | 25 |
| CTA | Statistik & Kuantitatif untuk Analis | 20 |

Soal dan materi ditulis sendiri berdasarkan literatur standar analisis teknikal (Murphy, Wilder,
Dow Theory, Elliott, Wyckoff, Pring, Bollinger, dll), **bukan hasil menyalin bank soal berbayar
milik pihak lain** dan bukan soal ujian resmi BNSP/LSP.

## Mode latihan

| Mode | Cara kerja |
|---|---|
| 🎯 **Latihan per Unit** | Pilih unit kompetensi, tanpa batas waktu, pembahasan langsung muncul tiap soal |
| ⏱️ **Simulasi Ujian** | 50/75/100 soal, timer 120 menit, pembahasan baru dibuka di akhir, passing grade 70% |
| ⚡ **Rapid Fire** | 20 detik per soal, poin bonus untuk kecepatan dan streak |
| 🩹 **Drill Soal Salah** | Hanya soal yang pernah dijawab salah atau ditandai |
| 🃏 **Flashcard** | Kartu bolak-balik soal ↔ jawaban + pembahasan, tanpa skor |
| 📚 **Materi & Mind Map** | Ringkasan per unit, peta konsep interaktif, daftar jebakan ujian |
| 📊 **Progress & Rapor** | Akurasi per unit, topik terlemah, riwayat sesi |

Fitur lain: poin & streak, tandai soal, review lengkap di akhir sesi (filter semua/salah/ditandai),
tema gelap–terang, pintasan keyboard (`1`–`4` untuk menjawab, `Enter` untuk lanjut,
`←`/`→`/`Space` di flashcard), dan progress tersimpan otomatis di browser (localStorage).

## Materi ringkas & mind map

Selain bank soal, tiap unit kompetensi punya halaman materi dengan tiga tab:

- **📖 Ringkasan** — 78 topik berisi **334 poin kunci** (definisi, rumus, angka yang sering ditanya)
- **🧠 Mind Map** — peta konsep interaktif dengan **302 node**, cabang bisa dibuka-tutup,
  konektor digambar otomatis sebagai kurva SVG mengikuti posisi elemen
- **⚠️ Jebakan Ujian** — **38 catatan** kesalahan yang sering terjadi (mis. RSI di atas 70 pada
  tren kuat bukan sinyal jual; volatilitas disetahunkan pakai √252, bukan ×252)

Dari halaman materi ada tombol langsung ke **latihan soal unit itu** atau **flashcard unit itu**.
Isi mind map diturunkan otomatis dari label `mm` tiap section, jadi materi tidak perlu ditulis dua kali.

## Menjalankan

```bash
# paling gampang — buka langsung
xdg-open index.html      # Linux
open index.html          # macOS

# atau lewat server lokal
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

Untuk hosting: cukup taruh folder ini di GitHub Pages / Netlify / Vercel, tidak ada langkah build.

## Menambah soal sendiri

### Cara cepat: import dari UI
Di halaman utama ada kotak **Bank soal sendiri**. Pilih file `.json` atau `.csv`, soal langsung
gabung ke bank dan ikut dipakai di semua mode. Tombol **Unduh template CSV** menyediakan contoh format.

Format CSV (kolom `answer` diisi `A`/`B`/`C`/`D`):

```csv
level,module,difficulty,question,a,b,c,d,answer,explanation
RTA,rta-indikator,sedang,"Periode default RSI menurut Wilder?","7","9","14","21",C,"Wilder memakai periode 14."
```

Format JSON:

```json
[{ "level":"CTA", "module":"cta-elliott", "difficulty":"sulit",
   "q":"Pertanyaan...", "options":["A","B","C","D"], "answer":2,
   "explain":"Pembahasan..." }]
```

`answer` pada JSON adalah **indeks** (0 = opsi pertama). `module` harus salah satu id di
`assets/js/data.js`; kalau tidak dikenal, soal otomatis dimasukkan ke unit default sesuai levelnya.

### Cara permanen: tambah file bank
1. Buat `data/nama-file.js` yang memanggil `TD.register([...])` (tiru file yang sudah ada).
2. Daftarkan `<script src="data/nama-file.js"></script>` di `index.html`.
3. Jalankan validator.

## Validator

```bash
node tools/validate.js
```

Mengecek id ganda, indeks kunci jawaban, modul tak dikenal, opsi duplikat/kosong, pembahasan
terlalu pendek, soal kembar, plus kelengkapan materi tiap unit (section, label mind map, poin,
jebakan) dan ringkasan sebaran soal per unit maupun tingkat kesulitan.

## Struktur

```
RTA_CTA_Quiz/
├── index.html              # kerangka semua halaman
├── assets/css/style.css    # tema, komponen, responsif
├── assets/js/data.js       # metadata unit kompetensi + registry bank soal
├── assets/js/app.js        # mesin kuis (sesi, skor, timer, review, import)
├── data/rta-*.js           # bank soal RTA per unit kompetensi
├── data/cta-*.js           # bank soal CTA per unit kompetensi
├── data/notes-*.js         # materi ringkas + label mind map + jebakan ujian
└── tools/validate.js       # validator bank soal
```

## Catatan

Aplikasi ini alat latihan mandiri, bukan produk resmi dan tidak berafiliasi dengan
BNSP, LSP, AATI, maupun IFTA. Materi ujian sebenarnya dapat berbeda — gunakan ini sebagai
pelengkap materi resmi dari lembaga pelatihan, bukan pengganti.
