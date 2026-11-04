/* Realistic virtual experiments for Chemistry, built on assets/rxlab.js */
(function () {
  var G = GAME, R = G.rx, rnd = R.rnd;
  var CLEAR = [214, 236, 252], BLUE = [48, 118, 228], WHITE = [250, 250, 252];

  /* little drawing helpers for custom scenes */
  function tube(c, x, top, bot, hw, liq, lvl, alpha) {
    c.save(); c.beginPath(); c.moveTo(x - hw, top); c.lineTo(x - hw, bot - hw); c.arc(x, bot - hw, hw, Math.PI, 0, true); c.lineTo(x + hw, top);
    c.fillStyle = "rgba(210,235,255,.08)"; c.fill(); c.save(); c.clip();
    if (liq) { var y = bot - lvl * (bot - top); var g = c.createLinearGradient(0, y, 0, bot); g.addColorStop(0, R.rgba(liq.map(function (v) { return Math.min(255, v + 25); }), alpha || .8)); g.addColorStop(1, R.rgba(liq.map(function (v) { return v * .8; }), .95)); c.fillStyle = g; c.fillRect(x - hw, y, hw * 2, bot - y + 2); }
    var hg = c.createLinearGradient(x - hw, 0, x + hw, 0); hg.addColorStop(0, "rgba(255,255,255,.4)"); hg.addColorStop(.18, "rgba(255,255,255,0)"); hg.addColorStop(.85, "rgba(255,255,255,.18)"); hg.addColorStop(1, "rgba(255,255,255,0)"); c.fillStyle = hg; c.fillRect(x - hw, top, hw * 2, bot - top + 4);
    c.restore(); c.strokeStyle = "rgba(230,248,255,.9)"; c.lineWidth = 3; c.stroke(); c.restore();
  }
  function label(c, x, y, txt, col) { c.save(); c.fillStyle = col || "rgba(255,255,255,.9)"; c.font = "800 14px Nunito, system-ui, sans-serif"; c.textAlign = "center"; c.fillText(txt, x, y); c.restore(); }
  function timerText(c, S, W) { if (S.aux.run) { if (S.aux.t0 == null) S.aux.t0 = S.t; if (S.turb < .93) S.aux.time = S.t - S.aux.t0; c.save(); c.fillStyle = "rgba(0,0,0,.45)"; c.fillRect(W - 170, 18, 150, 40); c.fillStyle = "#fff"; c.font = "900 22px Nunito, system-ui, sans-serif"; c.textAlign = "center"; c.fillText((S.aux.time || 0).toFixed(1) + " s", W - 95, 46); c.restore(); } }

  G.reaction({ id: "mgburn", name: "Burning magnesium", icon: "✨", desc: "Heat magnesium ribbon and watch it burn with a dazzling white flame to make magnesium oxide.", vessel: "none", thermo: false, bx: 360,
    init: function (S) { S.mg = 1; S.ash = 0; },
    predict: { q: "What do you think forms when magnesium burns in air?", o: ["A white powder", "A black solid", "A colourless gas only"], a: 0, e: "Magnesium joins with oxygen from the air to make magnesium oxide, a white powder." },
    steps: [
      { label: "Light the Bunsen burner", obs: "A blue flame appears. This is the hottest part of the heating set-up.", fx: { bun: 1 } },
      { label: "Hold the ribbon in the flame", obs: "The ribbon glows, then bursts into a dazzling white flame with tiny sparks. (Never look straight at burning magnesium.)", fx: { flame: { on: 1, col: [225, 240, 255], inner: [255, 255, 255], size: 1.5 }, glow: 1, glowCol: [190, 220, 255], sparks: 26, sparkCol: [255, 255, 255], smoke: 5, mg: .05 }, tau: 3.2 },
      { label: "Let it burn out", obs: "The flame dies. A brittle white ash is left: magnesium oxide. It is heavier than the original ribbon because oxygen has joined on.", fx: { flame: { on: 0 }, glow: 0, sparks: 0, smoke: 0, bun: 0, ash: 1, mg: 0 }, tau: 1.5 }
    ],
    draw: function (c, S) {
      var bottom = 250 - (1 - S.mg) * 118; S.aux.fx = 360; S.aux.fy = bottom + 4; S.aux.sx = 360; S.aux.sy = bottom;
      c.save(); c.fillStyle = "#4b4e57"; c.fillRect(250, 336, 220, 12); c.fillStyle = "#6a6e79"; c.fillRect(250, 336, 220, 4);
      if (S.ash > .02) { var g = c.createRadialGradient(360, 330, 2, 360, 335, 40); g.addColorStop(0, "#ffffff"); g.addColorStop(1, "rgba(230,230,235," + S.ash + ")"); c.fillStyle = g; c.globalAlpha = Math.min(1, S.ash); c.beginPath(); c.ellipse(360, 334, 40, 8, 0, 0, 7); c.fill(); c.globalAlpha = 1; }
      c.strokeStyle = "#b9bfc8"; c.lineWidth = 5; c.beginPath(); c.moveTo(470, 60); c.lineTo(366, 118); c.stroke(); c.beginPath(); c.moveTo(500, 90); c.lineTo(366, 122); c.stroke();
      if (S.mg > .02) { var rg = c.createLinearGradient(0, 118, 0, bottom); rg.addColorStop(0, "#9aa1aa"); rg.addColorStop(1, S.glow > .1 ? "#ffffff" : "#e7ebf0"); c.fillStyle = rg; c.fillRect(358, 118, 6, bottom - 118); }
      c.restore();
    },
    eq: [{ word: "magnesium + oxygen → magnesium oxide", l: ["2Mg(s)", "O2(g)"], r: ["2MgO(s)"] }],
    energy: "Exothermic: heat and light are released to the surroundings.",
    why: ["Magnesium atoms lose 2 electrons each to become Mg²⁺ ions. This is oxidation.", "Oxygen molecules gain electrons to become O²⁻ ions. This is reduction. Together this is a redox reaction.", "The product, magnesium oxide, is an ionic compound: a giant lattice of Mg²⁺ and O²⁻ ions.", "Mass increases because oxygen from the air is added. This is why magnesium oxide weighs more than the ribbon."],
    real: "Magnesium's brilliant white light was once used in camera flash bulbs and is still used in emergency flares and sparklers.",
    safety: "The flame is so bright it can damage eyes. In a real lab, use safety screens and never look directly at it.",
    photos: [["Magnesium ribbon burning.jpg", "Magnesium ribbon burning in air"], ["Mg ribbon.jpg", "Magnesium ribbon before burning"], ["Magnesium foil flash bulb.jpg", "An old camera flash bulb made with magnesium foil"]],
    units: ["Redox and electrons", "Reactivity series", "Ionic bonding", "Conservation of mass and Mr"] });

  G.reaction({ id: "mghcl", name: "Magnesium and acid", icon: "🫧", desc: "Drop magnesium into hydrochloric acid, watch the hydrogen fizz and test it with a lit splint.", vessel: "tube", start: { level: .02 },
    predict: { q: "What happens to the temperature of the acid as the magnesium reacts?", o: ["It gets hotter", "It stays the same", "It gets colder"], a: 0, e: "Metal and acid reactions are exothermic, so the test tube warms up." },
    steps: [
      { label: "Pour in dilute hydrochloric acid", obs: "The acid is a clear, colourless liquid.", pour: [220, 235, 250], fx: { level: .5, liq: CLEAR }, tau: .8 },
      { label: "Add a strip of magnesium", obs: "Vigorous fizzing as hydrogen gas bubbles off. The ribbon shrinks and the tube feels warm.", fx: { solid: { kind: "ribbon", col: [215, 221, 229], amt: 1, drain: .03 }, bub: 70, bubCol: [255, 255, 255], temp: 44 } },
      { label: "Test the gas with a lit splint", obs: "A squeaky pop! Hydrogen burns explosively with oxygen from the air to make water.", fx: { event: "pop", bub: 25 } }
    ],
    eq: [{ word: "magnesium + hydrochloric acid → magnesium chloride + hydrogen", l: ["Mg(s)", "2HCl(aq)"], r: ["MgCl2(aq)", "H2(g)"], ionic: "Mg + 2H^+ → Mg^2+ + H2" }],
    energy: "Exothermic: the temperature rises.",
    why: ["Magnesium is more reactive than hydrogen, so it displaces hydrogen from the acid.", "Each magnesium atom loses 2 electrons (oxidation); two hydrogen ions gain them (reduction).", "The squeaky pop is the gas test for hydrogen: H₂ + O₂ burns to make water.", "The colourless solution left behind is magnesium chloride, a soluble salt."],
    real: "The same reaction is why some metals dissolve in acidic rain and why acid cleaners should never be used on aluminium or zinc surfaces without care.",
    safety: "Hydrogen is flammable. Only small amounts should ever be tested, with safety glasses on.",
    photos: [["Magnesium (Mg).jpg", "Magnesium metal"], ["Burning Bunsen burner.jpg", "A Bunsen burner, used to test for hydrogen with a lit splint"]],
    units: ["Reactivity series", "Acids and their reactions", "Gas tests", "Making soluble salts"] });

  G.reaction({ id: "marble", name: "Marble chips and acid", icon: "🪨", desc: "React marble (calcium carbonate) with acid, then bubble the gas through limewater.", vessel: "flask", start: { level: .02 },
    predict: { q: "Which gas is made when a carbonate reacts with an acid?", o: ["Hydrogen", "Carbon dioxide", "Oxygen"], a: 1, e: "Carbonates plus acids give a salt, water and carbon dioxide." },
    steps: [
      { label: "Add marble chips to the flask", obs: "White marble chips (calcium carbonate) sit at the bottom.", fx: { solid: { kind: "chips", col: [244, 244, 246], amt: 1 }, level: .02 } },
      { label: "Pour in dilute hydrochloric acid", obs: "The chips fizz as carbon dioxide forms. The gas collects above the liquid.", pour: [220, 235, 250], fx: { level: .45, liq: CLEAR, bub: 55, gas: 10, gasCol: [255, 255, 255], solid: { drain: .012 } }, tau: .8 },
      { label: "Bubble the gas through limewater", obs: "The limewater turns cloudy white: calcium carbonate forms. This is the test for carbon dioxide.", fx: { snap: { turb: 0, level: .55, sed: 0 }, liq: [232, 243, 250], turb: .9, bub: 35, solid: { amt: 0 }, gas: 0 }, tau: 3 }
    ],
    eq: [{ word: "calcium carbonate + hydrochloric acid → calcium chloride + water + carbon dioxide", l: ["CaCO3(s)", "2HCl(aq)"], r: ["CaCl2(aq)", "H2O(l)", "CO2(g)"] }, { word: "limewater test: calcium hydroxide + carbon dioxide → calcium carbonate + water", l: ["Ca(OH)2(aq)", "CO2(g)"], r: ["CaCO3(s)", "H2O(l)"] }],
    why: ["Carbonates react with acids to give a salt, water and carbon dioxide.", "The gas test for CO₂: it turns clear limewater milky because insoluble calcium carbonate forms.", "Smaller chips or powder react faster because they have a larger surface area."],
    real: "Limescale in kettles is calcium carbonate. Descaler is a mild acid that dissolves it, fizzing as CO₂ escapes. Acid rain slowly wears away limestone buildings in the same way.",
    safety: "Keep the flask open to the delivery tube so gas pressure cannot build up.",
    photos: [["Calcium carbonate.jpg", "Calcium carbonate"], ["Calcium carbonate rocks 1.jpg", "Limestone and calcite rocks"]],
    units: ["Acids and their reactions", "Gas tests", "Collision theory and rate factors"] });

  G.reaction({ id: "zncu", name: "Zinc and copper sulfate", icon: "🔷", desc: "A displacement reaction: a more reactive metal pushes copper out of its solution.", vessel: "beaker", start: { level: .5, liq: BLUE },
    predict: { q: "What will happen to the blue colour of copper sulfate solution?", o: ["It fades", "It gets darker", "It stays exactly the same"], a: 0, e: "The blue copper ions are used up, so the solution fades." },
    steps: [
      { label: "Add zinc granules", obs: "Grey zinc granules fall to the bottom of the blue solution.", fx: { solid: { kind: "granules", col: [142, 148, 158], amt: 1 } } },
      { label: "Wait a few minutes", obs: "A red-brown coating of copper forms on the zinc. The blue colour fades and the beaker warms slightly.", fx: { liq: [225, 238, 244], solid: { col: [186, 104, 58] }, sed: .55, sedCol: [176, 98, 54], temp: 31, bub: 3, bubCol: [255, 255, 255] }, tau: 6 }
    ],
    eq: [{ word: "zinc + copper sulfate → zinc sulfate + copper", l: ["Zn(s)", "CuSO4(aq)"], r: ["ZnSO4(aq)", "Cu(s)"], ionic: "Zn + Cu^2+ → Zn^2+ + Cu" }],
    energy: "Exothermic: a small temperature rise.",
    why: ["Zinc is more reactive than copper, so zinc atoms lose electrons (oxidation) and become Zn²⁺ ions in solution.", "Copper ions gain those electrons (reduction) and are deposited as copper metal.", "Sulfate ions are spectator ions: they stay in solution unchanged.", "The colour of the solution fades because blue Cu²⁺ ions are used up."],
    real: "The same idea underlies cheap copper recovery from waste solutions and the reactivity series used to decide how to extract metals.",
    photos: [["Copper Sulfate Crystals.jpg", "Blue copper(II) sulfate crystals"], ["Copper sulfate.jpg", "Copper sulfate pentahydrate"]],
    units: ["Reactivity series", "Redox and electrons", "Metals and non-metals"] });

  G.reaction({ id: "fecu", name: "Iron nail in copper sulfate", icon: "🔩", desc: "Watch an iron nail become coated in copper.", vessel: "tube", start: { level: .6, liq: BLUE },
    steps: [
      { label: "Place a clean iron nail in the solution", obs: "A shiny grey iron nail sits in the blue solution.", fx: { solid: { kind: "nail", col: [160, 166, 176], coat: [160, 166, 176], amt: 1 } } },
      { label: "Leave it for 20 minutes", obs: "The nail becomes coated with brown copper. The solution changes from blue to pale green.", fx: { liq: [150, 205, 170], solid: { coat: [188, 108, 62] }, temp: 24 }, tau: 5 }
    ],
    eq: [{ word: "iron + copper sulfate → iron(II) sulfate + copper", l: ["Fe(s)", "CuSO4(aq)"], r: ["FeSO4(aq)", "Cu(s)"], ionic: "Fe + Cu^2+ → Fe^2+ + Cu" }],
    why: ["Iron is above copper in the reactivity series, so it displaces copper from its solution.", "The solution turns pale green because iron(II) ions are green."],
    real: "Scrap iron was once used to recover copper from mine water this way.",
    photos: [["Copper sulfate.jpg", "Copper sulfate"], ["Rust screw.jpg", "An iron screw: iron can corrode as well as displace"]],
    units: ["Reactivity series", "Transition metals", "Redox and electrons"] });

  G.reaction({ id: "neutral", name: "Neutralisation with universal indicator", icon: "🌈", desc: "Add alkali to acid and watch the universal indicator change colour with pH.", vessel: "beaker", start: { level: .35, liq: [222, 44, 44] },
    predict: { q: "Which colour does universal indicator show in a neutral solution?", o: ["Red", "Green", "Purple"], a: 1, e: "Green means pH 7: neither acidic nor alkaline." },
    steps: [
      { label: "Start with acid + indicator", obs: "Red: strongly acidic, pH 1 to 2.", fx: { liq: [222, 44, 44], level: .38, temp: 21 } },
      { label: "Add some sodium hydroxide", obs: "Orange to yellow: still acidic, the pH is rising. The beaker warms up.", pour: [235, 240, 250], fx: { liq: [244, 152, 40], level: .45, temp: 25 } },
      { label: "Add a little more", obs: "Green: neutral, pH 7. The acid has been exactly neutralised.", pour: [235, 240, 250], fx: { liq: [112, 192, 70], level: .5, temp: 27 } },
      { label: "One drop too many", obs: "Blue then purple: alkaline, pH above 7. All the acid is used up and alkali is in excess.", pour: [235, 240, 250], fx: { liq: [96, 70, 190], level: .54, temp: 26 } }
    ],
    eq: [{ word: "hydrochloric acid + sodium hydroxide → sodium chloride + water", l: ["HCl(aq)", "NaOH(aq)"], r: ["NaCl(aq)", "H2O(l)"], ionic: "H^+ + OH^- → H2O" }],
    energy: "Exothermic: neutralisation releases heat.",
    why: ["Acids contain H⁺ ions; alkalis contain OH⁻ ions. They combine to make water.", "Universal indicator is a mixture of dyes that change colour across the pH scale.", "At the neutral point the salt solution is sodium chloride and water."],
    real: "Antacid tablets neutralise stomach acid, farmers add lime to neutralise acidic soil, and bee and wasp stings are treated with weak acid or alkali.",
    photos: [["PH indicator paper with multiple colours.jpg", "pH indicator paper showing the colour range"], ["Extract of red cabbage in the beacker (pH indicator).jpg", "Red cabbage extract: a natural indicator"], ["Universal Indicator test in lemon juice.JPG", "Universal indicator in lemon juice (acidic)"]],
    units: ["Acids and their reactions", "The pH scale", "Titrations", "Strong and weak acids"] });

  G.reaction({ id: "pbi2", name: "Golden rain", icon: "🌧️", desc: "Mix two colourless solutions to make a bright yellow precipitate, then dissolve and recrystallise it.", vessel: "beaker", start: { level: .45, liq: CLEAR },
    predict: { q: "Two colourless solutions are mixed. What might you see?", o: ["Nothing at all", "A coloured solid forms", "The mixture freezes"], a: 1, e: "In a precipitation reaction, two soluble salts form an insoluble one." },
    steps: [
      { label: "Add potassium iodide to lead nitrate", obs: "Instantly a bright yellow solid (lead iodide) forms and sinks.", pour: [232, 238, 248], fx: { prec: 90, precCol: [250, 205, 30], turb: .35, level: .55, sed: .5, sedCol: [245, 200, 28] }, tau: 2 },
      { label: "Heat the mixture", obs: "The yellow solid dissolves in the hot water, leaving a clear solution.", fx: { bun: 1, temp: 88, prec: 0, turb: 0, sed: 0, liq: CLEAR }, tau: 2.5 },
      { label: "Let it cool slowly", obs: "Golden, glittering crystals form again and drift down like golden rain.", fx: { bun: 0, temp: 28, prec: 60, precCol: [250, 205, 30], sed: .5, sedCol: [245, 200, 28], liq: [250, 242, 205] }, tau: 4 }
    ],
    eq: [{ word: "lead nitrate + potassium iodide → lead iodide + potassium nitrate", l: ["Pb(NO3)2(aq)", "2KI(aq)"], r: ["PbI2(s)", "2KNO3(aq)"], ionic: "Pb^2+ + 2I^- → PbI2" }],
    why: ["A precipitate forms when ions from two soluble solutions combine to make an insoluble compound.", "Lead iodide is much more soluble when hot, which is why it dissolves and then recrystallises on cooling.", "Potassium and nitrate ions are spectator ions."],
    real: "Precipitation is used to remove metal ions from industrial waste water and to identify unknown ions in the lab.",
    safety: "Lead compounds are toxic, which is why this is shown as a virtual experiment or a teacher demonstration only.",
    photos: [["Lead (II) iodide precipitating out of solution.JPG", "Lead iodide precipitating from solution"]],
    units: ["Metal hydroxide precipitates", "Making soluble salts", "Testing negative ions", "States of matter"] });

  G.reaction({ id: "agcl", name: "Testing for chloride ions", icon: "⚪", desc: "Silver nitrate makes a curdy white precipitate with chloride ions.", vessel: "tube", start: { level: .5, liq: CLEAR },
    steps: [
      { label: "Add dilute nitric acid, then silver nitrate", obs: "A thick white precipitate of silver chloride forms immediately.", pour: [230, 238, 248], fx: { prec: 70, precCol: [252, 252, 252], turb: .75, sed: .45, sedCol: [248, 248, 250], liq: [236, 242, 248] }, tau: 2 },
      { label: "Leave in sunlight", obs: "The silver chloride slowly darkens to grey as light turns silver ions into silver metal. This is the chemistry behind old photographic film.", fx: { sedCol: [138, 140, 150], turb: .55 }, tau: 6 }
    ],
    eq: [{ word: "silver nitrate + sodium chloride → silver chloride + sodium nitrate", l: ["AgNO3(aq)", "NaCl(aq)"], r: ["AgCl(s)", "NaNO3(aq)"], ionic: "Ag^+ + Cl^- → AgCl" }],
    why: ["The halide tests use silver nitrate: chloride gives white, bromide cream, iodide yellow precipitates.", "Nitric acid is added first so other ions such as carbonate do not interfere."],
    real: "Early photography used silver halide crystals that darken where light hits them.",
    units: ["Testing negative ions", "Group 7: halogens"] });

  G.reaction({ id: "peroxide", name: "Decomposing hydrogen peroxide", icon: "🧴", desc: "A catalyst makes hydrogen peroxide break down so quickly it foams.", vessel: "flask", start: { level: .02 },
    predict: { q: "What does manganese(IV) oxide do in this reaction?", o: ["Speeds it up and is not used up", "Is used up as a reactant", "Slows it down"], a: 0, e: "A catalyst speeds up a reaction and is unchanged at the end." },
    steps: [
      { label: "Pour in hydrogen peroxide solution", obs: "Hydrogen peroxide decomposes very slowly by itself.", pour: [225, 238, 250], fx: { level: .28, liq: [224, 238, 250] }, tau: .8 },
      { label: "Add a squirt of washing-up liquid", obs: "Nothing yet. The detergent will trap the oxygen in foam so you can see it.", pour: [250, 240, 120], fx: { liq: [235, 238, 190] } },
      { label: "Add a pinch of manganese(IV) oxide", obs: "A column of foam shoots up the flask. The flask is warm and steam rises. The black catalyst makes the oxygen form hundreds of times faster.", fx: { solid: { kind: "powder", col: [30, 30, 34], amt: .35 }, foam: 1.15, bub: 80, temp: 52, gas: 18, gasCol: [255, 255, 255], aux: { foamCol: [255, 245, 215] } }, tau: 2 },
      { label: "Test the gas with a glowing splint", obs: "The glowing splint relights: the gas is oxygen.", fx: { event: "relight" } }
    ],
    eq: [{ word: "hydrogen peroxide → water + oxygen", l: ["2H2O2(aq)"], r: ["2H2O(l)", "O2(g)"] }],
    energy: "Exothermic: the flask warms up and water vapour rises as steam.",
    why: ["A catalyst provides an alternative pathway with a lower activation energy, so more collisions are successful.", "The catalyst is not used up: it can be filtered off and reused.", "The glowing splint relights in oxygen: the gas test for oxygen."],
    real: "Catalysts are used in car catalytic converters, in the Haber process and in making margarine. Concentrated peroxide has also been used as a rocket propellant.",
    safety: "Only dilute peroxide should be handled in school. Strong solutions burn skin.",
    units: ["Catalysts", "Collision theory and rate factors", "Gas tests", "Exothermic and endothermic"] });

  G.reaction({ id: "thiosulf", name: "Disappearing cross: rates of reaction", icon: "❌", desc: "Time how quickly sulfur clouds the solution at different temperatures.", vessel: "beaker", start: { level: .4, liq: [235, 245, 250] },
    variants: [{ label: "20 °C", T: 20, tau: 16 }, { label: "40 °C", T: 40, tau: 6 }, { label: "60 °C", T: 60, tau: 2.4 }],
    predict: { q: "At a higher temperature the cross will disappear...", o: ["Faster", "More slowly", "At the same speed"], a: 0, e: "Particles move faster and collide more often with more energy, so more collisions are successful." },
    steps: function (v) { return [
      { label: "Add sodium thiosulfate and acid", obs: "A cloudy yellow-white precipitate of sulfur begins to form. Watch the cross underneath.", pour: [230, 240, 250], fx: { level: .5, temp: v.T, aux: { run: 1 }, turb: .97, snap: { turb: 0 } }, tau: v.tau / 2.3 },
      { label: "Read the time when the cross vanishes", obs: "At " + v.T + " °C the cross disappeared after about " + Math.round(v.tau * 1.7) + " seconds. Try the other temperatures and compare.", fx: {} }
    ]; },
    under: function (c, S, v) { c.save(); c.strokeStyle = "#111"; c.lineWidth = 7; c.lineCap = "round"; c.beginPath(); c.moveTo(v.cx - 24, v.bot - 40); c.lineTo(v.cx + 24, v.bot - 6); c.moveTo(v.cx + 24, v.bot - 40); c.lineTo(v.cx - 24, v.bot - 6); c.stroke(); c.restore(); },
    post: function (c, S, W) { timerText(c, S, W); },
    eq: [{ word: "sodium thiosulfate + hydrochloric acid → sodium chloride + sulfur + sulfur dioxide + water", l: ["Na2S2O3(aq)", "2HCl(aq)"], r: ["2NaCl(aq)", "S(s)", "SO2(g)", "H2O(l)"] }],
    why: ["Sulfur is insoluble, so it makes the solution cloudy and hides the cross.", "Rate = 1 ÷ time. Higher temperature means shorter time and a faster rate.", "Particles gain energy, move faster, collide more often and a greater proportion of collisions have at least the activation energy."],
    real: "Food spoils faster in warm places and cooking is quicker at higher temperatures for the same reason. Fridges slow down reactions.",
    safety: "Sulfur dioxide is toxic and triggers asthma, so this experiment is done in small amounts in a well-ventilated room.",
    units: ["Collision theory and rate factors", "Calculating rates", "Catalysts"] });

  G.reaction({ id: "alkali", name: "Alkali metals in water", icon: "💧", desc: "Compare lithium, sodium and potassium dropped into water.", vessel: "beaker", start: { level: .55, liq: [124, 196, 92] }, thermo: true,
    variants: [{ label: "Lithium", bub: 24, skate: 3, drain: .035, col: [214, 218, 224], fl: null, obs: "Lithium fizzes steadily, floats and slowly shrinks.", rate: "slowest" }, { label: "Sodium", bub: 52, skate: 6, drain: .07, col: [226, 230, 236], fl: [255, 205, 40], obs: "Sodium skates around, fizzes fast, melts into a ball and may flash orange-yellow.", rate: "faster" }, { label: "Potassium", bub: 90, skate: 11, drain: .13, col: [214, 216, 224], fl: [200, 150, 255], obs: "Potassium moves fast, ignites with a lilac flame and fizzes violently.", rate: "fastest" }],
    predict: { q: "Going down Group 1, the reaction with water gets...", o: ["More vigorous", "Less vigorous", "No different"], a: 0, e: "Reactivity increases down Group 1 because the outer electron is further from the nucleus and easier to lose." },
    steps: function (v) { return [
      { label: "Drop the metal into water", obs: v.obs, fx: { solid: { kind: "pellet", col: v.col, amt: 1, drain: v.drain }, bub: v.bub, bubCol: [255, 255, 255], aux: { skate: v.skate, fx: 360, fy: 212, sx: 360, sy: 212 }, flame: v.fl ? { on: 1, col: v.fl, inner: [255, 245, 220], size: .8 } : { on: 0 }, smoke: v.fl ? 3 : 0, temp: 34 }, tau: .8 },
      { label: "Test the solution with indicator", obs: "The indicator turns purple: the solution is alkaline (pH 12 to 14) because a metal hydroxide has formed.", fx: { liq: [112, 60, 170], flame: { on: 0 }, smoke: 0, bub: 6 }, tau: 2.5 }
    ]; },
    eq: [{ word: "sodium + water → sodium hydroxide + hydrogen (lithium and potassium behave in the same way)", l: ["2Na(s)", "2H2O(l)"], r: ["2NaOH(aq)", "H2(g)"], ionic: "2Na + 2H2O → 2Na^+ + 2OH^- + H2" }],
    energy: "Exothermic. The more reactive the metal, the more heat is released.",
    why: ["Group 1 metals have one outer electron, which they lose easily to form 1+ ions.", "Reactivity increases down the group because the outer electron is further from the nucleus and less strongly held.", "Hydrogen gas is made, and the metal hydroxide makes the solution alkaline."],
    real: "This is why alkali metals are stored under oil and why they have to be handled with great care. Sodium and potassium compounds are essential in nerves, cells and fertilisers.",
    safety: "This is a teacher demonstration only, using tiny pieces behind a safety screen. Never handle alkali metals yourself.",
    photos: [["Sodium metal chunks in oil.jpg", "Sodium stored in oil"], ["Lithium paraffin.jpg", "Lithium stored in paraffin"], ["Potassium.jpg", "Potassium stored under oil"]],
    units: ["Group 1: alkali metals", "Ionic bonding", "The pH scale", "Electronic structure"] });

  G.reaction({ id: "cuco3", name: "Heating copper carbonate", icon: "🔥", desc: "Thermal decomposition turns green copper carbonate into black copper oxide.", vessel: "tube", bx: 360, start: { level: 0, solid: { kind: "powder", col: [62, 172, 112], col2: [26, 26, 28], k: 0, amt: .9 } },
    init: function (S) { S.lw = 0; },
    steps: [
      { label: "Heat the green powder", obs: "The green powder slowly turns black. Gas escapes down the delivery tube.", fx: { bun: 1, temp: 85, solid: { k: 1 }, gas: 5, gasCol: [240, 240, 255] }, tau: 4 },
      { label: "Bubble the gas into limewater", obs: "The limewater turns milky, so the gas is carbon dioxide.", fx: { lw: 1, gas: 0 }, tau: 3 },
      { label: "Remove the heat", obs: "The copper oxide is black and no longer reacts. This is thermal decomposition: one compound breaks down into two products.", fx: { bun: 0, temp: 40 } }
    ],
    draw: function (c, S) {
      c.save(); c.strokeStyle = "rgba(200,210,220,.9)"; c.lineWidth = 4; c.beginPath(); c.moveTo(394, 72); c.lineTo(470, 72); c.lineTo(560, 250); c.stroke(); c.restore();
      tube(c, 560, 210, 330, 28, [232, 243, 250], .6);
      c.save(); c.fillStyle = "rgba(245,242,225," + (S.lw * .85) + ")"; c.beginPath(); c.rect(534, 258, 52, 66); c.fill(); c.restore();
      if (S.gas > .5 || S.lw > .1) { for (var i = 0; i < 4; i++) { var y = 320 - ((S.t * 40 + i * 20) % 60); c.fillStyle = "rgba(255,255,255,.6)"; c.beginPath(); c.arc(560 + Math.sin(S.t * 6 + i) * 8, y, 3, 0, 7); c.fill(); } }
      label(c, 560, 360, "limewater", "rgba(255,255,255,.8)");
    },
    eq: [{ word: "copper carbonate → copper oxide + carbon dioxide", l: ["CuCO3(s)"], r: ["CuO(s)", "CO2(g)"] }],
    energy: "Endothermic: heat must be supplied to break it down.",
    why: ["Thermal decomposition is the breakdown of a compound by heating.", "Metal carbonates (except sodium and potassium) decompose into a metal oxide and carbon dioxide.", "The mass of solid drops because CO₂ escapes as a gas."],
    real: "Limestone is heated in kilns to make quicklime (calcium oxide) for cement, in the same type of reaction: CaCO₃ → CaO + CO₂.",
    photos: [["Calcium carbonate rocks 1.jpg", "Limestone is thermally decomposed in kilns to make lime"]],
    units: ["Gas tests", "Exothermic and endothermic", "Metals and non-metals"] });

  G.reaction({ id: "electro", name: "Electrolysis of copper sulfate", icon: "🔋", desc: "Pass electricity through copper sulfate solution to see which products form at each electrode.", vessel: "beaker", start: { level: .6, liq: BLUE },
    init: function (S) { S.cu = 0; },
    predict: { q: "Which electrode will gain a coat of copper?", o: ["The positive anode", "The negative cathode", "Neither"], a: 1, e: "Positive copper ions are attracted to the negative cathode, where they gain electrons." },
    steps: [
      { label: "Connect the power supply", obs: "Two carbon electrodes dip into the blue solution: cathode (−) on the left, anode (+) on the right.", fx: { temp: 20 } },
      { label: "Switch on the current", obs: "Copper plates out on the cathode while oxygen bubbles off at the anode. The blue colour slowly fades.", fx: { cu: 1, liq: [110, 170, 230], temp: 26, aux: { on: 1 } }, tau: 6 },
      { label: "Check the electrodes", obs: "The cathode has a pink-brown copper coating. Gas bubbles at the anode relight a glowing splint (oxygen).", fx: { event: "relight" } }
    ],
    draw: function (c, S, W, H, P, addP) {
      var cx = 360; c.save();
      c.fillStyle = "#3a3f4a"; c.fillRect(cx - 120, 40, 240, 22); c.fillStyle = "#e0b43a"; c.fillRect(cx - 120, 40, 30, 22);
      c.fillStyle = "#fff"; c.font = "800 15px Nunito, system-ui, sans-serif"; c.textAlign = "center"; c.fillText("−", cx - 105, 57); c.fillText("+", cx + 105, 57);
      c.strokeStyle = "#c58a2a"; c.lineWidth = 3; c.beginPath(); c.moveTo(cx - 105, 62); c.lineTo(cx - 105, 160); c.moveTo(cx + 105, 62); c.lineTo(cx + 105, 160); c.stroke();
      var catG = c.createLinearGradient(0, 0, 1, 0); c.restore();
      [[cx - 52, "#2b2b2f"], [cx + 52, "#2b2b2f"]].forEach(function (e, i) { c.save(); c.fillStyle = e[1]; c.fillRect(e[0] - 7, 100, 14, 190); if (i === 0 && S.cu > .02) { c.fillStyle = "rgba(196,112,66," + S.cu + ")"; c.fillRect(e[0] - 9, 200 - 10 * S.cu, 18, 90 + 10 * S.cu); } c.restore(); });
      c.save(); c.strokeStyle = "#c58a2a"; c.lineWidth = 3; c.beginPath(); c.moveTo(cx - 52, 100); c.lineTo(cx - 52, 80); c.lineTo(cx - 105, 80); c.moveTo(cx + 52, 100); c.lineTo(cx + 52, 80); c.lineTo(cx + 105, 80); c.stroke(); c.restore();
      if (S.aux.on && Math.random() < .35 && P.length < 600) addP({ k: "bub", x: cx + 52 + rnd(-6, 6), y: 280, vx: 0, vy: -rnd(40, 80), r: rnd(2, 4.5), col: [255, 255, 255], ph: rnd(0, 6) });
      label(c, cx - 52, 316, "cathode (−)"); label(c, cx + 52, 316, "anode (+)");
    },
    eq: [{ word: "at the cathode: copper ions gain electrons", l: ["Cu^2+(aq)", "2e^-"], r: ["Cu(s)"], note: "Reduction at the cathode. Half equation: Cu²⁺ + 2e⁻ → Cu" }, { word: "at the anode: hydroxide ions lose electrons", l: ["4OH^-(aq)"], r: ["O2(g)", "2H2O(l)", "4e^-"], note: "Oxidation at the anode. Half equation: 4OH⁻ → O₂ + 2H₂O + 4e⁻" }],
    why: ["During electrolysis positive ions move to the cathode and negative ions move to the anode.", "At the cathode copper ions are reduced to copper metal (gain of electrons).", "At the anode hydroxide ions are oxidised to oxygen (loss of electrons).", "Remember OIL RIG: Oxidation Is Loss, Reduction Is Gain."],
    real: "Electrolysis is used to purify copper for wiring, to electroplate cutlery and jewellery with silver, and to coat steel with chromium.",
    safety: "Keep electrical equipment dry and use low-voltage supplies only.",
    units: ["Electrolysis basics", "Electrolysis of solutions", "Half equations", "Redox and electrons"] });

  G.reaction({ id: "rusting", name: "Rusting investigation", icon: "🧲", desc: "Four test tubes show what iron needs to rust.", vessel: "none", thermo: false,
    init: function (S) { S.days = 0; },
    predict: { q: "Which two things does iron need to rust?", o: ["Oxygen and water", "Nitrogen and light", "Carbon dioxide and heat"], a: 0, e: "Rusting needs both oxygen and water. Salt speeds it up." },
    steps: [
      { label: "Set up four tubes", obs: "A: air and water. B: salt water. C: boiled (oxygen-free) water with oil on top. D: dry air with a drying agent (no water).", fx: { days: 0 } },
      { label: "Leave for one week", obs: "Rust is starting on the nail in tube A and appears faster in the salt water (tube B).", fx: { days: 7 }, tau: 3 },
      { label: "Leave for two weeks", obs: "Only tubes A and B have rusted. The nails in C (no oxygen) and D (no water) are unchanged: iron needs both oxygen and water.", fx: { days: 14 }, tau: 3 }
    ],
    draw: function (c, S) {
      var names = ["A: air + water", "B: salt water", "C: boiled water + oil", "D: dry (no water)"], rust = [Math.min(1, S.days / 14), Math.min(1, S.days / 8), 0, 0];
      for (var i = 0; i < 4; i++) {
        var x = 150 + i * 140; tube(c, x, 100, 300, 34, i === 3 ? null : [214, 236, 252], .62);
        if (i === 2) { c.save(); c.fillStyle = "rgba(240,210,110,.65)"; c.fillRect(x - 34, 100 + (300 - 100) * .34 - 6, 68, 16); c.restore(); }
        if (i === 3) { c.save(); c.fillStyle = "rgba(255,255,255,.7)"; c.fillRect(x - 24, 276, 48, 14); c.restore(); }
        c.save(); c.translate(x, 205); c.rotate(-.12); c.fillStyle = "#9aa1ab"; c.fillRect(-3, -70, 6, 130); c.beginPath(); c.arc(0, -72, 7, 0, 7); c.fill();
        if (rust[i] > .02) { c.fillStyle = "rgba(176,82,30," + (.25 + rust[i] * .7) + ")"; c.fillRect(-4, -70 + (1 - rust[i]) * 40, 8, 130 - (1 - rust[i]) * 40); c.beginPath(); c.arc(0, -72, 7 * (.6 + .4 * rust[i]), 0, 7); c.fill(); if (i < 2) { var rg2 = c.createRadialGradient(0, 70, 4, 0, 70, 46); rg2.addColorStop(0, "rgba(190,100,40," + rust[i] * .35 + ")"); rg2.addColorStop(1, "rgba(190,100,40,0)"); c.fillStyle = rg2; c.fillRect(-50, 20, 100, 110); } }
        c.restore(); label(c, x, 340, names[i], "rgba(255,255,255,.88)");
      }
      label(c, 360, 40, "Day " + Math.round(S.days), "#fff");
    },
    eq: [{ word: "iron + oxygen + water → hydrated iron(III) oxide (rust)", l: ["4Fe(s)", "3O2(g)", "6H2O(l)"], r: ["4Fe(OH)3(s)"], note: "Rust is hydrated iron(III) oxide, often written Fe₂O₃·xH₂O." }],
    why: ["Iron rusts only when oxygen and water are both present. This is an oxidation reaction.", "Salt (as on winter roads) speeds up rusting because it helps ions move.", "Barriers such as paint, oil and plastic keep air and water away. Sacrificial protection uses a more reactive metal such as zinc, which corrodes instead of the iron."],
    real: "Rusting costs economies billions every year. It weakens bridges, ships and cars, which is why steel is painted, galvanised or alloyed with chromium to make stainless steel.",
    photos: [["Rust on iron.jpg", "Rust on iron"], ["Rust screw.jpg", "A rusted screw"], ["Pipe corrosion (7463499650).jpg", "A corroded pipe"]],
    units: ["Corrosion and prevention", "Reactivity series", "Redox and electrons", "Useful alloys"] });

  G.reaction({ id: "bunsen", name: "Bunsen burner flames", icon: "🔥", desc: "Compare complete and incomplete combustion of natural gas by changing the air supply.", vessel: "none", thermo: false, bx: 360,
    steps: [
      { label: "Close the air hole", obs: "A floppy, luminous yellow flame (the safety flame). Soot (carbon) is produced and there is not enough oxygen. Carbon monoxide can form.", fx: { bun: .03, flame: { on: 1, col: [255, 186, 60], inner: [255, 232, 150], size: 1.35 }, smoke: 5, aux: { fx: 360, fy: 346, sx: 360, sy: 190 } }, tau: 1.2 },
      { label: "Open the air hole halfway", obs: "The flame gets smaller and bluer as more oxygen mixes in.", fx: { flame: { on: .9, col: [150, 160, 255], inner: [255, 240, 190], size: 1.1 }, smoke: 1.5 }, tau: 1.6 },
      { label: "Open the air hole fully", obs: "A narrow, roaring blue flame. This is complete combustion: very hot, no soot, and carbon dioxide and water are the only products.", fx: { flame: { on: 0 }, bun: 1.2, smoke: 0 }, tau: 1.6 }
    ],
    eq: [{ word: "complete combustion: methane + oxygen → carbon dioxide + water", l: ["CH4(g)", "2O2(g)"], r: ["CO2(g)", "2H2O(g)"] }, { word: "incomplete combustion (limited oxygen): methane + oxygen → carbon monoxide + water", l: ["2CH4(g)", "3O2(g)"], r: ["2CO(g)", "4H2O(g)"], note: "With even less oxygen, soot (carbon, C) forms as well." }],
    energy: "Both are exothermic, but complete combustion releases the most energy.",
    why: ["Hydrocarbons burn in plenty of oxygen to make carbon dioxide and water: complete combustion.", "With too little oxygen they make carbon monoxide (a toxic gas) and soot: incomplete combustion.", "Carbon monoxide is colourless and odourless, which is why gas appliances need servicing and carbon monoxide alarms."],
    real: "Boilers, gas cookers and car engines are designed to burn fuel as completely as possible to waste less energy and reduce poisonous gas and soot. Yellow flames on a gas cooker are a warning sign.",
    safety: "Carbon monoxide is poisonous. Never use barbecues or gas appliances indoors without ventilation.",
    photos: [["Burning Bunsen burner.jpg", "A Bunsen burner showing both blue and yellow flames"], ["Bunsen burner flame types.jpg", "Bunsen flame types depending on the air supply"]],
    units: ["Hydrocarbon properties and combustion", "Crude oil and alkanes", "Atmospheric pollutants"] });

  G.reaction({ id: "flametest", name: "Flame test bench", icon: "🎆", desc: "Identify metal ions from the colour they give a flame, the science behind firework colours.", vessel: "none", thermo: false, bx: 360,
    variants: [{ label: "Lithium", c: [235, 20, 70], i: [255, 190, 200], n: "crimson red" }, { label: "Sodium", c: [255, 205, 20], i: [255, 240, 150], n: "bright yellow" }, { label: "Potassium", c: [190, 140, 255], i: [235, 215, 255], n: "lilac" }, { label: "Calcium", c: [255, 110, 40], i: [255, 200, 150], n: "orange-red" }, { label: "Copper", c: [40, 200, 130], i: [200, 255, 220], n: "blue-green" }, { label: "Strontium", c: [255, 36, 36], i: [255, 180, 170], n: "red" }, { label: "Barium", c: [150, 230, 60], i: [235, 255, 190], n: "apple green" }],
    predict: { q: "Why does each metal ion give its own flame colour?", o: ["Electrons jump to higher levels then fall back, giving out light of a set colour", "The metal melts", "The flame gets hotter"], a: 0, e: "Each ion's electrons release light of specific wavelengths as they fall back to lower energy levels." },
    steps: function (v) { return [
      { label: "Light the Bunsen", obs: "The blue flame is almost invisible against the bench. This is the control.", fx: { bun: 1 } },
      { label: "Dip a clean loop in the salt and place it in the flame", obs: v.label + " gives a " + v.n + " flame.", fx: { bun: .03, flame: { on: 1, col: v.c, inner: v.i, size: 1.5 }, aux: { fx: 360, fy: 346, sx: 360, sy: 250 }, glow: .35, glowCol: v.c, sparks: v.label === "Sodium" || v.label === "Barium" ? 4 : 0, sparkCol: v.i }, tau: .6 }
    ]; },
    draw: function (c, S) { if (S.flame.on > .2) { c.save(); c.strokeStyle = "#b9bfc8"; c.lineWidth = 4; c.beginPath(); c.moveTo(520, 60); c.lineTo(370, 230); c.stroke(); c.strokeStyle = "#d0d6de"; c.lineWidth = 2; c.beginPath(); c.arc(366, 236, 7, 0, 7); c.stroke(); c.restore(); } },
    eq: [],
    why: ["Heating gives electrons energy so they jump to higher energy levels (they are excited).", "When they fall back down they release energy as light. Each element has its own set of energy gaps, so it gives its own colour: a kind of fingerprint.", "Flame tests only work for some metal ions. Mixtures can be confusing because sodium's yellow is so bright it hides other colours."],
    real: "Fireworks use metal compounds for colour: strontium for red, barium for green, copper for blue, sodium for yellow and calcium for orange. Astronomers use the same idea (spectra) to find which elements stars contain.",
    safety: "Use clean loops and small amounts of salt. Fireworks are dangerous and must only be fired by trained professionals.",
    photos: [["Coloured flames of methanol solutions of metal salts and compounds.jpg", "Flame colours of different metal compounds side by side"], ["Flammenfärbung Natrium (Na).jpg", "Sodium: yellow"], ["Flammenfärbung Lithium (Li).jpg", "Lithium: crimson"], ["Flammenfärbung Kalium (K).jpg", "Potassium: lilac"], ["Copper flame test.JPG", "Copper: blue-green"], ["Flammenfärbung Barium (Ba).jpg", "Barium: apple green"]],
    units: ["Flame tests", "Electronic structure", "Group 1: alkali metals", "Instrumental analysis"] });

  G.reaction({ id: "nh3hcl", name: "Ammonia and hydrogen chloride", icon: "☁️", desc: "Two gases diffuse along a tube and form a white ring where they meet.", vessel: "none", thermo: false,
    init: function (S) { S.p = 0; },
    predict: { q: "Where will the white ring form?", o: ["Closer to the hydrochloric acid end", "Exactly in the middle", "Closer to the ammonia end"], a: 0, e: "Ammonia molecules are lighter so they diffuse faster and travel further before meeting HCl." },
    steps: [
      { label: "Soak two cotton wool plugs and seal the tube", obs: "Ammonia solution on the left, concentrated hydrochloric acid on the right.", fx: { p: 0 } },
      { label: "Wait a few minutes", obs: "Invisible gas particles move through the air by diffusion. Ammonia (lighter) travels faster.", fx: { p: .75 }, tau: 5 },
      { label: "Look for the ring", obs: "A white ring of ammonium chloride forms nearer the hydrochloric acid end, because ammonia diffuses faster than HCl.", fx: { p: 1 }, tau: 3 }
    ],
    draw: function (c, S) {
      var x0 = 90, x1 = 630, y = 215, L = x1 - x0; c.save();
      var g = c.createLinearGradient(0, y - 28, 0, y + 28); g.addColorStop(0, "rgba(255,255,255,.35)"); g.addColorStop(.5, "rgba(210,235,255,.12)"); g.addColorStop(1, "rgba(255,255,255,.3)"); c.fillStyle = g; c.fillRect(x0, y - 28, L, 56); c.strokeStyle = "rgba(235,250,255,.9)"; c.lineWidth = 3; c.strokeRect(x0, y - 28, L, 56);
      c.fillStyle = "#f2efe6"; c.fillRect(x0 - 16, y - 20, 18, 40); c.fillRect(x1 - 2, y - 20, 18, 40);
      c.fillStyle = "rgba(80,140,255,.55)"; c.fillRect(x0 - 16, y - 20, 18, 40); c.fillStyle = "rgba(255,110,150,.55)"; c.fillRect(x1 - 2, y - 20, 18, 40);
      var ringX = x0 + L * .6;
      for (var i = 0; i < 46; i++) { var r1 = ((i * 37) % 100) / 100, r2 = ((i * 53) % 100) / 100, jit = Math.sin(S.t * 3 + i) * 6;
        var nx = x0 + 12 + r1 * (ringX - x0 - 12) * Math.min(1, S.p / .9) + jit, ny = y + (r2 - .5) * 44 + Math.cos(S.t * 4 + i) * 4;
        c.fillStyle = "rgba(90,150,255,.9)"; c.beginPath(); c.arc(nx, ny, 3.2, 0, 7); c.fill();
        var hx = x1 - 12 - r2 * (x1 - ringX - 12) * Math.min(1, S.p / .9) + Math.sin(S.t * 3 + i * 2) * 6, hy = y + (r1 - .5) * 44 + Math.sin(S.t * 4 + i) * 4;
        c.fillStyle = "rgba(255,110,150,.9)"; c.beginPath(); c.arc(hx, hy, 4.6, 0, 7); c.fill(); }
      if (S.p > .85) { var a = Math.min(1, (S.p - .85) / .15); var rg = c.createLinearGradient(ringX - 22, 0, ringX + 22, 0); rg.addColorStop(0, "rgba(255,255,255,0)"); rg.addColorStop(.5, "rgba(255,255,255," + a + ")"); rg.addColorStop(1, "rgba(255,255,255,0)"); c.fillStyle = rg; c.fillRect(ringX - 22, y - 26, 44, 52); }
      c.restore(); label(c, x0 + 40, y - 46, "NH₃ (ammonia)", "rgba(150,190,255,1)"); label(c, x1 - 50, y - 46, "HCl", "rgba(255,150,180,1)"); if (S.p > .85) label(c, ringX, y + 52, "NH₄Cl ring", "#fff");
    },
    eq: [{ word: "ammonia + hydrogen chloride → ammonium chloride", l: ["NH3(g)", "HCl(g)"], r: ["NH4Cl(s)"] }],
    why: ["Diffusion is the net movement of particles from a high concentration to a low concentration.", "Lighter particles move faster at the same temperature, so ammonia (Mr 17) travels further than HCl (Mr 36.5).", "The two gases react where they meet to form a white solid, ammonium chloride."],
    real: "Diffusion explains how smells spread, how oxygen enters your blood and how perfume reaches across a room. Ammonium chloride is a common ingredient in dry batteries.",
    safety: "Both gases are irritating. A real tube is sealed and handled in a well-ventilated room.",
    units: ["States of matter", "Atoms, elements and compounds", "Moles"] });

  G.reaction({ id: "thermo", name: "Hot and cold chemistry", icon: "🌡️", desc: "Dissolve different solids in water and see whether the temperature rises or falls.", vessel: "beaker", start: { level: .5, liq: CLEAR, temp: 20 },
    variants: [{ label: "Ammonium nitrate (cold pack)", T: 6, col: [250, 250, 252], endo: true }, { label: "Calcium chloride (hand warmer)", T: 46, col: [244, 244, 240], endo: false }],
    predict: { q: "What happens to the temperature when ammonium nitrate dissolves in water?", o: ["It falls", "It rises", "It stays the same"], a: 0, e: "Dissolving ammonium nitrate is endothermic: it takes in heat from the water." },
    steps: function (v) { return [
      { label: "Measure the starting temperature", obs: "Water at 20 °C.", fx: { temp: 20 } },
      { label: "Add the solid and stir", obs: v.endo ? "The solid dissolves and the thermometer drops: the solution feels cold." : "The solid dissolves and the thermometer rises: the solution feels hot.", fx: { solid: { kind: "powder", col: v.col, amt: .4 }, temp: v.T, bub: 0 }, tau: 3 },
      { label: "Finish dissolving", obs: v.endo ? "Endothermic: the reaction takes in energy from the surroundings, so the temperature falls." : "Exothermic: energy is released to the surroundings, so the temperature rises.", fx: { solid: { amt: 0 }, liq: v.endo ? [226, 240, 252] : [236, 242, 250] }, tau: 4 }
    ]; },
    eq: [{ word: "dissolving ammonium nitrate (endothermic)", l: ["NH4NO3(s)"], r: ["NH4^+(aq)", "NO3^-(aq)"], note: "Energy is taken in: the temperature falls." }, { word: "dissolving anhydrous calcium chloride (exothermic)", l: ["CaCl2(s)"], r: ["Ca^2+(aq)", "2Cl^-(aq)"], note: "Energy is released: the temperature rises." }],
    energy: "Exothermic = energy released, temperature rises. Endothermic = energy absorbed, temperature falls.",
    why: ["Bond breaking takes in energy; bond making releases energy.", "If more energy is released than is taken in, the reaction is exothermic. If less, it is endothermic.", "Instant cold packs use ammonium nitrate; some hand warmers use calcium chloride or the oxidation of iron."],
    real: "Sports injury packs, self-heating food cans and hand warmers all rely on these temperature changes.",
    units: ["Exothermic and endothermic", "Reaction profiles", "Bond energies"] });

  /* put the new reaction labs first and drop the superseded flame lab */
  var newIds = ["mgburn", "mghcl", "marble", "zncu", "fecu", "neutral", "pbi2", "agcl", "peroxide", "thiosulf", "alkali", "cuco3", "electro", "rusting", "bunsen", "flametest", "nh3hcl", "thermo"];
  var nw = [], old = [];
  G.labs.forEach(function (l) { if (newIds.indexOf(l.id) >= 0) nw.push(l); else if (l.id !== "flame") old.push(l); });
  nw.sort(function (a, b) { return newIds.indexOf(a.id) - newIds.indexOf(b.id); });
  G.labs.length = 0; nw.concat(old).forEach(function (l) { G.labs.push(l); });
})();
