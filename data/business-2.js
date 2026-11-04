(function () {
var G = GAME, ri = G.ri, pick = G.pick;
G.topic("Business calculations", "🧮", "Paper 2", [
{ t: "Revenue, costs and profit calculations", icon: "➗",
  c: ["Revenue = price × quantity sold. Total costs = fixed costs + variable costs. Profit = revenue − total costs.", "Fixed costs (rent, salaries) do not change with output. Variable costs (materials) rise with output.", "Average cost per unit = total cost ÷ output.", "Always show your working and include units (£)."],
  k: "Profit = Revenue − Total costs.",
  q: [function () { var p = ri(2, 20), q = ri(50, 400); return ["n", "A business sells " + q + " items at £" + p + " each. Find its revenue (£).", p * q, "£", "Revenue = price × quantity."]; },
      function () { var f = ri(10, 50) * 100, v = ri(10, 50) * 100; return ["n", "Fixed costs are £" + f + " and variable costs are £" + v + ". Total costs (£)?", f + v, "£", "Add fixed and variable costs."]; },
      function () { var r = ri(20, 90) * 100, c = ri(10, 80) * 100; return ["n", "Revenue is £" + r + " and total costs £" + c + ". Profit or loss (£, negative if loss)?", r - c, "£", "Revenue minus costs."]; },
      ["m", "Rent is an example of a", "fixed cost", "variable cost", "revenue", "profit", "It stays the same whatever the output."]] },
{ t: "Break-even", icon: "⚖️",
  c: ["Break-even output is where total revenue equals total costs, so profit is zero.", "Break-even = fixed costs ÷ (selling price − variable cost per unit). The denominator is the contribution per unit.", "On a break-even chart, the revenue and total cost lines cross at break-even. The gap between them above that is profit; below is loss.", "Margin of safety = actual output − break-even output."],
  k: "Break-even = Fixed costs ÷ contribution per unit.",
  q: [function () { var p = ri(5, 15), v = ri(1, 4), f = ri(2, 10) * 100, cont = p - v; f = cont * ri(20, 80); return ["n", "Fixed costs £" + f + ", price £" + p + ", variable cost £" + v + " per unit. Break-even output (units)?", f / cont, "units", "Fixed costs ÷ (price − variable cost)."]; },
      function () { var be = ri(10, 80), a = be + ri(5, 40); return ["n", "Break-even is " + be + " units and actual sales are " + a + " units. Margin of safety (units)?", a - be, "units", "Actual − break-even."]; },
      ["m", "At the break-even point the business makes", "no profit and no loss", "maximum profit", "a loss", "a profit", "Revenue equals costs."],
      ["m", "A limitation of break-even analysis is that it", "assumes all output is sold at one price", "includes tax", "predicts exactly", "ignores costs", "Real life changes."]] },
{ t: "Profit margins and ROCE", icon: "📈",
  c: ["Gross profit = revenue − cost of sales. Net profit = gross profit − expenses.", "Gross profit margin (%) = gross profit ÷ revenue × 100. Net profit margin (%) = net profit ÷ revenue × 100.", "Average rate of return (ARR) = average annual profit ÷ cost of investment × 100.", "Higher margins mean more profit per £ of sales; compare over time and against competitors."],
  k: "Margin = profit ÷ revenue × 100.",
  q: [function () { var r = ri(2, 10) * 1000, gp = ri(1, 9) * r / 10; return ["n", "Revenue £" + r + ", gross profit £" + gp + ". Gross profit margin (%)?", Math.round(gp / r * 100), "%", "gross profit ÷ revenue × 100."]; },
      function () { var gp = ri(20, 80) * 100, e = ri(5, 15) * 100; return ["n", "Gross profit £" + gp + " and expenses £" + e + ". Net profit (£)?", gp - e, "£", "Gross profit − expenses."]; },
      ["m", "Net profit is", "gross profit minus expenses", "revenue plus costs", "cash in the bank", "price minus cost", "Overheads come off gross profit."],
      ["t", "A higher gross profit margin is usually better.", true, "More of each £ of sales is kept."]] },
{ t: "Cash flow forecasts", icon: "💷",
  c: ["Cash flow is the movement of money in and out of the bank. Profit is not the same as cash.", "A cash flow forecast shows predicted cash inflows, outflows, net cash flow and opening and closing balances.", "Closing balance = opening balance + net cash flow. The closing balance becomes next month's opening balance.", "Cash flow problems: late payments, overstocking. Solutions: overdraft, chasing debtors, delaying payments."],
  k: "Opening + inflow − outflow = closing.",
  q: [function () { var o = ri(1, 9) * 100, i = ri(5, 20) * 100, ot = ri(5, 20) * 100; return ["n", "Opening balance £" + o + ", inflows £" + i + ", outflows £" + ot + ". Closing balance (£)?", o + i - ot, "£", "Opening + inflows − outflows."]; },
      ["m", "A cash flow forecast helps a business to", "plan for shortages of cash", "increase profit margin", "reduce taxes", "set prices", "It shows when cash will run short."],
      ["t", "A profitable business can still run out of cash.", true, "Timing of payments matters."],
      ["m", "Which would help a short-term cash shortage?", "An overdraft", "Buying machines", "Opening new shops", "Paying early", "Short-term finance."]] }
]);

G.topic("Marketing in depth", "📣", "Paper 1", [
{ t: "Product and the product life cycle", icon: "🔄",
  c: ["Product: design, quality, features, branding and packaging. USP (unique selling point) sets it apart.", "Product life cycle: development, introduction, growth, maturity and decline. Sales and profit change at each stage.", "Extension strategies delay decline: new packaging, new markets, product updates, price cuts.", "A product portfolio spreads risk."],
  k: "Introduction, growth, maturity, decline.",
  q: [["o", "Order the product life cycle.", ["Development", "Introduction", "Growth", "Maturity", "Decline"]],
      ["m", "A USP is", "a feature that makes the product different", "a type of price", "a business loan", "a stock level", "It sets the product apart."],
      ["m", "An extension strategy is", "a way to delay a product's decline", "a way to cut costs", "a loan", "an advertisement only", "It lengthens the life."],
      ["t", "Sales are usually highest in the maturity stage.", true, "Sales peak and then level off."]] },
{ t: "Price and promotion", icon: "🏷️",
  c: ["Pricing strategies: penetration (low to enter), skimming (high at first), competitive, cost-plus, psychological (£9.99), loss leader.", "Price depends on costs, competition, demand and brand image.", "Promotion: advertising, sales promotions (BOGOF, discounts), PR, sponsorship, personal selling, social media and direct marketing.", "Choose methods that suit the target market and budget."],
  k: "Skimming starts high; penetration starts low.",
  q: [["m", "Setting a low price to win market share is", "penetration pricing", "price skimming", "cost-plus", "loss leader", "Low entry price."],
      ["m", "£9.99 instead of £10 is", "psychological pricing", "skimming", "competitive pricing", "cost-plus", "It looks cheaper."],
      ["m", "BOGOF is an example of", "a sales promotion", "PR", "sponsorship", "market research", "Buy one get one free."],
      ["t", "Price skimming sets a high price when a product is new.", true, "Early adopters pay more."]] },
{ t: "Place and e-commerce", icon: "🛒",
  c: ["Place is how products reach customers: retailers, wholesalers, direct online sales.", "E-commerce (online selling) gives wider reach and lower costs but needs delivery and web security. Bricks-and-mortar shops let customers see products.", "m-commerce uses mobile devices; most retailers are omnichannel.", "Digital marketing: search engine optimisation, social media, email campaigns."],
  k: "Place is the route from maker to customer.",
  q: [["m", "Which is a benefit of selling online?", "Wider market reach", "No delivery needed", "No security risks", "Customers can touch products", "Websites reach anywhere."],
      ["m", "m-commerce means selling via", "mobile devices", "market stalls", "shops", "post", "Mobile commerce."],
      ["t", "A wholesaler sells goods in bulk to retailers.", true, "It sits in the chain of distribution."],
      ["m", "A disadvantage of e-commerce is", "cyber-security risk", "no ordering needed", "fewer customers", "no reviews", "Online fraud is a threat."]] }
]);

G.topic("Operations and legal influences", "🏭", "Paper 2", [
{ t: "Stock control and quality", icon: "📦",
  c: ["Stock control balances holding enough stock to meet demand with avoiding waste and storage cost. A buffer stock acts as a safety margin.", "Just-in-time (JIT) delivers stock only when needed, reducing storage but risking delays.", "Quality control inspects products; quality assurance builds quality into every stage. Good quality builds reputation.", "Poor quality means returns, lost customers and damage to the brand."],
  k: "JIT: stock arrives just in time, so storage costs fall.",
  q: [["m", "Just-in-time stock control", "orders stock only when needed", "keeps large stocks", "wastes stock", "avoids suppliers", "It reduces storage costs."],
      ["m", "Buffer stock is", "a minimum safety stock", "defective goods", "extra staff", "cash", "It guards against delays."],
      ["t", "Quality assurance focuses on preventing mistakes throughout production.", true, "It is built into the process."],
      ["m", "A risk of JIT is", "supply delays stopping production", "high storage costs", "waste", "fewer orders", "No spare stock."]] },
{ t: "Employment law and consumer law", icon: "⚖️",
  c: ["Employment law covers contracts, minimum wage, health and safety, discrimination (Equality Act) and working hours.", "Consumer law (Consumer Rights Act) says goods must be of satisfactory quality, fit for purpose and as described.", "Businesses that break laws face fines, compensation and bad publicity.", "Ethical businesses go beyond the law, for example fair pay and sustainable sourcing."],
  k: "As described, fit for purpose, satisfactory quality.",
  q: [["m", "Under consumer law goods must be", "as described", "cheap", "foreign", "new always", "They must match the description."],
      ["m", "The Equality Act prevents", "discrimination", "profit", "taxes", "competition", "Workers are protected."],
      ["t", "National minimum wage is an employment law.", true, "Employers must pay at least the legal minimum."],
      ["m", "A cost of breaking the law could be", "fines and bad publicity", "higher profit", "more customers", "lower prices", "Penalties hurt the business."]] }
]);

G.topic("People in depth", "🧑‍💼", "Paper 2", [
{ t: "Motivation and pay", icon: "🏅",
  c: ["Financial methods: wages (hourly), salaries (annual), bonuses, commission, profit sharing and fringe benefits.", "Non-financial methods: job satisfaction, recognition, promotion, flexible working and training.", "Motivated staff are more productive and less likely to leave, cutting recruitment costs.", "Theories: Maslow's hierarchy and Herzberg's two-factor ideas."],
  k: "Money isn't everything: recognition and development motivate too.",
  q: [["m", "Commission is pay based on", "sales made", "hours worked", "age", "qualifications", "Salespeople earn per sale."],
      ["m", "Which is a non-financial motivator?", "Promotion opportunities", "Bonus", "Wages", "Commission", "It rewards without cash."],
      ["t", "Motivated workers are usually more productive.", true, "They work harder and stay longer."],
      ["m", "A salary is paid", "annually, split into monthly payments", "per item", "per sale", "per hour", "A fixed yearly amount."]] },
{ t: "Training and communication", icon: "🗣️",
  c: ["Induction training introduces new staff; on-the-job training is learned at work; off-the-job is away from work.", "Training improves skills but costs money and time. Skilled staff improve efficiency and quality.", "Communication methods: face to face, email, phone, meetings and social media. The best depends on message and urgency.", "Barriers: jargon, too many layers, information overload."],
  k: "Induction first, then ongoing training.",
  q: [["m", "Induction training is for", "new employees", "managers only", "customers", "suppliers", "It helps them settle in."],
      ["m", "A cost of training is", "time and money", "lower skills", "higher turnover", "bad quality", "Staff are away from work."],
      ["t", "Email is suitable for a formal written record.", true, "It keeps a written trail."],
      ["m", "A barrier to communication is", "jargon", "clear language", "feedback", "direct contact", "Complex words confuse."]] }
]);
})();
