(function () {
var ink = 'stroke="#1c1436" stroke-width="3"', txt = 'font-family="Nunito,sans-serif" font-weight="800" font-size="16" fill="#1c1436"';
GAME.lab({ id: "ohm", name: "Ohm's law circuit", icon: "💡", desc: "Change voltage and resistance, and see the current and bulb respond.", run: function (el, A) {
  el.innerHTML = '<div class="goal" id="g"></div><div class="labview"><svg viewBox="0 0 400 200" id="v"></svg></div><div class="readout" id="o"></div><div id="c"></div>';
  var V = 6, R = 6, T, won = false; function nt() { T = A.pick([2, 3, 4, 5]); document.getElementById("g").textContent = "Target: make the current exactly " + T + " A"; } nt();
  function draw() { var I = V / R, b = Math.min(1, I / 4); document.getElementById("v").innerHTML = '<rect x="50" y="30" width="300" height="130" rx="10" fill="none" ' + ink + '/><rect x="150" y="145" width="100" height="30" fill="#ffd23f" ' + ink + '/><text x="200" y="166" text-anchor="middle" ' + txt + '>' + R + ' Ω</text><rect x="175" y="12" width="50" height="36" fill="#fff" stroke="none"/><path d="M190 12v36M208 20v20" ' + ink + '/><text x="232" y="20" ' + txt + '>' + V + ' V</text><circle cx="350" cy="95" r="26" fill="rgb(255,' + Math.round(255 - 60 * (1 - b)) + ',' + Math.round(240 - 220 * b) + ')" ' + ink + '/><path d="M332 77l36 36M368 77l-36 36" ' + ink + '/>' + (I > 0 ? '<circle cx="50" cy="95" r="20" fill="#fff" ' + ink + '/><text x="50" y="101" text-anchor="middle" ' + txt + '>A</text>' : "");
    document.getElementById("o").textContent = "I = V ÷ R = " + V + " ÷ " + R + " = " + A.fmt(Math.round(I * 100) / 100) + " A, P = " + A.fmt(Math.round(V * I * 10) / 10) + " W";
    if (Math.abs(I - T) < 1e-9 && !won) { won = true; A.award(20, "That's it!"); setTimeout(function () { won = false; nt(); draw(); }, 1500); } }
  A.slider(document.getElementById("c"), "Voltage", 1, 24, 1, 6, "V", function (v) { V = v; draw(); });
  A.slider(document.getElementById("c"), "Resistance", 1, 12, 1, 6, "Ω", function (v) { R = v; draw(); }); draw();
} });
GAME.lab({ id: "wave", name: "Wave machine", icon: "〰️", desc: "See how frequency and wavelength set the wave speed.", run: function (el, A) {
  el.innerHTML = '<div class="goal">Target: make the speed of sound in air, 330 m/s, with frequency 110 Hz</div><div class="labview"><svg viewBox="0 0 500 170" id="v"></svg></div><div class="readout" id="o"></div><div id="c"></div>';
  var f = 100, l = 2, amp = 50, won = false, t = 0, reduced = matchMedia("(prefers-reduced-motion: reduce)").matches, alive = true;
  function draw() { var d = "", px = l * 60; for (var x = 0; x <= 500; x += 4) { var y = 85 - amp * Math.sin(2 * Math.PI * (x / px - t)); d += (x ? "L" : "M") + x + " " + y.toFixed(1); } var v = document.getElementById("v"); if (!v) { alive = false; return; } v.innerHTML = '<path d="M0 85H500" stroke="#bbb" stroke-dasharray="6 5"/><path d="' + d + '" fill="none" stroke="#3d2bb0" stroke-width="4"/>'; document.getElementById("o").textContent = "v = fλ = " + f + " × " + l + " = " + A.fmt(f * l) + " m/s"; if (f * l === 330 && f === 110 && !won) { won = true; A.award(20, "That's the speed of sound in air!"); } }
  function loop() { if (!alive) return; t += .006 * f / 100; draw(); if (!reduced && alive) requestAnimationFrame(loop); }
  A.slider(document.getElementById("c"), "Frequency", 10, 200, 10, 100, "Hz", function (v) { f = v; draw(); });
  A.slider(document.getElementById("c"), "Wavelength", .5, 5, .5, 2, "m", function (v) { l = v; draw(); });
  A.slider(document.getElementById("c"), "Amplitude", 10, 70, 5, 50, "", function (v) { amp = v; draw(); }); draw(); loop();
} });
GAME.lab({ id: "decay", name: "Half-life dice room", icon: "☢️", desc: "Watch 400 unstable nuclei decay at random, and find the half-life.", run: function (el, A) {
  el.innerHTML = '<div class="goal" id="g">Target: press Next until fewer than 50 nuclei remain</div><div class="labview"><svg viewBox="0 0 420 230" id="v"></svg></div><div class="readout" id="o"></div><div class="row"><button class="btn small" id="n">Next half-life</button><button class="btn alt small" id="r">Reset</button></div>';
  var alive, hist, won; function reset() { alive = 400; hist = [400]; won = false; draw(); }
  function draw() { var s = '<path d="M40 10V200H400" ' + ink + '/>'; hist.forEach(function (h, i) { var x = 50 + i * 48, H = h / 400 * 180; s += '<rect x="' + x + '" y="' + (200 - H) + '" width="34" height="' + H + '" fill="#ff5da2" ' + ink + '/><text x="' + (x + 17) + '" y="222" text-anchor="middle" font-size="14" font-weight="800">' + i + "</text>"; }); document.getElementById("v").innerHTML = s; document.getElementById("o").textContent = alive + " nuclei remain after " + (hist.length - 1) + " half-lives. Exactly half would be " + 400 / Math.pow(2, hist.length - 1) + "."; if (alive < 50 && !won) { won = true; A.award(25, "Random, but the pattern holds!"); } }
  document.getElementById("n").onclick = function () { if (hist.length > 7) return; var a = 0; for (var i = 0; i < alive; i++) if (Math.random() < .5) a++; alive = a; hist.push(a); draw(); };
  document.getElementById("r").onclick = reset; reset();
} });
GAME.lab({ id: "fma", name: "F = ma rocket", icon: "🚀", desc: "Change thrust and mass, then launch your rocket.", run: function (el, A) {
  el.innerHTML = '<div class="goal">Target: accelerate at exactly 5 m/s²</div><div class="labview"><svg viewBox="0 0 500 130" id="v"></svg></div><div class="readout" id="o"></div><div id="c"></div>';
  var F = 200, m = 100, won = false;
  function draw() { var a = F / m, x = Math.min(430, a * 25); document.getElementById("v").innerHTML = '<path d="M0 100H500" ' + ink + '/><text x="' + (10 + x) + '" y="86" font-size="48" transform="rotate(45 ' + (34 + x) + ' 70)">🚀</text>'; document.getElementById("o").textContent = "a = F ÷ m = " + F + " ÷ " + m + " = " + A.fmt(Math.round(a * 100) / 100) + " m/s²"; if (a === 5 && !won) { won = true; A.award(20, "F = ma mastered!"); } }
  A.slider(document.getElementById("c"), "Force", 50, 1000, 50, 200, "N", function (v) { F = v; draw(); });
  A.slider(document.getElementById("c"), "Mass", 50, 300, 10, 100, "kg", function (v) { m = v; draw(); }); draw();
} });
GAME.lab({ id: "stop", name: "Stopping distance simulator", icon: "🛑", desc: "Change speed, reaction time and road conditions.", run: function (el, A) {
  el.innerHTML = '<div class="goal">Target: find a safe speed that stops within 25 m on a wet road</div><div class="labview"><svg viewBox="0 0 500 90" id="v"></svg></div><div class="readout" id="o" style="font-size:19px"></div><div id="c"></div><label class="radio"><input type="checkbox" id="wet" checked> Wet road (braking distance doubles in this model)</label>';
  var sp = 13, rt = .7, won = false;
  function draw() { var wet = document.getElementById("wet").checked, th = sp * rt, br = sp * sp / (2 * 6.5) * (wet ? 2 : 1), tot = th + br, k = Math.min(5.6, 460 / Math.max(tot, 1)); document.getElementById("v").innerHTML = '<rect x="10" y="30" width="' + th * k + '" height="30" fill="#ffd23f" ' + ink + '/><rect x="' + (10 + th * k) + '" y="30" width="' + br * k + '" height="30" fill="#ff5da2" ' + ink + '/><text x="10" y="22" ' + txt + '>Thinking</text><text x="' + (14 + th * k) + '" y="22" ' + txt + '>Braking</text>'; document.getElementById("o").textContent = "Thinking " + th.toFixed(1) + " m + braking " + br.toFixed(1) + " m = " + tot.toFixed(1) + " m"; if (wet && tot <= 25 && sp >= 10 && !won) { won = true; A.award(20, "Slower speeds save lives."); } }
  A.slider(document.getElementById("c"), "Speed", 5, 31, 1, 13, "m/s", function (v) { sp = v; draw(); });
  A.slider(document.getElementById("c"), "Reaction time", .2, 1.5, .1, .7, "s", function (v) { rt = v; draw(); });
  document.getElementById("wet").onchange = draw; draw();
} });
})();
