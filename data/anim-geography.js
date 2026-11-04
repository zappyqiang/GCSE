(function () {
  const { c, r, l, t, p, g, arrow, COL: C } = ANIM.h;
  GAME.explain({
    "Tectonic plates and hazards": (() => {
      const items = [
        r("sea", 0, 130, 640, 150, "#14346b", { rx: 0 }),
        r("pl", 40, 150, 260, 60, "#7a5b3a", { rx: 8 }), r("pr", 340, 150, 260, 60, "#a06a3a", { rx: 8 }),
        r("mag", 0, 215, 640, 70, "#d9441a", { rx: 0, o: .45 }),
        p("a1", arrow(150, 120, 250, 120), C.amber, "none", { o: 0 }), p("a2", arrow(490, 120, 390, 120), C.amber, "none", { o: 0 }),
        g("vol", "320,150 340,95 360,150", "#8a5a3a", null, { o: 0 }), c("lava", 340, 85, 0, C.pink, { o: 0 }),
        t("ttl", 320, 40, "Destructive boundary", C.w, { "font-size": 24 }), t("lbl", 320, 255, "", C.w, { "font-size": 18 })
      ];
      return { w: 640, h: 290, label: "Two plates meeting at a destructive boundary", items, steps: [
        { cap: "The Earth's crust is split into tectonic plates floating on the hot mantle." },
        { cap: "At a destructive boundary, an oceanic plate and a continental plate move towards each other.", set: { a1: { o: 1 }, a2: { o: 1 } } },
        { cap: "The denser oceanic plate is forced down into the mantle (subduction). Pressure builds and releases as earthquakes.", set: { pl: { y: 185, rot: 6, ox: 150, oy: 180 }, lbl: { t: "Subduction zone" } } },
        { cap: "The plate melts and magma rises, erupting as a volcano.", set: { vol: { o: 1 }, lava: { o: 1, r: 12 }, lbl: { t: "Magma rises, volcano erupts" } } }
      ] };
    })(),

    "River processes and landforms": (() => {
      const items = [
        p("river", "M40 160 C160 60 220 260 320 160 S 500 60 600 160", C.blue, "none", { "stroke-width": 26, o: .8 }),
        t("o1", 270, 235, "Outside: fast, erosion", C.pink, { "font-size": 16, o: 0 }), t("i1", 200, 82, "Inside: slow, deposition", C.green, { "font-size": 16, o: 0 }),
        p("neck", "M230 160 L320 160", C.amber, "none", { "stroke-width": 4, o: 0, "stroke-dasharray": "6 6" }),
        t("ttl", 320, 30, "Meander formation", C.w, { "font-size": 24 }), t("lbl", 320, 280, "", C.amber, { "font-size": 20 })
      ];
      return { w: 640, h: 300, label: "How a river meander and ox-bow lake develop", items, steps: [
        { cap: "A river winds across its floodplain in bends called meanders." },
        { cap: "Water flows fastest on the outside of each bend, so it erodes the bank and forms a river cliff.", set: { o1: { o: 1 } } },
        { cap: "On the inside of the bend the water is slow, so material is deposited and a slip-off slope builds up.", set: { i1: { o: 1 } } },
        { cap: "Over time the bends grow and the neck between them narrows.", set: { neck: { o: 1 }, lbl: { t: "The neck gets narrower" } } },
        { cap: "In a flood the river cuts through the neck. Deposition seals the old bend, leaving an ox-bow lake.", set: { river: { d: "M40 160 C200 160 440 160 600 160" }, lbl: { t: "Ox-bow lake formed", fill: C.green } } }
      ] };
    })(),

    "Evidence and causes of climate change": (() => {
      const items = [
        c("sun", 80, 70, 36, C.amber), r("atm", 0, 130, 640, 36, C.purple, { rx: 0, o: .25 }), t("al", 560, 154, "Greenhouse gases", C.purple, { "font-size": 16 }),
        r("earth", 0, 250, 640, 50, "#2c8a4a", { rx: 0 }),
        p("in", arrow(120, 90, 250, 240), C.amber, "none", { "stroke-width": 5 }),
        p("out", arrow(330, 245, 330, 40), C.pink, "none", { "stroke-width": 5, o: 0 }),
        p("back", arrow(330, 160, 420, 245), C.pink, "none", { "stroke-width": 5, o: 0 }),
        t("tt", 330, 285, "", C.w, { "font-size": 18 }), t("ttl", 400, 30, "The greenhouse effect", C.w, { "font-size": 22 })
      ];
      return { w: 640, h: 300, label: "How greenhouse gases trap heat", items, steps: [
        { cap: "Sunlight passes through the atmosphere and warms the Earth's surface." },
        { cap: "The warm Earth gives out heat (infrared radiation) back upwards.", set: { out: { o: 1 }, tt: { t: "Heat radiated" } } },
        { cap: "Greenhouse gases such as carbon dioxide and methane absorb some of it and send it back down. This keeps Earth warm enough for life.", set: { out: { o: .3 }, back: { o: 1 }, tt: { t: "Natural greenhouse effect" } } },
        { cap: "Burning fossil fuels and cutting forests add more gases, so more heat is trapped. This is the enhanced greenhouse effect and global warming.", set: { atm: { o: .6, height: 60 }, back: { o: 1 }, tt: { t: "Enhanced greenhouse effect", fill: C.pink }, earth: { fill: "#b8602a" } } }
      ] };
    })(),

    "Flooding and river management": (() => {
      const items = [
        l("axx", 70, 250, 590, 250, C.grey, { "stroke-width": 3 }), l("axy", 70, 250, 70, 60, C.grey, { "stroke-width": 3 }),
        t("xl", 330, 285, "Time", C.grey, { "font-size": 16 }), t("yl", 36, 150, "Discharge", C.grey, { "font-size": 14, rot: -90, ox: 36, oy: 150 }),
        p("rural", "M70 245 C180 245 220 170 300 150 S 460 240 590 245", C.green, "none", { "stroke-width": 5, o: 0 }),
        p("urban", "M70 245 C130 245 150 80 190 70 S 300 230 590 245", C.pink, "none", { "stroke-width": 5, o: 0 }),
        r("rain", 130, 60, 14, 0, C.blue, { rx: 4 }), t("ttl", 330, 30, "Storm hydrograph", C.w, { "font-size": 22 }), t("lbl", 480, 120, "", C.w, { "font-size": 16 })
      ];
      return { w: 640, h: 300, label: "Hydrographs for an urban and a rural river", items, steps: [
        { cap: "A hydrograph shows how river discharge changes after a rainstorm." },
        { cap: "In a rural area with trees and soil, water soaks in and flows slowly: a low, late peak and a long lag time.", set: { rural: { o: 1 }, lbl: { t: "Rural: long lag time", fill: C.green } } },
        { cap: "In a city, tarmac and drains rush water to the river: a high, early peak with a short lag time. Flooding is more likely.", set: { urban: { o: 1 }, lbl: { t: "Urban: short lag time", fill: C.pink } } }
      ] };
    })(),

    "Coastal landscapes": (() => {
      const items = [
        r("sea", 0, 200, 640, 100, "#14529a", { rx: 0 }), r("land", 300, 90, 340, 130, "#8a6b43", { rx: 6 }),
        r("cave", 340, 160, 30, 40, "#0a0a14", { rx: 14, o: 0 }), r("arch", 340, 150, 60, 50, "#14529a", { rx: 20, o: 0 }),
        p("w1", "M30 190 q20 -20 40 0 t40 0 t40 0", C.w, "none", { "stroke-width": 4, o: .7 }), t("ttl", 320, 30, "Headland erosion", C.w, { "font-size": 24 }), t("lbl", 480, 70, "", C.amber, { "font-size": 18 })
      ];
      return { w: 640, h: 300, label: "Cave, arch and stack formation", items, steps: [
        { cap: "Waves attack a headland. Hydraulic action and abrasion enlarge a crack at the base." },
        { cap: "The crack widens into a cave.", set: { cave: { o: 1 }, lbl: { t: "Cave" } } },
        { cap: "The cave is eroded right through the headland to form an arch.", set: { cave: { o: 0 }, arch: { o: 1 }, lbl: { t: "Arch" } } },
        { cap: "Weathering weakens the top until the arch collapses, leaving a stack. Later it becomes a stump.", set: { arch: { o: 0 }, land: { width: 140 }, lbl: { t: "Stack left behind", fill: C.green } } }
      ] };
    })()
  });
})();
