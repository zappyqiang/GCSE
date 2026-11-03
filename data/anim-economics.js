(function () {
  const { c, r, l, t, p, arrow, COL: C } = ANIM.h;
  const axes = [l("ax", 80, 250, 580, 250, C.grey, { "stroke-width": 3 }), l("ay", 80, 250, 80, 40, C.grey, { "stroke-width": 3 }), t("xl", 330, 285, "Quantity", C.grey, { "font-size": 16 }), t("yl", 40, 150, "Price", C.grey, { "font-size": 16, rot: -90, ox: 40, oy: 150 })];
  GAME.explain({
    "Demand": (() => {
      const items = axes.concat([l("d1", 120, 60, 520, 230, C.blue, { "stroke-width": 6 }), t("dl", 530, 250, "D", C.blue, { "font-size": 22 }),
        l("d2", 200, 60, 600, 230, C.green, { "stroke-width": 6, o: 0 }), t("d2l", 610, 250, "D2", C.green, { "font-size": 22, o: 0 }), c("pt", 320, 145, 10, C.amber, { o: 0 }), t("lab", 330, 30, "", C.w, { "font-size": 20 })]);
      return { w: 640, h: 300, label: "Demand curve and a shift in demand", items, steps: [
        { cap: "The demand curve slopes down: as price falls, quantity demanded rises." },
        { cap: "A price change is a movement along the curve.", set: { pt: { o: 1, cx: 220, cy: 100 }, lab: { t: "Price falls: move down the curve" } } },
        { cap: "Lower price, so more is demanded.", set: { pt: { cx: 420, cy: 190 }, lab: { t: "Quantity demanded rises" } } },
        { cap: "A change in income, tastes or the price of a substitute shifts the whole curve. Here demand increases and the curve moves right.", set: { d2: { o: 1 }, d2l: { o: 1 }, pt: { o: 0 }, lab: { t: "Demand shifts right", fill: C.green } } }
      ] };
    })(),
    "Shifts in demand and supply": (() => {
      const items = axes.concat([l("d1", 130, 60, 520, 230, C.blue, { "stroke-width": 6 }), l("s1", 130, 230, 520, 60, C.pink, { "stroke-width": 6 }), t("dl", 530, 240, "D", C.blue, { "font-size": 20 }), t("sl", 530, 70, "S", C.pink, { "font-size": 20 }),
        c("eq", 325, 145, 10, C.amber), l("d2", 190, 60, 580, 230, C.green, { "stroke-width": 6, o: 0 }), c("eq2", 385, 145, 10, C.green, { o: 0 }), t("lab", 330, 30, "Equilibrium", C.w, { "font-size": 20 })]);
      return { w: 640, h: 300, label: "Equilibrium moves when demand shifts right", items, steps: [
        { cap: "Equilibrium is where demand and supply cross. At this price the market clears." },
        { cap: "Demand increases, perhaps because incomes rise. The demand curve shifts right.", set: { d2: { o: 1 }, d1: { o: .3 }, lab: { t: "Demand rises" } } },
        { cap: "There is now a shortage at the old price, so price rises until a new equilibrium is reached at a higher price and higher quantity.", set: { eq2: { o: 1 }, eq: { o: .3 }, lab: { t: "New equilibrium: higher price and quantity", fill: C.green } } }
      ] };
    })()
  });
})();
