(function () {
var ri = GAME.ri, pick = GAME.pick;
GAME.topic("Detective Dungeon", "🕵️", "Paper 2", [
{ t: "Purity and formulations", r: "4.8.1.1, 4.8.1.2", icon: "💧",
  c: ["In chemistry, pure means one substance only, not 'natural'. So pure orange juice isn't chemically pure!", "A pure substance melts and boils at one sharp temperature. Mixtures melt over a range.", "A formulation is a mixture designed for a job, with exact amounts. Paints, medicines, cleaning agents, fertilisers!", "Who knew? Formulations are recipes for chemists."],
  k: "Pure has a Precise melting Point. Formulation has a Fixed recipe.",
  q: [["m", "Which indicates a pure substance?", "A sharp melting point", "Melting over a wide range", "A bright colour", "Smelling nice", "Impurities cause a range."],
      ["s", "Is it a formulation?", { "Yes": ["Paint", "Medicine tablet", "Fertiliser"], "No": ["Pure water", "Copper wire"] }],
      ["t", "Fresh milk is chemically pure.", false, "It's a mixture of many substances."]] },

{ t: "Chromatography", r: "4.8.1.3", icon: "🎨", rp: 1, d: "chrom",
  c: ["Chromatography splits mixtures, such as inks. Stationary phase: the paper. Mobile phase: the solvent.", "Substances that prefer the solvent go further. A pure substance gives one spot!", "Rf = distance moved by substance ÷ distance moved by solvent.", "Draw the start line in pencil: ink would run! Keep the solvent level below it."],
  k: "Rf = spot over solvent. Pencil line, or it runs. Always less than 1.",
  q: [function () { var s = pick([2, 3, 4, 5, 6]), f = 10; return ["n", "A spot moves " + s + " cm and the solvent moves " + f + " cm. Find the Rf value.", s / f, "", "Spot ÷ solvent."]; },
      ["m", "Why is the start line drawn in pencil?", "Pencil doesn't dissolve in the solvent", "It's easier to see", "It's a catalyst", "It's cheaper than ink", "Ink would run up the paper."],
      ["m", "A sample gives three spots. It's...", "A mixture", "Pure", "An element", "An ion", "Each spot is a different substance."],
      ["t", "Rf values can be greater than 1.", false, "The spot can't outrun the solvent."]] },

{ t: "Gas tests", r: "4.8.2", icon: "🎈",
  c: ["Four gases to identify, four neat tests.", "Hydrogen: burning splint makes a squeaky pop!", "Oxygen: glowing splint relights. Carbon dioxide: limewater turns milky.", "Chlorine: damp litmus paper is bleached white."],
  k: "Hydrogen pops. Oxygen relights. CO₂ clouds. Chlorine bleaches.",
  q: [["p", "Match the gas with its test.", [["Hydrogen", "Squeaky pop"], ["Oxygen", "Relights a glowing splint"], ["Carbon dioxide", "Turns limewater milky"], ["Chlorine", "Bleaches damp litmus"]]],
      ["m", "A gas makes limewater cloudy. What is it?", "Carbon dioxide", "Oxygen", "Hydrogen", "Chlorine", "Limewater test."],
      ["m", "A gas bleaches damp litmus paper. What is it?", "Chlorine", "Hydrogen", "Oxygen", "Nitrogen", "It turns it white."]] },

{ t: "Flame tests", r: "4.8.3.1", s: 1, rp: 1, icon: "🔥",
  c: ["Dip a clean wire loop in a metal salt, then into a roaring blue flame. The colour names the ion!", "Lithium: crimson. Sodium: yellow. Potassium: lilac. Calcium: orange-red. Copper: green.", "Clean the loop with hydrochloric acid between tests!", "But mixtures can hide colours. Instruments do better."],
  k: "Li crimson, Na yellow, K lilac, Ca orange-red, Cu green.",
  q: [["p", "Match the ion and flame.", [["Lithium", "Crimson"], ["Sodium", "Yellow"], ["Potassium", "Lilac"], ["Calcium", "Orange-red"], ["Copper", "Green"]]],
      ["m", "Why does a mixture of ions make flame tests difficult?", "Some colours can mask others", "It stops the flame", "Metals don't burn in mixtures", "It's always blue", "Sodium's bright yellow often dominates."],
      ["m", "A salt gives a lilac flame. Which ion does it contain?", "K⁺", "Na⁺", "Li⁺", "Cu²⁺", "Potassium is lilac."]] },

{ t: "Metal hydroxide precipitates", r: "4.8.3.2", s: 1, rp: 1, icon: "🧫",
  c: ["Add sodium hydroxide solution and many metal ions form a solid precipitate.", "Aluminium, calcium and magnesium: white. Add excess NaOH: aluminium's dissolves, the others stay!", "Copper(II): blue. Iron(II): green. Iron(III): brown.", "Calcium has an orange-red flame, so use both tests to pin it down."],
  k: "Copper's cool Blue, Iron 2 is Green, Iron 3 is Brown like rust. Three whites: only Al vanishes in excess.",
  q: [["p", "Match the ion to its precipitate.", [["Cu²⁺", "Blue"], ["Fe²⁺", "Green"], ["Fe³⁺", "Brown"], ["Mg²⁺", "White, stays in excess"], ["Al³⁺", "White, dissolves in excess"]]],
      ["m", "A white precipitate dissolves in excess NaOH. Which ion?", "Al³⁺", "Mg²⁺", "Ca²⁺", "Fe³⁺", "Aluminium hydroxide redissolves."],
      ["t", "Rust-coloured precipitate with NaOH means iron(III).", true, "Brown equals Fe³⁺."]] },

{ t: "Testing negative ions", r: "4.8.3.3 to 4.8.3.5", s: 1, rp: 1, icon: "🔎",
  c: ["Carbonates fizz with acid, giving CO₂. Bubble it through limewater to check.", "Halides: add nitric acid, then silver nitrate. Chloride gives white, bromide gives cream, iodide gives yellow.", "Sulfates: add hydrochloric acid, then barium chloride. A white precipitate!", "White, cream, yellow: the colours get darker as you go down Group 7."],
  k: "Silver nitrate: Chloride White, Bromide Cream, Iodide Yellow. Getting darker as you go down Group 7.",
  q: [["p", "Match the anion to the positive test.", [["Carbonate", "Fizz, limewater goes milky"], ["Chloride", "White with silver nitrate"], ["Bromide", "Cream with silver nitrate"], ["Iodide", "Yellow with silver nitrate"], ["Sulfate", "White with barium chloride"]]],
      ["m", "Why add nitric acid first in the halide test?", "To remove carbonate ions that could interfere", "To make silver", "To change the colour", "It's a catalyst", "Otherwise carbonates also make a precipitate."],
      ["m", "A sample gives a yellow precipitate with silver nitrate. Which ion?", "Iodide", "Bromide", "Chloride", "Sulfate", "Yellow means iodide."]] },

{ t: "Instrumental analysis", r: "4.8.3.6, 4.8.3.7", s: 1, icon: "💻",
  c: ["Instruments are accurate, sensitive and quick. And they work with very small samples!", "Flame emission spectroscopy: a sample's put in a flame, and light goes through a spectroscope, making a line spectrum.", "Each metal's lines are like a fingerprint, identifying it. The intensity shows concentration.", "Works even for mixtures."],
  k: "Instruments are Accurate, Sensitive, Rapid. ASaR.",
  q: [["s", "Is it an advantage of instrumental methods?", { "Yes": ["Accurate", "Sensitive", "Rapid"], "No": ["Needs large samples", "Always cheap to buy"] }],
      ["m", "What does the line spectrum show?", "Which metal ions are present", "The pH", "The mass of the sample", "The boiling point", "Each metal has unique lines."],
      ["t", "Flame emission spectroscopy can measure concentration.", true, "Using the intensity, with a calibration."]] }
], { blurb: "Who's the mystery substance? Use the lab's evidence to catch the culprit." });

GAME.topic("Sky Tower", "🌤️", "Paper 2", [
{ t: "Today's and early atmosphere", r: "4.9.1.1, 4.9.1.2", icon: "🌋",
  c: ["For about 200 million years, the atmosphere has been about 80% nitrogen, 20% oxygen, with small amounts of others, such as CO₂.", "Early on, volcanoes released gases: mostly carbon dioxide, with water vapour, nitrogen, and bits of methane and ammonia.", "The water vapour condensed to form oceans!", "Evidence is limited, since it's billions of years ago. So theories change."],
  k: "Today: 4/5 nitrogen, 1/5 oxygen. Early: volcanoes, CO₂, very little oxygen.",
  q: [["n", "What's the rough percentage of nitrogen in air today?", 80, "%", "About 4/5."],
      ["m", "Where did the early atmosphere come from?", "Volcanoes", "Plants", "Space only", "Fossil fuel burning", "Intense volcanic activity."],
      ["m", "How did the oceans form?", "Water vapour condensed", "Rain from comets only", "Ice melted", "Plants made water", "As Earth cooled."]] },

{ t: "How oxygen rose and CO₂ fell", r: "4.9.1.3, 4.9.1.4", icon: "🌱",
  c: ["Algae first made oxygen by photosynthesis, about 2.7 billion years ago. Then plants evolved, and oxygen built up until animals could evolve.", "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.", "CO₂ fell because of photosynthesis, and dissolving in the oceans, forming carbonates.", "Carbon got locked into sedimentary rock, such as limestone, and fossil fuels: coal, crude oil and natural gas."],
  k: "Algae → oxygen. Sea shells → limestone. Trees → coal. Plankton → oil.",
  q: [["s", "Sort what it made.", { "Limestone": ["Shells and skeletons of sea creatures"], "Coal": ["Deposits of dead plants"], "Crude oil": ["Plankton buried in mud"] }],
      ["m", "What first produced oxygen?", "Algae", "Volcanoes", "Animals", "Humans", "About 2.7 billion years ago."],
      ["m", "Which removes CO₂ from the atmosphere?", "Photosynthesis", "Combustion", "Volcanoes", "Respiration", "It's used to make glucose."]] },

{ t: "Greenhouse gases", r: "4.9.2.1, 4.9.2.2", icon: "🏠",
  c: ["Water vapour, carbon dioxide and methane keep Earth warm. Short-wavelength radiation passes in, and Earth emits long-wavelength back out.", "Greenhouse gases absorb the outgoing long waves, keeping us warm!", "We add to them. Burning fossil fuels and deforestation raise CO₂. Farm animals and landfill raise methane.", "It's a big topic, and there's uncertainty in models, but peer-reviewed science says people are causing warming."],
  k: "Short waves in, long waves stuck. CO₂, CH₄, H₂O.",
  q: [["s", "Which human activity adds which gas?", { "Carbon dioxide": ["Burning fossil fuels", "Deforestation"], "Methane": ["Cattle farming", "Decomposing landfill"] }],
      ["m", "How do greenhouse gases warm the Earth?", "They absorb long-wavelength radiation", "They reflect sunlight back only", "They produce heat", "They block all sunlight", "They trap outgoing infrared."],
      ["t", "Water vapour is a greenhouse gas.", true, "With carbon dioxide and methane."]] },

{ t: "Climate change and carbon footprints", r: "4.9.2.3, 4.9.2.4", icon: "🌍",
  c: ["Warmer temperatures bring sea level rise, extreme weather, changes in rainfall and species' habitats, and food production pressure.", "Carbon footprint is the total CO₂ and greenhouse gases over a product's or person's whole life.", "Reduce it with renewables, energy conservation, capturing carbon and taxes!", "But cost, habits, and politics can make progress tricky."],
  k: "Carbon footprint: full lifetime total. Reduce it: less fuel, more renewables, capture the rest.",
  q: [["s", "Would it raise or reduce a carbon footprint?", { "Reduce": ["Insulating homes", "Using renewable energy", "Carbon capture"], "Raise": ["More long-haul flights", "Burning more coal"] }],
      ["m", "A potential effect of climate change:", "Rising sea levels", "Colder oceans everywhere", "Less extreme weather", "More oxygen", "Ice melts and seawater expands."],
      ["t", "A carbon footprint counts emissions over the full life cycle.", true, "From production to disposal."]] },

{ t: "Atmospheric pollutants", r: "4.9.3", icon: "🏭",
  c: ["Burning fuels gives CO₂ and water, but also carbon monoxide, soot, sulfur dioxide and nitrogen oxides.", "Carbon monoxide is toxic with no colour or smell. It stops blood carrying oxygen.", "Soot causes global dimming and lung problems. Sulfur dioxide and nitrogen oxides cause breathing problems and acid rain.", "Sulfur from the fuel itself. Nitrogen from the air, in a hot engine."],
  k: "Carbon Monoxide: Killer Molecule. SO₂ and NOₓ: acid rain. Soot: dimming.",
  q: [["p", "Match the pollutant with its effect.", [["Carbon monoxide", "Toxic, reduces oxygen in blood"], ["Soot", "Global dimming"], ["Sulfur dioxide", "Acid rain"]]],
      ["m", "Where do nitrogen oxides come from?", "Nitrogen and oxygen reacting in hot engines", "Sulfur in fuels", "Photosynthesis", "Limestone", "High temperatures."],
      ["m", "Why's carbon monoxide so dangerous?", "It's colourless and odourless, and toxic", "It smells very bad", "It's brightly coloured", "It's a heavy solid", "You can't detect it unaided."]] }
], { blurb: "How Earth's air got here, and how we are changing it." });

GAME.topic("Resource Rooftop", "♻️", "Paper 2", [
{ t: "Sustainable development", r: "4.10.1.1", icon: "🌳",
  c: ["We use Earth's resources for food, warmth, shelter and transport. Some are natural, some synthetic.", "Sustainable development meets our needs without stopping future generations meeting theirs.", "Chemistry helps with better processes, and less waste.", "Choices made now affect future generations."],
  k: "Sustainable: now and later. Don't borrow from the kids.",
  q: [["t", "Sustainable development meets today's needs without harming future generations.", true, "Definition worth learning."],
      ["s", "Natural or synthetic?", { "Natural": ["Cotton", "Wool", "Timber"], "Synthetic": ["Polyester", "Poly(ethene)"] }]] },

{ t: "Drinking water", r: "4.10.1.2", icon: "🚰", rp: 1,
  c: ["Potable means safe to drink, with low salts and microbes. It's not pure in the chemical sense!", "Freshwater: filter it, then sterilise using chlorine, ozone or ultraviolet.", "Salty water: desalinate by distillation or reverse osmosis. These need lots of energy.", "Practical: test pH and dissolved solids, then distil to get pure water."],
  k: "Potable water: Filter, then Sterilise with Chlorine, Ozone or UV.",
  q: [["o", "Order the steps for treating fresh water.", ["Pass it through filter beds", "Sterilise it", "Pipe it to homes"]],
      ["s", "Sort the methods.", { "Sterilising": ["Chlorine", "Ozone", "Ultraviolet light"], "Desalination": ["Distillation", "Reverse osmosis"] }],
      ["t", "Potable water is chemically pure.", false, "It contains some dissolved substances, at safe levels."],
      ["m", "Why isn't desalination used everywhere?", "It takes a lot of energy", "It uses too much chlorine", "It's illegal", "It only works on small samples", "Heating and pressure are costly."]] },

{ t: "Waste water", r: "4.10.1.3", icon: "🚿",
  c: ["Sewage needs treating before release. First, screening removes grit and large items.", "Then sedimentation: sludge sinks, and liquid effluent stays on top.", "Sludge is digested anaerobically. Effluent gets aerobic biological treatment.", "Tiny microbes do all the work. Salute them."],
  k: "Screen, Settle, then Sludge = no air, Effluent = air.",
  q: [["o", "Order waste water treatment.", ["Screening and grit removal", "Sedimentation", "Anaerobic digestion of sludge and aerobic treatment of effluent", "Release to rivers"]],
      ["p", "Match the treatment.", [["Sludge", "Anaerobic digestion"], ["Effluent", "Aerobic biological treatment"]]],
      ["t", "Waste water from factories can need extra treatment to remove toxic substances.", true, "Harmful chemicals must be removed."]] },

{ t: "Alternative metal extraction", r: "4.10.1.4", h: 1, icon: "🦠",
  c: ["High-grade copper ores are running out. Fresh tricks!", "Phytomining: plants absorb copper from soil, then we burn them to make ash full of copper.", "Bioleaching: bacteria produce leachate solutions with copper in them.", "Then extract with displacement using scrap iron, or electrolysis. Reduces mining!"],
  k: "PHYTO = plants. BIO-leach = bacteria.",
  q: [["p", "Match each method.", [["Phytomining", "Plants absorb metal, burnt to ash"], ["Bioleaching", "Bacteria make a leachate solution"]]],
      ["m", "Which metal can displace copper from its solution cheaply?", "Scrap iron", "Gold", "Silver", "Platinum", "It's more reactive and cheap."],
      ["t", "These methods help because high-grade ores are scarce.", true, "They reduce mining and use low-grade ores."]] },

{ t: "Life cycle assessments", r: "4.10.2.1", icon: "📋",
  c: ["An LCA checks a product's environmental impact across four stages.", "Getting raw materials, making it, using it and disposing of it.", "Paper bag or plastic bag? It's not as obvious as you'd think!", "Some values are numbers, others are judgements. So LCAs can be biased. Be careful."],
  k: "LCA: Raw, Make, Use, Bin.",
  q: [["o", "Order the LCA stages.", ["Extracting raw materials", "Manufacturing and packaging", "Using the product", "Disposal"]],
      ["t", "LCAs can be biased or selectively used.", true, "Some impacts are value judgements."],
      ["m", "Which is hard to give a number to in an LCA?", "Pollutant effects", "Water used", "Energy needed", "Mass of materials", "Effects need judgement."]] },

{ t: "Reducing resource use", r: "4.10.2.2", icon: "🔁",
  c: ["Reduce, reuse, recycle saves resources, energy, and landfill.", "Glass bottles can be reused or melted and reshaped.", "Metals are melted and recycled. Often they're blended for quality!", "Mining and quarrying harm habitats. Recycling helps."],
  k: "Reduce first, reuse next, recycle last.",
  q: [["s", "Sort the action.", { "Reuse": ["Washing and refilling a glass bottle"], "Recycle": ["Melting cans to make new ones", "Crushing glass to make new bottles"] }],
      ["m", "A benefit of recycling metal:", "Uses less energy than extraction", "Uses more ore", "Makes more landfill", "Makes more CO₂", "Much less energy is needed."]] },

{ t: "Corrosion and prevention", r: "4.10.3.1", s: 1, icon: "🦀",
  c: ["Corrosion means materials destroyed by reacting with things around them. Rusting needs both air and water.", "Prevent it with a barrier: paint, oil or plating. Aluminium has its own oxide layer.", "Sacrificial protection: attach a more reactive metal. It corrodes instead!", "Galvanising coats iron with zinc. It's a very noble thing to do, zinc."],
  k: "Rust needs Air AND Water. Zinc takes one for the team.",
  q: [["s", "Would it stop rusting?", { "Yes": ["Painting", "Greasing", "Galvanising"], "No": ["Adding salt water", "Keeping it damp"] }],
      ["m", "Why does zinc protect iron?", "Zinc is more reactive, so it corrodes first", "Zinc is less reactive", "Zinc is a catalyst", "Zinc absorbs water", "Sacrificial protection."],
      ["t", "Iron needs both air and water to rust.", true, "No air or no water means no rust."]] },

{ t: "Useful alloys", r: "4.10.3.2", s: 1, icon: "🔔",
  c: ["Bronze is copper and tin: statues and bells. Brass is copper and zinc: instruments and door fittings.", "Gold is alloyed for strength. 24-carat is pure. 18-carat is 75% gold.", "Steels: high carbon is hard, for tools. Low carbon is easily shaped, for car bodies. Stainless with chromium and nickel resists corrosion.", "Aluminium alloys are light, and good for planes."],
  k: "Bronze has Tin (BronTin). Brass has Zinc (brassZ).",
  q: [["p", "Match the alloy.", [["Bronze", "Copper and tin"], ["Brass", "Copper and zinc"], ["Stainless steel", "Iron, chromium, nickel"], ["High carbon steel", "Hard tools"]]],
      ["n", "18-carat gold is what percentage gold?", 75, "%", "18 ÷ 24 × 100."],
      ["m", "Which steel would you use for cutlery?", "Stainless steel", "High carbon steel", "Pure iron", "Brass", "It resists corrosion."]] },

{ t: "Ceramics, polymers and composites", r: "4.10.3.3", s: 1, icon: "🏺",
  c: ["Soda-lime glass comes from sand, sodium carbonate and limestone. Borosilicate adds boron trioxide, and melts at a higher temperature.", "Clay ceramics are shaped from wet clay, then baked: pottery and bricks.", "Polymers: LDPE and HDPE come from ethene with different conditions. Thermosoftening melt when heated. Thermosetting don't!", "Composites: fibres in a matrix. Carbon fibre, fibreglass, wood and concrete."],
  k: "Thermosoftening softens. Thermosetting is set for good, thanks to cross-links.",
  q: [["s", "Sort the polymers.", { "Thermosoftening": ["Melts on heating", "No cross-links"], "Thermosetting": ["Doesn't melt", "Has cross-links"] }],
      ["p", "Match the material.", [["Soda-lime glass", "Sand, limestone, sodium carbonate"], ["Borosilicate glass", "Higher melting point"], ["Composite", "Reinforcement in a matrix"], ["Clay ceramic", "Fired in a furnace"]]],
      ["m", "Which is a composite?", "Fibreglass", "Poly(ethene)", "Copper", "Soda-lime glass", "Glass fibres in a polymer."]] },

{ t: "The Haber process", r: "4.10.4.1", s: 1, icon: "🏭",
  c: ["The Haber process makes ammonia for fertilisers: N₂ + 3H₂ ⇌ 2NH₃.", "Nitrogen comes from the air, hydrogen from natural gas. Conditions: 450 °C, 200 atm, iron catalyst.", "Cooled, the ammonia liquefies and is removed. Unused gases get recycled!", "Higher: low temperature gives better yield, but is slow, so 450 °C is a compromise. High pressure helps yield, but is expensive."],
  k: "Haber's recipe: 450 °C, 200 atm, iron catalyst. A compromise.",
  q: [["p", "Match the conditions.", [["Temperature", "450 °C"], ["Pressure", "200 atmospheres"], ["Catalyst", "Iron"]]],
      ["m", "Where does the nitrogen come from?", "The air", "Natural gas", "Water", "Crude oil", "Hydrogen comes from natural gas."],
      ["m", "Why is 450 °C called a compromise? (Higher)", "A lower temperature gives better yield, but it'd be too slow", "Iron melts below this", "A higher one is cheaper", "It's the boiling point of ammonia", "Exothermic forward, so yield falls as it heats."],
      ["t", "Unreacted hydrogen and nitrogen are recycled.", true, "To save resources."]] },

{ t: "NPK fertilisers", r: "4.10.4.2", s: 1, icon: "🌾",
  c: ["Compounds of nitrogen, phosphorus and potassium make plants grow. NPK fertilisers contain carefully chosen percentages.", "Ammonia makes nitric acid. With more ammonia, you get ammonium nitrate!", "Phosphate rock reacts with nitric, sulfuric or phosphoric acid to make soluble salts. Potassium chloride and sulfate are mined.", "In the lab, you might use small batches. In industry, it's a continuous process."],
  k: "N, P, K: Nitrogen, Phosphorus, Potassium. Good names, poor scrabble tiles.",
  q: [["p", "Match each element with its source.", [["Nitrogen", "Ammonia"], ["Phosphorus", "Phosphate rock"], ["Potassium", "Mined potassium salts"]]],
      ["m", "What does NPK stand for?", "Nitrogen, Phosphorus, Potassium", "Neon, Platinum, Krypton", "Nickel, Phosphorus, Potassium", "Nitrogen, Potassium, Carbon", "Essential plant elements."],
      ["m", "Which two chemicals make ammonium nitrate?", "Ammonia and nitric acid", "Ammonia and water", "Hydrogen and nitrogen", "Sulfuric acid and rock", "A neutralisation reaction."]] }
], { blurb: "Water, metals, materials and fertiliser: chemistry feeding the world." });
})();
