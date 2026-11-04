(function () {
var G = GAME, ri = G.ri;
G.configure({
  key: "economics", subject: "Economics", spec: "AQA 8136 · 2 papers", title: "Economics course", tiered: false,
  specUrl: "https://www.aqa.org.uk/subjects/economics/gcse/economics-8136", channel: "tutor2u",
  intro: "How individuals, firms and governments make choices: supply and demand, markets, the UK economy, trade and the role of government.",
  finalName: "Final assessment", sheetName: "Formulas and terms", sheetNote: "Paper 1 covers how markets work. Paper 2 covers how the economy works. Practise reading graphs and calculating percentages."
});
G.sheet = [
  { h: "Formulas", rows: [
    ["Percentage change", "(change ÷ original) × 100"], ["Price elasticity of demand (PED)", "% change in quantity demanded ÷ % change in price"], ["Revenue", "price × quantity"], ["Profit", "revenue − total costs"], ["Average cost", "total cost ÷ output"], ["GDP per capita", "GDP ÷ population"], ["Inflation", "% rise in the general price level"]
  ] },
  { h: "Key terms", rows: [
    ["Scarcity", "Limited resources against unlimited wants"], ["Opportunity cost", "The next best alternative given up"], ["Demand", "Quantity consumers will buy at each price"], ["Supply", "Quantity producers will sell at each price"], ["Equilibrium", "Where supply equals demand"], ["Monopoly", "One firm dominates the market"], ["Fiscal policy", "Government taxation and spending"], ["Monetary policy", "Interest rates and money supply"], ["Exchange rate", "The price of one currency in another"]
  ] }
];

G.topic("Economic foundations", "💡", "Paper 1", [
{ t: "Scarcity and choice", icon: "⚖️",
  c: ["Resources are scarce but wants are unlimited, so choices must be made.", "Opportunity cost is the next best alternative forgone.", "Factors of production: land, labour, capital and enterprise.", "The three questions: what, how and for whom to produce?"],
  k: "Scarcity forces choices; every choice has a cost.",
  q: [["m", "Opportunity cost is", "the next best alternative given up", "the price paid", "tax", "profit", "It measures what is sacrificed."],
      ["p", "Match factor to reward.", [["Land", "Rent"], ["Labour", "Wages"], ["Capital", "Interest"], ["Enterprise", "Profit"]]],
      ["t", "Resources are unlimited.", false, "They are scarce."]] },

{ t: "Specialisation and the division of labour", icon: "🏭",
  c: ["Specialisation means focusing on a particular task or good. Division of labour divides production into stages.", "Benefits: higher productivity, quality and lower costs. Drawbacks: boredom and dependence.", "Money acts as medium of exchange, store of value, unit of account and standard for deferred payment.", "Trade allows exchange without barter."],
  k: "Specialise to produce more.",
  q: [["m", "A benefit of specialisation is", "higher productivity", "boredom", "unemployment", "waste", "Workers become skilled."],
      ["m", "Barter is", "swapping goods without money", "using banks", "lending", "tax", "It needs a double coincidence of wants."],
      ["t", "Money is a medium of exchange.", true, "It makes trade easier."]] }
]);

G.topic("Markets", "📈", "Paper 1", [
{ t: "Demand", icon: "🛒",
  c: ["Demand falls as price rises, shown by a downward-sloping curve (law of demand).", "A price change causes a movement along the curve. Other factors shift it: income, tastes, price of related goods, population and advertising.", "Normal goods: demand rises with income. Inferior goods: demand falls.", "Substitutes compete; complements are used together."],
  k: "Price moves along the curve; other factors shift it.",
  q: [["m", "A fall in price causes", "an extension along the demand curve", "a shift left", "a shift right", "no change", "Quantity demanded rises."],
      ["m", "A rise in income raises demand for", "normal goods", "inferior goods", "all goods equally", "no goods", "People can buy more."],
      ["s", "Which type of good?", { "Substitutes": ["Tea and coffee", "Butter and margarine"], "Complements": ["Cars and petrol", "Printers and ink"] }]] },

{ t: "Supply", icon: "🏗️",
  c: ["Supply rises as price rises, giving an upward-sloping curve.", "Shifts are caused by costs of production, technology, taxes and subsidies.", "A subsidy lowers costs and shifts supply right. An indirect tax raises costs and shifts supply left.", "Elasticity measures responsiveness."],
  k: "Costs and taxes shift supply.",
  q: [["m", "A subsidy shifts supply", "right", "left", "up", "nowhere", "Lower costs mean more supply."],
      ["m", "Better technology usually", "increases supply", "reduces supply", "raises demand", "has no effect", "It lowers costs."],
      ["t", "A higher indirect tax decreases supply.", true, "Costs rise."]] },

{ t: "Price and elasticity", icon: "🎚️",
  c: ["Equilibrium price is where supply equals demand. Excess demand pushes price up; excess supply pushes it down.", "PED = % change in quantity demanded ÷ % change in price. Elastic if over 1; inelastic if under 1.", "Necessities such as petrol are inelastic; luxuries are elastic.", "Firms raising price when demand is inelastic increase revenue."],
  k: "Inelastic: raise prices, revenue rises.",
  q: [function () { var p = ri(2, 6) * 5, q = ri(2, 5) * 10; return ["n", "Price rises by " + p + "% and quantity demanded falls by " + q + "%. What is the PED (ignore the minus sign)?", q / p, "", "PED = % change in quantity ÷ % change in price."]; },
      ["m", "PED of 2 means demand is", "elastic", "inelastic", "unit", "perfectly inelastic", "Over 1 is elastic."],
      ["t", "Petrol tends to have inelastic demand.", true, "Few substitutes."]] },

{ t: "Competition and market failure", icon: "🕳️",
  c: ["In perfect competition many firms sell identical products. A monopoly has a single dominant seller.", "Market failure happens when markets misallocate resources: externalities, public goods and information gaps.", "Negative externalities (pollution) impose costs on third parties; positive ones (education) give benefits.", "Government can tax, subsidise, regulate or provide goods."],
  k: "Markets can fail, so governments step in.",
  q: [["m", "A negative externality is", "a cost to a third party", "a benefit to a buyer", "a subsidy", "a tax", "Pollution is an example."],
      ["s", "Positive or negative externality?", { "Negative": ["Pollution", "Noise from a factory"], "Positive": ["Vaccination", "Education"] }],
      ["t", "A monopoly can charge higher prices.", true, "There is little competition."]] }
]);

G.topic("The national economy", "🇬🇧", "Paper 2", [
{ t: "Economic objectives and growth", icon: "📊",
  c: ["Main objectives: economic growth, low unemployment, stable prices (inflation target 2 percent), balance of payments and fair income distribution.", "GDP measures output; growth is the percentage rise in real GDP.", "Business cycle: boom, recession (two quarters of negative growth), slump, recovery.", "Growth improves living standards but may harm the environment."],
  k: "Growth, jobs, stable prices.",
  q: [["m", "The UK inflation target is", "2%", "10%", "0%", "5%", "Set by the Bank of England."],
      ["m", "Recession is defined as", "two quarters of negative growth", "high inflation", "a trade deficit", "a rise in tax", "GDP falls for six months."],
      ["t", "GDP measures the value of output.", true, "It is the main growth indicator."]] },

{ t: "Unemployment and inflation", icon: "👷",
  c: ["Unemployment is people without a job who are seeking one. Types: frictional, structural, cyclical.", "Costs: lost output, benefits spending, social problems. Inflation is a rise in the general price level, measured by the CPI.", "Demand-pull inflation comes from too much demand; cost-push from higher costs.", "Inflation erodes savings but helps borrowers."],
  k: "Jobs and prices are linked.",
  q: [["s", "Type of unemployment?", { "Structural": ["Coal mines close", "Skills out of date"], "Cyclical": ["Recession", "Falling demand"], "Frictional": ["Between jobs"] }],
      ["m", "Demand-pull inflation is caused by", "excess demand", "cost rises", "unemployment", "falling exports", "Too much spending."],
      ["t", "CPI measures changes in the price of a basket of goods.", true, "It tracks inflation."]] },

{ t: "Government policy", icon: "🏛️",
  c: ["Fiscal policy: taxes and government spending. Monetary policy: interest rates set by the Bank of England's MPC.", "Supply-side policies improve productivity through education, training and tax incentives.", "Direct taxes are on income; indirect taxes on spending, such as VAT.", "A budget deficit is when spending exceeds tax revenue."],
  k: "Fiscal is the Treasury; monetary is the Bank.",
  q: [["m", "Who sets interest rates in the UK?", "the Bank of England", "the Treasury", "Parliament", "Local councils", "The MPC decides."],
      ["s", "Direct or indirect tax?", { "Direct": ["Income tax", "National Insurance"], "Indirect": ["VAT", "Fuel duty"] }],
      ["t", "Lower interest rates encourage borrowing.", true, "Loans become cheaper."]] },

{ t: "Trade and exchange rates", icon: "🚢",
  c: ["Trade benefits include greater choice and lower prices. Barriers include tariffs, quotas and subsidies.", "Exports bring money in; imports send money out. A trade deficit means imports exceed exports.", "A stronger pound makes exports dearer and imports cheaper; a weaker pound does the opposite.", "Globalisation links economies but causes structural change."],
  k: "A weak pound helps exporters.",
  q: [["m", "A tariff is", "a tax on imports", "a subsidy", "a loan", "a quota", "It raises import prices."],
      ["m", "A weaker pound makes UK exports", "cheaper abroad", "dearer abroad", "banned", "free", "Overseas buyers pay less."],
      ["t", "A trade deficit means imports exceed exports.", true, "More money leaves than enters."]] }
]);
})();
