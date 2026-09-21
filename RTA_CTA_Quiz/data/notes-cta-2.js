/* Study notes + mind map — CTA bagian 2 */
TD.registerNotes([
{module:"cta-siklus", tagline:"Dimensi waktu: periodisitas, seasonality, dan proyeksi titik balik.",
 sections:[
  {h:"Anatomi siklus", mm:["Amplitudo","Periode","Fase","Harmonik"], points:[
   "Empat karakteristik: amplitudo (besar ayunan), periode (panjang siklus), fase (posisi waktu puncak/lembah), harmonik (hubungan antar siklus).",
   "Phasing: menentukan titik awal siklus; tanpa fase yang tepat, panjang siklus yang benar pun menghasilkan proyeksi meleset."]},
  {h:"Prinsip siklus", mm:["Summation","Harmonicity","Proportionality","Nominality","Translation"], points:[
   "Summation: pergerakan harga = penjumlahan beberapa siklus berbeda panjang. Lembah yang bertepatan = tekanan turun jauh lebih besar.",
   "Harmonicity: siklus berdekatan berhubungan kelipatan bilangan bulat kecil, biasanya dua kali lipat.",
   "Proportionality: siklus berperiode lebih panjang cenderung beramplitudo lebih besar.",
   "Nominality: ada sekumpulan panjang siklus baku yang jadi kerangka acuan lintas pasar.",
   "Translation: right translation (puncak setelah titik tengah) = tren kuat; left translation = lemah."]},
  {h:"Siklus ekonomi", mm:["Kitchin 40 bln","Juglar 7-11 th","Kondratieff 50-60 th","Presidential"], points:[
   "Kitchin ≈ 40 bulan (siklus persediaan), sering ditemukan pada data saham.",
   "Juglar ≈ 7–11 tahun (investasi), Kondratieff ≈ 50–60 tahun (gelombang panjang).",
   "Presidential cycle AS: tahun ketiga secara historis paling kuat; sampelnya terbatas, jadi konteks saja."]},
  {h:"Seasonality", mm:["January effect","Sell in May","Komoditas"], points:[
   "January effect: saham kapitalisasi kecil cenderung unggul di awal tahun (penjualan pajak akhir tahun + penataan portofolio).",
   "Sell in May: November–April historis lebih tinggi dari Mei–Oktober; tidak konsisten tiap tahun.",
   "Seasonality komoditas pertanian paling kokoh karena punya dasar fundamental nyata: pola tanam dan panen."]},
  {h:"Teknik & keterbatasan", mm:["Detrending","Analisis spektral","Toleransi waktu"], points:[
   "Detrending (mis. harga dikurangi MA-nya) memisahkan komponen tren agar siklus terlihat.",
   "Analisis spektral/Fourier mengurai deret jadi komponen frekuensi; terkendala data pasar yang tidak stasioner.",
   "Risiko terbesar: panjang siklus bisa BERGESER. Wajib pakai toleransi waktu + konfirmasi harga.",
   "Cara pakai yang sehat: siklus memberi ZONA WAKTU rawan berbalik, eksekusi tetap menunggu konfirmasi aksi harga."]}],
 jebakan:[
  "Seasonality rawan data mining — harus punya penjelasan ekonomi dan bertahan di luar sampel.",
  "Siklus menekankan dimensi WAKTU, Elliott menekankan STRUKTUR BENTUK; keduanya saling melengkapi."]},

{module:"cta-breadth", tagline:"Kesehatan internal pasar, sentimen, dan hubungan antar pasar.",
 sections:[
  {h:"Market breadth", mm:["AD Line","% di atas MA200","New high-low","McClellan","TRIN"], points:[
   "Advance Decline Line: selisih kumulatif jumlah saham naik dan turun — mengukur KELUASAN partisipasi.",
   "Divergensi bearish: indeks cetak puncak baru tapi AD Line gagal mengikuti → kenaikan ditopang makin sedikit saham.",
   "Persentase saham di atas MA200: mengukur keluasan tren naik; ekstrem di kedua arah = indikasi jenuh.",
   "New high–new low index: bertambahnya saham cetak titik terendah baru saat indeks masih naik = kerusakan internal.",
   "McClellan Oscillator: selisih dua EMA dari data advance-decline. TRIN/Arms: rasio jumlah saham vs rasio volumenya.",
   "Hindenburg Omen: banyak saham di KEDUA ekstrem bersamaan = pasar terpecah (sering peringatan palsu)."]},
  {h:"Sentimen", mm:["Put/call ratio","VIX","Survei bull-bear","Contrarian"], points:[
   "Put/call ratio sangat tinggi = ketakutan ekstrem, secara contrarian sering muncul dekat dasar.",
   "VIX: ekspektasi volatilitas dari harga opsi indeks (~30 hari). Melonjak saat pasar jatuh; sangat rendah = kepuasan diri.",
   "Logika contrarian: kalau semua sudah membeli, tak tersisa pembeli baru untuk mendorong harga.",
   "Indikator sentimen hanya informatif pada posisi EKSTREM; di level moderat nyaris tak berguna."]},
  {h:"Intermarket (Murphy)", mm:["Saham","Obligasi","Komoditas","Valas"], points:[
   "Empat kelas aset saling mempengaruhi lewat inflasi, suku bunga, dan siklus ekonomi.",
   "Lingkungan inflasioner: komoditas naik → ekspektasi inflasi naik → imbal hasil naik → harga obligasi turun.",
   "Hubungan ini bisa BERUBAH pada rezim deflasi — wajib diuji ulang berkala.",
   "Emas menguat bersamaan saham melemah = pergeseran ke aset lindung nilai (risk off).",
   "Yield curve terbalik = peringatan perlambatan, tapi jeda ke dampaknya sangat panjang."]},
  {h:"Rotasi & kekuatan relatif", mm:["Siklikal vs defensif","RRG","Small vs large cap"], points:[
   "Awal pemulihan: sektor siklikal (industri, material) memimpin. Akhir ekspansi: beralih ke defensif (konsumsi primer, kesehatan).",
   "Relative Rotation Graph: memetakan kekuatan relatif + momentumnya; pergerakan searah jarum jam antar kuadran.",
   "Small cap unggul = selera risiko tinggi; kepemimpinan pindah ke large cap defensif = sikap hati-hati.",
   "Pada indeks berbobot kapitalisasi, segelintir emiten raksasa bisa menyetir indeks — breadth mengungkap kebenarannya."]}],
 jebakan:[
  "Keterbatasan utama: sering memberi peringatan JAUH sebelum titik balik → tidak cocok jadi pemicu waktu masuk.",
  "Pakai breadth/sentimen/intermarket untuk mengatur BESAR EKSPOSUR; eksekusi tetap ikut sinyal harga."]},

{module:"cta-sistem", tagline:"Merancang, menguji, dan menjaga sistem tetap jujur.",
 sections:[
  {h:"Komponen sistem", mm:["Entry","Exit","Sizing","Semesta instrumen"], points:[
   "Sistem mekanis harus bisa dijalankan tanpa penilaian subjektif: aturan entry, exit, ukuran posisi, dan semesta instrumen.",
   "Sistem diskresioner memberi keleluasaan konteks, tapi sulit diuji dan bergantung disiplin — butuh jurnal dan aturan tertulis."]},
  {h:"Bias dalam backtest", mm:["Look ahead","Survivorship","Curve fitting","Data snooping"], points:[
   "Look ahead bias: memakai informasi yang belum tersedia saat keputusan (mis. close hari itu jadi sinyal SEKALIGUS harga eksekusi).",
   "Survivorship bias: mengabaikan emiten yang delisting sehingga hasil tampak jauh lebih baik.",
   "Curve fitting: parameter disesuaikan terlalu rinci ke data historis; tandanya parameter banyak dan kinerja anjlok saat digeser sedikit.",
   "Kualitas data (adjusted split/dividen) adalah prasyarat — data keliru = sinyal semu."]},
  {h:"Validasi", mm:["Out of sample","Walk forward","Monte Carlo","Sampel memadai"], points:[
   "Out of sample: uji pada data yang tak dipakai saat pengembangan.",
   "Walk forward: optimalkan pada satu periode, uji pada periode berikutnya, bergulir — meniru kondisi nyata.",
   "Monte Carlo: acak urutan transaksi untuk memperkirakan sebaran drawdown yang mungkin.",
   "Butuh puluhan hingga ratusan transaksi lintas kondisi pasar agar kesimpulan bermakna.",
   "Parameter robust = kinerja tetap baik pada RENTANG nilai di sekitarnya, bukan puncak tajam di satu titik.",
   "Uji lintas instrumen dan pasar: keunggulan yang kokoh mestinya berlaku umum."]},
  {h:"Metrik kinerja", mm:["Profit factor","Sharpe","Sortino","Calmar","Max drawdown"], points:[
   "Profit factor = laba kotor ÷ rugi kotor. Di atas 1 menguntungkan; 1,5–2 dipandang baik. Terlalu tinggi = curiga ada kesalahan uji.",
   "Sharpe: imbal hasil berlebih per unit volatilitas TOTAL. Sortino: hanya menghukum volatilitas sisi bawah.",
   "Calmar: imbal hasil tahunan ÷ maximum drawdown.",
   "Max drawdown menguji apakah strategi sanggup dijalani secara psikologis dan finansial; perhatikan juga lama pemulihan."]},
  {h:"Dari uji ke nyata", mm:["Slippage & komisi","Paper trading","Kill switch","Diversifikasi sistem"], points:[
   "Slippage dan komisi wajib dimasukkan; sistem frekuensi tinggi paling rentan.",
   "Paper/forward testing menguji aspek operasional tanpa risiko modal (tapi tekanan psikologisnya tak terwakili).",
   "Kill switch (batas drawdown atau kerugian beruntun) ditetapkan SEBELUM sistem dijalankan.",
   "Degradasi kinerja setelah live itu normal: overfitting + perubahan rezim + biaya yang diremehkan.",
   "Kurva ekuitas backtest yang lurus nyaris tanpa drawdown = tanda bahaya, bukan prestasi.",
   "Diversifikasi sistem: gabungkan sumber keunggulan berbeda (trend following + mean reversion), bukan sekadar beda parameter."]}],
 jebakan:[
  "Trend following: win rate RENDAH tapi rasio untung/rugi tinggi. Mean reversion: banyak untung kecil, sesekali rugi sangat besar saat rezim berubah.",
  "Optimasi boleh secukupnya, asal divalidasi di luar sampel dan diuji ketahanannya."]},

{module:"cta-portfolio", tagline:"Mengelola risiko di level portofolio, bukan cuma per transaksi.",
 sections:[
  {h:"Metode sizing", mm:["Fixed fractional","Kelly","Volatility based","Heat"], points:[
   "Fixed fractional: persentase tetap dari ekuitas tiap transaksi — otomatis mengecil saat ekuitas turun.",
   "Kelly criterion: proporsi optimal dari peluang menang dan rasio pembayaran; praktiknya dipakai setengah Kelly atau kurang.",
   "Volatility based (mis. ATR): instrumen bergejolak dapat porsi lebih kecil agar kontribusi risikonya setara.",
   "Total heat = jumlah risiko seluruh posisi terbuka, lazim dibatasi 6–10% ekuitas."]},
  {h:"Ukuran risiko", mm:["VaR","Expected shortfall","Max drawdown","Stress test"], points:[
   "VaR 95%: kerugian diperkirakan tak melebihi nilai tertentu pada 95% kasus — TIDAK menjelaskan 5% terburuknya.",
   "Conditional VaR / expected shortfall menutupi kelemahan itu.",
   "Stress testing: uji dampak skenario ekstrem historis (krisis 2008, guncangan pandemi).",
   "Drawdown control: kurangi eksposur bertahap saat drawdown mencapai ambang tertentu."]},
  {h:"Diversifikasi", mm:["Korelasi","Risk parity","Sektor","Jumlah posisi","Time diversification"], points:[
   "Korelasi cenderung naik menuju satu saat krisis — manfaat diversifikasi menyusut justru saat paling dibutuhkan.",
   "Risk parity: setarakan KONTRIBUSI RISIKO, bukan nilai nominal. 50:50 saham-obligasi sebenarnya didominasi risiko saham.",
   "Concentration risk: 10 saham satu sektor = satu taruhan besar. Tetapkan batas eksposur per sektor.",
   "Manfaat diversifikasi menurun tajam setelah belasan posisi yang benar-benar berbeda karakter.",
   "Time diversification: jalankan strategi pada beberapa horizon agar tak bergantung satu rezim."]},
  {h:"Pengelolaan posisi & eksposur", mm:["Pyramiding","Rebalancing","Beta","Hedging"], points:[
   "Pyramiding benar: tambah posisi saat tren menguntungkan, ukuran tambahan MENGECIL, stop dinaikkan.",
   "Rebalancing berkala mengembalikan bobot ke target agar profil risiko terkendali.",
   "Beta portofolio = sensitivitas terhadap pasar; sinyal teknikal dipakai menaikkan/menurunkan beta secara aktif.",
   "Hedging (jual futures indeks / beli opsi jual) meredam koreksi tanpa menjual posisi utama, dengan biaya premi."]},
  {h:"Prinsip bertahan", mm:["Ergodicity","Asimetri","Likuiditas","Dokumentasi"], points:[
   "Ergodicity: rata-rata banyak pelaku ≠ hasil satu pelaku sepanjang waktu. Yang bangkrut tak ikut menikmati rata-rata → hindari kehancuran dulu.",
   "Leverage berlebihan menurunkan pertumbuhan majemuk karena volatilitas menggerus rata-rata geometris.",
   "Profil asimetris: potensi untung jauh melebihi risiko per ide — lebih menentukan daripada win rate.",
   "Risiko likuiditas: posisi terlalu besar dibanding volume harian membuat stop loss kehilangan makna.",
   "Kebijakan risiko tertulis = pengikat disiplin saat pasar bergejolak dan dasar akuntabilitas."]}],
 jebakan:[
  "Pulih dari drawdown 50% butuh kenaikan 100%.",
  "Batas risiko harus ditetapkan di level PORTOFOLIO, bukan hanya per transaksi."]},

{module:"cta-aset", tagline:"Menyesuaikan metode teknikal ke karakter tiap kelas aset.",
 sections:[
  {h:"Obligasi & suku bunga", mm:["Harga vs yield","Kurva imbal hasil","Seri benchmark"], points:[
   "Harga obligasi dan imbal hasil BERBANDING TERBALIK. Wajib jelas: yang digrafikkan harga atau yield.",
   "Analisis kurva: grafikkan SELISIH antar tenor (mis. 10 tahun − 2 tahun) sebagai deret tersendiri.",
   "Di Indonesia, analisis lazim dilakukan pada imbal hasil seri acuan (benchmark) yang likuid, mis. tenor 10 tahun.",
   "Kurva curam mendukung profitabilitas bank (margin bunga bersih melebar)."]},
  {h:"Valuta asing", mm:["Base/quote","24 jam","Tick volume","Carry trade"], points:[
   "EURUSD naik = euro menguat terhadap dolar (mata uang pertama = base).",
   "Pasar valas 24 jam terdesentralisasi → gap antar sesi jarang; volume sejati tak terpusat, dipakai tick volume sebagai pendekatan.",
   "Carry trade: pinjam mata uang bunga rendah, tempatkan di bunga tinggi; rawan pembalikan tajam saat selera risiko memburuk.",
   "Bagi investor asing di saham rupiah: pergerakan kurs mempengaruhi imbal hasil dalam mata uang asal."]},
  {h:"Komoditas & berjangka", mm:["Contango","Backwardation","Open interest","Continuous contract"], points:[
   "Contango: harga berjangka > spot (biaya simpan, asuransi, pendanaan) → biaya rollover bagi posisi beli.",
   "Backwardation: spot > berjangka, menandakan kelangkaan pasokan jangka pendek → rollover positif.",
   "Open interest = kontrak yang masih terbuka. Harga naik + volume naik + OI naik = tren kuat didukung dana baru.",
   "Harga naik tapi OI turun = penutupan posisi jual, bukan pembelian baru.",
   "Continuous contract menyambung kontrak jatuh tempo; metode penyambungan mempengaruhi level historis.",
   "Likuiditas terkonsentrasi di kontrak bulan terdekat yang aktif.",
   "Commitment of Traders: posisi commercial (hedger) vs large speculator; posisi spekulan ekstrem = indikasi contrarian.",
   "Spread trading: grafikkan selisih dua kontrak sebagai instrumen tersendiri."]},
  {h:"Derivatif & opsi", mm:["Time decay","Implied volatility","Horizon pendek"], points:[
   "Nilai opsi dipengaruhi waktu dan volatilitas tersirat, bukan hanya arah — analisis arah benar tetap bisa rugi kalau timing meleset.",
   "Implied volatility sangat tinggi menjelang peristiwa = premi mahal; setelah peristiwa, IV turun menggerus nilai opsi.",
   "Horizon derivatif terbatas sehingga ketepatan waktu jadi sangat menentukan — teknikal justru makin relevan."]},
  {h:"Emas, kripto & reksa dana", mm:["Emas vs USD","Kripto 24/7","ETF vs reksa dana"], points:[
   "Emas berlawanan arah dengan dolar dan suku bunga riil (emas tak memberi imbal hasil → biaya kesempatan).",
   "Kripto: 24/7 termasuk akhir pekan, volatilitas tinggi → jarak stop lebih lebar, ukuran posisi lebih kecil.",
   "Volume kripto terfragmentasi lintas bursa dan sebagian rawan dilaporkan tidak akurat.",
   "ETF punya OHLC dan volume intraday (bisa dianalisis seperti saham); reksa dana konvensional hanya NAB harian.",
   "Saham komoditas biasanya mengikuti harga komoditas dasarnya — divergensi = sinyal awal perubahan."]}],
 jebakan:[
  "Prinsip teknikal berlaku universal, tapi PARAMETER (periode, jarak stop, sizing) wajib dikalibrasi ulang per kelas aset."]},

{module:"cta-statistik", tagline:"Mengukur dan menguji, bukan sekadar merasa.",
 sections:[
  {h:"Volatilitas", mm:["Standar deviasi","Akar waktu","Clustering"], points:[
   "Volatilitas historis = standar deviasi imbal hasil (umumnya log return) yang disetahunkan.",
   "Penyetahunan pakai AKAR waktu: volatilitas harian × √252. Volatilitas harian 1% ≈ 15,9% per tahun.",
   "Volatility clustering: periode bergejolak cenderung diikuti bergejolak — dasar model ARCH/GARCH."]},
  {h:"Bentuk distribusi", mm:["Skewness","Kurtosis","Fat tails"], points:[
   "Skewness negatif: ekor kiri lebih panjang — kerugian ekstrem lebih sering. Ciri khas pasar saham.",
   "Kurtosis tinggi (leptokurtosis): peristiwa ekstrem lebih sering daripada prediksi normal.",
   "Implikasi: model risiko berbasis asumsi normal MEREMEHKAN potensi kerugian besar."]},
  {h:"Hubungan antar deret", mm:["Korelasi","Beta","Spurious","Autokorelasi"], points:[
   "Korelasi −1 sampai +1; hanya menangkap hubungan LINEAR dan tidak membuktikan sebab akibat.",
   "Beta = kemiringan regresi imbal hasil aset terhadap imbal hasil pasar.",
   "Spurious correlation: dua deret bertren tampak berkorelasi tanpa hubungan nyata — analisis pada IMBAL HASIL, bukan level harga.",
   "Autokorelasi positif = efek momentum; negatif = mean reversion."]},
  {h:"Alat analisis", mm:["Regresi & R²","Z score","Rolling window","Hurst"], points:[
   "Regresi linear = garis tren berbasis kuadrat terkecil; dasar linear regression channel.",
   "R² mengukur proporsi variasi harga yang dijelaskan garis tren (indikator kekuatan tren).",
   "Z score: berapa standar deviasi suatu nilai menyimpang dari rata-rata — Bollinger Bands adalah versi visualnya.",
   "Rolling window: hitung statistik pada jendela bergerak untuk melihat perubahan rezim.",
   "Hurst exponent: >0,5 trending, =0,5 acak, <0,5 mean reverting.",
   "Stasioneritas: harga umumnya tidak stasioner, imbal hasil lebih mendekati stasioner."]},
  {h:"Pengujian yang jujur", mm:["Signifikansi","Benchmark","Geometris vs aritmatik","Median"], points:[
   "Uji signifikansi menilai apakah hasil mungkin muncul karena kebetulan; koreksi untuk jumlah strategi yang diuji.",
   "Selalu bandingkan terhadap tolok ukur sederhana (buy and hold atau sinyal acak).",
   "Rata-rata GEOMETRIS untuk imbal hasil majemuk; aritmatik selalu melebih-lebihkan saat ada fluktuasi.",
   "Median lebih tahan outlier — laporkan bersama rata-rata."]}],
 jebakan:[
  "Volatilitas disetahunkan pakai √252, bukan ×252.",
  "Statistik bisa memberi rasa pasti menyesatkan kalau asumsinya dilanggar — validasi luar sampel dan manajemen risiko tetap pengaman terakhir."]}
]);
