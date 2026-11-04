/* Professional interactive lab framework for every subject.
   GAME.sim(def) registers a lab; GAME.simRun(def, el, api) embeds one inside a "How to?" case.
   Kinds: "sim" (animated canvas simulation with sliders, live readouts, graphs and a data table),
   "sort" (classify items), "mark" (highlight in a text), "order" (sequence steps), "trace" (step through code),
   "story" (decision scenario with live meters) and "custom" (run(el, api, X, win)).
   Every lab can add a prediction question, a goal, a check question, an explanation, an exam tip and links to lessons. */
(function () {
  "use strict";
  var G = window.GAME;
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var lerp = function (a, b, k) { return a + (b - a) * k; };
  var rnd = function (a, b) { return a + Math.random() * (b - a); };
  var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
  var rgba = function (c, a) { return "rgba(" + Math.round(c[0]) + "," + Math.round(c[1]) + "," + Math.round(c[2]) + "," + a + ")"; };
  var nice = function (v) { if (typeof v === "string") return v; if (!isFinite(v)) return "–"; var a = Math.abs(v); return a >= 1000 ? String(Math.round(v)) : String(+v.toPrecision(3)); };
  var shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- drawing helpers ---------- */
  var X = {
    clamp: clamp, lerp: lerp, rnd: rnd, rgba: rgba, fmt: nice, shuffle: shuffle, esc: esc,
    txt: function (c, s, x, y, o) { o = o || {}; c.save(); c.font = (o.w || 800) + " " + (o.s || 14) + "px Nunito, system-ui, sans-serif"; c.fillStyle = o.c || "rgba(255,255,255,.92)"; c.textAlign = o.a || "center"; c.textBaseline = o.b || "alphabetic"; if (o.rot) { c.translate(x, y); c.rotate(o.rot); c.fillText(s, 0, 0); } else c.fillText(s, x, y); c.restore(); },
    rr: function (c, x, y, w, h, r) { r = Math.min(r, w / 2, h / 2); c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); },
    bg: function (c, W, H, kind) {
      var m = { lab: ["#14213f", "#0b1226"], sky: ["#7fc8ff", "#d9f1ff"], night: ["#050a1f", "#1a2150"], paper: ["#f7f1e1", "#eadfc4"], grass: ["#bfe6ff", "#e8f7d6"], dark: ["#10172e", "#0a0f22"], space: ["#02030c", "#0c1030"], water: ["#1d6fa8", "#0b3a66"], warm: ["#2a1c3a", "#140c22"] }[kind || "lab"];
      var g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, m[0]); g.addColorStop(1, m[1]); c.fillStyle = g; c.fillRect(0, 0, W, H);
    },
    grid: function (c, W, H, st, col) { c.save(); c.strokeStyle = col || "rgba(255,255,255,.06)"; c.lineWidth = 1; c.beginPath(); for (var x = 0; x <= W; x += st) { c.moveTo(x, 0); c.lineTo(x, H); } for (var y = 0; y <= H; y += st) { c.moveTo(0, y); c.lineTo(W, y); } c.stroke(); c.restore(); },
    arrow: function (c, x1, y1, x2, y2, col, w, label) {
      var a = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1); if (L < 2) return; w = w || 3; c.save(); c.strokeStyle = c.fillStyle = col || "#ffd23f"; c.lineWidth = w; c.lineCap = "round";
      var hs = Math.min(L * .6, 8 + w * 2); c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2 - Math.cos(a) * hs * .7, y2 - Math.sin(a) * hs * .7); c.stroke();
      c.beginPath(); c.moveTo(x2, y2); c.lineTo(x2 - Math.cos(a - .42) * hs, y2 - Math.sin(a - .42) * hs); c.lineTo(x2 - Math.cos(a + .42) * hs, y2 - Math.sin(a + .42) * hs); c.closePath(); c.fill(); c.restore();
      if (label) X.txt(c, label, (x1 + x2) / 2 - Math.sin(a) * 14, (y1 + y2) / 2 + Math.cos(a) * 14 + 4, { c: col, s: 13 });
    },
    glow: function (c, x, y, r, col, a) { c.save(); c.globalCompositeOperation = "lighter"; var g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, rgba(col, a == null ? .8 : a)); g.addColorStop(1, rgba(col, 0)); c.fillStyle = g; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); c.restore(); },
    ball: function (c, x, y, r, col) { var g = c.createRadialGradient(x - r * .35, y - r * .35, r * .1, x, y, r); g.addColorStop(0, "#fff"); g.addColorStop(.25, col); g.addColorStop(1, "rgba(0,0,0,.55)"); c.fillStyle = col; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); c.fillStyle = g; c.globalAlpha = .85; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); c.globalAlpha = 1; },
    spring: function (c, x1, y, x2, coils, amp, col) { c.save(); c.strokeStyle = col || "#cfd8e6"; c.lineWidth = 3; c.lineJoin = "round"; c.beginPath(); c.moveTo(x1, y); var n = coils * 2, a = (x2 - x1) / (n + 2); c.lineTo(x1 + a, y); for (var i = 0; i < n; i++) c.lineTo(x1 + a * (i + 1.5), y + (i % 2 ? amp : -amp)); c.lineTo(x2 - a, y); c.lineTo(x2, y); c.stroke(); c.restore(); },
    bar: function (c, x, y, w, h, f, col, bg) { c.save(); X.rr(c, x, y, w, h, h / 2); c.fillStyle = bg || "rgba(255,255,255,.14)"; c.fill(); if (f > 0) { X.rr(c, x, y, Math.max(h, w * clamp(f, 0, 1)), h, h / 2); c.fillStyle = col || "#5df2a8"; c.fill(); } c.restore(); },
    gauge: function (c, x, y, r, v, lo, hi, lab, col) { var f = clamp((v - lo) / (hi - lo), 0, 1), a0 = Math.PI * .8, a1 = Math.PI * 2.2; c.save(); c.lineWidth = 10; c.lineCap = "round"; c.strokeStyle = "rgba(255,255,255,.16)"; c.beginPath(); c.arc(x, y, r, a0, a1); c.stroke(); c.strokeStyle = col || "#5df2a8"; c.beginPath(); c.arc(x, y, r, a0, a0 + (a1 - a0) * f); c.stroke(); c.restore(); X.txt(c, nice(v), x, y + 6, { s: 20, w: 900 }); if (lab) X.txt(c, lab, x, y + r + 20, { s: 12, c: "rgba(255,255,255,.7)" }); },
    cloud: function (c, x, y, s, a) { c.save(); c.fillStyle = "rgba(255,255,255," + (a == null ? .9 : a) + ")"; [[0, 0, 22], [24, -8, 26], [52, 0, 22], [26, 8, 24]].forEach(function (q) { c.beginPath(); c.arc(x + q[0] * s, y + q[1] * s, q[2] * s, 0, 7); c.fill(); }); c.restore(); },
    sun: function (c, x, y, r, t) { X.glow(c, x, y, r * 3, [255, 220, 120], .55); c.fillStyle = "#ffd23f"; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); c.save(); c.strokeStyle = "rgba(255,220,100,.7)"; c.lineWidth = 3; for (var i = 0; i < 12; i++) { var a = i * Math.PI / 6 + (t || 0) * .3; c.beginPath(); c.moveTo(x + Math.cos(a) * r * 1.3, y + Math.sin(a) * r * 1.3); c.lineTo(x + Math.cos(a) * r * 1.7, y + Math.sin(a) * r * 1.7); c.stroke(); } c.restore(); },
    tree: function (c, x, y, s, col) { c.fillStyle = "#6b4a2a"; c.fillRect(x - 3 * s, y - 20 * s, 6 * s, 20 * s); c.fillStyle = col || "#2f9e4f"; c.beginPath(); c.arc(x, y - 30 * s, 16 * s, 0, 7); c.arc(x - 10 * s, y - 22 * s, 11 * s, 0, 7); c.arc(x + 10 * s, y - 22 * s, 11 * s, 0, 7); c.fill(); },
    person: function (c, x, y, s, col, act) { c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = col || "#fff"; c.fillStyle = col || "#fff"; c.lineWidth = 4; c.lineCap = "round"; c.beginPath(); c.arc(0, -34, 8, 0, 7); c.fill(); c.beginPath(); c.moveTo(0, -26); c.lineTo(0, -6); c.moveTo(0, -22); c.lineTo(-10, -10 + (act || 0) * -8); c.moveTo(0, -22); c.lineTo(10, -10 + (act || 0) * -8); c.moveTo(0, -6); c.lineTo(-7, 8); c.moveTo(0, -6); c.lineTo(7, 8); c.stroke(); c.restore(); },
    /* convert data space to canvas space */
    axes: function (c, x, y, w, h, x0, x1, y0, y1, xl, yl, col) {
      c.save(); c.strokeStyle = col || "rgba(255,255,255,.7)"; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + h); c.lineTo(x + w, y + h); c.stroke();
      c.font = "700 11px Nunito, system-ui, sans-serif"; c.fillStyle = "rgba(255,255,255,.75)"; c.textAlign = "center";
      for (var i = 0; i <= 4; i++) { c.fillText(nice(x0 + (x1 - x0) * i / 4), x + w * i / 4, y + h + 15); c.textAlign = "right"; c.fillText(nice(y0 + (y1 - y0) * i / 4), x - 5, y + h - h * i / 4 + 4); c.textAlign = "center"; c.strokeStyle = "rgba(255,255,255,.08)"; c.beginPath(); c.moveTo(x, y + h - h * i / 4); c.lineTo(x + w, y + h - h * i / 4); c.stroke(); }
      if (xl) X.txt(c, xl, x + w / 2, y + h + 32, { s: 12, c: "rgba(255,255,255,.8)" }); if (yl) X.txt(c, yl, x - 40, y + h / 2, { s: 12, c: "rgba(255,255,255,.8)", rot: -Math.PI / 2 }); c.restore();
      return { X: function (v) { return x + (v - x0) / (x1 - x0) * w; }, Y: function (v) { return y + h - (v - y0) / (y1 - y0) * h; } };
    },
    parts: function () { var P = []; return { add: function (o) { P.push(o); }, n: function () { return P.length; }, run: function (c, dt, g) { for (var i = P.length - 1; i >= 0; i--) { var p = P[i]; p.life -= dt; if (p.life <= 0) { P.splice(i, 1); continue; } p.vy += (g || 0) * dt; p.x += p.vx * dt; p.y += p.vy * dt; var k = p.life / p.max; c.fillStyle = rgba(p.col || [255, 255, 255], k * (p.a == null ? 1 : p.a)); c.beginPath(); c.arc(p.x, p.y, (p.r || 2) * (p.shrink ? k : 1), 0, 7); c.fill(); } }, clear: function () { P.length = 0; } }; },
    lines: function (c, pts, col, w) { c.save(); c.strokeStyle = col || "#7cc4ff"; c.lineWidth = w || 3; c.lineJoin = "round"; c.beginPath(); pts.forEach(function (q, i) { i ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1]); }); c.stroke(); c.restore(); }
  };
  G.simX = X;

  /* ---------- plotting (curves, recorded points, live traces) ---------- */
  function plot(cv, s) {
    var c = cv.getContext("2d"), W = cv._w, H = cv._h, L = 62, R = 18, T = 16, B = 46, w = W - L - R, h = H - T - B;
    c.setTransform(cv._dpr, 0, 0, cv._dpr, 0, 0); c.clearRect(0, 0, W, H);
    var g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#14213f"); g.addColorStop(1, "#0b1226"); c.fillStyle = g; c.fillRect(0, 0, W, H);
    var m = X.axes(c, L, T, w, h, s.x0, s.x1, s.y0, s.y1, s.xl, s.yl);
    c.save(); c.beginPath(); c.rect(L, T, w, h); c.clip();
    (s.curves || []).forEach(function (cu) { c.strokeStyle = cu.col || "#7cc4ff"; c.lineWidth = 3; c.lineJoin = "round"; if (cu.dash) c.setLineDash([7, 6]); c.beginPath(); var st = false; cu.pts.forEach(function (q) { if (!isFinite(q[1])) { st = false; return; } var px = m.X(q[0]), py = m.Y(q[1]); st ? c.lineTo(px, py) : c.moveTo(px, py); st = true; }); c.stroke(); c.setLineDash([]); });
    if (s.fit) { c.strokeStyle = "#ff7a90"; c.lineWidth = 2.5; c.setLineDash([8, 5]); c.beginPath(); c.moveTo(m.X(s.fit[0][0]), m.Y(s.fit[0][1])); c.lineTo(m.X(s.fit[1][0]), m.Y(s.fit[1][1])); c.stroke(); c.setLineDash([]); }
    (s.pts || []).forEach(function (q) { c.fillStyle = "#ffd23f"; c.strokeStyle = "#1c1436"; c.lineWidth = 1.5; c.beginPath(); c.arc(m.X(q[0]), m.Y(q[1]), 5, 0, 7); c.fill(); c.stroke(); });
    c.restore();
    if (s.mark && isFinite(s.mark[1])) { var mx = m.X(s.mark[0]), my = m.Y(s.mark[1]); c.strokeStyle = "rgba(93,242,168,.5)"; c.lineWidth = 1.5; c.setLineDash([4, 4]); c.beginPath(); c.moveTo(mx, T + h); c.lineTo(mx, my); c.lineTo(L, my); c.stroke(); c.setLineDash([]); X.glow(c, mx, my, 16, [93, 242, 168], .8); c.fillStyle = "#5df2a8"; c.beginPath(); c.arc(mx, my, 6, 0, 7); c.fill(); }
    (s.legend || []).forEach(function (lg, i) { c.fillStyle = lg[1]; c.fillRect(L + 10 + i * 130, T + 8, 14, 4); X.txt(c, lg[0], L + 30 + i * 130, T + 13, { s: 12, a: "left", c: "rgba(255,255,255,.85)" }); });
  }
  function canvasOf(host, W, H) {
    var cv = document.createElement("canvas"), dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); cv._w = W; cv._h = H; cv._dpr = dpr; cv.style.aspectRatio = W + "/" + H; cv.style.width = "100%"; cv.style.display = "block"; host.appendChild(cv); return cv;
  }

  /* ---------- shared widgets ---------- */
  function mcq(host, q, onDone) {
    var box = document.createElement("div"); box.className = "sl-q";
    box.innerHTML = '<p class="sl-qt">' + q.q + '</p><div class="sl-opts">' + q.o.map(function (o, i) { return '<button class="choice sl-opt" data-i="' + i + '">' + o + '</button>'; }).join("") + '</div><div class="sl-fb" hidden></div>';
    host.appendChild(box); var locked = false;
    $$(".sl-opt", box).forEach(function (b) {
      b.onclick = function () {
        if (locked) return; var i = +b.dataset.i, ok = i === q.a;
        if (!ok) { b.classList.add("wrong"); b.disabled = true; var fb0 = $(".sl-fb", box); fb0.hidden = false; fb0.className = "sl-fb no"; fb0.textContent = "Not quite. Have another go."; return; }
        locked = true; b.classList.add("right"); $$(".sl-opt", box).forEach(function (x) { x.disabled = true; });
        var fb = $(".sl-fb", box); fb.hidden = false; fb.className = "sl-fb yes"; fb.innerHTML = "<b>Correct.</b> " + (q.e || ""); if (onDone) onDone();
      };
    });
    return box;
  }
  function chips(units) {
    var out = [], ids = Object.keys(G.levels || {});
    (units || []).forEach(function (t) { var parts = t.split("::"), l = null, i; for (i = 0; i < ids.length; i++) { var x = G.levels[ids[i]]; if (parts.length > 1 ? (x.topic.name === parts[0] && x.t === parts[1]) : x.t === t) { l = x; break; } } if (l) out.push('<a class="chip" href="#/l/' + l.id + '">' + esc(l.t) + '</a>'); });
    return out.join("");
  }
  function learnCard(D) {
    var h = "";
    if (D.explain && D.explain.length) h += '<h3>What is going on</h3><ul>' + D.explain.map(function (s) { return "<li>" + (G.fmtChem ? s : s) + "</li>"; }).join("") + "</ul>";
    if (D.eq && D.eq.length) h += '<div class="sl-eqs">' + D.eq.map(function (e) { return '<span class="sl-eq">' + e + "</span>"; }).join("") + "</div>";
    if (D.exam) h += '<p class="sl-exam"><b>Exam tip:</b> ' + D.exam + "</p>";
    if (D.safe) h += '<p class="rx-safe"><b>Stay safe:</b> ' + D.safe + "</p>";
    var ch = chips(D.units); if (ch) h += '<h3>Recall the knowledge</h3><div class="rx-units">' + ch + "</div>";
    return h ? '<div class="rx-card sl-learn">' + h + "</div>" : "";
  }

  /* ---------- the builder ---------- */
  function build(D, el, A, embed) {
    var kind = D.kind || (D.sort ? "sort" : D.mark ? "mark" : D.order ? "order" : D.trace ? "trace" : D.story ? "story" : D.run ? "custom" : "sim"), done = false;
    function win(msg) { if (done) return; done = true; A.award(D.xp || 20); var g = $(".sl-goal", el); if (g) { g.classList.add("won"); g.innerHTML = "✔ " + (msg || "Challenge complete") + " <b>+" + (D.xp || 20) + " XP</b>"; } if (window.ANIM && ANIM.confetti) try { ANIM.confetti(36); } catch (e) { } }
    el.innerHTML = '<div class="sl">' + (embed ? "" : '<div class="sl-head"><span class="sl-badge">' + esc(D.tag || "Interactive lab") + "</span>" + (D.level ? '<span class="sl-lvl">' + esc(D.level) + "</span>" : "") + "</div>") + '<div class="sl-pred"></div><div class="sl-goal" hidden></div><div class="sl-main"></div><div class="sl-chk"></div></div>' + (embed ? "" : learnCard(D));
    var main = $(".sl-main", el);
    if (D.predict) {
      var pr = $(".sl-pred", el); pr.innerHTML = '<div class="sl-prh">Predict first</div>';
      mcq(pr, D.predict, function () { A.award(5); });
    }
    if (D.goal) { var gl = $(".sl-goal", el); gl.hidden = false; gl.textContent = "Challenge: " + (typeof D.goal.text === "function" ? "" : D.goal.text); }
    var runner = { sim: simKind, sort: sortKind, mark: markKind, order: orderKind, trace: traceKind, story: storyKind, custom: function (h) { D.run(h, A, X, win); } }[kind];
    runner(main);
    if (D.check) { var ck = $(".sl-chk", el); ck.innerHTML = '<div class="sl-prh">Check your understanding</div>'; mcq(ck, D.check, function () { win("Concept checked"); }); }

    /* ===== sim ===== */
    function simKind(host) {
      var W = D.w || 720, H = D.h || 400, p = {}, S = {}, running = true, alive = true, last = performance.now(), acc = 0, rec = [], live = [], pset = {};
      var stage = document.createElement("div"); stage.className = "sl-stage"; host.appendChild(stage);
      var cv = canvasOf(stage, W, H), c = cv.getContext("2d"), dpr = cv._dpr;
      var read = document.createElement("div"); read.className = "sl-read"; host.appendChild(read);
      var ctl = document.createElement("div"); ctl.className = "sl-ctl"; host.appendChild(ctl);
      var bt = document.createElement("div"); bt.className = "rx-ctl"; host.appendChild(bt);
      var data = document.createElement("div"); data.className = "sl-data"; host.appendChild(data);
      var note = document.createElement("div"); note.className = "rx-obs"; note.hidden = true; host.insertBefore(note, read);
      var api = { say: function (t) { note.hidden = !t; note.innerHTML = t || ""; }, reset: reset, win: win, X: X, record: record, setParam: function (k, v) { if (pset[k]) pset[k].set(v); } };
      (D.params || []).forEach(function (q) {
        p[q.k] = q.v;
        if (q.t === "toggle") { var d = document.createElement("label"); d.className = "sl-tg"; d.innerHTML = '<input type="checkbox"' + (q.v ? " checked" : "") + "> <span>" + q.l + "</span>"; ctl.appendChild(d); $("input", d).onchange = function () { p[q.k] = this.checked; if (D.onchange) D.onchange(S, p, q.k, api); }; pset[q.k] = { set: function (v) { $("input", d).checked = !!v; p[q.k] = !!v; } }; }
        else if (q.t === "select") { var d2 = document.createElement("label"); d2.className = "sl-sel"; d2.innerHTML = "<span>" + q.l + '</span><select class="field">' + q.o.map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === q.v ? " selected" : "") + ">" + o[1] + "</option>"; }).join("") + "</select>"; ctl.appendChild(d2); $("select", d2).onchange = function () { var v = this.value; p[q.k] = isNaN(+v) ? v : +v; if (D.onchange) D.onchange(S, p, q.k, api); }; pset[q.k] = { set: function (v) { $("select", d2).value = v; p[q.k] = v; } }; }
        else { pset[q.k] = A.slider(ctl, q.l, q.min, q.max, q.step, q.v, q.u || "", function (v) { p[q.k] = v; if (D.onchange) D.onchange(S, p, q.k, api); }); }
      });
      function init() { S = D.init ? (D.init(p, api) || {}) : {}; S.t = 0; live = []; }
      function reset() { rec = []; drawTable(); Object.keys(pset).forEach(function (k) { var q = D.params.filter(function (z) { return z.k === k; })[0]; pset[k].set(q.v); }); init(); }
      init();
      (D.buttons || []).forEach(function (b) { var e = document.createElement("button"); e.className = "btn small " + (b.cls || "alt"); e.textContent = b.l; e.onclick = function () { b.fn(S, p, api); }; bt.appendChild(e); });
      if (D.pause !== false) { var pb = document.createElement("button"); pb.className = "btn small alt"; pb.textContent = "Pause"; pb.onclick = function () { running = !running; pb.textContent = running ? "Pause" : "Play"; }; bt.appendChild(pb); }
      var rb = document.createElement("button"); rb.className = "btn small alt"; rb.textContent = "Reset"; rb.onclick = reset; bt.appendChild(rb);
      if (D.rec) { var rc = document.createElement("button"); rc.className = "btn small"; rc.textContent = "Record reading"; rc.onclick = record; bt.insertBefore(rc, bt.firstChild); }
      var gcv = null; if (D.graph || D.live || D.rec) { gcv = canvasOf(data, 720, D.gh || 250); gcv.className = "sl-graph"; }
      var tbl = null; if (D.rec) { tbl = document.createElement("div"); tbl.className = "sl-table"; data.appendChild(tbl); }
      function record() {
        if (!D.rec) return; var row = D.rec.row(S, p).map(function (v) { return +(+v).toPrecision(4); }); rec.push(row); if (rec.length > 14) rec.shift(); drawTable(); if (D.rec.need && rec.length >= D.rec.need && D.rec.win !== false) win("Great data collection");
      }
      function fit() { if (rec.length < 3 || !D.rec || !D.rec.fit) return null; var n = rec.length, sx = 0, sy = 0, sxy = 0, sxx = 0; rec.forEach(function (r) { sx += r[0]; sy += r[1]; sxy += r[0] * r[1]; sxx += r[0] * r[0]; }); var den = n * sxx - sx * sx; if (!den) return null; var m = (n * sxy - sx * sy) / den, b = (sy - m * sx) / n; return { m: m, b: b }; }
      function drawTable() {
        if (!tbl) return; var f = fit();
        tbl.innerHTML = rec.length ? '<table class="eq"><thead><tr>' + D.rec.cols.map(function (x) { return "<th>" + x + "</th>"; }).join("") + "</tr></thead><tbody>" + rec.map(function (r) { return "<tr>" + r.map(function (v) { return "<td>" + nice(v) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table>" + (f ? '<p class="muted sm">Line of best fit: gradient = <b>' + nice(f.m) + "</b>, intercept = <b>" + nice(f.b) + "</b></p>" : "") : '<p class="muted sm">Press <b>Record reading</b> to log a result in the table. Take at least ' + (D.rec.need || 5) + " readings with different settings to see the pattern.</p>";
      }
      drawTable();
      function readout() {
        if (!D.out) return; var o = D.out(S, p); read.innerHTML = o.map(function (r) { return '<div class="sl-chip"><small>' + r[0] + "</small><b>" + (typeof r[1] === "number" ? nice(r[1]) : r[1]) + (r[2] ? " <i>" + r[2] + "</i>" : "") + "</b></div>"; }).join("");
      }
      function drawGraph() {
        if (!gcv) return; var s = { xl: "", yl: "", curves: [], pts: [] };
        if (D.graph) {
          var gq = D.graph, kq = D.params.filter(function (z) { return z.k === gq.k; })[0] || { min: 0, max: 10 }, x0 = gq.xmin != null ? gq.xmin : kq.min, x1 = gq.xmax != null ? gq.xmax : kq.max, n = 90, i, ys = [], series = gq.series || [{ f: gq.f, col: "#7cc4ff" }];
          s.xl = gq.xl; s.yl = gq.yl; s.curves = series.map(function (se) { var pts = [], pp = {}; for (var kk in p) pp[kk] = p[kk]; for (i = 0; i <= n; i++) { var xv = x0 + (x1 - x0) * i / n; pp[gq.k] = xv; var yv = se.f(xv, pp, S); pts.push([xv, yv]); if (isFinite(yv)) ys.push(yv); } return { pts: pts, col: se.col, dash: se.dash }; });
          var ylo = gq.ymin != null ? gq.ymin : Math.min.apply(0, ys), yhi = gq.ymax != null ? gq.ymax : Math.max.apply(0, ys); if (yhi - ylo < 1e-9) { yhi = ylo + 1; } if (gq.ymin == null) ylo = ylo >= 0 ? 0 : ylo - (yhi - ylo) * .05; if (gq.ymax == null) yhi += (yhi - ylo) * .08;
          s.x0 = x0; s.x1 = x1; s.y0 = ylo; s.y1 = yhi; var mv = series[0].f(p[gq.k], p, S); s.mark = [p[gq.k], mv]; s.legend = series.filter(function (z) { return z.name; }).map(function (z) { return [z.name, z.col || "#7cc4ff"]; });
          if (D.rec && rec.length) s.pts = rec.map(function (r) { return [r[0], r[1]]; });
        } else if (D.live) {
          var lv = D.live, span = lv.span || 10, tn = S.t || 0; s.xl = lv.xl || "Time (s)"; s.yl = lv.yl; s.x0 = Math.max(0, tn - span); s.x1 = s.x0 + span; s.y0 = lv.min; s.y1 = lv.max;
          s.curves = [{ pts: live.map(function (q) { return q; }), col: lv.col || "#5df2a8" }];
        } else if (D.rec) {
          var xs = rec.map(function (r) { return r[0]; }), ys2 = rec.map(function (r) { return r[1]; }), rg = D.rec.range;
          s.xl = D.rec.cols[0]; s.yl = D.rec.cols[1]; s.x0 = rg ? rg[0] : 0; s.x1 = rg ? rg[1] : Math.max(1, Math.max.apply(0, xs.concat([1])) * 1.1); s.y0 = rg ? rg[2] : 0; s.y1 = rg ? rg[3] : Math.max(1, Math.max.apply(0, ys2.concat([1])) * 1.15); s.pts = rec.map(function (r) { return [r[0], r[1]]; });
        }
        var f = fit(); if (f && s.pts && s.pts.length) { s.fit = [[s.x0, f.m * s.x0 + f.b], [s.x1, f.m * s.x1 + f.b]]; }
        plot(gcv, s);
      }
      var heldT = 0, liveAcc = 0;
      function frame(ts) {
        if (!cv.isConnected) { alive = false; return; }
        var dt = Math.min(.05, (ts - last) / 1000 || .016); last = ts;
        if (running) { S.t = (S.t || 0) + dt; if (D.step) D.step(S, p, dt, api); if (D.live) { liveAcc += dt; if (liveAcc > .05) { liveAcc = 0; live.push([S.t, D.live.v(S, p)]); var cut = S.t - (D.live.span || 10) - 1; while (live.length && live[0][0] < cut) live.shift(); } } }
        c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, W, H); D.draw(c, S, p, S.t || 0, W, H, X, dt);
        acc += dt; if (acc > .1) {
          acc = 0; readout(); drawGraph();
          if (D.goal && !done) { var ok = D.goal.test(S, p); if (typeof D.goal.text === "function") { var gg = $(".sl-goal", el); if (gg && !done) gg.textContent = "Challenge: " + D.goal.text(S, p); } heldT = ok ? heldT + .1 : 0; if (heldT >= (D.goal.hold || .5)) { win(D.goal.msg); heldT = 0; } }
        }
        if (alive) requestAnimationFrame(frame);
      }
      readout(); requestAnimationFrame(frame);
    }

    /* ===== sort: classify items into buckets ===== */
    function sortKind(host) {
      var Sd = D.sort, items = shuffle(Sd.items).slice(0, Sd.n || Sd.items.length), i = 0, score = 0, streak = 0, best = 0, mistakes = [];
      function draw() {
        if (i >= items.length) {
          var pct = Math.round(100 * score / items.length); if (pct >= 60) win(pct + "% correct");
          host.innerHTML = '<div class="sl-end"><div class="sl-big">' + pct + '%</div><p><b>' + score + " of " + items.length + "</b> correct. Best streak: " + best + ".</p>" + (mistakes.length ? '<div class="rx-card"><h3>Look again</h3><ul>' + mistakes.map(function (m) { return "<li><b>" + m[0] + "</b> belongs in <i>" + Sd.buckets[m[1]] + "</i>. " + (m[2] || "") + "</li>"; }).join("") + "</ul></div>" : "<p>Perfect round.</p>") + '<button class="btn" id="sl-again">Play again</button></div>';
          $("#sl-again", host).onclick = function () { items = shuffle(Sd.items).slice(0, Sd.n || Sd.items.length); i = 0; score = 0; streak = 0; best = 0; mistakes = []; draw(); }; return;
        }
        var it = items[i];
        host.innerHTML = '<div class="sl-prog"><div style="width:' + (100 * i / items.length) + '%"></div></div><div class="sl-meta"><span>' + (i + 1) + " of " + items.length + "</span><span>Streak " + streak + "</span></div>" + (Sd.prompt ? '<p class="sl-qt">' + Sd.prompt + "</p>" : "") + '<div class="sl-card">' + it[0] + '</div><div class="sl-buckets">' + Sd.buckets.map(function (b, bi) { return '<button class="sl-bk b' + (bi % 4) + '" data-b="' + bi + '">' + b + "</button>"; }).join("") + '</div><div class="sl-fb" hidden></div>';
        $$(".sl-bk", host).forEach(function (b) {
          b.onclick = function () {
            var ok = +b.dataset.b === it[1]; $$(".sl-bk", host).forEach(function (x) { x.disabled = true; if (+x.dataset.b === it[1]) x.classList.add("right"); }); if (!ok) b.classList.add("wrong");
            if (ok) { score++; streak++; best = Math.max(best, streak); } else { streak = 0; mistakes.push(it); }
            var fb = $(".sl-fb", host); fb.hidden = false; fb.className = "sl-fb " + (ok ? "yes" : "no"); fb.innerHTML = (ok ? "<b>Correct.</b> " : "<b>Not quite.</b> It belongs in <i>" + Sd.buckets[it[1]] + "</i>. ") + (it[2] || "") + '<div><button class="btn small" id="sl-next">' + (i + 1 >= items.length ? "See results" : "Next") + "</button></div>";
            $("#sl-next", host).onclick = function () { i++; draw(); };
          };
        });
      }
      draw();
    }

    /* ===== mark: highlight the right words ===== */
    function markKind(host) {
      var tasks = D.mark, ti = 0, tot = 0;
      function parse(t) { var toks = [], parts = t.split(/(\{\{.*?\}\})/); parts.forEach(function (pt, gi) { var tg = /^\{\{(.*)\}\}$/.exec(pt); (tg ? tg[1] : pt).split(/\s+/).filter(Boolean).forEach(function (w) { toks.push({ w: w, g: tg ? gi : -1 }); }); }); return toks; }
      function draw() {
        if (ti >= tasks.length) { var pct = Math.round(tot / tasks.length); if (pct >= 60) win(pct + "% accuracy"); host.innerHTML = '<div class="sl-end"><div class="sl-big">' + pct + '%</div><p>Average accuracy across ' + tasks.length + ' tasks.</p><button class="btn" id="sl-again">Try again</button></div>'; $("#sl-again", host).onclick = function () { ti = 0; tot = 0; draw(); }; return; }
        var T = tasks[ti], toks = parse(T.text), sel = {};
        host.innerHTML = '<div class="sl-prog"><div style="width:' + (100 * ti / tasks.length) + '%"></div></div><p class="sl-qt">' + (ti + 1) + ". " + T.task + '</p><div class="sl-text">' + toks.map(function (t, k) { return '<span class="tok" data-k="' + k + '">' + esc(t.w) + "</span>"; }).join(" ") + '</div><div class="rx-ctl"><button class="btn small" id="sl-ck">Check</button><button class="btn small alt" id="sl-cl">Clear</button></div><div class="sl-fb" hidden></div>';
        $$(".tok", host).forEach(function (e) { e.onclick = function () { if (e.classList.contains("fixed")) return; sel[e.dataset.k] = !sel[e.dataset.k]; e.classList.toggle("sel", !!sel[e.dataset.k]); }; });
        $("#sl-cl", host).onclick = function () { $$(".tok.sel", host).forEach(function (e) { e.classList.remove("sel"); }); sel = {}; };
        $("#sl-ck", host).onclick = function () {
          var good = 0, need = 0, wrong = 0; toks.forEach(function (t, k) { var e = $('.tok[data-k="' + k + '"]', host); e.classList.add("fixed"); e.classList.remove("sel"); if (t.g >= 0) { need++; if (sel[k]) { good++; e.classList.add("hit"); } else e.classList.add("miss"); } else if (sel[k]) { wrong++; e.classList.add("bad"); } });
          var pct = Math.max(0, Math.round(100 * (good - wrong * .5) / Math.max(1, need))); tot += pct; var fb = $(".sl-fb", host); fb.hidden = false; fb.className = "sl-fb " + (pct >= 70 ? "yes" : "no"); fb.innerHTML = "<b>" + good + " of " + need + " words found</b>" + (wrong ? ", " + wrong + " extra." : ".") + " Green = correct, amber = missed, red = not needed. " + (T.why || "") + '<div><button class="btn small" id="sl-next">' + (ti + 1 >= tasks.length ? "See results" : "Next task") + "</button></div>"; $("#sl-ck", host).disabled = true; $("#sl-next", host).onclick = function () { ti++; draw(); };
        };
      }
      draw();
    }

    /* ===== order: put steps in sequence ===== */
    function orderKind(host) {
      var tasks = D.order, ti = 0, tot = 0;
      function draw() {
        if (ti >= tasks.length) { var pct = Math.round(tot / tasks.length); if (pct >= 60) win(pct + "% in the right place"); host.innerHTML = '<div class="sl-end"><div class="sl-big">' + pct + '%</div><p>Average across ' + tasks.length + ' sequences.</p><button class="btn" id="sl-again">Try again</button></div>'; $("#sl-again", host).onclick = function () { ti = 0; tot = 0; draw(); }; return; }
        var T = tasks[ti], cur = shuffle(T.items); if (cur.join() === T.items.join()) cur.reverse(); var checked = false;
        function paint() {
          host.innerHTML = '<div class="sl-prog"><div style="width:' + (100 * ti / tasks.length) + '%"></div></div><p class="sl-qt">' + (ti + 1) + ". " + T.task + '</p><ol class="sl-ord">' + cur.map(function (s, k) { var ok = checked && s === T.items[k]; return '<li class="' + (checked ? (ok ? "good" : "bad") : "") + '"><span>' + s + '</span><span class="mv"><button data-k="' + k + '" data-d="-1" aria-label="Move up"' + (checked ? " disabled" : "") + '>▲</button><button data-k="' + k + '" data-d="1" aria-label="Move down"' + (checked ? " disabled" : "") + ">▼</button></span></li>"; }).join("") + '</ol><div class="rx-ctl"><button class="btn small" id="sl-ck"' + (checked ? " disabled" : "") + '>Check order</button></div><div class="sl-fb" hidden></div>';
          $$(".mv button", host).forEach(function (b) { b.onclick = function () { var k = +b.dataset.k, d = +b.dataset.d, j = k + d; if (j < 0 || j >= cur.length) return; var t = cur[k]; cur[k] = cur[j]; cur[j] = t; paint(); var nb = $('.mv button[data-k="' + j + '"][data-d="' + d + '"]', host); if (nb) nb.focus(); }; });
          $("#sl-ck", host).onclick = function () {
            checked = true; var good = 0; cur.forEach(function (s, k) { if (s === T.items[k]) good++; }); var pct = Math.round(100 * good / cur.length); tot += pct; paint(); var fb = $(".sl-fb", host); fb.hidden = false; fb.className = "sl-fb " + (pct === 100 ? "yes" : "no"); fb.innerHTML = "<b>" + good + " of " + cur.length + " in the right place.</b> " + (pct < 100 ? "Correct order: " + T.items.map(function (s, k) { return (k + 1) + ") " + s; }).join(" ") + " " : "") + (T.why || "") + '<div><button class="btn small" id="sl-next">' + (ti + 1 >= tasks.length ? "See results" : "Next sequence") + "</button></div>"; $("#sl-next", host).onclick = function () { ti++; draw(); };
          };
        }
        paint();
      }
      draw();
    }

    /* ===== trace: step through code ===== */
    function traceKind(host) {
      var progs = D.trace, pi = 0, answered = 0;
      function draw() {
        var P = progs[pi], si = -1, timer = null, prev = {};
        host.innerHTML = '<div class="sl-tabs">' + progs.map(function (q, k) { return '<button class="chip ' + (k === pi ? "on" : "") + '" data-k="' + k + '">' + q.title + "</button>"; }).join("") + '</div><div class="sl-code"><pre>' + P.code.map(function (l, k) { return '<div class="ln" data-l="' + k + '"><i>' + (k + 1) + "</i><code>" + esc(l) + "</code></div>"; }).join("") + '</pre><div class="sl-vars"><h4>Variables</h4><div id="sl-v"></div><h4>Output</h4><pre class="sl-out" id="sl-o">&nbsp;</pre></div></div><div class="rx-ctl"><button class="btn small" id="sl-st">Step</button><button class="btn small alt" id="sl-bk">Back</button><button class="btn small alt" id="sl-pl">Auto-run</button><button class="btn small alt" id="sl-rs">Reset</button></div><div class="sl-ask"></div>';
        $$(".sl-tabs .chip", host).forEach(function (b) { b.onclick = function () { clearInterval(timer); pi = +b.dataset.k; draw(); }; });
        function show() {
          $$(".ln", host).forEach(function (e) { e.classList.remove("on"); }); var s = P.steps[si], vars = si < 0 ? {} : s[1], outAll = ""; for (var k = 0; k <= si; k++) if (P.steps[k][2]) outAll += P.steps[k][2] + "\n";
          if (s) { var ln = $('.ln[data-l="' + s[0] + '"]', host); if (ln) ln.classList.add("on"); }
          var prevv = si > 0 ? P.steps[si - 1][1] : {}; $("#sl-v", host).innerHTML = Object.keys(vars).length ? '<table class="eq"><tbody>' + Object.keys(vars).map(function (n) { var ch = String(prevv[n]) !== String(vars[n]); return "<tr><td><b>" + esc(n) + '</b></td><td class="' + (ch ? "chg" : "") + '">' + esc(String(vars[n])) + "</td></tr>"; }).join("") + "</tbody></table>" : '<p class="muted sm">No variables yet.</p>';
          $("#sl-o", host).textContent = outAll || " ";
          if (si >= P.steps.length - 1 && P.ask && !$(".sl-q", host)) { var ak = $(".sl-ask", host); ak.innerHTML = '<div class="sl-prh">Now you try</div>'; mcq(ak, P.ask, function () { answered++; if (answered >= Math.min(2, progs.length)) win("Programs traced"); }); }
        }
        $("#sl-st", host).onclick = function () { if (si < P.steps.length - 1) { si++; show(); } };
        $("#sl-bk", host).onclick = function () { if (si >= 0) { si--; show(); } };
        $("#sl-rs", host).onclick = function () { clearInterval(timer); si = -1; show(); };
        $("#sl-pl", host).onclick = function () { clearInterval(timer); timer = setInterval(function () { if (!host.isConnected || si >= P.steps.length - 1) { clearInterval(timer); return; } si++; show(); }, 900); };
        show();
      }
      draw();
    }

    /* ===== story: decisions with live meters ===== */
    function storyKind(host) {
      var Sd = D.story, st, node, log;
      function start() { st = {}; Sd.stats.forEach(function (s) { st[s[0]] = s[3]; }); node = Sd.start; log = []; draw(null); }
      function meters() { return '<div class="sl-meters">' + Sd.stats.map(function (s) { var v = clamp(st[s[0]], 0, 100); return '<div class="sl-m"><span>' + s[1] + '</span><div class="sl-mb"><div style="width:' + v + "%;background:" + (v < 25 ? "#ff6b81" : v < 50 ? "#ffb54a" : "#5df2a8") + '"></div></div><b>' + Math.round(st[s[0]]) + (s[2] || "") + "</b></div>"; }).join("") + "</div>"; }
      function draw(fb) {
        var n = Sd.nodes[node];
        if (n.end) { var v = Sd.verdict ? Sd.verdict(st) : ""; win(n.title || "Scenario complete"); host.innerHTML = meters() + '<div class="sl-card story"><h3>' + (n.title || "Outcome") + "</h3><p>" + n.t + "</p>" + (v ? '<p class="sl-exam"><b>Evaluation:</b> ' + v + "</p>" : "") + '</div><div class="rx-card"><h3>Your decisions</h3><ol>' + log.map(function (x) { return "<li>" + x + "</li>"; }).join("") + '</ol></div><button class="btn" id="sl-again">Play again and try a different path</button>'; $("#sl-again", host).onclick = start; return; }
        host.innerHTML = meters() + (fb ? '<div class="sl-fb yes">' + fb + "</div>" : "") + '<div class="sl-card story"><p>' + n.t + '</p></div><div class="sl-choices">' + n.o.map(function (o, k) { return '<button class="choice sl-ch" data-k="' + k + '">' + o[0] + "</button>"; }).join("") + "</div>";
        $$(".sl-ch", host).forEach(function (b) { b.onclick = function () { var o = n.o[+b.dataset.k], fx = o[2] || {}, ch = []; Object.keys(fx).forEach(function (k) { st[k] = clamp((st[k] || 0) + fx[k], 0, 100); var nm = Sd.stats.filter(function (s) { return s[0] === k; })[0]; ch.push((nm ? nm[1] : k) + " " + (fx[k] > 0 ? "+" : "") + fx[k]); }); log.push(o[0] + (ch.length ? " <small>(" + ch.join(", ") + ")</small>" : "")); node = o[1]; draw((o[3] ? o[3] + " " : "") + (ch.length ? "<small>" + ch.join(" · ") + "</small>" : "")); }; });
      }
      start();
    }
  }

  G.simDefs = {};
  G.sim = function (D) { G.simDefs[D.id] = D; G.lab({ id: D.id, name: D.name, icon: D.icon || "🔬", desc: D.desc, tag: D.tag || "", pro: true, run: function (el, A) { build(D, el, A, false); } }); };
  G.simRun = function (D, el, A) { build(D, el, A, true); };
})();
