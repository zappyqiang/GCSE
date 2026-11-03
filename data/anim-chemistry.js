/* Animated explainers and simulations for Chemistry. */
(function () {
  const { c, r, l, t, p, g, arrow, COL: C } = ANIM.h;
  const pol = (cx, cy, rad, a) => [cx + rad * Math.cos(a * Math.PI / 180), cy + rad * Math.sin(a * Math.PI / 180)].map((n) => Math.round(n));

  GAME.explain({
    "Electronic structure": (() => {
      const O = [210, 150], R = [42, 78, 114], items = R.map((rad, i) => c("sh" + i, O[0], O[1], rad, "none", { stroke: C.grey, "stroke-width": 2, "stroke-dasharray": "5 6", o: 0 }));
      items.push(c("nuc", O[0], O[1], 24, C.pink, { stroke: "#fff", "stroke-width": 3 }), t("nt", O[0], O[1] + 6, "11p", "#04122e", { "font-size": 16 }));
      const e = [];
      [[0, 2, 0], [1, 8, 20], [2, 1, 70]].forEach(([s, n, off]) => { for (let k = 0; k < n; k++) { const q = pol(O[0], O[1], R[s], off + k * 360 / n); e.push([s, q]); items.push(c("e" + s + "_" + k, q[0], q[1], 7, s === 2 ? C.amber : C.blue, { o: 0, stroke: "#fff", "stroke-width": 1.5 })); } });
      items.push(t("rule", 500, 80, "", C.w, { "font-size": 20, "text-anchor": "start" }), t("rule2", 500, 112, "", C.w, { "font-size": 20, "text-anchor": "start" }), t("rule3", 500, 144, "", C.w, { "font-size": 20, "text-anchor": "start" }), t("res", 500, 215, "", C.amber, { "font-size": 30 }));
      const show = (s, n) => Object.fromEntries(Array.from({ length: n }, (_, k) => ["e" + s + "_" + k, { o: 1 }]));
      return { w: 700, h: 300, label: "Electrons filling the shells of a sodium atom", items, steps: [
        { cap: "A sodium atom has 11 protons in its nucleus, so it has 11 electrons. They sit in shells (energy levels) around the nucleus.", set: { sh0: { o: 1 }, sh1: { o: 1 }, sh2: { o: 1 } } },
        { cap: "Fill the shells from the inside out. The first shell holds a maximum of 2 electrons.", set: Object.assign({ rule: { t: "Shell 1: up to 2" } }, show(0, 2)) },
        { cap: "The second shell holds up to 8 electrons.", set: Object.assign({ rule2: { t: "Shell 2: up to 8" } }, show(1, 8)) },
        { cap: "That leaves 1 electron for the third shell. Sodium's electronic structure is 2,8,1. The outer electron decides how it reacts.", set: Object.assign({ rule3: { t: "Shell 3: up to 8" }, res: { t: "Na = 2,8,1" } }, show(2, 1)) }
      ] };
    })(),

    "Ionic bonding": (() => {
      const slots = (cx, cy, rad, skip) => [0, 45, 90, 135, 180, 225, 270, 315].filter((a) => a !== skip).map((a) => pol(cx, cy, rad, a));
      const items = [c("na", 170, 150, 52, "rgba(255,184,77,.12)", { stroke: C.amber, "stroke-width": 4 }), c("cl", 470, 150, 52, "rgba(77,171,255,.12)", { stroke: C.blue, "stroke-width": 4 }), t("nat", 170, 158, "Na", C.amber, { "font-size": 28 }), t("clt", 470, 158, "Cl", C.blue, { "font-size": 28 })];
      slots(470, 150, 52, 180).forEach((q, i) => items.push(c("ce" + i, q[0], q[1], 7, C.blue, { stroke: "#fff", "stroke-width": 1.5 })));
      items.push(c("ne", 222, 150, 7, C.amber, { stroke: "#fff", "stroke-width": 1.5 }), p("hop", "M222 130Q346 70 418 130", C.amber, "none", { draw: 0, "stroke-width": 3 }), t("ch1", 170, 66, "+", C.amber, { o: 0, "font-size": 46 }), t("ch2", 470, 66, "−", C.blue, { o: 0, "font-size": 46 }),
        t("io1", 170, 238, "Na⁺  (2,8)", C.amber, { o: 0, "font-size": 20 }), t("io2", 470, 238, "Cl⁻  (2,8,8)", C.blue, { o: 0, "font-size": 20 }), t("att", 320, 150, "", C.pink, { "font-size": 20 }), p("pull", "M240 190H400", C.pink, "none", { draw: 0, "stroke-width": 4 }), t("lab", 320, 24, "Sodium + chlorine", C.w, { "font-size": 24 }));
      return { w: 640, h: 270, label: "An electron transferring from a sodium atom to a chlorine atom", items, steps: [
        { cap: "Sodium (a metal) has 1 electron in its outer shell. Chlorine (a non-metal) has 7 and needs just 1 more to be full.", set: { lab: { t: "Na (2,8,1) + Cl (2,8,7)" } } },
        { cap: "Sodium transfers its outer electron to chlorine.", set: { ne: { cx: 418 }, hop: { draw: 1 } } },
        { cap: "Now sodium has lost a negative electron so it is a positive ion, Na⁺. Chlorine has gained one, so it is a negative ion, Cl⁻. Both have full outer shells.", set: { hop: { o: 0 }, ch1: { o: 1 }, ch2: { o: 1 }, io1: { o: 1 }, io2: { o: 1 }, lab: { t: "Metals lose electrons. Non-metals gain them." } } },
        { cap: "Oppositely charged ions attract each other with strong electrostatic forces. That attraction is the ionic bond.", set: { pull: { draw: 1 }, att: { t: "" }, lab: { t: "Ionic bond = attraction between opposite ions", fill: C.pink } } }
      ] };
    })(),

    "Covalent bonding": (() => {
      const items = [c("a", 230, 150, 54, "rgba(255,184,77,.14)", { stroke: C.amber, "stroke-width": 4 }), c("b", 410, 150, 54, "rgba(77,171,255,.14)", { stroke: C.blue, "stroke-width": 4 }), t("ta", 230, 160, "H", C.amber, { "font-size": 30 }), t("tb", 410, 160, "H", C.blue, { "font-size": 30 }),
        c("ea", 284, 150, 8, C.amber, { stroke: "#fff", "stroke-width": 1.5 }), c("eb", 356, 150, 8, C.blue, { stroke: "#fff", "stroke-width": 1.5 }), t("sh", 320, 238, "", C.w, { "font-size": 22 }), t("lab", 320, 36, "Two hydrogen atoms", C.w, { "font-size": 24 }), t("ft", 320, 280, "", C.green, { "font-size": 24 })];
      return { w: 640, h: 310, label: "Two hydrogen atoms sharing a pair of electrons", items, steps: [
        { cap: "Non-metal atoms bond by sharing electrons. Each hydrogen atom has 1 electron and needs 2 to fill its shell." },
        { cap: "The atoms move together until their outer shells overlap.", set: { a: { cx: 290 }, b: { cx: 350 }, ta: { x: 290 }, tb: { x: 350 }, ea: { cx: 320, cy: 138 }, eb: { cx: 320, cy: 162 }, lab: { t: "Shells overlap" } } },
        { cap: "The two electrons are now shared. A shared pair of electrons is a covalent bond, shown as a single line: H–H.", set: { sh: { t: "Shared pair of electrons = one covalent bond" }, lab: { t: "Hydrogen molecule, H₂" } } },
        { cap: "Each hydrogen now has a full outer shell of 2 electrons. Covalent bonds are strong, but simple molecules have weak forces between them, so they have low melting and boiling points.", set: { ft: { t: "H–H  Both atoms have a full shell" } } }
      ] };
    })(),

    "Metallic bonding and alloys": (() => {
      const items = [], X = (i) => 130 + i * 70, Y = (j) => 90 + j * 62;
      for (let j = 0; j < 3; j++) for (let i = 0; i < 7; i++) { items.push(c("i" + j + i, X(i), Y(j), 20, "rgba(255,184,77,.25)", { stroke: C.amber, "stroke-width": 3 }), t("p" + j + i, X(i), Y(j) + 7, "+", C.amber, { "font-size": 22, o: 1 })); }
      const E = []; for (let k = 0; k < 18; k++) { const x = 100 + (k * 131) % 440, y = 60 + (k * 79) % 150; E.push([x, y]); items.push(c("e" + k, x, y, 5.5, C.blue, { o: 0 })); }
      items.push(p("cur", arrow(80, 270, 560, 270), C.green, "none", { draw: 0, "stroke-width": 5 }), t("lab", 320, 26, "Positive metal ions", C.amber, { "font-size": 22 }), t("lab2", 320, 300, "", C.green, { "font-size": 20 }));
      const eSet = (o) => Object.fromEntries(E.map((_, k) => ["e" + k, { o }]));
      const slide = (dx) => Object.fromEntries([0, 1, 2, 3, 4, 5, 6].flatMap((i) => [["i1" + i, { tx: dx }], ["p1" + i, { tx: dx }]]));
      return { w: 640, h: 320, label: "Metal ions in layers with delocalised electrons", items, steps: [
        { cap: "In a metal the atoms are arranged in regular layers. Their outer electrons are free to leave, so the atoms become positive ions.", set: { lab: { t: "A giant lattice of positive ions" } } },
        { cap: "The outer electrons are delocalised: they form a sea of free electrons that moves between the ions.", set: Object.assign({ lab: { t: "Sea of delocalised electrons", fill: C.blue } }, eSet(1)) },
        { cap: "Strong electrostatic attraction between the positive ions and the electrons is the metallic bond. This gives metals high melting points.", set: { lab: { t: "Strong attraction = metallic bond", fill: C.pink } } },
        { cap: "The free electrons can carry charge and thermal energy through the metal, so metals conduct electricity and heat.", set: { cur: { draw: 1 }, lab2: { t: "Electrons carry the current" } } },
        { cap: "The layers of ions can slide over each other without breaking the bonding, so pure metals are malleable. Alloys mix in different-sized atoms that stop the layers sliding, making them harder.", set: Object.assign({ lab: { t: "Layers slide: metals can be bent and shaped", fill: C.w }, lab2: { t: "" } }, slide(40)) }
      ] };
    })(),

    "States of matter": (() => {
      const box = (id, x) => r(id, x, 70, 170, 170, "rgba(255,255,255,.04)", { stroke: C.grey, "stroke-width": 3, rx: 10 }), items = [box("b1", 30), box("b2", 235), box("b3", 440), t("h1", 115, 50, "Solid", C.blue, { "font-size": 22 }), t("h2", 320, 50, "Liquid", C.green, { "font-size": 22 }), t("h3", 525, 50, "Gas", C.pink, { "font-size": 22 })];
      for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) items.push(c("s" + i + j, 62 + i * 36, 100 + j * 36, 15, C.blue, { o: 0 }));
      [[260, 180], [292, 168], [326, 182], [360, 170], [272, 214], [306, 212], [342, 216], [374, 206], [262, 142 + 70], [300, 192], [336, 196], [284, 230], [352, 232]].slice(0, 12).forEach((q, i) => items.push(c("q" + i, q[0], q[1] + 10, 11, C.green, { o: 0 })));
      [[470, 100], [520, 130], [580, 90], [490, 190], [560, 210], [600, 160], [540, 90], [470, 140]].forEach((q, i) => items.push(c("g" + i, q[0], q[1], 15, C.pink, { o: 0 })));
      items.push(t("n1", 115, 270, "", C.w, { "font-size": 16 }), t("n2", 320, 270, "", C.w, { "font-size": 16 }), t("n3", 525, 270, "", C.w, { "font-size": 16 }));
      const grp = (pfx, n, o) => Object.fromEntries(Array.from({ length: n }, (_, i) => [pfx + i, { o }]));
      const solid = {}; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) solid["s" + i + j] = { o: 1 };
      return { w: 640, h: 300, label: "Particle arrangements in a solid, a liquid and a gas", items, steps: [
        { cap: "In a solid the particles are packed closely in a regular pattern. They can only vibrate about fixed positions.", set: Object.assign({ n1: { t: "Fixed shape, strong forces" } }, solid) },
        { cap: "In a liquid the particles are still close together but in a random arrangement. They can move past each other, so liquids flow and take the shape of their container.", set: Object.assign({ n2: { t: "Flows, fixed volume" }, }, grp("q", 12, 1)) },
        { cap: "In a gas the particles are far apart and move quickly in random directions. The forces between them are very weak. Gases spread out to fill their container and can be squashed.", set: Object.assign({ n3: { t: "Fills the container, weak forces" } }, grp("g", 8, 1)) },
        { cap: "Heating gives particles more energy. Changing state is a physical change: no new substance forms, and the particles themselves do not change.", set: { n1: { t: "Melting \u2192" }, n2: { t: "Boiling \u2192" }, n3: { t: "\u2190 Condensing" } } }
      ] };
    })(),

    "Protons, neutrons and isotopes": (() => {
      const items = [t("t1", 40, 70, "Cl-35", C.blue, { "text-anchor": "start", "font-size": 24 }), t("t2", 40, 160, "Cl-37", C.pink, { "text-anchor": "start", "font-size": 24 }),
        r("p1", 150, 45, 170, 36, C.pink, { rx: 6 }), r("n1", 320, 45, 180, 36, C.grey, { rx: 6 }), r("p2", 150, 135, 170, 36, C.pink, { rx: 6, o: 0 }), r("n2", 320, 135, 180, 36, C.grey, { rx: 6, o: 0 }), r("x2", 500, 135, 0, 36, C.amber, { rx: 6 }),
        t("p1t", 235, 70, "17 protons", "#04122e", { "font-size": 18 }), t("n1t", 410, 70, "18 neutrons", "#fff", { "font-size": 18 }), t("p2t", 235, 160, "17 protons", "#04122e", { "font-size": 18, o: 0 }), t("n2t", 410, 160, "18 neutrons", "#fff", { "font-size": 18, o: 0 }), t("x2t", 580, 160, "+2", C.amber, { "font-size": 18, o: 0 }),
        t("res", 320, 235, "", C.amber, { "font-size": 22 }), t("res2", 320, 270, "", C.w, { "font-size": 20 })];
      return { w: 640, h: 300, label: "Two isotopes of chlorine with different numbers of neutrons", items, steps: [
        { cap: "A chlorine atom always has 17 protons. This isotope also has 18 neutrons, so its mass number is 17 + 18 = 35: chlorine-35." },
        { cap: "Here is another type of chlorine atom. It has the same 17 protons but 20 neutrons, so its mass number is 37.", set: { p2: { o: 1 }, n2: { o: 1 }, p2t: { o: 1 }, n2t: { o: 1 }, x2: { width: 40 }, x2t: { o: 1 } } },
        { cap: "Atoms of the same element with different numbers of neutrons are called isotopes. Same protons means the same element and the same chemical properties.", set: { res: { t: "Isotopes: same protons, different neutrons" } } },
        { cap: "The relative atomic mass is the weighted average of the isotopes. If 75% are Cl-35 and 25% are Cl-37: (35 × 75 + 37 × 25) ÷ 100 = 35.5.", set: { res2: { t: "Ar = (35 × 75 + 37 × 25) ÷ 100 = 35.5" } } }
      ] };
    })(),

    "Reaction profiles": (() => {
      const items = [l("ax1", 40, 260, 300, 260, C.grey, { "stroke-width": 3 }), l("ay1", 40, 260, 40, 20, C.grey, { "stroke-width": 3 }), l("ax2", 350, 260, 610, 260, C.grey, { "stroke-width": 3 }), l("ay2", 350, 260, 350, 20, C.grey, { "stroke-width": 3 }),
        t("e1", 24, 140, "Energy", C.grey, { "font-size": 14, rot: -90, ox: 24, oy: 140 }), t("e2", 334, 140, "Energy", C.grey, { "font-size": 14, rot: -90, ox: 334, oy: 140 }), t("h1", 170, 290, "Exothermic", C.pink, { "font-size": 20 }), t("h2", 480, 290, "Endothermic", C.blue, { "font-size": 20 }),
        p("c1", "M40 120L90 120C110 120 120 50 150 50C180 50 190 190 210 190L290 190", C.pink, "none", { draw: 0, "stroke-width": 5 }), p("cat", "M90 120C110 120 120 88 150 88C180 88 190 190 210 190", C.green, "none", { draw: 0, "stroke-width": 4, o: 0 }),
        p("c2", "M350 190L400 190C420 190 430 60 460 60C490 60 500 110 520 110L600 110", C.blue, "none", { draw: 0, "stroke-width": 5 }),
        t("rl", 66, 108, "Reactants", C.w, { "font-size": 14 }), t("pl", 255, 182, "Products", C.w, { "font-size": 14 }), t("rl2", 376, 182, "Reactants", C.w, { "font-size": 14 }), t("pl2", 565, 102, "Products", C.w, { "font-size": 14 }),
        p("ea", arrow(124, 118, 124, 56), C.amber, "none", { draw: 0, "stroke-width": 3 }), t("eat", 100, 90, "Ea", C.amber, { o: 0, "font-size": 18 }), p("dh", arrow(262, 124, 262, 186), C.green, "none", { draw: 0, "stroke-width": 3 }), t("dht", 262, 214, "ΔH < 0", C.green, { o: 0, "font-size": 16 }),
        p("dh2", arrow(560, 186, 560, 116), C.green, "none", { draw: 0, "stroke-width": 3 }), t("dh2t", 560, 214, "ΔH > 0", C.green, { o: 0, "font-size": 16 }), t("lab", 320, 24, "", C.w, { "font-size": 20 })];
      return { w: 640, h: 310, label: "Reaction profile diagrams for exothermic and endothermic reactions", items, steps: [
        { cap: "A reaction profile shows the energy of the particles as the reaction goes on. In an exothermic reaction the products have less energy than the reactants.", set: { c1: { draw: 1 } } },
        { cap: "The hump is the activation energy, Ea: the minimum energy particles need when they collide for the reaction to happen. The energy given out to the surroundings is the overall change, ΔH, which is negative.", set: { ea: { draw: 1 }, eat: { o: 1 }, dh: { draw: 1 }, dht: { o: 1 } } },
        { cap: "In an endothermic reaction the products have more energy than the reactants. Energy is taken in from the surroundings, so ΔH is positive.", set: { c2: { draw: 1 }, dh2: { draw: 1 }, dh2t: { o: 1 } } },
        { cap: "A catalyst gives the reaction a lower activation energy (the green path). It does not change the energy of the reactants or products, so ΔH stays the same.", set: { cat: { o: 1, draw: 1 }, lab: { t: "Catalyst: lower activation energy" } } }
      ] };
    })(),

    "Collision theory and rate factors": { sim: "collision", cap: "For a reaction, particles must collide with enough energy (activation energy). A higher temperature means faster particles, so more collisions and more of them successful. A higher concentration means more collisions per second. Both make the reaction go faster." },

    "Electrolysis basics": (() => {
      const ion = (id, x, y, col, sign) => [c(id, x, y, 14, col, { stroke: "#fff", "stroke-width": 2 }), t(id + "s", x, y + 6, sign, "#04122e", { "font-size": 20 })];
      const items = [r("bk", 140, 70, 360, 190, "rgba(77,171,255,.12)", { stroke: C.grey, "stroke-width": 3, rx: 12 }), r("cat", 160, 40, 20, 170, C.pink, { rx: 4 }), r("an", 460, 40, 20, 170, C.blue, { rx: 4 }), t("ct", 170, 28, "Cathode (−)", C.pink, { "font-size": 17 }), t("at", 470, 28, "Anode (+)", C.blue, { "font-size": 17 }),
        l("w1", 170, 40, 170, 8, C.grey, { "stroke-width": 3 }), l("w2", 470, 40, 470, 8, C.grey, { "stroke-width": 3 }), t("pw", 320, 22, "d.c. power supply", C.amber, { "font-size": 17 })];
      [[250, 120], [330, 190], [270, 230]].forEach((q, i) => items.push(...ion("pi" + i, q[0], q[1], C.amber, "+")));
      [[380, 130], [340, 220], [420, 190]].forEach((q, i) => items.push(...ion("ni" + i, q[0], q[1], C.green, "−")));
      items.push(t("n1", 170, 295, "", C.pink, { "font-size": 17 }), t("n2", 470, 295, "", C.blue, { "font-size": 17 }), t("lab", 320, 276, "", C.w, { "font-size": 20 }));
      const move = (pfx, x) => Object.fromEntries([0, 1, 2].flatMap((i) => [[pfx + i, { cx: x }], [pfx + i + "s", { x }]]));
      return { w: 640, h: 320, label: "Ions moving to the electrodes during electrolysis", items, steps: [
        { cap: "Electrolysis passes an electric current through a molten or dissolved ionic compound, called the electrolyte. The ions are free to move.", set: { lab: { t: "Free ions in the electrolyte" } } },
        { cap: "Positive ions are attracted to the negative electrode, the cathode. Negative ions are attracted to the positive electrode, the anode.", set: Object.assign(move("pi", 205), move("ni", 435), { lab: { t: "Opposites attract" } }) },
        { cap: "At the cathode, positive ions gain electrons (reduction) and form atoms. At the anode, negative ions lose electrons (oxidation). The compound is broken down.", set: { n1: { t: "Gain electrons: reduction" }, n2: { t: "Lose electrons: oxidation" }, lab: { t: "Ionic compound decomposed", fill: C.amber } } }
      ] };
    })(),

    "Fractional distillation": (() => {
      const items = [r("col", 230, 30, 150, 260, "rgba(255,255,255,.04)", { stroke: C.grey, "stroke-width": 4, rx: 14 })], cols = ["#4dabff", "#4ade80", "#c9e04a", "#ffb84d", "#ff7a4a", "#ff4d6d"];
      const F = [["Refinery gases", "1–4 C"], ["Petrol", "5–10 C"], ["Kerosene", "10–16 C"], ["Diesel", "14–20 C"], ["Fuel oil", "20–50 C"], ["Bitumen", "50+ C"]];
      F.forEach((f, i) => { const y = 36 + i * 42; items.push(r("z" + i, 234, y, 142, 38, cols[i], { rx: 4, o: 0, "fill-opacity": .65 }), l("o" + i, 380, y + 19, 440, y + 19, cols[i], { o: 0, "stroke-width": 4 }), t("f" + i, 450, y + 19, f[0], cols[i], { "text-anchor": "start", "font-size": 17, o: 0 }), t("c" + i, 450, y + 38, f[1], C.grey, { "text-anchor": "start", "font-size": 13, o: 0 })); });
      items.push(p("up", arrow(150, 270, 150, 40), C.amber, "none", { draw: 0, "stroke-width": 5 }), t("hot", 90, 262, "Hot", C.pink, { "font-size": 18, o: 0 }), t("cool", 90, 56, "Cool", C.blue, { "font-size": 18, o: 0 }), l("in", 130, 250, 230, 250, C.pink, { draw: 0, "stroke-width": 8 }), t("crude", 100, 232, "Crude oil", C.w, { "font-size": 16 }), t("lab", 120, 300, "", C.w, { "font-size": 15 }));
      const lv = (n) => Object.fromEntries(Array.from({ length: n }, (_, k) => [[5 - k], 0]).flatMap(([i]) => [["z" + i, { o: 1 }], ["o" + i, { o: 1 }], ["f" + i, { o: 1 }], ["c" + i, { o: 1 }]]));
      return { w: 640, h: 320, label: "A fractionating column separating crude oil into fractions", items, steps: [
        { cap: "Crude oil is heated until most of it evaporates, and the vapour is fed into the bottom of a fractionating column.", set: { in: { draw: 1 }, hot: { o: 1 } } },
        { cap: "The column is hot at the bottom and cool at the top. The vapour rises and cools as it goes up.", set: { up: { draw: 1 }, cool: { o: 1 } } },
        { cap: "Each hydrocarbon condenses where the column is cooler than its boiling point. Long molecules have high boiling points so they condense low down.", set: lv(3) },
        { cap: "Short molecules have low boiling points, so they reach the top as gases. Short-chain fractions are runny and flammable. Long-chain ones are thick and burn poorly.", set: lv(6) }
      ] };
    })(),

    "The pH scale": (() => {
      const cols = ["#ff3b30", "#ff4a30", "#ff6a2a", "#ff8f24", "#ffb320", "#ffd620", "#c8e02a", "#6fd04a", "#3cc79a", "#35b9d6", "#3a8ee6", "#4a64e0", "#5b4ad8", "#6f3fcb", "#7a35b8"], items = [];
      cols.forEach((col, i) => { items.push(r("k" + i, 40 + i * 38, 100, 38, 60, col, { rx: 0 }), t("n" + i, 59 + i * 38, 190, "" + i, C.w, { "font-size": 18 })); });
      items.push(t("ptr", 59, 92, "▼", C.w, { "font-size": 34 }), t("lab", 320, 40, "pH scale", C.w, { "font-size": 26 }), t("ex", 320, 250, "", C.amber, { "font-size": 22 }), t("ac", 135, 218, "Acidic", "#ff8f24", { "font-size": 17, o: 0 }), t("ne", 305, 218, "Neutral", C.green, { "font-size": 17, o: 0 }), t("al", 495, 218, "Alkaline", "#6f7fff", { "font-size": 17, o: 0 }), t("ten", 320, 288, "", C.w, { "font-size": 18 }));
      return { w: 640, h: 310, label: "The pH scale from 0 to 14 with example substances", items, steps: [
        { cap: "The pH scale runs from 0 to 14. It measures how acidic or alkaline a solution is. Universal indicator changes colour to show the pH.", set: { ac: { o: 1 }, ne: { o: 1 }, al: { o: 1 } } },
        { cap: "Below 7 is acidic. Lemon juice has a pH of about 2. Acids contain more hydrogen ions, H⁺.", set: { ptr: { x: 59 + 2 * 38 }, ex: { t: "Lemon juice: pH 2 (acid)" } } },
        { cap: "pH 7 is neutral. Pure water is neutral because it has equal numbers of H⁺ and OH⁻ ions.", set: { ptr: { x: 59 + 7 * 38 }, ex: { t: "Pure water: pH 7 (neutral)" } } },
        { cap: "Above 7 is alkaline. Bleach is about pH 13. Alkalis contain more hydroxide ions, OH⁻.", set: { ptr: { x: 59 + 13 * 38 }, ex: { t: "Bleach: pH 13 (alkali)" } } },
        { cap: "Each step down the scale is 10 times more acidic. A solution at pH 3 has 10 times the hydrogen ion concentration of one at pH 4.", set: { ten: { t: "Each pH unit = ×10 change in H⁺ concentration" } } }
      ] };
    })(),

    "Group 1: alkali metals": (() => {
      const items = [], at = [["Li", 130, 30, 58, "#ff7a8a"], ["Na", 320, 42, 76, "#ffb84d"], ["K", 510, 54, 96, "#c58cff"]];
      at.forEach(([n, x, rr, d, col]) => { items.push(c("a" + n, x, 150, rr, "rgba(255,255,255,.06)", { stroke: col, "stroke-width": 4 }), t("t" + n, x, 158, n, col, { "font-size": 26 }), c("e" + n, x + d * .75, 150, 8, C.amber, { o: 0, stroke: "#fff", "stroke-width": 1.5 }), l("f" + n, x + rr, 150, x + d * .75 - 8, 150, C.pink, { draw: 0, "stroke-width": n === "Li" ? 7 : n === "Na" ? 4 : 2 }), t("r" + n, x, 262, "", col, { "font-size": 18 })); });
      items.push(t("lab", 320, 30, "Group 1 metals", C.w, { "font-size": 24 }), t("rs", 320, 296, "", C.amber, { "font-size": 22 }));
      return { w: 640, h: 320, label: "Lithium, sodium and potassium with their outer electrons at increasing distance", items, steps: [
        { cap: "The alkali metals in Group 1 each have 1 electron in their outer shell. Going down the group the atoms get bigger.", set: { eLi: { o: 1 }, eNa: { o: 1 }, eK: { o: 1 } } },
        { cap: "In a reaction the atom loses that outer electron to form a 1+ ion. The attraction between the nucleus and the outer electron is strongest in the smallest atom.", set: { fLi: { draw: 1 }, fNa: { draw: 1 }, fK: { draw: 1 }, rLi: { t: "strong pull" }, rNa: { t: "weaker pull" }, rK: { t: "weakest pull" } } },
        { cap: "Further from the nucleus, the outer electron is held less tightly and is lost more easily. So reactivity increases down the group: lithium < sodium < potassium.", set: { rs: { t: "Reactivity increases down Group 1" }, lab: { t: "Li → Na → K: more and more reactive" } } },
        { cap: "They react with water to make a metal hydroxide and hydrogen gas, forming an alkaline solution: 2Na + 2H₂O → 2NaOH + H₂. They are stored under oil.", set: { rs: { t: "2Na + 2H₂O → 2NaOH + H₂", fill: C.green } } }
      ] };
    })(),

    "Chromatography": (() => {
      const items = [r("paper", 250, 30, 140, 250, "rgba(255,255,255,.12)", { stroke: C.grey, "stroke-width": 2, rx: 4 }), r("solv", 251, 262, 138, 0, "rgba(77,171,255,.35)", { rx: 0 }), l("base", 250, 240, 390, 240, C.w, { "stroke-width": 2, "stroke-dasharray": "4 4" }), t("bl", 240, 244, "start line", C.grey, { "text-anchor": "end", "font-size": 14 }),
        c("sa", 285, 238, 8, C.pink), c("sb", 320, 238, 8, C.green), c("sc", 355, 238, 8, C.blue), c("m", 320, 238, 9, C.w, { o: 0 }),
        l("fr", 250, 60, 390, 60, C.amber, { draw: 0, "stroke-width": 3 }), t("frt", 400, 64, "solvent front", C.amber, { "text-anchor": "start", "font-size": 14, o: 0 }), t("rf", 350, 292, "", C.w, { "font-size": 18 }), t("lab", 320, 22, "", C.w, { "font-size": 20 })];
      items.splice(items.findIndex((i) => i[1] === "m"), 1);
      return { w: 700, h: 300, label: "Chromatography paper separating a mixture of coloured spots", items, steps: [
        { cap: "Paper chromatography separates a mixture. Put a small spot of each sample on a pencil line near the bottom of the paper. Pencil is used because ink would dissolve and run.", set: { lab: { t: "Spots on the start line" } } },
        { cap: "Stand the paper in a solvent (the mobile phase) below the line. The solvent soaks up the paper, carrying the substances with it.", set: { solv: { y: 200, height: 62 }, lab: { t: "Solvent rises up the paper" } } },
        { cap: "Different substances move different distances: the ones that dissolve better in the solvent travel further up the paper. Mark where the solvent front stops.", set: { solv: { y: 62, height: 200 }, sa: { cy: 190 }, sb: { cy: 120 }, sc: { cy: 82 }, fr: { draw: 1 }, frt: { o: 1 }, lab: { t: "Substances separate" } } },
        { cap: "The Rf value compares the distances: Rf = distance moved by the substance ÷ distance moved by the solvent. For the green spot, 120 ÷ 180 ≈ 0.67. A pure substance gives one spot.", set: { rf: { t: "Rf = distance by spot ÷ distance by solvent" } } }
      ] };
    })(),

    "Reversible reactions and equilibrium": (() => {
      const items = [l("ax", 60, 260, 600, 260, C.grey, { "stroke-width": 4 }), l("ay", 60, 260, 60, 30, C.grey, { "stroke-width": 4 }), t("xl", 330, 292, "Time", C.grey, { "font-size": 16 }), t("yl", 34, 150, "Concentration", C.grey, { "font-size": 14, rot: -90, ox: 34, oy: 150 }),
        p("re", "M60 50C110 100 170 146 240 150L580 150", C.blue, "none", { draw: 0, "stroke-width": 5 }), p("pr", "M60 258C110 230 170 196 240 192L580 192", C.pink, "none", { draw: 0, "stroke-width": 5 }), l("eq", 240, 40, 240, 260, C.amber, { "stroke-width": 3, "stroke-dasharray": "6 6", o: 0 }),
        t("rl", 590, 140, "Reactants", C.blue, { "text-anchor": "end", "font-size": 16, o: 0 }), t("pl", 590, 214, "Products", C.pink, { "text-anchor": "end", "font-size": 16, o: 0 }), t("eql", 252, 50, "Equilibrium", C.amber, { "text-anchor": "start", "font-size": 17, o: 0 }), t("lab", 330, 22, "A ⇌ B", C.w, { "font-size": 26 })];
      return { w: 640, h: 310, label: "A graph of concentrations approaching equilibrium", items, steps: [
        { cap: "In a reversible reaction the products can react to turn back into the reactants. We show this with the symbol ⇌.", set: { lab: { t: "reactants ⇌ products" } } },
        { cap: "At the start only reactants are present. The forward reaction is fast, so reactants are used up and products build up.", set: { re: { draw: .35 }, pr: { draw: .35 } } },
        { cap: "As products form, the reverse reaction speeds up. Soon the forward and reverse reactions happen at the same rate.", set: { re: { draw: 1 }, pr: { draw: 1 }, eq: { o: 1 }, eql: { o: 1 }, rl: { o: 1 }, pl: { o: 1 } } },
        { cap: "This is dynamic equilibrium. The reactions are still happening, but the concentrations stay constant. They do not have to be equal. It only happens in a closed system.", set: { lab: { t: "Equal rates, constant concentrations", fill: C.amber } } }
      ] };
    })(),

    "Greenhouse gases": (() => {
      const items = [r("sky", 40, 60, 560, 110, "rgba(120,200,255,.1)", { rx: 8 }), r("earth", 40, 250, 560, 40, "#3b7a4a", { rx: 8 }), t("atm", 320, 100, "Atmosphere with greenhouse gases (CO₂, CH₄, H₂O)", C.grey, { "font-size": 15 }), c("sun", 560, 28, 22, "#ffd43b", { stroke: "#fff", "stroke-width": 2 })];
      [[130, 22, 130, 242], [250, 22, 250, 242], [370, 22, 370, 242]].forEach((q, i) => items.push(p("s" + i, arrow(...q), "#ffd43b", "none", { draw: 0, "stroke-width": 5 })));
      [[190, 246, 190, 70], [310, 246, 310, 70]].forEach((q, i) => items.push(p("ir" + i, arrow(...q), "#ff6b4a", "none", { draw: 0, "stroke-width": 5 })));
      [[190, 90, 160, 240], [310, 90, 280, 240]].forEach((q, i) => items.push(p("bk" + i, arrow(...q), "#ff6b4a", "none", { draw: 0, "stroke-width": 4, "stroke-dasharray": "none" })));
      items.push(t("lab", 320, 22, "", C.w, { "font-size": 22 }), t("lab2", 320, 320, "", C.amber, { "font-size": 22 }));
      return { w: 640, h: 340, label: "Sunlight arriving, infrared leaving the Earth and being absorbed by greenhouse gases", items, steps: [
        { cap: "Short-wavelength radiation from the Sun passes through the atmosphere and warms the Earth's surface.", set: { s0: { draw: 1 }, s1: { draw: 1 }, s2: { draw: 1 }, lab: { t: "Sunlight in" } } },
        { cap: "The warm Earth emits longer-wavelength infrared radiation back towards space.", set: { ir0: { draw: 1 }, ir1: { draw: 1 }, lab: { t: "Infrared radiation out" } } },
        { cap: "Greenhouse gases absorb some of this infrared and re-emit it in all directions, including back down. This keeps the Earth warm: the greenhouse effect.", set: { bk0: { draw: 1 }, bk1: { draw: 1 }, lab: { t: "Some is sent back to Earth" } } },
        { cap: "Burning fossil fuels and farming add more CO₂ and methane. More infrared is trapped, so average temperatures rise: global warming and climate change.", set: { lab2: { t: "More greenhouse gases = more warming" } } }
      ] };
    })(),

    "Moles": (() => {
      const items = [g("tri", "320,40 190,250 450,250", "rgba(255,255,255,.06)", C.w, { "stroke-width": 4 }), l("h1", 220, 190, 420, 190, C.w, { "stroke-width": 3 }), l("h2", 320, 190, 320, 250, C.w, { "stroke-width": 3 }), t("m", 320, 160, "mass (g)", C.pink, { "font-size": 26 }), t("n", 255, 232, "moles", C.blue, { "font-size": 24 }), t("mr", 385, 232, "Mr", C.green, { "font-size": 26 }),
        t("f", 540, 110, "", C.amber, { "font-size": 22 }), t("f2", 540, 150, "", C.w, { "font-size": 20 }), t("f3", 540, 190, "", C.w, { "font-size": 20 }), t("ex", 320, 290, "", C.amber, { "font-size": 22 })];
      return { w: 700, h: 320, label: "A formula triangle for moles, mass and relative formula mass", items, steps: [
        { cap: "A mole is a fixed number of particles: 6.02 × 10²³ (the Avogadro constant). The mass of one mole of a substance in grams equals its relative formula mass, Mr." },
        { cap: "The formula triangle links the three quantities: moles = mass ÷ Mr. Cover the one you want to find.", set: { f: { t: "moles = mass ÷ Mr" } } },
        { cap: "To find the mass, cover mass: mass = moles × Mr. To find Mr, cover Mr: Mr = mass ÷ moles.", set: { f2: { t: "mass = moles × Mr" }, f3: { t: "Mr = mass ÷ moles" } } },
        { cap: "Example: how many moles in 11 g of carbon dioxide? Mr of CO₂ = 12 + 16 + 16 = 44, so moles = 11 ÷ 44 = 0.25 mol.", set: { ex: { t: "11 ÷ 44 = 0.25 mol" } } }
      ] };
    })()
  });
})();
