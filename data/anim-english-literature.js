(function () {
  const { c, r, l, t, p, arrow, COL: C } = ANIM.h;
  GAME.explain({
    "Themes: ambition, guilt and the supernatural": (() => {
      const items = [
        p("arc", "M60 240 C140 230 200 90 320 70 S 500 200 590 250", C.purple, "none", { "stroke-width": 6, draw: 0 }),
        c("dot", 60, 240, 12, C.amber), t("lbl", 320, 30, "Macbeth's tragic arc", C.w, { "font-size": 22 }), t("st", 320, 275, "Loyal soldier", C.amber, { "font-size": 20 })
      ];
      return { w: 640, h: 290, label: "The rise and fall of Macbeth", items, steps: [
        { cap: "Macbeth begins as a brave, loyal soldier honoured by the king." },
        { cap: "The witches' prophecy plants ambition. Lady Macbeth pushes him and he murders Duncan.", set: { arc: { draw: .35 }, dot: { cx: 170, cy: 150 }, st: { t: "Ambition and murder" } } },
        { cap: "At his peak he is king, but guilt and paranoia grow. Banquo is murdered and the ghost haunts him.", set: { arc: { draw: .55 }, dot: { cx: 320, cy: 70, fill: C.pink }, st: { t: "King, but haunted", fill: C.pink } } },
        { cap: "Tyranny turns everyone against him. Macduff kills him and order is restored. This is a classic tragedy.", set: { arc: { draw: 1 }, dot: { cx: 590, cy: 250 }, st: { t: "Downfall", fill: C.pink } } }
      ] };
    })()
  });
  GAME.explain({
    "Plot and characters": (() => {
      const names = ["Mr Birling", "Sheila", "Gerald", "Mrs Birling", "Eric"], cols = [C.pink, C.amber, C.green, C.purple, C.blue];
      const items = [t("ttl", 320, 30, "The chain of responsibility for Eva Smith", C.w, { "font-size": 20 }), t("eva", 320, 255, "Eva Smith", C.grey, { "font-size": 22 })];
      names.forEach((n, i) => items.push(r("n" + i, 20 + i * 122, 110, 110, 50, cols[i], { rx: 12, o: 0 }), t("nt" + i, 75 + i * 122, 142, n, "#10142e", { "font-size": 16, o: 0 })));
      return { w: 640, h: 290, label: "Each Birling family member contributes to Eva Smith's death", items, steps: [
        { cap: "The Inspector investigates the death of Eva Smith, a young working-class woman." },
        { cap: "Mr Birling sacked her for asking for higher wages.", set: { n0: { o: 1 }, nt0: { o: 1 } } },
        { cap: "Sheila had her sacked from a shop out of jealousy.", set: { n1: { o: 1 }, nt1: { o: 1 } } },
        { cap: "Gerald had an affair with her and then ended it.", set: { n2: { o: 1 }, nt2: { o: 1 } } },
        { cap: "Mrs Birling refused her charity help when she was pregnant.", set: { n3: { o: 1 }, nt3: { o: 1 } } },
        { cap: "Eric got her pregnant and stole money for her. Each person is a link in the chain. Priestley's point: we are all responsible for each other.", set: { n4: { o: 1 }, nt4: { o: 1 }, eva: { fill: C.pink } } }
      ] };
    })()
  });
})();
