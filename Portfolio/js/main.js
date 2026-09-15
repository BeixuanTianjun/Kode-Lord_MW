/* ============================================================================
   main.js — renders every section from window.PROFILE, then wires the motion.
   Order matters: render first, observe second, otherwise the observers have
   nothing to watch.
   ========================================================================= */
(function () {
  'use strict';

  var P = window.PROFILE || {};
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* escape anything coming out of profile.js — it's hand-written, but it
     ends up in innerHTML, so treat it like input anyway. */
  function esc(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function tags(list) {
    if (!list || !list.length) return '';
    return '<ul class="tags">' + list.map(function (t) {
      return '<li>' + esc(t) + '</li>';
    }).join('') + '</ul>';
  }

  /* ------------------------------------------------------------------ 1. RENDER */

  var meta = P.meta || {}, links = P.links || {};

  /* The title, description and og: tags stay in index.html rather than being
     written from here: link crawlers read the served HTML and never run this
     script, so anything set at runtime would be invisible to them. */

  setText('#navInitials', meta.initials || '');
  setText('#loaderName', meta.name || '');
  setText('#heroAvailability', meta.availability || meta.location || '');
  setText('#heroTagline', meta.tagline || '');
  setText('#footName', '© ' + new Date().getFullYear() + ' ' + (meta.name || ''));
  setText('#footYear', meta.location || '');

  function setText(sel, v) { var el = $(sel); if (el) el.textContent = v; }

  /* hero name — split into characters so they can cascade in */
  var heroName = $('#heroName');
  if (heroName) {
    heroName.textContent = meta.name || 'Your Name';
    splitText(heroName, true);
  }

  /* hero stats */
  var statsEl = $('#heroStats');
  if (statsEl && P.stats) {
    statsEl.innerHTML = P.stats.map(function (s) {
      return '<li data-reveal><b class="count" data-to="' + Number(s.value) + '" data-suffix="' +
        esc(s.suffix || '') + '">0</b><span>' + esc(s.label) + '</span></li>';
    }).join('');
  }

  /* marquee — the track is duplicated so the -50% loop is seamless */
  var mq = $('#marqueeTrack');
  if (mq && P.marquee) {
    var run = P.marquee.map(function (w) {
      return '<span class="marquee__item">' + esc(w) + '</span>';
    }).join('');
    mq.innerHTML = run + run;
  }

  /* about */
  var about = P.about || {};
  var aboutHeading = $('#aboutHeading');
  if (aboutHeading) aboutHeading.textContent = about.heading || 'About';
  var aboutText = $('#aboutText');
  if (aboutText && about.paragraphs) {
    aboutText.innerHTML = about.paragraphs.map(function (p) {
      return '<p data-reveal>' + esc(p) + '</p>';
    }).join('');
  }
  var facts = $('#aboutFacts');
  if (facts && about.facts) {
    facts.innerHTML = about.facts.map(function (f) {
      return '<div data-reveal><dt>' + esc(f.k) + '</dt><dd>' + esc(f.v) + '</dd></div>';
    }).join('');
  }

  /* specialties */
  var specs = $('#specs');
  if (specs && P.specialties) {
    specs.innerHTML = P.specialties.map(function (s, i) {
      return '<article class="spec tilt" data-reveal>' +
        '<span class="spec__num">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<i class="spec__bar"></i>' +
        '<h3>' + esc(s.title) + '</h3>' +
        '<p>' + esc(s.blurb) + '</p>' + tags(s.tags) +
      '</article>';
    }).join('');
  }

  /* skills — filter chips + animated rings */
  var grid = $('#skillsGrid'), filters = $('#skillFilters');
  if (grid && P.skills) {
    var R = 36, LEN = 2 * Math.PI * R;

    /* one shared gradient def for every ring */
    var defs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    defs.setAttribute('width', '0'); defs.setAttribute('height', '0');
    defs.setAttribute('aria-hidden', 'true');
    defs.style.position = 'absolute';
    defs.innerHTML = '<defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="#35e5ff"/><stop offset="55%" stop-color="#9d5cff"/>' +
      '<stop offset="100%" stop-color="#ff4d8d"/></linearGradient></defs>';
    document.body.appendChild(defs);

    grid.innerHTML = P.skills.map(function (s) {
      var lvl = Math.max(0, Math.min(100, Number(s.level) || 0));
      var off = LEN - (LEN * lvl) / 100;
      return '<article class="skill" data-group="' + esc(s.group) + '"' +
        ' style="--len:' + LEN.toFixed(2) + ';--off:' + off.toFixed(2) + '">' +
        '<div class="ring"><svg viewBox="0 0 84 84">' +
          '<circle class="track" cx="42" cy="42" r="' + R + '"/>' +
          '<circle class="bar" cx="42" cy="42" r="' + R + '"/>' +
        '</svg><span class="ring__val count" data-to="' + lvl + '" data-suffix="%">0%</span></div>' +
        '<div><p class="skill__name">' + esc(s.name) + '</p>' +
        '<p class="skill__group">' + esc(s.group) + '</p></div>' +
      '</article>';
    }).join('');

    var groups = ['All'];
    P.skills.forEach(function (s) { if (groups.indexOf(s.group) < 0) groups.push(s.group); });
    filters.innerHTML = groups.map(function (g, i) {
      return '<button class="chip' + (i === 0 ? ' is-on' : '') + '" type="button" data-filter="' +
        esc(g) + '">' + esc(g) + '</button>';
    }).join('');

    filters.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      $$('.chip', filters).forEach(function (c) { c.classList.toggle('is-on', c === chip); });
      var want = chip.dataset.filter;
      $$('.skill', grid).forEach(function (card) {
        card.classList.toggle('is-hidden', want !== 'All' && card.dataset.group !== want);
      });
    });
  }

  /* experience */
  var tl = $('#timeline');
  if (tl && P.experience) {
    tl.innerHTML = P.experience.map(function (j) {
      var bullets = (j.bullets || []).map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('');
      return '<li class="job" data-reveal>' +
        '<div class="job__top"><h3 class="job__role">' + esc(j.role) + '</h3>' +
        '<span class="job__period">' + esc(j.period) + '</span></div>' +
        '<p class="job__org">' + esc(j.org) + (j.type ? ' · ' + esc(j.type) : '') + '</p>' +
        '<p class="job__where">' + esc(j.location || '') + '</p>' +
        (bullets ? '<ul class="job__bullets">' + bullets + '</ul>' : '') +
        tags(j.tags) +
      '</li>';
    }).join('');
  }

  var eduEl = $('#education');
  if (eduEl && P.education) {
    eduEl.innerHTML = P.education.map(function (e) {
      return '<div class="school" data-reveal><h4>' + esc(e.school) + '</h4>' +
        '<p class="school__deg">' + esc(e.degree) + '</p>' +
        '<p class="school__meta">' + esc(e.period) + '</p>' +
        (e.detail ? '<p class="school__detail">' + esc(e.detail) + '</p>' : '') +
      '</div>';
    }).join('');
  }

  var certsEl = $('#certs');
  if (certsEl && P.certifications) {
    certsEl.innerHTML = P.certifications.map(function (c) {
      return '<li data-reveal><span><b>' + esc(c.name) + '</b><small>' + esc(c.issuer) +
        '</small></span><time>' + esc(c.year) + '</time></li>';
    }).join('');
  }

  /* projects */
  var proj = $('#projects');
  if (proj && P.projects) {
    proj.innerHTML = P.projects.map(function (p) {
      var open = p.link
        ? '<a class="project__go" href="' + esc(p.link) + '" aria-label="Open ' + esc(p.title) + '">↗</a>'
        : '<span class="project__go" aria-hidden="true">↗</span>';
      return '<article class="project" data-reveal>' +
        '<span class="project__year">' + esc(p.year) + '</span>' +
        '<div><h3>' + esc(p.title) + '</h3><p>' + esc(p.blurb) + '</p>' + tags(p.tags) + '</div>' +
        open +
      '</article>';
    }).join('');
  }

  /* achievements — a win gets the solid gradient badge, a placing an outline */
  var awards = $('#awards-grid');
  if (awards && P.achievements) {
    var WINS = /^(1st|2nd|3rd|winner|champion|gold|best)\b/i;
    awards.innerHTML = P.achievements.map(function (a) {
      var minor = !WINS.test(String(a.place || ''));
      return '<article class="award' + (minor ? ' award--minor' : '') + '" data-reveal>' +
        '<span class="award__place">' + esc(a.place) + '</span>' +
        '<h3>' + esc(a.name) + '</h3>' +
        '<span class="award__year">' + esc(a.year) + '</span>' +
        (a.blurb ? '<p>' + esc(a.blurb) + '</p>' : '') +
      '</article>';
    }).join('');
  }

  /* contact */
  var contact = P.contact || {};
  var cHead = $('#contactHeading');
  if (cHead) cHead.textContent = contact.heading || "Let's talk";
  setText('#contactBlurb', contact.blurb || '');
  setText('#contactCta', contact.cta || 'Send');

  var social = $('#social');
  if (social) {
    var items = [
      { k: 'Email',     v: links.email    ? 'mailto:' + links.email : '' },
      { k: 'LinkedIn',  v: links.linkedin },
      { k: 'GitHub',    v: links.github },
      { k: 'Instagram', v: links.instagram },
      { k: 'Résumé',    v: links.resume }
    ].filter(function (i) { return i.v; });
    social.innerHTML = items.map(function (i) {
      var external = i.v.indexOf('http') === 0;
      return '<li data-reveal><a href="' + esc(i.v) + '"' +
        (external ? ' target="_blank" rel="noopener noreferrer"' : '') +
        '>' + esc(i.k) + ' <span aria-hidden="true">↗</span></a></li>';
    }).join('');
  }

  /* split every .h2 into characters after content is in place */
  $$('.h2.split').forEach(function (el) { splitText(el, false); });

  /* Split into per-character spans, but keep each word in its own inline-block
     wrapper — otherwise the browser is free to break a line mid-word.
     Characters carry --i so CSS can stagger them.
     gradientLast paints the final word along the brand gradient: a CSS
     background-clip on the parent won't show through transformed children,
     so each character gets its own sampled colour instead. */
  function splitText(el, gradientLast) {
    var words = el.textContent.trim().split(/\s+/);
    var out = '', i = 0;
    words.forEach(function (w, wi) {
      if (wi) out += '<span class="ch sp" style="--i:' + (i++) + '"> </span>';
      var grad = gradientLast && wi === words.length - 1 && words.length > 1;
      out += '<span class="word">' + w.split('').map(function (c, ci) {
        var col = grad ? ';color:' + gradColor(w.length > 1 ? ci / (w.length - 1) : 0) : '';
        return '<span class="ch" style="--i:' + (i++) + col + '">' + esc(c) + '</span>';
      }).join('') + '</span>';
    });
    el.innerHTML = out;
  }

  /* sample the cyan -> violet -> pink ramp at t (0..1) */
  function gradColor(t) {
    var stops = [[53, 229, 255], [157, 92, 255], [255, 77, 141]];
    t = Math.max(0, Math.min(1, t));
    var seg = t < 0.5 ? 0 : 1;
    var lt = t < 0.5 ? t / 0.5 : (t - 0.5) / 0.5;
    var a = stops[seg], b = stops[seg + 1];
    return 'rgb(' + a.map(function (v, i) { return Math.round(v + (b[i] - v) * lt); }).join(',') + ')';
  }

  /* ------------------------------------------------------------------ 2. MOTION */

  /* reveal on scroll */
  var io = 'IntersectionObserver' in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          en.target.classList.add('is-in');
          if (en.target.classList.contains('count')) countUp(en.target);
          io.unobserve(en.target);
        });
      }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' })
    : null;

  function observeAll() {
    if (!io) {
      $$('[data-reveal], .split, .skill, .count').forEach(function (el) { el.classList.add('is-in'); });
      $$('.count').forEach(countUp);
      return;
    }
    $$('[data-reveal], .h2.split, .skill, .count').forEach(function (el) { io.observe(el); });
  }

  /* stagger siblings so groups cascade instead of popping together */
  $$('.specs > *, .timeline__list > *, .projects > *, .skills__grid > *, .certs > *, .hero__stats > *, .awards > *')
    .forEach(function (el, i) {
      el.style.transitionDelay = (i % 8) * 70 + 'ms';
    });

  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    var to = Number(el.dataset.to) || 0, sfx = el.dataset.suffix || '';
    if (reduced) { el.textContent = to + sfx; return; }
    var dur = 1100, t0 = performance.now();
    (function step(now) {
      var p = Math.min(1, (now - t0) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * eased) + sfx;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* typing role swapper */
  var roleEl = $('#heroRole');
  if (roleEl && meta.roles && meta.roles.length) {
    if (reduced) {
      roleEl.textContent = meta.roles[0];
    } else {
      var ri = 0, ci = 0, deleting = false;
      (function type() {
        var word = meta.roles[ri];
        ci += deleting ? -1 : 1;
        roleEl.textContent = word.slice(0, ci);
        var wait = deleting ? 38 : 68;
        if (!deleting && ci === word.length) { deleting = true; wait = 1600; }
        else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % meta.roles.length; wait = 340; }
        setTimeout(type, wait);
      })();
    }
  }

  /* scroll progress + sticky nav + timeline rail + scrollspy */
  var bar = $('#progressBar'), nav = $('#nav');
  var fill = $('#timelineFill'), tlBox = $('.timeline');
  var sections = $$('main section[id]');
  var navAnchors = $$('#navLinks a');
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || window.pageYOffset;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
      if (nav) nav.classList.toggle('is-stuck', y > 40);

      if (fill && tlBox) {
        var r = tlBox.getBoundingClientRect();
        var seen = (window.innerHeight * 0.75 - r.top) / r.height;
        fill.style.height = Math.max(0, Math.min(1, seen)) * 100 + '%';
      }

      var current = '';
      sections.forEach(function (s) {
        if (s.getBoundingClientRect().top <= window.innerHeight * 0.4) current = s.id;
      });
      navAnchors.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + current);
      });
      moveInk();
      ticking = false;
    });
  }

  /* the pill that slides behind the active nav link */
  var ink = $('#navInk');
  function moveInk(target) {
    if (!ink || window.innerWidth <= 860) return;
    var a = target || $('#navLinks a.is-active');
    if (!a) { ink.style.opacity = '0'; return; }
    ink.style.opacity = '1';
    ink.style.width = a.offsetWidth + 'px';
    ink.style.transform = 'translateX(' + a.offsetLeft + 'px)';
  }
  $$('#navLinks a').forEach(function (a) {
    a.addEventListener('mouseenter', function () { moveInk(a); });
  });
  var navLinksBox = $('#navLinks');
  if (navLinksBox) navLinksBox.addEventListener('mouseleave', function () { moveInk(); });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { moveInk(); });

  /* mobile menu */
  var burger = $('#burger');
  if (burger && navLinksBox) {
    burger.addEventListener('click', function () {
      var open = navLinksBox.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('is-locked', open);
    });
    navLinksBox.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') return;
      navLinksBox.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('is-locked');
    });
  }

  /* cursor spotlight on cards */
  document.addEventListener('mousemove', function (e) {
    var card = e.target.closest ? e.target.closest('.spec, .project') : null;
    if (!card) return;
    var r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });

  /* 3D tilt on specialty cards */
  if (!reduced && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    $$('.tilt').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          'perspective(900px) rotateX(' + (-py * 7).toFixed(2) + 'deg) rotateY(' +
          (px * 7).toFixed(2) + 'deg) translateY(-6px)';
      });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });
  }

  /* custom cursor + magnetic buttons */
  var cursor = $('.cursor');
  if (cursor && !reduced && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    var dot = $('.cursor__dot'), ring = $('.cursor__ring');
    var mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
    }, { passive: true });

    (function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = 'translate(' + rx.toFixed(2) + 'px,' + ry.toFixed(2) + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();

    document.addEventListener('mouseover', function (e) {
      var hot = e.target.closest('a, button, .spec, .project, .skill, .chip');
      cursor.classList.toggle('is-hot', !!hot);
    });

    $$('.magnetic').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = 'translate(' + dx * 0.24 + 'px,' + dy * 0.34 + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* contact form — no backend, so hand it to the mail client */
  var form = $('#contactForm'), note = $('#formNote');
  /* with no address in profile.js there is nowhere for a message to go, so
     don't show a form that can only fail — the social links carry it. */
  if (form && !links.email) {
    form.hidden = true;
  } else if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      /* read by id — form.name is the form's own name attribute, not the input */
      var name = $('#f-name').value.trim();
      var mail = $('#f-email').value.trim();
      var msg  = $('#f-msg').value.trim();
      if (!name || !mail || !msg) { note.textContent = 'Fill in all three fields first.'; return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) { note.textContent = 'That email looks off.'; return; }
      var subject = encodeURIComponent('Portfolio enquiry from ' + name);
      var body = encodeURIComponent(msg + '\n\n— ' + name + ' (' + mail + ')');
      window.location.href = 'mailto:' + links.email + '?subject=' + subject + '&body=' + body;
      note.textContent = 'Opening your mail app…';
    });
  }

  /* ------------------------------------------------------------------ 3. BOOT */

  var loader = $('#loader'), lbar = $('.loader__bar i'), lpct = $('#loaderPct');
  var pct = 0;
  var tick = setInterval(function () {
    pct = Math.min(100, pct + Math.random() * 18 + 6);
    if (lbar) lbar.style.width = pct + '%';
    if (lpct) lpct.textContent = Math.round(pct);
    if (pct >= 100) { clearInterval(tick); done(); }
  }, reduced ? 20 : 110);

  function done() {
    setTimeout(function () {
      if (loader) loader.classList.add('is-done');
      if (heroName) heroName.classList.add('is-in');
      observeAll();
      onScroll();
    }, reduced ? 0 : 260);
  }

  /* safety net: never let a stalled asset trap the page behind the loader */
  setTimeout(function () {
    clearInterval(tick);
    if (loader && !loader.classList.contains('is-done')) done();
  }, 3200);
})();
