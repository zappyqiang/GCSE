(function () {
var G = GAME;
G.configure({
  key: "maths", subject: "Maths", title: "The Pi-rate Voyage", unit: "doubloons",
  intro: "Captain Pi and Polly Nomial are sailing for the lost treasure of full marks. Beat each sea to chart your way through the whole AQA course.",
  a: { char: "pi", name: "Captain Pi" }, b: { char: "polly", name: "Polly Nomial" },
  decor: ["⛵", "🐙", "🏝️", "🦈", "🗺️", "⚓", "🐚"],
  monsters: ["Salty Sum Crab", "Fraction Eel", "Bracket Barnacle", "Decimal Dolphin", "Sly Surd Squid", "Rounding Ray", "Negative Newtfish", "Graph Grouper"],
  monsterColours: ["#ff6b4a", "#7b5cff", "#21b6a8", "#ffb02e", "#e8476a", "#3fa7ff"],
  bossNames: ["The Kraken", "The Ghost Ship", "Blackbeard's Bones", "The Maelstrom"],
  pows: ["Boom!", "Kaboom!", "Yarr!", "Bullseye!", "Splash!"],
  cheers: ["Shiver me timbers!", "Aye, that's right!", "Treasure found!", "Spot on, sailor!", "Well navigated!"],
  wins: ["Victory on the high seas!", "The crew cheers!", "Another chest of gold!"],
  ranks: [["Deckhand", 0], ["Cabin Boffin", 800], ["Navigator", 2500], ["First Mate", 6000], ["Captain", 12000], ["Admiral of Algebra", 22000]],
  arcade: { name: "Cannon Bay", sprite: "🚢", dir: "left", speed: 60, blurb: "Answer ships are sailing across the bay. Sink the one carrying the right answer." },
  finalName: "Lost Treasure final battle", sheetName: "Formula sheet",
  sheetNote: "In the summer 2027 exams a full formula sheet comes with every paper, and AQA says the arrangement carries on from 2028 for the life of this course. You still have to know how to use each one. Check your own board's latest notice.",
  labsIntro: "Drag the sliders, watch the maths move, then hit the target to win doubloons."
});

G.sheet = [
  { h: "Shapes", rows: [
    ["Area of a trapezium", "½(a + b)h"], ["Volume of a prism", "area of cross-section × length"],
    ["Circumference of a circle", "C = πd = 2πr"], ["Area of a circle", "A = πr²"],
    ["Arc length", "(θ ÷ 360) × 2πr", "Fraction of the whole circle"], ["Sector area", "(θ ÷ 360) × πr²"],
    ["Volume of a cylinder", "πr²h"], ["Curved surface area of a cylinder", "2πrh"],
    ["Volume of a cone", "⅓πr²h"], ["Curved surface area of a cone", "πrl", "l is the slant height"],
    ["Volume of a sphere", "(4/3)πr³"], ["Surface area of a sphere", "4πr²"], ["Volume of a pyramid", "⅓ × base area × h"]
  ] },
  { h: "Triangles", rows: [
    ["Pythagoras' theorem", "a² + b² = c²", "c is the hypotenuse"], ["Trigonometry", "sin θ = O/H, cos θ = A/H, tan θ = O/A"],
    ["Sine rule (Higher)", "a/sin A = b/sin B = c/sin C"], ["Cosine rule (Higher)", "a² = b² + c² − 2bc cos A"],
    ["Area of any triangle (Higher)", "½ab sin C"]
  ] },
  { h: "Algebra", rows: [
    ["Quadratic formula (Higher)", "x = (−b ± √(b² − 4ac)) ÷ 2a", "For ax² + bx + c = 0"],
    ["Straight line", "y = mx + c", "m is the gradient, c the y-intercept"],
    ["Perpendicular gradients (Higher)", "m₁ × m₂ = −1"],
    ["Circle centred at the origin (Higher)", "x² + y² = r²"]
  ] },
  { h: "Money, rates and probability", rows: [
    ["Compound interest", "P(1 + r/100)ⁿ"], ["Speed", "distance ÷ time"], ["Density", "mass ÷ volume"], ["Pressure", "force ÷ area"],
    ["P(A or B), Higher", "P(A) + P(B) − P(A and B)"], ["P(A and B), Higher", "P(A given B) × P(B)"]
  ] }
];

var ink = 'stroke="#1c1436" stroke-width="3"', txt = 'font-family="Nunito,sans-serif" font-weight="800" font-size="17" fill="#1c1436"';
G.diagram({
  numberline: '<svg viewBox="0 0 520 90"><path d="M16 45H504" ' + ink + ' marker-end="none"/>' + [-5,-4,-3,-2,-1,0,1,2,3,4,5].map(function(n,i){var x=30+i*46;return '<path d="M'+x+' 37v16" '+ink+'/><text x="'+x+'" y="76" text-anchor="middle" '+txt+'>'+n+'</text>';}).join("") + '<text x="260" y="24" text-anchor="middle" '+txt+'>Further right is always bigger</text></svg>',
  rat: '<svg viewBox="0 0 440 270"><path d="M70 220H370V50Z" fill="#ffd98e" '+ink+'/><path d="M345 220v-25h25" fill="none" '+ink+'/><path d="M118 220 A48 48 0 0 0 112 196" fill="none" '+ink+'/><text x="126" y="210" '+txt+'>θ</text><text x="220" y="250" text-anchor="middle" '+txt+'>Adjacent (next to θ)</text><text x="378" y="136" '+txt+'>Opp</text><text x="150" y="118" transform="rotate(-29 150 118)" '+txt+'>Hypotenuse (longest)</text></svg>',
  pyth: '<svg viewBox="0 0 420 300"><rect x="110" y="170" width="120" height="120" fill="#ff6b4a" opacity=".55" '+ink+'/><rect x="230" y="80" width="90" height="90" fill="#21b6a8" opacity=".6" '+ink+'/><path d="M110 170H230V80Z" fill="#ffd98e" '+ink+'/><path d="M110 170 L230 80 L140 -40 L20 50Z" fill="#7b5cff" opacity=".5" '+ink+' transform="translate(0 40) scale(.86) translate(18 2)"/><text x="165" y="238" '+txt+'>a²</text><text x="262" y="132" '+txt+'>b²</text><text x="70" y="90" '+txt+'>c²</text></svg>',
  circle: '<svg viewBox="0 0 420 300"><circle cx="210" cy="150" r="120" fill="#fff4d6" '+ink+'/><path d="M210 150 L330 150 A120 120 0 0 0 295 65Z" fill="#ff6b4a" opacity=".7" '+ink+'/><path d="M90 150H210" '+ink+'/><path d="M118 225 L302 225" stroke="#0e7c86" stroke-width="4"/><circle cx="210" cy="150" r="5" fill="#1c1436"/><text x="130" y="142" '+txt+'>radius</text><text x="175" y="248" '+txt+'>chord</text><text x="262" y="125" '+txt+'>sector</text><text x="306" y="44" '+txt+'>arc</text><path d="M30 44 L390 44" stroke="#7b5cff" stroke-width="0"/><path d="M90 28 L350 28" stroke="#7b5cff" stroke-width="4"/><text x="150" y="20" '+txt+'>tangent (touches once)</text></svg>',
  theorems: '<svg viewBox="0 0 640 220">' +
    '<g><circle cx="105" cy="100" r="80" fill="#fff4d6" '+ink+'/><path d="M45 47 L165 47 M45 47 L105 180 M165 47 L105 180" fill="none" stroke="#0e7c86" stroke-width="3"/><path d="M45 47 L105 100 L165 47" fill="none" stroke="#ff6b4a" stroke-width="3"/><text x="105" y="208" text-anchor="middle" '+txt+'>Centre = 2 × edge</text></g>' +
    '<g transform="translate(215 0)"><circle cx="105" cy="100" r="80" fill="#fff4d6" '+ink+'/><path d="M25 100H185" '+ink+'/><path d="M25 100 L150 34 L185 100" fill="none" stroke="#ff6b4a" stroke-width="3"/><path d="M142 42l8 -8 8 12" fill="none" '+ink+'/><text x="105" y="208" text-anchor="middle" '+txt+'>Semicircle = 90°</text></g>' +
    '<g transform="translate(430 0)"><circle cx="105" cy="100" r="80" fill="#fff4d6" '+ink+'/><path d="M50 42 L170 52 L165 152 L60 160Z" fill="none" stroke="#ff6b4a" stroke-width="3"/><text x="105" y="208" text-anchor="middle" '+txt+'>Opposite = 180° total</text></g></svg>',
  line: '<svg viewBox="0 0 420 300"><path d="M210 10V290M20 150H400" '+ink+'/><path d="M60 270 L360 30" stroke="#ff6b4a" stroke-width="5"/><circle cx="210" cy="150" r="6" fill="#1c1436"/><path d="M270 102 H330 V54" fill="none" stroke="#0e7c86" stroke-width="4" stroke-dasharray="7 5"/><text x="288" y="122" '+txt+'>across 1</text><text x="338" y="84" '+txt+'>up m</text><text x="222" y="186" '+txt+'>c: where it crosses</text><text x="222" y="206" '+txt+'>the y-axis</text></svg>',
  tree: '<svg viewBox="0 0 520 280"><path d="M30 140 L170 70 M30 140 L170 210 M222 70 L340 30 M222 70 L340 110 M216 210 L340 170 M216 210 L340 250" fill="none" '+ink+'/><text x="70" y="86" '+txt+'>0.3</text><text x="70" y="208" '+txt+'>0.7</text><text x="176" y="76" '+txt+'>Rain</text><text x="176" y="216" '+txt+'>Dry</text><text x="346" y="35" '+txt+'>Rain: 0.3 × 0.3</text><text x="346" y="116" '+txt+'>Dry: 0.3 × 0.7</text><text x="346" y="176" '+txt+'>Rain: 0.7 × 0.3</text><text x="346" y="256" '+txt+'>Dry: 0.7 × 0.7</text><text x="190" y="20" '+txt+'>Along = multiply</text><text x="346" y="278" font-size="0"> </text></svg>',
  venn: '<svg viewBox="0 0 440 240"><rect x="10" y="10" width="420" height="220" fill="#fff4d6" '+ink+'/><circle cx="165" cy="120" r="85" fill="#ff6b4a" opacity=".55" '+ink+'/><circle cx="275" cy="120" r="85" fill="#21b6a8" opacity=".55" '+ink+'/><text x="115" y="124" '+txt+'>A only</text><text x="196" y="124" '+txt+'>A ∩ B</text><text x="295" y="124" '+txt+'>B only</text><text x="24" y="34" '+txt+'>ξ everything</text></svg>',
  angles: '<svg viewBox="0 0 520 220"><path d="M40 60H480M40 170H480" '+ink+'/><path d="M170 210 L340 20" '+ink+'/><g '+txt+'><text x="278" y="52">a</text><text x="282" y="84">z</text><text x="184" y="162">a</text><text x="224" y="162">z</text></g><text x="20" y="22" '+txt+'>Same letter, same angle: F shape (a) and Z shape (z)</text></svg>',
  boxplot: '<svg viewBox="0 0 520 110"><path d="M40 50H130M330 50H480M40 34v32M480 34v32" '+ink+'/><rect x="130" y="24" width="200" height="52" fill="#ffd98e" '+ink+'/><path d="M220 24v52" '+ink+'/><g '+txt+' text-anchor="middle"><text x="40" y="96">min</text><text x="130" y="96">LQ</text><text x="220" y="96">median</text><text x="330" y="96">UQ</text><text x="480" y="96">max</text></g></svg>',
  histogram: '<svg viewBox="0 0 420 240"><path d="M50 20V200H400" fill="none" '+ink+'/><rect x="50" y="130" width="60" height="70" fill="#21b6a8" '+ink+'/><rect x="110" y="60" width="40" height="140" fill="#ff6b4a" '+ink+'/><rect x="150" y="100" width="120" height="100" fill="#ffd98e" '+ink+'/><text x="160" y="160" '+txt+'>Area = frequency</text><text x="60" y="226" '+txt+'>Bars can be different widths</text></svg>',
  vector: '<svg viewBox="0 0 420 220"><defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#1c1436"/></marker></defs><path d="M40 180 L200 60" stroke="#ff6b4a" stroke-width="5" marker-end="url(#ah)"/><path d="M200 60 L370 150" stroke="#0e7c86" stroke-width="5" marker-end="url(#ah)"/><path d="M40 180 L370 150" stroke="#1c1436" stroke-width="5" stroke-dasharray="9 6" marker-end="url(#ah)"/><text x="90" y="100" '+txt+'>a</text><text x="290" y="88" '+txt+'>b</text><text x="190" y="195" '+txt+'>a + b</text></svg>'
});
})();
