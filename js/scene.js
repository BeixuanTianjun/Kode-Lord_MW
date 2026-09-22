/* ============================================================
   SPILL DE TEA — 3D signature cup
   Procedurally built with three.js: a printed paper cup — lathed
   body, full-height wrap generated in brandmark.js, solid lid,
   contact shadow and drifting tea-dust particles.
   ============================================================ */
(function () {
  'use strict';

  var API = { ready: false, setScroll: function () {}, setPointer: function () {} };
  window.SDTScene = API;

  var stage = document.getElementById('stage');
  var canvas = document.getElementById('cupCanvas');
  if (!stage || !canvas) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function fail() {
    stage.classList.add('fallback', 'ready');
    API.ready = true;
  }

  if (typeof THREE === 'undefined') { fail(); return; }

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  } catch (e) { fail(); return; }
  if (!renderer.getContext()) { fail(); return; }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  if ('outputEncoding' in renderer) renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0.35, 9.2);
  camera.lookAt(0.9, -0.1, 0);

  /* ── lighting ─────────────────────────────────────────── */
  scene.add(new THREE.HemisphereLight(0xdff0e6, 0x0b2a20, 0.85));

  var key = new THREE.DirectionalLight(0xfff4dd, 2.1);
  key.position.set(4, 6.5, 5);
  scene.add(key);

  var rim = new THREE.DirectionalLight(0xc8a24a, 2.4);
  rim.position.set(-5, 2.5, -4);
  scene.add(rim);

  var fill = new THREE.PointLight(0x9fe0c2, 1.5, 22);
  fill.position.set(-3.4, -1.6, 4);
  scene.add(fill);

  var top = new THREE.PointLight(0xffffff, 0.55, 16);
  top.position.set(0, 5, 1.5);
  scene.add(top);

  /* ── cup silhouette ───────────────────────────────────── */
  var H = 3.35;                       // body height
  var profile = [                     // (radius, y) bottom → rim
    [0.00, 0.00], [0.72, 0.00], [0.79, 0.05], [0.83, 0.35],
    [0.90, 1.05], [0.99, 1.95], [1.08, 2.85], [1.13, H], [1.15, H + 0.06]
  ];
  function lathePoints(scale, maxY) {
    var pts = [];
    for (var i = 0; i < profile.length; i++) {
      var r = profile[i][0] * scale, y = profile[i][1];
      if (maxY !== undefined && y > maxY) break;
      pts.push(new THREE.Vector2(r, y));
    }
    return pts;
  }
  function radiusAt(y) {
    for (var i = 1; i < profile.length; i++) {
      if (profile[i][1] >= y) {
        var a = profile[i - 1], b = profile[i];
        var t = (y - a[1]) / Math.max(b[1] - a[1], 1e-6);
        return a[0] + (b[0] - a[0]) * t;
      }
    }
    return profile[profile.length - 1][0];
  }

  var cup = new THREE.Group();
  cup.position.y = -1.35;
  scene.add(cup);

  /* paper body — the sleeve prints over it, so it only shows at the base */
  var bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf3ecdd, roughness: 0.86, metalness: 0, side: THREE.DoubleSide
  });
  var body = new THREE.Mesh(new THREE.LatheGeometry(lathePoints(1), 96), bodyMat);
  cup.add(body);

  /* ── printed sleeve ───────────────────────────────────────
     A full-height printed wrap in the manner of a modern tea
     house: botanical ink over cream, a gold-ruled wordmark band,
     and the house emblem above it. The emblem is a real image,
     so the texture is drawn once without it and repainted when
     it arrives.                                                 */
  var sleeveTop = 3.28, sleeveBot = 0.06;
  var sleeveH = sleeveTop - sleeveBot;
  var wrapCanvas = document.createElement('canvas');
  SDTBrand.wrap(wrapCanvas);

  var wrapTex = new THREE.CanvasTexture(wrapCanvas);
  if ('encoding' in wrapTex) wrapTex.encoding = THREE.sRGBEncoding;
  wrapTex.anisotropy = renderer.capabilities.getMaxAnisotropy
    ? renderer.capabilities.getMaxAnisotropy() : 1;

  var emblemImg = new Image();
  emblemImg.onload = function () {
    SDTBrand.wrap(wrapCanvas, emblemImg);
    wrapTex.needsUpdate = true;
  };
  emblemImg.src = SDTBrand.emblemSrc;

  var band = new THREE.Mesh(
    new THREE.CylinderGeometry(
      radiusAt(sleeveTop) * 1.014, radiusAt(sleeveBot) * 1.014,
      sleeveH, 96, 1, true
    ),
    new THREE.MeshStandardMaterial({
      map: wrapTex, roughness: 0.6, metalness: 0.04, side: THREE.FrontSide
    })
  );
  band.position.y = (sleeveTop + sleeveBot) / 2;
  cup.add(band);

  /* ── lid ─────────────────────────────────────────────────
     One lathed profile: a gripping skirt that reaches down over
     the printed edge, a shoulder, then a shallow crown. Drawn as
     a single surface so the crown can never read wider than the
     skirt it sits on.                                           */
  var lidProfile = [
    [1.172, -0.170], [1.192, -0.130], [1.203, -0.060],
    [1.205,  0.010], [1.196,  0.062], [1.160,  0.104],
    [1.050,  0.148], [0.860,  0.180], [0.600,  0.201],
    [0.300,  0.212], [0.000,  0.215]
  ];
  var lidPts = lidProfile.map(function (p) { return new THREE.Vector2(p[0], p[1]); });

  var lid = new THREE.Mesh(
    new THREE.LatheGeometry(lidPts, 96),
    new THREE.MeshStandardMaterial({
      color: 0x080706, roughness: 0.88, metalness: 0, side: THREE.DoubleSide
    })
  );
  lid.position.y = 3.38;
  cup.add(lid);

  var lidRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.208, 0.026, 14, 96),
    new THREE.MeshStandardMaterial({ color: 0xc8a24a, roughness: 0.32, metalness: 0.7 })
  );
  lidRing.rotation.x = Math.PI / 2;
  lidRing.position.y = 3.39;
  cup.add(lidRing);

  /* ── soft contact shadow ──────────────────────────────── */
  (function () {
    var c = document.createElement('canvas');
    c.width = c.height = 256;
    var x = c.getContext('2d');
    var g = x.createRadialGradient(128, 128, 6, 128, 128, 126);
    g.addColorStop(0, 'rgba(0,0,0,.55)');
    g.addColorStop(0.55, 'rgba(0,0,0,.18)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g;
    x.fillRect(0, 0, 256, 256);
    var sh = new THREE.Mesh(
      new THREE.PlaneGeometry(4.4, 4.4),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false })
    );
    sh.rotation.x = -Math.PI / 2;
    sh.position.y = 0.01;
    cup.add(sh);
  })();

  /* ── drifting tea dust ────────────────────────────────── */
  var dust;
  (function () {
    var c = document.createElement('canvas');
    c.width = c.height = 64;
    var x = c.getContext('2d');
    var g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,240,205,1)');
    g.addColorStop(1, 'rgba(255,240,205,0)');
    x.fillStyle = g;
    x.fillRect(0, 0, 64, 64);

    var n = 190, pos = new Float32Array(n * 3);
    for (var i = 0; i < n; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 17;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 11;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 9 - 1;
    }
    var geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    dust = new THREE.Points(geo, new THREE.PointsMaterial({
      size: 0.085, map: new THREE.CanvasTexture(c), transparent: true,
      opacity: 0.62, depthWrite: false, blending: THREE.AdditiveBlending
    }));
    scene.add(dust);
  })();

  /* ── interaction state ────────────────────────────────── */
  /* framing adapts to the viewport: on a phone the cup becomes a small
     backdrop element instead of a hero-sized object competing with the copy */
  var L = { base: 0.74, anchorX: 2.35, lookX: 1.15, dist: 9.2, drift: 2.4, yOff: 0 };
  function layout() {
    var a = window.innerWidth / window.innerHeight;
    if (a < 0.9) {          // portrait phone
      L = { base: 0.44, anchorX: 1.18, lookX: 0.45, dist: 11.5, drift: 1.2, yOff: -0.62 };
    } else if (a < 1.35) {  // tablet / narrow window
      L = { base: 0.56, anchorX: 1.75, lookX: 0.85, dist: 10.2, drift: 1.8, yOff: -0.25 };
    } else {
      L = { base: 0.74, anchorX: 2.35, lookX: 1.15, dist: 9.2, drift: 2.4, yOff: 0 };
    }
    camera.position.z = L.dist;
  }

  var ptr = { x: 0, y: 0 }, ptrT = { x: 0, y: 0 };
  var scrollP = 0, scrollT = 0;

  API.setPointer = function (nx, ny) { ptrT.x = nx; ptrT.y = ny; };
  API.setScroll = function (p) { scrollT = p; };

  function resize() {
    var w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
  }
  window.addEventListener('resize', function () { layout(); resize(); }, { passive: true });
  layout();
  resize();

  /* ── render loop ──────────────────────────────────────── */
  var clock = new THREE.Clock();
  var visible = true;
  document.addEventListener('visibilitychange', function () { visible = !document.hidden; });

  function frame() {
    requestAnimationFrame(frame);
    if (!visible) return;

    var t = clock.getElapsedTime();
    var dt = Math.min(clock.getDelta ? 0.016 : 0.016, 0.033);

    ptr.x += (ptrT.x - ptr.x) * 0.055;
    ptr.y += (ptrT.y - ptr.y) * 0.055;
    scrollP += (scrollT - scrollP) * 0.075;

    /* cup: idle spin + pointer follow */
    cup.rotation.y = t * (reduced ? 0.08 : 0.22) + ptr.x * 0.6;
    cup.rotation.x = ptr.y * 0.18;
    cup.rotation.z = Math.sin(t * 0.6) * 0.018;

    /* hero → scrolled-away choreography */
    var p = Math.min(scrollP, 1);
    cup.position.x = L.anchorX + p * L.drift + ptr.x * 0.22;
    cup.position.y = -1.35 + L.yOff + Math.sin(t * 0.85) * 0.07 - p * 1.4;
    var s = L.base * (1 - p * 0.26);
    cup.scale.set(s, s, s);

    /* liquid life */
    if (dust) {
      dust.rotation.y = t * 0.02;
      dust.position.y = Math.sin(t * 0.28) * 0.35;
    }

    camera.position.x += (ptr.x * 0.55 - camera.position.x) * 0.05;
    camera.position.y += (0.35 + ptr.y * 0.35 - camera.position.y) * 0.05;
    camera.lookAt(L.lookX, -0.15, 0);

    renderer.render(scene, camera);
  }

  /* stagger the reveal so the loader has something to wait for */
  requestAnimationFrame(function () {
    frame();
    API.ready = true;
    stage.classList.add('ready');
  });
})();
