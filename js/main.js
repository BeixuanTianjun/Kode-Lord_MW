/* ============================================================
   SPILL DE TEA — interactions & motion
   ============================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* ══════════ 1. LOADER ══════════════════════════════════ */
  (function () {
    var loader = $('#loader'), bar = $('#loaderBar'), pct = $('#loaderPct');
    if (!loader) return;
    var val = 0, done = false;

    var tick = setInterval(function () {
      var target = document.readyState === 'complete' ? 100 : 82;
      if (window.SDTScene && window.SDTScene.ready && document.readyState === 'complete') target = 100;
      val += Math.max((target - val) * 0.14, target > val ? 0.6 : 0);
      if (val > target) val = target;
      bar.style.width = val.toFixed(0) + '%';
      pct.textContent = Math.floor(val);
      if (val >= 99.4 && !done) {
        done = true;
        clearInterval(tick);
        bar.style.width = '100%';
        pct.textContent = '100';
        setTimeout(finish, 380);
      }
    }, 40);

    // hard stop so the page never stays behind the loader
    setTimeout(function () { if (!done) { done = true; clearInterval(tick); finish(); } }, 6000);

    function finish() {
      loader.classList.add('done');
      document.body.classList.remove('is-locked');
      startHeroType();
      setTimeout(function () { loader.remove(); }, 800);
    }
    document.body.classList.add('is-locked');
  })();

  /* ══════════ 2. HERO SPLIT TEXT ═════════════════════════ */
  function startHeroType() {
    $$('[data-split]').forEach(function (el, ei) {
      if (el.dataset.done) return;
      el.dataset.done = '1';
      var txt = el.textContent;
      el.textContent = '';
      var base = ei * 0.18;
      txt.split('').forEach(function (ch, i) {
        var s = document.createElement('span');
        s.className = 'ch';
        s.textContent = ch === ' ' ? ' ' : ch;
        s.style.animationDelay = (base + i * 0.045) + 's';
        el.appendChild(s);
      });
    });
    setTimeout(function () {
      $$('.hero [data-reveal]').forEach(function (el) { el.classList.add('in'); });
      runCounters($('.hero'));
    }, 320);
  }

  /* ══════════ 3. REVEAL ON SCROLL ════════════════════════ */
  var pending = [];

  function show(el) {
    el.style.transitionDelay = (el.dataset.delay || 0) + 'ms';
    el.classList.add('in');
    if (io) io.unobserve(el);
  }

  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) show(e.target); });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }) : null;

  $$('[data-reveal]').forEach(function (el) {
    if (el.closest('.hero')) return;
    if (io) { pending.push(el); io.observe(el); } else el.classList.add('in');
  });

  /* Safety net: a fast flick or a smooth-scrolled anchor jump can carry an
     element past the observer without an intersection ever being recorded.
     This sweep guarantees anything sitting in the viewport is visible. */
  function sweepReveals() {
    if (!pending.length) return;
    var h = window.innerHeight, rest = [];
    for (var i = 0; i < pending.length; i++) {
      var el = pending[i];
      if (el.classList.contains('in')) continue;
      var r = el.getBoundingClientRect();
      if (r.top < h * 0.92 && r.bottom > 0) show(el); else rest.push(el);
    }
    pending = rest;
    if (!pending.length && sweepTimer) { clearInterval(sweepTimer); sweepTimer = null; }
  }

  /* the scroll handler is rAF-throttled and can be starved on a busy frame,
     so a slow ticker backs it up until every element has been shown */
  var sweepTimer = setInterval(sweepReveals, 400);
  window.addEventListener('load', sweepReveals);

  /* ══════════ 4. COUNTERS ════════════════════════════════ */
  function runCounters(scope) {
    $$('[data-count]', scope).forEach(function (el) {
      if (el.dataset.ran) return;
      el.dataset.ran = '1';
      var end = parseFloat(el.dataset.count) || 0;
      var pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
      if (reduced || end === 0) { el.textContent = pre + end + suf; return; }
      var dur = 1500, t0 = performance.now();
      (function step(now) {
        var p = clamp((now - t0) / dur, 0, 1);
        var e = 1 - Math.pow(1 - p, 3);
        el.textContent = pre + Math.round(end * e) + suf;
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    });
  }

  var countIO = ('IntersectionObserver' in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      runCounters(e.target);
      countIO.unobserve(e.target);
    });
  }, { threshold: 0.3 }) : null;

  ['#harga', '.price__panel'].forEach(function (sel) {
    var el = $(sel);
    if (el && countIO) countIO.observe(el);
  });

  /* bars + margin ring */
  (function () {
    var bars = $('.price__bars'), ring = $('#ringFg');
    if (!bars || !('IntersectionObserver' in window)) {
      if (bars) bars.classList.add('in');
      if (ring) ring.style.strokeDashoffset = 327 * (1 - 0.68);
      return;
    }
    var o = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        bars.classList.add('in');
        if (ring) ring.style.strokeDashoffset = 327 * (1 - 0.68);
        o.disconnect();
      });
    }, { threshold: 0.25 });
    o.observe(bars);
  })();

  /* ══════════ 5. NAV ═════════════════════════════════════ */
  (function () {
    var nav = $('#nav'), burger = $('#burger'), links = $$('#navLinks a');

    function onScroll() {
      nav.classList.toggle('solid', window.scrollY > 60);
      $('#toTop').classList.toggle('on', window.scrollY > window.innerHeight * 0.9);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('is-locked', open);
    });
    links.forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('is-locked');
      });
    });

    /* scroll-spy */
    var secs = ['#filosofi', '#menu', '#cara', '#harga', '#sistem']
      .map(function (id) { return $(id); }).filter(Boolean);
    if ('IntersectionObserver' in window) {
      var spy = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
          });
        });
      }, { threshold: 0.35 });
      secs.forEach(function (s) { spy.observe(s); });
    }
  })();

  /* ══════════ 6. CURSOR + MAGNET ═════════════════════════ */
  (function () {
    if (reduced || window.matchMedia('(hover:none)').matches) return;
    var cur = $('#cursor'), dot = $('.cursor__dot'), ring = $('.cursor__ring');
    var mx = 0, my = 0, rx = 0, ry = 0;

    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      cur.classList.add('on');
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
      if (window.SDTScene) {
        window.SDTScene.setPointer(
          (mx / window.innerWidth) * 2 - 1,
          -((my / window.innerHeight) * 2 - 1)
        );
      }
    }, { passive: true });

    (function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();

    $$('a,button,.card,.flowitem,.pillar').forEach(function (el) {
      el.addEventListener('mouseenter', function () { cur.classList.add('hot'); });
      el.addEventListener('mouseleave', function () { cur.classList.remove('hot'); });
    });

    $$('[data-magnet]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.28;
        var y = (e.clientY - r.top - r.height / 2) * 0.4;
        el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  })();

  /* ══════════ 7. SCROLL → 3D + STEP LINE ═════════════════ */
  (function () {
    var hero = $('#hero'), steps = $('#steps'), fill = $('#stepsFill'), stage = $('#stage');
    var ticking = false;

    function update() {
      ticking = false;
      var y = window.scrollY;

      if (hero && window.SDTScene) {
        window.SDTScene.setScroll(clamp(y / Math.max(hero.offsetHeight, 1), 0, 1.4));
      }
      if (stage) {
        var fade = clamp(1 - (y - window.innerHeight * 0.55) / (window.innerHeight * 0.6), 0, 1);
        stage.style.setProperty('--fade', fade.toFixed(3));
      }
      sweepReveals();

      if (steps && fill) {
        var r = steps.getBoundingClientRect();
        var p = clamp((window.innerHeight * 0.85 - r.top) / Math.max(r.height * 0.75, 1), 0, 1);
        fill.style.width = (p * 100).toFixed(1) + '%';
      }
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  })();

  /* ══════════ 8. FLOW STRIP DRAG ═════════════════════════ */
  (function () {
    var el = $('#flowScroll');
    if (!el) return;
    var down = false, sx = 0, sl = 0;
    el.addEventListener('pointerdown', function (e) {
      down = true; sx = e.clientX; sl = el.scrollLeft;
      el.classList.add('dragging');
      el.setPointerCapture(e.pointerId);
    });
    el.addEventListener('pointermove', function (e) {
      if (!down) return;
      el.scrollLeft = sl - (e.clientX - sx);
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (ev) {
      el.addEventListener(ev, function () { down = false; el.classList.remove('dragging'); });
    });
  })();

  /* ══════════ 9. PRE-ORDER EMBED ═════════════════════════ */
  (function () {
    var frame = $('#jfFrame'), embed = $('#jfEmbed'), fallback = $('#jfFallback');
    if (!frame || !embed || !fallback) return;

    /* Some hosts refuse third-party frames outright, and a blocked frame just
       leaves a blank panel. If the embed hasn't reported back, swap in a
       direct link so the form is still reachable. */
    var loaded = false;
    embed.addEventListener('load', function () { loaded = true; });
    setTimeout(function () {
      if (loaded) return;
      frame.hidden = true;
      fallback.hidden = false;
    }, 3500);
  })();

  /* ══════════ 10. MISC ═══════════════════════════════════ */
  $('#yr').textContent = new Date().getFullYear();

  /* touch: feed pointer to the 3D scene from finger position */
  window.addEventListener('touchmove', function (e) {
    if (!window.SDTScene || !e.touches[0]) return;
    window.SDTScene.setPointer(
      (e.touches[0].clientX / window.innerWidth) * 2 - 1,
      -((e.touches[0].clientY / window.innerHeight) * 2 - 1)
    );
  }, { passive: true });

})();
