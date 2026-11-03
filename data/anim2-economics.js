(function () {
  var K = ANIM.kit;
  GAME.explain({
    "Scarcity and choice": K.flow("The basic economic problem", ["Unlimited|wants", "Limited|resources", "Scarcity", "Make a|choice", "Opportunity|cost"], [
      "People have unlimited wants.",
      "But resources such as land, labour and capital are limited.",
      "This creates scarcity.",
      "So people, firms and governments must choose.",
      "Every choice has an opportunity cost: the next best alternative given up."]),
    "Specialisation and the division of labour": K.flow("Division of labour", ["Split the job|into tasks", "Each worker|specialises", "Skill and|speed improve", "Output and|productivity rise", "Costs per unit|fall"], [
      "Instead of one person making everything, tasks are divided.",
      "Each worker does one task repeatedly.",
      "Practice makes them faster and better.",
      "Total output rises.",
      "Unit costs fall, though repetitive work can be boring."]),
    "Factors of production": K.compare("Factors and their rewards", ["Factor", "Reward"], [
      ["Land: natural resources", "Rent"],
      ["Labour: workers", "Wages"],
      ["Capital: machines and buildings", "Interest"],
      ["Enterprise: risk-taking", "Profit"]], [
      "Four inputs are needed to produce anything.",
      "Land earns rent.", "Labour earns wages.", "Capital earns interest.", "Enterprise earns profit."]),
    "Costs, revenue and profit in economics": K.bars("Economies of scale: average cost per unit (£)", [["10 units", 10], ["100 units", 6], ["1000 units", 3]], [
      "As output rises, a firm can spread its costs.",
      "At low output, each unit costs a lot.",
      "Bulk buying and specialisation cut the cost.",
      "These economies of scale make large firms cheaper per unit."]),
    "The labour market and wages": K.compare("Why wages differ", ["Higher pay", "Lower pay"], [
      ["Scarce skills, e.g. surgeon", "Many people can do it"],
      ["High demand for the work", "Low demand"],
      ["Long training needed", "Little training needed"],
      ["Strong union bargaining", "National minimum wage as floor"]], [
      "Pay depends on demand for and supply of labour.",
      "Scarce skills earn more.",
      "Training raises supply costs and pay.",
      "Unions and the minimum wage affect wage levels."]),
    "Supply": K.flow("Supply shifts right when...", ["Costs fall", "Technology|improves", "Subsidy|is given", "More firms|enter", "Supply|curve shifts|right"], [
      "A rightward shift means firms supply more at every price.",
      "Lower production costs help.",
      "Better technology cuts costs.",
      "A government subsidy lowers costs.",
      "More firms increase total supply.",
      "Result: lower price and higher quantity."]),
    "Price and elasticity": K.compare("Elastic and inelastic demand", ["Elastic (PED > 1)", "Inelastic (PED < 1)"], [
      ["Luxuries, many substitutes", "Necessities, few substitutes"],
      ["Quantity changes a lot", "Quantity changes a little"],
      ["Cutting price raises revenue", "Raising price raises revenue"],
      ["e.g. holidays", "e.g. petrol"]], [
      "Elasticity shows how sensitive buyers are to price.",
      "Substitutes make demand elastic.",
      "Quantity response decides what happens to revenue.",
      "Firms use this to set prices."]),
    "Price elasticity calculations": K.flow("Calculating PED", ["Price rises|10%", "Quantity|falls 20%", "PED = %ΔQ|÷ %ΔP", "20 ÷ 10 = 2", "Elastic: PED|above 1"], [
      "A worked example.",
      "Suppose the price rises 10%.",
      "Quantity demanded falls 20%.",
      "Divide the percentage change in quantity by the percentage change in price.",
      "The answer is 2 (ignore the minus sign).",
      "Greater than 1 means demand is elastic."]),
    "Competition and market failure": K.compare("Competitive market and monopoly", ["Many firms", "Monopoly"], [
      ["Prices are lower", "Can charge higher prices"],
      ["More choice", "Less choice"],
      ["Firms must innovate", "Less pressure to improve"],
      ["Efficient allocation", "May be regulated by the CMA"]], [
      "Competition affects consumers.",
      "Competition keeps prices down.",
      "Choice and innovation increase.",
      "Monopoly can be a market failure, so the CMA regulates."]),
    "Taxes, subsidies and externalities": K.flow("A negative externality", ["Factory|produces|goods", "Pollutes|the river", "Third parties|bear the cost", "Market ignores|this cost", "Government|taxes or|regulates"], [
      "An externality is a cost or benefit to someone else.",
      "A factory pollutes.",
      "The community pays in health and clean-up costs.",
      "The market price does not include this social cost.",
      "A tax or regulation makes the polluter pay."]),
    "Economic objectives and growth": K.cycle("The business cycle", ["Boom|high growth", "Slowdown", "Recession|falling GDP", "Recovery"], [
      "The economy moves through repeating phases.",
      "In a boom GDP grows quickly.",
      "Growth slows.",
      "In a recession GDP falls and unemployment rises.",
      "Recovery follows and the cycle begins again."]),
    "Unemployment and inflation": K.compare("Types", ["Unemployment", "Inflation"], [
      ["Cyclical: downturn in demand", "Demand-pull: too much spending"],
      ["Structural: industries decline", "Cost-push: higher costs"],
      ["Frictional: between jobs", "Measured by CPI"],
      ["Wastes resources", "Reduces value of money"]], [
      "Two key macroeconomic problems, each with types.",
      "Cyclical and demand-pull are linked to demand.",
      "Structural and cost-push come from supply.",
      "Both cause harm, so governments aim for low unemployment and 2% inflation."]),
    "Calculating growth, inflation and unemployment": K.flow("Percentage change", ["Old value|100", "New value|105", "Change|= 5", "Change ÷ old|= 0.05", "× 100 = 5%"], [
      "Growth, inflation and unemployment use percentage change.",
      "Start with the old value.",
      "Find the new value.",
      "Subtract to find the change.",
      "Divide by the old value.",
      "Multiply by 100: a 5% increase."]),
    "Government policy": K.compare("Types of policy", ["Fiscal policy", "Monetary policy"], [
      ["Government taxes and spending", "Interest rates and money supply"],
      ["Set by the Treasury", "Set by the Bank of England"],
      ["Cut tax to boost demand", "Raise rates to reduce inflation"],
      ["Slow to take effect", "Affects borrowing and saving"]], [
      "Governments steer the economy with two main tools.",
      "Fiscal is about the budget; monetary is about interest rates.",
      "Each can boost or slow demand.",
      "Supply-side policy raises productive capacity."]),
    "Fiscal and monetary policy": K.flow("Raising interest rates", ["Bank of England|raises rate", "Borrowing|costs more", "Spending|falls", "Demand|slows", "Inflation|falls"], [
      "How monetary policy fights inflation.",
      "The MPC raises the Bank Rate.",
      "Loans and mortgages become dearer.",
      "People and firms spend less.",
      "Demand falls.",
      "Price rises slow towards the 2% target, though growth may suffer."]),
    "Trade and exchange rates": K.flow("A stronger pound", ["Pound rises|in value", "UK exports|cost more|abroad", "Imports|become|cheaper", "Exports fall,|imports rise", "Trade deficit|may widen"], [
      "Exchange rate changes affect trade.",
      "The pound buys more foreign currency.",
      "Foreign buyers find UK goods dearer.",
      "UK buyers find imports cheaper.",
      "Fewer exports and more imports.",
      "The balance of trade can worsen."]),
    "International trade and globalisation": K.compare("Free trade and protection", ["Free trade", "Protectionism"], [
      ["Specialise and trade", "Tariffs and quotas"],
      ["Lower prices, more choice", "Higher prices"],
      ["Bigger markets", "Protects domestic jobs"],
      ["Industries may close", "May provoke retaliation"]], [
      "Countries choose between open and protected trade.",
      "Free trade brings efficiency.",
      "Protection shields home industries.",
      "Both have costs and benefits."]),
    "Public finances and taxation": K.layers("Where the government's money goes (typical order)", ["Welfare and pensions", "Health", "Education", "Defence and other"], [
      "The government spends tax revenue on public services.",
      "Welfare and pensions are the largest area.", "Health, including the NHS, comes next.", "Education is also significant.", "Defence and others make up the rest. If spending exceeds revenue there is a deficit."], false)
  });
})();
