(function () {
var ink = 'stroke="#1c1436" stroke-width="3"', txt = 'font-family="Nunito,sans-serif" font-weight="800" font-size="16" fill="#1c1436"';
function grid() { var s = ""; for (var i = -5; i <= 5; i++) { s += '<path d="M' + (200 + i * 30) + ' 20V320M50 ' + (170 + i * 30) + 'H350" stroke="#d9d3c0"/>'; } return s + '<path d="M200 20V320M50 170H350" ' + ink + '/>'; }
GAME.lab({ id: "line", name: "Straight-line explorer", icon: "📈", desc: "Slide m and c, then match the target line.", run: function (el, A) {
  el.innerHTML = '<div class="goal" id="g"></div><div class="labview"><svg viewBox="0 0 400 340" id="v"></svg></div><div class="readout" id="o"></div><div id="c"></div>';
  var m = 1, c = 0, T = {}; function newT() { T = { m: A.pick([-2, -1, 1, 2, 3]), c: A.ri(-3, 3) }; document.getElementById("g").textContent = "Target: make the line y = " + T.m + "x " + (T.c < 0 ? "− " + (-T.c) : "+ " + T.c); }
  var won = false;
  function draw() {
    var pt = function (x) { return [200 + x * 30, 170 - (m * x + c) * 30]; }, a = pt(-5), b = pt(5);
    document.getElementById("v").innerHTML = '<defs><clipPath id="cp"><rect x="50" y="20" width="300" height="300"/></clipPath></defs>' + grid() + '<line clip-path="url(#cp)" x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="#ff6b4a" stroke-width="5"/><circle cx="200" cy="' + (170 - c * 30) + '" r="6" fill="#1c1436"/>';
    document.getElementById("o").textContent = "y = " + m + "x " + (c < 0 ? "− " + (-c) : "+ " + c);
    if (m === T.m && c === T.c && !won) { won = true; A.award(20, "Direct hit!"); setTimeout(function () { won = false; newT(); draw(); }, 1400); }
  }
  newT();
  A.slider(document.getElementById("c"), "Gradient m", -3, 3, 1, 1, "", function (v) { m = v; draw(); });
  A.slider(document.getElementById("c"), "Intercept c", -4, 4, 1, 0, "", function (v) { c = v; draw(); });
  draw();
} });
GAME.lab({ id: "quad", name: "Quadratic curve shaper", icon: "🎢", desc: "See how a, b and c change the curve, its roots and turning point.", run: function (el, A) {
  el.innerHTML = '<div class="goal" id="g">Target: make a curve with roots at x = 1 and x = 3</div><div class="labview"><svg viewBox="0 0 400 340" id="v"></svg></div><div class="readout" id="o"></div><div id="c"></div>';
  var a = 1, b = 0, c = -4, won = false;
  function draw() {
    var path = ""; for (var x = -5; x <= 5.01; x += .1) { var y = a * x * x + b * x + c; path += (path ? "L" : "M") + (200 + x * 30).toFixed(1) + " " + (170 - y * 30).toFixed(1); }
    var D = b * b - 4 * a * c, roots = "no real roots";
    if (a !== 0) { if (D > 0) { var r1 = (-b - Math.sqrt(D)) / (2 * a), r2 = (-b + Math.sqrt(D)) / (2 * a); roots = "roots at x = " + A.fmt(Math.round(Math.min(r1, r2) * 100) / 100) + " and " + A.fmt(Math.round(Math.max(r1, r2) * 100) / 100); } else if (D === 0) roots = "one repeated root at x = " + A.fmt(-b / (2 * a)); }
    document.getElementById("v").innerHTML = '<defs><clipPath id="cq"><rect x="50" y="20" width="300" height="300"/></clipPath></defs>' + grid() + '<path clip-path="url(#cq)" d="' + path + '" fill="none" stroke="#21b6a8" stroke-width="5"/>';
    document.getElementById("o").textContent = "y = " + a + "x² + " + b + "x + " + c + ": " + roots;
    if (a === 1 && b === -4 && c === 3 && !won) { won = true; A.award(30, "x² − 4x + 3 = (x − 1)(x − 3). Treasure!"); }
  }
  A.slider(document.getElementById("c"), "a", -2, 2, 1, 1, "", function (v) { a = v; draw(); });
  A.slider(document.getElementById("c"), "b", -6, 6, 1, 0, "", function (v) { b = v; draw(); });
  A.slider(document.getElementById("c"), "c", -6, 6, 1, -4, "", function (v) { c = v; draw(); });
  draw();
} });
GAME.lab({ id: "triangle", name: "Triangle trig workshop", icon: "🔺", desc: "Change the angle and hypotenuse, and watch SOH CAH TOA work.", run: function (el, A) {
  el.innerHTML = '<div class="goal" id="g">Target: find an angle where sin θ = cos θ</div><div class="labview"><svg viewBox="0 0 420 280" id="v"></svg></div><div class="readout" id="o" style="font-size:19px"></div><div id="c"></div>';
  var th = 30, h = 10, won = false;
  function draw() {
    var r = th * Math.PI / 180, O = h * Math.sin(r), Ad = h * Math.cos(r), k = 22, x0 = 40, y0 = 250, x1 = x0 + Ad * k, y1 = y0 - O * k;
    document.getElementById("v").innerHTML = '<path d="M' + x0 + " " + y0 + "L" + x1 + " " + y0 + "L" + x1 + " " + y1 + 'Z" fill="#ffd98e" ' + ink + '/><text x="' + (x0 + Ad * k / 2 - 30) + '" y="' + (y0 + 22) + '" ' + txt + '>A = ' + Ad.toFixed(2) + '</text><text x="' + (x1 + 6) + '" y="' + (y0 - O * k / 2) + '" ' + txt + '>O = ' + O.toFixed(2) + '</text><text x="' + (x0 + 34) + '" y="' + (y0 - 8) + '" ' + txt + '>θ</text>';
    document.getElementById("o").textContent = "sin θ = " + Math.sin(r).toFixed(3) + ", cos θ = " + Math.cos(r).toFixed(3) + ", tan θ = " + Math.tan(r).toFixed(3);
    if (th === 45 && !won) { won = true; A.award(20, "At 45°, the opposite and adjacent are equal!"); }
  }
  A.slider(document.getElementById("c"), "Angle θ", 5, 85, 1, 30, "°", function (v) { th = v; draw(); });
  A.slider(document.getElementById("c"), "Hypotenuse", 4, 12, 1, 10, "", function (v) { h = v; draw(); });
  draw();
} });
GAME.lab({ id: "dice", name: "Dice probability bay", icon: "🎲", desc: "Roll thousands of dice, and watch relative frequency settle down.", run: function (el, A) {
  el.innerHTML = '<div class="goal" id="g">Target: roll at least 1000 times, and see each bar settle near 1/6 (about 0.167)</div><div class="labview"><svg viewBox="0 0 420 230" id="v"></svg></div><div class="row"><button class="btn small" id="a">Roll 10</button><button class="btn small" id="b">Roll 100</button><button class="btn small" id="d">Roll 1000</button></div>';
  var n = [0, 0, 0, 0, 0, 0], tot = 0, won = false;
  function draw() { var s = '<path d="M30 190H400" ' + ink + '/><path d="M30 ' + (190 - .1667 * 500) + 'H400" stroke="#e23a4e" stroke-dasharray="6 5" stroke-width="2"/>'; n.forEach(function (c, i) { var f = tot ? c / tot : 0, h = Math.min(170, f * 500); s += '<rect x="' + (42 + i * 60) + '" y="' + (190 - h) + '" width="44" height="' + h + '" fill="#21b6a8" ' + ink + '/><text x="' + (64 + i * 60) + '" y="212" text-anchor="middle" ' + txt + '>' + (i + 1) + '</text><text x="' + (64 + i * 60) + '" y="' + (184 - h) + '" text-anchor="middle" font-size="13" font-weight="800">' + f.toFixed(2) + "</text>"; }); document.getElementById("v").innerHTML = s; if (tot >= 1000 && !won) { won = true; A.award(20, "More trials give a more reliable estimate."); } }
  function roll(k) { for (var i = 0; i < k; i++) n[Math.floor(Math.random() * 6)]++; tot += k; draw(); }
  document.getElementById("a").onclick = function () { roll(10); }; document.getElementById("b").onclick = function () { roll(100); }; document.getElementById("d").onclick = function () { roll(1000); }; draw();
} });
GAME.lab({ id: "circle-lab", name: "Circle slice calculator", icon: "🍕", desc: "Slice a sector and see the arc and area update.", run: function (el, A) {
  el.innerHTML = '<div class="goal" id="g">Target: make a sector with an area of 25π (hint: r = 10)</div><div class="labview"><svg viewBox="0 0 300 260" id="v"></svg></div><div class="readout" id="o" style="font-size:19px"></div><div id="c"></div>';
  var r = 6, ang = 90, won = false;
  function draw() { var R = r * 10, a = ang * Math.PI / 180, x = 150 + R * Math.sin(a), y = 130 - R * Math.cos(a), lg = ang > 180 ? 1 : 0;
    document.getElementById("v").innerHTML = '<circle cx="150" cy="130" r="' + R + '" fill="#fff4d6" ' + ink + '/>' + (ang >= 360 ? '<circle cx="150" cy="130" r="' + R + '" fill="#ff6b4a"/>' : '<path d="M150 130L150 ' + (130 - R) + "A" + R + " " + R + " 0 " + lg + " 1 " + x + " " + y + 'Z" fill="#ff6b4a" ' + ink + "/>");
    var area = ang / 360 * r * r, arc = ang / 360 * 2 * r; document.getElementById("o").textContent = "Arc = " + arc.toFixed(2) + "π, area = " + area.toFixed(2) + "π";
    if (Math.abs(area - 25) < .01 && !won) { won = true; A.award(20, "Area = (90/360) × π × 10² = 25π. Well sliced!"); } }
  A.slider(document.getElementById("c"), "Radius", 1, 12, 1, 6, "", function (v) { r = v; draw(); });
  A.slider(document.getElementById("c"), "Angle", 10, 360, 10, 90, "°", function (v) { ang = v; draw(); });
  draw();
} });
})();
