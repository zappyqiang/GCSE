/* Extra practice questions for every Maths unit. Functions generate fresh numbers every time. */
(function () {
  const { ri, pick, gcd } = GAME;
  const m = (s) => (s < 0 ? "−" + -s : "" + s);
  const sup = (b, e) => b + "<sup>" + e + "</sup>";

  GAME.more({
    "Negative numbers": [
      () => { const a = ri(1, 7), b = a + ri(2, 9); return ["n", a + " − " + b + " = ?", a - b, "", "Start at " + a + " and move " + b + " places left to reach " + (a - b) + "."]; },
      () => { const a = ri(2, 9), b = ri(2, 9); return ["n", "(−" + a + ") × " + b + " = ?", -a * b, "", "Different signs give a negative answer."]; },
      () => { const a = ri(2, 9), b = ri(2, 9); return ["n", "(−" + a * b + ") ÷ (−" + b + ") = ?", a, "", "Two negatives divide to give a positive."]; },
      ["m", "Which temperature is the lowest?", "−12 °C", "−2 °C", "0 °C", "−7 °C", "The further left on the number line, the lower the value."],
      ["t", "−5 − (−2) = −3", true, "Subtracting a negative is adding: −5 + 2 = −3."]
    ],
    "BIDMAS": [
      () => { const a = ri(2, 9), b = ri(2, 6), c = ri(2, 6); return ["n", a + " + " + b + " × " + c + " = ?", a + b * c, "", "Multiply before you add."]; },
      () => { const a = ri(2, 9), b = ri(1, 6), c = ri(2, 6); return ["n", "(" + a + " + " + b + ") × " + c + " = ?", (a + b) * c, "", "Brackets come first."]; },
      () => { const a = ri(5, 9), b = ri(2, 4), c = ri(2, 5); return ["n", a + "² − " + b + " × " + c + " = ?", a * a - b * c, "", "Indices first, then multiplication, then subtraction."]; },
      () => { const p = ri(2, 9), q = ri(2, 6), r = ri(2, 6); return ["n", p * q + " ÷ " + q + " + " + r + " × 2 = ?", p + 2 * r, "", "Division and multiplication before addition."]; },
      ["m", "What do you work out first in 8 − 2 × 3?", "2 × 3", "8 − 2", "They are done together", "Neither: go left to right", "Multiplication comes before subtraction."]
    ],
    "Factors, multiples and primes": [
      ["m", "Which of these is a prime number?", "29", "21", "27", "33", "29 has only two factors, 1 and 29. The others divide by 3."],
      () => { const n = pick([[12, 6], [18, 6], [20, 6], [24, 8], [36, 9], [30, 8]]); return ["n", "How many factors does " + n[0] + " have?", n[1], "", "List them in pairs, starting with 1 × " + n[0] + "."]; },
      ["n", "How many prime factors (counting repeats) does 72 have?", 5, "", "72 = 2 × 2 × 2 × 3 × 3."],
      () => { const a = pick([4, 6, 8, 10]), b = pick([9, 12, 15, 14]); return ["n", "Find the LCM of " + a + " and " + b + ".", a * b / gcd(a, b), "", "LCM = a × b ÷ HCF."]; },
      ["t", "1 is a prime number.", false, "A prime has exactly two factors. 1 has only one."]
    ],
    "Listing and the product rule": [
      () => { const a = ri(2, 6), b = ri(2, 6), c = ri(2, 4); return ["n", "An outfit is one of " + a + " hats, " + b + " tops and " + c + " pairs of shoes. How many different outfits?", a * b * c, "", "Multiply the choices: " + a + " × " + b + " × " + c + "."]; },
      ["n", "A PIN has 4 digits, each from 0 to 9. How many different PINs are there?", 10000, "", "10 × 10 × 10 × 10 = 10 000."],
      ["n", "In how many different orders can 3 different books be arranged on a shelf?", 6, "", "3 × 2 × 1 = 6."],
      ["n", "A menu has 3 starters and 4 mains. How many different two-course meals are possible?", 12, "", "3 × 4 = 12."]
    ],
    "Powers and roots": [
      () => { const a = ri(2, 9), b = ri(2, 4); return ["n", a + "² + " + b + "³ = ?", a * a + Math.pow(b, 3), "", "Square " + a + " and cube " + b + ", then add."]; },
      () => { const s = ri(3, 12), t = ri(2, 5); return ["n", "√" + s * s + " + ∛" + Math.pow(t, 3) + " = ?", s + t, "", "√" + s * s + " = " + s + " and ∛" + Math.pow(t, 3) + " = " + t + "."]; },
      ["m", "Simplify 2⁵ × 2³.", "2⁸", "2¹⁵", "4⁸", "2²", "When multiplying powers of the same base, add the indices."],
      ["m", "Simplify 3⁷ ÷ 3⁴.", "3³", "3¹¹", "3²⁸", "1³", "When dividing, subtract the indices."],
      ["n", "Work out 5⁰ + 7¹.", 8, "", "Anything to the power 0 is 1, so 1 + 7 = 8."]
    ],
    "Negative and fractional indices": [
      ["n", "Work out 2⁻³ as a decimal.", 0.125, "", "2⁻³ = 1 ÷ 2³ = 1 ÷ 8."],
      () => { const s = ri(2, 12); return ["n", "Evaluate " + sup(s * s, "½") + ".", s, "", "A power of ½ means square root."]; },
      ["n", "Evaluate 8<sup>2/3</sup>.", 4, "", "Cube root first: ∛8 = 2, then square: 4."],
      ["m", "x⁻¹ is the same as", "1/x", "−x", "x¹", "√x", "A negative power means reciprocal."],
      ["n", "Evaluate (1/4)⁻².", 16, "", "Flip the fraction and square: 4² = 16."]
    ],
    "Fractions": [
      () => { const q = pick([[1, 2, 1, 4, "3/4"], [1, 2, 1, 5, "7/10"], [3, 4, 1, 8, "7/8"], [1, 4, 2, 5, "13/20"], [3, 5, 1, 2, "11/10"]]); return ["n", q[0] + "/" + q[1] + " + " + q[2] + "/" + q[3] + " = ? (give a decimal or fraction)", eval(q[4]), "", "Use a common denominator, then add the numerators."]; },
      () => { const q = pick([[2, 3, 3, 4, 0.5], [3, 5, 5, 6, 0.5], [1, 2, 4, 5, 0.4], [3, 4, 2, 3, 0.5]]); return ["n", q[0] + "/" + q[1] + " × " + q[2] + "/" + q[3] + " = ? (decimal or fraction)", q[4], "", "Multiply the numerators and the denominators."]; },
      ["n", "1/2 ÷ 1/4 = ?", 2, "", "Keep, change, flip: 1/2 × 4/1 = 2."],
      () => { const d = pick([5, 8, 10]), t = d === 5 ? 3 : d === 8 ? 3 : 7; return ["n", "Find " + t + "/" + d + " of " + d * 8 + ".", t * 8, "", "Divide by " + d + " then multiply by " + t + "."]; },
      ["m", "Which fraction is the largest?", "3/4", "2/3", "5/8", "7/12", "As decimals: 0.75, 0.667, 0.625, 0.583."]
    ],
    "Fractions, decimals and percentages": [
      () => { const p = pick([35, 6, 125, 72, 8, 45]); return ["n", "Write " + p + "% as a decimal.", p / 100, "", "Divide by 100."]; },
      ["n", "Write 3/8 as a percentage.", 37.5, "%", "3 ÷ 8 = 0.375 = 37.5%."],
      ["o", "Order from smallest to largest.", ["0.3", "1/3", "35%", "0.4"], "As decimals: 0.3, 0.333, 0.35, 0.4."],
      ["t", "0.07 is the same as 70%.", false, "0.07 = 7%."],
      ["m", "Which is equal to 0.6?", "3/5", "6/5", "1/6", "2/5", "3 ÷ 5 = 0.6."]
    ],
    "Recurring decimals": [
      ["w", "Write 0.777… as a fraction in the form a/b.", ["7/9"], "Let x = 0.777…, so 10x = 7.777… and 9x = 7, giving x = 7/9."],
      ["w", "Write 0.4545… as a fraction in its simplest form.", ["5/11", "45/99"], "100x − x = 45, so x = 45/99 = 5/11."],
      ["m", "Which fraction gives a recurring decimal?", "1/3", "1/4", "1/5", "3/8", "Only fractions whose denominator has prime factors other than 2 and 5 recur."],
      ["t", "1/7 is a terminating decimal.", false, "1/7 = 0.142857… recurring."]
    ],
    "Surds": [
      ["m", "Simplify √50.", "5√2", "25√2", "2√5", "10√5", "√50 = √(25 × 2) = 5√2."],
      ["m", "Simplify √12.", "2√3", "3√2", "4√3", "6", "√12 = √(4 × 3) = 2√3."],
      () => { const a = pick([2, 3, 5, 7, 11]); return ["n", "√" + a + " × √" + a + " = ?", a, "", "A surd multiplied by itself gives the number inside."]; },
      ["m", "Rationalise the denominator of 1/√2.", "√2/2", "1/2", "2√2", "√2", "Multiply top and bottom by √2."],
      ["m", "Simplify √18 + √2.", "4√2", "√20", "3√2", "5√2", "√18 = 3√2, and 3√2 + √2 = 4√2."]
    ],
    "Standard form": [
      () => { const k = ri(3, 6), a = pick([2.5, 3.6, 7.2, 4.8]), n = Math.round(a * Math.pow(10, k)); return ["m", "Write " + n.toLocaleString("en-GB") + " in standard form.", a + " × 10<sup>" + k + "</sup>", a * 10 + " × 10<sup>" + (k - 1) + "</sup>", a + " × 10<sup>" + (k + 1) + "</sup>", a / 10 + " × 10<sup>" + (k + 1) + "</sup>", "A must be at least 1 and less than 10."]; },
      () => { const a = ri(2, 4), b = ri(2, 4); return ["n", "Work out (" + a + " × 10<sup>4</sup>) × (" + b + " × 10<sup>3</sup>), giving your answer as an ordinary number.", a * b * 1e7, "", "Multiply the numbers (" + a * b + ") and add the powers (7)."]; },
      ["m", "Which number is written in standard form?", "6.2 × 10<sup>5</sup>", "62 × 10<sup>4</sup>", "0.62 × 10<sup>6</sup>", "6.2 × 5<sup>10</sup>", "A is between 1 and 10 and the base is 10."],
      ["n", "0.00045 = 4.5 × 10<sup>n</sup>. Find n.", -4, "", "The point moves 4 places right, so the power is −4."]
    ],
    "Rounding and estimating": [
      () => { const x = pick([3.14159, 7.8654, 12.0472, 0.9876, 5.5555]); return ["n", "Round " + x + " to 2 decimal places.", Number(x.toFixed(2)), "", "Look at the third decimal place to decide whether to round up."]; },
      ["n", "Round 0.004567 to 2 significant figures.", 0.0046, "", "The first significant figure is 4. The next digit 5 rounds up: 0.0046."],
      ["n", "Estimate 19.8 × 3.1 by rounding each number to 1 significant figure.", 60, "", "20 × 3 = 60."],
      ["m", "Round 0.0452 to 1 significant figure.", "0.05", "0.04", "0.045", "0.5", "The first significant figure is 4, and the next digit 5 rounds it up to 5."]
    ],
    "Error intervals and bounds": [
      ["m", "x = 6.4 rounded to 1 decimal place. Which is the error interval?", "6.35 ≤ x < 6.45", "6.3 ≤ x < 6.5", "6.35 < x ≤ 6.45", "6.4 ≤ x < 6.5", "Half a unit either side: 6.4 ± 0.05. The upper bound is not included."],
      ["n", "A length is 12 cm to the nearest cm. What is the upper bound?", 12.5, "cm", "Half a unit above: 12 + 0.5."],
      ["n", "A mass is 3.5 kg to the nearest 0.1 kg. What is the lower bound?", 3.45, "kg", "3.5 − 0.05."],
      ["n", "A = 5 correct to 1 significant figure. What is the upper bound?", 5.5, "", "5 ± 0.5."]
    ],
    "Units and conversions": [
      () => { const a = ri(2, 9); return ["n", "Convert " + a + " km to metres.", a * 1000, "m", "1 km = 1000 m."]; },
      ["n", "Convert 2.5 hours to minutes.", 150, "minutes", "2.5 × 60 = 150."],
      ["n", "How many cm² are there in 1 m²?", 10000, "", "100 × 100 = 10 000."],
      ["n", "Convert 72 km/h to m/s.", 20, "m/s", "72 × 1000 ÷ 3600 = 20."]
    ],

    "Algebra language": [
      ["m", "Simplify 3a + 5a − 2a.", "6a", "10a", "6a²", "0", "3 + 5 − 2 = 6 lots of a."],
      ["m", "How many terms are in 4x² − 3x + 7?", "3", "2", "4", "1", "Terms are separated by + or − signs."],
      ["t", "2a × 3b = 6ab", true, "Multiply the numbers (6) and write the letters together."],
      ["m", "Simplify x³ × x⁴.", "x⁷", "x¹²", "2x⁷", "x³⁴", "Add the powers."]
    ],
    "Substitution": [
      () => { const a = ri(2, 6); return ["n", "Work out 3x² when x = " + a + ".", 3 * a * a, "", "Square first: " + a + "² = " + a * a + ", then × 3."]; },
      () => { const a = ri(2, 7), b = ri(1, 5); return ["n", "Work out 2a − b when a = " + a + " and b = −" + b + ".", 2 * a + b, "", "2 × " + a + " − (−" + b + ") = " + (2 * a + b) + "."]; },
      () => { const a = ri(2, 6); return ["n", "Work out x² + 2x when x = −" + a + ".", a * a - 2 * a, "", "(−" + a + ")² = " + a * a + " and 2 × (−" + a + ") = −" + 2 * a + "."]; },
      ["n", "v = u + at. Find v when u = 5, a = 2 and t = 3.", 11, "", "5 + 2 × 3 = 11."]
    ],
    "Expanding and factorising": [
      () => { const a = ri(2, 7), b = ri(2, 9); return ["w", "Expand " + a + "(x + " + b + ").", [a + "x+" + a * b], "Multiply each term in the bracket by " + a + "."]; },
      () => { const a = ri(2, 6), b = ri(2, 6); return ["w", "Expand and simplify " + a + "(x + " + b + ") + " + b + "x.", [(a + b) + "x+" + a * b], "Expand then collect the x terms."]; },
      ["m", "Factorise 6x + 9.", "3(2x + 3)", "6(x + 9)", "3(2x + 9)", "9(x + 1)", "The highest common factor of 6 and 9 is 3."],
      ["m", "Factorise x² + 5x fully.", "x(x + 5)", "x²(1 + 5)", "5(x + x)", "(x + 5)²", "Both terms contain x."]
    ],
    "Double brackets and quadratics": [
      () => { const a = ri(1, 6), b = ri(1, 6); return ["w", "Expand and simplify (x + " + a + ")(x + " + b + ").", ["x2+" + (a + b) + "x+" + a * b], "x² + " + b + "x + " + a + "x + " + a * b + "."]; },
      () => { const a = ri(1, 5), b = a + ri(1, 4); return ["w", "Factorise x² + " + (a + b) + "x + " + a * b + ".", ["(x+" + a + ")(x+" + b + ")", "(x+" + b + ")(x+" + a + ")"], "Find two numbers that multiply to " + a * b + " and add to " + (a + b) + "."]; },
      ["m", "Expand (x − 3)².", "x² − 6x + 9", "x² − 9", "x² + 9", "x² − 6x − 9", "(x − 3)(x − 3) = x² − 3x − 3x + 9."],
      ["w", "Factorise x² − 16.", ["(x+4)(x-4)", "(x-4)(x+4)"], "Difference of two squares: a² − b² = (a + b)(a − b)."]
    ],
    "Harder quadratics and triple brackets": [
      ["m", "Factorise 2x² + 7x + 3.", "(2x + 1)(x + 3)", "(2x + 3)(x + 1)", "(2x − 1)(x − 3)", "2(x + 3)(x + 1)", "Check: 2x² + 6x + x + 3."],
      ["m", "Expand (x + 1)(x + 2)(x + 3).", "x³ + 6x² + 11x + 6", "x³ + 6", "x³ + 3x² + 6", "3x + 6", "(x+1)(x+2) = x²+3x+2, then multiply by (x+3)."],
      ["m", "Factorise 6x² − 5x − 6.", "(3x + 2)(2x − 3)", "(3x − 2)(2x + 3)", "(6x + 1)(x − 6)", "(2x + 2)(3x − 3)", "Expand to check: 6x² − 9x + 4x − 6."]
    ],
    "Algebraic fractions": [
      ["m", "Simplify (x² − 9) ÷ (x + 3).", "x − 3", "x + 3", "x − 9", "x² − 3", "x² − 9 = (x + 3)(x − 3), then cancel."],
      ["m", "Simplify (3x + 6) ÷ (x + 2).", "3", "3x", "x + 3", "6", "3x + 6 = 3(x + 2)."],
      ["m", "Write x/2 + x/3 as a single fraction.", "5x/6", "2x/5", "x/5", "x²/6", "Common denominator 6: 3x/6 + 2x/6."]
    ],
    "Solving linear equations": [
      () => { const x = ri(2, 9), a = ri(2, 6), b = ri(1, 9); return ["n", "Solve " + a + "x + " + b + " = " + (a * x + b) + ".", x, "", "Subtract " + b + " then divide by " + a + "."]; },
      () => { const x = ri(5, 12), b = ri(1, 4), a = ri(2, 5); return ["n", "Solve " + a + "(x − " + b + ") = " + a * (x - b) + ".", x, "", "Divide both sides by " + a + ", then add " + b + "."]; },
      () => { const x = ri(2, 7), q = ri(1, 3), p = q + ri(2, 4), c = ri(1, 3), d = (p - q) * x - c; return ["n", "Solve " + p + "x − " + c + " = " + q + "x + " + d + ".", x, "", "Collect the x terms on one side: " + (p - q) + "x = " + (c + d) + "."]; },
      ["n", "Solve x/4 + 3 = 8.", 20, "", "Subtract 3 to get x/4 = 5, then multiply by 4."]
    ],
    "Rearranging formulae": [
      ["m", "Make x the subject of y = 3x + 2.", "x = (y − 2)/3", "x = 3y − 2", "x = (y + 2)/3", "x = y/3 − 2", "Subtract 2 then divide by 3."],
      ["m", "Make r the subject of A = πr².", "r = √(A/π)", "r = A/π", "r = Aπ²", "r = √A − π", "Divide by π then square root."],
      ["m", "v = u + at. Make t the subject.", "t = (v − u)/a", "t = v − u + a", "t = (v + u)/a", "t = a(v − u)", "Subtract u then divide by a."],
      ["m", "Make t the subject of d = st.", "t = d/s", "t = ds", "t = s/d", "t = d − s", "Divide both sides by s."]
    ],
    "Forming equations": [
      ["n", "A rectangle has width x cm and length (x + 3) cm. Its perimeter is 26 cm. Find x.", 5, "", "2(x + x + 3) = 26, so 4x + 6 = 26."],
      ["n", "I think of a number, double it and add 7. The answer is 25. What is the number?", 9, "", "2x + 7 = 25, so x = 9."],
      ["n", "Sam is 4 years older than Ali. Their ages add up to 30. How old is Ali?", 13, "", "a + (a + 4) = 30, so 2a = 26."]
    ],
    "Solving quadratics": [
      () => { const p = ri(1, 5), q = p + ri(1, 5); return ["n", "Solve x² − " + (p + q) + "x + " + p * q + " = 0. Give the smaller solution.", p, "", "(x − " + p + ")(x − " + q + ") = 0."]; },
      ["n", "Solve x² = 49. Give the positive solution.", 7, "", "√49 = 7 (and −7)."],
      ["m", "What are the solutions of x² + 5x = 0?", "x = 0 or x = −5", "x = 5", "x = −5 only", "x = 0 or x = 5", "x(x + 5) = 0."],
      ["t", "A quadratic equation can have two solutions.", true, "For example x² = 9 has x = 3 or x = −3."]
    ],
    "Quadratic formula and completing the square": [
      ["n", "Find the discriminant b² − 4ac for 2x² + 3x − 5 = 0.", 49, "", "9 − 4 × 2 × (−5) = 9 + 40."],
      ["m", "Write x² + 6x + 1 in the form (x + a)² + b.", "(x + 3)² − 8", "(x + 6)² + 1", "(x + 3)² + 1", "(x + 3)² + 8", "(x + 3)² = x² + 6x + 9, so subtract 8."],
      ["n", "Solve x² − 4x − 5 = 0. Give the larger solution.", 5, "", "(x − 5)(x + 1) = 0."],
      ["m", "Solving x² − 2x − 1 = 0 with the formula gives", "x = 1 ± √2", "x = 2 ± √2", "x = 1 ± 2", "x = −1 ± √2", "x = (2 ± √8) ÷ 2."]
    ],
    "Simultaneous equations": [
      () => { const y = ri(1, 5), x = y + ri(1, 5); return ["n", "x + y = " + (x + y) + " and x − y = " + (x - y) + ". Find x.", x, "", "Add the equations: 2x = " + 2 * x + "."]; },
      () => { const y = ri(1, 5), x = ri(1, 6); return ["n", "2x + y = " + (2 * x + y) + " and x + y = " + (x + y) + ". Find y.", y, "", "Subtract to get x = " + x + ", then substitute."]; },
      ["t", "Two parallel lines have no simultaneous solution.", true, "They never meet."]
    ],
    "Linear and quadratic simultaneous": [
      ["m", "Solve y = x² and y = x + 2.", "x = 2 or x = −1", "x = 2 only", "x = 1 or x = −2", "x = 4 or x = −1", "x² = x + 2 → (x − 2)(x + 1) = 0."],
      ["m", "Substituting y = x + 1 into x² + y² = 25 gives", "2x² + 2x − 24 = 0", "x² + x − 25 = 0", "2x² + 1 = 25", "x² + 2x = 24", "x² + (x + 1)² = 25 expands to 2x² + 2x + 1 = 25."],
      ["t", "A straight line can cross a circle at most twice.", true, "It can meet it 0, 1 (tangent) or 2 times."]
    ],
    "Inequalities": [
      ["n", "What is the smallest integer that satisfies x > 3.5?", 4, "", "4 is the first integer above 3.5."],
      ["n", "What is the largest integer that satisfies 2x < 11?", 5, "", "x < 5.5 so the largest integer is 5."],
      ["m", "On a number line, a closed (filled) circle means", "the value is included (≤ or ≥)", "the value is not included", "the line is dotted", "the answer is negative", "Open circles are used for < and >."],
      ["m", "Solve 3x + 2 < 14.", "x < 4", "x > 4", "x < 12", "x < 16/3", "Subtract 2: 3x < 12, then divide by 3."]
    ],
    "Quadratic inequalities and regions": [
      ["m", "Solve x² < 9.", "−3 < x < 3", "x < 3", "x < −3 or x > 3", "x > 3", "Sketch the curve: it is below zero between the roots."],
      ["m", "Solve x² − 5x + 6 > 0.", "x < 2 or x > 3", "2 < x < 3", "x > 3", "x < 2", "The curve is above the axis outside the roots 2 and 3."],
      ["t", "To show y > 2x + 1 on a graph, the boundary line is drawn dotted.", true, "A strict inequality does not include the line."]
    ],
    "Sequences": [
      () => { const a = ri(1, 9), d = ri(2, 7); return ["n", "What is the next term? " + a + ", " + (a + d) + ", " + (a + 2 * d) + ", ...", a + 3 * d, "", "Add " + d + " each time."]; },
      ["n", "1, 1, 2, 3, 5, 8, ... What is the next term? (each term is the sum of the previous two)", 13, "", "5 + 8 = 13."],
      () => { const a = ri(1, 4), r = ri(2, 4); return ["n", "A geometric sequence: " + a + ", " + a * r + ", " + a * r * r + ", ... What is the next term?", a * r * r * r, "", "Multiply by " + r + " each time."]; },
      ["m", "In a quadratic sequence, which is constant?", "the second difference", "the first difference", "the term-to-term ratio", "the nth term", "First differences change by a fixed amount."]
    ],
    "nth term of linear sequences": [
      () => { const d = ri(2, 6), a = ri(-3, 5), b = (n) => d * n + a; const form = d + "n" + (a === 0 ? "" : a > 0 ? "+" + a : "-" + -a); return ["w", "Find the nth term of " + b(1) + ", " + b(2) + ", " + b(3) + ", " + b(4) + ", ... (e.g. 2n+1)", [form], "The common difference is " + d + ", so the nth term starts " + d + "n."]; },
      () => { const d = ri(2, 6), a = ri(1, 5), k = ri(6, 15); return ["n", "The nth term is " + d + "n + " + a + ". What is the " + k + "th term?", d * k + a, "", "Substitute n = " + k + "."]; },
      ["m", "Is 50 a term in the sequence with nth term 4n + 3?", "No, because 4n + 3 = 50 gives n = 11.75", "Yes, it is the 12th term", "Yes, it is the 11th term", "No, because 50 is even", "n must be a whole number."]
    ],
    "nth term of quadratic sequences": [
      ["n", "Find the second difference of 3, 8, 15, 24, ...", 2, "", "First differences 5, 7, 9; second differences 2."],
      ["m", "Find the nth term of 2, 7, 14, 23, ...", "n² + 2n − 1", "n² + 1", "2n² − n + 1", "n² + 2n + 1", "Second difference 2 gives n². Subtract n² to leave 1, 3, 5, 7 = 2n − 1."],
      ["n", "The nth term is n² + 3. What is the 10th term?", 103, "", "100 + 3."]
    ],
    "Straight-line graphs": [
      () => { const mm = ri(-3, 4) || 1, c = ri(-4, 5), k = ri(1, 4); return ["n", "A line passes through (0, " + c + ") and (" + k + ", " + (c + mm * k) + "). What is its gradient?", mm, "", "Change in y ÷ change in x = " + mm * k + " ÷ " + k + "."]; },
      ["m", "What is the gradient of y = 4 − 2x?", "−2", "2", "4", "−4", "Rewrite as y = −2x + 4."],
      ["m", "Which line is parallel to y = 3x + 1?", "y = 3x − 5", "y = −3x + 1", "y = x/3 + 1", "y = 3 − x", "Parallel lines have the same gradient."],
      ["n", "What is the gradient of a line perpendicular to y = 2x + 3?", -0.5, "", "Negative reciprocal of 2 is −1/2."]
    ],
    "Quadratic, cubic and reciprocal graphs": [
      ["m", "What is the shape of y = x³?", "an S-shaped curve through the origin", "a U-shaped curve", "a straight line", "two separate curves", "Cubic graphs have a characteristic S shape."],
      ["m", "The graph of y = 1/x looks like", "two separate curves (a hyperbola)", "a parabola", "a straight line", "a circle", "It has asymptotes at the axes."],
      ["n", "What is the y-coordinate of the turning point of y = (x − 2)² + 3?", 3, "", "The vertex is at (2, 3)."],
      ["t", "The graph of y = −x² opens upwards.", false, "A negative x² coefficient makes it open downwards."]
    ],
    "Exponential and trig graphs and transformations": [
      ["n", "Work out y = 2<sup>x</sup> when x = 3.", 8, "", "2 × 2 × 2."],
      ["m", "What is the maximum value of y = sin x?", "1", "0", "90", "−1", "Sine oscillates between −1 and 1."],
      ["m", "y = f(x) + 3 transforms y = f(x) by", "a translation 3 units up", "a translation 3 units right", "a stretch of scale factor 3", "a reflection", "Adding outside the bracket moves the graph vertically."],
      ["m", "y = f(x − 2) transforms y = f(x) by", "a translation 2 units right", "a translation 2 units left", "a translation 2 units up", "a translation 2 units down", "Changes inside the bracket act in the opposite way to what you expect."],
      ["m", "y = −f(x) is", "a reflection in the x-axis", "a reflection in the y-axis", "a rotation", "a translation", "All the y-values change sign."]
    ],
    "Real-life graphs": [
      ["m", "On a distance–time graph, a horizontal section shows", "the object is stationary", "constant speed", "acceleration", "going backwards", "Distance is not changing."],
      ["n", "A taxi charges £3 plus £2 per km. How much is a 7 km journey? (£)", 17, "£", "3 + 2 × 7 = 17."],
      ["n", "A car travels 60 km in 1.5 hours. What is its average speed in km/h?", 40, "km/h", "60 ÷ 1.5."],
      ["m", "The gradient of a velocity–time graph is", "acceleration", "distance", "speed", "time", "Gradient = change in velocity ÷ time."]
    ],
    "Functions": [
      () => { const a = ri(2, 6); return ["n", "f(x) = 2x + 3. Work out f(" + a + ").", 2 * a + 3, "", "Replace x with " + a + "."]; },
      ["n", "f(x) = x² and g(x) = x + 1. Work out fg(2).", 9, "", "g(2) = 3, then f(3) = 9."],
      ["n", "f(x) = 3x − 1. Work out f⁻¹(8).", 3, "", "Solve 3x − 1 = 8."],
      ["n", "f(x) = x² and g(x) = x + 1. Work out gf(2).", 5, "", "f(2) = 4, then g(4) = 5."]
    ],
    "Iteration": [
      ["n", "xₙ₊₁ = 2xₙ − 1 and x₀ = 3. Find x₂.", 9, "", "x₁ = 5, x₂ = 9."],
      ["m", "Iteration is used to", "find approximate solutions that cannot be solved exactly", "factorise quadratics", "draw graphs", "work out angles", "Repeat the formula until the values settle."],
      ["n", "xₙ₊₁ = √(xₙ + 2) and x₀ = 2. Find x₁.", 2, "", "√4 = 2."]
    ],
    "Algebraic proof": [
      ["m", "Which expression is always even for integer n?", "2n", "2n + 1", "n + 2", "n²", "2n is a multiple of 2."],
      ["m", "The sum of two consecutive integers is always", "odd", "even", "a multiple of 3", "prime", "n + (n + 1) = 2n + 1."],
      ["m", "The product of two odd numbers is", "always odd", "always even", "sometimes even", "always prime", "(2a + 1)(2b + 1) = 4ab + 2a + 2b + 1, which is odd."],
      ["t", "Checking that something works for three examples proves it is always true.", false, "A proof must work for every case."]
    ],
    "Equation of a circle": [
      ["n", "What is the radius of the circle x² + y² = 49?", 7, "", "r² = 49."],
      ["m", "What is the centre of (x − 2)² + (y + 3)² = 16?", "(2, −3)", "(−2, 3)", "(2, 3)", "(4, −3)", "Opposite signs to those in the brackets."],
      ["n", "Find the gradient of the tangent to x² + y² = 25 at (3, 4).", -0.75, "", "Radius gradient = 4/3, tangent = −3/4."]
    ],

    "Simplifying and sharing ratios": [
      () => { const a = ri(1, 4), b = a + ri(1, 4), k = ri(3, 9); return ["n", "Share £" + (a + b) * k + " in the ratio " + a + " : " + b + ". How much is the larger share? (£)", b * k, "£", "One part is " + k + ", so " + b + " parts is " + b * k + "."]; },
      ["w", "Simplify the ratio 24 : 36.", ["2:3"], "Divide both by the HCF, 12."],
      () => { const k = ri(3, 8); return ["n", "The ratio of boys to girls is 3 : 5. There are " + 3 * k + " boys. How many girls?", 5 * k, "", "One part = " + k + "."]; },
      ["m", "In the ratio 1 : 4, what fraction is the smaller part?", "1/5", "1/4", "4/5", "1/3", "There are 5 parts altogether."]
    ],
    "Best buys and proportion": [
      ["m", "Which is the better buy: 500 g for £1.20 or 750 g for £1.65?", "750 g for £1.65", "500 g for £1.20", "They are the same", "Cannot tell", "Per 100 g: 24p and 22p."],
      ["n", "5 pens cost £3.50. How much do 8 pens cost? (£)", 5.6, "£", "One pen costs 70p."],
      ["n", "A recipe for 4 people uses 300 g of flour. How much flour for 10 people?", 750, "g", "300 ÷ 4 × 10."]
    ],
    "Compound measures": [
      () => { const t = ri(2, 6), s = ri(20, 80); return ["n", "A car travels " + s * t + " km in " + t + " hours. What is its average speed?", s, "km/h", "Speed = distance ÷ time."]; },
      () => { const v = ri(2, 6), d = ri(2, 9); return ["n", "A block has mass " + v * d * 10 + " g and volume " + v * 10 + " cm³. What is its density?", d, "g/cm³", "Density = mass ÷ volume."]; },
      ["n", "A force of 200 N acts on an area of 0.5 m². What is the pressure?", 400, "N/m²", "Pressure = force ÷ area."],
      ["n", "A car travels at 15 m/s for 2 minutes. How far does it go?", 1800, "m", "2 minutes = 120 s; 15 × 120."]
    ],
    "Scales and maps": [
      ["n", "A map has a scale of 1 : 50 000. A distance on the map is 4 cm. What is the real distance in km?", 2, "km", "4 × 50 000 = 200 000 cm = 2 km."],
      ["n", "A model uses the scale 1 : 200. The model is 5 cm long. How long is the real thing in metres?", 10, "m", "5 × 200 = 1000 cm."],
      ["n", "On a map 1 cm represents 5 km. How far is 12 cm?", 60, "km", "12 × 5."]
    ],
    "Percentages of amounts": [
      () => { const p = pick([10, 15, 20, 25, 35]), a = pick([40, 60, 80, 120, 200]); return ["n", "Work out " + p + "% of " + a + ".", p * a / 100, "", p + " ÷ 100 × " + a + "."]; },
      ["n", "Increase £80 by 15%. (£)", 92, "£", "80 × 1.15."],
      ["n", "Decrease 250 by 12%.", 220, "", "250 × 0.88."],
      ["n", "What percentage of 160 is 40?", 25, "%", "40 ÷ 160 × 100."]
    ],
    "Reverse percentages": [
      ["n", "After a 20% increase, a price is £60. What was the original price? (£)", 50, "£", "60 ÷ 1.2."],
      ["n", "A coat costs £45 in a 25% off sale. What was the original price? (£)", 60, "£", "45 ÷ 0.75."],
      ["n", "A price including 20% VAT is £144. What is the price without VAT? (£)", 120, "£", "144 ÷ 1.2."]
    ],
    "Interest, growth and decay": [
      ["n", "Work out the simple interest on £500 at 4% a year for 3 years. (£)", 60, "£", "500 × 0.04 × 3."],
      ["n", "£1000 earns 5% compound interest for 2 years. What is the total? (£)", 1102.5, "£", "1000 × 1.05²."],
      ["n", "A car worth £12 000 loses 10% of its value each year. What is it worth after 2 years? (£)", 9720, "£", "12 000 × 0.9²."],
      ["n", "A population of 2000 grows 3% a year. How many after 1 year?", 2060, "", "2000 × 1.03."]
    ],
    "Direct and inverse proportion": [
      ["n", "y is directly proportional to x. y = 12 when x = 3. Find y when x = 5.", 20, "", "y = 4x."],
      ["n", "4 workers take 6 days to finish a job. How many days would 3 workers take?", 8, "days", "4 × 6 = 24 worker-days; 24 ÷ 3."],
      ["m", "Which equation shows y is inversely proportional to x?", "y = k/x", "y = kx", "y = x + k", "y = kx²", "Inverse proportion: as x goes up, y goes down."],
      ["n", "y is proportional to x². y = 20 when x = 2. Find y when x = 3.", 45, "", "y = 5x²."]
    ],
    "Similar shapes: length, area and volume": [
      ["n", "Two similar shapes have a length scale factor of 3. What is the area scale factor?", 9, "", "Area scale factor = (length scale factor)²."],
      ["n", "A solid has volume 5 cm³. It is enlarged with scale factor 2. What is the new volume?", 40, "cm³", "Volume scale factor = 2³ = 8."],
      ["n", "Two similar shapes have areas in the ratio 4 : 9. What is the ratio of lengths as a fraction? (decimal ok)", 2 / 3, "", "Square root of 4/9."]
    ],
    "Rates of change": [
      ["m", "The gradient of a tangent to a curve gives", "the instantaneous rate of change", "the average speed over the whole journey", "the area under the curve", "the intercept", "The tangent touches the curve at one point."],
      ["n", "An object moves 20 m in 4 s. What is its average speed?", 5, "m/s", "20 ÷ 4."],
      ["n", "A tangent passes through (2, 3) and (6, 11). What is its gradient?", 2, "", "(11 − 3) ÷ (6 − 2)."]
    ],
    "One quantity as a fraction of another": [
      ["n", "Write £15 as a percentage of £60.", 25, "%", "15 ÷ 60."],
      ["n", "Write 12 out of 40 as a decimal.", 0.3, "", "12 ÷ 40."],
      ["m", "Write 18 : 30 as a fraction in its simplest form.", "3/5", "18/30", "5/3", "9/15", "Divide both by 6."]
    ],

    "Angle facts": [
      () => { const a = ri(40, 140); return ["n", "Angles on a straight line: one is " + a + "°. What is the other?", 180 - a, "°", "Angles on a straight line add to 180°."]; },
      ["n", "Angles around a point are 90°, 120° and x°. Find x.", 150, "°", "360 − 90 − 120."],
      ["n", "Two angles of a triangle are 50° and 60°. What is the third?", 70, "°", "180 − 110."],
      ["m", "Vertically opposite angles are", "equal", "supplementary", "complementary", "always 90°", "They are opposite each other where two lines cross."]
    ],
    "Angles in parallel lines": [
      ["m", "Alternate angles are", "equal (Z shape)", "add to 180°", "always 90°", "different", "They sit on opposite sides of the transversal between the parallel lines."],
      ["n", "Co-interior angles add to 180°. One is 70°. Find the other.", 110, "°", "180 − 70."],
      ["n", "A corresponding angle to 65° is", 65, "°", "Corresponding angles are equal (F shape)."]
    ],
    "Angles in polygons": [
      ["n", "What is the sum of the interior angles of a hexagon?", 720, "°", "(6 − 2) × 180."],
      ["n", "What is one exterior angle of a regular pentagon?", 72, "°", "360 ÷ 5."],
      ["n", "What is one interior angle of a regular octagon?", 135, "°", "Exterior is 45°, interior 180 − 45."],
      ["n", "A regular polygon has exterior angles of 30°. How many sides?", 12, "", "360 ÷ 30."]
    ],
    "Shape properties": [
      ["m", "Which quadrilateral has exactly one pair of parallel sides?", "trapezium", "parallelogram", "rhombus", "square", "That is the definition of a trapezium."],
      ["m", "A quadrilateral has four equal sides and diagonals that cross at right angles but unequal angles. What is it?", "rhombus", "square", "kite", "rectangle", "A square would also have equal angles."],
      ["t", "A square is a special type of rectangle.", true, "It has four right angles and opposite sides parallel and equal."]
    ],
    "Constructions and loci": [
      ["m", "The locus of points a fixed distance from a point is", "a circle", "a straight line", "a square", "a parabola", "All points at distance r form a circle."],
      ["m", "The perpendicular bisector of AB is the set of points", "equidistant from A and B", "closer to A", "on the line AB", "that are 90° from A", "It also cuts AB at its midpoint at right angles."],
      ["m", "The locus of points equidistant from two intersecting lines is", "the angle bisector", "a circle", "the perpendicular bisector", "a parallel line", "It splits the angle in half."]
    ],
    "Congruence": [
      ["m", "Which is NOT a condition for congruent triangles?", "AAA", "SSS", "SAS", "RHS", "Equal angles only give similar triangles."],
      ["t", "Two triangles with the same three angles must be congruent.", false, "They could be different sizes, so they are only similar."],
      ["m", "SAS means", "two sides and the included angle are equal", "three sides are equal", "three angles are equal", "two angles and a side are equal", "The angle must be between the two sides."]
    ],
    "Similar shapes": [
      ["n", "Two similar shapes: a length of 6 cm corresponds to 15 cm. What is the scale factor?", 2.5, "", "15 ÷ 6."],
      ["n", "Two similar triangles: sides 4 and 10 correspond. A side of 6 in the first corresponds to what length?", 15, "", "Scale factor 2.5."],
      ["t", "All circles are similar.", true, "They have the same shape; only the size differs."]
    ],
    "Transformations": [
      ["m", "Reflect (2, 5) in the line y = x.", "(5, 2)", "(−2, 5)", "(2, −5)", "(−5, −2)", "x and y swap."],
      ["m", "Translate (1, 4) by the vector (3, −2).", "(4, 2)", "(−2, 6)", "(4, 6)", "(2, 2)", "Add 3 to x and subtract 2 from y."],
      ["m", "Rotate (2, 1) by 90° clockwise about the origin.", "(1, −2)", "(−1, 2)", "(−2, −1)", "(−1, −2)", "(x, y) becomes (y, −x)."],
      ["n", "A length of 4 cm is enlarged with scale factor 3. What is the new length?", 12, "cm", "4 × 3."]
    ],
    "Area and perimeter": [
      () => { const l = ri(4, 12), w = ri(2, 9); return ["n", "A rectangle is " + l + " cm by " + w + " cm. What is its area?", l * w, "cm²", "Area = length × width."]; },
      () => { const b = ri(3, 12) * 2, h = ri(3, 9); return ["n", "A triangle has base " + b + " cm and height " + h + " cm. Find its area.", b * h / 2, "cm²", "½ × base × height."]; },
      () => { const a = ri(3, 8), b = a + ri(2, 6), h = ri(2, 8); return ["n", "A trapezium has parallel sides " + a + " cm and " + b + " cm and height " + h + " cm. Find its area.", (a + b) * h / 2, "cm²", "½(a + b)h."]; },
      ["n", "A square has perimeter 36 cm. What is its area?", 81, "cm²", "Side = 9 cm."]
    ],
    "Circles, arcs and sectors": [
      ["n", "Find the circumference of a circle with diameter 10 cm (to 1 d.p.).", 31.4, "cm", "π × 10 = 31.4159…", 0.06],
      ["n", "Find the area of a circle with radius 3 cm (to 1 d.p.).", 28.3, "cm²", "π × 9 = 28.27…", 0.06],
      ["n", "Find the arc length of a 90° sector of radius 4 cm (to 2 d.p.).", 6.28, "cm", "¼ of 2π × 4.", 0.02],
      ["n", "Find the area of a 60° sector of radius 6 cm (to 1 d.p.).", 18.8, "cm²", "⅙ of π × 36.", 0.06]
    ],
    "Volume and surface area": [
      () => { const l = ri(2, 9), w = ri(2, 6), h = ri(2, 8); return ["n", "A cuboid is " + l + " cm by " + w + " cm by " + h + " cm. What is its volume?", l * w * h, "cm³", "Length × width × height."]; },
      ["n", "Find the volume of a cylinder with radius 2 cm and height 5 cm (1 d.p.).", 62.8, "cm³", "πr²h = π × 4 × 5.", 0.06],
      ["n", "Find the volume of a sphere of radius 3 cm (1 d.p.).", 113.1, "cm³", "(4/3)πr³.", 0.06],
      ["n", "Find the volume of a cone with radius 3 cm and height 4 cm (1 d.p.).", 37.7, "cm³", "⅓πr²h.", 0.06]
    ],
    "Plans and elevations": [
      ["m", "The view of a solid from directly above is called the", "plan", "front elevation", "side elevation", "net", "A plan is the bird's-eye view."],
      ["m", "The view of a solid from the front is called the", "front elevation", "plan", "net", "section", "Elevations are side-on views."],
      ["n", "A cuboid is built from unit cubes, 2 by 3 by 2. How many cubes?", 12, "", "2 × 3 × 2."]
    ],
    "Bearings": [
      ["n", "The bearing of B from A is 070°. What is the bearing of A from B?", 250, "°", "Add 180°."],
      ["n", "The bearing of B from A is 120°. What is the bearing of A from B?", 300, "°", "120 + 180 = 300."],
      ["m", "Bearings are measured", "clockwise from north", "anticlockwise from north", "clockwise from east", "from south", "Always use three figures, e.g. 045°."]
    ],
    "Pythagoras' theorem": [
      () => { const k = ri(1, 4), t = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17]]); return ["n", "A right-angled triangle has short sides " + t[0] * k + " cm and " + t[1] * k + " cm. Find the hypotenuse.", t[2] * k, "cm", "a² + b² = c²."]; },
      () => { const k = ri(1, 4), t = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17]]); return ["n", "A right-angled triangle has hypotenuse " + t[2] * k + " cm and one side " + t[0] * k + " cm. Find the other side.", t[1] * k, "cm", "Subtract: c² − a²."]; },
      ["n", "A 6.5 m ladder reaches 6 m up a wall. How far is its base from the wall?", 2.5, "m", "6.5² − 6² = 6.25."]
    ],
    "SOH CAH TOA": [
      ["n", "A right-angled triangle has hypotenuse 10 cm and an angle of 30°. Find the opposite side.", 5, "cm", "O = H × sin 30°."],
      ["n", "tan θ = 1. Find θ.", 45, "°", "tan⁻¹(1)."],
      ["n", "sin θ = 0.5. Find θ.", 30, "°", "sin⁻¹(0.5)."],
      ["n", "The adjacent side is 6 and the hypotenuse is 10. Find cos θ.", 0.6, "", "A ÷ H."]
    ],
    "Exact trig values": [
      ["n", "What is sin 30°?", 0.5, "", "sin 30° = 1/2."],
      ["n", "What is cos 60°?", 0.5, "", "cos 60° = 1/2."],
      ["n", "What is tan 45°?", 1, "", "tan 45° = 1."],
      ["n", "What is sin 60° as a decimal (3 d.p.)?", 0.866, "", "sin 60° = √3/2.", 0.001]
    ],
    "Sine rule, cosine rule and area": [
      ["m", "You know two angles and one side. Which rule finds another side?", "the sine rule", "the cosine rule", "Pythagoras", "the area formula", "The sine rule links sides with the opposite angles."],
      ["m", "You know two sides and the angle between them. Which rule finds the third side?", "the cosine rule", "the sine rule", "SOH CAH TOA", "Pythagoras", "a² = b² + c² − 2bc cos A."],
      ["n", "Find the area of a triangle with sides 6 cm and 8 cm and included angle 30°.", 12, "cm²", "½ × 6 × 8 × sin 30°."]
    ],
    "3D Pythagoras and trigonometry": [
      ["n", "Find the space diagonal of a cuboid 3 cm by 4 cm by 12 cm.", 13, "cm", "√(9 + 16 + 144)."],
      ["n", "Find the space diagonal of a cuboid 2 cm by 3 cm by 6 cm.", 7, "cm", "√(4 + 9 + 36)."],
      ["m", "To find the angle between a diagonal and the base you should first", "find the base diagonal with Pythagoras", "use the sine rule", "double the height", "subtract 90°", "Then use trigonometry in the vertical right-angled triangle."]
    ],
    "Circle theorems": [
      ["n", "The angle at the centre is 100°. What is the angle at the circumference on the same arc?", 50, "°", "The angle at the centre is twice the angle at the circumference."],
      ["n", "What is the angle in a semicircle?", 90, "°", "The angle in a semicircle is always a right angle."],
      ["n", "Opposite angles of a cyclic quadrilateral add to 180°. One angle is 80°. Find its opposite angle.", 100, "°", "180 − 80."],
      ["m", "A tangent meets the radius at", "90°", "45°", "180°", "60°", "The tangent is perpendicular to the radius."],
      ["t", "Angles in the same segment are equal.", true, "That is the same-segment theorem."]
    ],
    "Vectors": [
      ["m", "a = (2, 3) and b = (1, −4). Work out a + b.", "(3, −1)", "(1, 7)", "(3, 7)", "(−1, 1)", "Add the components."],
      ["n", "Find the magnitude of the vector (3, 4).", 5, "", "√(9 + 16)."],
      ["m", "In terms of position vectors a and b, the vector AB is", "b − a", "a − b", "a + b", "ab", "Go from A back to the origin then to B."]
    ],

    "Probability basics": [
      ["n", "P(rain) = 0.35. What is P(no rain)?", 0.65, "", "1 − 0.35."],
      ["n", "A bag has 3 red, 5 blue and 2 green counters. What is P(blue)?", 0.5, "", "5 out of 10."],
      ["n", "What is the probability of rolling a multiple of 3 on a fair dice? (decimal or fraction)", 1 / 3, "", "3 or 6 out of 6."],
      ["n", "The probabilities of all possible outcomes add up to what?", 1, "", "One of the outcomes must happen."]
    ],
    "Relative frequency": [
      ["n", "A spinner is spun 200 times and lands on red 50 times. What is the relative frequency of red?", 0.25, "", "50 ÷ 200."],
      ["n", "A fair coin is tossed 80 times. How many heads do you expect?", 40, "", "80 × 0.5."],
      ["n", "The probability of a 6 is 0.2. How many 6s do you expect in 150 rolls?", 30, "", "0.2 × 150."]
    ],
    "Sample spaces and two-way tables": [
      ["n", "How many outcomes are there when two dice are rolled?", 36, "", "6 × 6."],
      ["n", "Two fair dice are rolled. What is P(sum = 7)? (decimal to 3 d.p.)", 0.167, "", "6 of the 36 outcomes.", 0.001],
      ["n", "Two fair coins are tossed. What is P(two heads)?", 0.25, "", "1 out of 4."]
    ],
    "Venn diagrams": [
      ["n", "30 students: 18 study French, 12 study Spanish and 5 study both. How many study neither?", 5, "", "18 + 12 − 5 = 25 study at least one, so 30 − 25."],
      ["n", "n(A) = 18, n(B) = 12 and n(A ∩ B) = 5. What is n(A ∪ B)?", 25, "", "18 + 12 − 5."],
      ["m", "A′ means", "not in A", "A and B", "A or B", "in A only", "The complement of A."]
    ],
    "Tree diagrams": [
      ["n", "P(red) = 0.3 on each pick, with replacement. What is P(red twice)?", 0.09, "", "0.3 × 0.3."],
      ["n", "A bag has 4 red and 6 blue counters. Two are picked without replacement. P(both red)? (3 d.p.)", 0.133, "", "4/10 × 3/9 = 12/90.", 0.001],
      ["n", "A fair coin is flipped twice. What is P(at least one head)?", 0.75, "", "1 − P(two tails) = 1 − 0.25."]
    ],
    "Conditional probability": [
      ["n", "P(A and B) = 0.2 and P(B) = 0.5. Find P(A given B).", 0.4, "", "0.2 ÷ 0.5."],
      ["n", "A bag has 10 sweets, 4 red. Two are taken. Given the first is red, what is P(second red)? (3 d.p.)", 0.333, "", "3 red left out of 9.", 0.001],
      ["t", "If A and B are independent then P(A given B) = P(A).", true, "B has no effect on A."]
    ],

    "Sampling": [
      ["m", "Which is a random sample?", "choosing names from a hat", "asking your friends", "surveying people outside a gym", "asking volunteers", "Every member of the population has an equal chance."],
      ["n", "A school has 200 students and 60 are in Year 11. A stratified sample of 20 is taken. How many are from Year 11?", 6, "", "60/200 × 20."],
      ["t", "A bigger sample is usually more reliable.", true, "It is more representative."]
    ],
    "Charts and diagrams": [
      ["n", "A pie chart shows 25% in one sector. What is its angle?", 90, "°", "25% of 360."],
      ["n", "12 out of 60 people chose tea. What angle is the tea sector on a pie chart?", 72, "°", "12/60 × 360."],
      ["m", "Which chart best shows the relationship between two variables?", "scatter graph", "pie chart", "bar chart", "pictogram", "Each point is a pair of values."]
    ],
    "Averages and range": [
      () => { const a = [ri(2, 9), ri(2, 9), ri(2, 9), ri(2, 9), ri(2, 9)], s = a.reduce((x, y) => x + y, 0); return ["n", "Find the mean of " + a.join(", ") + " (to 1 d.p.).", Math.round(s / 5 * 10) / 10, "", "Total ÷ 5.", 0.06]; },
      ["n", "Find the median of 3, 7, 9, 12, 15.", 9, "", "The middle value."],
      ["n", "The mean of 4 numbers is 8. What is their total?", 32, "", "4 × 8."],
      ["n", "Find the mode of 2, 3, 3, 4, 5, 5, 5.", 5, "", "5 appears most often."]
    ],
    "Averages from frequency tables": [
      ["n", "Values 1, 2, 3 have frequencies 2, 3, 5. Find the mean.", 2.3, "", "(2 + 6 + 15) ÷ 10."],
      ["n", "Find the midpoint of the class 10 ≤ x < 20.", 15, "", "(10 + 20) ÷ 2."],
      ["n", "There are 41 values. In which position is the median?", 21, "", "(41 + 1) ÷ 2."]
    ],
    "Cumulative frequency and box plots": [
      ["n", "The upper quartile is 38 and the lower quartile is 22. What is the interquartile range?", 16, "", "38 − 22."],
      ["m", "On a cumulative frequency graph the median is found at", "half of the total frequency", "the highest point", "the lowest point", "the mean", "Read across at n/2 and down."],
      ["n", "A box plot has minimum 10 and maximum 70. What is the range?", 60, "", "70 − 10."]
    ],
    "Histograms": [
      ["n", "A class has frequency 30 and width 5. What is the frequency density?", 6, "", "30 ÷ 5."],
      ["n", "A bar has frequency density 4 and class width 10. What is the frequency?", 40, "", "Area = frequency."],
      ["m", "The vertical axis of a histogram shows", "frequency density", "frequency", "class width", "cumulative frequency", "Bars have different widths."]
    ],
    "Scatter graphs": [
      ["m", "As one variable increases the other decreases. This is", "negative correlation", "positive correlation", "no correlation", "causation", "The line slopes downwards."],
      ["t", "Correlation proves that one thing causes another.", false, "Correlation does not prove causation."],
      ["m", "A line of best fit can be used to", "estimate values within the range", "predict values far outside the data reliably", "prove causation", "find the mode", "Interpolation is reliable; extrapolation less so."]
    ],
    "Comparing and describing data": [
      ["m", "To compare two data sets you should compare", "an average and a measure of spread", "only the means", "only the ranges", "the sample sizes", "Averages show typical value, spread shows consistency."],
      ["m", "A larger interquartile range means the data are", "more spread out", "more consistent", "all the same", "negative", "IQR measures the spread of the middle half."],
      ["t", "The mean is affected by outliers.", true, "Extreme values pull it up or down."]
    ]
  });
})();
