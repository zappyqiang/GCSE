(function () {
var ri = GAME.ri, pick = GAME.pick;
GAME.topic("Heat Hall", "🌡️", "Paper 1", [
{ t: "Exothermic and endothermic", r: "4.5.1.1", icon: "🔥", rp: 1,
  c: ["Exothermic reactions transfer energy OUT to the surroundings. Temperature goes up: burning, neutralisation, most oxidation.", "Endothermic reactions take energy IN. Temperature falls: thermal decomposition, citric acid with sodium hydrogencarbonate.", "Hand warmers are exothermic. Sports injury packs are endothermic.", "Required practical: mix solutions in a polystyrene cup with a lid, and track the temperature change."],
  k: "EXothermic: heat EXits. ENdothermic: heat ENters.",
  q: [["s", "Sort these.", { "Exothermic": ["Combustion", "Neutralisation", "Hand warmers"], "Endothermic": ["Thermal decomposition", "Sports injury cold packs"] }],
      ["m", "Why use a polystyrene cup with a lid?", "To reduce heat loss to the surroundings", "It reacts with the acid", "It is a catalyst", "It's cheaper than glass only", "Polystyrene is a good insulator."],
      ["t", "In an endothermic reaction, the temperature of the surroundings goes down.", true, "Energy is taken in from the surroundings."]] },

{ t: "Reaction profiles", r: "4.5.1.2", icon: "🎢", d: "profile",
  c: ["A reaction profile plots energy along the reaction. Particles need enough energy to collide and react.", "That minimum energy is the activation energy, the hill you climb first.", "Exothermic: products lower than reactants. Endothermic: products higher!", "The peak shows Ea. The difference from start to finish is the overall energy change."],
  k: "Exo goes down in the end. Endo ends up high. Ea is always the climb from the reactants.",
  q: [["m", "On a profile, products are lower than reactants. The reaction is...", "Exothermic", "Endothermic", "Reversible", "Slow", "Energy is released overall."],
      ["m", "What is activation energy?", "The minimum energy needed for particles to react", "The total energy released", "The energy in the products", "The energy of the catalyst", "The hill at the start."],
      ["t", "Activation energy is measured from the reactants to the peak.", true, "That's the climb the reactants must make."]] },

{ t: "Bond energies", r: "4.5.1.3", h: 1, icon: "🧮",
  c: ["Breaking bonds takes energy in. Making bonds gives energy out.", "Energy change = bonds broken − bonds made.", "Negative means exothermic, as more energy is released forming bonds than needed to break them!", "Draw the molecules out to count every bond. Count carefully."],
  k: "BEME: Breaking is Endothermic, Making is Exothermic.",
  q: [["n", "Breaking bonds takes 2000 kJ, making bonds gives out 2500 kJ. What's the overall energy change?", -500, "kJ", "2000 − 2500: exothermic."],
      ["m", "Bonds broken 1000 kJ, bonds made 800 kJ. The reaction is...", "Endothermic, +200 kJ", "Exothermic, −200 kJ", "Endothermic, +1800 kJ", "Exothermic, +200 kJ", "Takes in more than it gives out."],
      ["n", "H₂ + Cl₂ → 2HCl. H-H = 436, Cl-Cl = 243, H-Cl = 432 kJ/mol. What's the energy change?", -185, "kJ/mol", "(436 + 243) − (2 × 432)."],
      ["t", "Making bonds is an exothermic process.", true, "Energy is released."]] },

{ t: "Cells and batteries", r: "4.5.2.1", s: 1, icon: "🔋",
  c: ["A cell has two different metals in an electrolyte. Bigger difference in reactivity means bigger voltage.", "Batteries are cells connected in series, giving a bigger voltage!", "Non-rechargeable cells stop once a reactant runs out. Alkaline batteries are like this.", "Rechargeable ones can reverse their reactions with an external current. My favourite kind."],
  k: "More different the metals, more volts. Battery = cells in series.",
  q: [["m", "What determines a cell's voltage?", "The difference in reactivity of the electrodes, and the electrolyte", "Its size only", "Its colour", "Its case", "Bigger difference, bigger voltage."],
      ["t", "Non-rechargeable batteries stop working when a reactant is used up.", true, "The reaction can't continue."],
      ["m", "Why can some cells be recharged?", "The reactions can be reversed by an external current", "The electrodes are replaced", "Water is added", "Light is shone in", "Reversing the chemical reaction."]] },

{ t: "Fuel cells", r: "4.5.2.2", s: 1, icon: "⛽",
  c: ["Hydrogen fuel cells oxidise hydrogen to make electricity. The only product is water!", "2H₂ + O₂ → 2H₂O. Cool, right?", "Higher half equations. At the anode, 2H₂ → 4H⁺ + 4e⁻. At the cathode, O₂ + 4H⁺ + 4e⁻ → 2H₂O.", "Compared with batteries, they don't need recharging, but hydrogen is flammable and hard to store."],
  k: "Fuel cell in: hydrogen and oxygen. Out: water and electricity.",
  q: [["m", "What's the waste product of a hydrogen fuel cell?", "Water", "Carbon dioxide", "Sulfur dioxide", "Nothing", "H₂ and O₂ make water."],
      ["s", "Compare these.", { "Fuel cells": ["Run while fuel is supplied", "Hydrogen is hard to store"], "Rechargeable batteries": ["Need charging from a supply", "Contain toxic chemicals to dispose of"] }],
      ["t", "Fuel cells produce carbon dioxide when working.", false, "Only water."]] }
], { blurb: "Every reaction moves energy. Learn to read the hills and valleys." });

GAME.topic("Speedy Science Lab", "⏱️", "Paper 2", [
{ t: "Calculating rates", r: "4.6.1.1", icon: "⏲️",
  c: ["Mean rate = quantity used or made ÷ time. Units: g/s or cm³/s.", "On a graph, steeper means faster. A flat line means the reaction's over!", "Draw a tangent to find the rate at one exact moment. Its gradient is the rate.", "Higher: also in mol/s. Rate falls as reactants run out."],
  k: "Steep is speedy. Flat is finished.",
  q: [function () { var v = ri(2, 12) * 5, t = pick([5, 10, 20]); return ["n", v * t + " cm³ of gas forms in " + t + " s. Find the mean rate.", v, "cm³/s", "Volume ÷ time."]; },
      ["m", "What does a horizontal line on a gas-volume graph show?", "The reaction has finished", "It's accelerating", "Gas has leaked", "It's at top speed", "No more gas is forming."],
      ["m", "How do you find the rate at a specific time?", "Find the gradient of a tangent at that time", "Read the y-value", "Divide by total volume", "Count the squares", "Tangent gives instantaneous rate."]] },

{ t: "Collision theory and rate factors", r: "4.6.1.2, 4.6.1.3", icon: "💥", rp: 1,
  c: ["To react, particles must collide with at least the activation energy. Rate depends on how often and how hard they hit.", "Concentration or pressure up means more particles in the same space: more frequent collisions.", "Surface area up means more particles exposed. Temperature up means faster particles: more collisions, and more with enough energy!", "Required practical: measure gas volume made, or time until a cross vanishes in cloudy sodium thiosulfate and acid."],
  k: "Rate up with: Concentration, Area, Temperature, Pressure, plus Catalyst. Only temperature also makes hits harder.",
  q: [["m", "Why does higher temperature increase rate?", "More frequent collisions, and more have enough energy", "Particles get larger", "Activation energy increases", "There are more particles", "Faster particles hit more often, with more energy."],
      ["m", "Why does powder react faster than a lump?", "Larger surface area, so more frequent collisions", "It's more concentrated", "It's hotter", "Activation energy is higher", "More particles are exposed."],
      ["t", "Doubling concentration means more frequent collisions.", true, "More particles in the same volume."],
      ["m", "Which measures rate in the disappearing cross experiment?", "Time until the cross can't be seen", "Mass change", "Gas volume", "pH", "The cloudier it is, the less you see."]] },

{ t: "Catalysts", r: "4.6.1.4", icon: "🏃",
  c: ["A catalyst speeds up a reaction, but isn't used up. It gives another pathway with lower activation energy.", "More particles then have enough energy!", "Enzymes are biological catalysts.", "On a reaction profile, the hill's shorter, but start and end stay the same. Manganese dioxide makes hydrogen peroxide decompose fast."],
  k: "Catalyst: new shortcut through the mountain. Lower Ea, same start and end.",
  q: [["m", "How does a catalyst work?", "It provides a pathway with lower activation energy", "It raises the temperature", "It increases concentration", "It gets used up", "More particles can react."],
      ["t", "A catalyst changes the overall energy change of the reaction.", false, "It only lowers the activation energy."],
      ["m", "Enzymes are...", "Biological catalysts", "Metals", "Fuels", "Salts", "Proteins speeding up cell reactions."]] },

{ t: "Reversible reactions and equilibrium", r: "4.6.2.1 to 4.6.2.3", icon: "⇌",
  c: ["Some reactions go both ways: A + B ⇌ C + D. Ammonium chloride is one.", "If it's exothermic one way, it's endothermic the other, by the same amount!", "Blue copper sulfate loses water on heating and turns white. Add water, it goes blue and warm again.", "In a closed system, the forward and backward rates become equal: that's equilibrium. Stuff keeps on reacting!"],
  k: "Equilibrium isn't stopped. Like walking up a down escalator at the same speed.",
  q: [["m", "What's true at equilibrium?", "Forward and backward rates are equal", "All reactions have stopped", "All reactants are used up", "The temperature is zero", "Both reactions keep going at the same rate."],
      ["m", "Heating blue hydrated copper sulfate gives...", "White anhydrous copper sulfate", "Black copper", "Red copper", "A green solid", "Water is driven off."],
      ["t", "If a reaction is exothermic forwards, it's endothermic backwards.", true, "Same amount of energy each way."],
      ["m", "Equilibrium needs...", "A closed system", "An open flask", "A catalyst", "Sunlight", "Nothing can escape."]] },

{ t: "Le Chatelier's principle", r: "4.6.2.4 to 4.6.2.7", h: 1, icon: "⚖️",
  c: ["Change the conditions at equilibrium, and the system shifts to oppose it. It's a stubborn thing.", "More reactant? Shifts forward to use it up. Remove product? Forward as well!", "Hotter? Favours the endothermic direction. Colder? The exothermic.", "More pressure? Favours the side with fewer gas molecules. Less pressure? More gas molecules."],
  k: "Whatever you do, equilibrium does the opposite. Sulky teenager rule.",
  q: [["m", "N₂ + 3H₂ ⇌ 2NH₃. Raising pressure shifts equilibrium...", "To the right (fewer gas molecules)", "To the left (more gas molecules)", "Not at all", "Up", "4 molecules become 2."],
      ["m", "The forward reaction is exothermic. Raising temperature gives...", "Less product at equilibrium", "More product at equilibrium", "No change", "A faster forward reaction only", "It favours the endothermic backward direction."],
      ["m", "Adding more reactant shifts equilibrium...", "Towards the products", "Towards the reactants", "Nowhere", "It stops", "It uses up the extra."],
      ["t", "A catalyst changes the position of equilibrium.", false, "It speeds up both ways equally."]] }
], { blurb: "Why reactions go fast or slow, and why some refuse to finish." });

GAME.topic("Organic Orchard", "🛢️", "Paper 2", [
{ t: "Crude oil and alkanes", r: "4.7.1.1", icon: "🛢️",
  c: ["Crude oil is a finite resource, made from ancient plankton. It's mostly hydrocarbons: hydrogen and carbon only.", "Most are alkanes with general formula CₙH₂ₙ₊₂. Saturated: only single bonds.", "The first four: methane, ethane, propane, butane.", "Monkeys Eat Peanut Butter. Delicious, and useful."],
  k: "Monkeys Eat Peanut Butter: Meth, Eth, Prop, But = 1, 2, 3, 4 carbons.",
  q: [["p", "Match the alkane.", [["Methane", "CH₄"], ["Ethane", "C₂H₆"], ["Propane", "C₃H₈"], ["Butane", "C₄H₁₀"]]],
      function () { var n = ri(5, 12); return ["n", "An alkane has " + n + " carbon atoms. How many hydrogens does it have?", 2 * n + 2, "", "CₙH₂ₙ₊₂."]; },
      ["t", "Crude oil is a renewable resource.", false, "It took millions of years to form."]] },

{ t: "Fractional distillation", r: "4.7.1.2", icon: "🏗️", d: "column",
  c: ["Crude oil is heated till it evaporates, then the vapour rises up a column that's hot at the bottom and cool at the top.", "Each fraction condenses at its own height, with similar boiling points.", "Short chains exit near the top: gases, petrol. Long chains exit at the bottom: heavy fuel oil, bitumen.", "Used as fuels, and as feedstock for the petrochemical industry: solvents, plastics, medicines."],
  k: "Gases, Petrol, Kerosene, Diesel, Heavy fuel oil: short chains at the top, long at the bottom.",
  q: [["o", "Order fractions from top of the column downwards.", ["Refinery gases", "Petrol", "Kerosene", "Diesel oil", "Heavy fuel oil"]],
      ["m", "Where do the longest chains leave the column?", "Near the bottom", "At the top", "In the middle", "They evaporate first", "High boiling point."],
      ["t", "The column is hottest at the top.", false, "Hottest at the bottom."]] },

{ t: "Hydrocarbon properties and combustion", r: "4.7.1.3", icon: "🕯️",
  c: ["Short chains: low boiling point, runny, flammable. Long chains: high boiling point, viscous, less flammable.", "Think petrol versus treacle.", "Complete combustion in plenty of oxygen makes carbon dioxide and water, releasing energy.", "CH₄ + 2O₂ → CO₂ + 2H₂O. Hydrocarbon carbon and hydrogen both get oxidised."],
  k: "Longer chain: stickier, hotter to boil, harder to burn.",
  q: [["s", "Sort by chain length.", { "Short chain": ["Low boiling point", "Very flammable", "Runny"], "Long chain": ["High viscosity", "High boiling point", "Hard to ignite"] }],
      ["m", "What does complete combustion of a hydrocarbon make?", "Carbon dioxide and water", "Carbon monoxide only", "Hydrogen only", "Only soot", "Plenty of oxygen."],
      ["n", "Balance: CH₄ + ?O₂ → CO₂ + 2H₂O. What is the number before O₂?", 2, "", "4 oxygen atoms on the right."]] },

{ t: "Cracking and alkenes", r: "4.7.1.4", icon: "🔨",
  c: ["Short chains are in high demand. Long ones aren't. So we crack them!", "Catalytic cracking: heat with a hot catalyst. Steam cracking: heat with steam, at higher temperature.", "It makes shorter alkanes plus alkenes. Alkenes are double-bonded and reactive: great for making polymers.", "Test: bromine water goes from orange to colourless with alkenes. No change with alkanes."],
  k: "Bromine water: alkEne Empties the colour. Alkane does nothing.",
  q: [["m", "C₁₀H₂₂ → C₈H₁₈ + ?", "C₂H₄", "C₂H₆", "CH₄", "C₄H₈", "Balance carbons and hydrogens."],
      ["m", "What happens to bromine water with an alkene?", "Orange to colourless", "Colourless to orange", "No change", "Goes blue", "The bromine adds across the double bond."],
      ["m", "Why is cracking useful?", "Turns long chains into more useful short chains", "Makes oil longer", "Removes all carbon", "Makes only water", "Short chains are in higher demand."]] },

{ t: "Alkenes and their reactions", r: "4.7.2.1, 4.7.2.2", s: 1, icon: "🔗",
  c: ["Alkenes have a C=C double bond, with general formula CₙH₂ₙ. They are unsaturated.", "Ethene, propene, butene, pentene: the first four.", "They burn with smoky flames, and undergo addition reactions: atoms add across the double bond.", "With hydrogen you get alkanes. With water (steam) you get alcohols. With halogens you get dihaloalkanes."],
  k: "Add across the double bond: H₂ → alkane. H₂O → alcohol. Br₂ → dibromo-.",
  q: [["p", "Match the addition product with ethene.", [["Hydrogen", "Ethane"], ["Steam", "Ethanol"], ["Bromine", "Dibromoethane"]]],
      ["n", "How many hydrogens does an alkene with 5 carbons have?", 10, "", "CₙH₂ₙ."],
      ["m", "Why are alkenes unsaturated?", "They contain a C=C double bond", "They are dry", "They have only single bonds", "They contain water", "They can take on more atoms."]] },

{ t: "Alcohols", r: "4.7.2.3", s: 1, icon: "🍷",
  c: ["Alcohols have an −OH group. Methanol, ethanol, propanol, butanol: same MEPB order.", "They burn in air, dissolve in water to make a neutral solution, and react with sodium to give hydrogen. Oxidising them makes carboxylic acids.", "Used as fuels and solvents.", "Fermentation: yeast turns sugar into ethanol and CO₂, around 30 °C, without oxygen."],
  k: "Alcohols end in -ol and have −OH. Fermentation needs yeast, warmth, no air.",
  q: [["p", "Match the alcohol formula.", [["Methanol", "CH₃OH"], ["Ethanol", "C₂H₅OH"], ["Propanol", "C₃H₇OH"]]],
      ["m", "Which conditions are best for fermentation?", "Yeast, about 30 °C, no oxygen", "Yeast, 100 °C, oxygen", "No yeast, ice cold", "A metal catalyst, 300 °C", "Yeast's enzymes work best when warm, not hot."],
      ["m", "Oxidising ethanol gives...", "Ethanoic acid", "Ethene", "Ethane", "Methane", "Vinegar's main acid."]] },

{ t: "Carboxylic acids", r: "4.7.2.4", s: 1, icon: "🍋",
  c: ["They have a −COOH group. Methanoic, ethanoic, propanoic, butanoic acids.", "They're weak acids: react with carbonates, giving CO₂.", "With an alcohol and an acid catalyst, they form esters: sweet-smelling. Ethanol + ethanoic acid → ethyl ethanoate.", "Higher: they only partly ionise, so they have a higher pH than strong acids at the same concentration."],
  k: "Alcohol + acid → ester (+ water). Smells like pear drops.",
  q: [["m", "Ethanoic acid + sodium carbonate →", "Sodium ethanoate + water + CO₂", "Ethanol + salt", "Ethene + water", "Sodium + hydrogen", "Like other acids."],
      ["m", "Ethanol + ethanoic acid (with acid catalyst) →", "Ethyl ethanoate (an ester)", "Ethane", "Poly(ethene)", "Bromoethane", "An ester and water."],
      ["t", "Carboxylic acids are weak acids.", true, "They partly ionise in water."]] },

{ t: "Addition polymers", r: "4.7.3.1", s: 1, icon: "🛍️",
  c: ["Addition polymers form from many alkene monomers. The double bond opens up, and links up the chain.", "Ethene makes poly(ethene). Propene makes poly(propene).", "The repeating unit has the same atoms as the monomer. Only one product forms!", "Draw the repeat unit in brackets, with bonds out the sides, and n."],
  k: "Polymer = Many + mers. Open the double bond, hold hands, and repeat.",
  q: [["m", "Which monomer makes poly(propene)?", "Propene", "Propane", "Propanol", "Ethene", "An alkene."],
      ["t", "Addition polymerisation gives only one product.", true, "All the monomer atoms end up in the polymer."],
      ["m", "What does the n in a polymer formula mean?", "A large number of repeating units", "Nitrogen", "Number of bonds", "Neutral", "n means many."]] },

{ t: "Condensation polymers and amino acids", r: "4.7.3.2, 4.7.3.3", s: 1, h: 1, icon: "👕",
  c: ["Condensation polymers join monomers with two functional groups, losing a small molecule like water each time.", "A diol and a dicarboxylic acid make a polyester, with water!", "Amino acids have an amine and a carboxylic acid group. Glycine is the simplest.", "They condense into polypeptides. Different amino acids make proteins."],
  k: "Condensation loses water, which is why it's like steam on a window. Polyester = diol + diacid.",
  q: [["m", "What small molecule is lost in condensation polymerisation?", "Water", "Oxygen", "Hydrogen", "Methane", "It's the classic one."],
      ["m", "A polyester is made from...", "A diol and a dicarboxylic acid", "Two alkenes", "A salt and an acid", "Two alkanes", "Two different monomers."],
      ["s", "Compare polymers.", { "Addition": ["One product only", "Alkene monomer"], "Condensation": ["Small molecule lost", "Two functional groups"] }]] },

{ t: "DNA and natural polymers", r: "4.7.3.4", s: 1, icon: "🧬",
  c: ["Nature's polymers: DNA, proteins, starch and cellulose.", "DNA has two polymer chains of nucleotides in a double helix, using four bases.", "Proteins come from amino acids. Starch and cellulose come from sugars such as glucose!", "All are essential for life."],
  k: "Sugar makes starch and cellulose. Amino acids make protein. Nucleotides make DNA.",
  q: [["p", "Match each polymer with its monomer.", [["Protein", "Amino acids"], ["Starch", "Glucose"], ["DNA", "Nucleotides"]]],
      ["m", "What's the shape of DNA?", "Double helix", "Straight chain", "Ball", "Triple spiral", "Two strands twist together."],
      ["n", "How many different bases does DNA use?", 4, "", "A, T, C and G."]] }
], { blurb: "Carbon compounds fuel our cars and build our plastics." });
})();
