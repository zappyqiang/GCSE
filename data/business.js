(function () {
var G = GAME, ri = G.ri;
G.configure({
  key: "business", subject: "Business", spec: "AQA 8132 · 2 papers", title: "Business course", tiered: false,
  specUrl: "https://www.aqa.org.uk/subjects/business/gcse/business-8132", channel: "tutor2u",
  intro: "How businesses start, grow and compete: ownership, marketing, operations, finance and people, with the calculations you need.",
  finalName: "Final assessment", sheetName: "Formulas and terms", sheetNote: "Paper 1 covers influences of operations and HRM on business activity. Paper 2 covers influences of marketing and finance. Learn the formulas."
});
G.sheet = [
  { h: "Finance formulas", rows: [
    ["Revenue", "selling price × quantity sold"], ["Total costs", "fixed costs + variable costs"], ["Profit", "revenue − total costs"], ["Gross profit", "revenue − cost of sales"], ["Net profit", "gross profit − expenses"], ["Break-even output", "fixed costs ÷ (selling price − variable cost per unit)"], ["Margin of safety", "actual output − break-even output"], ["Gross profit margin", "(gross profit ÷ revenue) × 100"], ["Net profit margin", "(net profit ÷ revenue) × 100"], ["Average rate of return", "(average annual profit ÷ initial investment) × 100"]
  ] },
  { h: "Key terms", rows: [
    ["Sole trader", "One owner, unlimited liability"], ["Limited company", "Separate legal entity, limited liability"], ["Franchise", "Right to use a brand in return for fees"], ["Added value", "Selling price minus cost of inputs"], ["Opportunity cost", "Next best alternative given up"], ["Stakeholder", "Anyone affected by or with an interest in a business"], ["USP", "Unique selling point"], ["Market segmentation", "Dividing a market into groups of customers"], ["The four Ps", "Product, price, promotion, place"]
  ] }
];

G.topic("Business in the real world", "🏪", "Paper 1", [
{ t: "Enterprise and entrepreneurship", icon: "💡",
  c: ["An entrepreneur takes risks to set up and run a business. Enterprise is the activity of taking those risks.", "Reasons to start: be your own boss, make profit, follow an idea. Risks include failure and lost savings.", "Business plans set out aims, market research, finance and marketing.", "Rewards are profit and independence; the opportunity cost is the next best use of time and money."],
  k: "Risk and reward.",
  q: [["m", "An entrepreneur is someone who", "takes risks to start a business", "works for a large firm", "lends money", "buys shares only", "They organise resources for profit."],
      ["m", "Opportunity cost is", "the next best alternative given up", "the cost of materials", "profit", "tax", "It is what you sacrifice."],
      ["t", "A business plan helps to secure finance.", true, "Lenders want to see the plan."]] },

{ t: "Business ownership", icon: "🏢",
  c: ["A sole trader has one owner, keeps all profit but has unlimited liability.", "A partnership has 2 or more owners; a private limited company (Ltd) has limited liability and shareholders.", "A public limited company (plc) can sell shares to the public.", "Franchises and social enterprises are other forms; charities and social enterprises reinvest profit."],
  k: "Limited liability protects personal assets.",
  q: [["m", "Which owner has unlimited liability?", "sole trader", "Ltd shareholder", "plc shareholder", "franchisee only", "Personal assets are at risk."],
      ["s", "Which type?", { "Private limited company (Ltd)": ["Limited liability", "Cannot sell shares publicly"], "Public limited company (plc)": ["Can sell shares to the public", "More regulation"] }],
      ["t", "A plc must publish more information than an Ltd.", true, "Public accounts are required."]] },

{ t: "Stakeholders and aims", icon: "🎯",
  c: ["Stakeholders include owners, employees, customers, suppliers, government and the local community.", "Their interests can conflict: for example owners want profit, workers want higher pay.", "Aims include survival, profit, growth, market share and social objectives.", "Aims change with the business life cycle."],
  k: "Different stakeholders want different things.",
  q: [["m", "Which is a business aim?", "growth", "tax", "loan", "stock", "Many firms aim to expand."],
      ["p", "Match the stakeholder to interest.", [["Employees", "Pay and job security"], ["Customers", "Quality and price"], ["Shareholders", "Dividends"], ["Local community", "Jobs and environment"]]],
      ["t", "Stakeholders never conflict.", false, "Competing aims are common."]] },

{ t: "Location and expansion", icon: "📍",
  c: ["Factors affecting location include customers, labour, costs, transport and suppliers.", "Growth can be internal (new products, new sites) or external (mergers and takeovers).", "Franchising expands with less risk.", "Online business removes some location constraints."],
  k: "Locate where costs and customers balance.",
  q: [["m", "A takeover is", "buying another business", "opening a new shop", "making a loss", "closing a plant", "It is external growth."],
      ["m", "Franchisee pays", "fees and royalties", "no costs", "only tax", "dividends", "They use the brand."],
      ["t", "Online sales can reduce the need for shops.", true, "Location matters less."]] }
]);

G.topic("Influences on business", "🌐", "Paper 1", [
{ t: "Technology and ethics", icon: "🤖",
  c: ["E-commerce and social media help businesses reach customers. Technology can reduce costs and speed production.", "Ethical issues include fair pay, sourcing and environmental impact.", "Consumers may prefer ethical brands, but costs can rise.", "Sustainability can improve reputation."],
  k: "Technology opens markets; ethics shape reputation.",
  q: [["m", "E-commerce means", "buying and selling online", "printing", "banking only", "stock markets", "Websites and apps are used."],
      ["t", "Ethical behaviour can improve a firm's image.", true, "Customers may trust them more."],
      ["m", "A cost of using technology can be", "setup and training", "free", "no change", "higher tax only", "Investment is needed."]] },

{ t: "The economic climate", icon: "📈",
  c: ["Interest rates, inflation, unemployment and exchange rates affect businesses.", "Higher interest rates raise borrowing costs and reduce spending.", "A stronger pound makes exports dearer and imports cheaper.", "Recession reduces demand."],
  k: "Economy shapes demand and cost.",
  q: [["m", "Higher interest rates usually", "reduce spending and borrowing", "raise spending", "lower prices", "end tax", "Loans cost more."],
      ["m", "A strong pound makes UK exports", "more expensive abroad", "cheaper abroad", "free", "illegal", "Foreign buyers pay more."],
      ["t", "Inflation is a general rise in prices.", true, "Costs and prices go up."]] },

{ t: "Globalisation and competition", icon: "🚢",
  c: ["Globalisation links countries through trade and technology.", "Imports and exports; multinationals operate in many countries.", "Competition: price, quality, service and brand.", "Businesses use competitive advantage to stand out."],
  k: "Win with a competitive edge.",
  q: [["m", "A multinational operates", "in several countries", "only locally", "online only", "as a charity", "It has sites abroad."],
      ["m", "Imports are goods", "bought from abroad", "sold abroad", "made for free", "thrown away", "They come into the country."],
      ["t", "Competition can lead to lower prices.", true, "Firms compete for customers."]] }
]);

G.topic("Operations", "🏭", "Paper 1", [
{ t: "Production processes", icon: "⚙️",
  c: ["Job production makes one-off items; batch production makes groups; flow production is continuous.", "Efficiency can be improved by automation and lean production.", "Just in time (JIT) reduces stock holding.", "Quality control checks output; quality assurance builds checks into every stage."],
  k: "Match the production method to the product.",
  q: [["s", "Which production method?", { "Job": ["Wedding cake", "Bespoke suit"], "Batch": ["Bakery trays of bread", "Paint colours"], "Flow": ["Cars on a line", "Bottled water"] }],
      ["m", "Just in time aims to", "keep stock low", "hold lots of stock", "make losses", "increase waste", "Materials arrive when needed."],
      ["t", "Quality assurance happens at all stages.", true, "It prevents problems."]] },

{ t: "Suppliers and customer service", icon: "🤝",
  c: ["Good suppliers offer quality, reliability and fair prices.", "Procurement is buying supplies. Stock control avoids shortages or waste.", "Customer service includes product knowledge, speed and after-sales care.", "Poor service loses customers."],
  k: "Happy customers come back.",
  q: [["m", "Procurement is", "obtaining supplies", "selling goods", "advertising", "recruiting", "It is buying inputs."],
      ["t", "Good customer service can create loyalty.", true, "Repeat sales follow."],
      ["m", "A risk of holding too much stock is", "storage costs and waste", "no costs", "higher sales", "tax rebate", "It ties up money."]] }
]);

G.topic("Finance", "💷", "Paper 2", [
{ t: "Sources of finance", icon: "🏦",
  c: ["Internal sources: retained profit, selling assets. External: loans, overdrafts, share issues, crowdfunding, venture capital.", "Short-term finance includes overdrafts and trade credit. Long-term includes loans and share issues.", "Choose based on cost, risk and how long the money is needed.", "Interest must be paid on loans."],
  k: "Match finance to purpose and time.",
  q: [["s", "Internal or external?", { "Internal": ["Retained profit", "Selling assets"], "External": ["Bank loan", "Share issue"] }],
      ["m", "An overdraft is mainly used for", "short-term cash flow", "buying property", "long-term growth", "paying tax", "It is flexible but costly."],
      ["t", "Retained profit has no interest cost.", true, "It is the firm's own money."]] },

{ t: "Revenue, costs and profit", icon: "🧮",
  c: ["Revenue = price × quantity. Total costs = fixed + variable. Profit = revenue − total costs.", "Fixed costs (rent) do not change with output; variable costs (materials) do.", "Gross profit = revenue − cost of sales; net profit = gross profit − expenses.", "Margins show profit as a percentage of revenue."],
  k: "Revenue minus costs equals profit.",
  q: [function () { var p = ri(2, 9), u = ri(100, 900); return ["n", "A business sells " + u + " items at £" + p + " each. What is revenue in £?", p * u, "£", "Revenue = price × quantity."]; },
      function () { var f = ri(2, 9) * 1000, v = ri(1, 9) * 1000; return ["n", "Fixed costs are £" + f + " and variable costs are £" + v + ". What are total costs in £?", f + v, "£", "Total costs = fixed + variable."]; },
      function () { var r = ri(20, 90) * 1000, c = ri(5, 19) * 1000; return ["n", "Revenue is £" + r + " and total costs are £" + c + ". What is profit in £?", r - c, "£", "Profit = revenue − total costs."]; },
      function () { var fc = ri(2, 9) * 1000, pr = ri(5, 9) * 4, vc = pr - ri(1, 2) * 2, be = fc / (pr - vc); return ["n", "Fixed costs £" + fc + ", price £" + pr + ", variable cost £" + vc + " per unit. Break-even output in units?", be, "units", "Fixed costs ÷ contribution per unit."]; },
      ["t", "Rent is usually a fixed cost.", true, "It stays the same as output changes."]] },
]);
G.topic("Marketing", "📣", "Paper 2", [
{ t: "The marketing mix", icon: "🧩",
  c: ["The four Ps: product, price, promotion and place.", "Pricing strategies include penetration, skimming and competitive pricing.", "Promotion includes advertising, sales promotion, PR and social media.", "Place covers distribution: retail, online and direct."],
  k: "Four Ps working together.",
  q: [["m", "Which is part of the marketing mix?", "price", "profit", "payroll", "pension", "Price is one of the four Ps."],
      ["p", "Match the P.", [["Product", "Design and features"], ["Price", "How much customers pay"], ["Promotion", "Advertising and offers"], ["Place", "Where it is sold"]]],
      ["t", "Penetration pricing sets a low initial price.", true, "It helps gain market share."]] },

{ t: "Market research and segmentation", icon: "🔎",
  c: ["Primary research is gathered first-hand (surveys, focus groups). Secondary research uses existing data.", "Segmentation splits the market by age, income, location or lifestyle.", "Targeting helps focus marketing.", "A product life cycle has introduction, growth, maturity and decline stages."],
  k: "Know your customer.",
  q: [["s", "Primary or secondary research?", { "Primary": ["Survey", "Focus group"], "Secondary": ["Government statistics", "Competitor reports"] }],
      ["o", "Order the product life cycle.", ["Introduction", "Growth", "Maturity", "Decline"]],
      ["t", "Segmentation divides customers into groups.", true, "It lets firms target."]] }
]);

G.topic("People", "🧑‍💼", "Paper 1", [
{ t: "Recruitment and motivation", icon: "🧑‍🤝‍🧑",
  c: ["Recruitment: job description, person specification, advertising, interviews.", "Training can be induction, on the job or off the job.", "Motivation methods: wages, bonuses, promotion, job enrichment.", "Motivated staff are more productive."],
  k: "Hire well, train well, motivate well.",
  q: [["m", "An induction is training for", "new staff", "managers only", "customers", "suppliers", "It introduces the business."],
      ["m", "A bonus is a", "financial reward", "type of loan", "kind of tax", "kind of stock", "It rewards performance."],
      ["t", "Job enrichment makes jobs more varied.", true, "It improves motivation."]] },

{ t: "Organisational structures", icon: "🪜",
  c: ["Hierarchical structures have layers. Flat structures have few layers and wider spans of control.", "Chain of command shows authority; span of control is the number of subordinates.", "Centralised decisions are made at the top; decentralised are delegated.", "Flat structures speed communication."],
  k: "Fewer layers, faster decisions.",
  q: [["m", "Span of control is the number of", "subordinates a manager supervises", "customers", "products", "suppliers", "It measures management width."],
      ["t", "Flat organisations have many layers.", false, "They have few layers."],
      ["m", "Delegation means", "passing authority to others", "firing staff", "buying stock", "advertising", "It spreads work."]] }
]);
})();
