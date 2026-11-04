(function () {
  const { c, r, l, t, p, arrow, COL: C } = ANIM.h;
  GAME.explain({
    "The multi-store model": (() => {
      const box = (id, x, w, col, lab) => [r(id, x, 100, w, 80, col, { rx: 12 }), t(id + "t", x + w / 2, 148, lab, "#10142e", { "font-size": 15 })];
      const items = [].concat(box("s", 20, 140, C.blue, "Sensory register"), box("st", 240, 140, C.amber, "Short-term memory"), box("lt", 460, 160, C.green, "Long-term memory"),
        [p("a1", arrow(165, 140, 235, 140), C.w, "none", { o: 0 }), p("a2", arrow(385, 140, 455, 140), C.w, "none", { o: 0 }), p("a3", arrow(540, 190, 300, 190), C.pink, "none", { o: 0 }),
        t("l1", 200, 95, "Attention", C.w, { "font-size": 14, o: 0 }), t("l2", 420, 95, "Rehearsal", C.w, { "font-size": 14, o: 0 }), t("l3", 420, 215, "Retrieval", C.pink, { "font-size": 14, o: 0 }),
        t("ttl", 320, 40, "The multi-store model (Atkinson and Shiffrin)", C.w, { "font-size": 18 }), t("note", 320, 260, "", C.grey, { "font-size": 16 })]);
      return { w: 640, h: 290, label: "Information flowing through three memory stores", items, steps: [
        { cap: "Information from the senses first enters the sensory register, which holds it for less than a second." },
        { cap: "Only what you pay attention to passes to short-term memory.", set: { a1: { o: 1 }, l1: { o: 1 }, note: { t: "STM: about 7 items, about 30 seconds" } } },
        { cap: "Rehearsal (repeating it) moves information into long-term memory, which can store unlimited information for a lifetime.", set: { a2: { o: 1 }, l2: { o: 1 }, note: { t: "LTM: unlimited capacity" } } },
        { cap: "To use a memory you retrieve it back into short-term memory.", set: { a3: { o: 1 }, l3: { o: 1 } } }
      ] };
    })()
  });
})();
