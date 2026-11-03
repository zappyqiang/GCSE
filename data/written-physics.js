(function () {
  var E = function (t, m, q, ms, a, tip) { return { t: t, m: m, q: q, ms: ms, a: a, tip: tip }; };
  var W = function (t, title, p, s, a) { return { t: t, title: title, p: p, s: s, a: a }; };
  GAME.exam([
    E("Energy", 3, "A 2 kg ball is lifted 5 m. Calculate the gain in gravitational potential energy. (g = 10 N/kg)", ["Use Ep = m g h", "2 × 10 × 5", "100 J"], "Ep = m g h = 2 × 10 × 5 = 100 J.", "Write the equation, substitute, then give the unit."),
    E("Energy", 4, "Explain why a car's braking distance increases when its speed doubles.", ["Kinetic energy = ½mv²", "Doubling the speed makes kinetic energy four times bigger", "The brakes must do more work to transfer this energy to thermal energy", "So the car travels further before it stops"], "Kinetic energy depends on speed squared so doubling the speed gives four times the kinetic energy. The brakes must do four times as much work, so the braking distance is about four times longer.", "Mention v squared, not just 'it is faster'."),
    E("Electricity", 3, "A 12 V supply drives a current of 0.5 A through a resistor. Calculate the resistance.", ["R = V ÷ I", "12 ÷ 0.5", "24 Ω"], "R = V ÷ I = 12 ÷ 0.5 = 24 Ω.", "Check the unit: ohms (Ω)."),
    E("Electricity", 4, "Describe how to investigate the resistance of a wire as its length changes.", ["Connect the wire in a circuit with an ammeter in series and a voltmeter in parallel", "Measure the current and potential difference for different lengths", "Calculate resistance using R = V ÷ I for each length", "Keep the temperature low or use a low current to avoid heating; repeat readings"], "Set up a series circuit with an ammeter and the test wire, and a voltmeter across the wire. For several lengths record V and I and calculate R = V ÷ I. Use a low current so the wire does not heat up, and repeat to improve reliability.", "Name what you change, measure and keep the same."),
    E("Forces", 3, "A force of 20 N acts on a 4 kg trolley. Calculate its acceleration.", ["F = m a", "a = 20 ÷ 4", "5 m/s²"], "a = F ÷ m = 20 ÷ 4 = 5 m/s².", "Rearrange F = ma carefully."),
    E("Waves", 3, "A wave has a frequency of 50 Hz and a wavelength of 6 m. Calculate its speed.", ["Wave speed = frequency × wavelength", "50 × 6", "300 m/s"], "Speed = frequency × wavelength = 50 × 6 = 300 m/s.", "Frequency in hertz, wavelength in metres gives metres per second."),
    E("Atomic physics", 4, "A radioactive source has a half-life of 3 days. A sample has an activity of 800 counts per second. Calculate the activity after 9 days.", ["9 days is 3 half-lives", "After 3 days: 400", "After 6 days: 200", "After 9 days: 100 counts per second"], "Nine days is three half-lives. The activity halves each time: 800, 400, 200, 100. So it is 100 counts per second.", "Count half-lives first, then halve step by step.")
  ]);
  GAME.worked([
    W("Forces", "Weight and mass", "Find the weight of a 70 kg person on Earth. (g = 10 N/kg)", ["Weight = mass × gravitational field strength.", "W = 70 × 10."], "700 N"),
    W("Electricity", "Power", "A kettle uses 2300 W. How much energy does it transfer in 2 minutes?", ["Convert time to seconds: 2 minutes = 120 s.", "Energy = power × time.", "E = 2300 × 120."], "276 000 J"),
    W("Energy", "Efficiency", "A motor takes in 500 J and gives out 400 J of useful energy. Find the efficiency.", ["Efficiency = useful output ÷ total input.", "400 ÷ 500 = 0.8.", "Multiply by 100 for a percentage."], "80%"),
    W("Waves", "Speed from a graph", "A car travels 150 m in 10 s at constant speed. Find the speed.", ["Speed = distance ÷ time.", "150 ÷ 10."], "15 m/s")
  ]);
})();
