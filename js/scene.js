/* ============================================================
   SPILL DE TEA — 3D signature cup
   Procedurally built with three.js: glass tumbler, layered
   milk-tea liquid (custom shader), boba, dome lid, straw,
   wrapped label, and drifting tea-dust particles.
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

  var top = new THREE.PointLight(0xffffff, 1.1, 16);
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

  /* glass shell */
  var glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, transparent: true, opacity: 0.13,
    roughness: 0.03, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.05,
    side: THREE.DoubleSide, depthWrite: false
  });
  var glass = new THREE.Mesh(new THREE.LatheGeometry(lathePoints(1), 96), glassMat);
  cup.add(glass);

  /* rim highlight */
  var rimRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.15, 0.028, 16, 96),
    new THREE.MeshStandardMaterial({ color: 0xf6f1e7, roughness: 0.3, metalness: 0.35 })
  );
  rimRing.rotation.x = Math.PI / 2;
  rimRing.position.y = H + 0.06;
  cup.add(rimRing);

  /* ── liquid (vertical gradient shader) ────────────────── */
  var LEVEL = 3.02;
  var liquidMat = new THREE.ShaderMaterial({
    uniforms: {
      uTea:   { value: new THREE.Color(0x3f2208) },
      uMid:   { value: new THREE.Color(0xb3763f) },
      uMilk:  { value: new THREE.Color(0xf2e0c4) },
      uLevel: { value: LEVEL },
      uTime:  { value: 0 }
    },
    vertexShader: [
      'varying float vY; varying vec3 vN; varying vec3 vP;',
      'void main(){ vY = position.y; vN = normalize(normalMatrix * normal);',
      ' vec4 mv = modelViewMatrix * vec4(position,1.0); vP = mv.xyz;',
      ' gl_Position = projectionMatrix * mv; }'
    ].join('\n'),
    fragmentShader: [
      'varying float vY; varying vec3 vN; varying vec3 vP;',
      'uniform vec3 uTea; uniform vec3 uMid; uniform vec3 uMilk;',
      'uniform float uLevel; uniform float uTime;',
      'void main(){',
      ' float t = clamp(vY / uLevel, 0.0, 1.0);',
      ' vec3 c = mix(uTea, uMid, smoothstep(0.0, 0.42, t));',
      ' c = mix(c, uMilk, smoothstep(0.68, 1.0, t));',
      ' float swirl = 0.045 * sin(vY * 7.0 + uTime * 1.1);',
      ' c += swirl;',
      ' float fres = pow(1.0 - abs(dot(normalize(vN), normalize(-vP))), 2.4);',
      ' c += fres * 0.32;',
      ' gl_FragColor = vec4(c, 0.88); }'
    ].join('\n'),
    transparent: true
  });

  var liquid = new THREE.Mesh(new THREE.LatheGeometry(lathePoints(0.955, LEVEL), 80), liquidMat);
  cup.add(liquid);

  /* liquid surface disc */
  var surface = new THREE.Mesh(
    new THREE.CircleGeometry(radiusAt(LEVEL) * 0.955, 72),
    new THREE.MeshStandardMaterial({ color: 0xf3e2ca, roughness: 0.35, metalness: 0.05 })
  );
  surface.rotation.x = -Math.PI / 2;
  surface.position.y = LEVEL;
  cup.add(surface);

  /* ── boba pearls ──────────────────────────────────────── */
  var bobaGeo = new THREE.SphereGeometry(0.135, 20, 16);
  var bobaMat = new THREE.MeshStandardMaterial({ color: 0x2a1a10, roughness: 0.22, metalness: 0.1 });
  var bobas = [];
  for (var b = 0; b < 20; b++) {
    var m = new THREE.Mesh(bobaGeo, bobaMat);
    var ang = Math.random() * Math.PI * 2;
    var rad = Math.sqrt(Math.random()) * 0.5;
    m.position.set(Math.cos(ang) * rad, 0.16 + Math.random() * 0.42, Math.sin(ang) * rad);
    m.userData.p = Math.random() * Math.PI * 2;
    m.userData.y0 = m.position.y;
    cup.add(m);
    bobas.push(m);
  }

  /* ── wrapped label ────────────────────────────────────── */
  function labelTexture() {
    var c = document.createElement('canvas');
    c.width = 2048; c.height = 512;
    var x = c.getContext('2d');

    x.fillStyle = '#0B3B2E';
    x.fillRect(0, 0, c.width, c.height);

    // subtle inner keyline
    x.strokeStyle = 'rgba(200,162,74,.45)';
    x.lineWidth = 3;
    x.strokeRect(20, 34, c.width - 40, c.height - 68);

    x.textAlign = 'center';
    x.textBaseline = 'middle';

    // two repeats around the cup -> the viewer always faces one whole wordmark
    var CELLS = 2, cw = c.width / CELLS;
    for (var k = 0; k < CELLS; k++) {
      var cx = cw * (k + 0.5);

      x.fillStyle = '#C8A24A';
      x.font = 'italic 600 132px Georgia, "Times New Roman", serif';
      x.fillText('Spill de Tea', cx, 212);

      x.fillStyle = 'rgba(246,241,231,.66)';
      x.font = '500 40px Helvetica, Arial, sans-serif';
      x.fillText('P R E M I U M   T A S T E   ·   S T U D E N T   P R I C E', cx, 316);

      x.fillStyle = 'rgba(200,162,74,.85)';
      x.font = '400 34px Helvetica, Arial, sans-serif';
      x.fillText('250 ml  ·  FRESH BATCH', cx, 386);

      // leaf ornament on the seam between cells
      var sx = cw * k;
      x.save();
      x.translate(sx, c.height / 2);
      x.strokeStyle = 'rgba(200,162,74,.55)';
      x.lineWidth = 4;
      x.beginPath();
      x.moveTo(0, -96); x.lineTo(0, 96);
      x.stroke();
      x.restore();
    }

    var t = new THREE.CanvasTexture(c);
    if ('encoding' in t) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = renderer.capabilities.getMaxAnisotropy ? renderer.capabilities.getMaxAnisotropy() : 1;
    return t;
  }

  var bandY = 1.30, bandH = 1.02;
  var band = new THREE.Mesh(
    new THREE.CylinderGeometry(
      radiusAt(bandY + bandH / 2) * 1.02, radiusAt(bandY - bandH / 2) * 1.02,
      bandH, 96, 1, true
    ),
    new THREE.MeshStandardMaterial({
      map: labelTexture(), roughness: 0.58, metalness: 0.06, side: THREE.FrontSide
    })
  );
  band.position.y = bandY;
  cup.add(band);

  /* ── dome lid ─────────────────────────────────────────── */
  var lid = new THREE.Mesh(
    new THREE.SphereGeometry(1.16, 64, 28, 0, Math.PI * 2, 0, Math.PI * 0.44),
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff, transparent: true, opacity: 0.15, roughness: 0.04,
      metalness: 0, clearcoat: 1, side: THREE.DoubleSide, depthWrite: false
    })
  );
  lid.position.y = H + 0.05;
  cup.add(lid);

  var lidRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.17, 0.055, 16, 96),
    new THREE.MeshStandardMaterial({ color: 0xc8a24a, roughness: 0.28, metalness: 0.75 })
  );
  lidRing.rotation.x = Math.PI / 2;
  lidRing.position.y = H + 0.05;
  cup.add(lidRing);

  /* ── straw ────────────────────────────────────────────── */
  var straw = new THREE.Group();
  var strawBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.088, 0.088, 3.6, 24, 1, false),
    new THREE.MeshStandardMaterial({ color: 0xefe3cd, roughness: 0.42, metalness: 0.12 })
  );
  straw.add(strawBody);
  var strawTip = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 0.42, 24),
    new THREE.MeshStandardMaterial({ color: 0xc8a24a, roughness: 0.3, metalness: 0.6 })
  );
  strawTip.position.y = 1.59;
  straw.add(strawTip);
  straw.position.set(0.32, 2.75, 0.14);
  straw.rotation.z = -0.2;
  cup.add(straw);

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
    liquidMat.uniforms.uTime.value = t;
    surface.rotation.z = Math.sin(t * 1.25) * 0.05;
    surface.position.y = LEVEL + Math.sin(t * 1.8) * 0.014;

    for (var i = 0; i < bobas.length; i++) {
      var m = bobas[i];
      m.position.y = m.userData.y0 + Math.sin(t * 1.3 + m.userData.p) * 0.055;
      m.rotation.y += 0.006;
    }

    straw.rotation.z = -0.2 + Math.sin(t * 0.9) * 0.012;

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
