(function () {
  const { c, r, l, t, p, g, arrow, COL: C } = ANIM.h;
  GAME.explain({
    "Hyperinflation and the Stresemann years": (() => {
      const items = [l("ax", 60, 250, 600, 250, C.grey, { "stroke-width": 3 }),
        r("b1", 90, 220, 50, 30, C.green), t("l1", 115, 275, "1918", C.grey, { "font-size": 14 }),
        r("b2", 190, 245, 50, 5, C.amber, { o: 0 }), t("l2", 215, 275, "Jan 1923", C.grey, { "font-size": 14, o: 0 }),
        r("b3", 290, 250, 50, 0, C.pink, { o: 0 }), t("l3", 315, 275, "Nov 1923", C.grey, { "font-size": 14, o: 0 }),
        r("b4", 390, 250, 50, 0, C.blue, { o: 0 }), t("l4", 415, 275, "1924", C.grey, { "font-size": 14, o: 0 }),
        t("v1", 115, 210, "0.6 M", C.w, { "font-size": 15 }), t("v2", 215, 235, "250 M", C.w, { "font-size": 15, o: 0 }), t("v3", 315, 60, "200 billion M", C.w, { "font-size": 15, o: 0 }), t("v4", 415, 235, "Rentenmark", C.w, { "font-size": 15, o: 0 }),
        t("ttl", 330, 30, "The price of a loaf of bread (marks)", C.w, { "font-size": 20 })];
      return { w: 640, h: 300, label: "Price of a loaf of bread rising during hyperinflation", items, steps: [
        { cap: "Before 1923 a loaf of bread cost less than a mark." },
        { cap: "Germany printed money to pay its debts and when France occupied the Ruhr in 1923 production stopped. Prices soared.", set: { b2: { o: 1, y: 150, height: 100 }, l2: { o: 1 }, v2: { o: 1, y: 140 } } },
        { cap: "By November 1923 a loaf cost billions of marks. Savings were wiped out and people burned notes for fuel.", set: { b3: { o: 1, y: 70, height: 180 }, l3: { o: 1 }, v3: { o: 1 } } },
        { cap: "Stresemann stopped printing money and introduced the Rentenmark. The Dawes Plan in 1924 brought US loans and stability returned.", set: { b4: { o: 1, y: 230, height: 20 }, l4: { o: 1 }, v4: { o: 1 } } }
      ] };
    })(),
    "Germ theory and surgery": (() => {
      const items = [r("bed", 50, 150, 220, 40, "#6a8caf", { rx: 8 }), c("g1", 140, 110, 0, C.pink, { o: 0 }), c("g2", 190, 120, 0, C.pink, { o: 0 }), c("g3", 110, 125, 0, C.pink, { o: 0 }),
        r("spray", 380, 80, 20, 60, C.green, { o: 0, rx: 6 }), p("mist", "M390 140 L300 190", C.green, "none", { o: 0, "stroke-width": 5 }),
        t("ttl", 320, 30, "Surgery before and after Lister", C.w, { "font-size": 22 }), t("lbl", 320, 250, "", C.amber, { "font-size": 20 })];
      return { w: 640, h: 280, label: "Germs causing infection and Lister's carbolic spray", items, steps: [
        { cap: "Before germ theory, surgeons did not clean their tools. Many patients survived the operation but died of infection." },
        { cap: "Pasteur showed that microbes cause decay and disease, so germs enter the wound.", set: { g1: { o: 1, r: 8 }, g2: { o: 1, r: 8 }, g3: { o: 1, r: 8 }, lbl: { t: "Germs enter the wound", fill: C.pink } } },
        { cap: "Lister used carbolic acid to kill the germs on tools, hands and wounds. Death rates fell sharply.", set: { spray: { o: 1 }, mist: { o: 1 }, g1: { o: 0 }, g2: { o: 0 }, g3: { o: 0 }, lbl: { t: "Antiseptic kills germs", fill: C.green } } }
      ] };
    })()
  });
})();
