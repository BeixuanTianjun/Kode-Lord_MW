/* Study notes + mind map — RTA bagian 1.
   sections[].mm = label pendek untuk cabang mind map. */
TD.registerNotes([
{module:"rta-dasar", tagline:"Fondasi: kenapa harga layak dianalisis dari grafik.",
 sections:[
  {h:"Tiga premis dasar (Murphy)", mm:["Harga diskon semua","Harga bertren","Sejarah berulang"], points:[
   "Market action discounts everything — semua faktor fundamental, politik, dan psikologis sudah tercermin di harga. Konsekuensinya cukup pelajari harga.",
   "Prices move in trends — tren dianggap berlanjut sampai ada bukti pembalikan yang definitif.",
   "History repeats itself — pola berulang karena psikologi pelaku pasar (rakus dan takut) relatif stabil sepanjang waktu."]},
  {h:"Dow Theory", mm:["3 jenis tren","3 fase pasar","Konfirmasi indeks","Volume"], points:[
   "Tiga pergerakan: primary (1 tahun+), secondary (3 minggu–3 bulan, koreksi 1/3–2/3), minor (kurang dari 3 minggu).",
   "Tiga fase bull: akumulasi → partisipasi publik → distribusi. Bear: distribusi → panik → putus asa.",
   "Prinsip konfirmasi: indeks industrial dan transportasi harus searah agar sinyal sah.",
   "Volume adalah konfirmasi sekunder: membesar searah tren utama, mengecil saat koreksi.",
   "Pengecualian Dow: act of God atau bencana tak terduga tidak bisa didiskon lebih dulu."]},
  {h:"Teknikal vs fundamental", mm:["Akibat vs sebab","Kapan vs apa","Komplementer"], points:[
   "Fundamental mempelajari sebab (nilai intrinsik), teknikal mempelajari akibat (aksi harga).",
   "Fundamental menjawab APA yang dibeli, teknikal menjawab KAPAN dan di level berapa.",
   "Keunggulan teknikal: lintas instrumen (saham, obligasi, valas, komoditas, derivatif, kripto) dan lintas timeframe karena sifatnya fraktal."]},
  {h:"Kritik & keterbatasan", mm:["Subjektif","Lag sinyal","Self-fulfilling","Random walk / EMH"], points:[
   "Subjektivitas penarikan garis dan penafsiran pola; sinyal bisa terlambat karena berbasis data yang sudah terjadi.",
   "Self-fulfilling prophecy: level populer bekerja karena ramai diawasi, tapi jadi sasaran stop hunting.",
   "EMH bentuk lemah menyatakan harga historis sudah tercermin sehingga teknikal tak memberi abnormal return; dibantah lewat bukti momentum dan autokorelasi.",
   "Behavioral finance memberi landasan teoretis: herding, anchoring, loss aversion, overconfidence."]},
  {h:"Alur kerja analis", mm:["Baca tren","Tandai level","Konfirmasi","Rencana"], points:[
   "Urutan baku: identifikasi tren → tentukan level kunci → konfirmasi indikator dan volume → susun rencana entry, stop, target.",
   "Top down: indeks pasar → sektor terkuat → saham terbaik di sektor itu.",
   "Hindari menentukan target lebih dulu lalu mencari pembenarannya — itu bias konfirmasi."]}],
 jebakan:[
  "Soal sering menguji bahwa fleksibilitas lintas instrumen adalah KEUNGGULAN, bukan kelemahan teknikal.",
  "Koreksi sekunder Dow = sepertiga sampai dua pertiga, bukan selalu 50 persen.",
  "Indikator leading = oscillator (RSI, stochastic). Lagging = MA, MACD, ADX."]},

{module:"rta-chart", tagline:"Cara menyajikan data harga supaya informasinya kebaca.",
 sections:[
  {h:"Jenis grafik", mm:["Line","Bar OHLC","Candlestick","P&F","Renko"], points:[
   "Line chart: satu data per periode (umumnya close). Paling bersih untuk melihat struktur tren besar.",
   "Bar chart OHLC: garis vertikal = rentang high-low, tick kiri = open, tick kanan = close.",
   "Candlestick: body = open ke close, shadow = high dan low. Informasi sama dengan bar, tapi jauh lebih intuitif.",
   "Point and figure: kolom X (naik) dan O (turun), mengabaikan waktu. Kolom baru muncul bila harga berbalik sebesar box size × reversal amount.",
   "Renko: bata baru hanya saat harga bergerak sebesar brick size. Tren bersih, tapi waktu dan harga ekstrem hilang."]},
  {h:"Skala harga", mm:["Aritmatik","Logaritmik"], points:[
   "Aritmatik: jarak vertikal sama untuk perubahan NOMINAL sama.",
   "Logaritmik: jarak vertikal sama untuk perubahan PERSENTASE sama — wajib untuk data jangka sangat panjang atau harga yang berubah berlipat.",
   "Level Fibonacci pada skala log berbeda dari skala aritmatik pada pergerakan besar, jadi skala harus disebut di laporan."]},
  {h:"Timeframe", mm:["Sesuai horizon","Multiple time frame","Noise"], points:[
   "Pilih timeframe sesuai horizon posisi: bulanan/mingguan (investor), harian (swing), intraday (day trader).",
   "Multiple time frame: timeframe besar menentukan ARAH, timeframe kecil menentukan TITIK MASUK. Rasio lazim 1:4 sampai 1:6.",
   "Makin pendek periode, makin tinggi rasio noise terhadap sinyal dan makin besar pengaruh biaya transaksi."]},
  {h:"Volume & data", mm:["Histogram","Volume profile","Adjusted data","Gap"], points:[
   "Volume ditampilkan sebagai histogram di panel bawah, sejajar sumbu waktu grafik harga.",
   "Volume profile memetakan volume per LEVEL HARGA (bukan waktu); area padat / point of control jadi magnet harga.",
   "Data wajib disesuaikan (adjusted) setelah split dan dividen, kalau tidak akan muncul gap semu yang merusak pola dan indikator.",
   "Gap = rentang harga yang tidak diperdagangkan; sering jadi zona support/resistance saat diuji ulang."]},
  {h:"Bentuk candle dasar", mm:["Marubozu","Doji","Heikin Ashi"], points:[
   "Marubozu: body panjang tanpa sumbu — satu sisi dominan sepanjang periode.",
   "Doji: open dan close hampir sama — keseimbangan/keraguan. Maknanya tergantung lokasi dalam tren.",
   "Heikin Ashi: memakai harga rata-rata hasil perhitungan, tren tampak halus, tapi bukan harga transaksi sesungguhnya sehingga tidak untuk entry presisi."]}],
 jebakan:[
  "P&F reversal 3 box dengan box size 10 = harga harus berbalik 30 poin, bukan 3 atau 10.",
  "Renko dan P&F menghapus dimensi WAKTU, jadi tidak bisa dipakai untuk analisis siklus.",
  "Candle mingguan: open = sesi pertama minggu itu, close = sesi terakhir, high/low = ekstrem sepanjang minggu."]},

{module:"rta-trend", tagline:"Struktur tren dan pola yang menandai lanjut atau balik arah.",
 sections:[
  {h:"Struktur & garis tren", mm:["HH-HL / LH-LL","Garis tren","Channel","Fan principle"], points:[
   "Uptrend = higher high + higher low. Downtrend = lower high + lower low. Perubahan struktur = perubahan tren.",
   "Uptrend line menghubungkan minimal dua lembah yang meninggi (support dinamis); downtrend line menghubungkan puncak yang menurun (resistance dinamis).",
   "Validitas garis naik seiring jumlah sentuhan dan durasi. Garis terlalu curam justru rapuh.",
   "Channel: garis sejajar di sisi berlawanan. Tembus batas atas = akselerasi, tapi bisa juga blow off.",
   "Fan principle: setelah tiga garis tren makin landai ditembus, tren sebelumnya dianggap berakhir."]},
  {h:"Pola pembalikan", mm:["Head & shoulders","Double/triple top","Rounding","Island","V"], points:[
   "Head and shoulders: left shoulder – head – right shoulder + neckline. Sinyal saat close menembus neckline; target = tinggi head ke neckline diproyeksikan dari titik breakout.",
   "Volume ideal H&S: menurun dari shoulder ke head ke shoulder, lalu melonjak saat neckline ditembus.",
   "Double/triple top-bottom: gagal menembus level sama berulang; sah setelah level di antaranya ditembus. Triple lebih kuat karena basis lebih matang.",
   "Rounding/saucer: peralihan dominasi bertahap, volume mengering di dasar lalu membesar.",
   "Island reversal: gap searah tren → beberapa sesi terisolasi → gap berlawanan. V bottom sulit ditransaksikan karena tak ada fase basis.",
   "Prasyarat semua pola pembalikan: harus ADA tren sebelumnya untuk dibalik."]},
  {h:"Pola penerusan", mm:["Segitiga","Flag/pennant","Rectangle","Cup & handle"], points:[
   "Segitiga simetris (dua sisi konvergen, netral), menaik (resistance datar + support naik, cenderung bullish), menurun (kebalikannya).",
   "Breakout segitiga paling andal di 1/2 sampai 3/4 panjang pola; kalau merayap sampai apex, energinya habis.",
   "Flag: konsolidasi pendek miring melawan tren setelah flagpole; target sepanjang tiang bendera (measured move).",
   "Rectangle: selesai saat close di luar batas dengan volume mendukung.",
   "Cup and handle: akumulasi berbentuk U + koreksi dangkal, breakout di bibir cangkir."]},
  {h:"Wedge & broadening", mm:["Rising wedge","Falling wedge","Megaphone","Diamond"], points:[
   "Rising wedge (dua garis naik menyempit) = momentum melemah → bearish. Falling wedge = bullish.",
   "Broadening/megaphone: volatilitas melebar, pasar tidak stabil, sering di puncak yang penuh emosi.",
   "Diamond top: broadening lalu menyempit; tembus sisi kanan bawah = bearish."]},
  {h:"Breakout & jebakan", mm:["Throwback","False breakout","Filter"], points:[
   "Throwback/pullback: harga menguji ulang level breakout dari sisi seberang (role reversal) — peluang entry berisiko rendah.",
   "False breakout/bull trap: penembusan bervolume tipis yang cepat ditarik kembali ke dalam range.",
   "Filter pengurang jebakan: syarat close di luar level, ambang persentase, syarat volume, atau tunggu retest.",
   "Divergensi: harga higher high tapi momentum lower high = peringatan dini, bukan sinyal jual langsung."]}],
 jebakan:[
  "Makin panjang dan lebar pola terbentuk, makin besar implikasi pergerakan setelahnya.",
  "Garis tren ditembus = perubahan LAJU, belum tentu pembalikan tren. Butuh konfirmasi struktur.",
  "Pola konsolidasi lebih SERING berakhir dengan kelanjutan tren, bukan pembalikan."]},

{module:"rta-level", tagline:"Menentukan di harga berapa keputusan diambil.",
 sections:[
  {h:"Support & resistance", mm:["Definisi","Role reversal","Kekuatan level","Zona"], points:[
   "Support: permintaan menyerap pasokan sehingga penurunan tertahan. Resistance: kebalikannya.",
   "Role reversal: support tertembus → jadi resistance, dan sebaliknya. Penyebabnya pelaku yang merugi ingin impas.",
   "Kekuatan level naik seiring jumlah sentuhan, lamanya bertahan, dan volume di sekitarnya. Level yang juga tampak di timeframe besar lebih dihormati.",
   "Perlakukan sebagai ZONA, bukan satu angka presisi — pasar tidak pernah presisi.",
   "Relevansi level memudar seiring waktu, kecuali level ekstrem historis yang terus dikutip."]},
  {h:"Fibonacci", mm:["Retracement","Extension","Cara menarik"], points:[
   "Retracement utama: 23,6% / 38,2% / 50% / 61,8% / 78,6%. Level 50% bukan rasio Fibonacci, warisan Dow Theory.",
   "Koreksi dangkal (38,2%) = tren kuat. Koreksi melebihi 61,8% memperbesar peluang pembalikan, bukan sekadar jeda.",
   "Extension untuk target di luar pergerakan: 127,2% / 161,8% / 261,8%.",
   "Kesalahan umum: menarik dari ayunan yang tidak signifikan sehingga level yang dihasilkan acak."]},
  {h:"Pivot point", mm:["Rumus PP","R1-R3 / S1-S3"], points:[
   "Pivot klasik = (High + Low + Close) periode sebelumnya ÷ 3.",
   "Dari PP diturunkan R1 R2 R3 dan S1 S2 S3; banyak dipakai trader harian sebagai peta level intraday."]},
  {h:"Gap sebagai level", mm:["Breakaway","Runaway","Exhaustion","Common"], points:[
   "Breakaway gap: keluar dari konsolidasi, volume besar, awal tren, jarang tertutup cepat.",
   "Runaway/measuring gap: di tengah tren, sering di titik tengah pergerakan → bisa proyeksikan target.",
   "Exhaustion gap: ujung tren, volume ekstrem, biasanya cepat tertutup.",
   "Common gap pada saham sepi cenderung terisi kembali."]},
  {h:"Level lain & konfluensi", mm:["Angka bulat","MA dinamis","52-week","Confluence"], points:[
   "Angka bulat (1000, 5000) jadi level psikologis karena order menumpuk di sana.",
   "Moving average (MA50, MA200) = support/resistance DINAMIS karena nilainya bergerak.",
   "High/low 52 minggu jadi acuan psikologis dan banyak dipublikasikan media.",
   "Confluence: beberapa metode bertemu di area sama = level paling penting; tempat ideal menaruh order dan stop.",
   "Stop hunting terjadi karena stop menumpuk tepat di luar level populer — beri jarak sebesar fraksi ATR."]}],
 jebakan:[
  "Hitungan Fibonacci: naik 1.000→2.000, retrace 61,8% = 2.000 − 618 = 1.382.",
  "Pivot: (1.200+1.100+1.150)/3 = 1.150.",
  "Pada tren naik kuat, strategi jual di resistance melawan arus — lebih baik beli saat pullback ke support."]}
]);
