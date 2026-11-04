(function () {
  var E = function (t, m, q, ms, a, tip) { return { t: t, m: m, q: q, ms: ms, a: a, tip: tip }; };
  var W = function (t, title, p, s, a) { return { t: t, title: title, p: p, s: s, a: a }; };
  GAME.exam([
    E("Number", 3, "Work out 3/4 ÷ 2/5. Give your answer as a mixed number.", ["Turn the division into a multiplication by the reciprocal: 3/4 × 5/2", "Multiply to get 15/8", "Convert to the mixed number 1 7/8"], "3/4 ÷ 2/5 = 3/4 × 5/2 = 15/8 = 1 7/8.", "Keep, flip, multiply. Always check whether the question wants a mixed number."),
    E("Number", 3, "A coat costs £60 after a 20% discount. Work out the original price.", ["£60 is 80% of the original price", "Original = 60 ÷ 0.8 (or 60 ÷ 80 × 100)", "£75"], "£60 represents 80% of the original price. 60 ÷ 0.8 = £75.", "Reverse percentage: divide by the multiplier, do not add 20% on."),
    E("Algebra", 3, "Solve 5(x − 2) = 3x + 8.", ["Expand brackets: 5x − 10 = 3x + 8", "Collect terms: 2x = 18", "x = 9"], "Expanding gives 5x − 10 = 3x + 8. Subtract 3x and add 10: 2x = 18, so x = 9.", "Check by substituting back into both sides."),
    E("Algebra", 4, "Solve the simultaneous equations 2x + y = 11 and x − y = 1.", ["Add the equations to eliminate y: 3x = 12", "x = 4", "Substitute to find y: 8 + y = 11", "y = 3"], "Adding the equations gives 3x = 12, so x = 4. Substituting into 2x + y = 11 gives y = 3.", "Always substitute into the other equation to check your answer."),
    E("Geometry", 4, "A right-angled triangle has shorter sides 6 cm and 8 cm. Work out the length of the hypotenuse and the area of the triangle.", ["Use Pythagoras: 6² + 8² = 36 + 64 = 100", "Hypotenuse = 10 cm", "Area = ½ × 6 × 8", "24 cm²"], "By Pythagoras, h² = 36 + 64 = 100 so h = 10 cm. The area is ½ × 6 × 8 = 24 cm².", "Include units: cm for length and cm² for area."),
    E("Geometry", 3, "Work out the size of each interior angle of a regular hexagon.", ["Sum of interior angles = (6 − 2) × 180 = 720°", "720 ÷ 6", "120°"], "The interior angles sum to 4 × 180 = 720°. Each angle is 720 ÷ 6 = 120°.", "Or use exterior angle 360 ÷ 6 = 60°, then 180 − 60 = 120°."),
    E("Ratio and proportion", 3, "Share £420 in the ratio 3 : 4 : 5.", ["Total parts = 12", "One part = 420 ÷ 12 = £35", "£105, £140 and £175"], "There are 12 parts and each is £35. The shares are £105, £140 and £175.", "Check the shares add back to the total."),
    E("Probability and statistics", 4, "A bag has 5 red and 3 blue counters. Two counters are taken without replacement. Find the probability both are red.", ["P(first red) = 5/8", "P(second red) = 4/7", "Multiply: 5/8 × 4/7", "20/56 = 5/14"], "The probability the first is red is 5/8. With one red gone, the probability the second is red is 4/7. The probability of both is 5/8 × 4/7 = 5/14.", "Without replacement means the second denominator is one less.")
  ]);
  GAME.worked([
    W("Algebra", "Solving a quadratic by factorising", "Solve x² + 5x + 6 = 0.", ["Look for two numbers that multiply to 6 and add to 5: 2 and 3.", "Factorise: (x + 2)(x + 3) = 0.", "Set each bracket to zero: x + 2 = 0 or x + 3 = 0."], "x = −2 or x = −3"),
    W("Geometry", "Trigonometry: finding a side", "In a right-angled triangle the hypotenuse is 12 cm and an angle is 30°. Find the side opposite the angle.", ["Opposite and hypotenuse means use sine: sin θ = opposite ÷ hypotenuse.", "sin 30° = opp ÷ 12.", "opp = 12 × sin 30° = 12 × 0.5."], "6 cm"),
    W("Number", "Standard form", "Work out (3 × 10⁴) × (2 × 10⁵). Give the answer in standard form.", ["Multiply the numbers: 3 × 2 = 6.", "Add the powers of ten: 10⁴ × 10⁵ = 10⁹."], "6 × 10⁹"),
    W("Statistics", "Mean from a frequency table", "Scores 1, 2, 3 have frequencies 4, 3, 3. Find the mean.", ["Multiply each score by its frequency: 4, 6, 9.", "Add them: total = 19.", "Add the frequencies: 10.", "Divide: 19 ÷ 10."], "1.9"),
    W("Algebra", "Rearranging a formula", "Make r the subject of A = πr².", ["Divide both sides by π: r² = A ÷ π.", "Take the square root of both sides."], "r = √(A ÷ π)")
  ]);
})();
