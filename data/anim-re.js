(function () {
  const { c, r, l, t, g, COL: C } = ANIM.h;
  GAME.explain({
    "Creation and the Trinity": (() => {
      const items = [
        g("tri", "320,60 130,240 510,240", "none", C.purple, { "stroke-width": 4 }),
        c("f", 320, 60, 38, C.blue, { o: 0 }), t("ft", 320, 66, "Father", "#10142e", { "font-size": 16, o: 0 }),
        c("s", 130, 240, 38, C.amber, { o: 0 }), t("st", 130, 246, "Son", "#10142e", { "font-size": 16, o: 0 }),
        c("h", 510, 240, 38, C.green, { o: 0 }), t("ht", 510, 246, "Spirit", "#10142e", { "font-size": 16, o: 0 }),
        t("ctr", 320, 180, "One God", C.w, { "font-size": 26, o: 0 })
      ];
      return { w: 640, h: 300, label: "The Trinity: Father, Son and Holy Spirit as one God", items, steps: [
        { cap: "Christians believe in one God who is also three persons: the Trinity." },
        { cap: "God the Father: creator and loving parent.", set: { f: { o: 1 }, ft: { o: 1 } } },
        { cap: "God the Son: Jesus, God made human (the Incarnation).", set: { s: { o: 1 }, st: { o: 1 } } },
        { cap: "God the Holy Spirit: God's power and presence in the world today.", set: { h: { o: 1 }, ht: { o: 1 } } },
        { cap: "The three are distinct but are one God, not three gods.", set: { ctr: { o: 1 } } }
      ] };
    })(),
    "The Five Pillars": (() => {
      const names = ["Shahadah", "Salah", "Zakat", "Sawm", "Hajj"], desc = ["Faith", "Prayer", "Charity", "Fasting", "Pilgrimage"], cols = [C.blue, C.green, C.amber, C.pink, C.purple];
      const items = [r("roof", 60, 40, 520, 30, "#e8f2ff", { rx: 6 }), r("base", 60, 250, 520, 25, "#e8f2ff", { rx: 6 }), t("ttl", 320, 30, "", C.w, { "font-size": 16 })];
      names.forEach((n, i) => items.push(r("p" + i, 90 + i * 100, 70, 60, 180, cols[i], { rx: 8, o: 0 }), t("pn" + i, 120 + i * 100, 150, n, "#10142e", { "font-size": 13, o: 0 }), t("pd" + i, 120 + i * 100, 172, desc[i], "#10142e", { "font-size": 13, o: 0 })));
      return { w: 640, h: 300, label: "The Five Pillars of Islam as pillars holding up a roof", items, steps: [
        { cap: "Islam is built on five pillars that support a Muslim's life." },
        { cap: "Shahadah: declaring there is only one God and Muhammad is his messenger.", set: { p0: { o: 1 }, pn0: { o: 1 }, pd0: { o: 1 } } },
        { cap: "Salah: prayer five times a day facing Makkah.", set: { p1: { o: 1 }, pn1: { o: 1 }, pd1: { o: 1 } } },
        { cap: "Zakat: giving 2.5% of savings to the poor.", set: { p2: { o: 1 }, pn2: { o: 1 }, pd2: { o: 1 } } },
        { cap: "Sawm: fasting from dawn to sunset in Ramadan.", set: { p3: { o: 1 }, pn3: { o: 1 }, pd3: { o: 1 } } },
        { cap: "Hajj: pilgrimage to Makkah once in a lifetime if able.", set: { p4: { o: 1 }, pn4: { o: 1 }, pd4: { o: 1 } } }
      ] };
    })()
  });
})();
