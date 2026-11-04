/* Reusable templates for step-by-step explainers. Each returns a scene for GAME.explain().
   ANIM.kit.flow(title, nodes, caps)      boxes in order, with numbered badges and arrows
   ANIM.kit.cycle(title, nodes, caps)     boxes round a loop
   ANIM.kit.timeline(title, events, caps) events = [[date, label], ...]
   ANIM.kit.compare(title, heads, rows, caps)  two columns, rows = [[left, right], ...]
   ANIM.kit.bars(title, data, caps)       data = [[label, value], ...]
   ANIM.kit.layers(title, items, caps, pyramid)  stacked boxes
   Use "|" in a label to break it onto two lines. If caps has one more entry than there are items, the first is an introduction. */
(function () {
  "use strict";
  var H = ANIM.h, C = H.COL, r = H.r, t = H.t, c = H.c, p = H.p, arrow = H.arrow;
  var PAL = [C.blue, C.green, C.amber, C.pink, C.purple, "#22d3ee"], INK = "#10142e";
  var K = ANIM.kit = {};

  function label(id, cx, cy, s, col, fs) {
    var parts = String(s).split("|"), items = [], ids = [];
    parts.forEach(function (x, i) {
      var y = cy + (i - (parts.length - 1) / 2) * (fs + 4) + fs * 0.36;
      items.push(t(id + "_" + i, cx, y, x, col, { "font-size": fs, o: 0 })); ids.push(id + "_" + i);
    });
    return { items: items, ids: ids };
  }
  function title(s) { return t("ttl", 320, 28, s, C.w, { "font-size": 20 }); }
  function build(w, h, ttl, items, groups, caps, aria) {
    var steps = [], extra = caps.length > groups.length ? 1 : 0;
    if (extra) steps.push({ cap: caps[0] });
    groups.forEach(function (ids, i) {
      var set = {}; ids.forEach(function (id) { set[id] = { o: 1 }; });
      steps.push({ cap: caps[i + extra] || "", set: set });
    });
    return { w: w, h: h, label: aria || ttl, items: [title(ttl)].concat(items), steps: steps };
  }
  function boxWithLabel(items, ids, id, x, y, w, h, fill, text, fs, ink) {
    items.push(r(id, x, y, w, h, fill, { rx: 12, o: 0 })); ids.push(id);
    var L = label(id + "l", x + w / 2, y + h / 2, text, ink || INK, fs || 14);
    L.items.forEach(function (i) { items.push(i); }); L.ids.forEach(function (i) { ids.push(i); });
  }

  K.flow = function (ttl, nodes, caps) {
    var n = nodes.length, rows = n <= 4 ? 1 : 2, per = Math.ceil(n / rows), gap = 34;
    var w = Math.min(140, (600 - (per - 1) * gap) / per), h = 64, items = [], groups = [];
    nodes.forEach(function (s, i) {
      var row = Math.floor(i / per), col = i % per, cnt = Math.min(per, n - row * per);
      var x0 = (640 - (cnt * w + (cnt - 1) * gap)) / 2, x = x0 + col * (w + gap), y = rows === 1 ? 105 : 62 + row * 118, ids = [];
      if (col > 0) { items.push(p("a" + i, arrow(x - gap + 5, y + h / 2, x - 5, y + h / 2), C.w, "none", { o: 0, "stroke-width": 3 })); ids.push("a" + i); }
      boxWithLabel(items, ids, "b" + i, x, y, w, h, PAL[i % PAL.length], s, 14);
      items.push(c("n" + i, x + 8, y + 8, 11, INK, { o: 0, stroke: "#fff", "stroke-width": 2 }), t("nt" + i, x + 8, y + 12.5, "" + (i + 1), "#fff", { "font-size": 12, o: 0 })); ids.push("n" + i, "nt" + i);
      groups.push(ids);
    });
    return build(640, rows === 1 ? 230 : 300, ttl, items, groups, caps);
  };

  K.cycle = function (ttl, nodes, caps) {
    var n = nodes.length, cx = 320, cy = 165, rx = 205, ry = 98, w = 132, h = 50, items = [], groups = [], pos = [];
    for (var i = 0; i < n; i++) { var a = (-90 + i * 360 / n) * Math.PI / 180; pos.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); }
    var arrows = [];
    for (i = 0; i < n; i++) {
      var A = pos[i], B = pos[(i + 1) % n];
      items.push(p("a" + i, arrow(A[0] + (B[0] - A[0]) * .32, A[1] + (B[1] - A[1]) * .32, A[0] + (B[0] - A[0]) * .7, A[1] + (B[1] - A[1]) * .7), C.w, "none", { o: 0, "stroke-width": 3 }));
    }
    nodes.forEach(function (s, i) {
      var ids = []; boxWithLabel(items, ids, "b" + i, pos[i][0] - w / 2, pos[i][1] - h / 2, w, h, PAL[i % PAL.length], s, 13);
      if (i > 0) ids.push("a" + (i - 1));
      if (i === n - 1) ids.push("a" + i);
      groups.push(ids);
    });
    return build(640, 310, ttl, items, groups, caps);
  };

  K.timeline = function (ttl, ev, caps) {
    var n = ev.length, items = [], groups = [], y = 160;
    items.push(H.l("line", 30, y, 610, y, C.grey, { "stroke-width": 4 }));
    ev.forEach(function (e, i) {
      var x = n === 1 ? 320 : 62 + i * (516 / (n - 1)), up = i % 2 === 0, ids = [];
      items.push(c("m" + i, x, y, 9, PAL[i % PAL.length], { o: 0, stroke: "#fff", "stroke-width": 3 })); ids.push("m" + i);
      var D = label("d" + i, x, up ? y - 26 : y + 30, e[0], PAL[i % PAL.length], 15);
      var L = label("t" + i, x, up ? y - 62 : y + 70, e[1], C.w, 13);
      D.items.concat(L.items).forEach(function (q) { items.push(q); }); ids = ids.concat(D.ids, L.ids);
      groups.push(ids);
    });
    return build(640, 290, ttl, items, groups, caps);
  };

  K.compare = function (ttl, heads, rows, caps) {
    var items = [], groups = [], bw = 275, bh = 44;
    [[40, heads[0], C.blue], [325, heads[1], C.pink]].forEach(function (hd, k) {
      items.push(r("h" + k, hd[0], 52, bw, 38, hd[2], { rx: 10 }), t("ht" + k, hd[0] + bw / 2, 77, hd[1], INK, { "font-size": 17 }));
    });
    rows.forEach(function (rw, i) {
      var y = 100 + i * (bh + 8), ids = [];
      [40, 325].forEach(function (x, k) { boxWithLabel(items, ids, "c" + i + "_" + k, x, y, bw, bh, "#252e63", rw[k], 13, C.w); });
      groups.push(ids);
    });
    return build(640, 112 + rows.length * (bh + 8), ttl, items, groups, caps);
  };

  K.bars = function (ttl, data, caps) {
    var n = data.length, base = 250, maxH = 170, mx = Math.max.apply(null, data.map(function (d) { return d[1]; })), items = [], groups = [];
    var bw = Math.min(74, 520 / n - 14);
    items.push(H.l("ax", 50, base, 600, base, C.grey, { "stroke-width": 3 }));
    data.forEach(function (d, i) {
      var x = 60 + (540 / n) * (i + .5) - bw / 2, hh = Math.max(4, d[1] / mx * maxH), ids = [];
      items.push(r("bar" + i, x, base, bw, 0, PAL[i % PAL.length], { rx: 6 })); ids.push("bar" + i);
      var V = label("v" + i, x + bw / 2, base - hh - 12, d[2] || d[1], C.w, 15), L = label("l" + i, x + bw / 2, base + 24, d[0], C.grey, 13);
      V.items.concat(L.items).forEach(function (q) { items.push(q); });
      groups.push(ids.concat(V.ids, L.ids));
      groups[i].barSet = { id: "bar" + i, y: base - hh, h: hh };
    });
    var s = build(640, 292, ttl, items, groups, caps), extra = caps.length > groups.length ? 1 : 0;
    groups.forEach(function (g, i) { var st = s.steps[i + extra]; st.set["bar" + i] = { o: 1, y: g.barSet.y, height: g.barSet.h }; });
    return s;
  };

  K.layers = function (ttl, list, caps, pyramid) {
    var n = list.length, h = Math.min(46, 232 / n - 6), items = [], groups = [];
    list.forEach(function (s, i) {
      var w = pyramid === false ? 440 : 170 + (n === 1 ? 0 : i * (420 / (n - 1))), x = (640 - w) / 2, y = 52 + i * (h + 6), ids = [];
      boxWithLabel(items, ids, "b" + i, x, y, w, h, PAL[i % PAL.length], s, 14);
      groups.push(ids);
    });
    return build(640, 62 + n * (h + 6), ttl, items, groups, caps);
  };
})();
