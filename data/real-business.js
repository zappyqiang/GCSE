/* Real-life photos, videos and "How to?" cases for Business */
(function () {
  var K = ANIM.kit;
  GAME.media({
    "Enterprise and entrepreneurship": { pics: [["Soulard Market stalls and stall keepers.jpg", "Market traders: small enterprises"]] },
    "Production processes": { pics: [["Ford assembly line - 1913 (restored).jpg", "Ford's moving assembly line, 1913"], ["002 Production line - car assembly line in General Motors Manufacturing Poland - Gliwice, Poland.jpg", "A modern car assembly line"], ["FANUC Robot Assembly Demo.jpg", "Robots in a production line demonstration"]] },
    "Suppliers and customer service": { pics: [["Supermarket shelves.jpg", "Retailers rely on reliable suppliers"]] },
    "The marketing mix": { pics: [["Supermarket shelves.jpg", "Product, price, promotion and place come together on a shelf"], ["Soulard Market stalls and stall keepers.jpg", "A market stall: place and promotion"]], vids: [["The Marketing Mix: Introduction to Price", "https://www.youtube.com/watch?v=ZIU_SwDmV1o", "Pricing strategies"], ["Marketing Mix: The Product Life Cycle", "https://www.youtube.com/watch?v=df2Iu26ptCk", "Stages of a product's life"]] },
    "Product and the product life cycle": { vids: [["Marketing Mix: The Product Life Cycle", "https://www.youtube.com/watch?v=df2Iu26ptCk", "Product life cycle"]] },
    "Break-even": { vids: [["What is a Break Even Analysis?", "https://www.youtube.com/watch?v=fClcp7AF_Mk", "Break-even explained"]] },
    "Sources of finance": { pics: [["Bank of England Threadneedle St. (12565194585).jpg", "The Bank of England, which sets the base interest rate"]] },
    "The economic climate": { pics: [["Bank of England Threadneedle St. (12565194585).jpg", "The Bank of England"], ["Crowd on stock exchange floor, London LCCN2014683111.jpg", "A busy early stock exchange floor"]] },
    "Stock control and quality": { pics: [["Supermarket shelves.jpg", "Stock control keeps shelves full without waste"]] }
  });

  GAME.howto([
    { id: "startup", sector: "Starting a business", icon: "🚀", title: "How do you start a business from an idea?", tags: "enterprise entrepreneur startup plan finance",
      hook: "Every big brand started as a single idea. What steps turn a good idea into a business that survives?",
      scene: K.flow("From idea to launch", ["Spot a need|or problem", "Research|the market", "Write a|business plan", "Raise|finance", "Launch,|review and adapt"], ["Starting up is a series of decisions.", "Entrepreneurs notice a gap or a problem to solve.", "Market research shows who will buy and what competitors do.", "A business plan sets out aims, costs and forecasts.", "Money comes from savings, loans, investors or crowdfunding.", "After launch, track sales and adapt."]),
      steps: ["Decide a business idea and its USP (unique selling point).", "Use primary research (surveys) and secondary research (reports) to test demand.", "Choose a legal form: sole trader (simple, unlimited liability) or limited company (limited liability).", "Forecast cash flow so you can pay bills before customers pay you.", "Calculate break-even so you know the sales needed to cover costs."],
      facts: ["Profit = revenue − total costs", "Break-even output = fixed costs ÷ (price − variable cost per unit)", "Limited liability protects personal assets"],
      photos: [["Soulard Market stalls and stall keepers.jpg", "A market stall: a first business for many"]],
      think: [["Why do many new businesses fail in the first year?", "Poor cash flow, too little demand, high costs or lack of planning."], ["What is the difference between profit and cash?", "Profit is revenue minus costs over a period; cash is money actually in the bank, which depends on when payments are made."]],
      units: ["Enterprise and entrepreneurship", "Business ownership", "Sources of finance", "Revenue, costs and profit calculations", "Break-even"] },
    { id: "pricing", sector: "Marketing", icon: "🏷️", title: "How do shops decide on prices?", tags: "pricing strategy marketing mix penetration skimming",
      hook: "Why does a new phone launch at a high price, then drop? Why £9.99, not £10? Pricing is psychology plus maths.",
      scene: K.compare("Pricing strategies", ["Strategy", "Idea"], [["Penetration", "Low price to win market share"], ["Skimming", "High price at first, then fall"], ["Competitive", "Match rivals' prices"], ["Psychological", "£9.99 looks cheaper than £10"], ["Cost-plus", "Add a mark-up to cost"]], ["Businesses pick a strategy to suit their aims.", "Penetration pricing attracts customers quickly.", "Skimming earns more from early adopters.", "Competitive pricing follows the market.", "Psychological pricing nudges buyers.", "Cost-plus ensures every sale covers costs."]),
      steps: ["Price must cover costs and fit what customers will pay.", "Demand and elasticity matter: if demand is elastic, cutting the price can raise revenue.", "Promotions (discounts, BOGOF) boost sales but cut margins.", "Price also signals quality: luxury brands often keep prices high."],
      facts: ["Mark-up = profit ÷ cost × 100", "Gross profit margin = gross profit ÷ revenue × 100"],
      photos: [["Supermarket shelves.jpg", "Price labels on supermarket shelves"], ["Soulard Market stalls and stall keepers.jpg", "Stallholders set prices by what customers will pay"]],
      vids: [["The Marketing Mix: Introduction to Price", "https://www.youtube.com/watch?v=ZIU_SwDmV1o", "Pricing strategies"]],
      think: [["A product costs £8 to make. A 50% mark-up gives what selling price?", "£8 × 1.5 = £12."], ["Why do supermarkets use loss leaders?", "A cheap product brings shoppers in, who also buy other items at normal prices."]],
      units: ["The marketing mix", "Product and the product life cycle", "Price and promotion", "Revenue, costs and profit"] },
    { id: "factory", sector: "Operations", icon: "🏭", title: "How do factories make thousands of identical products?", tags: "production assembly line automation lean stock",
      hook: "Henry Ford's moving assembly line cut the time to build a car from 12 hours to 90 minutes. Today, robots do much of the work.",
      scene: K.compare("Ways to produce", ["Job production", "Mass production"], [["One-off, made to order", "Thousands of identical items"], ["Skilled workers", "Machines and assembly lines"], ["High cost per unit", "Low cost per unit"], ["Very flexible", "Hard to change quickly"]], ["The method depends on what is made and how many.", "Job production suits bespoke items such as wedding dresses.", "Mass production suits cars and food.", "Batch production lies in between.", "Automation increasingly replaces repetitive manual work."]),
      steps: ["Division of labour makes each worker an expert at one task.", "Economies of scale: the average cost per unit falls as output rises.", "Just-in-time stock control cuts storage costs but depends on reliable suppliers.", "Quality control (inspection) and quality assurance (built into every stage) reduce waste.", "Automation lowers labour costs but needs big investment and may reduce jobs."],
      facts: ["Average cost = total cost ÷ output", "Capital-intensive: relies on machines; labour-intensive: relies on people"],
      photos: [["Ford assembly line - 1913 (restored).jpg", "Ford's assembly line in 1913"], ["002 Production line - car assembly line in General Motors Manufacturing Poland - Gliwice, Poland.jpg", "A modern assembly line"], ["FANUC Robot Assembly Demo.jpg", "A robotic assembly demonstration"]],
      think: [["Why might a firm keep a buffer stock even with just-in-time?", "To avoid stopping production if a delivery is late."], ["Who benefits and who loses from automation?", "Owners and customers gain lower costs; some workers lose jobs, others need new skills."]],
      units: ["Production processes", "Stock control and quality", "Suppliers and customer service", "Revenue, costs and profit calculations"] },
    { id: "cashflow", sector: "Finance", icon: "💷", title: "Why do profitable businesses still run out of money?", tags: "cash flow forecast overdraft profit",
      hook: "A firm can be profitable on paper and still fail because customers pay late while bills arrive today. Cash flow is the lifeblood of business.",
      scene: K.flow("Cash flow forecast for one month", ["Opening balance", "+ Cash in|(sales received)", "− Cash out|(wages, rent, stock)", "= Net cash|flow", "Closing balance|(next month's opening)"], ["Cash flow tracks money in and out of the bank.", "Start with the money you have.", "Add cash from customers, when they actually pay.", "Subtract payments to suppliers and staff.", "The difference is net cash flow.", "Closing balance = opening + net cash flow."]),
      steps: ["Profit is about revenue and costs; cash flow is about timing.", "A negative closing balance means the business needs an overdraft or loan.", "Improve cash flow by chasing late payers, negotiating longer trade credit, holding less stock or taking a deposit.", "Forecasts help owners and banks plan, but are only estimates."],
      facts: ["Closing balance = opening balance + inflows − outflows", "Overdraft: short-term borrowing"],
      photos: [["Bank of England Threadneedle St. (12565194585).jpg", "Banks lend to businesses with good forecasts"]],
      think: [["Why would a bank ask for a cash flow forecast?", "To see if the business can afford loan repayments."], ["How can a firm speed up payments from customers?", "Offer discounts for early payment or ask for deposits."]],
      units: ["Cash flow forecasts", "Sources of finance", "Revenue, costs and profit calculations", "Profit margins and ROCE"] },
    { id: "economyshocks", sector: "Economy", icon: "📉", title: "How do interest rates and exchange rates affect a business?", tags: "interest rate exchange rate economic climate",
      hook: "When the Bank of England changes the interest rate or the pound jumps in value, businesses feel it at once.",
      scene: K.compare("When rates rise", ["Interest rates up", "Pound stronger"], [["Loans cost more", "UK exports become dearer abroad"], ["Customers borrow and spend less", "Imports become cheaper"], ["Savers earn more", "Exporters sell less; importers gain"]], ["Economic changes ripple through business.", "Higher interest rates raise costs and cut demand.", "A stronger pound helps firms who buy from abroad.", "It hurts firms that sell overseas."]),
      steps: ["Interest rate rise: mortgage and loan payments rise, so households spend less.", "Exchange rate: £1 buys more dollars, so American customers pay more for UK goods.", "Inflation raises costs; firms may pass them on or absorb them.", "Businesses can protect themselves with fixed-rate loans, supplier contracts and spreading their markets."],
      facts: ["A rise in interest rates tends to reduce spending", "Exchange rate: the price of one currency in terms of another"],
      photos: [["Bank of England Threadneedle St. (12565194585).jpg", "The Bank of England sets the base rate"], ["Crowd on stock exchange floor, London LCCN2014683111.jpg", "Financial markets react quickly to news"]],
      think: [["How would a weaker pound affect a UK holiday firm selling to overseas tourists?", "Visits become cheaper for foreigners, so demand may rise."], ["Why do firms prefer stable exchange rates?", "They make costs and prices predictable."]],
      units: ["The economic climate", "Globalisation and competition", "Sources of finance"] }
  ]);
})();
