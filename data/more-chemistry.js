/* Extra practice questions for every Chemistry unit. Functions generate fresh numbers every time. */
(function () {
  const { ri, pick } = GAME;
  const COMPOUNDS = [["H₂O", 18], ["CO₂", 44], ["CaCO₃", 100], ["H₂SO₄", 98], ["NH₃", 17], ["MgO", 40], ["NaOH", 40], ["CH₄", 16], ["Ca(OH)₂", 74], ["NaCl", 58.5]];

  GAME.more({
    "Atoms, elements and compounds": [
      ["s", "Sort these into elements and compounds.", { "Element": ["Oxygen", "Iron", "Neon"], "Compound": ["Water", "Carbon dioxide", "Sodium chloride"] }, "Compounds contain two or more different elements chemically bonded."],
      ["m", "A compound is", "two or more elements chemically joined", "a mixture of elements", "a single type of atom", "a type of mixture", "Its properties differ from the elements in it."],
      ["m", "The formula of carbon dioxide is", "CO₂", "CO", "C₂O", "CaO", "One carbon atom and two oxygen atoms."],
      ["t", "A mixture can be separated by physical methods.", true, "Compounds need a chemical reaction."]
    ],
    "Mixtures and separating": [
      ["p", "Match the mixture to the best separation method.", [["Salt from salt solution", "Crystallisation"], ["Sand from water", "Filtration"], ["Pure water from salt water", "Simple distillation"], ["Ethanol from water", "Fractional distillation"]]],
      ["m", "Filtration separates", "an insoluble solid from a liquid", "two liquids", "dissolved salt from water", "gases", "The solid is trapped in the filter paper."],
      ["t", "Mixtures are held together by chemical bonds.", false, "The substances are not chemically combined."]
    ],
    "Developing the atomic model": [
      ["o", "Order the atomic models, earliest first.", ["Solid sphere (Dalton)", "Plum pudding (Thomson)", "Nuclear model (Rutherford)", "Shells (Bohr)"], "Evidence changed the model over time."],
      ["m", "Bohr suggested that electrons", "orbit the nucleus in shells at fixed distances", "are inside the nucleus", "are positive", "are in a pudding", "His model fitted experimental observations."],
      ["m", "Who found that atoms contain neutrons?", "Chadwick", "Dalton", "Thomson", "Mendeleev", "He discovered them in 1932."]
    ],
    "Protons, neutrons and isotopes": [
      ["n", "How many neutrons are in carbon-14 (atomic number 6)?", 8, "", "14 − 6."],
      ["n", "How many protons are in an atom of sodium, atomic number 11?", 11, "", "The atomic number is the number of protons."],
      ["m", "Isotopes of an element have the same number of", "protons", "neutrons", "nucleons", "mass", "Different numbers of neutrons."],
      ["n", "An atom has 17 protons and 18 neutrons. What is its mass number?", 35, "", "17 + 18."]
    ],
    "Electronic structure": [
      ["m", "What is the electronic structure of magnesium (atomic number 12)?", "2,8,2", "2,8,1", "2,10", "2,2,8", "Fill 2, then 8, then the remaining 2."],
      ["m", "What is the electronic structure of chlorine (atomic number 17)?", "2,8,7", "2,8,8", "2,7,8", "2,9,6", "2 + 8 + 7 = 17."],
      ["n", "How many electrons can the second shell hold?", 8, "", "2, 8, 8 for the first three shells."],
      ["m", "An atom has electronic structure 2,8,1. Which group is it in?", "Group 1", "Group 2", "Group 3", "Group 8", "The group number equals the number of outer electrons."]
    ],
    "The periodic table": [
      ["m", "Elements in the same group have the same number of", "outer electrons", "shells", "protons", "neutrons", "That is why they react in similar ways."],
      ["m", "The period number tells you the number of", "shells", "outer electrons", "protons", "neutrons", "Elements in period 3 have three shells."],
      ["t", "Mendeleev left gaps for undiscovered elements.", true, "He predicted their properties, and he was proved right."],
      ["m", "Elements in the periodic table are arranged by", "increasing atomic number", "increasing mass number only", "colour", "date of discovery", "That is the modern table."]
    ],
    "Metals and non-metals": [
      ["s", "Sort the properties.", { "Metals": ["Conduct electricity", "Malleable", "High melting point"], "Non-metals": ["Brittle when solid", "Poor conductors of heat", "Low melting point"] }, "Most metals are good conductors and malleable."],
      ["m", "Metals form", "positive ions", "negative ions", "no ions", "covalent bonds only", "They lose electrons."],
      ["m", "Which is a non-metal?", "sulfur", "sodium", "iron", "copper", "Sulfur is a yellow solid non-metal."]
    ],
    "Group 0: noble gases": [
      ["m", "Why are noble gases unreactive?", "they have full outer shells", "they are very hot", "they have one outer electron", "they are metals", "They do not need to gain or lose electrons."],
      ["m", "Going down Group 0, the boiling points", "increase", "decrease", "stay the same", "become negative", "Larger atoms have stronger forces between them."],
      ["t", "Noble gases exist as single atoms.", true, "They are monatomic."]
    ],
    "Group 1: alkali metals": [
      ["m", "Going down Group 1, reactivity", "increases", "decreases", "stays the same", "is zero", "The outer electron is lost more easily."],
      ["m", "Group 1 metals react with water to make", "a metal hydroxide and hydrogen", "a metal oxide and oxygen", "a salt and water", "carbon dioxide", "For example 2Na + 2H₂O → 2NaOH + H₂."],
      ["m", "Which colour does universal indicator turn in the solution formed when sodium reacts with water?", "purple", "red", "green", "yellow", "It is alkaline."],
      ["t", "Group 1 metals are stored under oil.", true, "To stop them reacting with air and moisture."]
    ],
    "Group 7: halogens": [
      ["m", "Going down Group 7, reactivity", "decreases", "increases", "stays the same", "is zero", "It is harder to gain an electron in a bigger atom."],
      ["m", "Chlorine is a", "green gas", "red-brown liquid", "grey solid", "colourless gas", "At room temperature."],
      ["m", "Chlorine + potassium bromide gives", "bromine + potassium chloride", "no reaction", "iodine + potassium chloride", "chlorine + bromine", "A more reactive halogen displaces a less reactive one."],
      ["t", "Halogen molecules are diatomic.", true, "For example Cl₂."]
    ],
    "Transition metals": [
      ["m", "Compared with Group 1 metals, transition metals have", "higher melting points and densities", "lower melting points", "lower densities", "more reactivity", "They are harder and stronger."],
      ["m", "Transition metals are often used as", "catalysts", "fuels", "insulators", "solvents", "Iron in the Haber process is an example."],
      ["t", "Transition metal compounds are often coloured.", true, "Copper sulfate is blue."]
    ],

    "Ionic bonding": [
      ["m", "What happens when sodium reacts with chlorine?", "sodium loses an electron to chlorine", "chlorine loses an electron to sodium", "they share electrons", "they form a metal", "Na becomes Na⁺ and Cl becomes Cl⁻."],
      ["m", "Which is the formula of magnesium oxide?", "MgO", "Mg₂O", "MgO₂", "Mg₂O₂", "Mg²⁺ and O²⁻ balance."],
      ["m", "An ionic bond is", "the electrostatic attraction between oppositely charged ions", "a shared pair of electrons", "a bond between metal atoms", "a weak force", "It is strong."],
      ["m", "The charge on a calcium ion is", "2+", "1+", "2−", "1−", "Calcium is in Group 2."]
    ],
    "Covalent bonding": [
      ["m", "A covalent bond is", "a shared pair of electrons", "the attraction between ions", "a bond between metals", "a transfer of electrons", "It forms between non-metal atoms."],
      ["m", "How many covalent bonds does a carbon atom usually form?", "4", "2", "3", "1", "It has four outer electrons."],
      ["m", "The formula of methane is", "CH₄", "CH₂", "C₂H₄", "CH", "One carbon bonded to four hydrogens."],
      ["t", "Water is a simple covalent molecule.", true, "H₂O."]
    ],
    "Metallic bonding and alloys": [
      ["m", "Why do metals conduct electricity?", "delocalised electrons can move", "ions can move", "they contain protons", "they are shiny", "The sea of electrons carries charge."],
      ["m", "An alloy is harder than a pure metal because", "different-sized atoms stop the layers sliding", "it is hotter", "it has more electrons", "it is lighter", "The regular layers are distorted."],
      ["t", "Metals are malleable because the layers of atoms can slide.", true, "The bonding is not broken."]
    ],
    "States of matter": [
      ["m", "Particles in a liquid are", "close together and can move past each other", "far apart", "in a fixed pattern", "stationary", "Liquids can flow."],
      ["m", "Which state has the weakest forces between particles?", "gas", "liquid", "solid", "all the same", "Gas particles are far apart."],
      ["m", "What is the state symbol for an aqueous solution?", "(aq)", "(l)", "(s)", "(g)", "Aqueous means dissolved in water."],
      ["t", "At room temperature a substance with a melting point of 20 °C and boiling point of 60 °C (room at 25 °C) is a liquid.", true, "25 °C is between the melting and boiling points."]
    ],
    "Properties of structures": [
      ["s", "Sort the substances by structure.", { "Giant ionic": ["Sodium chloride", "Magnesium oxide"], "Simple molecular": ["Water", "Carbon dioxide"], "Giant covalent": ["Diamond", "Silicon dioxide"] }, "Structure explains properties."],
      ["m", "Ionic compounds conduct electricity when", "molten or dissolved", "solid", "always", "never", "The ions are free to move."],
      ["m", "Simple molecular substances have low melting points because", "the intermolecular forces are weak", "the covalent bonds are weak", "they have ions", "they are metals", "Only the weak forces are overcome."],
      ["t", "Giant covalent substances have high melting points.", true, "Many strong covalent bonds must be broken."]
    ],
    "Carbon structures": [
      ["m", "Graphite conducts electricity because", "it has delocalised electrons", "it has ions", "it is hard", "it is a metal", "Each carbon uses only three of its four outer electrons for bonding."],
      ["m", "Diamond is very hard because", "each carbon forms four strong covalent bonds", "it has layers", "it has delocalised electrons", "it contains metal ions", "A rigid giant structure."],
      ["m", "Which carbon structure is a cylinder?", "carbon nanotube", "diamond", "graphite", "fullerene C₆₀", "Nanotubes are used in electronics and nanotechnology."],
      ["m", "Graphene is", "a single layer of graphite", "a form of diamond", "a polymer", "an alloy", "It is very strong and conducts well."]
    ],
    "Nanoparticles": [
      ["m", "Nanoparticles are", "1–100 nm in size", "1–100 μm", "1–100 mm", "bigger than a cell", "A nanometre is 10⁻⁹ m."],
      ["m", "Nanoparticles have a large surface area to volume ratio, so they", "are good catalysts", "are heavy", "are all dangerous", "are very cheap", "More surface for reactions."],
      ["t", "The risks of nanoparticles are fully understood.", false, "Their effects on health are still being studied."]
    ],

    "Conservation of mass and Mr": [
      () => { const c = pick(COMPOUNDS.slice(0, 9)); return ["n", "What is the relative formula mass (Mr) of " + c[0] + "? (Ar: H 1, C 12, N 14, O 16, Na 23, Mg 24, S 32, Ca 40)", c[1], "", "Add the relative atomic masses of all atoms."]; },
      ["n", "Calcium carbonate (CaCO₃, Mr 100) decomposes. 10 g makes 5.6 g of calcium oxide. What mass of carbon dioxide is lost?", 4.4, "g", "Mass is conserved: 10 − 5.6."],
      ["m", "Mass can appear to increase in a reaction when", "a gas from the air is a reactant", "a gas is made and escapes", "mass is created", "the reaction is endothermic", "For example metals reacting with oxygen."],
      ["m", "Mass appears to decrease when", "a gas is produced and escapes", "a solid is made", "a reaction is exothermic", "water is added", "The gas carries mass away."]
    ],
    "Uncertainty in measurements": [
      ["n", "Readings are 12.1, 12.3 and 12.2. What is the mean?", 12.2, "", "36.6 ÷ 3."],
      ["m", "The uncertainty of a mean is half the", "range", "mean", "largest value", "smallest value", "Uncertainty = range ÷ 2."],
      ["n", "Readings of 12.1, 12.3 and 12.2 have a range of 0.2. What is the uncertainty of the mean?", 0.1, "", "0.2 ÷ 2."]
    ],
    "Moles": [
      () => { const c = pick(COMPOUNDS), k = pick([0.25, 0.5, 1, 2, 3]); return ["n", "How many moles are in " + c[1] * k + " g of " + c[0] + "? (Mr = " + c[1] + ")", k, "mol", "moles = mass ÷ Mr."]; },
      () => { const c = pick(COMPOUNDS), k = pick([0.5, 1, 2, 3]); return ["n", "What is the mass of " + k + " mol of " + c[0] + "? (Mr = " + c[1] + ")", c[1] * k, "g", "mass = moles × Mr."]; },
      ["n", "How many atoms are in 1 mole of carbon? (Avogadro constant = 6.02 × 10<sup>23</sup>; type 6.02e23)", 6.02e23, "", "One mole contains 6.02 × 10²³ particles."],
      ["m", "The Avogadro constant is", "6.02 × 10²³", "3.0 × 10⁸", "6.02 × 10⁻²³", "602", "Particles per mole."]
    ],
    "Masses from equations and limiting reactants": [
      ["n", "2Mg + O₂ → 2MgO. What mass of MgO forms from 12 g of Mg? (Ar Mg 24, O 16)", 20, "g", "0.5 mol Mg gives 0.5 mol MgO, 0.5 × 40."],
      ["n", "CaCO₃ → CaO + CO₂. What mass of CaO forms from 50 g of CaCO₃? (Mr CaCO₃ 100, CaO 56)", 28, "g", "0.5 mol × 56."],
      ["m", "The limiting reactant is the one that", "is used up first", "is in excess", "is a catalyst", "is a gas", "It determines how much product forms."],
      ["m", "In 2H₂ + O₂ → 2H₂O, the ratio of moles of hydrogen to water is", "1 : 1", "2 : 1", "1 : 2", "1 : 3", "Both coefficients are 2."]
    ],
    "Concentration": [
      () => { const V = pick([0.5, 1, 2, 4]), g = pick([10, 20, 40, 50]) * V; return ["n", g + " g of solute is dissolved to make " + V + " dm³ of solution. What is the concentration?", g / V, "g/dm³", "Concentration = mass ÷ volume."]; },
      ["n", "A solution has concentration 25 g/dm³. How much solute is in 2 dm³?", 50, "g", "25 × 2."],
      ["n", "Convert 250 cm³ to dm³.", 0.25, "dm³", "Divide by 1000."]
    ],
    "Percentage yield": [
      () => { const T = ri(2, 10) * 10, f = pick([0.5, 0.6, 0.75, 0.8, 0.9]); return ["n", "The theoretical yield is " + T + " g. The actual yield is " + T * f + " g. What is the percentage yield?", f * 100, "%", "Actual ÷ theoretical × 100."]; },
      ["m", "Why is the percentage yield often less than 100%?", "the reaction is reversible, some product is lost, or side reactions occur", "mass is destroyed", "the reaction is too fast", "catalysts use it up", "Many factors reduce yield."],
      ["n", "A reaction should give 40 g but gives 30 g. What is the percentage yield?", 75, "%", "30 ÷ 40."]
    ],
    "Atom economy": [
      ["n", "CaCO₃ → CaO + CO₂. Find the atom economy for making CaO. (Mr CaO 56, CaCO₃ 100)", 56, "%", "56 ÷ 100 × 100."],
      ["m", "A high atom economy means", "most of the reactant atoms end up in the useful product", "the reaction is fast", "the yield is 100%", "it is exothermic", "Less waste."],
      ["m", "Which reaction type usually has a 100% atom economy?", "addition", "decomposition", "displacement", "neutralisation", "All the atoms end up in one product."]
    ],
    "Concentration in mol/dm³": [
      () => { const n = pick([0.1, 0.2, 0.5]), V = pick([100, 250, 500]); return ["n", n + " mol of solute is dissolved to make " + V + " cm³ of solution. What is the concentration?", Math.round(n / (V / 1000) * 1000) / 1000, "mol/dm³", "Concentration = moles ÷ volume in dm³."]; },
      ["n", "How many moles are in 50 cm³ of 2 mol/dm³ solution?", 0.1, "mol", "2 × 0.05."],
      ["n", "What mass of NaOH (Mr 40) is needed to make 250 cm³ of 0.5 mol/dm³ solution?", 5, "g", "0.125 mol × 40."]
    ],
    "Volumes of gases": [
      () => { const n = pick([0.25, 0.5, 1, 2, 3]); return ["n", "What volume does " + n + " mol of any gas occupy at room temperature and pressure? (24 dm³/mol)", n * 24, "dm³", "Volume = moles × 24."]; },
      ["n", "How many moles are in 12 dm³ of a gas at room temperature and pressure?", 0.5, "mol", "12 ÷ 24."],
      ["n", "How many dm³ of hydrogen are made from 1 mol of magnesium? (Mg + 2HCl → MgCl₂ + H₂)", 24, "dm³", "1 mol H₂ × 24."]
    ],

    "Reactivity series": [
      ["o", "Order from most to least reactive.", ["Potassium", "Sodium", "Calcium", "Magnesium", "Zinc", "Iron", "Copper"], "Please Stop Calling Me A Careless Zebra, Instead Try Learning How Copper Saves Gold."],
      ["m", "Magnesium + copper sulfate →", "magnesium sulfate + copper", "no reaction", "copper oxide", "magnesium + copper", "Magnesium is more reactive so it displaces copper."],
      ["m", "Which metal does not react with dilute acid?", "copper", "zinc", "magnesium", "iron", "It is below hydrogen in the reactivity series."],
      ["t", "A more reactive metal displaces a less reactive metal from its compound.", true, "That is a displacement reaction."]
    ],
    "Extracting metals": [
      ["m", "Iron is extracted from iron oxide by", "reduction with carbon", "electrolysis", "oxidation", "filtration", "Carbon is more reactive than iron."],
      ["m", "Metals more reactive than carbon are extracted by", "electrolysis", "heating with carbon", "filtration", "evaporation", "They hold on to oxygen too strongly."],
      ["m", "Gold is found as the element because it is", "very unreactive", "very reactive", "a gas", "magnetic", "It does not react with other substances."]
    ],
    "Redox and electrons": [
      ["m", "Oxidation is", "loss of electrons", "gain of electrons", "loss of oxygen", "gain of hydrogen", "OIL RIG: Oxidation Is Loss."],
      ["m", "Reduction is", "gain of electrons", "loss of electrons", "gain of oxygen", "loss of hydrogen", "RIG: Reduction Is Gain."],
      ["m", "In Mg + Cu²⁺ → Mg²⁺ + Cu, magnesium is", "oxidised", "reduced", "neither", "a spectator ion", "It loses electrons."]
    ],
    "Acids and their reactions": [
      ["m", "Acid + metal carbonate gives", "a salt, water and carbon dioxide", "a salt and hydrogen", "a salt and water only", "a metal and water", "For example HCl + CaCO₃."],
      ["m", "Acid + metal oxide gives", "a salt and water", "a salt and hydrogen", "a salt and carbon dioxide", "an alkali", "A neutralisation reaction."],
      ["m", "Hydrochloric acid always makes", "chloride salts", "sulfate salts", "nitrate salts", "carbonate salts", "H Cl → chloride."],
      ["m", "Acid + alkali gives", "a salt and water", "hydrogen", "carbon dioxide", "a base", "It is neutralisation."],
      ["m", "Sulfuric acid makes", "sulfates", "chlorides", "nitrates", "oxides", "Sulfuric → sulfate."]
    ],
    "Making soluble salts": [
      ["o", "Order the steps for making a pure dry sample of a salt from an insoluble base.", ["Add the base to warm acid until in excess", "Filter off the excess solid", "Heat the filtrate to evaporate some water", "Leave to crystallise", "Dry the crystals"], "The excess base ensures all the acid reacts."],
      ["m", "Why is the base added in excess?", "to make sure all the acid reacts", "to speed up the reaction", "to make crystals bigger", "to cool the mixture", "Then the leftover solid is easy to filter."],
      ["m", "Which salt is made from nitric acid and sodium hydroxide?", "sodium nitrate", "sodium nitride", "sodium chloride", "sodium sulfate", "Nitric acid gives nitrates."]
    ],
    "The pH scale": [
      ["m", "A solution with pH 3 is", "acidic", "neutral", "alkaline", "a salt", "Below 7 is acidic."],
      ["m", "Which ion makes a solution acidic?", "H⁺", "OH⁻", "Na⁺", "Cl⁻", "Acids release hydrogen ions."],
      ["m", "Universal indicator in a strong alkali is", "purple", "red", "green", "yellow", "pH 14 is purple."],
      ["m", "Neutral pH is", "7", "0", "14", "1", "Equal H⁺ and OH⁻."]
    ],
    "Titrations": [
      ["n", "25.0 cm³ of 0.1 mol/dm³ NaOH is neutralised by 20.0 cm³ of HCl. What is the concentration of the HCl?", 0.125, "mol/dm³", "Moles NaOH = 0.0025, so HCl = 0.0025 ÷ 0.02."],
      ["m", "In a titration, the burette is used to", "add one solution drop by drop", "heat the mixture", "weigh the solid", "filter the solution", "It measures the volume added."],
      ["m", "The end point of a titration is when", "the indicator changes colour", "the solution boils", "all the acid is used up with no alkali", "the volume reaches 25 cm³", "The solutions have exactly reacted."],
      ["m", "In a titration you should repeat until you get", "concordant results", "an anomalous result", "the same indicator", "a precipitate", "Results within 0.1 cm³ of each other."]
    ],
    "Strong and weak acids": [
      ["m", "A strong acid is one that", "is completely ionised in water", "is very concentrated", "has pH 7", "is only partially ionised", "Strong refers to ionisation, not concentration."],
      ["m", "Ethanoic acid is a weak acid because", "it only partially ionises", "it is dilute", "it contains no hydrogen", "it is a base", "An equilibrium is set up."],
      ["m", "A pH decrease of 1 means the concentration of H⁺ is", "ten times greater", "two times greater", "ten times smaller", "the same", "pH is a logarithmic scale."]
    ],
    "Electrolysis basics": [
      ["m", "At the cathode", "positive ions gain electrons", "negative ions gain electrons", "positive ions lose electrons", "nothing happens", "The cathode is the negative electrode."],
      ["m", "At the anode", "negative ions lose electrons", "positive ions lose electrons", "ions gain electrons", "water is made", "Oxidation happens at the anode."],
      ["m", "Electrolysis of molten lead bromide produces", "lead and bromine", "lead oxide", "hydrogen and bromine", "lead and hydrogen", "The compound is broken down into elements."],
      ["t", "A solid ionic compound can be electrolysed.", false, "The ions must be free to move: molten or dissolved."]
    ],
    "Extracting aluminium": [
      ["m", "Aluminium is extracted by", "electrolysis of molten aluminium oxide", "heating with carbon", "filtration", "displacement with iron", "It is more reactive than carbon."],
      ["m", "Cryolite is added to aluminium oxide to", "lower the melting point", "raise the melting point", "make it dissolve in water", "stop the reaction", "This saves energy."],
      ["m", "The positive carbon electrodes must be replaced regularly because", "they burn away in oxygen", "they dissolve", "they melt", "they become magnetic", "Oxygen reacts with hot carbon to form CO₂."]
    ],
    "Electrolysis of solutions": [
      ["m", "In the electrolysis of sodium chloride solution, the product at the cathode is", "hydrogen", "sodium", "chlorine", "oxygen", "Hydrogen is less reactive than sodium."],
      ["m", "In the electrolysis of sodium chloride solution, the product at the anode is", "chlorine", "hydrogen", "oxygen", "sodium", "Chloride ions are discharged."],
      ["m", "Electrolysis of copper sulfate solution with inert electrodes gives", "copper at the cathode and oxygen at the anode", "hydrogen and oxygen", "copper and hydrogen", "sulfur", "Copper is less reactive than hydrogen."]
    ],
    "Half equations": [
      ["m", "Which is the half equation at the cathode for Al³⁺?", "Al³⁺ + 3e⁻ → Al", "Al → Al³⁺ + 3e⁻", "Al³⁺ → Al + 3e⁻", "Al + 3e⁻ → Al³⁺", "Positive ions gain electrons."],
      ["m", "Which half equation shows oxidation?", "2Cl⁻ → Cl₂ + 2e⁻", "Cu²⁺ + 2e⁻ → Cu", "Na⁺ + e⁻ → Na", "2H⁺ + 2e⁻ → H₂", "Oxidation is loss of electrons."],
      ["m", "Balance: 4OH⁻ → O₂ + 2H₂O + ?e⁻", "4e⁻", "2e⁻", "1e⁻", "8e⁻", "Charge must balance: 4 negative charges."],
      ["m", "Which half equation is at the cathode?", "2H⁺ + 2e⁻ → H₂", "2H₂O → O₂ + 4H⁺ + 4e⁻", "2Br⁻ → Br₂ + 2e⁻", "Pb → Pb²⁺ + 2e⁻", "Electrons are on the left at the cathode."]
    ],

    "Exothermic and endothermic": [
      ["s", "Sort the reactions.", { "Exothermic": ["Combustion", "Neutralisation", "Respiration"], "Endothermic": ["Thermal decomposition", "Photosynthesis", "Dissolving ammonium nitrate"] }, "Exothermic reactions transfer energy to the surroundings."],
      ["m", "In an exothermic reaction the temperature of the surroundings", "increases", "decreases", "stays the same", "falls to 0", "Energy is released."],
      ["m", "Hand warmers use an", "exothermic reaction", "endothermic reaction", "physical change only", "electrolysis", "They release heat."]
    ],
    "Reaction profiles": [
      ["m", "The activation energy is", "the minimum energy needed for a reaction to occur", "the energy released", "the energy of the products", "the temperature", "It is the energy hill on a profile."],
      ["m", "On the profile of an exothermic reaction the products are", "lower in energy than the reactants", "higher in energy", "at the same energy", "at zero energy", "Energy is released."],
      ["t", "A catalyst lowers the activation energy.", true, "It provides an alternative pathway."]
    ],
    "Bond energies": [
      ["n", "H₂ + Cl₂ → 2HCl. Bond energies: H–H 436, Cl–Cl 243, H–Cl 432 (kJ/mol). What is the energy change?", -185, "kJ/mol", "Broken 679, made 864; 679 − 864."],
      ["m", "Energy is needed to", "break bonds", "make bonds", "form products", "cool surroundings", "Breaking bonds is endothermic."],
      ["m", "If more energy is released making bonds than is needed to break bonds, the reaction is", "exothermic", "endothermic", "reversible", "slow", "The overall energy change is negative."]
    ],
    "Cells and batteries": [
      ["m", "A simple cell is made from", "two different metals in an electrolyte", "two identical metals", "one metal in water", "a metal and plastic", "The difference in reactivity creates a voltage."],
      ["m", "The voltage of a cell depends on", "the difference in reactivity of the metals", "the size of the cell", "its colour", "the temperature only", "The bigger the difference, the bigger the voltage."],
      ["t", "A rechargeable battery can be restored by passing a current through it.", true, "The reactions are reversed."]
    ],
    "Fuel cells": [
      ["m", "In a hydrogen fuel cell the only product is", "water", "carbon dioxide", "hydrogen peroxide", "nitrogen", "2H₂ + O₂ → 2H₂O."],
      ["m", "A fuel cell differs from a battery because", "the reactants are supplied continuously", "it has no electrolyte", "it makes no voltage", "it is rechargeable only", "It keeps working while fuel is supplied."],
      ["m", "A disadvantage of hydrogen fuel cells is", "hydrogen is hard to store", "they produce CO₂", "they make a lot of waste", "they are very heavy", "It is a flammable gas."]
    ],

    "Calculating rates": [
      () => { const V = ri(2, 12) * 10, t = ri(2, 10) * 5; return ["n", V + " cm³ of gas is made in " + t + " s. What is the mean rate?", Math.round(V / t * 100) / 100, "cm³/s", "Rate = amount ÷ time.", 0.01]; },
      ["m", "The rate of a reaction can be found by measuring", "the volume of gas or the loss in mass over time", "the colour of the container", "the pH only", "the temperature of the room", "How fast reactants are used or products formed."],
      ["m", "On a rate graph a steeper line means", "a faster rate", "a slower rate", "a finished reaction", "no reaction", "The gradient shows the rate."]
    ],
    "Collision theory and rate factors": [
      ["m", "Increasing temperature speeds up a reaction because", "particles collide more often and with more energy", "there are more particles", "the activation energy is lower", "it makes the reaction exothermic", "More collisions are successful."],
      ["m", "Increasing the concentration speeds up a reaction because", "there are more collisions per second", "the particles have more energy", "the activation energy falls", "the particles get bigger", "More particles in the same space."],
      ["m", "Powdered solids react faster than lumps because", "they have a larger surface area", "they are heavier", "they have more energy", "they are cooler", "More surface is exposed to collisions."],
      ["t", "Increasing the pressure speeds up reactions between gases.", true, "The particles are closer together."]
    ],
    "Catalysts": [
      ["m", "A catalyst", "speeds up a reaction without being used up", "is a reactant", "slows a reaction down", "is used up", "It is unchanged at the end."],
      ["m", "A catalyst works by", "providing an alternative pathway with lower activation energy", "increasing the temperature", "increasing concentration", "adding energy", "More collisions are successful."],
      ["t", "Enzymes are biological catalysts.", true, "They speed up reactions in living things."]
    ],
    "Reversible reactions and equilibrium": [
      ["m", "Dynamic equilibrium means", "the forward and reverse reactions occur at the same rate", "the reaction has stopped", "no products are made", "the reactant is gone", "Concentrations stay constant."],
      ["m", "Equilibrium can only be reached in", "a closed system", "an open system", "a gas only", "a cold system", "Nothing can escape."],
      ["m", "The symbol ⇌ shows", "a reversible reaction", "an irreversible reaction", "a catalyst", "heating", "Both directions are possible."]
    ],
    "Le Chatelier's principle": [
      ["m", "Increasing the pressure shifts equilibrium towards", "the side with fewer gas molecules", "the side with more gas molecules", "the reactants always", "neither side", "The system reduces the change."],
      ["m", "Increasing the temperature shifts equilibrium in the direction of", "the endothermic reaction", "the exothermic reaction", "the products always", "no change", "It absorbs the extra heat."],
      ["m", "Adding more reactant shifts equilibrium", "towards the products", "towards the reactants", "nowhere", "to the left", "The system uses up the extra."],
      ["t", "A catalyst changes the position of equilibrium.", false, "It speeds up both directions equally."]
    ],

    "Crude oil and alkanes": [
      ["m", "Crude oil is mainly", "a mixture of hydrocarbons", "a single compound", "a pure element", "water", "Hydrocarbons contain only hydrogen and carbon."],
      ["m", "The general formula of the alkanes is", "CₙH₂ₙ₊₂", "CₙH₂ₙ", "CₙHₙ", "C₂Hₙ", "For example C₃H₈."],
      ["m", "What is the formula of propane?", "C₃H₈", "C₃H₆", "C₂H₆", "C₄H₁₀", "n = 3, so 2n + 2 = 8."]
    ],
    "Fractional distillation": [
      ["m", "In fractional distillation, fractions are separated by differences in", "boiling points", "melting points", "density only", "colour", "Each fraction condenses at a different temperature."],
      ["m", "Which fraction has the shortest molecules?", "refinery gases", "bitumen", "diesel", "fuel oil", "They are at the top of the column."],
      ["m", "Longer hydrocarbon chains have", "higher boiling points and are more viscous", "lower boiling points", "lower viscosity", "higher flammability", "Stronger intermolecular forces."]
    ],
    "Hydrocarbon properties and combustion": [
      ["m", "Complete combustion of a hydrocarbon produces", "carbon dioxide and water", "carbon monoxide and water", "carbon and hydrogen", "only carbon dioxide", "With plenty of oxygen."],
      ["m", "Incomplete combustion can produce", "carbon monoxide and soot", "only water", "hydrogen", "nitrogen", "Not enough oxygen."],
      ["m", "Why is carbon monoxide dangerous?", "it is toxic: it stops blood carrying oxygen", "it is acidic", "it is explosive", "it is radioactive", "It binds to haemoglobin."],
      ["t", "Short-chain hydrocarbons are more flammable than long-chain ones.", true, "They are more volatile."]
    ],
    "Cracking and alkenes": [
      ["m", "Cracking is", "breaking long hydrocarbons into shorter, more useful ones", "joining small molecules", "burning fuel", "distillation", "It uses heat and a catalyst."],
      ["m", "Alkenes are different from alkanes because they", "contain a carbon–carbon double bond", "contain oxygen", "have only single bonds", "are saturated", "That makes them unsaturated."],
      ["m", "Bromine water changes from orange to colourless with", "an alkene", "an alkane", "water", "salt", "Alkenes react with bromine water."]
    ],
    "Alkenes and their reactions": [
      ["m", "Ethene + hydrogen gives", "ethane", "ethanol", "propane", "water", "An addition reaction."],
      ["m", "Ethene + steam gives", "ethanol", "ethane", "ethanoic acid", "water", "An addition reaction with a phosphoric acid catalyst."],
      ["m", "The general formula of the alkenes is", "CₙH₂ₙ", "CₙH₂ₙ₊₂", "CₙHₙ", "CH₂", "For example C₂H₄."]
    ],
    "Alcohols": [
      ["m", "The functional group in alcohols is", "–OH", "–COOH", "C=C", "–Cl", "Hydroxyl group."],
      ["m", "Ethanol burns to make", "carbon dioxide and water", "carbon monoxide", "ethane", "hydrogen", "Complete combustion."],
      ["m", "Ethanol can be made by", "fermentation of sugar using yeast", "cracking", "distillation of crude oil", "photosynthesis", "Anaerobic conditions at about 30 °C."]
    ],
    "Carboxylic acids": [
      ["m", "The functional group in carboxylic acids is", "–COOH", "–OH", "C=C", "–CHO", "A carboxyl group."],
      ["m", "Ethanoic acid is formed by", "oxidising ethanol", "cracking", "adding hydrogen", "distilling water", "Oxidation of ethanol, e.g. in vinegar."],
      ["m", "Carboxylic acids react with carbonates to make", "a salt, water and carbon dioxide", "an alcohol", "hydrogen", "an ester only", "Like other acids."]
    ],
    "Addition polymers": [
      ["m", "Addition polymers are made from", "alkenes", "alkanes", "alcohols", "acids", "The double bond opens up."],
      ["m", "The monomer of poly(ethene) is", "ethene", "ethane", "propene", "ethanol", "Many ethene molecules join."],
      ["t", "Addition polymerisation produces only one product.", true, "All the atoms end up in the polymer."]
    ],
    "Condensation polymers and amino acids": [
      ["m", "Condensation polymerisation makes the polymer and also", "a small molecule such as water", "an alkene", "carbon dioxide", "no other product", "That is why it is called condensation."],
      ["m", "An amino acid contains", "an amino group and a carboxyl group", "two alcohol groups", "a double bond only", "a halogen", "NH₂ and COOH."],
      ["m", "Polyesters are made from", "a diol and a dicarboxylic acid", "alkenes", "amino acids only", "sugars only", "They join by ester links."]
    ],
    "DNA and natural polymers": [
      ["m", "DNA is a polymer made of", "nucleotides", "amino acids", "sugars", "fatty acids", "Four different bases."],
      ["m", "Proteins are polymers of", "amino acids", "nucleotides", "glucose", "alkenes", "Joined by peptide links."],
      ["m", "Starch is a polymer of", "glucose", "amino acids", "ethene", "nucleotides", "A natural polymer of sugar units."]
    ],

    "Purity and formulations": [
      ["m", "In chemistry a pure substance is", "a single element or compound", "a mixture of two things", "something natural", "something safe to drink", "It has fixed melting and boiling points."],
      ["m", "A formulation is", "a mixture designed for a particular use", "a pure compound", "a gas", "an alloy only", "Paints, fuels and medicines are examples."],
      ["m", "A pure substance melts", "at one sharp temperature", "over a range of temperatures", "at 0 °C", "never", "Mixtures melt over a range."]
    ],
    "Chromatography": [
      ["n", "A spot travels 3 cm and the solvent front travels 6 cm. What is the Rf value?", 0.5, "", "Rf = distance by spot ÷ distance by solvent."],
      ["m", "In paper chromatography the mobile phase is", "the solvent", "the paper", "the pencil line", "the spot", "It moves up the paper."],
      ["m", "The start line is drawn in pencil because", "ink would dissolve and run", "pencil is cheaper", "pencil is darker", "ink is toxic", "Pencil does not dissolve in the solvent."],
      ["m", "A pure substance gives", "one spot", "two spots", "no spots", "a streak only", "It contains one compound."]
    ],
    "Gas tests": [
      ["p", "Match the gas to its test result.", [["Hydrogen", "Squeaky pop with a lit splint"], ["Oxygen", "Relights a glowing splint"], ["Carbon dioxide", "Turns limewater cloudy"], ["Chlorine", "Bleaches damp litmus paper"]]],
      ["m", "Limewater turns cloudy with", "carbon dioxide", "oxygen", "hydrogen", "chlorine", "A calcium carbonate precipitate forms."],
      ["m", "A glowing splint relights in", "oxygen", "hydrogen", "carbon dioxide", "chlorine", "Oxygen supports combustion."]
    ],
    "Flame tests": [
      ["p", "Match the metal ion to its flame colour.", [["Lithium", "Crimson"], ["Sodium", "Yellow"], ["Potassium", "Lilac"], ["Calcium", "Orange-red"], ["Copper", "Green"]]],
      ["m", "A yellow flame indicates", "sodium ions", "potassium ions", "copper ions", "lithium ions", "Sodium gives a bright yellow flame."],
      ["m", "A problem with flame tests is that", "a mixture of ions can mask colours", "they are slow", "they need an expensive machine", "they only work with gases", "Instrumental methods are more reliable."]
    ],
    "Metal hydroxide precipitates": [
      ["p", "Match the ion to its hydroxide precipitate.", [["Copper(II)", "Blue"], ["Iron(II)", "Green"], ["Iron(III)", "Brown"]]],
      ["m", "Adding sodium hydroxide gives a white precipitate that dissolves in excess. The ion could be", "aluminium", "copper", "iron(II)", "calcium", "Aluminium hydroxide is amphoteric."],
      ["m", "Adding sodium hydroxide gives a white precipitate that does NOT dissolve in excess. The ion could be", "calcium or magnesium", "aluminium", "copper", "iron", "Calcium and magnesium hydroxides are white and insoluble."]
    ],
    "Testing negative ions": [
      ["m", "Carbonates are tested with", "dilute acid, then limewater", "silver nitrate", "barium chloride", "flame", "They give carbon dioxide."],
      ["m", "Sulfate ions give a white precipitate with", "barium chloride", "silver nitrate", "limewater", "sodium hydroxide", "Barium sulfate is insoluble."],
      ["m", "Chloride ions give a white precipitate with", "silver nitrate (after nitric acid)", "barium chloride", "limewater", "litmus", "Silver chloride."]
    ],
    "Instrumental analysis": [
      ["m", "Instrumental methods are used because they are", "accurate, fast and sensitive", "cheap and simple", "slow", "less reliable", "They detect tiny amounts."],
      ["m", "In mass spectrometry the molecular ion peak shows", "the relative molecular mass", "the number of atoms", "the colour", "the boiling point", "The peak with the highest mass-to-charge ratio."],
      ["m", "Flame emission spectroscopy is used to identify", "metal ions", "gases", "organic acids", "polymers", "Each gives a characteristic spectrum."]
    ],

    "Today's and early atmosphere": [
      ["m", "About how much of today's atmosphere is nitrogen?", "78%", "21%", "1%", "0.04%", "Oxygen is 21%."],
      ["m", "The early atmosphere was mainly", "carbon dioxide", "oxygen", "nitrogen", "hydrogen", "From volcanic activity."],
      ["m", "Oceans formed when", "water vapour condensed", "volcanoes erupted", "the Earth heated", "ice melted", "The Earth cooled."]
    ],
    "How oxygen rose and CO₂ fell": [
      ["m", "Oxygen levels increased due to", "photosynthesis by algae and plants", "volcanoes", "burning fuels", "the oceans", "They released oxygen."],
      ["m", "Carbon dioxide levels fell because", "it dissolved in oceans and was locked in sedimentary rocks and fossil fuels", "plants stopped growing", "volcanoes stopped", "it turned into oxygen", "It was absorbed and stored."],
      ["m", "Which is a carbon store formed from marine organisms?", "limestone", "granite", "sand", "clay", "Calcium carbonate from shells."]
    ],
    "Greenhouse gases": [
      ["m", "Which is a greenhouse gas?", "methane", "oxygen", "nitrogen", "argon", "Along with carbon dioxide and water vapour."],
      ["m", "Greenhouse gases keep the Earth warm by", "absorbing infrared radiation and re-emitting it", "reflecting sunlight", "making oxygen", "cooling the oceans", "They trap thermal energy."],
      ["t", "Human activities are increasing the amount of greenhouse gases.", true, "Burning fossil fuels and farming."]
    ],
    "Climate change and carbon footprints": [
      ["m", "A carbon footprint is", "the total greenhouse gases emitted by an activity or product", "the size of a shoe", "carbon in a diamond", "a type of fuel", "Mostly CO₂ and methane."],
      ["m", "Which would reduce a carbon footprint?", "using renewable energy", "driving more", "burning more coal", "deforestation", "Less fossil fuel use."],
      ["m", "A possible effect of climate change is", "rising sea levels", "less carbon dioxide", "cooler summers everywhere", "less rainfall everywhere", "Ice melts and water expands."]
    ],
    "Atmospheric pollutants": [
      ["m", "Which gas causes acid rain?", "sulfur dioxide", "oxygen", "nitrogen", "argon", "It dissolves in water to form acids."],
      ["m", "Oxides of nitrogen are formed", "in car engines at high temperature", "by photosynthesis", "by plants", "by the sea", "Nitrogen and oxygen react."],
      ["m", "Particulates can cause", "global dimming and respiratory problems", "ozone", "acid rain", "global warming only", "Tiny solid particles."],
      ["m", "Carbon monoxide is formed by", "incomplete combustion", "complete combustion", "photosynthesis", "respiration only", "Not enough oxygen."]
    ],

    "Sustainable development": [
      ["m", "Sustainable development means", "meeting present needs without harming future generations", "using resources as fast as possible", "stopping all industry", "only using plastics", "Think of the long term."],
      ["t", "Using finite resources faster than they form is not sustainable.", true, "They will run out."]
    ],
    "Drinking water": [
      ["o", "Order the main stages for making drinking water from fresh water.", ["Choose a suitable source", "Filter", "Sterilise with chlorine", "Distribute"], "Filtration removes solids and chlorine kills microbes."],
      ["m", "Desalination can be done using", "distillation or reverse osmosis", "filtration only", "chlorination", "sedimentation", "They need a lot of energy."],
      ["m", "Potable water is", "safe to drink", "pure water", "salty", "distilled", "It may still contain dissolved substances."]
    ],
    "Waste water": [
      ["m", "Sewage treatment includes", "removing solids, then using bacteria to break down organic matter", "adding salt", "boiling", "freezing", "Aerobic and anaerobic digestion."],
      ["m", "Why is sewage treated before release?", "to remove harmful microbes and chemicals", "to make it colourful", "to add oxygen", "to cool it", "It protects the environment and people."],
      ["t", "Waste water from industry may need extra treatment.", true, "It may contain harmful chemicals."]
    ],
    "Alternative metal extraction": [
      ["m", "Phytomining uses", "plants to absorb metal compounds", "bacteria only", "electrolysis", "carbon", "The plants are burned to give ash with the metal."],
      ["m", "Bioleaching uses", "bacteria to separate metals from ores", "plants", "heat", "acid rain", "Useful for low-grade ores."],
      ["m", "These methods are useful because they", "extract metals from low-grade ores", "are faster", "need no land", "never fail", "They reduce the need to mine high-grade ores."]
    ],
    "Life cycle assessments": [
      ["m", "A life cycle assessment looks at the impact of a product", "from raw materials to disposal", "only in use", "only in manufacture", "only in disposal", "It covers all stages."],
      ["m", "Which is a stage in a life cycle assessment?", "obtaining raw materials", "choosing a colour", "advertising", "pricing", "Together with manufacture, use and disposal."],
      ["t", "Life cycle assessments can be biased by selective use of data.", true, "Values may be subjective."]
    ],
    "Reducing resource use": [
      ["m", "Recycling metals saves", "energy and ores", "nothing", "only money", "only time", "Less mining and extraction."],
      ["m", "Which is a way to reduce resource use?", "reuse and recycle materials", "throw things away", "use more packaging", "burn waste", "Reuse needs fewer resources."]
    ],
    "Corrosion and prevention": [
      ["m", "Rusting needs", "oxygen and water", "oxygen only", "water only", "carbon dioxide", "Both must be present."],
      ["m", "Sacrificial protection uses", "a more reactive metal that corrodes instead", "paint", "oil", "plastic", "Zinc protects iron."],
      ["m", "Galvanising iron means coating it with", "zinc", "copper", "tin only", "plastic", "It protects even if scratched."]
    ],
    "Useful alloys": [
      ["m", "Steel is an alloy of iron and", "carbon", "copper", "tin", "zinc", "It is stronger than pure iron."],
      ["m", "Brass is an alloy of", "copper and zinc", "copper and tin", "iron and carbon", "aluminium and copper", "Used for instruments and fittings."],
      ["m", "Solder is an alloy used to", "join electrical components", "make cables", "build bridges", "make coins", "It has a low melting point."]
    ],
    "Ceramics, polymers and composites": [
      ["m", "A composite is", "a material made of two or more materials with different properties", "a pure metal", "a type of plastic", "a ceramic only", "Fibreglass is an example."],
      ["m", "Thermosetting polymers", "do not soften when heated", "melt easily", "are always flexible", "are metals", "They have cross-links."],
      ["m", "Ceramics are usually", "hard and brittle", "flexible", "good conductors", "low melting", "Pottery and glass are examples."]
    ],
    "The Haber process": [
      ["m", "The Haber process makes", "ammonia", "ethanol", "nitric acid", "hydrogen", "From nitrogen and hydrogen."],
      ["m", "The conditions for the Haber process are", "450 °C, 200 atmospheres and an iron catalyst", "100 °C and no catalyst", "20 °C and 1 atmosphere", "1000 °C", "A compromise between rate and yield."],
      ["m", "The nitrogen for the Haber process comes from", "the air", "natural gas", "water", "limestone", "About 78% of air."],
      ["m", "The hydrogen for the Haber process comes from", "natural gas", "the air", "limestone", "salt", "Methane reacts with steam."]
    ],
    "NPK fertilisers": [
      ["m", "NPK fertilisers contain compounds of", "nitrogen, phosphorus and potassium", "sodium, phosphorus and calcium", "nitrogen, potassium and copper", "none of these", "N, P and K."],
      ["m", "Fertilisers are used to", "replace minerals plants take from the soil", "kill pests", "make soil acidic", "stop photosynthesis", "They increase crop yield."],
      ["m", "Ammonium nitrate is made from", "ammonia and nitric acid", "nitrogen and oxygen", "ethene", "limestone", "A neutralisation reaction."]
    ]
  });
})();
