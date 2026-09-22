/* ============================================================
   SPILL DE TEA — brand mark & cup wrap
   Everything here is drawn procedurally onto a 2D canvas: the
   emblem roundel and the ornate sleeve that wraps the cup.
   One seeded RNG keeps the artwork identical on every load.
   ============================================================ */
(function () {
  'use strict';

  var EMBLEM_SRC = 'assets/emblem.png';

  var JADE = '#0B3B2E', JADE_MID = '#17604A', JADE_LT = '#2E7C62',
      GOLD = '#C8A24A', GOLD_LT = '#E3C583',
      CREAM = '#F6F1E7', CREAM_2 = '#EDE3CE';

  /* deterministic RNG — the wrap must not reshuffle between loads */
  function rng(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  /* ── motifs ────────────────────────────────────────────────
     Each draws around the origin pointing "up", so the scatter
     can place, rotate and scale them freely.                   */

  function leaf(c, len, wide) {
    c.beginPath();
    c.moveTo(0, 0);
    c.quadraticCurveTo(wide, -len * 0.42, 0, -len);
    c.quadraticCurveTo(-wide, -len * 0.42, 0, 0);
    c.closePath();
  }

  function sprig(c, rnd) {
    var len = 60 + rnd() * 50, pairs = 3 + Math.floor(rnd() * 3);
    var bend = (rnd() - 0.5) * 34;
    c.beginPath();
    c.moveTo(0, 0);
    c.quadraticCurveTo(bend, -len * 0.55, bend * 0.6, -len);
    c.stroke();
    for (var i = 0; i < pairs; i++) {
      var t = 0.22 + (i / pairs) * 0.72;
      var x = bend * (2 * t * (1 - t) + t * t * 0.6), y = -len * t;
      var s = (1 - t * 0.45) * (16 + rnd() * 9);
      for (var side = -1; side <= 1; side += 2) {
        c.save();
        c.translate(x, y);
        c.rotate(side * (0.85 + rnd() * 0.3));
        leaf(c, s * 1.9, s * 0.62);
        c.fill();
        c.restore();
      }
    }
  }

  function jasmine(c, rnd) {
    var r = 13 + rnd() * 7;
    for (var i = 0; i < 5; i++) {
      c.save();
      c.rotate(i * Math.PI * 2 / 5);
      c.beginPath();
      c.ellipse(0, -r, r * 0.52, r * 0.9, 0, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }
    c.beginPath();
    c.arc(0, 0, r * 0.34, 0, Math.PI * 2);
    c.fill();
  }

  function rose(c, rnd) {
    var r = 17 + rnd() * 11;
    for (var i = 4; i >= 1; i--) {
      c.beginPath();
      c.arc(0, 0, r * i / 4, Math.PI * 0.15, Math.PI * 1.75);
      c.stroke();
    }
    c.beginPath();
    c.arc(0, 0, r * 0.16, 0, Math.PI * 2);
    c.fill();
  }

  function frond(c, rnd) {
    var len = 70 + rnd() * 46;
    c.beginPath();
    c.moveTo(0, 0);
    c.quadraticCurveTo(len * 0.22, -len * 0.6, 0, -len);
    c.stroke();
    for (var i = 1; i <= 9; i++) {
      var t = i / 10, y = -len * t, x = len * 0.22 * 2 * t * (1 - t);
      var w = (1 - t) * len * 0.2;
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(x + w, y - w * 0.75);
      c.moveTo(x, y);
      c.lineTo(x - w, y - w * 0.75);
      c.stroke();
    }
  }

  var MOTIFS = [sprig, sprig, jasmine, rose, frond, jasmine];

  function scatter(c, rnd, cols, rows, y0, y1, W, alpha) {
    var gw = W / cols, gh = (y1 - y0) / rows;
    for (var i = 0; i < cols * rows; i++) {
      var gx = i % cols, gy = (i / cols) | 0;
      var x = (gx + 0.15 + rnd() * 0.7) * gw;
      var y = y0 + (gy + 0.15 + rnd() * 0.7) * gh;
      var m = MOTIFS[Math.floor(rnd() * MOTIFS.length)];
      var s = 0.55 + rnd() * 0.75, rot = rnd() * Math.PI * 2;
      var goldOne = rnd() < 0.14;
      var ink = goldOne ? GOLD : (rnd() < 0.64 ? JADE : (rnd() < 0.8 ? JADE_MID : JADE_LT));
      /* duplicate near the seam so the sleeve tiles around the cup */
      var xs = [x];
      if (x < 220) xs.push(x + W);
      if (x > W - 220) xs.push(x - W);
      for (var k = 0; k < xs.length; k++) {
        c.save();
        c.globalAlpha = alpha * (0.74 + rnd() * 0.26);
        c.fillStyle = ink; c.strokeStyle = ink;
        c.lineWidth = 2.7 + rnd() * 1.7;
        c.lineCap = 'round';
        c.translate(xs[k], y);
        c.rotate(rot);
        c.scale(s, s);
        m(c, rnd);
        c.restore();
      }
    }
  }

  /* ── cup sleeve ────────────────────────────────────────────
     2048×768, two identical cells so whichever side you face
     carries a whole composition.                              */
  function wrap(canvas, emblemImg) {
    var W = canvas.width = 2048, H = canvas.height = 640;
    var c = canvas.getContext('2d');
    var rnd = rng(20260922);
    var CELLS = 2, cw = W / CELLS;
    var bandY = 372, bandH = 140;

    var g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, CREAM);
    g.addColorStop(1, CREAM_2);
    c.fillStyle = g;
    c.fillRect(0, 0, W, H);

    scatter(c, rnd, 20, 9, -26, bandY + 6, W, 0.96);            // dense above the band
    scatter(c, rnd, 14, 2, bandY + bandH - 4, H + 30, W, 0.3);   // sparse below it

    c.fillStyle = JADE;
    c.fillRect(0, bandY, W, bandH);
    c.strokeStyle = GOLD;
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(0, bandY + 8); c.lineTo(W, bandY + 8);
    c.moveTo(0, bandY + bandH - 8); c.lineTo(W, bandY + bandH - 8);
    c.stroke();

    c.textAlign = 'center';
    c.textBaseline = 'middle';
    for (var k = 0; k < CELLS; k++) {
      var cx = cw * (k + 0.5);

      if (emblemImg) {
        var es = 312, ey = 182;
        var halo = c.createRadialGradient(cx, ey, es * 0.20, cx, ey, es * 0.62);
        halo.addColorStop(0, 'rgba(248,244,234,.97)');
        halo.addColorStop(0.62, 'rgba(248,244,234,.9)');
        halo.addColorStop(1, 'rgba(248,244,234,0)');
        c.fillStyle = halo;
        c.beginPath(); c.arc(cx, ey, es * 0.62, 0, Math.PI * 2); c.fill();
        c.drawImage(emblemImg, cx - es / 2, ey - es / 2, es, es);
      }

      c.fillStyle = GOLD;
      c.font = 'italic 600 74px Georgia, "Times New Roman", serif';
      c.fillText('Spill de Tea', cx, bandY + bandH / 2 + 2);

      c.save();
      c.shadowColor = 'rgba(246,241,231,.95)';
      c.shadowBlur = 12;
      c.fillStyle = 'rgba(11,59,46,.82)';
      c.font = '600 27px Helvetica, Arial, sans-serif';
      c.fillText('P R E M I U M   T A S T E   ·   S T U D E N T   P R I C E', cx, 556);
      c.fillStyle = 'rgba(11,59,46,.55)';
      c.font = '500 23px Helvetica, Arial, sans-serif';
      c.fillText('250 ml  ·  FRESH BATCH  ·  BINUS', cx, 596);
      c.restore();
    }

    c.strokeStyle = 'rgba(200,162,74,.6)';
    c.lineWidth = 4;
    c.beginPath();
    c.moveTo(0, 5); c.lineTo(W, 5);
    c.moveTo(0, H - 5); c.lineTo(W, H - 5);
    c.stroke();

    return canvas;
  }

  window.SDTBrand = { wrap: wrap, emblemSrc: EMBLEM_SRC, colors: {
    JADE: JADE, GOLD: GOLD, CREAM: CREAM
  } };
})();
