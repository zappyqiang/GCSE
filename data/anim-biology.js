/* Animated explainers and simulations for Biology. */
(function () {
  const { c, r, l, t, p, g, arrow, COL: C } = ANIM.h;
  const box = (id, x, y, w, h, col, label, tc) => [r(id, x, y, w, h, col, { rx: 12, o: 0 }), t(id + "t", x + w / 2, y + h / 2 + 7, label, tc || "#04122e", { "font-size": 18, o: 0 })];
  const on = (ids) => Object.fromEntries(ids.map((i) => [i, { o: 1 }]));

  GAME.explain({
    "Diffusion": { sim: "diffusion", cap: "Diffusion is the net movement of particles from a region of higher concentration to a region of lower concentration. Remove the barrier and watch the two colours mix. Higher temperature means faster diffusion. It is a passive process: it needs no energy from the cell." },
    "Osmosis": { sim: "osmosis", cap: "Osmosis is the diffusion of water through a partially permeable membrane from a dilute solution to a more concentrated solution. The large solute particles cannot pass through, so water moves towards the concentrated side and its level rises." },

    "Active transport": (() => {
      const items = [r("mem", 60, 150, 520, 18, "rgba(255,184,77,.35)", { stroke: C.amber, "stroke-width": 2, rx: 8 }), r("pro", 290, 140, 60, 38, C.purple, { rx: 14 }), t("out", 320, 60, "Outside the cell: low concentration", C.w, { "font-size": 17 }), t("in", 320, 270, "Inside the cell: high concentration", C.w, { "font-size": 17 })];
      [[100, 80], [450, 100], [540, 70]].forEach((q, i) => items.push(c("o" + i, q[0], q[1], 9, C.green)));
      [[110, 210], [170, 240], [230, 205], [400, 225], [470, 200], [520, 245], [350, 250], [290, 235]].forEach((q, i) => items.push(c("i" + i, q[0], q[1], 9, C.green)));
      items.push(c("mv", 320, 100, 11, C.pink, { stroke: "#fff", "stroke-width": 2 }), t("atp", 380, 160, "ATP", C.amber, { "font-size": 24, o: 0 }), t("lab", 320, 24, "", C.w, { "font-size": 20 }));
      return { w: 640, h: 300, label: "A carrier protein using ATP to move a molecule against a concentration gradient", items, steps: [
        { cap: "There are more of these molecules inside the cell than outside. Diffusion would move them out, but the cell needs to take more in.", set: { lab: { t: "Wrong way for diffusion" } } },
        { cap: "Active transport moves substances from a lower to a higher concentration: against the concentration gradient. A carrier protein in the membrane picks up the molecule.", set: { mv: { cy: 150 }, lab: { t: "Carrier protein binds the molecule" } } },
        { cap: "This needs energy from respiration, released as ATP. Cells that do lots of active transport have many mitochondria.", set: { atp: { o: 1 }, mv: { cy: 215 }, lab: { t: "Energy from respiration is used" } } },
        { cap: "Examples: root hair cells take up mineral ions from dilute soil water, and the gut absorbs glucose when its concentration in the gut is lower than in the blood.", set: { lab: { t: "Roots and the gut use active transport", fill: C.amber } } }
      ] };
    })(),

    "Chromosomes and mitosis": (() => {
      const chr = (id, x, y, col, o) => r(id, x, y, 9, 44, col, { rx: 4, o });
      const items = [c("cell", 320, 150, 110, "rgba(120,200,255,.1)", { stroke: C.blue, "stroke-width": 4 }), c("n1", 320, 90, 62, "rgba(120,200,255,.1)", { stroke: C.blue, "stroke-width": 4, o: 0 }), c("n2", 320, 210, 62, "rgba(120,200,255,.1)", { stroke: C.blue, "stroke-width": 4, o: 0 }),
        chr("a", 260, 110, C.pink, 1), chr("a2", 270, 110, C.pink, 0), chr("b", 370, 170, C.green, 1), chr("b2", 380, 170, C.green, 0), t("lab", 320, 24, "", C.w, { "font-size": 22 }), l("eq", 230, 150, 410, 150, C.grey, { "stroke-width": 2, "stroke-dasharray": "5 5", o: 0 })];
      return { w: 640, h: 300, label: "The stages of mitosis in a cell with two chromosomes", items, steps: [
        { cap: "Mitosis makes two genetically identical cells for growth and repair. This cell has 2 chromosomes (humans have 46). The cell grows and its DNA is copied.", set: { lab: { t: "Before division" } } },
        { cap: "Each chromosome is copied, so it now has two identical arms joined together.", set: { a2: { o: 1 }, b2: { o: 1 }, lab: { t: "DNA is replicated" } } },
        { cap: "The chromosomes line up across the middle of the cell.", set: { eq: { o: 1 }, a: { x: 290, y: 128 }, a2: { x: 300, y: 128 }, b: { x: 340, y: 128 }, b2: { x: 350, y: 128 }, lab: { t: "Chromosomes line up" } } },
        { cap: "The two copies are pulled apart to opposite ends of the cell.", set: { eq: { o: 0 }, a: { y: 70 }, b: { y: 70 }, a2: { y: 186 }, b2: { y: 186 }, lab: { t: "Copies pulled to opposite ends" } } },
        { cap: "A new nucleus forms around each set and the cell divides. Two identical daughter cells are made, each with a full set of chromosomes.", set: { cell: { o: 0 }, n1: { o: 1 }, n2: { o: 1 }, lab: { t: "Two identical daughter cells" } } }
      ] };
    })(),

    "Heart and blood vessels": (() => {
      const N = { ra: [130, 60, "Right atrium", C.blue], rv: [280, 60, "Right ventricle", C.blue], lu: [430, 60, "Lungs", C.purple], la: [500, 150, "Left atrium", C.pink], lv: [430, 240, "Left ventricle", C.pink], bo: [280, 240, "Body", C.amber] };
      const items = [];
      Object.entries(N).forEach(([k, [x, y, lab, col]]) => items.push(...box(k, x - 55, y - 24, 110, 48, col, lab).map((it, i) => (i ? (it[2]["font-size"] = 14, it) : it))));
      const A = [["a1", [130, 60 - 24 + 24, 130, 60]], ["a2", [185, 60, 225, 60]], ["a3", [335, 60, 375, 60]], ["a4", [455, 84, 485, 126]], ["a5", [480, 174, 450, 216]], ["a6", [375, 240, 335, 240]], ["a7", [225, 240, 160, 150]]];
      A.slice(1).forEach(([id, q], i) => items.push(p(id, arrow(...q), i < 2 ? C.blue : i < 5 ? C.pink : C.amber, "none", { draw: 0, "stroke-width": 5 })));
      items.push(p("a8", arrow(160, 150, 150, 90), C.blue, "none", { draw: 0, "stroke-width": 5 }), t("lab", 290, 152, "", C.w, { "font-size": 16 }), t("lab2", 320, 296, "", C.amber, { "font-size": 17 }));
      return { w: 640, h: 310, label: "Blood flowing in a double circulation through the heart, lungs and body", items, steps: [
        { cap: "Deoxygenated blood returns from the body through the vena cava into the right atrium.", set: Object.assign(on(["bo", "bot", "ra", "rat"]), { a8: { draw: 1 }, lab: { t: "Deoxygenated blood in", fill: C.blue } }) },
        { cap: "The atrium contracts and pushes blood into the right ventricle.", set: Object.assign(on(["rv", "rvt"]), { a2: { draw: 1 } }) },
        { cap: "The right ventricle pumps the blood to the lungs in the pulmonary artery. In the lungs it picks up oxygen and gives up carbon dioxide.", set: Object.assign(on(["lu", "lut"]), { a3: { draw: 1 }, lab: { t: "Gas exchange in the lungs", fill: C.purple } }) },
        { cap: "Oxygenated blood returns in the pulmonary vein to the left atrium, then moves into the left ventricle.", set: Object.assign(on(["la", "lat", "lv", "lvt"]), { a4: { draw: 1 }, a5: { draw: 1 }, lab: { t: "Oxygenated blood", fill: C.pink } }) },
        { cap: "The left ventricle has a thicker muscular wall. It pumps blood at high pressure through the aorta to the whole body.", set: { a6: { draw: 1 }, a7: { draw: 1 }, lab: { t: "Double circulation: lungs, then body", fill: C.amber }, lab2: { t: "Arteries carry blood away from the heart, veins carry it back" } } }
      ] };
    })(),

    "Photosynthesis": (() => {
      const items = [c("leaf", 320, 150, 70, "rgba(74,222,128,.35)", { stroke: C.green, "stroke-width": 5 }), t("lt", 320, 146, "Leaf", C.green, { "font-size": 22 }), t("lt2", 320, 172, "chloroplasts", C.green, { "font-size": 14 }),
        p("sun", arrow(110, 40, 250, 110), "#ffd43b", "none", { draw: 0, "stroke-width": 6 }), t("sunt", 90, 36, "Light", "#ffd43b", { "font-size": 20, o: 0 }), p("co", arrow(100, 150, 245, 150), C.grey, "none", { draw: 0, "stroke-width": 6 }), t("cot", 90, 140, "CO₂", C.w, { "font-size": 20, o: 0 }),
        p("h2o", arrow(320, 290, 320, 225), C.blue, "none", { draw: 0, "stroke-width": 6 }), t("h2ot", 320, 306, "Water (from the roots)", C.blue, { "font-size": 17, o: 0 }), p("o2", arrow(395, 130, 540, 80), C.green, "none", { draw: 0, "stroke-width": 6 }), t("o2t", 555, 72, "O₂", C.green, { "font-size": 20, o: 0 }),
        p("glu", arrow(395, 175, 540, 215), C.pink, "none", { draw: 0, "stroke-width": 6 }), t("glut", 565, 224, "Glucose", C.pink, { "font-size": 20, o: 0 }), t("eq", 320, 340, "", C.amber, { "font-size": 20 }), t("lab", 320, 24, "Photosynthesis", C.w, { "font-size": 24 })];
      return { w: 640, h: 360, label: "A leaf using light, carbon dioxide and water to make glucose and oxygen", items, steps: [
        { cap: "Photosynthesis is how plants make food. Chlorophyll in the chloroplasts absorbs light energy. This is an endothermic reaction because it takes in energy.", set: { sun: { draw: 1 }, sunt: { o: 1 } } },
        { cap: "Carbon dioxide enters the leaf from the air through the stomata.", set: { co: { draw: 1 }, cot: { o: 1 } } },
        { cap: "Water is absorbed by the roots and carried up to the leaf.", set: { h2o: { draw: 1 }, h2ot: { o: 1 } } },
        { cap: "The leaf makes glucose, which is used for respiration, stored as starch, or turned into other substances. Oxygen is released as a by-product.", set: { glu: { draw: 1 }, glut: { o: 1 }, o2: { draw: 1 }, o2t: { o: 1 } } },
        { cap: "The word equation sums it up. The rate is limited by light intensity, carbon dioxide concentration or temperature, whichever is in short supply.", set: { eq: { t: "carbon dioxide + water → glucose + oxygen (in light)" } } }
      ] };
    })(),

    "Digestive system and enzymes": (() => {
      const items = [r("en", 190, 190, 260, 80, C.blue, { rx: 26 }), g("site", "300,190 340,190 320,222", "#0e1431", C.w, { "stroke-width": 2 }), t("ent", 250, 250, "Enzyme", "#04122e", { "font-size": 20 }),
        g("sub", "300,190 340,190 320,222", C.pink, C.w, { "stroke-width": 2, ty: -110, tx: 0 }), t("subt", 320, 60, "Substrate", C.pink, { "font-size": 18, o: 1 }),
        g("p1", "300,190 320,190 320,222", C.green, C.w, { o: 0, "stroke-width": 2, tx: 0, ty: 0 }), g("p2", "320,190 340,190 320,222", C.green, C.w, { o: 0, "stroke-width": 2, tx: 0, ty: 0 }), t("prt", 320, 40, "Products", C.green, { "font-size": 18, o: 0 }),
        g("den", "190,190 310,190 330,215 350,190 450,190 450,270 190,270", "rgba(255,107,129,.5)", C.pink, { o: 0, "stroke-width": 3 }), t("lab", 320, 316, "", C.w, { "font-size": 20 }), t("ac", 400, 218, "active site", C.w, { "font-size": 14, "text-anchor": "start" })];
      items.find((i) => i[1] === "ac")[2].o = 0;
      return { w: 640, h: 340, label: "A substrate fitting the active site of an enzyme, being split, and an enzyme being denatured", items, steps: [
        { cap: "Enzymes are biological catalysts that speed up reactions in digestion. Each enzyme has a special shape with an active site.", set: { lab: { t: "Lock and key model" } } },
        { cap: "Only the substrate with the matching shape fits into the active site, like a key in a lock. This is why each enzyme works on one type of substrate.", set: { sub: { ty: 0 }, subt: { o: 0 } } },
        { cap: "The enzyme breaks the substrate down, for example amylase breaking starch into sugars. The products leave and the enzyme is unchanged, ready to be used again.", set: { sub: { o: 0 }, p1: { o: 1, tx: -40, ty: -80 }, p2: { o: 1, tx: 40, ty: -80 }, prt: { o: 1 }, lab: { t: "Products leave. The enzyme is not used up." } } },
        { cap: "High temperatures or the wrong pH change the shape of the enzyme. The active site no longer fits the substrate: the enzyme is denatured and stops working.", set: { den: { o: 1 }, site: { o: 0 }, p1: { o: 0 }, p2: { o: 0 }, prt: { o: 0 }, lab: { t: "Denatured: the active site has changed shape", fill: C.pink } } }
      ] };
    })(),

    "Nervous system and reflexes": (() => {
      const N = [["st", 50, 150, "Stimulus", C.pink], ["re", 160, 150, "Receptor", C.amber], ["se", 270, 70, "Sensory neurone", C.blue], ["rl", 400, 70, "Relay neurone", C.purple], ["mo", 510, 150, "Motor neurone", C.blue], ["ef", 580, 230, "Effector", C.green]];
      const items = [];
      N.forEach(([id, x, y, lab, col]) => items.push(c(id, x, y, 22, col, { o: 0, stroke: "#fff", "stroke-width": 2 }), t(id + "t", x, y + 44, lab, col, { "font-size": 14, o: 0 })));
      [["s1", [72, 142, 140, 154]], ["s2", [178, 135, 252, 80]], ["s3", [292, 70, 378, 70]], ["s4", [420, 80, 490, 138]], ["s5", [525, 168, 565, 212]]].forEach(([id, q]) => items.push(p(id, arrow(...q), C.grey, "none", { draw: 0, "stroke-width": 4 })));
      items.push(c("sig", 50, 150, 9, "#fff", { o: 0 }), t("lab", 320, 24, "A reflex arc", C.w, { "font-size": 24 }), t("lab2", 320, 290, "", C.amber, { "font-size": 19 }));
      const at = (x, y) => ({ cx: x, cy: y, o: 1 });
      return { w: 640, h: 310, label: "A reflex arc from stimulus to response", items, steps: [
        { cap: "A reflex is a fast, automatic response that protects the body. Here a hand touches something sharp: that is the stimulus.", set: Object.assign(on(["st", "stt"]), { sig: at(50, 150) }) },
        { cap: "Receptors in the skin detect the stimulus and send an electrical impulse along a sensory neurone.", set: Object.assign(on(["re", "ret", "se", "set"]), { s1: { draw: 1 }, s2: { draw: 1 }, sig: at(270, 70) }) },
        { cap: "At the spinal cord the impulse crosses a synapse to a relay neurone. A synapse is a gap where a chemical passes the signal across.", set: Object.assign(on(["rl", "rlt"]), { s3: { draw: 1 }, sig: at(400, 70) }) },
        { cap: "It then crosses another synapse to a motor neurone, which carries the impulse to the effector.", set: Object.assign(on(["mo", "mot"]), { s4: { draw: 1 }, sig: at(510, 150) }) },
        { cap: "The effector (a muscle) contracts and pulls the hand away. The brain is bypassed, so the response is very fast.", set: Object.assign(on(["ef", "eft"]), { s5: { draw: 1 }, sig: at(580, 230), lab2: { t: "Stimulus → receptor → coordinator → effector → response" } }) }
      ] };
    })(),

    "Blood glucose and diabetes": (() => {
      const N = [["hi", 135, 60, "Blood glucose too high", C.pink], ["pa", 505, 60, "Pancreas releases insulin", C.amber], ["li", 505, 220, "Liver stores glucose as glycogen", C.blue], ["no", 135, 220, "Blood glucose falls to normal", C.green]];
      const items = [];
      N.forEach(([id, x, y, lab, col]) => items.push(...box(id, x - 120, y - 30, 240, 60, col, lab).map((it, i) => (i ? (it[2]["font-size"] = 15, it) : it))));
      [["a1", [260, 60, 380, 60]], ["a2", [505, 92, 505, 188]], ["a3", [385, 220, 260, 220]]].forEach(([id, q]) => items.push(p(id, arrow(...q), C.w, "none", { draw: 0, "stroke-width": 4 })));
      items.push(t("lab", 320, 140, "", C.w, { "font-size": 20 }), t("lab2", 320, 290, "", C.amber, { "font-size": 19 }));
      return { w: 640, h: 310, label: "Negative feedback keeping blood glucose levels steady", items, steps: [
        { cap: "After a meal, carbohydrate is digested and glucose floods into the blood, so the blood glucose concentration rises above the normal level.", set: on(["hi", "hit"]) },
        { cap: "The pancreas detects this and releases the hormone insulin into the blood.", set: Object.assign(on(["pa", "pat"]), { a1: { draw: 1 } }) },
        { cap: "Insulin makes liver and muscle cells take up glucose and convert the excess into glycogen for storage.", set: Object.assign(on(["li", "lit"]), { a2: { draw: 1 } }) },
        { cap: "Blood glucose falls back to normal. This is negative feedback: the response reverses the change. If glucose gets too low the pancreas releases glucagon, which makes the liver turn glycogen back into glucose.", set: Object.assign(on(["no", "not"]), { a3: { draw: 1 }, lab: { t: "Negative feedback", fill: C.green } }) },
        { cap: "In type 1 diabetes the pancreas makes too little insulin, treated with insulin injections. In type 2 the body cells stop responding to insulin: diet, exercise and weight loss help.", set: { lab2: { t: "Type 1: no insulin · Type 2: cells stop responding" } } }
      ] };
    })(),

    "DNA structure and proteins": (() => {
      const items = [p("b1", "", C.blue, "none", { draw: 0, "stroke-width": 6 }), p("b2", "", C.pink, "none", { draw: 0, "stroke-width": 6 })];
      const W = 560, x0 = 40, ph = (x, o) => 150 + 60 * Math.sin((x - x0) / 80 * Math.PI + o);
      let d1 = "", d2 = ""; for (let x = x0; x <= x0 + W; x += 5) { d1 += (x === x0 ? "M" : "L") + x + " " + ph(x, 0).toFixed(1); d2 += (x === x0 ? "M" : "L") + x + " " + ph(x, Math.PI).toFixed(1); }
      items[0][2].d = d1; items[1][2].d = d2;
      const cols = { A: C.amber, T: C.green, C: C.blue, G: C.purple }, seq = ["A", "T", "C", "G", "G", "C", "T", "A"], pair = { A: "T", T: "A", C: "G", G: "C" };
      seq.forEach((b, i) => { const x = 80 + i * 66, y1 = ph(x, 0), y2 = ph(x, Math.PI); items.push(l("r" + i, x, y1, x, y2, cols[b], { draw: 0, "stroke-width": 8 }), t("ba" + i, x, Math.min(y1, y2) - 8, b, cols[b], { o: 0, "font-size": 18 }), t("bb" + i, x, Math.max(y1, y2) + 22, pair[b], cols[pair[b]], { o: 0, "font-size": 18 })); });
      items.push(t("lab", 320, 24, "DNA double helix", C.w, { "font-size": 24 }), t("lab2", 320, 300, "", C.amber, { "font-size": 19 }));
      const rungs = Object.fromEntries(seq.map((_, i) => ["r" + i, { draw: 1 }])), letters = Object.fromEntries(seq.flatMap((_, i) => [["ba" + i, { o: 1 }], ["bb" + i, { o: 1 }]]));
      return { w: 640, h: 320, label: "A DNA double helix with complementary base pairs", items, steps: [
        { cap: "DNA is a double helix: two strands twisted together. Each strand has a sugar–phosphate backbone.", set: { b1: { draw: 1 }, b2: { draw: 1 } } },
        { cap: "Joining the strands are pairs of bases, which form the rungs of the ladder. There are four bases: A, T, C and G.", set: rungs },
        { cap: "Bases pair up in a fixed way: A always with T, and C always with G. This is complementary base pairing.", set: letters },
        { cap: "A gene is a section of DNA. The order of the bases is the code that tells the cell which amino acids to join together to make a particular protein. Every three bases code for one amino acid.", set: { lab2: { t: "Order of bases → order of amino acids → a protein" } } }
      ] };
    })(),

    "Genetic inheritance": (() => {
      const items = [t("hd", 320, 28, "Both parents are Bb (brown eyes, B dominant)", C.w, { "font-size": 20 }), t("pm", 240, 82, "Parent 1 gametes", C.grey, { "font-size": 14 }), t("pf", 140, 200, "Parent 2", C.grey, { "font-size": 14 })];
      const cells = [["BB", C.green], ["Bb", C.green], ["Bb", C.green], ["bb", C.pink]];
      [["B", 240], ["b", 360]].forEach(([a, x]) => items.push(t("g" + a, x, 110, a, C.amber, { "font-size": 30 })));
      [["B", 160], ["b", 240]].forEach(([a, y]) => items.push(t("h" + a, 190, y + 30, a, C.amber, { "font-size": 30 })));
      cells.forEach(([gt, col], i) => { const x = 200 + (i % 2) * 120, y = 130 + Math.floor(i / 2) * 80; items.push(r("c" + i, x, y, 110, 70, "rgba(255,255,255,.05)", { stroke: C.grey, "stroke-width": 3, rx: 8 }), t("ct" + i, x + 55, y + 45, gt, col, { "font-size": 30, o: 0 })); });
      items.push(t("res", 320, 305, "", C.amber, { "font-size": 22 }), t("res2", 320, 332, "", C.w, { "font-size": 18 }));
      const fill = (n) => Object.fromEntries(Array.from({ length: n }, (_, i) => ["ct" + i, { o: 1 }]));
      return { w: 640, h: 350, label: "A Punnett square for two heterozygous parents", items, steps: [
        { cap: "Each parent is heterozygous: they carry one dominant allele B and one recessive allele b. Each gamete (sex cell) carries just one of the alleles.", set: {} },
        { cap: "A Punnett square combines the gametes from each parent in every possible way. Fill in the top-left box: B + B gives BB.", set: fill(1) },
        { cap: "Complete the square: BB, Bb, Bb and bb.", set: fill(4) },
        { cap: "BB and Bb both show the dominant trait (brown eyes). Only bb shows the recessive trait. So 3 in 4 (75%) are brown-eyed and 1 in 4 (25%) are blue-eyed: a ratio of 3 : 1.", set: { res: { t: "Phenotype ratio 3 dominant : 1 recessive" }, res2: { t: "Genotypes: 1 BB : 2 Bb : 1 bb" } } }
      ] };
    })(),

    "Evolution": (() => {
      const items = [t("g1", 60, 60, "Generation 1", C.grey, { "text-anchor": "start", "font-size": 16 }), t("g2", 60, 200, "Generation 2", C.grey, { "text-anchor": "start", "font-size": 16 }), t("lab", 320, 24, "", C.w, { "font-size": 22 })];
      const first = ["g", "b", "g", "b", "b", "g", "b", "b", "g", "b"], second = ["b", "b", "b", "b", "b", "b", "b", "g", "b", "b"], col = { g: "#4ade80", b: "#a0694a" };
      first.forEach((k, i) => items.push(c("a" + i, 90 + i * 52, 110, 18, col[k], { stroke: "#fff", "stroke-width": 2 })));
      second.forEach((k, i) => items.push(c("n" + i, 90 + i * 52, 250, 18, col[k], { o: 0, stroke: "#fff", "stroke-width": 2 })));
      items.push(t("eagle", 580, 50, "▼ predator", C.pink, { o: 0, "font-size": 15 }));
      const eaten = Object.fromEntries(first.map((k, i) => [i, k]).filter(([, k]) => k === "g").map(([i]) => ["a" + i, { o: .15 }])), keepOne = { a8: { o: 1 } };
      return { w: 640, h: 300, label: "Natural selection in a population of beetles on brown soil", items, steps: [
        { cap: "Individuals in a species show variation. These beetles live on brown soil. Some are green and some are brown because of differences in their genes.", set: { lab: { t: "Variation in the population" } } },
        { cap: "Green beetles are easy for predators to see, so more of them are eaten. Brown beetles are camouflaged, so more survive. This is natural selection: survival of the fittest.", set: Object.assign({ eagle: { o: 1 }, lab: { t: "Predators eat the beetles they can see" } }, eaten, { a0: { o: .15 }, a2: { o: .15 }, a5: { o: .15 } }) },
        { cap: "The survivors breed and pass on the genes for brown colour to their offspring.", set: Object.assign({ lab: { t: "Survivors reproduce" } }, Object.fromEntries(Array.from({ length: 10 }, (_, i) => ["n" + i, { o: 1 }]))) },
        { cap: "Over many generations the useful characteristic becomes more common in the population. If it carries on, a new species can form. This is evolution by natural selection.", set: { lab: { t: "Brown becomes the more common type", fill: C.amber } } }
      ] };
    })(),

    "Carbon and water cycles": (() => {
      const N = [["at", 320, 50, "CO₂ in the air", C.grey], ["pl", 120, 170, "Plants", C.green], ["an", 320, 170, "Animals", C.amber], ["de", 320, 270, "Decomposers", C.purple], ["ff", 530, 190, "Fossil fuels", C.pink]];
      const items = [];
      N.forEach(([id, x, y, lab, col]) => items.push(...box(id, x - 62, y - 22, 124, 44, col, lab, "#04122e").map((it, i) => (i ? (it[2]["font-size"] = 15, it) : it))));
      const A = [["ph", [250, 70, 160, 148], C.green, "photosynthesis", 190, 100], ["fe", [182, 170, 256, 170], C.amber, "feeding", 220, 160], ["re1", [290, 148, 300, 80], C.pink, "respiration", 372, 114], ["re2", [150, 148, 280, 76], C.pink, "", 0, 0], ["de2", [320, 193, 320, 245], C.purple, "death", 296, 222], ["re3", [345, 248, 365, 76], C.pink, "", 0, 0], ["co", [468, 175, 372, 62], C.pink, "combustion", 470, 122]];
      A.forEach(([id, q, col, lab, tx, ty]) => { items.push(p(id, arrow(...q), col, "none", { draw: 0, "stroke-width": 4 })); if (lab) items.push(t(id + "t", tx, ty, lab, col, { o: 0, "font-size": 14 })); });
      items.push(t("lab", 320, 308, "", C.amber, { "font-size": 19 }));
      const sh = (ids) => Object.fromEntries(ids.flatMap((i) => [[i, { draw: 1 }], [i + "t", { o: 1 }]]));
      return { w: 640, h: 330, label: "The carbon cycle", items, steps: [
        { cap: "The carbon cycle shows how carbon moves between living things, the air and the ground. Plants take in carbon dioxide from the air for photosynthesis.", set: Object.assign(on(["at", "att", "pl", "plt"]), sh(["ph"])) },
        { cap: "Animals get carbon compounds by eating plants and other animals: carbon moves along the food chain.", set: Object.assign(on(["an", "ant"]), sh(["fe"])) },
        { cap: "Plants and animals release carbon dioxide back into the air when they respire.", set: Object.assign({ re2: { draw: 1 } }, sh(["re1"])) },
        { cap: "When organisms die, decomposers break them down and release carbon dioxide through respiration.", set: Object.assign(on(["de", "det"]), { re3: { draw: 1 } }, sh(["de2"])) },
        { cap: "Over millions of years dead organisms can form fossil fuels. Burning them (combustion) releases carbon dioxide that was locked away.", set: Object.assign(on(["ff", "fft"]), sh(["co"]), { lab: { t: "Carbon is constantly recycled" } }) }
      ] };
    })(),

    "Trophic levels and biomass": (() => {
      const L = [["Producers", "1000 kg", 440, C.green], ["Primary consumers", "100 kg", 300, C.blue], ["Secondary consumers", "10 kg", 180, C.amber], ["Tertiary consumers", "1 kg", 80, C.pink]];
      const items = [];
      L.forEach(([n, m, w, col], i) => { const y = 230 - i * 62; items.push(r("p" + i, 320 - w / 2, y, w, 54, col, { rx: 8, o: i ? 0 : 1 }), t("pt" + i, 320, y + 33, m, "#04122e", { "font-size": 20, o: i ? 0 : 1 }), t("pn" + i, 632, y + 33, n, col, { "text-anchor": "end", "font-size": 15, o: i ? 0 : 1 })); });
      items.push(t("lab", 320, 26, "Pyramid of biomass", C.w, { "font-size": 24 }), t("loss", 320, 310, "", C.amber, { "font-size": 19 }));
      const lv = (i) => Object.fromEntries([["p" + i, { o: 1 }], ["pt" + i, { o: 1 }], ["pn" + i, { o: 1 }]]);
      return { w: 640, h: 330, label: "A pyramid of biomass with about ten percent passed on at each level", items, steps: [
        { cap: "Producers such as plants make biomass by photosynthesis. They are the first trophic level and are at the base of the pyramid.", set: {} },
        { cap: "Primary consumers eat the producers. Only about 10% of the biomass is passed on, so this level is much smaller.", set: lv(1) },
        { cap: "Each level up again passes on only about 10%.", set: Object.assign(lv(2), lv(3)) },
        { cap: "Biomass is lost at each stage: not all the organism is eaten, some is not digested and lost as waste, and some is used in respiration and lost as heat. This is why food chains are short.", set: { loss: { t: "Efficiency = biomass passed on ÷ biomass at the level × 100" } } }
      ] };
    })(),

    "Vaccination": (() => {
      const items = [l("ax", 60, 260, 600, 260, C.grey, { "stroke-width": 4 }), l("ay", 60, 260, 60, 30, C.grey, { "stroke-width": 4 }), t("xl", 330, 292, "Time", C.grey, { "font-size": 16 }), t("yl", 34, 150, "Antibodies", C.grey, { "font-size": 14, rot: -90, ox: 34, oy: 150 }),
        p("c1", "M60 258L150 258C200 258 220 200 260 230C300 250 330 258 380 258", C.blue, "none", { draw: 0, "stroke-width": 5 }), p("c2", "M380 258L400 258C420 258 430 60 480 60C520 60 540 120 600 200", C.pink, "none", { draw: 0, "stroke-width": 5 }),
        t("v1", 160, 215, "1st exposure: slow and weak", C.blue, { o: 0, "font-size": 16 }), t("v2", 500, 40, "2nd exposure: fast and strong", C.pink, { o: 0, "font-size": 16 }), t("lab", 320, 20, "", C.w, { "font-size": 20 })];
      return { w: 640, h: 310, label: "Antibody levels after a first and second exposure to a pathogen", items, steps: [
        { cap: "Pathogens have antigens on their surface. When you are first exposed, your white blood cells need time to make the right antibodies, so you can become ill.", set: { c1: { draw: 1 }, v1: { o: 1 } } },
        { cap: "Some white blood cells become memory cells that remember the pathogen.", set: { lab: { t: "Memory cells are made" } } },
        { cap: "A vaccine contains a dead or weakened form of the pathogen, or just its antigens. It triggers antibodies and memory cells without making you ill.", set: { lab: { t: "Vaccine = antigens, no disease" } } },
        { cap: "If the real pathogen arrives later, memory cells respond much faster and make far more antibodies, so the pathogen is destroyed before you get ill. If enough people are vaccinated, even unprotected people are safer: herd immunity.", set: { c2: { draw: 1 }, v2: { o: 1 }, lab: { t: "Immunity", fill: C.green } } }
      ] };
    })(),

    "Transpiration and translocation": (() => {
      const items = [r("soil", 40, 270, 560, 40, "#5a3d2b", { rx: 8 }), l("stem", 320, 270, 320, 90, C.green, { "stroke-width": 14 }), p("leafL", "M320 120C250 100 220 60 210 40C260 40 310 70 320 120Z", C.green, C.green, { "fill-opacity": .6 }), p("leafR", "M320 100C390 80 420 40 430 20C380 20 330 50 320 100Z", C.green, C.green, { "fill-opacity": .6 }),
        p("wup", arrow(300, 255, 300, 105), C.blue, "none", { draw: 0, "stroke-width": 5 }), t("wt", 270, 190, "Water in the xylem", C.blue, { "font-size": 15, "text-anchor": "end", o: 0 }), p("tr", arrow(200, 70, 120, 30), C.grey, "none", { draw: 0, "stroke-width": 5 }), p("tr2", arrow(440, 50, 520, 20), C.grey, "none", { draw: 0, "stroke-width": 5 }), t("trt", 612, 128, "Water vapour out through stomata", C.grey, { "font-size": 14, "text-anchor": "end", o: 0 }),
        p("sugar", arrow(345, 100, 345, 255), C.amber, "none", { draw: 0, "stroke-width": 5 }), t("st", 372, 190, "Sugars in the phloem", C.amber, { "font-size": 15, "text-anchor": "start", o: 0 }), t("rt", 160, 292, "Root hair cells absorb water", C.w, { "font-size": 15, o: 0 }), t("lab", 320, 330, "", C.w, { "font-size": 19 })];
      return { w: 640, h: 345, label: "A plant showing transpiration in the xylem and translocation in the phloem", items, steps: [
        { cap: "Root hair cells absorb water and mineral ions from the soil by osmosis and active transport.", set: { rt: { o: 1 } } },
        { cap: "Water travels up the stem in xylem vessels, which are dead, hollow tubes strengthened with lignin.", set: { wup: { draw: 1 }, wt: { o: 1 } } },
        { cap: "Water evaporates from the leaves and diffuses out through the stomata. This is transpiration. It pulls more water up the plant, a continuous stream.", set: { tr: { draw: 1 }, tr2: { draw: 1 }, trt: { o: 1 } } },
        { cap: "Transpiration is faster when it is hot, bright, windy and dry. Guard cells open and close the stomata to control water loss.", set: { lab: { t: "Faster: heat, light, wind, low humidity" } } },
        { cap: "Translocation is different: the phloem carries dissolved sugars made in the leaves to growing and storage parts of the plant. It uses energy and moves in both directions.", set: { sugar: { draw: 1 }, st: { o: 1 }, lab: { t: "Xylem: water up. Phloem: sugars to wherever needed.", fill: C.amber } } }
      ] };
    })()
  });
})();
