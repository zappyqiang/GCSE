/* Animation toolkit: step-by-step SVG explainers, particle simulations and confetti. No dependencies. */
(function () {
  "use strict";
  var A = window.ANIM = { sims: {}, _live: [] };
  var NS = "http://www.w3.org/2000/svg";
  var reduced = function () { return window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches; };
  function el(tag, attrs, parent) { var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  function rnd(a, b) { return a + Math.random() * (b - a); }
  A.stopAll = function () { A._live.forEach(function (f) { try { f(); } catch (e) {} }); A._live = []; };

  /* ---------- colours and tweening ---------- */
  function col(s) {
    if (typeof s !== "string") return null;
    var m = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (m) { var h = m[1]; if (h.length === 3) h = h.replace(/./g, "$&$&"); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4), 16)]; }
    m = s.match(/^rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)$/); return m ? [+m[1], +m[2], +m[3]] : null;
  }
  function tween(a, b, t) {
    if (typeof a === "number" && typeof b === "number") return a + (b - a) * t;
    var ca = col(a), cb = col(b);
    if (ca && cb) return "rgb(" + [0, 1, 2].map(function (i) { return Math.round(ca[i] + (cb[i] - ca[i]) * t); }).join(",") + ")";
    return t > 0 ? b : a;
  }
  var ease = function (t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  var DEF = { tx: 0, ty: 0, rot: 0, sc: 1, o: 1, draw: 0, ox: 0, oy: 0 }, TF = { tx: 1, ty: 1, rot: 1, sc: 1, ox: 1, oy: 1 };
  function apply(e, st) {
    var tf = false;
    for (var k in st) {
      var v = st[k];
      if (k === "t") e.textContent = v;
      else if (k === "o") e.style.opacity = v;
      else if (k === "draw") e.style.strokeDashoffset = 1 - v;
      else if (TF[k]) tf = true;
      else e.setAttribute(k, v);
    }
    if (tf) { var ox = st.ox || 0, oy = st.oy || 0, s = st.sc == null ? 1 : st.sc; e.setAttribute("transform", "translate(" + ((st.tx || 0) + ox) + " " + ((st.ty || 0) + oy) + ") rotate(" + (st.rot || 0) + ") scale(" + s + ") translate(" + (-ox) + " " + (-oy) + ")"); }
  }

  /* ---------- scene player ----------
     def: { w, h, items: [[tag, id, attrs]], steps: [{ cap, set: { id: attrs }, dur, hold }] }
     Special attrs: t (text), o (opacity), draw (0..1 line drawing), tx ty rot sc ox oy (transform). */
  A.scene = function (host, def) {
    var w = def.w || 640, h = def.h || 320, items = def.items || [], steps = def.steps || [];
    host.innerHTML = '<div class="scene"><svg class="sstage" viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="' + (def.label || "Animated explanation") + '"></svg><div class="scap" aria-live="polite"><span class="sn"></span><p></p></div><div class="sctl"><button class="sbtn" data-a="prev" aria-label="Previous step">&#9664;</button><button class="sbtn play" data-a="play" aria-label="Play or pause">&#9654;</button><button class="sbtn" data-a="next" aria-label="Next step">&#9654;&#9654;</button><span class="sdots"></span></div></div>';
    var svg = host.querySelector("svg"), cap = host.querySelector(".scap p"), num = host.querySelector(".sn"), dots = host.querySelector(".sdots"), playBtn = host.querySelector(".play");
    var els = {}, init = {}, cur = {}, idx = -1, playing = false, raf = 0, timer = 0, dead = false, t0 = 0, from = null, tgt = null, dur = 0;
    items.forEach(function (it) {
      var e = el(it[0], {}, svg); els[it[1]] = e; init[it[1]] = it[2] || {};
      if ("draw" in init[it[1]]) { e.setAttribute("pathLength", "1"); e.style.strokeDasharray = "1"; }
      cur[it[1]] = Object.assign({}, init[it[1]]); apply(e, cur[it[1]]);
    });
    steps.forEach(function (s, i) { var b = document.createElement("button"); b.className = "sdot"; b.setAttribute("aria-label", "Step " + (i + 1)); b.onclick = function () { pause(); go(i); }; dots.appendChild(b); });
    function stateAt(k) {
      var s = {}; for (var id in init) s[id] = Object.assign({}, init[id]);
      for (var i = 0; i <= k; i++) { var st = steps[i].set || {}; for (var id2 in st) { if (!s[id2]) continue; Object.assign(s[id2], st[id2]); } }
      return s;
    }
    function frame(now) {
      if (dead) return;
      var t = dur ? Math.min(1, (now - t0) / dur) : 1, e = ease(t);
      for (var id in tgt) {
        var o = {}, f = from[id] || {}, g = tgt[id];
        for (var k in g) { var a = f[k] === undefined ? DEF[k] : f[k]; o[k] = a === undefined ? g[k] : tween(a, g[k], e); }
        cur[id] = o; apply(els[id], o);
      }
      if (t < 1) raf = requestAnimationFrame(frame);
      else { raf = 0; if (playing) schedule(); }
    }
    function words(s) { return (s || "").replace(/<[^>]+>/g, "").split(/\s+/).length; }
    function schedule() {
      clearTimeout(timer);
      var st = steps[idx], hold = st && st.hold != null ? st.hold : Math.max(1500, words(st && st.cap) * 330);
      timer = setTimeout(function () { if (idx < steps.length - 1) go(idx + 1); else { playing = false; ui(); } }, hold);
    }
    function go(k, instant) {
      if (k < -1) k = -1; if (k > steps.length - 1) k = steps.length - 1;
      idx = k; from = JSON.parse(JSON.stringify(cur)); tgt = stateAt(k);
      dur = instant || reduced() ? 0 : (k >= 0 && steps[k].dur != null ? steps[k].dur : 1000);
      t0 = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(frame);
      cap.innerHTML = k >= 0 ? steps[k].cap || "" : (def.intro || "Press play to watch.");
      num.textContent = k >= 0 ? (k + 1) + " / " + steps.length : "";
      ui();
    }
    function ui() {
      $d(dots).forEach(function (d, i) { d.className = "sdot" + (i === idx ? " on" : i < idx ? " done" : ""); });
      playBtn.innerHTML = playing ? "&#10074;&#10074;" : idx >= steps.length - 1 && idx >= 0 ? "&#8635;" : "&#9654;";
    }
    function $d(n) { return Array.prototype.slice.call(n.children); }
    function play() { if (idx >= steps.length - 1) go(-1, true); playing = true; ui(); if (idx < 0) go(0); else schedule(); }
    function pause() { playing = false; clearTimeout(timer); ui(); }
    host.querySelector(".sctl").onclick = function (e) {
      var b = e.target.closest(".sbtn"); if (!b) return; var a = b.dataset.a;
      if (a === "play") { playing ? pause() : play(); } else if (a === "next") { pause(); go(idx + 1); } else if (a === "prev") { pause(); go(idx - 1); }
    };
    go(-1, true);
    var io = null, started = false;
    function kick() { if (started || dead) return; started = true; setTimeout(function () { if (!dead && def.autoplay !== false) play(); }, 500); }
    if ("IntersectionObserver" in window) { io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { kick(); io.disconnect(); } }, { threshold: .4 }); io.observe(host); } else kick();
    var stop = function () { dead = true; playing = false; clearTimeout(timer); cancelAnimationFrame(raf); if (io) io.disconnect(); };
    A._live.push(stop); return { stop: stop, go: go, play: play, pause: pause };
  };

  /* ---------- simulations ---------- */
  function ui(box, canvasW, canvasH) {
    box.innerHTML = '<div class="simbox"><canvas width="' + canvasW + '" height="' + canvasH + '"></canvas><div class="simread"></div><div class="simctl"></div></div>';
    var cv = box.querySelector("canvas"), ctl = box.querySelector(".simctl"), read = box.querySelector(".simread");
    return {
      cv: cv, g: cv.getContext("2d"), read: function (h) { read.innerHTML = h; },
      slider: function (label, min, max, step, val, unit, fn) {
        var d = document.createElement("label"); d.className = "simsl"; d.innerHTML = "<span>" + label + '</span><input type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"><b></b>'; ctl.appendChild(d);
        var inp = d.querySelector("input"), b = d.querySelector("b"), f = function () { b.textContent = inp.value + (unit ? " " + unit : ""); fn(parseFloat(inp.value)); }; inp.oninput = f; f(); return inp;
      },
      button: function (label, fn) { var b = document.createElement("button"); b.className = "btn small alt"; b.textContent = label; b.onclick = fn; ctl.appendChild(b); return b; }
    };
  }
  function loop(fn) { var last = 0, raf = 0, dead = false; function f(t) { if (dead) return; var dt = last ? Math.min(.05, (t - last) / 1000) : 0; last = t; fn(dt, t / 1000); raf = requestAnimationFrame(f); } raf = requestAnimationFrame(f); var stop = function () { dead = true; cancelAnimationFrame(raf); }; A._live.push(stop); return stop; }
  var PAL = { bg: "#0d1431", line: "#7c8bd1", red: "#ff6b81", blue: "#4dabff", green: "#4ade80", amber: "#ffb84d", white: "#eaf0ff", grey: "#4b557f" };

  A.sims.gas = function (box) {
    var W = 640, H = 300, u = ui(box, W, H), g = u.g, T = 300, Vf = .9, P = [], hits = 0, acc = 0, rate = 0;
    for (var i = 0; i < 34; i++) P.push({ x: rnd(20, 300), y: rnd(20, H - 20), a: rnd(0, 6.28) });
    u.slider("Temperature", 100, 600, 10, 300, "K", function (v) { T = v; }); u.slider("Volume", 35, 100, 5, 90, "%", function (v) { Vf = v / 100; });
    loop(function (dt) {
      var L = W * Vf, v = 110 * Math.sqrt(T / 300);
      g.fillStyle = PAL.bg; g.fillRect(0, 0, W, H); g.fillStyle = "#18214a"; g.fillRect(0, 0, L, H);
      P.forEach(function (p) {
        p.x += Math.cos(p.a) * v * dt; p.y += Math.sin(p.a) * v * dt;
        if (p.x < 6) { p.x = 6; p.a = Math.PI - p.a; } if (p.x > L - 6) { p.x = L - 6; p.a = Math.PI - p.a; hits++; }
        if (p.y < 6) { p.y = 6; p.a = -p.a; } if (p.y > H - 6) { p.y = H - 6; p.a = -p.a; }
        g.fillStyle = "hsl(" + (210 - (T - 100) / 500 * 210) + ",90%,62%)"; g.beginPath(); g.arc(p.x, p.y, 6, 0, 6.3); g.fill();
      });
      g.fillStyle = PAL.amber; g.fillRect(L, 0, 10, H); g.fillStyle = PAL.line; g.fillRect(L + 10, H / 2 - 6, 40, 12);
      acc += dt; if (acc > .6) { rate = hits / acc; hits = 0; acc = 0; }
      u.read("Wall collisions per second: <b>" + Math.round(rate) + "</b> &nbsp; (more collisions = higher pressure)");
    });
  };

  A.sims.diffusion = function (box) {
    var W = 640, H = 300, u = ui(box, W, H), g = u.g, P = [], barrier = true, T = 1, N = 70;
    function reset() { P = []; for (var i = 0; i < N; i++) { P.push({ x: rnd(10, W / 2 - 10), y: rnd(10, H - 10), c: 0 }); P.push({ x: rnd(W / 2 + 10, W - 10), y: rnd(10, H - 10), c: 1 }); } barrier = true; }
    reset(); u.slider("Temperature", 1, 5, 1, 2, "", function (v) { T = v; }); u.button("Remove barrier", function () { barrier = false; }); u.button("Reset", reset);
    loop(function (dt) {
      g.fillStyle = PAL.bg; g.fillRect(0, 0, W, H); var m = 0;
      P.forEach(function (p) {
        var s = 45 * T; p.x += rnd(-1, 1) * s * dt * 3; p.y += rnd(-1, 1) * s * dt * 3;
        if (p.x < 8) p.x = 8; if (p.x > W - 8) p.x = W - 8; if (p.y < 8) p.y = 8; if (p.y > H - 8) p.y = H - 8;
        if (barrier) { if (p.c === 0 && p.x > W / 2 - 8) p.x = W / 2 - 8; if (p.c === 1 && p.x < W / 2 + 8) p.x = W / 2 + 8; }
        if (p.c === 0 && p.x > W / 2) m++;
        g.fillStyle = p.c ? PAL.blue : PAL.red; g.beginPath(); g.arc(p.x, p.y, 7, 0, 6.3); g.fill();
      });
      if (barrier) { g.fillStyle = PAL.amber; g.fillRect(W / 2 - 3, 0, 6, H); }
      u.read("Red particles on the right half: <b>" + Math.round(m / N * 100) + "%</b> &nbsp; (they spread from high to low concentration until evenly mixed)");
    });
  };

  A.sims.osmosis = function (box) {
    var W = 640, H = 300, u = ui(box, W, H), g = u.g, wat = [], sol = [], solN = 14, M = W / 2;
    function reset() {
      wat = []; sol = [];
      for (var i = 0; i < 50; i++) wat.push({ x: rnd(10, M - 10), y: rnd(120, H - 8) });
      for (var j = 0; j < 90; j++) wat.push({ x: rnd(M + 10, W - 10), y: rnd(120, H - 8) });
      for (var k = 0; k < solN; k++) sol.push({ x: rnd(14, M - 14), y: rnd(120, H - 10), a: rnd(0, 6.3) });
    }
    reset(); u.slider("Solute on the left", 4, 24, 2, 14, "", function (v) { solN = v; reset(); }); u.button("Reset", reset);
    loop(function (dt) {
      g.fillStyle = PAL.bg; g.fillRect(0, 0, W, H);
      var wl = wat.filter(function (p) { return p.x < M; }).length, wr = wat.length - wl;
      var hl = Math.min(H - 20, 40 + (wl + sol.length * 1.6) * 1.9), hr = Math.min(H - 20, 40 + wr * 1.9), topL = H - hl, topR = H - hr;
      g.fillStyle = "rgba(77,171,255,.18)"; g.fillRect(0, topL, M, hl); g.fillRect(M, topR, M, hr);
      g.strokeStyle = PAL.white; g.lineWidth = 2; g.setLineDash([6, 6]); g.beginPath(); g.moveTo(M, 20); g.lineTo(M, H); g.stroke(); g.setLineDash([]);
      wat.forEach(function (p) {
        var l = p.x < M; p.x += rnd(-1, 1) * 160 * dt; p.y += rnd(-1, 1) * 160 * dt;
        p.y = Math.max(l ? topL + 6 : topR + 6, Math.min(H - 6, p.y)); p.x = Math.max(6, Math.min(W - 6, p.x));
        g.fillStyle = PAL.blue; g.beginPath(); g.arc(p.x, p.y, 3.6, 0, 6.3); g.fill();
      });
      sol.forEach(function (p) { p.a += rnd(-.5, .5); p.x += Math.cos(p.a) * 60 * dt; p.y += Math.sin(p.a) * 60 * dt; if (p.x < 12) { p.x = 12; p.a = Math.PI - p.a; } if (p.x > M - 12) { p.x = M - 12; p.a = Math.PI - p.a; } p.y = Math.max(topL + 10, Math.min(H - 10, p.y)); g.fillStyle = PAL.amber; g.beginPath(); g.arc(p.x, p.y, 9, 0, 6.3); g.fill(); });
      g.fillStyle = PAL.white; g.font = "700 13px system-ui"; g.fillText("Concentrated solution", 14, 18); g.fillText("Dilute / pure water", M + 14, 18);
      u.read("Water moves through the membrane from dilute to concentrated. Left level: <b>" + Math.round(hl) + "</b> &nbsp; Right level: <b>" + Math.round(hr) + "</b>");
    });
  };

  A.sims.collision = function (box) {
    var W = 640, H = 300, u = ui(box, W, H), g = u.g, P = [], T = 3, N = 16, prod = 0, col = 0, ok = 0, flashes = [], Ea = 1;
    function reset() { P = []; prod = 0; col = 0; ok = 0; for (var i = 0; i < N; i++) P.push({ x: rnd(10, W - 10), y: rnd(10, H - 10), a: rnd(0, 6.3), k: i % 2 }); }
    reset(); u.slider("Temperature", 1, 6, 1, 3, "", function (v) { T = v; }); u.slider("Concentration", 6, 30, 2, 16, "", function (v) { N = v; reset(); }); u.button("Reset", reset);
    loop(function (dt) {
      g.fillStyle = PAL.bg; g.fillRect(0, 0, W, H); var v = 40 * T;
      P.forEach(function (p) { p.x += Math.cos(p.a) * v * dt; p.y += Math.sin(p.a) * v * dt; if (p.x < 9 || p.x > W - 9) { p.a = Math.PI - p.a; p.x = Math.max(9, Math.min(W - 9, p.x)); } if (p.y < 9 || p.y > H - 9) { p.a = -p.a; p.y = Math.max(9, Math.min(H - 9, p.y)); } });
      for (var i = 0; i < P.length; i++) for (var j = i + 1; j < P.length; j++) {
        var a = P[i], b = P[j], dx = a.x - b.x, dy = a.y - b.y;
        if (dx * dx + dy * dy < 324) {
          if (a.k === 2 || b.k === 2 || a.cd > 0 || b.cd > 0) continue;
          col++; a.cd = b.cd = .3; var na = a.a; a.a = b.a; b.a = na;
          if (a.k !== b.k && T >= 3) { a.k = b.k = 2; ok++; flashes.push({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, t: .5 }); }
        }
      }
      P.forEach(function (p) { if (p.cd) p.cd = Math.max(0, p.cd - dt); g.fillStyle = [PAL.red, PAL.blue, PAL.green][p.k]; g.beginPath(); g.arc(p.x, p.y, 9, 0, 6.3); g.fill(); });
      flashes = flashes.filter(function (f) { f.t -= dt; g.strokeStyle = "rgba(255,255,255," + f.t * 2 + ")"; g.lineWidth = 3; g.beginPath(); g.arc(f.x, f.y, 22 - f.t * 24, 0, 6.3); g.stroke(); return f.t > 0; });
      var pr = P.filter(function (p) { return p.k === 2; }).length / 2;
      u.read("Collisions: <b>" + col + "</b> &nbsp; Successful (enough energy): <b>" + ok + "</b> &nbsp; Product pairs: <b>" + pr + "</b>");
    });
  };

  A.sims.decay = function (box) {
    var W = 640, H = 300, u = ui(box, W, H), g = u.g, N = 100, alive = [], t = 0, hl = 3, hist = [], running = true;
    function reset() { alive = []; for (var i = 0; i < N; i++) alive.push(true); t = 0; hist = [[0, N]]; running = true; }
    reset(); u.slider("Half-life", 1, 6, 1, 3, "s", function (v) { hl = v; }); u.button("Restart", reset);
    loop(function (dt) {
      if (running) { t += dt; var p = 1 - Math.pow(.5, dt / hl); alive = alive.map(function (a) { return a && Math.random() > p; }); var n = alive.filter(Boolean).length; hist.push([t, n]); if (t > 4 * hl + 2) running = false; }
      g.fillStyle = PAL.bg; g.fillRect(0, 0, W, H);
      alive.forEach(function (a, i) { g.fillStyle = a ? PAL.green : PAL.grey; g.beginPath(); g.arc(24 + (i % 10) * 26, 24 + Math.floor(i / 10) * 26, 9, 0, 6.3); g.fill(); });
      var gx = 330, gw = 290, gh = 230, gy = 30, tmax = 4 * hl + 2;
      g.strokeStyle = PAL.line; g.lineWidth = 2; g.beginPath(); g.moveTo(gx, gy); g.lineTo(gx, gy + gh); g.lineTo(gx + gw, gy + gh); g.stroke();
      g.strokeStyle = "rgba(255,255,255,.25)"; g.setLineDash([5, 5]); g.beginPath(); for (var k = 0; k <= 60; k++) { var tt = k / 60 * tmax, yy = gy + gh - N * Math.pow(.5, tt / hl) / N * gh; k ? g.lineTo(gx + tt / tmax * gw, yy) : g.moveTo(gx, yy); } g.stroke(); g.setLineDash([]);
      g.strokeStyle = PAL.amber; g.lineWidth = 3; g.beginPath(); hist.forEach(function (h, i) { var x = gx + h[0] / tmax * gw, y = gy + gh - h[1] / N * gh; i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.stroke();
      g.fillStyle = PAL.white; g.font = "700 12px system-ui"; g.fillText("Undecayed nuclei", gx + 4, gy - 8); g.fillText("Time (s)", gx + gw - 52, gy + gh + 22);
      u.read("Time: <b>" + t.toFixed(1) + " s</b> &nbsp; Undecayed: <b>" + alive.filter(Boolean).length + "</b> of 100 &nbsp; (about half are left after each half-life of " + hl + " s)");
    });
  };

  A.sims.wave = function (box) {
    var W = 640, H = 300, u = ui(box, W, H), g = u.g, amp = 50, lam = 160, f = 1;
    u.slider("Amplitude", 10, 80, 5, 50, "", function (v) { amp = v; }); u.slider("Wavelength", 60, 300, 10, 160, "", function (v) { lam = v; }); u.slider("Frequency", .2, 2, .1, 1, "Hz", function (v) { f = v; });
    loop(function (dt, t) {
      g.fillStyle = PAL.bg; g.fillRect(0, 0, W, H); var cy = H / 2, k = 2 * Math.PI / lam, w = 2 * Math.PI * f;
      g.strokeStyle = "rgba(255,255,255,.18)"; g.lineWidth = 1; g.beginPath(); g.moveTo(0, cy); g.lineTo(W, cy); g.stroke();
      g.strokeStyle = PAL.blue; g.lineWidth = 4; g.beginPath(); for (var x = 0; x <= W; x += 4) { var y = cy - amp * Math.sin(k * x - w * t); x ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
      for (var x2 = 20; x2 < W; x2 += 80) { var y2 = cy - amp * Math.sin(k * x2 - w * t); g.fillStyle = PAL.red; g.beginPath(); g.arc(x2, y2, 7, 0, 6.3); g.fill(); }
      g.strokeStyle = PAL.amber; g.fillStyle = PAL.amber; g.lineWidth = 2.5; g.beginPath(); g.moveTo(40, cy - amp - 16); g.lineTo(40 + lam, cy - amp - 16); g.stroke(); g.font = "800 14px system-ui"; g.fillText("wavelength λ", 40 + lam / 2 - 42, cy - amp - 24);
      g.beginPath(); g.moveTo(W - 30, cy); g.lineTo(W - 30, cy - amp); g.stroke(); g.fillText("A", W - 24, cy - amp / 2);
      u.read("Wave speed v = f × λ = " + f.toFixed(1) + " × " + (lam / 20).toFixed(1) + " = <b>" + (f * lam / 20).toFixed(1) + " m/s</b> &nbsp; Period T = 1 ÷ f = " + (1 / f).toFixed(2) + " s");
    });
  };

  A.sims.circuit = function (box) {
    var W = 640, H = 300, u = ui(box, W, H), g = u.g, V = 6, R = 6, off = 0, x0 = 90, y0 = 60, x1 = 550, y1 = 240, per = 2 * (x1 - x0) + 2 * (y1 - y0);
    u.slider("Voltage", 1, 12, 1, 6, "V", function (v) { V = v; }); u.slider("Resistance", 1, 12, 1, 6, "Ω", function (v) { R = v; });
    function pt(s) { s = ((s % per) + per) % per; var a = x1 - x0, b = y1 - y0; if (s < a) return [x0 + s, y0]; s -= a; if (s < b) return [x1, y0 + s]; s -= b; if (s < a) return [x1 - s, y1]; s -= a; return [x0, y1 - s]; }
    loop(function (dt) {
      var I = V / R; off += I * 38 * dt; g.fillStyle = PAL.bg; g.fillRect(0, 0, W, H);
      g.strokeStyle = PAL.line; g.lineWidth = 5; g.strokeRect(x0, y0, x1 - x0, y1 - y0);
      g.fillStyle = PAL.bg; g.fillRect(x0 + 140, y0 - 8, 70, 16); g.strokeStyle = PAL.amber; g.lineWidth = 5; g.beginPath(); g.moveTo(x0 + 150, y0 - 18); g.lineTo(x0 + 150, y0 + 18); g.moveTo(x0 + 172, y0 - 9); g.lineTo(x0 + 172, y0 + 9); g.stroke(); g.fillStyle = PAL.amber; g.font = "800 15px system-ui"; g.fillText(V + " V", x0 + 188, y0 - 12);
      g.fillStyle = PAL.bg; g.fillRect(250, y1 - 10, 120, 20); g.strokeStyle = PAL.green; g.lineWidth = 4; g.beginPath(); g.moveTo(250, y1); for (var i = 0; i < 8; i++) g.lineTo(256 + i * 14, y1 + (i % 2 ? 11 : -11)); g.lineTo(370, y1); g.stroke(); g.fillStyle = PAL.green; g.fillText(R + " Ω", 290, y1 + 34);
      var glow = Math.min(1, I / 4); g.fillStyle = "rgba(255,225,90," + (.12 + glow * .8) + ")"; g.beginPath(); g.arc(x1, (y0 + y1) / 2, 34, 0, 6.3); g.fill(); g.strokeStyle = PAL.white; g.lineWidth = 3; g.beginPath(); g.arc(x1, (y0 + y1) / 2, 22, 0, 6.3); g.stroke();
      for (var n = 0; n < 26; n++) { var p = pt(off + n * per / 26); g.fillStyle = PAL.blue; g.beginPath(); g.arc(p[0], p[1], 5.5, 0, 6.3); g.fill(); }
      u.read("Current I = V ÷ R = " + V + " ÷ " + R + " = <b>" + (Math.round(I * 100) / 100) + " A</b> &nbsp; Power P = VI = <b>" + (Math.round(V * I * 10) / 10) + " W</b>");
    });
  };

  A.sim = function (host, name) { if (A.sims[name]) A.sims[name](host); };


  /* ---------- drawing helpers for scene authors ---------- */
  var FONT = "Nunito,system-ui,sans-serif";
  A.h = {
    c: function (id, cx, cy, r, fill, x) { return ["circle", id, Object.assign({ cx: cx, cy: cy, r: r, fill: fill }, x)]; },
    r: function (id, x, y, w, h, fill, x2) { return ["rect", id, Object.assign({ x: x, y: y, width: w, height: h, fill: fill, rx: 6 }, x2)]; },
    l: function (id, x1, y1, x2, y2, stroke, x) { return ["line", id, Object.assign({ x1: x1, y1: y1, x2: x2, y2: y2, stroke: stroke, "stroke-width": 4, "stroke-linecap": "round" }, x)]; },
    t: function (id, x, y, text, fill, x2) { return ["text", id, Object.assign({ x: x, y: y, t: text, fill: fill || "#fff", "text-anchor": "middle", "font-family": FONT, "font-weight": 900, "font-size": 22 }, x2)]; },
    p: function (id, d, stroke, fill, x) { return ["path", id, Object.assign({ d: d, stroke: stroke, fill: fill || "none", "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round" }, x)]; },
    g: function (id, pts, fill, stroke, x) { return ["polygon", id, Object.assign({ points: pts, fill: fill, stroke: stroke || "none", "stroke-width": 3, "stroke-linejoin": "round" }, x)]; },
    sec: function (cx, cy, r, a1, a2) { var q = function (a) { return [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)]; }, s = q(a1), e = q(a2), big = ((a2 - a1 + 360) % 360) > 180 ? 1 : 0; return "M" + cx + " " + cy + "L" + s[0].toFixed(1) + " " + s[1].toFixed(1) + "A" + r + " " + r + " 0 " + big + " 1 " + e[0].toFixed(1) + " " + e[1].toFixed(1) + "Z"; },
    arrow: function (x1, y1, x2, y2) { var a = Math.atan2(y2 - y1, x2 - x1), h = 14; return "M" + x1 + " " + y1 + "L" + x2 + " " + y2 + "M" + (x2 - h * Math.cos(a - .45)) + " " + (y2 - h * Math.sin(a - .45)) + "L" + x2 + " " + y2 + "L" + (x2 - h * Math.cos(a + .45)) + " " + (y2 - h * Math.sin(a + .45)); },
    COL: { w: "#eaf0ff", blue: "#4dabff", pink: "#ff6b81", green: "#4ade80", amber: "#ffb84d", purple: "#a78bfa", grey: "#7c8bd1", dim: "#3b4585" }
  };

  /* ---------- confetti ---------- */
  A.confetti = function (n, x, y) {
    if (reduced()) return;
    var cv = document.createElement("canvas"); cv.className = "confetti"; cv.width = innerWidth; cv.height = innerHeight; document.body.appendChild(cv);
    var g = cv.getContext("2d"), ps = [], cols = ["#ff6b81", "#ffd43b", "#4ade80", "#4dabff", "#a78bfa", "#ff9f43"], cx = x == null ? innerWidth / 2 : x, cy = y == null ? innerHeight * .35 : y;
    for (var i = 0; i < (n || 90); i++) ps.push({ x: cx, y: cy, vx: rnd(-7, 7), vy: rnd(-13, -3), r: rnd(4, 9), c: cols[i % cols.length], a: rnd(0, 6.3), va: rnd(-.3, .3) });
    var t0 = performance.now();
    (function f(t) {
      var e = t - t0; g.clearRect(0, 0, cv.width, cv.height);
      ps.forEach(function (p) { p.vy += .33; p.x += p.vx; p.y += p.vy; p.a += p.va; g.save(); g.translate(p.x, p.y); g.rotate(p.a); g.fillStyle = p.c; g.globalAlpha = Math.max(0, 1 - e / 2200); g.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); g.restore(); });
      if (e < 2200) requestAnimationFrame(f); else cv.remove();
    })(t0);
  };
})();
