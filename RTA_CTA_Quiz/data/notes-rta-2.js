/* Study notes + mind map — RTA bagian 2 */
TD.registerNotes([
{module:"rta-indikator", tagline:"Alat turunan harga: tren, momentum, volatilitas, volume.",
 sections:[
  {h:"Moving average", mm:["SMA vs EMA","Periode","Golden/death cross","Whipsaw"], points:[
   "SMA: rata-rata aritmatik, semua data berbobot sama. EMA: bobot lebih besar pada data terbaru sehingga lebih responsif.",
   "Makin panjang periode: makin halus, sinyal palsu berkurang, tapi makin lambat. Selalu trade-off kepekaan vs keandalan.",
   "Golden cross: MA pendek memotong ke ATAS MA panjang (mis. MA50 × MA200). Death cross: sebaliknya.",
   "MA200 ≈ satu tahun perdagangan, jadi batas kasar kondisi bullish vs bearish.",
   "Kelemahan crossover: whipsaw di pasar sideways. Solusinya filter kekuatan tren seperti ADX."]},
  {h:"MACD & momentum", mm:["MACD 12-26-9","Histogram","Momentum/ROC","Divergensi"], points:[
   "MACD line = EMA12 − EMA26; signal line = EMA9 dari MACD; histogram = selisih keduanya.",
   "Sinyal beli: MACD memotong ke atas signal line, lebih bertenaga bila terjadi jauh di bawah garis nol.",
   "Histogram memendek = laju penguatan berkurang (peringatan dini), belum tentu sinyal jual.",
   "Momentum = harga kini − harga n periode lalu. ROC = versi persentase sehingga bisa dibandingkan antar instrumen.",
   "Hidden divergence (harga higher low, indikator lower low) justru menandakan tren utama masih kokoh."]},
  {h:"Oscillator", mm:["RSI 14","Stochastic","Williams %R","CCI"], points:[
   "RSI: rentang 0–100, periode default Wilder = 14. Ambang klasik 70 (jenuh beli) dan 30 (jenuh jual).",
   "PENTING: pada tren kuat RSI bisa bertahan di atas 70 lama — itu tanda KEKUATAN, bukan otomatis sinyal jual.",
   "Stochastic membandingkan close terhadap rentang high-low periode; %D = rata-rata %K. Slow stochastic = versi yang dihaluskan.",
   "Williams %R: skala −100 sampai 0 (mirip stochastic dibalik). CCI: simpangan harga terhadap rata-rata statistiknya, ekstrem di ±100.",
   "Divergensi bullish: harga lower low, oscillator higher low."]},
  {h:"Volatilitas", mm:["ATR","Bollinger","Keltner","Squeeze"], points:[
   "ATR: rata-rata true range, memperhitungkan gap. Dipakai untuk jarak stop loss dan ukuran posisi yang menyesuaikan volatilitas.",
   "Bollinger Bands: SMA20 ± 2 standar deviasi. Lebar pita mengikuti volatilitas.",
   "Sentuhan pita atas = harga relatif tinggi, BUKAN sinyal jual; pada tren kuat harga bisa walking the bands.",
   "Squeeze (pita menyempit) = volatilitas rendah, sering mendahului ekspansi — tanpa memberi tahu arahnya.",
   "Keltner Channel memakai ATR (bukan standar deviasi) sehingga lebih halus."]},
  {h:"Volume & tren", mm:["OBV","A/D Line","MFI","VWAP","ADX","SAR","Ichimoku"], points:[
   "OBV: volume ditambah saat harga naik, dikurangi saat turun, secara kumulatif (Granville).",
   "A/D Line: bobot berdasarkan posisi close dalam rentang × volume. MFI: RSI berbobot volume (pakai typical price).",
   "VWAP: harga rata-rata tertimbang volume, tolok ukur kualitas eksekusi institusi.",
   "ADX mengukur KEKUATAN tren tanpa arah; di bawah 20 = tidak trending, di atas 25 = tren layak diikuti. Arah dari DI+ dan DI−.",
   "Parabolic SAR: titik trailing stop yang merapat; whipsaw saat sideways.",
   "Ichimoku: Tenkan, Kijun, Senkou A & B (kumo), Chikou. Harga di atas awan = bullish."]}],
 jebakan:[
  "RSI di atas 70 pada tren kuat BUKAN sinyal jual otomatis — ini soal favorit penguji.",
  "Multicollinearity: RSI + stochastic + Williams %R = tiga versi momentum yang sama, konfirmasi semu. Pilih kategori berbeda.",
  "Ideal 2–4 indikator dari kategori berbeda (tren, momentum, volatilitas, volume). RSI bukan bagian Ichimoku."]},

{module:"rta-plan", tagline:"Mengubah analisis jadi keputusan yang risikonya terukur.",
 sections:[
  {h:"Anatomi rencana", mm:["Entry","Stop loss","Target","Ukuran posisi"], points:[
   "Empat komponen minimum: level entry, stop loss, target, dan ukuran posisi. Tanpa keempatnya, emosi yang mengambil alih.",
   "Stop loss = titik di mana analisis terbukti keliru, ditetapkan SEBELUM posisi dibuka.",
   "Stop diletakkan di level teknikal yang membatalkan skenario; penyesuaian ke batas risiko dilakukan lewat UKURAN POSISI, bukan dengan memaksakan stop terlalu rapat.",
   "Time stop: keluar bila dalam kurun tertentu harga tidak bergerak sesuai skenario (biaya kesempatan)."]},
  {h:"Position sizing", mm:["Risiko 1-2%","Rumus lot","Volatilitas","Heat"], points:[
   "Risiko per transaksi yang lazim: 1–2% dari total modal. Dengan 2%, sepuluh kerugian beruntun hanya menggerus ±18%.",
   "Rumus: jumlah lembar = (modal × %risiko) ÷ (harga beli − stop loss).",
   "Contoh: modal 100 juta, risiko 1% = 1 juta; beli 2.000 stop 1.900 (risiko 100/lembar) → 10.000 lembar.",
   "Total heat portofolio (jumlah risiko semua posisi terbuka) umumnya dibatasi 6–10% ekuitas."]},
  {h:"Rasio & expectancy", mm:["Risk/reward","Expectancy","Win rate","Drawdown"], points:[
   "Risk/reward: beli 1.000, stop 950, target 1.150 → risiko 50, potensi 150 → 1:3.",
   "Expectancy = (peluang menang × rata-rata untung) − (peluang kalah × rata-rata rugi). Harus positif.",
   "Contoh: win 40%, untung 3R, rugi 1R → (0,4×3) − (0,6×1) = 0,6R per transaksi. Sistem tetap untung meski lebih sering salah.",
   "Win rate 40% butuh minimal rasio 1:2 agar expectancy positif.",
   "Drawdown 50% butuh kenaikan 100% untuk pulih — asimetri inilah alasan pengendalian risiko lebih penting dari mengejar imbal hasil."]},
  {h:"Pengelolaan posisi", mm:["Trailing stop","Scaling out","Pyramiding","Averaging down"], points:[
   "Trailing stop mengunci keuntungan sambil memberi ruang tren berlanjut (ikuti lembah terakhir atau kelipatan ATR).",
   "Stop hanya digeser SEARAH keuntungan, tidak pernah diperlebar.",
   "Scaling out: realisasi bertahap di beberapa target, sisanya dibiarkan berjalan dengan trailing stop.",
   "Averaging down tanpa rencana berbahaya: menambah eksposur justru saat pasar menunjukkan analisis keliru.",
   "Gap risk: harga bisa dibuka melewati stop, jadi kerugian nyata bisa melebihi rencana."]},
  {h:"Disiplin & evaluasi", mm:["Jurnal","Checklist","Batas rugi","Bias"], points:[
   "Jurnal trading memisahkan kualitas KEPUTUSAN dari kualitas HASIL.",
   "Checklist pra transaksi mencegah keputusan impulsif.",
   "Batas kerugian harian/mingguan mencegah revenge trading.",
   "Disposition effect: menahan rugi terlalu lama, merealisasikan untung terlalu cepat — kebalikan dari cut loss short, let profit run.",
   "Evaluasi sistem butuh puluhan hingga ratusan transaksi agar signifikan, bukan 1–2 transaksi terakhir.",
   "Korelasi antar posisi: 5 saham bank @1% risiko berperilaku seperti satu posisi 5%."]}],
 jebakan:[
  "Hafal rumus lot dan expectancy — hampir selalu keluar dalam bentuk soal hitungan.",
  "Leverage berlebihan menurunkan pertumbuhan majemuk jangka panjang meski rata-rata imbal hasil naik.",
  "Risk of ruin dipengaruhi besar risiko per transaksi, win rate, dan rasio untung/rugi."]},

{module:"rta-riset", tagline:"Menyampaikan analisis secara profesional dan beretika.",
 sections:[
  {h:"Struktur laporan", mm:["Ringkasan dulu","Level kunci","Horizon","Grafik beranotasi"], points:[
   "Komponen wajib: identitas instrumen, periode data, kesimpulan, level kunci, dan disclaimer.",
   "Rekomendasi harus menyertakan entry, stop loss / level pembatalan, dan target. Tanpa level pembatalan, pembaca tak tahu kapan keluar.",
   "Susunan komunikatif: ringkasan pandangan dan rekomendasi DULU, baru uraian pendukung.",
   "Horizon waktu wajib eksplisit — sebuah saham bisa bearish harian tapi bullish mingguan.",
   "Grafik wajib mencantumkan nama instrumen, periode, skala, dan anotasi level yang dibahas. Bersih, bukan penuh indikator."]},
  {h:"Bahasa & probabilitas", mm:["Bersyarat","Bukan kepastian","Jelaskan istilah"], points:[
   "Rumuskan secara bersyarat: selama bertahan di atas level X, skenario Y berlaku.",
   "Analisis teknikal bergerak di ranah probabilitas — menjanjikan kepastian melanggar etika.",
   "Istilah teknis spesifik dijelaskan singkat; kejelasan lebih penting daripada kesan canggih."]},
  {h:"Etika & benturan kepentingan", mm:["Disclosure","Front running","Manipulasi","Churning"], points:[
   "Wajib mengungkapkan kepemilikan posisi pada instrumen yang dianalisis dan hubungan bisnis dengan emiten.",
   "Merekomendasikan beli sambil diam-diam menjual = front running, jelas melanggar.",
   "Menyebarkan rekomendasi untuk menggerakkan harga demi posisi sendiri = indikasi manipulasi pasar, bisa berujung sanksi administratif hingga pidana.",
   "Mendorong transaksi berlebihan demi komisi = churning, bertentangan dengan kepentingan nasabah."]},
  {h:"Akuntabilitas", mm:["Update terbuka","Kinerja jujur","Sumber data","Konsistensi"], points:[
   "Saat data baru membatalkan skenario: terbitkan pembaruan dan jelaskan alasannya, jangan hapus riset lama diam-diam.",
   "Cherry picking (hanya memajang rekomendasi yang berhasil) menyesatkan. Sajikan seluruh rekam jejak.",
   "Kinerja masa lalu wajib disertai keterangan tidak menjamin hasil di masa depan.",
   "Data dan grafik pihak ketiga: cantumkan sumber dan patuhi lisensi.",
   "Format yang konsisten memudahkan pembaca melacak perubahan pandangan antar periode.",
   "Di media sosial dengan ruang terbatas: tetap sertakan level pembatalan dan tautan ke laporan lengkap."]}],
 jebakan:[
  "Disclaimer TIDAK menghapus kewajiban analis bekerja jujur dan kompeten.",
  "Bila teknikal dan fundamental satu institusi bertentangan: sajikan keduanya secara transparan, jangan sembunyikan satu.",
  "Rekomendasi yang gagal dievaluasi terbuka — itu memperkuat kredibilitas, bukan melemahkan."]}
]);
