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

Untuk deploy: unggah folder ini apa adanya (GitHub Pages, Netlify, Vercel, cPanel).

## Struktur

```
Spill_de_Tea/
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

- **Badan gelas** — `LatheGeometry` dari profil siluet, material kaca fisik
- **Isi minuman** — `ShaderMaterial` custom dengan gradien vertikal
  (teh pekat → milk tea → lapisan susu di atas) plus fresnel di tepi
- **Boba** — 20 bola yang mengambang pelan, terlihat samar menembus minuman
- **Label** — di-generate ke `<canvas>` lalu dibungkus ke silinder
- **Tutup dome, straw, bayangan kontak, dan partikel** melayang di sekitarnya

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
