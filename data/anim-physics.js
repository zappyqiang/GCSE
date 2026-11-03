/* Animated explainers and simulations for Physics. */
(function () {
  const { c, r, l, t, p, g, sec, arrow, COL: C } = ANIM.h;
  const sine = (x0, x1, y, amp, wl) => { let d = ""; for (let x = x0; x <= x1; x += 4) d += (x === x0 ? "M" : "L") + x + " " + (y - amp * Math.sin((x - x0) / wl * 2 * Math.PI)).toFixed(1); return d; };
  const cart = (id, x, y, col) => [r(id + "b", x, y, 90, 34, col, { rx: 8 }), c(id + "w1", x + 20, y + 40, 12, C.grey, { stroke: "#fff", "stroke-width": 3 }), c(id + "w2", x + 70, y + 40, 12, C.grey, { stroke: "#fff", "stroke-width": 3 })];
  const mv = (id, tx) => ({ [id + "b"]: { tx }, [id + "w1"]: { tx }, [id + "w2"]: { tx } });

  GAME.explain({
    "Energy stores and transfers": (() => {
      const items = [l("gnd", 60, 270, 360, 270, C.grey, { "stroke-width": 5 }), c("ball", 210, 250, 18, C.amber, { stroke: "#fff", "stroke-width": 3 }), p("up", arrow(300, 240, 300, 80), C.grey, "none", { "stroke-width": 3, o: .5 }),
        r("ke", 450, 120, 54, 140, C.pink, { rx: 6 }), r("gp", 540, 260, 54, 0, C.blue, { rx: 6 }), t("kl", 477, 288, "Kinetic", C.pink, { "font-size": 16 }), t("gl", 567, 288, "Gravitational", C.blue, { "font-size": 15 }), l("gb", 430, 262, 610, 262, C.grey, { "stroke-width": 3 }),
        t("lab", 320, 30, "Thrown upwards", C.w, { "font-size": 24 }), t("tot", 520, 70, "Total stays the same", C.green, { "font-size": 19, o: 0 })];
      return { w: 640, h: 310, label: "A ball thrown upward showing energy moving between kinetic and gravitational stores", items, steps: [
        { cap: "Throw a ball upwards. Just after release it has lots of kinetic energy (movement) and no extra gravitational energy." },
        { cap: "As it rises it slows down. Energy transfers from the kinetic store to the gravitational potential store.", set: { ball: { cy: 150 }, ke: { y: 190, height: 70 }, gp: { y: 190, height: 70 }, lab: { t: "Rising" } } },
        { cap: "At the top it stops for a moment. All the energy is now in the gravitational store.", set: { ball: { cy: 60 }, ke: { y: 260, height: 0 }, gp: { y: 120, height: 140 }, lab: { t: "At the top" } } },
        { cap: "On the way down it transfers back. The total never changes: energy is conserved (ignoring air resistance).", set: { ball: { cy: 250 }, ke: { y: 120, height: 140 }, gp: { y: 260, height: 0 }, lab: { t: "Falling", fill: C.w }, tot: { o: 1 } } }
      ] };
    })(),

    "Series and parallel circuits": (() => {
      const bulb = (id, x, y) => [c(id, x, y, 17, "#1c2248", { stroke: C.amber, "stroke-width": 4 }), l(id + "x1", x - 11, y - 11, x + 11, y + 11, C.amber, { "stroke-width": 3 }), l(id + "x2", x + 11, y - 11, x - 11, y + 11, C.amber, { "stroke-width": 3 })];
      const items = [p("s", "M60 70H290V210H60Z", C.grey, "none", { draw: 0 }), p("q", "M360 70H600V210H360Z", C.grey, "none", { draw: 0 }), p("q1", "M480 70V210", C.grey, "none", { draw: 0 }), p("q2", "M540 70V210", C.grey, "none", { draw: 0 }),
        l("sb1", 46, 126, 74, 126, C.amber, { "stroke-width": 7, o: 0 }), l("sb2", 53, 154, 67, 154, C.amber, { "stroke-width": 7, o: 0 }), l("pb1", 346, 126, 374, 126, C.amber, { "stroke-width": 7, o: 0 }), l("pb2", 353, 154, 367, 154, C.amber, { "stroke-width": 7, o: 0 })]
        .concat(bulb("sa", 175, 70), bulb("sc", 290, 140), bulb("pa", 480, 140), bulb("pc", 540, 140));
      ["sa", "sc", "pa", "pc"].forEach((k) => items.forEach((it) => { if (it[1].startsWith(k)) it[2].o = 0; }));
      items.push(t("ts", 175, 30, "Series", C.w, { "font-size": 24 }), t("tp", 480, 30, "Parallel", C.w, { "font-size": 24 }), t("i1", 175, 108, "2 A", C.green, { o: 0 }), t("i2", 330, 146, "2 A", C.green, { o: 0, "text-anchor": "start" }), t("i3", 85, 98, "2 A", C.green, { o: 0 }),
        t("v1", 175, 108, "3 V", C.pink, { o: 0 }), t("v2", 335, 146, "3 V", C.pink, { o: 0, "text-anchor": "start" }), t("pv1", 480, 108, "6 V", C.pink, { o: 0 }), t("pv2", 540, 108, "6 V", C.pink, { o: 0 }),
        t("pi1", 420, 55, "6 A", C.green, { o: 0 }), t("pi2", 480, 190, "3 A", C.green, { o: 0 }), t("pi3", 540, 190, "3 A", C.green, { o: 0 }), t("note", 320, 262, "", C.w, { "font-size": 20 }));
      const show = (ids) => Object.fromEntries(ids.map((i) => [i, { o: 1 }]));
      const bulbIds = (k) => [k, k + "x1", k + "x2"];
      return { w: 640, h: 290, label: "A series circuit and a parallel circuit", items, steps: [
        { cap: "In a series circuit there is just one loop. The same current flows through every component.", set: Object.assign({ s: { draw: 1 } }, show(["sb1", "sb2", ...bulbIds("sa"), ...bulbIds("sc"), "i1", "i2", "i3"]), { note: { t: "Series: current is the same everywhere" } }) },
        { cap: "The battery's voltage is shared between the components: 6 V splits into 3 V + 3 V. Add more bulbs and each gets less.", set: { i1: { o: 0 }, i2: { o: 0 }, i3: { o: 0 }, v1: { o: 1 }, v2: { o: 1 }, note: { t: "Series: voltage is shared" } } },
        { cap: "In a parallel circuit each branch is its own loop. Every branch gets the full 6 V, and a bulb keeps working if another breaks.", set: Object.assign({ q: { draw: 1 }, q1: { draw: 1 }, q2: { draw: 1 }, v1: { o: 0 }, v2: { o: 0 } }, show(["pb1", "pb2", ...bulbIds("pa"), ...bulbIds("pc"), "pv1", "pv2"]), { note: { t: "Parallel: voltage is the same across each branch" } }) },
        { cap: "The current splits at the junction and joins up again: 3 A + 3 A = 6 A from the battery.", set: Object.assign({ pv1: { o: 0 }, pv2: { o: 0 }, note: { t: "Parallel: branch currents add up" } }, show(["pi1", "pi2", "pi3"])) }
      ] };
    })(),

    "Ohm's law and resistance": { sim: "circuit", cap: "Drag the voltage and resistance sliders. Current = voltage ÷ resistance (I = V ÷ R). More resistance means less current. More voltage means more current, and a brighter bulb." },
    "Half-life": { sim: "decay", cap: "Each nucleus decays at random, but about half of the radioactive nuclei are left after every half-life. Change the half-life and press restart. The dashed line is the ideal curve." },
    "Wave properties and speed": { sim: "wave", cap: "Change the amplitude, wavelength and frequency. Wave speed = frequency × wavelength (v = fλ). The red dots show how the medium itself only moves up and down: the wave carries energy, not matter." },
    "Particle motion in gases": { sim: "gas", cap: "Gas particles move randomly and bounce off the walls. Heating them makes them move faster, so they hit the wall harder and more often: the pressure goes up." },
    "Gas pressure and volume": { sim: "gas", cap: "Squeeze the volume smaller and the particles hit the walls more often, so the pressure rises. For a fixed mass at constant temperature, pressure × volume stays constant." },

    "Changes of state": (() => {
      const items = [l("ax", 60, 270, 600, 270, C.grey, { "stroke-width": 4 }), l("ay", 60, 270, 60, 20, C.grey, { "stroke-width": 4 }), t("xl", 330, 300, "Energy supplied (heating time)", C.grey, { "font-size": 16 }), t("yl", 36, 150, "Temp", C.grey, { "font-size": 16, rot: -90, ox: 36, oy: 150 }),
        l("s1", 60, 250, 140, 200, C.blue, { draw: 0, "stroke-width": 6 }), l("m", 140, 200, 250, 200, C.amber, { draw: 0, "stroke-width": 6 }), l("s2", 250, 200, 330, 120, C.green, { draw: 0, "stroke-width": 6 }), l("b", 330, 120, 450, 120, C.pink, { draw: 0, "stroke-width": 6 }), l("s3", 450, 120, 540, 50, C.purple, { draw: 0, "stroke-width": 6 }),
        t("l1", 100, 232, "solid", C.blue, { o: 0, "font-size": 18 }), t("l2", 195, 188, "melting", C.amber, { o: 0, "font-size": 18 }), t("l3", 275, 140, "liquid", C.green, { o: 0, "font-size": 18 }), t("l4", 390, 108, "boiling", C.pink, { o: 0, "font-size": 18 }), t("l5", 520, 90, "gas", C.purple, { o: 0, "font-size": 18 })];
      return { w: 640, h: 320, label: "A heating curve showing melting and boiling plateaus", items, steps: [
        { cap: "Heat a solid and its temperature rises as the particles vibrate faster.", set: { s1: { draw: 1 }, l1: { o: 1 } } },
        { cap: "At the melting point the temperature stays flat. The energy is used to break the bonds between particles, not to speed them up.", set: { m: { draw: 1 }, l2: { o: 1 } } },
        { cap: "Once it is all liquid, the temperature rises again.", set: { s2: { draw: 1 }, l3: { o: 1 } } },
        { cap: "At the boiling point the temperature stays flat again while the liquid turns into a gas.", set: { b: { draw: 1 }, l4: { o: 1 } } },
        { cap: "The gas then heats up. Energy supplied to change state changes internal energy but not temperature (latent heat).", set: { s3: { draw: 1 }, l5: { o: 1 } } }
      ] };
    })(),

    "Resultant forces": (() => {
      const items = [r("box", 260, 130, 120, 80, C.blue, { rx: 10 }), t("bt", 320, 178, "Box", "#04122e", { "font-size": 24 }), l("gnd", 60, 214, 580, 214, C.grey, { "stroke-width": 4 }),
        p("fr", arrow(380, 170, 520, 170), C.green, "none", { draw: 0, "stroke-width": 7 }), p("fl", arrow(260, 170, 200, 170), C.pink, "none", { draw: 0, "stroke-width": 7 }), t("frt", 450, 150, "10 N", C.green, { o: 0 }), t("flt", 225, 150, "4 N", C.pink, { o: 0 }),
        p("res", arrow(320, 250, 400, 250), C.amber, "none", { draw: 0, "stroke-width": 7 }), t("rt", 320, 290, "", C.amber, { "font-size": 22 }), t("hd", 320, 40, "", C.w, { "font-size": 24 })];
      return { w: 640, h: 310, label: "A box with two forces acting and the resultant force", items, steps: [
        { cap: "Two forces act on the box: 10 N to the right and 4 N to the left.", set: { fr: { draw: 1 }, fl: { draw: 1 }, frt: { o: 1 }, flt: { o: 1 }, hd: { t: "Unbalanced forces" } } },
        { cap: "The resultant force is the single force with the same effect. Forces in opposite directions subtract: 10 − 4 = 6 N to the right. The box accelerates right.", set: { res: { draw: 1 }, rt: { t: "Resultant = 10 − 4 = 6 N to the right" } } },
        { cap: "If the left force grows to 10 N the forces are balanced. The resultant is 0 N, so the box stays at rest or keeps a constant velocity.", set: { fl: { d: arrow(260, 170, 120, 170) }, flt: { t: "10 N" }, res: { o: 0 }, rt: { t: "Resultant = 10 − 10 = 0 N", fill: C.green }, hd: { t: "Balanced forces" } } }
      ] };
    })(),

    "Motion graphs and acceleration": (() => {
      const items = [l("a1", 50, 260, 280, 260, C.grey, { "stroke-width": 3 }), l("a2", 50, 260, 50, 40, C.grey, { "stroke-width": 3 }), t("t1", 165, 290, "Distance–time", C.w, { "font-size": 18 }), t("t1b", 50, 30, "distance", C.grey, { "font-size": 14 }),
        l("b1", 360, 260, 590, 260, C.grey, { "stroke-width": 3 }), l("b2", 360, 260, 360, 40, C.grey, { "stroke-width": 3 }), t("t2", 475, 290, "Velocity–time", C.w, { "font-size": 18 }), t("t2b", 360, 30, "velocity", C.grey, { "font-size": 14 }),
        l("d1", 50, 260, 260, 110, C.blue, { draw: 0, "stroke-width": 5 }), p("d2", "M50 260Q170 255 260 60", C.pink, "none", { draw: 0, "stroke-width": 5 }), l("v1", 360, 260, 560, 110, C.green, { draw: 0, "stroke-width": 5 }),
        g("area", "360,260 560,260 560,110", C.green, "none", { o: 0, "fill-opacity": .35 }), t("n1", 190, 100, "", C.w, { "font-size": 20 }), t("n2", 470, 190, "", C.w, { "font-size": 20, "text-anchor": "start" })];
      return { w: 640, h: 310, label: "Distance-time and velocity-time graphs", items, steps: [
        { cap: "On a distance–time graph, a straight line means constant speed. The gradient of the line is the speed.", set: { d1: { draw: 1 }, n1: { t: "gradient = speed", fill: C.blue } } },
        { cap: "A curve that gets steeper means the object is speeding up: it is accelerating.", set: { d2: { draw: 1 }, n1: { t: "steeper = faster", fill: C.pink } } },
        { cap: "On a velocity–time graph, a straight sloping line means constant acceleration. The gradient is the acceleration.", set: { v1: { draw: 1 }, n2: { t: "gradient = acceleration", fill: C.green } } },
        { cap: "The area under a velocity–time graph is the distance travelled.", set: { area: { o: 1 }, n2: { t: "area = distance", fill: C.amber } } }
      ] };
    })(),

    "Newton's laws": (() => {
      const items = [l("gnd", 40, 232, 600, 232, C.grey, { "stroke-width": 4 })].concat(cart("c", 80, 168, C.blue), [p("F", arrow(80, 185, 30, 185), C.pink, "none", { o: 0, "stroke-width": 7 }), t("ft", 56, 160, "F", C.pink, { o: 0 })],
        [r("p1", 270, 150, 60, 80, C.blue, { rx: 8, o: 0 }), r("p2", 340, 150, 60, 80, C.pink, { rx: 8, o: 0 }), p("pa", arrow(300, 190, 220, 190), C.blue, "none", { o: 0, "stroke-width": 6 }), p("pb", arrow(370, 190, 450, 190), C.pink, "none", { o: 0, "stroke-width": 6 }), t("pl", 335, 120, "", C.w, { "font-size": 22 })], [t("hd", 320, 40, "", C.w, { "font-size": 26 })]);
      items.find((i) => i[1] === "F")[2].d = arrow(80, 185, 30, 185);
      return { w: 640, h: 290, label: "Cartoon carts showing Newton's three laws", items, steps: [
        { cap: "First law: an object stays at rest, or keeps moving at a constant velocity, unless a resultant force acts on it. With no resultant force this cart keeps gliding.", set: Object.assign({ hd: { t: "Law 1: no resultant force, no change" } }, mv("c", 300)) },
        { cap: "Second law: a resultant force makes an object accelerate. F = m × a. A bigger force, or a smaller mass, gives a bigger acceleration.", set: Object.assign({ hd: { t: "Law 2: F = m × a" }, F: { o: 1, d: arrow(100, 185, 160, 185) }, ft: { o: 1, x: 130 } }, mv("c", 0)) },
        { cap: "Third law: when two objects interact, they exert equal and opposite forces on each other. Two skaters pushing apart feel the same size force.", set: Object.assign({ hd: { t: "Law 3: equal and opposite" }, F: { o: 0 }, ft: { o: 0 }, p1: { o: 1 }, p2: { o: 1 }, pa: { o: 1 }, pb: { o: 1 }, pl: { t: "Force on A = − Force on B" } }, { cb: { o: 0 }, cw1: { o: 0 }, cw2: { o: 0 } }) }
      ] };
    })(),

    "Reflection and refraction": (() => {
      const items = [l("mir", 40, 230, 300, 230, C.w, { "stroke-width": 7 }), l("n1", 170, 70, 170, 260, C.grey, { "stroke-width": 2, "stroke-dasharray": "6 6" }), l("in", 70, 70, 170, 230, C.amber, { draw: 0 }), l("re", 170, 230, 270, 70, C.pink, { draw: 0 }), t("ti", 130, 140, "i", C.amber, { o: 0 }), t("tr", 215, 140, "r", C.pink, { o: 0 }),
        r("blk", 350, 150, 250, 110, "rgba(120,200,255,.3)", { stroke: C.blue, "stroke-width": 3, rx: 4 }), l("n2", 450, 60, 450, 260, C.grey, { "stroke-width": 2, "stroke-dasharray": "6 6" }), l("in2", 380, 50, 450, 150, C.amber, { draw: 0 }), l("rf", 450, 150, 490, 260, C.green, { draw: 0 }), t("ti2", 408, 108, "i", C.amber, { o: 0 }), t("tr2", 470, 205, "r", C.green, { o: 0 }),
        t("c1", 170, 30, "Reflection", C.w, { "font-size": 22 }), t("c2", 470, 30, "Refraction into glass", C.w, { "font-size": 22 }), t("note", 320, 298, "", C.w, { "font-size": 20 })];
      return { w: 640, h: 320, label: "A ray reflecting from a mirror and refracting into glass", items, steps: [
        { cap: "Reflection: a ray hits a mirror. The normal is a line at right angles to the surface.", set: { in: { draw: 1 } } },
        { cap: "The ray reflects. The angle of incidence equals the angle of reflection: i = r.", set: { re: { draw: 1 }, ti: { o: 1 }, tr: { o: 1 }, note: { t: "Angle of incidence = angle of reflection" } } },
        { cap: "Refraction: light slows down when it enters a denser material such as glass, so it changes direction.", set: { in2: { draw: 1 }, note: { t: "" } } },
        { cap: "Going into glass it bends towards the normal. Coming out into air it bends away from the normal.", set: { rf: { draw: 1 }, ti2: { o: 1 }, tr2: { o: 1 }, note: { t: "Into a denser material: bends towards the normal" } } }
      ] };
    })(),

    "Transformers": (() => {
      const items = [r("core", 150, 60, 340, 200, "none", { stroke: C.grey, "stroke-width": 26, rx: 6 }), r("cp", 138, 110, 24, 100, "none", { stroke: C.amber, "stroke-width": 24, "stroke-dasharray": "5 7", rx: 0 }), r("cs", 478, 110, 24, 100, "none", { stroke: C.pink, "stroke-width": 24, "stroke-dasharray": "5 7", rx: 0 }),
        t("np", 84, 164, "Primary", C.amber, { "font-size": 17 }), t("ns", 556, 164, "Secondary", C.pink, { "font-size": 17 }), t("npn", 84, 186, "100 turns", C.amber, { "font-size": 15 }), t("nsn", 556, 186, "200 turns", C.pink, { "font-size": 15 }),
        p("flux", "M320 80H470V240H320H170V80Z", C.blue, "none", { draw: 0, "stroke-width": 6 }), t("vp", 84, 100, "", C.amber, { "font-size": 22 }), t("vs", 556, 100, "", C.pink, { "font-size": 22 }), t("eq", 320, 300, "", C.w, { "font-size": 24 })];
      return { w: 640, h: 330, label: "A transformer with primary and secondary coils on an iron core", items, steps: [
        { cap: "A transformer has two coils wound on an iron core. It only works with alternating current (a.c.).", set: { vp: { t: "" } } },
        { cap: "The alternating current in the primary coil makes a changing magnetic field in the iron core.", set: { flux: { draw: 1 }, vp: { t: "10 V a.c." } } },
        { cap: "The changing field passes through the secondary coil and induces a voltage in it. This has twice the turns, so twice the voltage: a step-up transformer.", set: { vs: { t: "20 V a.c." } } },
        { cap: "The turns ratio decides the voltage ratio: Vs ÷ Vp = Ns ÷ Np. For a perfect transformer, power in = power out: Vp × Ip = Vs × Is.", set: { eq: { t: "Vs ÷ Vp = Ns ÷ Np  (20 ÷ 10 = 200 ÷ 100)" } } }
      ] };
    })(),

    "Life cycle of a star": (() => {
      const node = (id, x, y, rad, col, label) => [c(id, x, y, rad, col, { o: 0, stroke: "#fff", "stroke-width": 2 }), t(id + "t", x, y + rad + 22, label, C.w, { o: 0, "font-size": 15 })];
      const items = [].concat(node("n", 60, 70, 36, "rgba(255,150,200,.55)", "Nebula"), node("ps", 170, 70, 20, "#ff9f43", "Protostar"), node("ms", 280, 70, 26, "#ffd43b", "Main sequence"),
        node("rg", 420, 70, 40, "#ff6b4a", "Red giant"), node("wd", 560, 70, 11, "#fff", "White dwarf"), node("sg", 410, 235, 52, "#ff4d4d", "Red supergiant"), node("sn", 520, 235, 38, "#ffe27a", "Supernova"), node("bh", 590, 235, 10, "#1b1340", "Black hole"));
      items.push(t("small", 480, 16, "Stars about the size of the Sun", C.amber, { o: 0, "font-size": 16 }), t("big", 480, 168, "Stars much bigger than the Sun", C.pink, { o: 0, "font-size": 16 }));
      const show = (...ids) => Object.fromEntries(ids.flatMap((i) => [[i, { o: 1 }], [i + "t", { o: 1 }]]));
      return { w: 640, h: 320, label: "The life cycle of small and large stars", items, steps: [
        { cap: "Stars begin as a nebula: a huge cloud of gas and dust.", set: show("n") },
        { cap: "Gravity pulls the cloud together. It heats up and becomes a protostar.", set: show("ps") },
        { cap: "When hydrogen nuclei start fusing into helium, the star is stable: gravity pulling in is balanced by the energy pushing out. This main sequence stage lasts billions of years.", set: show("ms") },
        { cap: "A star like the Sun swells into a red giant when the hydrogen runs low, then shrinks to a white dwarf.", set: Object.assign({ small: { o: 1 } }, show("rg", "wd")) },
        { cap: "A much bigger star becomes a red supergiant, then explodes as a supernova. The core is left as a neutron star or, if massive enough, a black hole.", set: Object.assign({ big: { o: 1 } }, show("sg", "sn", "bh")) }
      ] };
    })(),

    "Red-shift and the Big Bang": (() => {
      const items = [p("w1", sine(60, 290, 90, 22, 46), C.blue, "none", { "stroke-width": 5 }), p("w2", sine(340, 600, 90, 22, 86), C.pink, "none", { draw: 0, "stroke-width": 5 }), t("c1", 175, 40, "Light from a nearby source", C.blue, { "font-size": 17 }), t("c2", 470, 40, "Source moving away", C.pink, { o: 0, "font-size": 17 }),
        t("sh", 470, 140, "Stretched: shifted to the red end", C.pink, { o: 0, "font-size": 19 }), c("g0", 320, 230, 10, C.w, { o: 0 }), c("g1", 320, 230, 8, C.amber, { o: 0 }), c("g2", 320, 230, 8, C.amber, { o: 0 }), c("g3", 320, 230, 8, C.amber, { o: 0 }), c("g4", 320, 230, 8, C.amber, { o: 0 }),
        t("lab", 320, 290, "", C.w, { "font-size": 20 })];
      return { w: 640, h: 310, label: "Light waves stretching from a receding galaxy and galaxies moving apart", items, steps: [
        { cap: "Each element emits light at particular wavelengths. Here is a source that is not moving relative to us." },
        { cap: "If a galaxy moves away from us, its light waves are stretched. The wavelength gets longer, shifting towards the red end of the spectrum. This is red-shift.", set: { w2: { draw: 1 }, c2: { o: 1 }, sh: { o: 1 } } },
        { cap: "Distant galaxies show more red-shift, so they are moving away faster. Everything is moving apart from everything else.", set: { g1: { o: 1, cx: 190, cy: 200 }, g2: { o: 1, cx: 450, cy: 190 }, g3: { o: 1, cx: 110, cy: 250 }, g4: { o: 1, cx: 540, cy: 255 }, g0: { o: 1 }, lab: { t: "Further away = faster = bigger red-shift" } } },
        { cap: "This is evidence that the universe is expanding from a single point 13.8 billion years ago: the Big Bang theory.", set: { lab: { t: "The universe is expanding: the Big Bang", fill: C.amber } } }
      ] };
    })(),

    "Terminal velocity": (() => {
      const items = [c("head", 320, 70, 14, C.amber), l("body", 320, 84, 320, 130, C.amber, { "stroke-width": 6 }), l("arm1", 320, 96, 294, 80, C.amber), l("arm2", 320, 96, 346, 80, C.amber), l("leg1", 320, 130, 304, 160, C.amber), l("leg2", 320, 130, 336, 160, C.amber),
        p("chute", "M250 20Q320 -30 390 20Z", C.pink, C.pink, { o: 0, "fill-opacity": .6 }), l("cl1", 252, 20, 316, 84, C.pink, { o: 0, "stroke-width": 2 }), l("cl2", 388, 20, 324, 84, C.pink, { o: 0, "stroke-width": 2 }),
        r("wt", 400, 100, 16, 80, C.green, { rx: 4 }), t("wg", 408, 205, "▼", C.green, { "font-size": 28 }), t("wl", 408, 235, "Weight", C.green, { "font-size": 16 }),
        r("ar", 230, 180, 16, 0, C.pink, { rx: 4 }), t("ag", 238, 176, "▲", C.pink, { "font-size": 28, o: 0 }), t("al", 238, 235, "Air resistance", C.pink, { "font-size": 16 }), t("sp", 20, 120, "Speed: 0 m/s", C.w, { "font-size": 22, "text-anchor": "start" }), t("st", 320, 290, "", C.amber, { "font-size": 22 })];
      return { w: 640, h: 310, label: "A skydiver with weight and air resistance forces", items, steps: [
        { cap: "Just after jumping, only weight acts. The resultant force is large, so the skydiver accelerates quickly.", set: { st: { t: "Resultant force down: big acceleration" } } },
        { cap: "As speed increases, air resistance increases too. The resultant force and acceleration get smaller.", set: { ar: { y: 130, height: 50 }, ag: { o: 1, y: 126 }, sp: { t: "Speed: 30 m/s" }, st: { t: "Resultant force is getting smaller" } } },
        { cap: "When air resistance equals weight, the forces balance. The resultant force is zero, so the speed stays constant. This is the terminal velocity.", set: { ar: { y: 100, height: 80 }, ag: { y: 96 }, sp: { t: "Speed: 55 m/s (terminal)" }, st: { t: "Balanced forces: constant speed", fill: C.green } } },
        { cap: "Open the parachute: the surface area jumps, so air resistance is now bigger than weight and the skydiver slows down.", set: { chute: { o: 1 }, cl1: { o: 1 }, cl2: { o: 1 }, ar: { y: 40, height: 140 }, ag: { y: 36 }, sp: { t: "Speed: slowing down" }, st: { t: "Air resistance > weight: decelerating", fill: C.pink } } },
        { cap: "As speed falls, air resistance falls until it balances weight again, at a much lower terminal velocity for a safe landing.", set: { ar: { y: 100, height: 80 }, ag: { y: 96 }, sp: { t: "Speed: 5 m/s (terminal)" }, st: { t: "Balanced again at a lower speed", fill: C.green } } }
      ] };
    })(),

    "Structure of the atom": (() => {
      const O = [230, 150], P = [[-9, -10], [10, -8], [0, 8]], N = [[-14, 6], [14, 8], [2, -18], [-2, 20]], el = (a) => [O[0] + 70 * Math.cos(a * Math.PI / 180), O[1] + 70 * Math.sin(a * Math.PI / 180)], el2 = (a) => [O[0] + 120 * Math.cos(a * Math.PI / 180), O[1] + 120 * Math.sin(a * Math.PI / 180)];
      const items = [c("orb1", O[0], O[1], 70, "none", { stroke: C.grey, "stroke-width": 2, "stroke-dasharray": "5 6", o: 0 }), c("orb2", O[0], O[1], 120, "none", { stroke: C.grey, "stroke-width": 2, "stroke-dasharray": "5 6", o: 0 })];
      P.forEach((q, i) => items.push(c("p" + i, O[0] + q[0], O[1] + q[1], 11, C.pink, { stroke: "#fff", "stroke-width": 2 })));
      N.forEach((q, i) => items.push(c("n" + i, O[0] + q[0], O[1] + q[1], 11, C.grey, { stroke: "#fff", "stroke-width": 2 })));
      [[30], [210]].forEach((a, i) => items.push(c("e" + i, ...el(a[0]), 8, C.blue, { o: 0 })));
      items.push(c("e2", ...el2(300), 8, C.blue, { o: 0 }), t("pn", 410, 70, "", C.pink, { "text-anchor": "start", "font-size": 20 }), t("nn", 410, 100, "", C.grey, { "text-anchor": "start", "font-size": 20 }), t("en", 410, 130, "", C.blue, { "text-anchor": "start", "font-size": 20 }), t("lab", 230, 300, "Lithium-7", C.w, { "font-size": 24 }),
        t("an", 410, 190, "", C.amber, { "text-anchor": "start", "font-size": 18 }), t("mn", 410, 216, "", C.amber, { "text-anchor": "start", "font-size": 18 }));
      return { w: 700, h: 320, label: "A lithium atom with protons, neutrons and electrons", items, steps: [
        { cap: "At the centre is a tiny, dense nucleus made of protons (positive) and neutrons (no charge). This is a lithium atom.", set: { pn: { t: "Proton: +1 charge" }, nn: { t: "Neutron: no charge" } } },
        { cap: "Electrons (negative) orbit the nucleus in energy levels or shells. The atom has no overall charge because protons = electrons.", set: { orb1: { o: 1 }, orb2: { o: 1 }, e0: { o: 1 }, e1: { o: 1 }, e2: { o: 1 }, en: { t: "Electron: −1 charge" } } },
        { cap: "The atomic number is the number of protons: 3. The mass number is protons + neutrons: 3 + 4 = 7. Electronic structure: 2,1.", set: { an: { t: "Atomic number = 3 protons" }, mn: { t: "Mass number = 3 + 4 = 7" } } }
      ] };
    })(),

    "Magnets and fields": (() => {
      const items = [r("nm", 270, 135, 50, 50, C.pink, { rx: 4 }), r("sm", 320, 135, 50, 50, C.blue, { rx: 4 }), t("N", 295, 170, "N", "#04122e", { "font-size": 28 }), t("S", 345, 170, "S", "#04122e", { "font-size": 28 })];
      ["M270 150C170 10 470 10 370 150", "M270 148C220 70 420 70 370 148", "M270 172C170 310 470 310 370 172", "M270 174C220 250 420 250 370 174"].forEach((d, i) => items.push(p("f" + i, d, C.amber, "none", { draw: 0, "stroke-width": 3 })));
      items.push(t("lab", 320, 24, "", C.w, { "font-size": 22 }));
      return { w: 640, h: 330, label: "Magnetic field lines around a bar magnet", items, steps: [
        { cap: "A bar magnet has a north and a south pole. A magnetic field is the region where another magnet or magnetic material feels a force.", set: { lab: { t: "Bar magnet" } } },
        { cap: "Field lines show the direction a free north pole would move: from north to south. They are closest together where the field is strongest, at the poles.", set: { f0: { draw: 1 }, f1: { draw: 1 }, f2: { draw: 1 }, f3: { draw: 1 }, lab: { t: "Field lines run from N to S" } } },
        { cap: "Like poles repel and unlike poles attract. A compass needle lines up with the field because it is a tiny magnet.", set: { lab: { t: "Like poles repel \u00B7 Unlike poles attract" } } }
      ] };
    })()
  });
})();
