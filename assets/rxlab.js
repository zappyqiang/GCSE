/* Reaction lab: a canvas-based virtual chemistry bench.
   GAME.reaction(def) registers a lab with realistic glassware, liquids, bubbles, precipitates, flames, sparks and smoke,
   step-by-step controls, a prediction question, the balanced equation with an automatic atom check,
   an explanation, real-life links and real photographs. */
(function () {
  "use strict";
  var G = window.GAME, W = 720, H = 420;
  var rgba = function (c, a) { return "rgba(" + Math.round(c[0]) + "," + Math.round(c[1]) + "," + Math.round(c[2]) + "," + a + ")"; };
  var lerp = function (a, b, k) { return a + (b - a) * k; };
  var rnd = function (a, b) { return a + Math.random() * (b - a); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };

  /* ---------- formulae and equations ---------- */
  function fmtFormula(f) { return esc(f).replace(/\^([0-9]*[+\-]+)/g, "<sup>$1</sup>").replace(/([A-Za-z)\]])(\d+)/g, "$1<sub>$2</sub>"); }
  function parseSpecies(s) {
    var m = /^(\d*)\s*(.+?)(?:\((s|l|g|aq)\))?$/.exec(s.trim());
    return { n: m[1] ? +m[1] : 1, f: m[2], st: m[3] || "" };
  }
  function atoms(f) {
    var i = 0, str = f.replace(/\^.*$/, "").replace(/·.*$/, "");
    function grp() {
      var out = {};
      while (i < str.length) {
        var ch = str[i];
        if (ch === "(") { i++; var inner = grp(), num = ""; while (/\d/.test(str[i] || "")) num += str[i++]; var k = num ? +num : 1; for (var e in inner) out[e] = (out[e] || 0) + inner[e] * k; }
        else if (ch === ")") { i++; return out; }
        else if (/[A-Z]/.test(ch)) { var el = ch; i++; while (/[a-z]/.test(str[i] || "")) el += str[i++]; var n2 = ""; while (/\d/.test(str[i] || "")) n2 += str[i++]; out[el] = (out[el] || 0) + (n2 ? +n2 : 1); }
        else i++;
      }
      return out;
    }
    return grp();
  }
  function side(list) {
    var tot = {}; list.forEach(function (s) { var p = parseSpecies(s), a = atoms(p.f); for (var e in a) tot[e] = (tot[e] || 0) + a[e] * p.n; }); return tot;
  }
  function spHtml(s) { var p = parseSpecies(s); return (p.n > 1 ? "<b>" + p.n + "</b> " : "") + fmtFormula(p.f) + (p.st ? "<span class='st'>(" + p.st + ")</span>" : ""); }
  function eqHtml(q) {
    var L = q.l.map(spHtml).join(" + "), R = q.r.map(spHtml).join(" + "), arrow = q.rev ? " ⇌ " : " → ";
    var a = side(q.l), b = side(q.r), keys = Object.keys(a);
    Object.keys(b).forEach(function (k) { if (keys.indexOf(k) < 0) keys.push(k); });
    var ok = keys.every(function (k) { return a[k] === b[k]; });
    var rows = keys.map(function (k) { return "<span class='atom " + (a[k] === b[k] ? "ok" : "bad") + "'>" + k + " " + (a[k] || 0) + (a[k] === b[k] ? " = " : " ≠ ") + (b[k] || 0) + "</span>"; }).join("");
    return "<div class='eqbox'>" + (q.word ? "<div class='eqw'>" + esc(q.word) + "</div>" : "") + "<div class='eqs'>" + L + arrow + R + "</div>" +
      (q.ionic ? "<div class='eqi'><i>Ionic equation:</i> " + q.ionic.split(" ").map(function (t) { return t === "→" || t === "+" ? t : fmtFormula(t); }).join(" ") + "</div>" : "") +
      (q.note ? "<div class='eqn'>" + esc(q.note) + "</div>" : "") +
      (ok ? "<div class='atoms'><b>Atom check</b> " + rows + " <span class='atom ok'>✓ balanced</span></div>" : "") + "</div>";
  }

  /* ---------- glassware ---------- */
  var VES = {
    tube: { cx: 360, top: 70, bot: 330, hw: 32 },
    beaker: { cx: 360, top: 120, bot: 330, hw: 92 },
    flask: { cx: 360, top: 85, bot: 330, hw: 105 }
  };
  function vpath(c, v, kind) {
    c.beginPath();
    if (kind === "tube") { c.moveTo(v.cx - v.hw, v.top); c.lineTo(v.cx - v.hw, v.bot - v.hw); c.arc(v.cx, v.bot - v.hw, v.hw, Math.PI, 0, true); c.lineTo(v.cx + v.hw, v.top); }
    else if (kind === "beaker") { c.moveTo(v.cx - v.hw, v.top); c.lineTo(v.cx - v.hw, v.bot - 12); c.quadraticCurveTo(v.cx - v.hw, v.bot, v.cx - v.hw + 12, v.bot); c.lineTo(v.cx + v.hw - 12, v.bot); c.quadraticCurveTo(v.cx + v.hw, v.bot, v.cx + v.hw, v.bot - 12); c.lineTo(v.cx + v.hw, v.top); }
    else { c.moveTo(v.cx - 26, v.top); c.lineTo(v.cx - 26, v.top + 80); c.lineTo(v.cx - v.hw, v.bot - 14); c.quadraticCurveTo(v.cx - v.hw - 3, v.bot, v.cx - v.hw + 14, v.bot); c.lineTo(v.cx + v.hw - 14, v.bot); c.quadraticCurveTo(v.cx + v.hw + 3, v.bot, v.cx + v.hw, v.bot - 14); c.lineTo(v.cx + 26, v.top + 80); c.lineTo(v.cx + 26, v.top); }
  }
  function halfW(kind, v, y) { if (kind !== "flask") return v.hw - 2; if (y < v.top + 80) return 24; return 24 + (v.hw - 24) * clamp((y - (v.top + 80)) / (v.bot - 14 - (v.top + 80)), 0, 1); }

  /* ---------- the lab ---------- */
  function build(D) {
    return function run(el, A) {
      var kind = D.vessel || "tube", v = VES[kind] || VES.tube, custom = kind === "none";
      var variant = D.variants ? D.variants[0] : null, steps = [], idx = 0, doneAll = false, awarded = false, predOk = null;
      var S, T, P, t0 = 0, alive = true, last = 0, ripples = [], pourT = 0, pourCol = null, flash = 0, hist = [];
      var seed = []; for (var q = 0; q < 24; q++) seed.push([Math.random(), Math.random(), Math.random()]);

      el.innerHTML = '<div class="rx">' +
        (D.predict ? '<div class="rx-pred" id="rxp"><b>Predict first:</b> ' + esc(D.predict.q) + '<div class="rx-opts">' + D.predict.o.map(function (o, i) { return '<button class="choice" data-i="' + i + '"><span>' + esc(o) + "</span></button>"; }).join("") + '</div><div class="rx-pr" id="rxpr"></div></div>' : "") +
        (D.variants ? '<div class="rx-var" id="rxv">' + D.variants.map(function (x, i) { return '<button class="chip ' + (i ? "" : "on") + '" data-i="' + i + '">' + esc(x.label) + "</button>"; }).join("") + "</div>" : "") +
        '<div class="rx-stage"><canvas id="rxc" width="' + W * 2 + '" height="' + H * 2 + '" aria-label="Virtual experiment: ' + esc(D.name) + '"></canvas></div>' +
        '<div class="rx-ctl" id="rxs"></div><div class="rx-obs" id="rxo">Press the first button to begin.</div><div class="rx-eqs" id="rxe" hidden></div>' +
        '<div class="rx-card" id="rxw" hidden></div></div>';
      var cv = el.querySelector("#rxc"), c = cv.getContext("2d"); c.scale(2, 2);

      function init() {
        var base = D.start || {};
        S = { liq: (base.liq || [200, 230, 255]).slice(), level: base.level != null ? base.level : .5, turb: 0, bub: 0, bubCol: [255, 255, 255], prec: 0, precCol: [255, 255, 255], sed: base.sed || 0, sedCol: base.sedCol || [255, 255, 255],
          solid: base.solid ? JSON.parse(JSON.stringify(base.solid)) : null, bun: base.flame ? 1 : 0, flame: { on: 0, col: [255, 255, 255], size: 1, inner: [255, 255, 255] }, mg: 1, ash: 0, glow: 0, glowCol: [255, 255, 255], smoke: 0, sparks: 0, sparkCol: [255, 240, 200], foam: 0, temp: base.temp != null ? base.temp : 20, gas: 0, gasCol: [255, 255, 255], x: 0, aux: {} };
        T = {}; P = []; ripples = []; pourT = 0; flash = 0; hist = [];
        if (D.init) D.init(S);
      }
      function addP(o) { if (P.length < 700) P.push(o); }

      function apply(fx, tau) {
        Object.keys(fx).forEach(function (k) {
          if (k === "solid") { var so = S.solid = S.solid || {}; Object.keys(fx.solid).forEach(function (j) { if (j === "k" || j === "amt") { if (so[j] == null) so[j] = 0; T["solid." + j] = fx.solid[j]; } else so[j] = fx.solid[j]; }); return; }
          if (k === "flame") { var f = fx.flame; Object.keys(f).forEach(function (j) { if (j === "on" || j === "size") T["flame." + j] = f[j]; else S.flame[j] = f[j].slice(); }); return; }
          if (k === "event") { if (fx.event === "pop") flash = 1; if (fx.event === "relight") flash = .8; return; }
          if (k === "aux") { Object.assign(S.aux, fx.aux); return; }
          if (k === "snap") { Object.keys(fx.snap).forEach(function (j) { S[j] = fx.snap[j]; }); return; }
          T[k] = fx[k];
        });
        T.__tau = tau || 1.1;
      }
      function ease(dt) {
        var k = 1 - Math.exp(-dt / (T.__tau || 1.1));
        Object.keys(T).forEach(function (key) {
          if (key === "__tau") return;
          var tv = T[key];
          if (key.indexOf("flame.") === 0) { var j = key.slice(6); S.flame[j] += (tv - S.flame[j]) * k; return; }
          if (key.indexOf("solid.") === 0) { var j2 = key.slice(6); if (S.solid) S.solid[j2] += (tv - S.solid[j2]) * k; return; }
          if (Array.isArray(tv)) { for (var i = 0; i < 3; i++) S[key][i] += (tv[i] - S[key][i]) * k; }
          else if (typeof tv === "number") S[key] += (tv - S[key]) * k;
        });
        if (S.solid && S.solid.drain && S.solid.amt > 0) S.solid.amt = Math.max(0, S.solid.amt - S.solid.drain * dt);
      }

      /* ----- step buttons ----- */
      function stepList() { return typeof D.steps === "function" ? D.steps(variant) : D.steps; }
      function renderSteps() {
        steps = stepList();
        el.querySelector("#rxs").innerHTML = steps.map(function (s, i) { return '<button class="btn ' + (i === idx ? "" : "alt") + ' small rx-b" data-i="' + i + '" ' + (i > idx ? "disabled" : "") + ">" + (i + 1) + ". " + esc(s.label) + "</button>"; }).join("") + '<button class="btn alt small" id="rxr">↺ Reset</button>';
      }
      function showEq() {
        var box = el.querySelector("#rxe"); box.hidden = !(D.eq || []).length;
        box.innerHTML = ((D.eq || []).length ? '<h3>The chemistry</h3>' : '<h3>The science</h3>') + (D.eq || []).map(eqHtml).join("") + (D.energy ? "<div class='rx-en'>" + esc(D.energy) + "</div>" : "");
        var w = el.querySelector("#rxw"); w.hidden = false;
        var units = (D.units || []).map(function (t) { var id = Object.keys(G.levels).filter(function (k) { return G.levels[k].t === t; })[0]; return id ? '<a class="chip" href="#/l/' + id + '">' + esc(t) + "</a>" : ""; }).join("");
        w.innerHTML = '<h3>What is happening?</h3><ul>' + D.why.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
          (D.real ? '<h3>In real life</h3><p>' + esc(D.real) + "</p>" : "") + (D.safety ? '<p class="rx-safe"><b>Safety:</b> ' + esc(D.safety) + "</p>" : "") +
          (D.photos && G.photoHtml ? '<h3>What it looks like in the real world</h3>' + G.photoHtml(D.photos) : "") + (units ? '<h3>Learn the theory</h3><div class="rx-units">' + units + "</div>" : "");
      }
      function doStep(i) {
        var s = steps[i]; if (!s || i !== idx) return;
        var fx = s.fx || {}; if (s.pour) { pourT = 1.3; pourCol = s.pour; }
        apply(fx, s.tau); el.querySelector("#rxo").innerHTML = "<b>What you see:</b> " + esc(s.obs);
        if (s.hist) hist = []; idx++;
        var finished = idx >= steps.length; renderSteps();
        if (finished) { doneAll = true; showEq(); if (!awarded) { awarded = true; A.award(20 + (predOk ? 10 : 0), "Experiment complete: " + D.name + "."); } }
      }
      function reset() { idx = 0; doneAll = false; init(); renderSteps(); el.querySelector("#rxo").textContent = "Press the first button to begin."; el.querySelector("#rxe").hidden = true; el.querySelector("#rxw").hidden = true; }

      el.addEventListener("click", function (e) {
        var b = e.target.closest("button, .chip"); if (!b || !el.contains(b)) return;
        if (b.classList.contains("rx-b")) doStep(+b.dataset.i);
        else if (b.id === "rxr") reset();
        else if (b.parentNode.id === "rxv") { variant = D.variants[+b.dataset.i]; el.querySelectorAll("#rxv .chip").forEach(function (x) { x.classList.toggle("on", x === b); }); reset(); }
        else if (b.parentNode.classList.contains("rx-opts")) {
          var i = +b.dataset.i, ok = i === D.predict.a; if (predOk === null) predOk = ok;
          el.querySelector("#rxpr").innerHTML = ok ? "✓ Good prediction! " + esc(D.predict.e) : "Not quite. " + esc(D.predict.e) + " Run the experiment to check.";
          el.querySelectorAll(".rx-opts .choice").forEach(function (x) { x.classList.toggle("wrong", +x.dataset.i !== D.predict.a && x === b); });
        }
      });

      /* ----- rendering ----- */
      function bench(c2) {
        var g = c2.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#162447"); g.addColorStop(.62, "#1f3a63"); g.addColorStop(.62, "#6b4a2f"); g.addColorStop(1, "#43301f");
        c2.fillStyle = g; c2.fillRect(0, 0, W, H);
        var tg = c2.createLinearGradient(0, 345, 0, H); tg.addColorStop(0, "rgba(255,230,190,.25)"); tg.addColorStop(1, "rgba(0,0,0,.35)"); c2.fillStyle = tg; c2.fillRect(0, 345, W, H - 345);
        c2.fillStyle = "rgba(255,255,255,.04)"; for (var i = 0; i < 6; i++) c2.fillRect(60 + i * 120, 0, 2, 345);
        var lg = c2.createRadialGradient(W / 2, 60, 20, W / 2, 200, 420); lg.addColorStop(0, "rgba(255,255,255,.14)"); lg.addColorStop(1, "rgba(255,255,255,0)"); c2.fillStyle = lg; c2.fillRect(0, 0, W, H);
      }
      function bunsen(c2, x, y) {
        var g = c2.createLinearGradient(x - 14, 0, x + 14, 0); g.addColorStop(0, "#5a6068"); g.addColorStop(.4, "#c8ced6"); g.addColorStop(1, "#4a4f57");
        c2.fillStyle = g; c2.fillRect(x - 12, y - 70, 24, 70);
        c2.fillStyle = "#333"; c2.fillRect(x - 16, y - 46, 32, 12); c2.fillStyle = "#111"; c2.fillRect(x - 3, y - 44, 6, 8);
        var b = c2.createLinearGradient(0, y, 0, y + 12); b.addColorStop(0, "#4b525c"); b.addColorStop(1, "#22262c"); c2.fillStyle = b; c2.beginPath(); c2.ellipse(x, y + 4, 44, 11, 0, 0, 7); c2.fill();
      }
      function drawVessel(c2, dt) {
        var lvl = clamp(S.level, 0, 1), yL = v.bot - lvl * (v.bot - v.top - (kind === "flask" ? 8 : 6));
        c2.save(); c2.fillStyle = "rgba(0,0,0,.28)"; c2.beginPath(); c2.ellipse(v.cx, v.bot + 8, v.hw + 14, 10, 0, 0, 7); c2.fill(); c2.restore();
        c2.save(); vpath(c2, v, kind); c2.closePath(); c2.fillStyle = "rgba(210,235,255,.07)"; c2.fill(); c2.clip();
        /* liquid */
        var lg = c2.createLinearGradient(0, yL, 0, v.bot); lg.addColorStop(0, rgba(S.liq.map(function (x) { return Math.min(255, x + 28); }), .78)); lg.addColorStop(1, rgba(S.liq.map(function (x) { return x * .78; }), .93));
        c2.fillStyle = lg; c2.fillRect(v.cx - v.hw - 4, yL, v.hw * 2 + 8, v.bot - yL + 4);
        if (D.under) D.under(c2, S, v);
        if (S.turb > .01) { c2.fillStyle = "rgba(245,240,215," + (S.turb * .88) + ")"; c2.fillRect(v.cx - v.hw - 4, yL, v.hw * 2 + 8, v.bot - yL + 4); }
        if (S.aux.tint) { c2.fillStyle = S.aux.tint; c2.fillRect(v.cx - v.hw - 4, yL, v.hw * 2 + 8, v.bot - yL + 4); }
        /* sediment */
        if (S.sed > .01) { var sh = S.sed * 46; var sg = c2.createLinearGradient(0, v.bot - sh, 0, v.bot); sg.addColorStop(0, rgba(S.sedCol.map(function (x) { return Math.min(255, x + 25); }), .95)); sg.addColorStop(1, rgba(S.sedCol.map(function (x) { return x * .8; }), 1)); c2.fillStyle = sg; c2.beginPath(); c2.moveTo(v.cx - v.hw - 4, v.bot + 2); c2.lineTo(v.cx - v.hw - 4, v.bot - sh * .7); c2.quadraticCurveTo(v.cx, v.bot - sh * 1.15, v.cx + v.hw + 4, v.bot - sh * .7); c2.lineTo(v.cx + v.hw + 4, v.bot + 2); c2.fill(); }
        drawSolid(c2, yL);
        /* internal particles */
        P.forEach(function (p) {
          if (p.k === "bub") { var rr = p.r; var gg = c2.createRadialGradient(p.x - rr * .3, p.y - rr * .3, rr * .1, p.x, p.y, rr); gg.addColorStop(0, "rgba(255,255,255,.9)"); gg.addColorStop(.6, rgba(p.col, .25)); gg.addColorStop(1, "rgba(255,255,255,.55)"); c2.fillStyle = gg; c2.beginPath(); c2.arc(p.x, p.y, rr, 0, 7); c2.fill(); }
          else if (p.k === "pre") { c2.fillStyle = rgba(p.col, .95); c2.beginPath(); c2.arc(p.x, p.y, p.r, 0, 7); c2.fill(); }
        });
        c2.restore();
        /* meniscus */
        if (lvl > .02) { var hwl = halfW(kind, v, yL); c2.save(); c2.strokeStyle = "rgba(255,255,255,.55)"; c2.lineWidth = 2; c2.beginPath(); c2.ellipse(v.cx, yL, hwl, 4, 0, 0, 7); c2.stroke(); c2.fillStyle = rgba(S.liq, .25); c2.fill(); c2.restore(); }
        /* glass */
        c2.save(); vpath(c2, v, kind); c2.strokeStyle = "rgba(230,248,255,.85)"; c2.lineWidth = 3; c2.stroke(); c2.strokeStyle = "rgba(120,170,200,.35)"; c2.lineWidth = 6; c2.stroke();
        c2.clip(); var hg = c2.createLinearGradient(v.cx - v.hw, 0, v.cx + v.hw, 0); hg.addColorStop(0, "rgba(255,255,255,.35)"); hg.addColorStop(.12, "rgba(255,255,255,0)"); hg.addColorStop(.8, "rgba(255,255,255,0)"); hg.addColorStop(.93, "rgba(255,255,255,.22)"); hg.addColorStop(1, "rgba(255,255,255,.05)");
        c2.fillStyle = hg; c2.fillRect(v.cx - v.hw - 6, v.top, v.hw * 2 + 12, v.bot - v.top + 8);
        c2.fillStyle = "rgba(255,255,255,.5)"; c2.fillRect(v.cx - v.hw + 8, yL - 4 < v.top ? v.top + 10 : v.top + 14, 3, (v.bot - v.top) * .5); c2.restore();
        /* rim */
        c2.strokeStyle = "rgba(235,250,255,.95)"; c2.lineWidth = 3; c2.beginPath(); c2.ellipse(v.cx, v.top, kind === "flask" ? 26 : v.hw, 4, 0, 0, 7); c2.stroke();
        if (kind === "beaker") { c2.strokeStyle = "rgba(255,255,255,.6)"; c2.lineWidth = 1.5; for (var m = 1; m <= 4; m++) { var my = v.bot - m * 46; c2.beginPath(); c2.moveTo(v.cx + v.hw - 22, my); c2.lineTo(v.cx + v.hw - 4, my); c2.stroke(); } }
      }
      function drawSolid(c2, yL) {
        var s = S.solid; if (!s || s.amt <= 0.01) return;
        var col = s.col || [220, 225, 230], n, i, sd, x, y; if (s.col2) col = [lerp(col[0], s.col2[0], s.k || 0), lerp(col[1], s.col2[1], s.k || 0), lerp(col[2], s.col2[2], s.k || 0)];
        if (s.kind === "chips") { n = Math.ceil(10 * s.amt); for (i = 0; i < n; i++) { sd = seed[i]; x = v.cx - v.hw * .7 + sd[0] * v.hw * 1.4; y = v.bot - 12 - sd[1] * 26 - (i % 3) * 7; c2.fillStyle = rgba(col, 1); c2.strokeStyle = "rgba(120,125,135,.8)"; c2.lineWidth = 1.2; c2.beginPath(); c2.moveTo(x - 12, y + 4); c2.lineTo(x - 5, y - 9); c2.lineTo(x + 8, y - 8); c2.lineTo(x + 13, y + 3); c2.lineTo(x + 2, y + 9); c2.closePath(); c2.fill(); c2.stroke(); } }
        else if (s.kind === "granules") { n = Math.ceil(16 * s.amt); for (i = 0; i < n; i++) { sd = seed[i]; x = v.cx - v.hw * .75 + sd[0] * v.hw * 1.5; y = v.bot - 8 - sd[1] * 20 - (i % 4) * 5; c2.fillStyle = rgba(col, 1); c2.beginPath(); c2.arc(x, y, 5 + sd[2] * 3, 0, 7); c2.fill(); c2.fillStyle = "rgba(255,255,255,.35)"; c2.beginPath(); c2.arc(x - 1.5, y - 2, 1.8, 0, 7); c2.fill(); } }
        else if (s.kind === "powder") { var h = 6 + 30 * s.amt; var pg = c2.createLinearGradient(0, v.bot - h, 0, v.bot); pg.addColorStop(0, rgba(col.map(function (x2) { return Math.min(255, x2 + 30); }), 1)); pg.addColorStop(1, rgba(col, 1)); c2.fillStyle = pg; c2.beginPath(); c2.moveTo(v.cx - v.hw, v.bot); c2.quadraticCurveTo(v.cx, v.bot - h * 1.5, v.cx + v.hw, v.bot); c2.fill(); }
        else if (s.kind === "ribbon" || s.kind === "strip") { var len = 150 * s.amt + 8; c2.save(); c2.translate(v.cx, v.bot - 10); c2.rotate(-.08); var rg = c2.createLinearGradient(0, -len, 0, 0); rg.addColorStop(0, "#f5f7fa"); rg.addColorStop(.5, rgba(col, 1)); rg.addColorStop(1, "#8a9099"); c2.fillStyle = rg; c2.fillRect(-4, -len, 8, len); c2.restore(); }
        else if (s.kind === "nail") { c2.save(); c2.translate(v.cx - 6, v.bot - 18); c2.rotate(-.5); c2.fillStyle = rgba(s.coat || col, 1); c2.fillRect(-3, -62, 6, 62); c2.beginPath(); c2.arc(0, -64, 7, 0, 7); c2.fill(); c2.fillStyle = "rgba(255,255,255,.35)"; c2.fillRect(-2, -62, 1.5, 60); c2.restore(); }
        else if (s.kind === "pellet") { var py = yL - 6 + Math.sin(S.t * 9) * 1.2, px = v.cx + (S.aux.px || 0); var pg2 = c2.createRadialGradient(px - 3, py - 3, 1, px, py, 10 * s.amt + 3); pg2.addColorStop(0, "#fff"); pg2.addColorStop(1, rgba(col, 1)); c2.fillStyle = pg2; c2.beginPath(); c2.arc(px, py, 10 * s.amt + 3, 0, 7); c2.fill(); }
      }

      function frame(ts) {
        if (!el.querySelector("#rxc")) { alive = false; return; }
        var dt = Math.min(.05, (ts - last) / 1000 || .016); last = ts; S.t = (S.t || 0) + dt;
        ease(dt); step(dt);
        c.clearRect(0, 0, W, H); bench(c);
        if (D.pre) D.pre(c, S, W, H);
        if (S.bun > .02) bunsen(c, D.bx || v.cx, 372);
        if (!custom) drawVessel(c, dt);
        if (D.draw) D.draw(c, S, W, H, P, addP);
        drawFx(c, dt);
        if (D.thermo !== false && !custom) drawThermo(c);
        if (D.post) D.post(c, S, W, H);
        if (alive) requestAnimationFrame(frame);
      }
      function surfaceY() { return v.bot - clamp(S.level, 0, 1) * (v.bot - v.top - 6); }
      function step(dt) {
        var yL = surfaceY(), n, i;
        if (!custom) {
          if (S.bub > 0) { n = S.bub * dt; while (n > 0 && P.length < 700) { if (Math.random() < n) { var from = S.solid && S.solid.amt > .02 && S.solid.kind !== "pellet" ? { x: v.cx + rnd(-v.hw * .6, v.hw * .6), y: v.bot - 14 } : { x: v.cx + rnd(-v.hw * .7, v.hw * .7), y: v.bot - 8 }; if (S.solid && S.solid.kind === "ribbon") from.x = v.cx + rnd(-5, 5); addP({ k: "bub", x: from.x, y: from.y, vx: rnd(-6, 6), vy: -rnd(28, 70), r: rnd(1.8, 5.6), col: S.bubCol, ph: rnd(0, 6) }); } n -= 1; } }
          if (S.prec > 0) { n = S.prec * dt; while (n > 0) { if (Math.random() < n) addP({ k: "pre", x: v.cx + rnd(-v.hw * .8, v.hw * .8), y: yL + rnd(4, 20), vx: rnd(-4, 4), vy: rnd(8, 26), r: rnd(1.4, 3), col: S.precCol }); n -= 1; } }
        }
        if (S.sparks > 0) { n = S.sparks * dt; while (n > 0) { if (Math.random() < n) { var a = rnd(0, 6.28), sp = rnd(60, 220); addP({ k: "spark", x: S.aux.sx != null ? S.aux.sx : v.cx, y: S.aux.sy != null ? S.aux.sy : v.top - 20, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 90, life: rnd(.4, 1), max: 1, col: S.sparkCol }); } n -= 1; } }
        if (S.smoke > 0) { n = S.smoke * dt; while (n > 0) { if (Math.random() < n) addP({ k: "smoke", x: (S.aux.sx != null ? S.aux.sx : v.cx) + rnd(-10, 10), y: (S.aux.sy != null ? S.aux.sy : v.top) - 10, vx: rnd(-8, 8), vy: -rnd(25, 55), r: rnd(6, 12), life: 2.4, max: 2.4 }); n -= 1; } }
        if (S.gas > 0) { n = S.gas * dt; while (n > 0) { if (Math.random() < n) addP({ k: "gas", x: v.cx + rnd(-v.hw * .5, v.hw * .5), y: v.top - 4, vx: rnd(-10, 10), vy: -rnd(14, 34), r: rnd(8, 16), life: 2, max: 2, col: S.gasCol }); n -= 1; } }
        if (S.bun > .05) { n = 60 * S.bun * dt; while (n > 0) { if (Math.random() < n) addP({ k: "fl", x: v.cx + rnd(-6, 6), y: 346, vx: rnd(-5, 5), vy: -rnd(60, 100), r: rnd(6, 10), life: rnd(.3, .5), max: .5, c1: [70, 120, 255], c2: [190, 215, 255] }); n -= 1; } }
        if (S.flame.on > .05) { n = 80 * S.flame.on * dt * S.flame.size; var fx0 = S.aux.fx != null ? S.aux.fx : v.cx, fy0 = S.aux.fy != null ? S.aux.fy : 345; while (n > 0) { if (Math.random() < n) addP({ k: "fl", x: fx0 + rnd(-7, 7) * S.flame.size, y: fy0, vx: rnd(-6, 6), vy: -rnd(70, 130) * S.flame.size, r: rnd(7, 13) * S.flame.size, life: rnd(.35, .6), max: .6, c1: S.flame.col.slice(), c2: S.flame.inner.slice() }); n -= 1; } }
        if (pourT > 0) { pourT -= dt; if (Math.random() < dt * 22) addP({ k: "drop", x: v.cx + rnd(-3, 3), y: v.top - 54, vy: 220, col: pourCol, r: rnd(2.2, 3.4) }); }
        if (S.foam > .01 && !custom) { /* foam is drawn procedurally */ }
        for (i = P.length - 1; i >= 0; i--) {
          var p = P[i];
          if (p.k === "bub") { p.ph += dt * 5; p.x += (p.vx + Math.sin(p.ph) * 14) * dt; p.y += p.vy * dt; var hw2 = halfW(kind, v, p.y) - p.r; p.x = clamp(p.x, v.cx - hw2, v.cx + hw2); if (p.y < yL + 2) { if (S.bub > 12 && Math.random() < .4) addP({ k: "gas", x: p.x, y: yL - 2, vx: rnd(-6, 6), vy: -rnd(20, 40), r: rnd(3, 6), life: .7, max: .7, col: [255, 255, 255] }); P.splice(i, 1); } }
          else if (p.k === "pre") { p.x += p.vx * dt; p.y += p.vy * dt; if (p.y > v.bot - 6) P.splice(i, 1); }
          else if (p.k === "spark") { p.life -= dt * 1.4; p.vy += 260 * dt; p.x += p.vx * dt; p.y += p.vy * dt; if (p.life <= 0 || p.y > 345) P.splice(i, 1); }
          else if (p.k === "smoke" || p.k === "gas") { p.life -= dt; p.x += p.vx * dt; p.y += p.vy * dt; p.r += dt * 6; if (p.life <= 0) P.splice(i, 1); }
          else if (p.k === "fl") { p.life -= dt; p.x += p.vx * dt + Math.sin(S.t * 18 + p.y) * .5; p.y += p.vy * dt; p.r *= .985; if (p.life <= 0) P.splice(i, 1); }
          else if (p.k === "drop") { p.y += p.vy * dt; if (p.y >= yL) { ripples.push({ x: p.x, y: yL, r: 2, a: 1 }); P.splice(i, 1); } }
          else if (p.k === "drop2") { p.y += p.vy * dt; p.x += (p.vx || 0) * dt; p.life -= dt; if (p.life <= 0) P.splice(i, 1); }
        }
        if (S.solid && S.solid.kind === "pellet" && S.aux.skate) { S.aux.px = Math.sin(S.t * (S.aux.skate)) * (v.hw - 18); }
        if (flash > 0) flash = Math.max(0, flash - dt * 2.4);
      }
      function drawFx(c2, dt) {
        var i, p, g;
        /* foam */
        if (S.foam > .01 && !custom) {
          var fh = S.foam * 150, cols = S.aux.foamCol || [255, 255, 255], count = Math.floor(fh / 7) + 4;
          for (i = 0; i < count * 3; i++) { var sd = seed[i % 24], yy = v.top + 10 - (i / (count * 3)) * fh - sd[1] * 8, hwf = (kind === "flask" ? 26 : v.hw) - 6, xx = v.cx + (sd[0] - .5) * hwf * 2 * (1 - Math.min(.5, (v.top - yy) / 600)) + Math.sin(i * 1.7 + S.t * 2) * 3; var rr = 9 + sd[2] * 8; g = c2.createRadialGradient(xx - 3, yy - 3, 1, xx, yy, rr); g.addColorStop(0, "rgba(255,255,255,.98)"); g.addColorStop(1, rgba(cols.map(function (x) { return x * .82; }), .96)); c2.fillStyle = g; c2.beginPath(); c2.arc(xx, yy, rr, 0, 7); c2.fill(); }
        }
        /* glow */
        if (S.glow > .01) { var gx = S.aux.gx != null ? S.aux.gx : v.cx, gy = S.aux.gy != null ? S.aux.gy : 300; c2.save(); c2.globalCompositeOperation = "lighter"; g = c2.createRadialGradient(gx, gy, 5, gx, gy, 90 + S.glow * 200); g.addColorStop(0, rgba(S.glowCol, S.glow * .9)); g.addColorStop(1, rgba(S.glowCol, 0)); c2.fillStyle = g; c2.fillRect(0, 0, W, H); c2.restore(); }
        for (i = 0; i < P.length; i++) {
          p = P[i];
          if (p.k === "fl") { var k = p.life / p.max, col = k > .55 ? p.c2 : p.c1; c2.save(); c2.globalCompositeOperation = "lighter"; g = c2.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 1.7); g.addColorStop(0, rgba(col, .55 * k + .15)); g.addColorStop(1, rgba(col, 0)); c2.fillStyle = g; c2.beginPath(); c2.arc(p.x, p.y, p.r * 1.7, 0, 7); c2.fill(); c2.restore(); }
          else if (p.k === "spark") { c2.save(); c2.globalCompositeOperation = "lighter"; c2.strokeStyle = rgba(p.col, clamp(p.life, 0, 1)); c2.lineWidth = 2; c2.beginPath(); c2.moveTo(p.x, p.y); c2.lineTo(p.x - p.vx * .035, p.y - p.vy * .035); c2.stroke(); g = c2.createRadialGradient(p.x, p.y, 0, p.x, p.y, 6); g.addColorStop(0, rgba(p.col, clamp(p.life, 0, 1))); g.addColorStop(1, rgba(p.col, 0)); c2.fillStyle = g; c2.beginPath(); c2.arc(p.x, p.y, 6, 0, 7); c2.fill(); c2.restore(); }
          else if (p.k === "smoke") { c2.fillStyle = "rgba(210,215,225," + (.22 * p.life / p.max) + ")"; c2.beginPath(); c2.arc(p.x, p.y, p.r, 0, 7); c2.fill(); }
          else if (p.k === "gas") { c2.fillStyle = rgba(p.col, .16 * p.life / p.max); c2.beginPath(); c2.arc(p.x, p.y, p.r, 0, 7); c2.fill(); }
          else if (p.k === "drop") { c2.fillStyle = rgba(p.col, .95); c2.beginPath(); c2.ellipse(p.x, p.y, p.r * .7, p.r * 1.3, 0, 0, 7); c2.fill(); }
          else if (p.k === "drop2") { c2.fillStyle = rgba(p.col || [255, 255, 255], .9); c2.beginPath(); c2.arc(p.x, p.y, p.r, 0, 7); c2.fill(); }
        }
        if (pourT > 0 && !custom) { c2.save(); c2.translate(v.cx, v.top - 70); var dg = c2.createLinearGradient(-8, 0, 8, 0); dg.addColorStop(0, "#c9d3dd"); dg.addColorStop(.5, "#f2f6fa"); dg.addColorStop(1, "#aab6c2"); c2.fillStyle = dg; c2.fillRect(-7, -50, 14, 46); c2.beginPath(); c2.moveTo(-7, -4); c2.lineTo(7, -4); c2.lineTo(2, 12); c2.lineTo(-2, 12); c2.closePath(); c2.fill(); c2.fillStyle = "#c0392b"; c2.beginPath(); c2.arc(0, -56, 11, Math.PI, 0); c2.fill(); c2.restore(); }
        ripples.forEach(function (r, ix) { r.r += dt * 60; r.a -= dt * 1.8; if (r.a <= 0) { ripples.splice(ix, 1); return; } c2.strokeStyle = "rgba(255,255,255," + r.a * .7 + ")"; c2.lineWidth = 1.5; c2.beginPath(); c2.ellipse(r.x, r.y, r.r, r.r * .25, 0, 0, 7); c2.stroke(); });
        if (flash > 0) { c2.save(); c2.globalCompositeOperation = "lighter"; g = c2.createRadialGradient(v.cx, v.top - 30, 4, v.cx, v.top - 30, 140); g.addColorStop(0, "rgba(255,230,160," + flash + ")"); g.addColorStop(1, "rgba(255,200,80,0)"); c2.fillStyle = g; c2.fillRect(0, 0, W, H); c2.restore(); }
      }
      function drawThermo(c2) {
        var x = v.cx + v.hw + 38, top = 110, bot = 320, h = bot - top, f = clamp((S.temp - 0) / 100, .02, 1);
        c2.save(); c2.fillStyle = "rgba(255,255,255,.92)"; c2.strokeStyle = "rgba(255,255,255,.9)"; c2.lineWidth = 2;
        c2.beginPath(); c2.moveTo(x - 6, top); c2.lineTo(x - 6, bot); c2.arc(x, bot + 4, 12, Math.PI * 1.2, Math.PI * 1.8, true); c2.lineTo(x + 6, bot); c2.lineTo(x + 6, top); c2.arc(x, top, 6, 0, Math.PI, true); c2.closePath(); c2.fillStyle = "rgba(255,255,255,.18)"; c2.fill(); c2.stroke();
        c2.fillStyle = "#e23b3b"; c2.fillRect(x - 2.5, bot - h * f, 5, h * f); c2.beginPath(); c2.arc(x, bot + 4, 9, 0, 7); c2.fill();
        c2.fillStyle = "rgba(255,255,255,.8)"; c2.font = "700 15px Nunito, system-ui, sans-serif"; c2.textAlign = "center"; c2.fillText(Math.round(S.temp) + " °C", x, top - 14); c2.restore();
      }

      init(); renderSteps(); requestAnimationFrame(frame);
    };
  }

  G.reaction = function (D) {
    G.lab({ id: D.id, name: D.name, icon: D.icon || "🧪", desc: D.desc, tag: D.tag, run: build(D) });
  };
  G.fmtChem = function (t) { return esc(t).replace(/([A-Za-z)])(\d+)/g, function (m, a, b) { return /^(?:[A-Z][a-z]?|\))$/.test(a) ? a + '<sub>' + b + '</sub>' : m; }); };
  G.rx = { rgba: rgba, rnd: rnd, clamp: clamp, eqHtml: eqHtml };
})();
