# Aura Monitor

Recreation dari "confidence booster app" yang lagi rame di reels: webcam jalan sebagai
monitor CCTV, muka kamu di-lock kotak wireframe hijau, terus panel di pojok kanan atas
nge-render sigma edit dari frame muka kamu detik itu juga.

Satu file HTML, tanpa dependency, tanpa build step. Semua pemrosesan jalan di browser —
nggak ada frame yang diupload ke mana-mana.

## Cara jalanin

Kamera butuh secure context, jadi buka `index.html` lewat server lokal (bukan double-klik
`file://`, karena Chrome nolak `getUserMedia` di situ):

```bash
cd Sigma_Monitor
python3 -m http.server 8000
```

Terus buka `http://localhost:8000`. Klik **Initialize feed** dan kasih izin kamera.

Kalau nggak ada kamera atau izinnya ditolak, klik **Demo tanpa kamera** — app-nya jalan
penuh pakai sinyal sintetis, semua efeknya tetap kelihatan.

## Cara kerjanya

| Bagian | Isi |
| --- | --- |
| Deteksi muka | Pakai `FaceDetector` API kalau browser-nya punya. Kalau nggak, fallback ke detektor sendiri: klasifikasi piksel skin-tone di grid 48×36, flood-fill buat cari blob terbesar, terus bias ke blob yang posisinya paling atas (muka biasanya di atas tangan). |
| Lock | Kotak di-smooth pakai EMA biar nggak gemetaran. Kalau muka kedeteksi terus selama `lock_frames` frame berturut-turut, edit-nya ke-trigger. |
| Capture | Frame muka di-crop kotak (plus padding 50%) ke canvas 520×520. |
| Edit | Lima preset efek canvas 2D — grayscale phonk, RGB channel split, bloom glow, glitch slice, sama echo trail. Semuanya di-generate on the fly dari frame tadi, bukan video yang udah jadi. |
| Audio | Kick sama whoosh di-synthesize pakai Web Audio API. Default mati, nyalain di `audio_fx`. |

## config.json

Panel `config.json` di bawah monitor nyetir app-nya langsung, dan setting-nya disimpan
di `localStorage`:

- `sensitivity` — makin tinggi makin gampang muka kedeteksi. Naikin kalau ruangannya gelap.
- `lock_frames` — harus diam berapa lama sebelum edit ke-trigger.
- `cooldown_ms` — jeda sebelum edit berikutnya bisa jalan.
- `tracking_hud` — tampilin/sembunyiin kotak wireframe.
- `mirror_feed` — feed dibalik kayak cermin (default nyala).
- `audio_fx` — kick sama whoosh pas edit jalan.

## Ganti preset edit

Edit array `EDITS` di dalam `index.html`. `cap` itu teks yang muncul, `fx` nunjuk ke
renderer di `renderFX()`, `dur` durasi dalam ms, dan `takeover: true` bikin edit-nya
ngambil alih seluruh layar, bukan cuma panel pojok.

```js
{id:"edit_1", name:"PHONK LOCK", fx:"phonk", dur:2600, cap:"HE HAS NO IDEA"},
```

## Catatan

- Deteksi skin-tone itu heuristik, bukan ML — dia bisa kepancing sama tangan atau benda
  warna kulit. Ruangan terang + background yang nggak seramai mungkin bikin jauh lebih stabil.
- `prefers-reduced-motion` dihormatin: shake, strobe, sama invert flash dimatiin.
