(function () {
  const { c, r, l, t, p, arrow, COL: C } = ANIM.h;
  GAME.explain({
    "Planning and timing": (() => {
      const parts = [["Q1", 4, C.green], ["Q2", 8, C.blue], ["Q3", 8, C.amber], ["Q4", 8, C.pink]];
      const items = [t("ttl", 320, 30, "Paper 1: 1 hour 45 minutes", C.w, { "font-size": 22 })];
      items.push(r("rd", 30, 70, 0, 60, C.grey, { rx: 6 }), t("rdt", 60, 100, "", C.w, { "font-size": 14, o: 0 }));
      let x = 30; const wid = [40, 90, 100, 160, 280];
      const labs = [["Read", "15 min", C.grey], ["Q1-Q2", "20 min", C.green], ["Q3", "25 min", C.amber], ["Q4", "20 min", C.pink], ["Write", "45 min", C.purple]];
      const items2 = [t("ttl", 320, 30, "Paper 1: 1 hour 45 minutes", C.w, { "font-size": 22 })];
      let px = 30; const tot = 580, mins = [5, 15, 20, 20, 45];
      mins.forEach((m, i) => { const w = tot * m / 125; items2.push(r("b" + i, px, 90, w - 4, 70, labs[i][2], { rx: 8, o: 0 }), t("l" + i, px + w / 2 - 2, 120, labs[i][0], "#10142e", { "font-size": 15, o: 0 }), t("m" + i, px + w / 2 - 2, 146, labs[i][1], "#10142e", { "font-size": 13, o: 0 })); px += w; });
      return { w: 640, h: 220, label: "Suggested timing for Paper 1", items: items2, steps: [
        { cap: "Paper 1 gives 1 hour 45 minutes. Plan your time before you start." },
        { cap: "Spend about 5 minutes reading the source and the questions.", set: { b0: { o: 1 }, l0: { o: 1 }, m0: { o: 1 } } },
        { cap: "Q1 and Q2 are shorter analysis questions: about 15 minutes in total.", set: { b1: { o: 1 }, l1: { o: 1 }, m1: { o: 1 } } },
        { cap: "Q3 on structure: about 20 minutes.", set: { b2: { o: 1 }, l2: { o: 1 }, m2: { o: 1 } } },
        { cap: "Q4 evaluation: about 20 minutes.", set: { b3: { o: 1 }, l3: { o: 1 }, m3: { o: 1 } } },
        { cap: "The writing task is worth 40 marks, half the paper: give it about 45 minutes, including 5 to plan and 5 to proofread.", set: { b4: { o: 1 }, l4: { o: 1 }, m4: { o: 1 } } }
      ] };
    })()
  });
})();
