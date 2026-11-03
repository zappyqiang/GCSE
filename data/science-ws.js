/* Working scientifically: shared by Physics, Chemistry and Biology. */
(function () {
GAME.topic("Working Scientifically", "🔬", "Assessed on every paper", [
{ t: "Variables and fair tests", r: "WS 2", icon: "🎛️",
  c: ["Every experiment has three kinds of variable. The independent one is what you change on purpose.", "The dependent one is what you measure. Control variables are what you keep the same!", "Keep controls fixed, and only then can you say the independent variable caused the change.", "So a fair test changes one thing at a time. Got it."],
  k: "I change, D measure: I comes before D in the alphabet and in the experiment. Control the rest.",
  q: [["p", "Match each variable type.", [["Independent", "The one you change"], ["Dependent", "The one you measure"], ["Control", "The one you keep the same"]]],
      ["m", "Testing how temperature affects reaction rate. What's the independent variable?", "Temperature", "Reaction rate", "Volume of acid", "Size of the flask", "It's what you deliberately change."],
      ["t", "A hypothesis is a testable idea that can explain an observation.", true, "You then gather evidence to test it."]] },

{ t: "Accuracy, precision and errors", r: "WS 2, 3", icon: "🎯",
  c: ["Accurate means close to the true value. Precise means repeated results are close together.", "Resolution is the smallest change a device can show. A random error makes readings scatter around.", "A systematic error shifts all results by the same amount, such as a scale that doesn't start at zero. That's a zero error.", "Repeat, spot anomalies, and find a mean to reduce random errors."],
  k: "Accurate hits the bullseye. Precise is a tight cluster, even if it's off target.",
  q: [["p", "Match the term with its meaning.", [["Accurate", "Close to the true value"], ["Precise", "Repeats are close together"], ["Resolution", "Smallest change detectable"], ["Anomaly", "Result that doesn't fit the pattern"]]],
      ["s", "Sort these errors.", { "Random": ["Slight differences in reaction time", "Reading a value between scale marks unpredictably"], "Systematic": ["A balance reading 2 g with nothing on it", "A thermometer that always reads 1 °C high"] }],
      ["m", "What does repeating and taking a mean mainly reduce?", "Random errors", "Systematic errors", "The resolution", "The independent variable", "Random errors average out."],
      ["n", "Find the mean of 12, 14 and 13, ignoring the anomaly 25.", 13, "", "(12 + 14 + 13) ÷ 3."]] },

{ t: "Graphs, units and maths skills", r: "WS 3, 4", icon: "📈",
  c: ["Put the independent variable on the x-axis, and the dependent variable on the y-axis. Plot with crosses, then add a line or smooth curve of best fit.", "Categoric data gets a bar chart. Continuous data gets a line graph!", "Directly proportional means a straight line through the origin. Use the gradient for rates.", "And use SI units: metres, kilograms, seconds. Prefixes: kilo is 10³, milli is 10⁻³, micro is 10⁻⁶ and nano is 10⁻⁹."],
  k: "King Henry... just remember: kilo ×1000, milli ÷1000, micro ÷1 000 000, nano ÷1 000 000 000.",
  q: [["p", "Match the prefix.", [["kilo", "× 10³"], ["milli", "× 10⁻³"], ["micro", "× 10⁻⁶"], ["nano", "× 10⁻⁹"]]],
      ["m", "Which graph suits eye colour against number of people?", "Bar chart", "Line graph", "Scatter graph", "Histogram", "Eye colour is categoric."],
      ["t", "A straight line through the origin shows direct proportion.", true, "Double one, and the other doubles."],
      ["n", "Write 2.5 km in metres.", 2500, "m", "Multiply by 1000."]] },

{ t: "Exam command words", r: "Exam technique", icon: "✍️",
  c: ["Read the command word! Describe means say what happens. Explain means say WHY, using 'because'.", "Compare means give similarities and differences. Evaluate means give pros and cons, then a judgement.", "Calculate means show your working and give units. Suggest means apply your knowledge to a new situation.", "For 6-markers, write in logical steps and use the science words. Don't repeat the question!"],
  k: "Describe = what. Explain = why. Evaluate = both sides plus a verdict.",
  q: [["p", "Match the command word.", [["Describe", "Say what happens"], ["Explain", "Give reasons why"], ["Evaluate", "Weigh up, then conclude"], ["Calculate", "Work out a value"]]],
      ["m", "A question says 'Explain why the rate increases'. Which is the best start?", "The rate increases because...", "The rate goes up.", "The graph is a curve.", "It is faster.", "Explain needs a reason."],
      ["t", "Evaluate questions need a conclusion.", true, "Give points on both sides, then a justified judgement."]] }
], { blurb: "Plan fair tests, spot errors, draw graphs and read exam questions like a pro." });
})();
