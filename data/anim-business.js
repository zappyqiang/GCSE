(function () {
  const { c, r, l, t, p, g, arrow, COL: C } = ANIM.h;
  GAME.explain({
    "Break-even": (() => {
      const items = [
        l("ax", 70, 250, 590, 250, C.grey, { "stroke-width": 3 }), l("ay", 70, 250, 70, 50, C.grey, { "stroke-width": 3 }),
        t("xl", 330, 285, "Output (units)", C.grey, { "font-size": 15 }), t("yl", 32, 150, "£", C.grey, { "font-size": 16 }),
        l("fc", 70, 200, 570, 200, C.amber, { "stroke-width": 4, o: 0 }), l("tc", 70, 200, 570, 90, C.pink, { "stroke-width": 4, o: 0 }), l("rev", 70, 250, 570, 70, C.green, { "stroke-width": 4, o: 0 }),
        c("be", 0, 0, 0, C.w, { o: 0 }), t("lab1", 560, 195, "Fixed", C.amber, { "font-size": 14, o: 0 }), t("lab2", 548, 82, "Total cost", C.pink, { "font-size": 14, o: 0 }), t("lab3", 548, 64, "Revenue", C.green, { "font-size": 14, o: 0 }), t("lab4", 360, 45, "", C.w, { "font-size": 20 })
      ];
      return { w: 640, h: 300, label: "A break-even chart", items, steps: [
        { cap: "A break-even chart plots money against output." },
        { cap: "Fixed costs are flat: they stay the same however many you make.", set: { fc: { o: 1 }, lab1: { o: 1 } } },
        { cap: "Total costs start at the fixed costs and rise as variable costs are added.", set: { tc: { o: 1 }, lab2: { o: 1 } } },
        { cap: "Revenue starts at zero and rises with sales.", set: { rev: { o: 1 }, lab3: { o: 1 } } },
        { cap: "Where revenue crosses total costs is break-even. To the left is a loss; to the right is profit. The gap there is the margin of safety.", set: { be: { cx: 253, cy: 169, r: 9, o: 1 }, lab4: { t: "Break-even point: profit = 0" } } }
      ] };
    })(),
    "Product and the product life cycle": (() => {
      const items = [
        l("ax", 60, 240, 590, 240, C.grey, { "stroke-width": 3 }), l("ay", 60, 240, 60, 50, C.grey, { "stroke-width": 3 }),
        p("curve", "M60 238 C140 236 180 80 280 70 S 440 90 580 235", C.blue, "none", { "stroke-width": 6, draw: 0 }),
        t("s1", 100, 262, "Intro", C.amber, { "font-size": 15, o: 0 }), t("s2", 210, 262, "Growth", C.green, { "font-size": 15, o: 0 }), t("s3", 330, 262, "Maturity", C.purple, { "font-size": 15, o: 0 }), t("s4", 500, 262, "Decline", C.pink, { "font-size": 15, o: 0 }),
        t("ttl", 330, 30, "Product life cycle: sales over time", C.w, { "font-size": 20 })
      ];
      return { w: 640, h: 290, label: "The product life cycle curve", items, steps: [
        { cap: "Sales are plotted against time for a product." },
        { cap: "Introduction: sales start slowly and costs are high because of launch spending.", set: { s1: { o: 1 }, curve: { draw: .2 } } },
        { cap: "Growth: sales climb quickly as customers learn about it and profit grows.", set: { s2: { o: 1 }, curve: { draw: .45 } } },
        { cap: "Maturity: sales peak and level out. Competitors arrive.", set: { s3: { o: 1 }, curve: { draw: .7 } } },
        { cap: "Decline: sales fall. Businesses may use an extension strategy such as new packaging or new markets.", set: { s4: { o: 1 }, curve: { draw: 1 } } }
      ] };
    })()
  });
})();
