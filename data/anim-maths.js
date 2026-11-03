/* Animated explainers for Maths. Each scene is a list of shapes plus steps that move or reveal them. */
(function () {
  const { c, r, l, t, p, g, sec, arrow, COL: C } = ANIM.h;
  const Lbl = (id, x, y, s, fill, o) => t(id, x, y, s, fill || C.w, Object.assign({ "font-size": 22 }, o));
  const minus = (n) => (n < 0 ? "−" + -n : "" + n);

  GAME.explain({
    "Negative numbers": (() => {
      const X = (n) => 320 + n * 50, items = [l("axis", 40, 150, 600, 150, C.grey, { "stroke-width": 5 })];
      for (let n = -5; n <= 5; n++) { items.push(l("k" + n, X(n), 138, X(n), 162, C.grey, { "stroke-width": 3 })); items.push(t("n" + n, X(n), 192, minus(n), C.w, { "font-size": 20 })); }
      items.push(p("a1", "M" + X(3) + " 118Q" + (X(3) + X(-2)) / 2 + " 40 " + X(-2) + " 118", C.pink, "none", { draw: 0 }));
      items.push(p("a2", "M" + X(-2) + " 118Q" + (X(-2) + X(1)) / 2 + " 60 " + X(1) + " 118", C.green, "none", { draw: 0 }));
      items.push(c("dot", X(0), 150, 15, C.amber, { stroke: "#fff", "stroke-width": 3 }), Lbl("lab", 320, 36, "", C.w, { "font-size": 26 }));
      return { w: 640, h: 230, label: "A number line showing additions and subtractions of negative numbers", items, steps: [
        { cap: "Zero is in the middle. Numbers to the right are bigger, numbers to the left are smaller.", set: { lab: { t: "Right = bigger · Left = smaller" } } },
        { cap: "Start at 3.", set: { dot: { cx: X(3) }, lab: { t: "Start at 3" } } },
        { cap: "Adding −5 means move 5 steps left: 3 + (−5) = −2.", set: { dot: { cx: X(-2) }, a1: { draw: 1 }, lab: { t: "3 + (−5) = −2" } } },
        { cap: "Subtracting a negative does the opposite of subtracting: −2 − (−3) = −2 + 3 = 1.", set: { dot: { cx: X(1) }, a1: { o: 0 }, a2: { draw: 1 }, lab: { t: "−2 − (−3) = 1" } } },
        { cap: "To compare, the further left, the smaller. So −4 is smaller than −1.", set: { dot: { cx: X(-4) }, a2: { o: 0 }, "n-4": { fill: C.pink }, "n-1": { fill: C.pink }, lab: { t: "−4 < −1" } } }
      ] };
    })(),

    "Fractions": (() => {
      const items = [t("la", 38, 70, "½", C.blue, { "font-size": 30 }), t("lb", 38, 140, "⅓", C.pink, { "font-size": 30 }), t("lc", 38, 250, "?", C.green, { "font-size": 30 }),
        r("fa", 80, 40, 240, 44, C.blue), r("fb", 80, 110, 160, 44, C.pink), r("oa", 80, 40, 480, 44, "none", { stroke: C.grey, "stroke-width": 3 }), r("ob", 80, 110, 480, 44, "none", { stroke: C.grey, "stroke-width": 3 }), r("oc", 80, 220, 480, 44, "none", { stroke: C.grey, "stroke-width": 3 }),
        l("ha", 320, 40, 320, 84, C.w, { "stroke-width": 3 }), l("tb1", 240, 110, 240, 154, C.w, { "stroke-width": 3 }), l("tb2", 400, 110, 400, 154, C.w, { "stroke-width": 3 })];
      for (let i = 1; i < 6; i++) { items.push(l("sa" + i, 80 + 80 * i, 40, 80 + 80 * i, 84, C.w, { "stroke-width": 2, o: 0 })); items.push(l("sb" + i, 80 + 80 * i, 110, 80 + 80 * i, 154, C.w, { "stroke-width": 2, o: 0 })); }
      items.push(r("fc1", 80, 220, 0, 44, C.blue), r("fc2", 320, 220, 0, 44, C.pink), t("res", 320, 305, "3/6 + 2/6 = 5/6", C.green, { "font-size": 30, o: 0 }));
      const six = (o) => { const s = {}; for (let i = 1; i < 6; i++) { s["sa" + i] = { o }; s["sb" + i] = { o }; } return s; };
      return { w: 640, h: 330, label: "Bars showing how to add one half and one third", items, steps: [
        { cap: "Here are ½ and ⅓ as bars. The pieces are different sizes, so we can't simply add the tops and bottoms." },
        { cap: "Find a common denominator: the lowest common multiple of 2 and 3 is 6. Slice both bars into sixths.", set: Object.assign(six(1), { ha: { o: 0 }, tb1: { o: 0 }, tb2: { o: 0 } }) },
        { cap: "½ is 3 sixths and ⅓ is 2 sixths. Now the pieces are the same size.", set: { la: { t: "3/6" }, lb: { t: "2/6" } } },
        { cap: "Add the numerators and keep the denominator: 3/6 + 2/6 = 5/6.", set: { fc1: { width: 240 }, fc2: { width: 160 }, lc: { t: "5/6" }, res: { o: 1 } } }
      ] };
    })(),

    "Pythagoras' theorem": (() => {
      const items = [g("sq1", "170,150 260,150 260,240 170,240", C.blue, C.w, { o: 0, "fill-opacity": .75 }), g("sq2", "260,240 380,240 380,360 260,360", C.pink, C.w, { o: 0, "fill-opacity": .75 }), g("sq3", "380,240 260,150 350,30 470,120", C.green, C.w, { o: 0, "fill-opacity": .75 }),
        g("tri", "260,240 380,240 260,150", "rgba(255,255,255,.1)", C.w, { draw: 0, "stroke-width": 4 }), p("ra", "M260 222H278V240", C.w, "none", { "stroke-width": 3 }),
        t("s3", 272, 200, "3", C.w, { "text-anchor": "start", "font-size": 20, o: 0 }), t("s4", 320, 232, "4", C.w, { "font-size": 20, o: 0 }), t("s5", 305, 178, "5", C.w, { "font-size": 20, o: 0 }),
        t("a1", 212, 190, "3² = 9", C.w, { o: 0 }), t("a2", 320, 308, "4² = 16", C.w, { o: 0 }), t("a3", 365, 140, "5² = 25", C.w, { o: 0, "font-size": 24 }),
        t("f", 30, 70, "a² + b² = c²", C.amber, { "text-anchor": "start", "font-size": 34, o: 0 }), t("f2", 30, 106, "9 + 16 = 25", C.amber, { "text-anchor": "start", "font-size": 24, o: 0 })];
      return { w: 640, h: 370, label: "Squares drawn on the sides of a 3, 4, 5 right-angled triangle", items, steps: [
        { cap: "A right-angled triangle with short sides 3 and 4 and longest side 5.", set: { tri: { draw: 1 }, s3: { o: 1 }, s4: { o: 1 }, s5: { o: 1 } } },
        { cap: "Build a square on each short side. Their areas are 3² = 9 and 4² = 16.", set: { sq1: { o: 1 }, sq2: { o: 1 }, a1: { o: 1 }, a2: { o: 1 } } },
        { cap: "Now build a square on the longest side, the hypotenuse. Its area is 5² = 25.", set: { sq3: { o: 1 }, a3: { o: 1 } } },
        { cap: "9 + 16 = 25. The two small squares add up to the big one. That is Pythagoras: a² + b² = c².", set: { f: { o: 1 }, f2: { o: 1 } } }
      ] };
    })(),

    "Angles in parallel lines": (() => {
      const A = [280, 110], B = [360, 230], items = [l("L1", 60, 110, 580, 110, C.grey, { draw: 0 }), l("L2", 60, 230, 580, 230, C.grey, { draw: 0 }), l("T", 240, 50, 400, 290, C.w, { draw: 0 }),
        t("m1", 560, 98, "> >", C.grey, { "font-size": 18 }), t("m2", 560, 218, "> >", C.grey, { "font-size": 18 }),
        p("cA", sec(A[0], A[1], 44, 0, 56.3), "none", C.amber, { o: 0, "fill-opacity": .8, "stroke-width": 0 }), p("cB", sec(B[0], B[1], 44, 0, 56.3), "none", C.amber, { o: 0, "fill-opacity": .8, "stroke-width": 0 }),
        p("aA", sec(A[0], A[1], 44, 56.3, 180), "none", C.pink, { o: 0, "fill-opacity": .8, "stroke-width": 0 }), p("aB", sec(B[0], B[1], 44, 236.3, 360), "none", C.pink, { o: 0, "fill-opacity": .8, "stroke-width": 0 }),
        p("kA", sec(A[0], A[1], 52, 0, 56.3), "none", C.purple, { o: 0, "fill-opacity": .85, "stroke-width": 0 }), p("kB", sec(B[0], B[1], 52, 236.3, 360), "none", C.purple, { o: 0, "fill-opacity": .85, "stroke-width": 0 }),
        t("x1", 326, 132, "x", C.w, { o: 0 }), t("x2", 406, 252, "x", C.w, { o: 0 }), t("y1", 238, 150, "y", C.w, { o: 0 }), t("y2", 402, 210, "y", C.w, { o: 0 }), t("k1", 330, 134, "x", C.w, { o: 0 }), t("k2", 408, 204, "180° − x", C.w, { o: 0, "font-size": 18 })];
      const off = { cA: { o: 0 }, cB: { o: 0 }, x1: { o: 0 }, x2: { o: 0 }, aA: { o: 0 }, aB: { o: 0 }, y1: { o: 0 }, y2: { o: 0 }, kA: { o: 0 }, kB: { o: 0 }, k1: { o: 0 }, k2: { o: 0 } };
      const on = (ids) => Object.assign({}, off, Object.fromEntries(ids.map((i) => [i, { o: 1 }])));
      return { w: 640, h: 330, label: "Two parallel lines cut by a transversal showing corresponding, alternate and co-interior angles", items, steps: [
        { cap: "Two parallel lines are crossed by a third line, called a transversal.", set: { L1: { draw: 1 }, L2: { draw: 1 }, T: { draw: 1 } } },
        { cap: "Corresponding angles are equal. Look for the F shape.", set: on(["cA", "cB", "x1", "x2"]) },
        { cap: "Alternate angles are equal. Look for the Z shape.", set: on(["aA", "aB", "y1", "y2"]) },
        { cap: "Co-interior angles add up to 180°. Look for the C shape.", set: on(["kA", "kB", "k1", "k2"]) }
      ] };
    })(),

    "Angles in polygons": (() => {
      const V = [0, 1, 2, 3, 4].map((k) => [320 + 120 * Math.cos((-90 + 72 * k) * Math.PI / 180), 160 + 120 * Math.sin((-90 + 72 * k) * Math.PI / 180)].map((n) => Math.round(n)));
      const pts = (a) => a.map((v) => v.join(",")).join(" ");
      const items = [g("t1", pts([V[0], V[1], V[2]]), C.blue, "none", { o: 0, "fill-opacity": .55 }), g("t2", pts([V[0], V[2], V[3]]), C.pink, "none", { o: 0, "fill-opacity": .55 }), g("t3", pts([V[0], V[3], V[4]]), C.green, "none", { o: 0, "fill-opacity": .55 }),
        g("pent", pts(V), "rgba(255,255,255,.06)", C.w, { draw: 0, "stroke-width": 4 }), l("d1", V[0][0], V[0][1], V[2][0], V[2][1], C.amber, { draw: 0 }), l("d2", V[0][0], V[0][1], V[3][0], V[3][1], C.amber, { draw: 0 }),
        t("c1", 360, 125, "180°", C.w, { o: 0, "font-size": 18 }), t("c2", 320, 180, "180°", C.w, { o: 0, "font-size": 18 }), t("c3", 280, 125, "180°", C.w, { o: 0, "font-size": 18 }),
        t("sum", 320, 316, "", C.amber, { "font-size": 26 }), t("n", 60, 60, "n = 5", C.w, { "font-size": 26, "text-anchor": "start" })];
      return { w: 640, h: 340, label: "A pentagon split into three triangles", items, steps: [
        { cap: "Take any polygon. This pentagon has n = 5 sides.", set: { pent: { draw: 1 } } },
        { cap: "Draw diagonals from one corner to split it into triangles.", set: { d1: { draw: 1 }, d2: { draw: 1 } } },
        { cap: "A pentagon makes 3 triangles. That is n − 2.", set: { t1: { o: 1 }, t2: { o: 1 }, t3: { o: 1 }, c1: { o: 1 }, c2: { o: 1 }, c3: { o: 1 } } },
        { cap: "Each triangle has angles adding to 180°, so the pentagon's angles add to 3 × 180° = 540°. For any polygon: (n − 2) × 180°.", set: { sum: { t: "(5 − 2) × 180° = 540°" } } }
      ] };
    })(),

    "Straight-line graphs": (() => {
      const items = [l("ax", 100, 260, 400, 260, C.grey, { "stroke-width": 4 }), l("ay", 100, 260, 100, 20, C.grey, { "stroke-width": 4 }), t("xl", 410, 266, "x", C.w, { "text-anchor": "start", "font-size": 18 }), t("yl", 100, 14, "y", C.w, { "font-size": 18 }),
        p("line", "M60 298L200 18", C.blue, "none", { draw: 0, "stroke-width": 5 }), c("ic", 100, 222, 9, C.amber, { o: 0, stroke: "#fff", "stroke-width": 2 }), t("cl", 88, 227, "c = 1", C.amber, { o: 0, "font-size": 20, "text-anchor": "end" }),
        l("run", 100, 222, 138, 222, C.green, { draw: 0 }), l("rise", 138, 222, 138, 146, C.pink, { draw: 0 }), t("r1", 119, 244, "1", C.green, { o: 0, "font-size": 18 }), t("r2", 152, 188, "2", C.pink, { o: 0, "font-size": 18 }),
        t("eq", 500, 120, "y = mx + c", C.w, { "font-size": 36 }), t("eq2", 500, 170, "", C.amber, { "font-size": 30 }), t("eq3", 500, 210, "", C.w, { "font-size": 20 })];
      return { w: 640, h: 310, label: "A straight line graph showing gradient and y-intercept", items, steps: [
        { cap: "A straight line has an equation of the form y = mx + c." },
        { cap: "c is the y-intercept: where the line crosses the y-axis. Here c = 1.", set: { ic: { o: 1 }, cl: { o: 1 }, eq2: { t: "c = 1" } } },
        { cap: "m is the gradient: how far the line goes up for every 1 step across.", set: { line: { draw: 1 }, run: { draw: 1 }, r1: { o: 1 } } },
        { cap: "Across 1, up 2. So the gradient m = 2 and the line is y = 2x + 1.", set: { rise: { draw: 1 }, r2: { o: 1 }, eq2: { t: "m = 2", fill: C.pink }, eq3: { t: "y = 2x + 1" } } }
      ] };
    })(),

    "Solving linear equations": (() => {
      const items = [r("beam", 90, 128, 460, 10, C.w, { rx: 5 }), g("fulc", "320,138 290,200 350,200", C.grey, "none"), r("pl", 100, 196, 210, 8, C.grey, { rx: 4 }), r("pr", 330, 196, 210, 8, C.grey, { rx: 4 }),
        r("x1", 116, 142, 52, 52, C.blue, { rx: 8 }), t("x1t", 142, 178, "x", "#04122e", { "font-size": 30 }), r("x2", 176, 142, 52, 52, C.blue, { rx: 8 }), t("x2t", 202, 178, "x", "#04122e", { "font-size": 30 }),
        r("u1", 240, 168, 26, 26, C.amber, { rx: 5 }), r("u2", 270, 168, 26, 26, C.amber, { rx: 5 }), r("u3", 300, 168, 26, 26, C.amber, { rx: 5, o: 1 }),
        t("rt", 435, 180, "11", C.amber, { "font-size": 52 }), t("eq", 320, 52, "2x + 3 = 11", C.w, { "font-size": 38 }), t("lab", 320, 245, "", C.green, { "font-size": 22 })];
      items.find((i) => i[1] === "u3")[2].x = 280;
      return { w: 640, h: 270, label: "Balance scales showing how to solve 2x + 3 = 11", items, steps: [
        { cap: "The scales balance: 2x + 3 = 11. Whatever we do to one side, we must do to the other." },
        { cap: "Take 3 away from both sides: 2x + 3 − 3 = 11 − 3.", set: { u1: { o: 0 }, u2: { o: 0 }, u3: { o: 0 }, rt: { t: "8" }, eq: { t: "2x = 8" } } },
        { cap: "Now split both sides into 2 equal groups, which means dividing by 2.", set: { x2: { o: 0 }, x2t: { o: 0 }, rt: { t: "4" }, eq: { t: "x = 4" } } },
        { cap: "x = 4. Check by substituting back: 2 × 4 + 3 = 11.", set: { lab: { t: "✓ 2 × 4 + 3 = 11" } } }
      ] };
    })(),

    "Double brackets and quadratics": (() => {
      const items = [r("o", 200, 50, 240, 210, "none", { stroke: C.w, "stroke-width": 3, rx: 2 }), t("tx", 275, 40, "x", C.w), t("t3", 395, 40, "+ 3", C.w), t("lx", 176, 130, "x", C.w), t("l2", 172, 240, "+ 2", C.w),
        r("b1", 200, 50, 150, 150, C.blue, { o: 0, rx: 2 }), r("b2", 350, 50, 90, 150, C.amber, { o: 0, rx: 2 }), r("b3", 200, 200, 150, 60, C.pink, { o: 0, rx: 2 }), r("b4", 350, 200, 90, 60, C.green, { o: 0, rx: 2 }),
        t("a1", 275, 135, "x²", "#04122e", { o: 0, "font-size": 34 }), t("a2", 395, 135, "3x", "#04122e", { o: 0, "font-size": 30 }), t("a3", 275, 240, "2x", "#04122e", { o: 0, "font-size": 30 }), t("a4", 395, 240, "6", "#04122e", { o: 0, "font-size": 30 }),
        t("sum", 320, 300, "", C.amber, { "font-size": 28 }), t("q", 520, 150, "(x + 2)(x + 3)", C.w, { "font-size": 22 })];
      return { w: 640, h: 330, label: "An area model for multiplying (x + 2)(x + 3)", items, steps: [
        { cap: "Expand (x + 2)(x + 3) with an area model: a rectangle with sides x + 3 and x + 2." },
        { cap: "Split it into four smaller rectangles, one for each pair of terms.", set: { b1: { o: 1 }, b2: { o: 1 }, b3: { o: 1 }, b4: { o: 1 } } },
        { cap: "Work out each area: x × x = x², x × 3 = 3x, 2 × x = 2x and 2 × 3 = 6.", set: { a1: { o: 1 }, a2: { o: 1 }, a3: { o: 1 }, a4: { o: 1 } } },
        { cap: "Add the areas and collect like terms: x² + 3x + 2x + 6 = x² + 5x + 6.", set: { sum: { t: "x² + 3x + 2x + 6 = x² + 5x + 6" } } }
      ] };
    })(),

    "SOH CAH TOA": (() => {
      const items = [g("tri", "180,250 480,250 480,90", "rgba(255,255,255,.08)", C.w, { "stroke-width": 4 }), p("ra", "M458 250V228H480", C.w, "none", { "stroke-width": 3 }), p("ang", sec(180, 250, 56, -28, 0), "none", C.amber, { "stroke-width": 0, "fill-opacity": .85 }), t("th", 245, 240, "θ", C.amber, { "font-size": 28 }),
        l("hy", 180, 250, 480, 90, C.green, { o: 0, "stroke-width": 7 }), l("op", 480, 250, 480, 90, C.pink, { o: 0, "stroke-width": 7 }), l("ad", 180, 250, 480, 250, C.amber, { o: 0, "stroke-width": 7 }),
        t("H", 318, 148, "Hypotenuse (H)", C.green, { o: 0, "font-size": 20, rot: -28, ox: 318, oy: 148 }), t("O", 560, 176, "Opposite (O)", C.pink, { o: 0, "font-size": 20 }), t("Ad", 330, 282, "Adjacent (A)", C.amber, { o: 0, "font-size": 20 }),
        t("f1", 20, 40, "", C.w, { "text-anchor": "start", "font-size": 24 }), t("f2", 20, 74, "", C.w, { "text-anchor": "start", "font-size": 24 }), t("f3", 20, 108, "", C.w, { "text-anchor": "start", "font-size": 28 })];
      return { w: 640, h: 310, label: "A right-angled triangle with hypotenuse, opposite and adjacent labelled", items, steps: [
        { cap: "A right-angled triangle. Pick one of the other two angles and call it θ." },
        { cap: "The hypotenuse is the longest side. It is always opposite the right angle.", set: { hy: { o: 1 }, H: { o: 1 } } },
        { cap: "The opposite side is across from θ.", set: { op: { o: 1 }, O: { o: 1 } } },
        { cap: "The adjacent side is next to θ (and is not the hypotenuse).", set: { ad: { o: 1 }, Ad: { o: 1 } } },
        { cap: "SOH CAH TOA gives the three ratios to remember.", set: { f1: { t: "SOH: sin θ = O ÷ H" }, f2: { t: "CAH: cos θ = A ÷ H" }, f3: { t: "TOA: tan θ = O ÷ A" } } },
        { cap: "Example: if O = 3 and H = 5 then sin θ = 3 ÷ 5 = 0.6, so θ = sin⁻¹(0.6) ≈ 36.9°.", set: { f1: { fill: C.amber } } }
      ] };
    })(),

    "Circle theorems": (() => {
      const O = [320, 170], R = 120, pt = (a) => [O[0] + R * Math.cos(a * Math.PI / 180), O[1] + R * Math.sin(a * Math.PI / 180)].map((n) => Math.round(n));
      const A = pt(215), B = pt(325), C1 = pt(90), C2 = pt(150);
      const items = [c("circ", O[0], O[1], R, "rgba(255,255,255,.05)", { stroke: C.w, "stroke-width": 4 }), l("OA", O[0], O[1], A[0], A[1], C.green, { draw: 0 }), l("OB", O[0], O[1], B[0], B[1], C.green, { draw: 0 }), l("AB", A[0], A[1], B[0], B[1], C.grey, { "stroke-width": 3, "stroke-dasharray": "6 6" }),
        l("CA", C1[0], C1[1], A[0], A[1], C.amber, { draw: 0 }), l("CB", C1[0], C1[1], B[0], B[1], C.amber, { draw: 0 }), c("pO", O[0], O[1], 6, C.w), c("pA", A[0], A[1], 7, C.blue), c("pB", B[0], B[1], 7, C.blue), c("pC", C1[0], C1[1], 8, C.amber, { o: 0 }),
        t("tA", A[0] - 18, A[1] - 10, "A", C.w, { "font-size": 20 }), t("tB", B[0] + 18, B[1] - 10, "B", C.w, { "font-size": 20 }), t("tO", O[0] + 2, O[1] + 24, "O", C.w, { "font-size": 20 }), t("tC", C1[0], C1[1] + 28, "C", C.w, { "font-size": 20, o: 0 }),
        t("a2x", 320, 140, "2x", C.green, { o: 0, "font-size": 26 }), t("ax", 320, 262, "x", C.amber, { o: 0, "font-size": 26 }), t("rule", 320, 322, "", C.w, { "font-size": 22 })];
      return { w: 640, h: 340, label: "A circle showing the angle at the centre is twice the angle at the circumference", items, steps: [
        { cap: "Take two points A and B on a circle, and the centre O. Join them to make the angle at the centre.", set: { OA: { draw: 1 }, OB: { draw: 1 } } },
        { cap: "Now choose a point C on the circumference and join it to A and B.", set: { pC: { o: 1 }, tC: { o: 1 }, CA: { draw: 1 }, CB: { draw: 1 } } },
        { cap: "The angle at the centre is twice the angle at the circumference: angle AOB = 2 × angle ACB.", set: { a2x: { o: 1 }, ax: { o: 1 }, rule: { t: "Angle at the centre = 2 × angle at the circumference" } } },
        { cap: "Slide C round the major arc. The angle at C stays x. Angles in the same segment are equal.", set: { pC: { cx: C2[0], cy: C2[1] }, tC: { x: C2[0] - 6, y: C2[1] + 28 }, CA: { x1: C2[0], y1: C2[1] }, CB: { x1: C2[0], y1: C2[1] }, ax: { x: C2[0] + 30, y: C2[1] - 8 } } }
      ] };
    })(),

    "Tree diagrams": (() => {
      const S = [70, 160], N1 = [[260, 70], [260, 250]], N2 = [[430, 30], [430, 110], [430, 210], [430, 290]], br = (id, a, b, col, o) => l(id, a[0], a[1], b[0], b[1], col || C.grey, { draw: 0, "stroke-width": 4 });
      const items = [br("b1", S, N1[0]), br("b2", S, N1[1]), br("b3", N1[0], N2[0]), br("b4", N1[0], N2[1]), br("b5", N1[1], N2[2]), br("b6", N1[1], N2[3])];
      const lab = (id, a, b, s, dx, dy) => t(id, (a[0] + b[0]) / 2 + (dx || 0), (a[1] + b[1]) / 2 + (dy || 0), s, C.w, { "font-size": 18, o: 0 });
      items.push(lab("p1", S, N1[0], "R 0.4", -26, -10), lab("p2", S, N1[1], "B 0.6", -26, 22), lab("p3", N1[0], N2[0], "R 0.4", -6, -14), lab("p4", N1[0], N2[1], "B 0.6", -6, 22), lab("p5", N1[1], N2[2], "R 0.4", -6, -14), lab("p6", N1[1], N2[3], "B 0.6", -6, 22));
      [["RR", "0.4 × 0.4 = 0.16"], ["RB", "0.4 × 0.6 = 0.24"], ["BR", "0.6 × 0.4 = 0.24"], ["BB", "0.6 × 0.6 = 0.36"]].forEach((o, i) => items.push(t("o" + i, 444, N2[i][1] + 5, o[0] + "  " + o[1], C.w, { "text-anchor": "start", "font-size": 15, o: 0 })));
      return { w: 640, h: 330, label: "A two-stage probability tree diagram", items, steps: [
        { cap: "A tree diagram shows every outcome. Each branch is labelled with its probability: P(red) = 0.4 and P(blue) = 0.6.", set: { b1: { draw: 1 }, b2: { draw: 1 }, p1: { o: 1 }, p2: { o: 1 } } },
        { cap: "Add the second event on every branch. (Here the first counter is put back, so the probabilities stay the same.)", set: { b3: { draw: 1 }, b4: { draw: 1 }, b5: { draw: 1 }, b6: { draw: 1 }, p3: { o: 1 }, p4: { o: 1 }, p5: { o: 1 }, p6: { o: 1 } } },
        { cap: "Multiply along the branches for one outcome: P(red then blue) = 0.4 × 0.6 = 0.24.", set: { o0: { o: 1 }, o1: { o: 1, fill: C.amber }, o2: { o: 1 }, o3: { o: 1 }, b1: { stroke: C.amber }, b4: { stroke: C.amber } } },
        { cap: "For ‘one of each colour’, add the two outcomes: 0.24 + 0.24 = 0.48. All four outcomes add up to 1.", set: { o2: { fill: C.amber }, b2: { stroke: C.amber }, b5: { stroke: C.amber } } }
      ] };
    })(),

    "Averages and range": (() => {
      const D = [2, 3, 3, 5, 7], X = (i) => 130 + i * 90, items = [l("base", 80, 260, 580, 260, C.grey, { "stroke-width": 4 })];
      D.forEach((v, i) => { items.push(r("b" + i, X(i), 260 - v * 30, 56, v * 30, C.blue, { rx: 8 })); items.push(t("v" + i, X(i) + 28, 250 - v * 30, "" + v, C.w, { "font-size": 22 })); });
      items.push(l("rg", 104, 50, 104, 200, C.pink, { draw: 0 }), t("rt", 98, 130, "range 5", C.pink, { "text-anchor": "end", "font-size": 18, o: 0 }), l("mn", 80, 140, 560, 140, C.green, { draw: 0 }), t("mt", 632, 134, "mean 4", C.green, { "text-anchor": "end", "font-size": 18, o: 0 }), t("lab", 320, 24, "2, 3, 3, 5, 7", C.w, { "font-size": 26 }));
      return { w: 640, h: 290, label: "A bar chart showing the mode, median, range and mean of a data set", items, steps: [
        { cap: "Here is a data set, already in order: 2, 3, 3, 5, 7." },
        { cap: "The mode is the most common value. 3 appears twice, so the mode is 3.", set: { b1: { fill: C.pink }, b2: { fill: C.pink }, lab: { t: "Mode = 3" } } },
        { cap: "The median is the middle value of the ordered list. The middle of five numbers is the third one: 3.", set: { b1: { fill: C.blue }, b2: { fill: C.amber }, lab: { t: "Median = 3" } } },
        { cap: "The range is the biggest minus the smallest: 7 − 2 = 5.", set: { b2: { fill: C.blue }, rg: { draw: 1 }, rt: { o: 1 }, lab: { t: "Range = 7 − 2 = 5" } } },
        { cap: "The mean adds everything up and shares it out equally: (2 + 3 + 3 + 5 + 7) ÷ 5 = 20 ÷ 5 = 4.", set: { mn: { draw: 1 }, mt: { o: 1 }, lab: { t: "Mean = 20 ÷ 5 = 4" } } }
      ] };
    })(),

    "Vectors": (() => {
      const O = [120, 240], a = [280, 140], b = [440, 180], items = [p("a", arrow(O[0], O[1], a[0], a[1]), C.blue, "none", { draw: 0, "stroke-width": 6 }), p("b", arrow(a[0], a[1], b[0], b[1]), C.pink, "none", { draw: 0, "stroke-width": 6 }), p("r", arrow(O[0], O[1], b[0], b[1]), C.green, "none", { draw: 0, "stroke-width": 6 }), p("n", arrow(560, 70, 400, 170), C.purple, "none", { draw: 0, "stroke-width": 6 }),
        c("o", O[0], O[1], 7, C.w), t("ta", 180, 170, "a", C.blue, { o: 0, "font-size": 28 }), t("tb", 372, 146, "b", C.pink, { o: 0, "font-size": 28 }), t("tr", 300, 238, "a + b", C.green, { o: 0, "font-size": 28 }), t("tn", 500, 100, "−a", C.purple, { o: 0, "font-size": 28 }), t("lab", 320, 30, "", C.w, { "font-size": 24 })];
      return { w: 640, h: 300, label: "Vector addition head to tail", items, steps: [
        { cap: "A vector has a size and a direction. Here is the vector a.", set: { a: { draw: 1 }, ta: { o: 1 } } },
        { cap: "To add vectors, join them head to tail. Here b starts where a finishes.", set: { b: { draw: 1 }, tb: { o: 1 } } },
        { cap: "The resultant a + b goes straight from the start of the first to the end of the last.", set: { r: { draw: 1 }, tr: { o: 1 }, lab: { t: "a + b" } } },
        { cap: "Subtracting a vector means adding its opposite. −a has the same length as a but points the other way.", set: { n: { draw: 1 }, tn: { o: 1 }, lab: { t: "−a is the opposite of a" } } }
      ] };
    })(),

    "Transformations": (() => {
      const base = "230,130 290,130 230,210", tri = (id, pts, col, o, x) => g(id, pts, col, C.w, Object.assign({ o, "fill-opacity": .8 }, x));
      const items = [l("mir", 320, 40, 320, 300, C.grey, { o: 0, "stroke-dasharray": "8 8" }), c("cen", 320, 180, 6, C.w, { o: 0 }),
        tri("tb", base, C.blue, 1), tri("tr", "410,130 350,130 410,210", C.pink, 0), tri("tt", base, C.green, 0, { rot: 0, ox: 320, oy: 180 }), tri("tl", base, C.amber, 0, { tx: 0, ty: 0 }), tri("te", base, C.purple, 0, { sc: 1, ox: 230, oy: 130 }), t("lab", 320, 28, "Original shape", C.w, { "font-size": 24 })];
      return { w: 640, h: 330, label: "A triangle being reflected, rotated, translated and enlarged", items, steps: [
        { cap: "A transformation changes a shape’s position or size. Here is the original shape in blue." },
        { cap: "Reflection: flip the shape over a mirror line. Each point ends up the same distance from the line, on the other side.", set: { mir: { o: 1 }, tr: { o: 1 }, lab: { t: "Reflection in a mirror line" } } },
        { cap: "Rotation: turn the shape by an angle about a centre. This one turns 90° clockwise about the marked point.", set: { mir: { o: 0 }, tr: { o: 0 }, cen: { o: 1 }, tt: { o: 1, rot: 90 }, lab: { t: "Rotation 90° clockwise about a centre" } } },
        { cap: "Translation: slide the shape without turning it. It is described by a vector, such as 3 right and 1 down.", set: { tt: { o: 0 }, cen: { o: 0 }, tl: { o: 1, tx: 150, ty: 40 }, lab: { t: "Translation by a vector" } } },
        { cap: "Enlargement: multiply every length by a scale factor from a centre. Scale factor 2 makes it twice as big.", set: { tl: { o: 0 }, te: { o: 1, sc: 2 }, lab: { t: "Enlargement, scale factor 2" } } }
      ] };
    })(),

    "Interest, growth and decay": (() => {
      const V = [100, 110, 121, 133.1], X = (i) => 110 + i * 120, items = [l("base", 60, 290, 580, 290, C.grey, { "stroke-width": 4 })];
      V.forEach((v, i) => { items.push(r("b" + i, X(i), 290 - v * 1.4, 80, v * 1.4, C.green, { rx: 8, o: i ? 0 : 1 })); items.push(t("v" + i, X(i) + 40, 280 - v * 1.4, "£" + (i === 3 ? "133.10" : v), C.w, { "font-size": 22, o: i ? 0 : 1 })); items.push(t("y" + i, X(i) + 40, 314, "Year " + i, C.grey, { "font-size": 16 })); });
      items.push(t("f", 320, 34, "", C.amber, { "font-size": 26 }));
      return { w: 640, h: 330, label: "Bars showing 100 pounds growing at 10 percent compound interest", items, steps: [
        { cap: "Compound interest means the interest is added to the total, and then earns interest too. Start with £100 at 10% a year.", set: { f: { t: "£100 × 1.1 each year" } } },
        { cap: "After 1 year: 100 × 1.1 = £110.", set: { b1: { o: 1 }, v1: { o: 1 } } },
        { cap: "After 2 years: 110 × 1.1 = £121. The increase is bigger than last year because interest earns interest.", set: { b2: { o: 1 }, v2: { o: 1 } } },
        { cap: "After n years the total is 100 × 1.1ⁿ. After 3 years: 100 × 1.1³ = £133.10. For decay use a multiplier below 1, such as 0.9.", set: { b3: { o: 1 }, v3: { o: 1 }, f: { t: "Amount = 100 × 1.1ⁿ" } } }
      ] };
    })(),

    "Direct and inverse proportion": (() => {
      const items = [l("ax1", 50, 260, 270, 260, C.grey, { "stroke-width": 3 }), l("ay1", 50, 260, 50, 40, C.grey, { "stroke-width": 3 }), l("ax2", 360, 260, 580, 260, C.grey, { "stroke-width": 3 }), l("ay2", 360, 260, 360, 40, C.grey, { "stroke-width": 3 }),
        p("d", "M50 260L250 70", C.blue, "none", { draw: 0, "stroke-width": 5 }), p("i", "M375 50C390 190 440 238 575 250", C.pink, "none", { draw: 0, "stroke-width": 5 }),
        t("d1", 160, 292, "Direct: y = kx", C.blue, { "font-size": 20, o: 0 }), t("i1", 470, 292, "Inverse: y = k ÷ x", C.pink, { "font-size": 20, o: 0 }), t("note", 320, 26, "", C.w, { "font-size": 22 })];
      return { w: 640, h: 310, label: "A straight line graph for direct proportion and a curve for inverse proportion", items, steps: [
        { cap: "Direct proportion: when one quantity doubles, so does the other. The graph is a straight line through the origin: y = kx.", set: { d: { draw: 1 }, d1: { o: 1 } } },
        { cap: "Inverse proportion: when one quantity doubles, the other halves. The graph is a curve that never touches the axes: y = k ÷ x.", set: { i: { draw: 1 }, i1: { o: 1 } } },
        { cap: "A quick check: in direct proportion y ÷ x is always the same. In inverse proportion x × y is always the same.", set: { note: { t: "Direct: y ÷ x constant · Inverse: x × y constant" } } }
      ] };
    })(),

    "Standard form": (() => {
      const dig = ["4", "5", "0", "0", "0"], X = (i) => 200 + i * 50, items = dig.map((d, i) => t("d" + i, X(i), 150, d, C.w, { "font-size": 64 }));
      items.push(c("pt", 454, 168, 7, C.amber), t("ans", 320, 245, "", C.amber, { "font-size": 36 }), t("lab", 320, 44, "45 000", C.w, { "font-size": 28 }), p("arc", "M454 120Q340 40 228 120", C.pink, "none", { draw: 0 }), t("hop", 340, 78, "4 places", C.pink, { o: 0, "font-size": 20 }));
      return { w: 640, h: 290, label: "Moving a decimal point to write 45000 in standard form", items, steps: [
        { cap: "Standard form writes a number as A × 10ⁿ, where A is at least 1 but less than 10, and n is a whole number." },
        { cap: "Move the decimal point so it sits just after the first non-zero digit. That gives A = 4.5.", set: { pt: { cx: 228 }, arc: { draw: 1 }, hop: { o: 1 }, d2: { o: .25 }, d3: { o: .25 }, d4: { o: .25 }, lab: { t: "4.5" } } },
        { cap: "The point moved 4 places left, so the power is +4: 45 000 = 4.5 × 10⁴.", set: { ans: { t: "45 000 = 4.5 × 10⁴" }, lab: { t: "Moved 4 places" } } },
        { cap: "For very small numbers the power is negative: 0.0032 = 3.2 × 10⁻³ (the point moves 3 places right).", set: { ans: { t: "0.0032 = 3.2 × 10⁻³" }, lab: { t: "Small numbers: negative power" } } }
      ] };
    })()
  });
})();
