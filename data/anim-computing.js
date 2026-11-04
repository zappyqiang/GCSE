(function () {
  const { c, r, l, t, p, g, arrow, COL: C } = ANIM.h;
  const box = (id, x, y, v, fill) => [r(id, x, y, 52, 52, fill || C.dim, { rx: 8 }), t(id + "t", x + 26, y + 34, "" + v, C.w, { "font-size": 22 })];
  GAME.explain({
    "Binary and hexadecimal": (() => {
      const bits = [128, 64, 32, 16, 8, 4, 2, 1];
      const items = [];
      bits.forEach((b, i) => { items.push(r("b" + i, 40 + i * 70, 100, 60, 60, C.dim, { rx: 10 }), t("v" + i, 70 + i * 70, 85, "" + b, C.grey, { "font-size": 18 }), t("d" + i, 70 + i * 70, 140, "0", C.w, { "font-size": 28 })); });
      items.push(t("sum", 320, 220, "Total = 0", C.amber, { "font-size": 30 }), t("title", 320, 40, "Binary place values", C.w, { "font-size": 24 }));
      return { w: 640, h: 260, label: "Building the number 77 in binary", items, steps: [
        { cap: "Each binary digit (bit) is worth double the one to its right. Start with all bits off: the number is 0." },
        { cap: "Switch on 64. Total = 64.", set: { b1: { fill: C.blue }, d1: { t: "1" }, sum: { t: "Total = 64" } } },
        { cap: "Switch on 8. Total = 64 + 8 = 72.", set: { b4: { fill: C.blue }, d4: { t: "1" }, sum: { t: "Total = 72" } } },
        { cap: "Switch on 4. Total = 76.", set: { b5: { fill: C.blue }, d5: { t: "1" }, sum: { t: "Total = 76" } } },
        { cap: "Switch on 1. Total = 77. So 77 in binary is 01001101. In hex that is 4D (0100 = 4, 1101 = D).", set: { b7: { fill: C.green }, d7: { t: "1" }, sum: { t: "Total = 77  =  01001101  =  4D", fill: C.green } } }
      ] };
    })(),

    "Searching and sorting": (() => {
      const vals = [5, 2, 8, 1, 9];
      const items = [];
      vals.forEach((v, i) => { items.push(r("c" + i, 80 + i * 100, 120, 70, 70, C.blue, { rx: 12 }), t("n" + i, 115 + i * 100, 166, "" + v, C.w, { "font-size": 30 })); });
      items.push(t("lab", 320, 50, "Bubble sort: compare neighbours", C.w, { "font-size": 22 }), t("st", 320, 250, "", C.amber, { "font-size": 20 }));
      return { w: 640, h: 290, label: "Bubble sort swapping neighbours", items, steps: [
        { cap: "Bubble sort compares each pair of neighbours and swaps them if they are in the wrong order." },
        { cap: "Compare 5 and 2. 5 is bigger, so swap them.", set: { c0: { fill: C.amber }, c1: { fill: C.amber }, n0: { t: "2" }, n1: { t: "5" }, st: { t: "Swap!" } } },
        { cap: "Compare 5 and 8. They are in order, so no swap.", set: { c0: { fill: C.blue }, c1: { fill: C.amber }, c2: { fill: C.amber }, st: { t: "No swap" } } },
        { cap: "Compare 8 and 1. Swap.", set: { c1: { fill: C.blue }, c2: { fill: C.amber }, c3: { fill: C.amber }, n2: { t: "1" }, n3: { t: "8" }, st: { t: "Swap!" } } },
        { cap: "Compare 8 and 9. In order. The biggest value, 9, has bubbled to the end after one pass.", set: { c2: { fill: C.blue }, c3: { fill: C.blue }, c4: { fill: C.green }, st: { t: "Pass 1 done" } } },
        { cap: "Repeat passes until a whole pass makes no swaps. Then the list is sorted: 1 2 5 8 9.", set: { c4: { fill: C.green }, n0: { t: "1" }, n1: { t: "2" }, n2: { t: "5" }, n3: { t: "8" }, n4: { t: "9" }, c0: { fill: C.green }, c1: { fill: C.green }, c2: { fill: C.green }, c3: { fill: C.green }, st: { t: "Sorted!", fill: C.green } } }
      ] };
    })(),

    "Fetch-decode-execute cycle": (() => {
      const items = [
        r("cpu", 40, 60, 360, 200, "#1c2350", { rx: 14, stroke: C.purple, "stroke-width": 3 }), t("cpul", 220, 85, "CPU", C.purple, { "font-size": 18 }),
        r("pc", 60, 110, 100, 44, C.dim), t("pct", 110, 138, "PC", C.w, { "font-size": 18 }),
        r("cu", 190, 110, 100, 44, C.dim), t("cut", 240, 138, "Control", C.w, { "font-size": 16 }),
        r("alu", 300, 170, 80, 44, C.dim), t("alut", 340, 198, "ALU", C.w, { "font-size": 18 }),
        r("ram", 470, 60, 140, 200, "#1c2350", { rx: 14, stroke: C.blue, "stroke-width": 3 }), t("raml", 540, 85, "RAM", C.blue, { "font-size": 18 }),
        r("ins", 490, 110, 100, 36, C.dim), t("inst", 540, 134, "LOAD 5", C.w, { "font-size": 16 }),
        c("dot", 440, 128, 10, C.amber, { o: 0 }), t("stage", 320, 25, "Ready", C.amber, { "font-size": 22 })
      ];
      return { w: 640, h: 290, label: "The fetch-decode-execute cycle", items, steps: [
        { cap: "The program counter holds the address of the next instruction.", set: { pc: { fill: C.amber }, stage: { t: "Start" } } },
        { cap: "FETCH: the instruction is copied from RAM into the CPU.", set: { pc: { fill: C.dim }, ins: { fill: C.amber }, dot: { o: 1, cx: 440 }, stage: { t: "FETCH" } } },
        { cap: "The instruction arrives at the control unit.", set: { dot: { cx: 250, cy: 132 }, ins: { fill: C.dim }, cu: { fill: C.pink }, stage: { t: "DECODE" } } },
        { cap: "DECODE: the control unit works out what the instruction means.", set: { stage: { t: "DECODE" } } },
        { cap: "EXECUTE: the ALU carries out the operation. The program counter then moves on to the next instruction and the cycle repeats billions of times a second.", set: { cu: { fill: C.dim }, alu: { fill: C.green }, dot: { cx: 340, cy: 190, fill: C.green }, stage: { t: "EXECUTE", fill: C.green } } }
      ] };
    })()
  });
})();
