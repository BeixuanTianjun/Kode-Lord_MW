# Spill de Tea — Website

Landing page untuk **Spill de Tea**, brand milk tea botolan pre-order untuk event
kampus (Venture Creation Project, Binus University). Konsep visual mengikuti arah
tea house premium modern ala Chagee — jade hijau tua, cream, aksen emas, tipografi
serif — dengan tambahan **cup 3D interaktif** dan motion di sepanjang halaman.

Semua isi (harga, HPP, margin, alur produksi, fase ekspansi) diambil dari pitch deck.

## Cara menjalankan

Halaman ini statis murni — tidak butuh build step, tidak butuh internet.

```bash
# buka langsung
open index.html

# atau lewat server lokal (disarankan)
npx http-server . -p 8080 -c-1
```

Situsnya statis murni — tidak ada build step, tidak ada dependency yang perlu
di-install.

## Deploy

`index.html` ada di root repo, jadi tidak perlu file konfigurasi apa pun:

- **Vercel / Netlify** — import repo ini, Framework Preset **Other**, Build
  Command dan Output Directory dikosongkan, lalu Deploy.
- **GitHub Pages** — Settings -> Pages, pilih branch-nya, folder `/ (root)`.
- **Hosting biasa / cPanel** — unggah seluruh isi repo apa adanya.

Seluruh path aset di halaman ini relatif, jadi situsnya aman dipasang di root
domain maupun di dalam subfolder.

## Struktur

```
.
├── index.html              # seluruh markup halaman
├── css/
│   ├── fonts.css           # @font-face untuk font yang di-host sendiri
│   └── style.css           # design system + seluruh komponen
├── js/
│   ├── scene.js            # cup 3D (three.js) — dibangun proceduraly
│   └── main.js             # loader, reveal, counter, nav, form, cursor
├── vendor/
│   └── three.min.js        # three.js r128 (lokal, bukan CDN)
└── assets/fonts/           # Cormorant Garamond + Manrope (woff2)
```

## Cup 3D

`js/scene.js` membangun gelasnya langsung lewat kode — tidak ada file model
eksternal yang perlu di-load:

- **Badan cup** — `LatheGeometry` dari profil siluet, material kertas opaque
- **Wrap cetak** — setinggi badan cup, teksturnya di-generate di
  `js/brandmark.js` (lihat bawah)
- **Tutup** — skirt + kubah gelap dengan cincin emas
- **Bayangan kontak dan partikel** melayang di sekitarnya

Cup-nya opaque seperti cup kertas, jadi isinya memang tidak terlihat — itu
disengaja mengikuti arahan desain. Warna tiap varian minuman tetap terbaca di
ilustrasi cup pada kartu menu (CSS, bukan 3D).

### Wrap & emblem

`js/brandmark.js` menggambar seluruh artwork sleeve ke `<canvas>`:

- Motif botani — daun, pakis, melati, mawar — disebar di grid ber-jitter supaya
  rata, dari seed tetap supaya tidak berubah tiap reload, dan digandakan di
  sambungan supaya menyambung melingkari cup
- Band jade bergaris emas berisi wordmark, strapline di bawahnya
- Emblem rumah: `assets/emblem.png`, artwork logo asli yang dipotong dari
  kertasnya (alpha dari jarak ke warna kertas, di-unpremultiply supaya tepinya
  tajam). Path-nya dideklarasikan sekali di `brandmark.js` lalu disuntikkan ke
  setiap elemen `[data-emblem]` — navigasi, footer, loader

Interaksi: gelas berputar pelan, mengikuti posisi kursor/jari, lalu bergeser dan
mengecil saat halaman di-scroll turun.

**Framing responsif** — di desktop gelas jadi objek utama di kanan hero; di tablet
dan HP ukurannya mengecil dan mundur jadi elemen latar supaya teks tetap terbaca.

Kalau WebGL tidak tersedia, halaman otomatis jatuh ke ilustrasi botol CSS
(`.stage__fallback`) tanpa error.

## Motion

- Loader dengan progress bar + logo yang tergambar
- Judul hero dianimasikan per huruf
- Reveal on scroll untuk tiap section, dengan *safety sweep* berkala supaya tidak
  ada konten yang tertinggal tak terlihat kalau di-scroll terlalu cepat
- Counter angka, bar chart harga, dan ring margin 68% yang mengisi saat masuk layar
- Garis progress di bagian "Cara Order" yang mengikuti scroll
- Strip alur produksi 9 langkah yang bisa di-drag
- Custom cursor + tombol magnetik (otomatis nonaktif di perangkat sentuh)
- Marquee, hover state pada kartu, dan scroll-spy di navigasi

Seluruh animasi dimatikan otomatis untuk pengguna dengan
`prefers-reduced-motion: reduce`.

## Form pre-order

Form di section terakhir berjalan sepenuhnya di sisi klien: validasi, kalkulasi
total (termasuk diskon paket 5 botol hemat Rp5.000 dan 10 botol gratis 1), lalu
menampilkan struk dengan kode order. **Belum ada backend** — pesanan tidak terkirim
ke mana pun. Untuk dipakai betulan, sambungkan submit handler di
`js/main.js` ke Google Form, WhatsApp API, atau endpoint lain.

## Catatan aset

Three.js dan kedua font di-host di dalam repo (bukan CDN), jadi situs tetap jalan
offline, di jaringan tertutup, dan tanpa request ke pihak ketiga.
