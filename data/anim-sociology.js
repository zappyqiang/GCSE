(function () {
  const { r, t, g, COL: C } = ANIM.h;
  GAME.explain({
    "Crime data and trends": (() => {
      const items = [
        r("sea", 0, 120, 640, 180, "#14346b", { rx: 0 }),
        g("tip", "230,120 320,40 410,120", "#e8f2ff", null),
        g("under", "200,120 440,120 540,285 100,285", "#2d6bb5", null, { o: 0 }),
        t("l1", 320, 100, "Recorded crime", C.w, { "font-size": 17 }), t("l2", 320, 210, "The dark figure: unreported and unrecorded", C.w, { "font-size": 18, o: 0 }),
        t("ttl", 320, 22, "The crime iceberg", C.w, { "font-size": 20 })
      ];
      return { w: 640, h: 300, label: "An iceberg showing recorded crime above the surface and the dark figure below", items, steps: [
        { cap: "Official police statistics only show crime that is reported to and recorded by the police." },
        { cap: "Much more crime lies beneath the surface: the dark figure. People don't report minor crime, fear the offender, or think the police can't help.", set: { under: { o: 1 }, l2: { o: 1 } } },
        { cap: "Victim surveys such as the Crime Survey for England and Wales ask people directly and reveal more of the iceberg.", set: { under: { fill: "#4dabff" }, l2: { t: "Victim surveys reveal more", fill: C.amber } } }
      ] };
    })()
  });
})();
