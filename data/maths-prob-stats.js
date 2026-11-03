(function () {
var ri = GAME.ri, pick = GAME.pick;
GAME.topic("Probability Point", "🎲", "All three papers", [
{ t: "Probability basics", r: "P1, P2, P4", icon: "🪙",
  c: ["Probability runs from 0 (impossible) to 1 (certain). P = favourable outcomes ÷ total outcomes.", "All the probabilities of exhaustive outcomes add to 1.", "So P(not A) = 1 − P(A). The chance of no rain is 1 minus the chance of rain.", "Write it as a fraction, decimal or percentage. Never as '1 in 4' or '3:5'."],
  k: "All outcomes sum to 1. 'Not' means subtract from 1.",
  q: [function () { var r = ri(2, 6), b = ri(3, 8); return ["m", "A bag has " + r + " red and " + b + " blue marbles. What is P(red)?", r + "/" + (r + b), r + "/" + b, b + "/" + (r + b), "1/" + (r + b), "Red over total."]; },
      function () { var p = ri(1, 9) / 10; return ["n", "P(rain) = " + p + ". Find P(no rain).", Math.round((1 - p) * 10) / 10, "", "1 − " + p + "."]; },
      ["n", "Three outcomes have probabilities 0.2, 0.5 and x. Find x.", 0.3, "", "They add to 1."],
      ["m", "What's the chance of rolling a prime on a fair 6-sided die?", "1/2", "1/3", "2/3", "1/6", "2, 3 and 5 are prime."]] },

{ t: "Relative frequency", r: "P3, P5", icon: "📊",
  c: ["If you can't calculate a chance, run an experiment! Relative frequency = times it happened ÷ total trials.", "More trials, better estimate.", "Expected frequency = probability × number of trials.", "If a coin landed heads 700 times out of 1000, it's fishy. That's a biased coin!"],
  k: "Expected = probability × trials. More trials means a more reliable estimate.",
  q: [function () { var t = pick([50, 100, 200]), h = ri(1, 4) * t / 5; return ["n", "A spinner landed on blue " + h + " times out of " + t + " spins. What's the relative frequency of blue as a decimal?", h / t, "", "Times ÷ total."]; },
      function () { var n = pick([60, 120, 300]); return ["n", "A fair die is rolled " + n + " times. How many sixes do you expect?", n / 6, "", n + " × ⅙."]; },
      ["t", "Doing more trials gives a more reliable estimate.", true, "Random variation averages out."],
      ["m", "A fair coin is flipped 10 times, giving 7 heads. What should you conclude?", "Not enough trials to say it's biased", "It's definitely biased", "Next flip must be tails", "P(heads) is 0.7 exactly", "10 trials is too few."]] },

{ t: "Sample spaces and two-way tables", r: "P7, P1", icon: "🎰",
  c: ["A sample space lists all possible outcomes. For two dice, there are 36.", "A grid is neatest: one down the side, one across the top.", "Two-way tables sort people by two features. Make sure the rows and columns add up.", "I've got red feathers and I'm chatty. That's one box."],
  k: "Two events? Draw a grid. Number of outcomes = first count × second count.",
  q: [["n", "Two fair dice are rolled. How many outcomes are there?", 36, "", "6 × 6."],
      ["m", "Two fair dice are rolled and added. What is P(total = 7)?", "1/6", "1/12", "7/36", "1/36", "6 ways out of 36."],
      ["m", "A coin is flipped and a die is rolled. What is P(heads and 6)?", "1/12", "1/8", "1/2", "7/12", "1 of 12 outcomes."],
      ["n", "In a class of 30, 18 play football. How many don't?", 12, "", "30 − 18."]] },

{ t: "Venn diagrams", r: "P6", icon: "⭕", d: "venn",
  c: ["Circles for sets, overlap for both, and a box for everything. Always fill in from the middle first!", "∩ means AND (intersection). ∪ means OR (union). A′ means NOT A.", "∩ looks like an 'n' for aNd. ∪ looks like a cUp holding everything.", "Add up every region, including the ones outside the circles!"],
  k: "Fill the overlap first. ∩ is an n for aNd. ∪ is a Union, a big cUp.",
  q: [["p", "Match the set symbol.", [["A ∩ B", "In both A and B"], ["A ∪ B", "In A or B or both"], ["A′", "Not in A"], ["ξ", "Universal set"]]],
      ["n", "20 people: 12 like tea, 10 like coffee, 5 like both. How many like tea only?", 7, "", "12 − 5."],
      ["n", "20 people: 12 like tea, 10 like coffee, 5 like both. How many like neither?", 3, "", "7 + 5 + 5 = 17, so 20 − 17."],
      ["m", "From the same 20 people, what is P(tea ∪ coffee)?", "17/20", "22/20", "5/20", "12/20", "7 + 5 + 5 = 17."]] },

{ t: "Tree diagrams", r: "P8", icon: "🌳", d: "tree",
  c: ["For two events, draw a tree: each branch is a chance, and they add to 1 at each fork.", "Multiply ALONG the branches. Add DOWN the outcomes.", "Without replacement, the numbers change on the second round. Fewer in the bag, so denominators drop!", "Multiply across, add down. That's the key rule."],
  k: "Along the branch: AND, multiply. Between the ends: OR, add.",
  q: [["n", "P(rain) = 0.3 each day, independently. What is P(rain on both days)?", 0.09, "", "0.3 × 0.3."],
      ["n", "P(rain) = 0.3 each day, independently. What is P(exactly one rainy day)?", 0.42, "", "0.3 × 0.7 + 0.7 × 0.3."],
      ["m", "A bag has 3 red and 2 blue. Take two without replacement. What is P(both red)?", "3/10", "9/25", "6/25", "2/5", "3/5 × 2/4."],
      ["t", "Branches from one point must add to 1.", true, "They cover all outcomes at that fork."]] },

{ t: "Conditional probability", r: "P9", h: 1, icon: "🕵️",
  c: ["P(A given B), written P(A|B), means the chance of A when you already know B happened.", "So the total shrinks to only the B group!", "Formula: P(A|B) = P(A and B) ÷ P(B). Use Venn diagrams or tree diagrams.", "Also P(A or B) = P(A) + P(B) − P(A and B), so you don't count the overlap twice."],
  k: "'Given' shrinks your world. The denominator becomes the group you're told about.",
  q: [["m", "12 people like tea, 5 of them also like coffee. Given someone likes tea, what's P(coffee)?", "5/12", "5/20", "7/12", "12/20", "The total is the 12 tea drinkers."],
      ["n", "P(A) = 0.5, P(B) = 0.4, P(A and B) = 0.2. Find P(A or B).", 0.7, "", "0.5 + 0.4 − 0.2."],
      ["n", "P(A and B) = 0.2 and P(B) = 0.4. Find P(A|B).", 0.5, "", "0.2 ÷ 0.4."]] }
], { blurb: "Calculate the chance of storms, sharks and treasure." });

GAME.topic("Statistics Strait", "📊", "All three papers", [
{ t: "Sampling", r: "S1", icon: "🐟",
  c: ["We can't ask every fish in the sea. A sample is a smaller group that stands for the population.", "A random sample gives everyone an equal chance.", "Bias sneaks in if you only ask your mates. Bigger samples are usually more reliable.", "Only asking people who already like crackers is biased."],
  k: "Random means everyone has an equal chance. Biased means someone's been left out.",
  q: [["t", "Asking only people at a gym about exercise habits gives a biased sample.", true, "They're not representative of everyone."],
      ["m", "A population is...", "The whole group being studied", "The number of people in a country only", "The sample's size", "The group that answers", "The whole group of interest."],
      ["m", "What's the main advantage of a larger sample?", "It is more representative", "It is cheaper", "It takes less time", "It always gives the same results", "Larger samples reduce chance variations."]] },

{ t: "Charts and diagrams", r: "S2", icon: "🍕",
  c: ["Bar charts for categories, pictograms use symbols with a key, line charts for trends and pie charts for proportions.", "To draw a pie: frequency ÷ total × 360.", "Time series graphs join points over time to show trends and seasonal patterns.", "Always check the key! One symbol can mean ten crabs."],
  k: "Pie: find degrees per person. 360 ÷ total, then multiply. Time series looks for trends.",
  q: [function () { var t = pick([18, 24, 36, 40, 60, 72, 90]), f = ri(2, 8); return ["n", t + " people were surveyed; " + f + " chose rum. What angle is that on a pie chart?", 360 / t * f, "°", "360 ÷ " + t + " × " + f + "."]; },
      ["m", "In a pictogram, each icon means 4 ships. How many ships do 3½ icons show?", "14", "12", "16", "7", "3.5 × 4."],
      ["n", "A pie chart with 60 people has a 90° sector. How many people does it show?", 15, "", "90/360 × 60."],
      ["m", "Which chart is best for showing a trend in sales through a year?", "Time series line graph", "Pie chart", "Pictogram", "Venn diagram", "Line graphs show change over time."]] },

{ t: "Averages and range", r: "S4", icon: "📏",
  c: ["Mode is the most common. Median is the middle when in order. Mean is the total shared out. Range is biggest minus smallest.", "Mode: 'most'. Median: 'medium'. Mean: 'mean, you've got to work it out'.", "An outlier can stretch the mean, so use the median instead.", "Discrete data counts whole numbers. Continuous data is measured."],
  k: "Hey diddle diddle, the median's the middle. You add then divide for the mean. The mode is the one that you see the most. The range is the difference between.",
  q: [function () { var a = [ri(1, 5), ri(6, 9), ri(10, 15), ri(16, 20), ri(21, 30)]; return ["n", "Find the median of " + GAME.shuf(a).join(", ") + ".", a[2], "", "Order them, then pick the middle."]; },
      function () { var m = ri(4, 9), a = m - ri(1, 3), b = m + ri(1, 3), c = 3 * m - a - b; return ["n", "Find the mean of " + a + ", " + b + " and " + c + ".", m, "", "Add, then divide by 3."]; },
      function () { var a = ri(1, 9), b = ri(20, 40); return ["n", "Find the range of " + [a + 5, b, a, a + 9].join(", ") + ".", b - a, "", "Biggest minus smallest."]; },
      ["m", "Which average is most affected by an outlier?", "Mean", "Median", "Mode", "None", "It uses every value."],
      ["s", "Sort these data types.", { "Discrete": ["Number of pets", "Shoe size", "Goals scored"], "Continuous": ["Height", "Time taken", "Mass"] }, "Discrete is counted; continuous is measured."]] },

{ t: "Averages from frequency tables", r: "S4", icon: "🧾",
  c: ["For a mean from a table, multiply each value by its frequency, add them, then divide by the total frequency.", "Don't divide by the number of rows!", "For grouped data, use midpoints. It's only an estimate, because we've lost the exact values.", "The modal class is the group with the highest frequency."],
  k: "fx column, total it, divide by total f. Grouped data needs midpoints, and it's an estimate.",
  q: [["n", "Score 1 × 3 times, 2 × 5 times, 3 × 2 times. Find the mean score.", 1.9, "", "(3 + 10 + 6) ÷ 10."],
      ["m", "Why is the mean from a grouped table only an estimate?", "We don't know the exact values", "The calculator isn't accurate", "It uses the mode", "It ignores frequencies", "Midpoints stand in for values."],
      ["n", "What's the midpoint of the class 10 ≤ x < 20?", 15, "", "(10 + 20) ÷ 2."]] },

{ t: "Cumulative frequency and box plots", r: "S3, S4", h: 1, icon: "📦", d: "boxplot",
  c: ["Cumulative frequency keeps a running total. Plot it at the upper end of each class, and you get an S-shaped curve.", "Read the median at half way. The quartiles at a quarter and three quarters.", "Interquartile range = UQ − LQ. It measures spread, ignoring outliers.", "A box plot shows five numbers: min, LQ, median, UQ, max."],
  k: "Five-number box: min, LQ, median, UQ, max. IQR measures the middle half.",
  q: [["n", "LQ = 12 and UQ = 30. Find the IQR.", 18, "", "UQ − LQ."],
      ["m", "On a cumulative frequency graph with total 80, where do you read the median?", "At 40 on the frequency axis", "At 80", "At 20", "At 60", "Half of the total."],
      ["t", "Cumulative frequency is plotted at the upper end of each class.", true, "A running total is only complete at the top of each class."],
      ["m", "What should you compare between two box plots?", "Medians and IQRs", "Only the maximums", "Only the widths of the page", "The colours", "Average and spread."]] },

{ t: "Histograms", r: "S3", h: 1, icon: "🏙️", d: "histogram",
  c: ["Histograms have unequal bars! The height is frequency density, and the area gives frequency.", "Frequency density = frequency ÷ class width.", "No gaps between the bars, and the y-axis says frequency density.", "So frequency = density × width. Keep that close to your wing."],
  k: "FD = F ÷ W. Think of a triangle: F on top, D and W below. Area = frequency.",
  q: [function () { var w = pick([5, 10, 20]), f = w * ri(1, 6); return ["n", "A class has width " + w + " and frequency " + f + ". Find the frequency density.", f / w, "", "Frequency ÷ width."]; },
      function () { var w = pick([5, 10, 20]), d = ri(1, 6); return ["n", "A bar has width " + w + " and frequency density " + d + ". Find the frequency.", w * d, "", "Area = width × density."]; },
      ["t", "In a histogram, the height of a bar is the frequency.", false, "Height is frequency density. Area is frequency."]] },

{ t: "Scatter graphs", r: "S6", icon: "🌌",
  c: ["Scatter graphs check for a link between two things.", "Positive correlation goes up, negative goes down, and none looks like a star field.", "A line of best fit helps predict. Inside the data is interpolation and reliable. Outside is extrapolation and risky.", "Correlation doesn't mean causation! Ice cream sales and shark attacks both rise in summer."],
  k: "Correlation isn't causation. Interpolate safely inside; extrapolate at your peril.",
  q: [["s", "Sort these relationships.", { "Positive": ["Height and shoe size", "Temperature and ice cream sales"], "Negative": ["Car's age and its value", "Temperature and hot chocolate sales"], "None": ["Shoe size and test score"] }],
      ["t", "Strong correlation proves that one thing causes the other.", false, "There might be a hidden third factor."],
      ["m", "Why is extrapolating from a line of best fit risky?", "The trend may not continue outside the data", "It uses too many points", "The line must be curved", "It always gives a negative number", "We've no data there."],
      ["m", "What's an outlier on a scatter graph?", "A point far from the general pattern", "The first point", "The average", "A point on the line", "It doesn't fit the trend."]] },

{ t: "Comparing and describing data", r: "S4, S5", icon: "⚖️",
  c: ["To compare two groups, always mention an average AND a spread.", "Say what it means: 'Team A scored higher on average, and were more consistent.'", "Smaller range or IQR means more consistent.", "Numbers plus words. Both earn marks."],
  k: "Compare twice: one average, one spread, both in context.",
  q: [["m", "Team A: median 10, IQR 2. Team B: median 8, IQR 5. Which is the best comparison?", "A scored higher on average and more consistently", "B scored higher and more consistently", "A scored higher but less consistently", "They're the same", "Higher median, smaller IQR."],
      ["t", "Comparing only the means is enough for full marks.", false, "You also need to compare spread."],
      ["m", "What does a smaller range suggest?", "More consistent data", "A larger mean", "Less accurate data", "More outliers", "Values sit closer together."]] }
], { blurb: "Turn messy data into a clear story, and spot when someone's fibbing with charts." });
})();
