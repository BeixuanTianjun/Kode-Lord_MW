/* ============================================================================
   hero.js — the constellation behind the hero.
   Particles drift, link up when they're close, and scatter away from the
   cursor. Pure canvas 2D, no library, pauses itself when off-screen.
   ========================================================================= */
(function () {
  'use strict';

  var canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ctx = canvas.getContext('2d', { alpha: true });
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  var W = 0, H = 0, particles = [], raf = null, running = false;
  var pointer = { x: -9999, y: -9999, active: false };

  var COLORS = ['53,229,255', '157,92,255', '255,77,141'];
  var LINK = 132;          /* px within which two dots draw a line */
  var PUSH = 130;          /* cursor repulsion radius */

  function count() {
    var target = Math.round((W * H) / 16000);
    return Math.max(34, Math.min(110, target));
  }

  function seed() {
    particles = [];
    for (var i = 0, n = count(); i < n; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.7 + 0.7,
        c: COLORS[(Math.random() * COLORS.length) | 0]
      });
    }
  }

  function resize() {
    var rect = canvas.getBoundingClientRect();
    W = rect.width; H = rect.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      /* wrap rather than bounce — bouncing makes the edges look busy */
      if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20; else if (p.y > H + 20) p.y = -20;

      if (pointer.active) {
        var dx = p.x - pointer.x, dy = p.y - pointer.y;
        var d = Math.hypot(dx, dy);
        if (d < PUSH && d > 0.01) {
          var force = (1 - d / PUSH) * 1.1;
          p.x += (dx / d) * force;
          p.y += (dy / d) * force;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + p.c + ',.75)';
      ctx.fill();

      /* links — only scan forward so each pair is drawn once */
      for (var j = i + 1; j < particles.length; j++) {
        var q = particles[j];
        var lx = p.x - q.x, ly = p.y - q.y;
        var ld = Math.hypot(lx, ly);
        if (ld < LINK) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = 'rgba(' + p.c + ',' + (0.16 * (1 - ld / LINK)).toFixed(3) + ')';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    /* a soft halo around the cursor so it feels connected to the field */
    if (pointer.active) {
      var g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, PUSH);
      g.addColorStop(0, 'rgba(53,229,255,.10)');
      g.addColorStop(1, 'rgba(53,229,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, PUSH, 0, Math.PI * 2);
      ctx.fill();
    }

    raf = requestAnimationFrame(frame);
  }

  function start() { if (!running && !reduced) { running = true; frame(); } }
  function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = null; }

  function onMove(e) {
    var rect = canvas.getBoundingClientRect();
    var t = e.touches ? e.touches[0] : e;
    pointer.x = t.clientX - rect.left;
    pointer.y = t.clientY - rect.top;
    pointer.active = pointer.y > 0 && pointer.y < rect.height;
  }

  resize();

  if (reduced) {
    /* one still frame is enough — no motion, but not an empty box either */
    frame();
    stop();
  } else {
    start();
  }

  window.addEventListener('resize', function () {
    clearTimeout(resize._t);
    resize._t = setTimeout(resize, 160);
  });

  window.addEventListener('mousemove', onMove, { passive: true });
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('mouseleave', function () { pointer.active = false; });

  /* don't burn frames once the hero has scrolled away */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries[0].isIntersecting ? start() : stop();
    }, { threshold: 0 }).observe(canvas);
  }

  document.addEventListener('visibilitychange', function () {
    document.hidden ? stop() : start();
  });
})();
