/* Study notes + mind map — CTA bagian 1 */
TD.registerNotes([
{module:"cta-teori", tagline:"Landasan akademis dan psikologis di balik metode teknikal.",
 sections:[
  {h:"Hipotesis pasar", mm:["EMH 3 bentuk","Random walk","AMH","Fractal market"], points:[
   "EMH: bentuk lemah (harga historis), semi kuat (semua info publik), kuat (termasuk info privat).",
   "Random walk: perubahan harga independen sehingga pola masa lalu tak punya daya prediksi.",
   "Adaptive Market Hypothesis (Andrew Lo): efisiensi berubah-ubah mengikuti adaptasi pelaku — menjelaskan strategi yang bekerja lalu memudar.",
   "Fractal Market Hypothesis (Peters): stabilitas berasal dari beragamnya horizon investasi; krisis terjadi saat semua horizon menyatu jadi jangka sangat pendek."]},
  {h:"Bukti empiris", mm:["Momentum effect","Mean reversion","Fat tails","Likuiditas"], points:[
   "Jegadeesh & Titman: saham pemenang 3–12 bulan cenderung melanjutkan kinerja — dukungan akademis terkuat bagi premis tren.",
   "Momentum dan mean reversion hidup berdampingan karena bekerja pada HORIZON BERBEDA: jangka sangat pendek berbalik, menengah momentum, sangat panjang mean reverting.",
   "Distribusi imbal hasil berekor gemuk (fat tails): peristiwa ekstrem lebih sering daripada prediksi kurva normal.",
   "Anomali cenderung menyusut pada instrumen sangat likuid dan terpantau ketat karena cepat terarbitrase."]},
  {h:"Bias perilaku", mm:["Herding","Prospect theory","Anchoring","Overconfidence","Recency","Konfirmasi"], points:[
   "Herding: mengikuti mayoritas sehingga pergerakan saling menguatkan dan tren bertahan melampaui nilai wajar.",
   "Prospect theory (Kahneman & Tversky): rugi terasa lebih sakit daripada nikmatnya untung setara → perilaku asimetris.",
   "Anchoring: terpaku pada harga beli pribadi yang sebenarnya tak berarti bagi pasar.",
   "Overconfidence: memperbesar posisi dan frekuensi; trader terlalu aktif cenderung imbal hasil bersihnya lebih rendah.",
   "Recency bias: memberi bobot berlebihan pada kejadian terbaru.",
   "Bias konfirmasi: mencari pembenaran atas pandangan awal. Penangkal: tetapkan level pembatalan sejak awal."]},
  {h:"Reflexivity & Wyckoff", mm:["Soros","Composite operator","Spring","Effort vs result"], points:[
   "Reflexivity (Soros): persepsi pelaku dapat mengubah fundamental itu sendiri — umpan balik dua arah yang membentuk gelembung.",
   "Wyckoff: siklus akumulasi → markup → distribusi → markdown, digerakkan composite operator.",
   "Spring: penembusan singkat ke bawah support untuk menguji sisa pasokan; pulih cepat dengan volume tak membesar = pasokan menipis.",
   "Effort vs result: volume besar (upaya) seharusnya menghasilkan pergerakan setara; ketidaksesuaian menandai titik balik."]},
  {h:"Bias riset", mm:["Data snooping","Survivorship","Definisi pola"], points:[
   "Data snooping: terlalu banyak strategi diuji pada data sama sehingga sebagian tampak berhasil karena kebetulan.",
   "Survivorship bias: data hanya berisi emiten yang masih tercatat, mengabaikan yang delisting.",
   "Kritik akademis atas pola grafik: definisinya subjektif sehingga sulit direplikasi; dijawab lewat pengenalan pola terkuantifikasi (Lo, Mamaysky & Wang)."]}],
 jebakan:[
  "Analisis teknikal TIDAK bisa memprediksi guncangan eksternal mendadak — nilainya ada pada kerangka respons yang disiapkan lebih dulu.",
  "Indeks lebih andal dianalisis daripada saham individual karena agregasi meredam peristiwa spesifik emiten."]},

{module:"cta-elliott", tagline:"Struktur gelombang dan proporsi rasio.",
 sections:[
  {h:"Struktur dasar", mm:["5 impulse + 3 korektif","Fraktal","Derajat"], points:[
   "Satu siklus = 5 gelombang searah tren (1-2-3-4-5) + 3 gelombang koreksi (A-B-C).",
   "Fraktal: tiap gelombang tersusun dari gelombang berderajat lebih kecil dengan struktur serupa.",
   "Derajat gelombang WAJIB disebut agar rekomendasi merujuk horizon yang sama."]},
  {h:"Tiga aturan mutlak", mm:["W2 ≤ 100% W1","W3 bukan terpendek","W4 tak masuk W1"], points:[
   "Gelombang 2 tidak boleh retrace lebih dari 100% gelombang 1 (tak boleh melewati titik awalnya).",
   "Gelombang 3 tidak boleh yang TERPENDEK di antara 1, 3, dan 5 — bukan berarti harus terpanjang.",
   "Gelombang 4 tidak boleh memasuki wilayah harga gelombang 1 pada impulse standar.",
   "Pelanggaran salah satunya membatalkan penghitungan."]},
  {h:"Pedoman & rasio", mm:["Alternation","W3 = 161,8%","W4 dangkal","Extension"], points:[
   "Alternation: bila gelombang 2 tajam (zigzag), gelombang 4 cenderung mendatar/segitiga, dan sebaliknya.",
   "Gelombang 3 paling lazim 161,8% dari gelombang 1 (261,8% bila extension).",
   "Gelombang 2 biasanya retrace 50–61,8% dari W1; gelombang 4 lebih dangkal, 23,6–38,2% dari W3.",
   "Extension: umumnya hanya SATU dari W1/W3/W5 yang memanjang — pada saham paling sering W3.",
   "Gelombang C zigzag sering 61,8–100% dari gelombang A."]},
  {h:"Pola koreksi", mm:["Zigzag 5-3-5","Flat 3-3-5","Segitiga","Double zigzag"], points:[
   "Zigzag: struktur 5-3-5, koreksi tajam dan dalam.",
   "Flat: struktur 3-3-5, mendatar dan makan waktu. Expanded flat: gelombang B melampaui awal A, lalu C turun lebih dalam dari akhir A — sering menjebak.",
   "Segitiga: lima gelombang korektif, paling sering di gelombang 4 atau B, menandakan masih ada satu kaki terakhir.",
   "Double zigzag: dua zigzag dihubungkan gelombang X (koreksi kompleks)."]},
  {h:"Akhir siklus", mm:["Truncated 5th","Ending diagonal","Divergensi","Volume"], points:[
   "Truncated fifth: gelombang 5 gagal melampaui puncak gelombang 3 → tekanan jual kuat, biasanya diikuti penurunan tajam.",
   "Ending diagonal (wedge di gelombang 5): momentum menipis, harga sering kembali cepat ke awal diagonal.",
   "Gelombang 5 mencetak puncak baru dengan momentum melemah = divergensi bearish klasik.",
   "Volume ideal: terbesar di gelombang 3, menyusut di gelombang 5."]}],
 jebakan:[
  "Kritik utama: penghitungan subjektif dan bisa direvisi setelah fakta. Praktik sehat = skenario utama + alternatif, masing-masing dengan level pembatalan.",
  "Rasio 0,618 diperoleh dari bilangan Fibonacci dibagi bilangan BERIKUTNYA; 1,618 dibagi bilangan sebelumnya."]},

{module:"cta-candle", tagline:"Membaca psikologi pasar dari bentuk dan lokasi candle.",
 sections:[
  {h:"Pola satu candle", mm:["Hammer","Shooting star","Doji","Pin bar","Marubozu"], points:[
   "Hammer: sumbu bawah panjang (min. 2× body), muncul SETELAH tren turun → bullish. Bentuk sama di puncak = hanging man (bearish).",
   "Shooting star dan inverted hammer bentuknya IDENTIK — yang membedakan hanya LOKASI dalam tren.",
   "Dragonfly doji (sumbu bawah panjang) cenderung bullish di support; gravestone doji (sumbu atas panjang) bearish di resistance.",
   "Pin bar: sumbu panjang = penolakan pasar terhadap suatu area harga."]},
  {h:"Pola dua candle", mm:["Engulfing","Harami","Dark cloud","Piercing","Tweezer"], points:[
   "Bullish engulfing: body bullish menutupi penuh body bearish sebelumnya — pembeli mengambil alih.",
   "Harami: body kedua berada DI DALAM body pertama — momentum melemah, sifatnya peringatan jeda.",
   "Dark cloud cover: buka di atas close sebelumnya, tutup di bawah titik tengah body bullish sebelumnya.",
   "Piercing line: kebalikan bullish dari dark cloud cover.",
   "Tweezer top: beberapa candle dengan high hampir sama = resistance kuat."]},
  {h:"Pola tiga candle", mm:["Morning star","Evening star","Three black crows","Rising three"], points:[
   "Morning star: bearish panjang → candle kecil (keraguan) → bullish panjang. Makin dalam candle ketiga menembus body pertama, makin kuat.",
   "Evening star: kebalikannya, pembalikan bearish di puncak.",
   "Three black crows: tiga candle bearish panjang dengan close makin rendah.",
   "Rising three methods: pola PENERUSAN bullish — candle besar, beberapa candle kecil di dalam rentangnya, lalu candle besar lagi."]},
  {h:"Price action modern", mm:["Inside/outside bar","Break of structure","Liquidity sweep"], points:[
   "Inside bar: rentang di dalam rentang sebelumnya = kompresi volatilitas; tembus batas induk jadi pemicu.",
   "Outside bar: rentang melampaui periode sebelumnya di kedua sisi = ekspansi volatilitas dan perebutan arah.",
   "Break of structure: harga menembus swing high/low terakhir → struktur tren berubah (penegasan ulang prinsip Dow).",
   "Liquidity sweep: penembusan singkat di luar level untuk memicu order stop, lalu harga berbalik."]},
  {h:"Aturan main", mm:["Konteks","Volume","Konfluensi","Realistis"], points:[
   "Prinsip terpenting: nilai pola dalam KONTEKS tren, lokasi terhadap level kunci, dan volume. Tanpa konteks = tebak bentuk.",
   "Volume tinggi pada candle pembalikan memperkuat sinyal; pembalikan bervolume tipis rawan gagal.",
   "Konfluensi terbaik: pola pembalikan tepat di area Fibonacci / support penting → stop logis tepat di luar area itu.",
   "Pada timeframe sangat pendek, banyak pola terbentuk karena kebetulan (noise tinggi).",
   "Tingkat keberhasilan pola umumnya MODERAT dan bervariasi — tetap butuh manajemen risiko."]}],
 jebakan:[
  "Shooting star vs inverted hammer: bedanya lokasi, bukan bentuk. Soal jebakan klasik.",
  "Tantangan pengujian kuantitatif: 'sumbu panjang' dan 'body kecil' harus diterjemahkan ke ambang numerik yang tegas."]}
]);
