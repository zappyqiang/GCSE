/* Extra practice questions for every Biology unit. Functions generate fresh numbers every time. */
(function () {
  const { ri, pick } = GAME;

  GAME.more({
    "Eukaryotes and prokaryotes": [
      ["m", "Which type of cell has no nucleus?", "prokaryotic", "eukaryotic", "plant", "animal", "Prokaryotes such as bacteria have DNA free in the cytoplasm."],
      ["s", "Sort the features.", { "Prokaryotic cell": ["No nucleus", "Plasmids", "Single loop of DNA"], "Eukaryotic cell": ["Nucleus", "Mitochondria", "Chromosomes in pairs"] }, "Eukaryotes have a true nucleus and organelles."],
      ["m", "Which of these is a prokaryote?", "bacterium", "yeast", "amoeba", "human cell", "Bacteria are prokaryotes."],
      ["t", "Plasmids are small rings of DNA found in bacteria.", true, "They often carry genes such as antibiotic resistance."]
    ],
    "Animal and plant cells": [
      ["p", "Match the part to its function.", [["Nucleus", "Contains genetic material"], ["Mitochondria", "Site of aerobic respiration"], ["Ribosomes", "Make proteins"], ["Cell membrane", "Controls what enters and leaves"], ["Chloroplast", "Absorbs light for photosynthesis"]]],
      ["m", "Which is found in plant cells but not animal cells?", "cell wall", "nucleus", "mitochondria", "cell membrane", "The cell wall is made of cellulose."],
      ["m", "The permanent vacuole in a plant cell contains", "cell sap", "DNA", "chlorophyll", "ribosomes", "It keeps the cell firm."],
      ["t", "Plant root cells contain chloroplasts.", false, "They are underground and have no light for photosynthesis."]
    ],
    "Specialised cells": [
      ["p", "Match the cell to its adaptation.", [["Sperm cell", "Tail and many mitochondria"], ["Nerve cell", "Long with branched endings"], ["Root hair cell", "Large surface area for absorption"], ["Red blood cell", "Contains haemoglobin, no nucleus"]]],
      ["m", "Why do muscle cells contain many mitochondria?", "they need lots of energy to contract", "to store water", "to make proteins", "to absorb light", "Mitochondria release energy by respiration."],
      ["m", "A palisade cell is adapted for photosynthesis because it has", "lots of chloroplasts", "a long tail", "no cell wall", "a nucleus only", "Chloroplasts absorb light."]
    ],
    "Differentiation": [
      ["m", "Differentiation is the process by which a cell", "becomes specialised for its function", "divides", "dies", "makes energy", "It happens as an organism develops."],
      ["m", "Most animal cells lose the ability to differentiate", "early in development", "never", "only in adults", "after death", "Plant cells can differentiate throughout life."],
      ["t", "Plants have meristem tissue that can differentiate.", true, "Meristems are found at the tips of roots and shoots."]
    ],
    "Microscopy": [
      () => { const s = pick([2, 4, 5, 10]), r = ri(2, 10) * 10; return ["n", "A cell has an image size of " + s * r + " mm and the magnification is ×" + r + ". What is its real size?", s, "mm", "Real size = image size ÷ magnification."]; },
      ["n", "An image is 5 mm and the real size is 0.05 mm. What is the magnification?", 100, "", "Magnification = image ÷ real size."],
      ["m", "An electron microscope has a higher", "resolution than a light microscope", "price only", "colour", "size", "It shows smaller structures like ribosomes."],
      ["n", "How many micrometres (μm) are in 1 mm?", 1000, "μm", "1 mm = 1000 μm."]
    ],
    "Culturing microorganisms": [
      ["m", "Agar plates are kept at about 25 °C in school because", "it reduces the chance of growing harmful pathogens", "bacteria cannot grow at higher temperatures", "it is faster", "it is colder", "Higher temperatures can grow human pathogens."],
      ["m", "Equipment must be sterilised to", "prevent contamination by unwanted microbes", "make it shiny", "speed up growth", "kill the agar", "Aseptic technique."],
      ["n", "A bacterium divides every 20 minutes. How many bacteria after 1 hour from one cell?", 8, "", "2³ = 8."],
      ["m", "The Petri dish lid is taped on but not sealed fully so that", "oxygen can enter and harmful anaerobic bacteria do not grow", "it looks neat", "gas can escape", "heat escapes", "It stops anaerobic pathogens developing."]
    ],
    "Chromosomes and mitosis": [
      ["n", "How many chromosomes are in a normal human body cell?", 46, "", "23 pairs."],
      ["m", "Mitosis produces", "two genetically identical cells", "four different cells", "gametes", "two different cells", "It is used for growth and repair."],
      ["o", "Put the cell cycle events in order.", ["DNA replicates", "Chromosomes line up", "Chromosomes pulled apart", "Two new nuclei form", "Cytoplasm divides"], "Mitosis is one stage of the cell cycle."],
      ["m", "Mitosis is used for", "growth and repair", "making gametes", "evolution", "respiration", "Also asexual reproduction in some organisms."]
    ],
    "Stem cells": [
      ["m", "Stem cells are", "undifferentiated cells that can become other types", "sperm cells", "dead cells", "blood cells only", "They can divide and specialise."],
      ["m", "Embryonic stem cells could be used to", "replace damaged tissue", "make DNA", "cure all diseases", "make hormones", "They can become any type of cell."],
      ["m", "A concern about using embryonic stem cells is", "ethical objections to using embryos", "they are too small", "they are too cheap", "they cannot divide", "Some people believe embryos have rights."],
      ["m", "Stem cells in plants are found in the", "meristems", "leaves", "flowers", "roots hairs", "At the tips of roots and shoots."]
    ],
    "Diffusion": [
      ["m", "Diffusion is the movement of particles from", "a high to a low concentration", "a low to a high concentration", "cold to hot", "inside to outside always", "It is a passive process."],
      ["m", "Which increases the rate of diffusion?", "a bigger concentration gradient", "a smaller surface area", "a longer distance", "a lower temperature", "Steeper gradient, bigger area, shorter distance, higher temperature."],
      ["m", "Which substance moves into cells by diffusion?", "oxygen", "mineral ions against a gradient", "ATP", "large proteins", "Oxygen diffuses from the blood into tissues."],
      ["t", "Diffusion needs energy from respiration.", false, "Active transport does, not diffusion."]
    ],
    "Osmosis": [
      ["m", "Osmosis is the movement of", "water through a partially permeable membrane", "solute through a membrane", "any particles", "gases", "From dilute to concentrated solution."],
      ["m", "A plant cell placed in pure water will", "become turgid", "become plasmolysed", "burst", "shrink", "Water enters and the cell wall stops it bursting."],
      ["n", "A potato cylinder gains mass from 2.0 g to 2.4 g. What is the percentage change?", 20, "%", "0.4 ÷ 2.0 × 100."],
      ["m", "An animal cell placed in pure water will", "burst", "shrink", "stay the same", "divide", "It has no cell wall to resist."]
    ],
    "Active transport": [
      ["m", "Active transport moves substances", "from low to high concentration", "from high to low", "without energy", "only water", "Against the concentration gradient."],
      ["m", "Active transport needs", "energy from respiration", "no energy", "sunlight", "only heat", "ATP is used."],
      ["m", "Root hair cells take up mineral ions by", "active transport", "osmosis", "diffusion only", "filtration", "The ion concentration in the soil is lower."]
    ],

    "Levels of organisation": [
      ["o", "Order the levels of organisation, smallest first.", ["Cell", "Tissue", "Organ", "Organ system", "Organism"], "Cells make tissues, which make organs."],
      ["m", "A tissue is", "a group of similar cells with the same function", "a group of organs", "one cell", "a type of organism", "For example muscle tissue."],
      ["m", "The stomach is an example of", "an organ", "a tissue", "a cell", "an organ system", "It contains muscle, glandular and epithelial tissue."]
    ],
    "Digestive system and enzymes": [
      ["m", "Enzymes are", "biological catalysts", "hormones", "fats", "vitamins", "They speed up reactions."],
      ["m", "The shape of an enzyme's active site", "fits only a specific substrate", "fits all molecules", "changes constantly", "has no importance", "The lock and key model."],
      ["m", "Enzymes stop working when they are", "denatured", "diluted", "reused", "cooled slightly", "High temperature changes the shape of the active site."],
      ["t", "An enzyme is used up in a reaction.", false, "It is unchanged and can be reused."]
    ],
    "Digestive enzymes and bile": [
      ["p", "Match the enzyme to its substrate and product.", [["Amylase", "Starch to sugars"], ["Protease", "Protein to amino acids"], ["Lipase", "Fats to fatty acids and glycerol"]]],
      ["m", "Bile is made in the", "liver", "stomach", "pancreas", "small intestine", "It is stored in the gall bladder."],
      ["m", "Bile helps digestion by", "emulsifying fats and neutralising stomach acid", "digesting protein", "making enzymes", "killing bacteria", "Larger surface area for lipase."],
      ["m", "The stomach has a pH of about 2 because", "protease works best in acid", "it kills enzymes", "it digests fats", "it makes bile", "Pepsin has an acidic optimum pH."]
    ],
    "Food tests and enzyme practicals": [
      ["p", "Match the food test to its positive result.", [["Iodine solution", "Blue-black for starch"], ["Benedict's solution", "Orange-red for sugar when heated"], ["Biuret solution", "Purple for protein"], ["Ethanol then water", "Cloudy white for lipids"]]],
      ["m", "Which solution tests for starch?", "iodine", "Benedict's", "biuret", "limewater", "It turns blue-black."],
      ["m", "To find the optimum temperature of amylase you should", "change the temperature and measure the time to break down starch", "change the substrate", "use the same temperature", "add more enzyme each time", "The independent variable is the temperature."],
      ["m", "In the amylase and starch practical, the end point is when", "iodine no longer turns blue-black", "the solution turns green", "bubbles stop", "it turns red", "No starch is left."]
    ],
    "Heart and blood vessels": [
      ["m", "Which vessel carries blood from the heart to the lungs?", "pulmonary artery", "pulmonary vein", "aorta", "vena cava", "Deoxygenated blood to be oxygenated."],
      ["m", "Which side of the heart has the thicker wall?", "left", "right", "both equal", "neither", "It pumps blood around the whole body."],
      ["m", "Arteries have", "thick muscular walls", "valves", "very thin walls", "large lumen", "They carry blood at high pressure."],
      ["m", "Capillaries are adapted for exchange because they", "have walls one cell thick", "have thick muscle", "have valves", "carry blood fast", "A short diffusion distance."],
      ["m", "Veins have valves to", "prevent backflow of blood", "increase pressure", "add oxygen", "speed up blood", "Blood is at low pressure in veins."]
    ],
    "Blood": [
      ["p", "Match the blood component to its job.", [["Red blood cells", "Carry oxygen"], ["White blood cells", "Fight pathogens"], ["Platelets", "Help clot the blood"], ["Plasma", "Carries dissolved substances"]]],
      ["m", "Red blood cells have no nucleus so they can", "carry more haemoglobin", "divide faster", "make proteins", "fight infection", "More space for oxygen."]
    ],
    "Coronary heart disease": [
      ["m", "In coronary heart disease the coronary arteries", "are blocked by fatty deposits", "are too wide", "grow bigger", "have no blood", "The heart muscle gets less oxygen."],
      ["m", "A stent is used to", "keep an artery open", "replace a valve", "reduce cholesterol", "thin the blood", "A metal mesh tube."],
      ["m", "Statins are drugs that", "reduce blood cholesterol", "thin the blood", "increase heart rate", "dissolve stents", "They reduce fatty deposits."]
    ],
    "Health and lifestyle": [
      ["m", "A non-communicable disease is", "not passed from person to person", "caused by a virus", "spread by air", "always fatal", "Examples are heart disease and cancer."],
      ["m", "Which lifestyle factor increases the risk of type 2 diabetes?", "obesity", "exercise", "a balanced diet", "sleep", "Excess body fat."],
      ["t", "Smoking increases the risk of cardiovascular disease.", true, "It damages the artery walls."],
      ["m", "BMI is calculated as", "mass ÷ height²", "height ÷ mass", "mass × height", "mass ÷ height", "kg and metres."]
    ],
    "Cancer": [
      ["m", "Cancer is caused by", "uncontrolled cell division", "a virus always", "bacteria", "too little exercise", "Cells divide and form a tumour."],
      ["m", "A benign tumour", "stays in one place", "spreads to other parts", "is always fatal", "is a virus", "Malignant tumours invade other tissues."],
      ["m", "Which is a risk factor for cancer?", "smoking and UV exposure", "drinking water", "sleeping", "reading", "Also genetic factors."]
    ],
    "Plant tissues": [
      ["p", "Match the plant tissue to its function.", [["Xylem", "Transports water and minerals"], ["Phloem", "Transports sugars"], ["Mesophyll", "Photosynthesis"], ["Epidermis", "Protects the surface"]]],
      ["m", "Palisade mesophyll cells are packed with", "chloroplasts", "xylem", "stomata", "vacuoles only", "They absorb most light."],
      ["m", "The meristem tissue is where", "growth occurs", "water moves", "sugars are made", "gases leave", "Cells divide there."]
    ],
    "Transpiration and translocation": [
      ["m", "Transpiration is the loss of", "water vapour from leaves", "sugars", "oxygen", "minerals", "Through stomata."],
      ["m", "Which would increase the rate of transpiration?", "a hot, dry, windy day", "a cold, still day", "high humidity", "darkness", "More evaporation."],
      ["m", "Translocation moves", "sugars in the phloem", "water in the xylem", "minerals in roots", "gases in stomata", "From the leaves to growing parts."],
      ["m", "Guard cells", "open and close the stomata", "absorb water", "make sugar", "hold the plant up", "They control gas exchange and water loss."]
    ],

    "Pathogens and how they spread": [
      ["m", "A pathogen is", "a microorganism that causes disease", "a type of medicine", "a white blood cell", "an antibody", "Bacteria, viruses, fungi and protists."],
      ["m", "How can bacteria and viruses spread?", "by air, water or direct contact", "only by water", "only by insects", "they do not spread", "For example coughs and sneezes."],
      ["m", "Which would reduce the spread of infection?", "washing hands and vaccination", "sharing food", "ignoring symptoms", "crowding", "Good hygiene."]
    ],
    "Viral and bacterial diseases": [
      ["p", "Match the disease to its pathogen type.", [["Measles", "Virus"], ["Salmonella food poisoning", "Bacterium"], ["HIV", "Virus"], ["Gonorrhoea", "Bacterium"]]],
      ["m", "Viruses reproduce by", "taking over host cells", "binary fission", "mitosis", "spores", "They need living cells."],
      ["m", "Measles is spread by", "droplets from coughs and sneezes", "water", "insects", "touch only", "It is very infectious."],
      ["m", "HIV attacks", "white blood cells of the immune system", "red blood cells", "the lungs", "the liver", "It can lead to AIDS."]
    ],
    "Fungal and protist diseases": [
      ["m", "Malaria is caused by a", "protist", "virus", "bacterium", "fungus", "Spread by mosquitoes."],
      ["m", "A vector is", "an organism that carries a pathogen", "a medicine", "a virus", "an antibody", "Mosquitoes spread malaria."],
      ["m", "Rose black spot is caused by a", "fungus", "virus", "bacterium", "protist", "It causes black spots on leaves."]
    ],
    "Human defences": [
      ["m", "Which is a non-specific defence?", "stomach acid", "antibodies", "memory cells", "vaccines", "It kills many pathogens."],
      ["m", "White blood cells defend by", "engulfing pathogens, making antibodies and antitoxins", "carrying oxygen", "clotting blood", "making hormones", "Three main ways."],
      ["m", "Antibodies", "lock on to specific antigens", "digest food", "carry oxygen", "make energy", "Each pathogen has its own antigens."]
    ],
    "Vaccination": [
      ["m", "A vaccine contains", "dead or weakened pathogens or their antigens", "antibiotics", "live active pathogens", "white blood cells", "It triggers antibody production."],
      ["m", "Herd immunity happens when", "enough people are vaccinated to protect those who are not", "everybody is ill", "no one is vaccinated", "antibiotics are used", "The disease cannot spread easily."],
      ["m", "Why is a second dose sometimes needed?", "to boost the production of memory cells", "to kill bacteria", "to add antibiotics", "to cure disease", "A booster strengthens immunity."]
    ],
    "Antibiotics and painkillers": [
      ["m", "Antibiotics are effective against", "bacteria", "viruses", "fungi only", "all pathogens", "They do not work on viruses."],
      ["m", "Painkillers", "treat the symptoms but not the cause", "kill pathogens", "cure infections", "boost immunity", "They reduce pain only."],
      ["t", "Taking antibiotics for a viral infection is useful.", false, "They do not kill viruses and can contribute to resistance."]
    ],
    "Discovering and testing drugs": [
      ["o", "Order the stages of testing a new drug.", ["Tests on cells and tissues", "Tests on animals", "Clinical trials on healthy volunteers", "Clinical trials on patients"], "Safety and effectiveness are tested step by step."],
      ["m", "In a double-blind trial", "neither the patient nor the doctor knows who has the drug", "only the patient knows", "everyone knows", "only the doctor knows", "This reduces bias."],
      ["m", "A placebo is", "a substance with no active drug", "a stronger drug", "an antibiotic", "a vaccine", "It is used for comparison."],
      ["m", "Digitalis, aspirin and penicillin were first found in", "plants and microorganisms", "synthetic labs", "rocks", "animals only", "Many drugs come from natural sources."]
    ],
    "Monoclonal antibodies": [
      ["m", "Monoclonal antibodies are", "identical antibodies from a single clone of cells", "different antibodies", "viruses", "hormones", "They target a specific antigen."],
      ["m", "One use of monoclonal antibodies is", "pregnancy tests", "making vaccines", "killing viruses directly", "making insulin", "They detect the hormone hCG."],
      ["m", "In cancer treatment, monoclonal antibodies can", "carry drugs to cancer cells", "increase growth", "replace cells", "make tumours", "They bind to antigens on tumour cells."]
    ],
    "Plant diseases and defences": [
      ["m", "A plant defence is", "a waxy cuticle or thorns", "antibodies", "white blood cells", "vaccination", "Physical barriers and chemicals."],
      ["m", "Magnesium deficiency in plants causes", "yellow leaves (chlorosis)", "stunted roots", "black spots", "wilting", "Magnesium is needed to make chlorophyll."],
      ["m", "Nitrate deficiency causes", "stunted growth", "yellow leaves with green veins", "leaf spots", "excess growth", "Nitrates are needed for amino acids."]
    ],

    "Photosynthesis": [
      ["m", "What are the products of photosynthesis?", "glucose and oxygen", "carbon dioxide and water", "protein and water", "starch only", "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂."],
      ["m", "Photosynthesis is", "endothermic", "exothermic", "neither", "a type of respiration", "It takes in energy from light."],
      ["m", "Chlorophyll is found in the", "chloroplasts", "nucleus", "mitochondria", "vacuole", "It absorbs light."],
      ["t", "Photosynthesis happens in all cells of a plant.", false, "Only cells with chloroplasts."]
    ],
    "Rate of photosynthesis": [
      ["m", "Which is a limiting factor for photosynthesis?", "light intensity", "oxygen", "nitrogen", "glucose", "Also CO₂ concentration and temperature."],
      ["m", "On a graph, the rate levels off when", "another factor becomes limiting", "light is too bright", "the plant dies", "there is no water", "The factor that is in shortest supply controls the rate."],
      ["m", "Increasing light intensity has the greatest effect when", "light is the limiting factor", "temperature is limiting", "CO₂ is limiting", "the plant is dead", "Otherwise there is no change."],
      ["m", "The inverse square law says light intensity", "is proportional to 1/distance²", "is proportional to distance", "does not depend on distance", "is the same", "Doubling distance cuts light to a quarter."]
    ],
    "Uses of glucose": [
      ["m", "Plants store glucose as", "starch", "cellulose", "protein", "lipids", "An insoluble storage carbohydrate."],
      ["m", "Glucose is used to make", "cellulose for cell walls", "chloroplasts", "haemoglobin", "DNA only", "Also proteins with nitrates."],
      ["m", "Plants make proteins using glucose and", "nitrate ions", "carbon dioxide", "oxygen", "calcium", "From the soil."]
    ],
    "Respiration": [
      ["m", "Aerobic respiration releases energy using", "oxygen", "carbon dioxide", "water", "light", "Glucose + oxygen → carbon dioxide + water."],
      ["m", "Respiration is", "exothermic", "endothermic", "neither", "only in plants", "It releases energy."],
      ["m", "Anaerobic respiration in muscles produces", "lactic acid", "ethanol", "carbon dioxide only", "oxygen", "It releases less energy."],
      ["m", "Anaerobic respiration in yeast produces", "ethanol and carbon dioxide", "lactic acid", "water", "oxygen", "This is fermentation."],
      ["m", "Respiration happens in", "the mitochondria and cytoplasm", "the nucleus", "the cell wall", "the vacuole", "Mostly in mitochondria for aerobic."]
    ],
    "Response to exercise": [
      ["m", "During exercise the heart rate", "increases", "decreases", "stays the same", "stops", "More oxygen is needed by the muscles."],
      ["m", "An oxygen debt is the", "extra oxygen needed after exercise to break down lactic acid", "oxygen used during exercise", "lack of oxygen in the air", "oxygen in blood", "It is repaid by heavy breathing afterwards."],
      ["m", "Muscles become fatigued because", "lactic acid builds up", "they have too much oxygen", "they stop working", "glucose is destroyed", "Anaerobic respiration."]
    ],
    "Metabolism": [
      ["m", "Metabolism is", "the sum of all the chemical reactions in a cell or body", "digestion only", "respiration only", "photosynthesis only", "Includes making and breaking molecules."],
      ["m", "Fatty acids and glycerol are combined to make", "lipids", "proteins", "glucose", "DNA", "A synthesis reaction."],
      ["m", "Excess amino acids are broken down in the liver to make", "urea", "glucose", "lipids", "water only", "Urea is excreted by the kidneys."]
    ],

    "Homeostasis": [
      ["m", "Homeostasis is", "keeping internal conditions constant", "growing", "reproducing", "digesting food", "For example temperature and blood glucose."],
      ["m", "Which is controlled in homeostasis?", "body temperature", "height", "hair colour", "blood type", "Also blood glucose, water and ion levels."],
      ["m", "Negative feedback", "reverses a change to restore the normal level", "increases the change", "has no effect", "causes disease", "It keeps conditions steady."]
    ],
    "Nervous system and reflexes": [
      ["o", "Order the parts of a reflex arc.", ["Stimulus", "Receptor", "Sensory neurone", "Relay neurone", "Motor neurone", "Effector"], "The CNS acts as the coordinator."],
      ["m", "A synapse is", "a gap between two neurones", "a type of muscle", "a gland", "a hormone", "A chemical crosses the gap."],
      ["m", "Reflex actions are", "fast and automatic", "slow and learned", "conscious", "only in children", "They protect the body."],
      ["m", "An effector can be", "a muscle or a gland", "a nerve only", "a receptor", "a hormone", "It produces the response."]
    ],
    "The brain": [
      ["m", "The cerebral cortex is responsible for", "consciousness, intelligence, memory and language", "balance", "heart rate", "reflexes", "It is the outer layer of the brain."],
      ["m", "The cerebellum controls", "muscle coordination and balance", "heart rate", "memory", "vision", "At the back of the brain."],
      ["m", "The medulla controls", "unconscious activities like breathing and heart rate", "language", "vision", "balance", "It is at the base of the brain."]
    ],
    "The eye": [
      ["p", "Match the part of the eye to its function.", [["Cornea", "Refracts light"], ["Iris", "Controls pupil size"], ["Retina", "Contains receptors"], ["Optic nerve", "Carries impulses to the brain"], ["Lens", "Focuses light"]]],
      ["m", "In bright light the pupil", "gets smaller", "gets larger", "stays the same", "closes completely", "The circular muscles of the iris contract."],
      ["m", "To focus on a near object the ciliary muscles", "contract and the lens becomes fatter", "relax and the lens flattens", "do not change", "shut the pupil", "Suspensory ligaments loosen."]
    ],
    "Control of body temperature": [
      ["m", "Normal body temperature is about", "37 °C", "30 °C", "40 °C", "25 °C", "The thermoregulatory centre monitors it."],
      ["m", "When you are too hot", "sweat is produced and vasodilation occurs", "you shiver", "vasoconstriction occurs", "hair stands up", "Evaporation cools the skin."],
      ["m", "When you are too cold", "you shiver and vasoconstriction occurs", "you sweat", "blood vessels widen", "you stop breathing", "Shivering releases energy by respiration."]
    ],
    "Endocrine system": [
      ["m", "Hormones are", "chemical messengers carried in the blood", "nerve impulses", "enzymes", "antibodies", "They are made in glands."],
      ["m", "The pituitary gland is called the master gland because", "it controls other glands", "it is the biggest", "it makes insulin", "it controls the heart", "It releases hormones that act on other glands."],
      ["m", "Compared with the nervous system, hormones act", "more slowly and for longer", "faster and for shorter", "at the same speed", "only on muscles", "Blood transport is slower."]
    ],
    "Blood glucose and diabetes": [
      ["m", "Insulin", "lowers blood glucose", "raises blood glucose", "makes bile", "digests food", "Cells take up glucose and the liver stores glycogen."],
      ["m", "Glucagon", "raises blood glucose", "lowers blood glucose", "is made in the liver", "makes urine", "It makes the liver release glucose."],
      ["m", "Which hormones are made in the pancreas?", "insulin and glucagon", "adrenaline", "thyroxine", "oestrogen", "Both control blood glucose."],
      ["m", "Type 1 diabetes is treated by", "insulin injections", "losing weight", "antibiotics", "surgery", "The pancreas does not make insulin."]
    ],
    "Water and nitrogen balance": [
      ["m", "Urea is made in the", "liver", "kidneys", "bladder", "stomach", "From the breakdown of amino acids."],
      ["m", "ADH controls", "the amount of water reabsorbed by the kidney", "blood glucose", "heart rate", "urea production", "It is released by the pituitary gland."],
      ["m", "If the blood is too concentrated, the body releases", "more ADH", "less ADH", "insulin", "adrenaline", "The kidneys reabsorb more water."],
      ["m", "A kidney dialysis machine", "removes urea and excess ions from the blood", "adds urea", "makes ADH", "adds glucose", "It does the job of a damaged kidney."]
    ],
    "Hormones in reproduction": [
      ["p", "Match the hormone to its role.", [["FSH", "Causes eggs to mature"], ["LH", "Triggers ovulation"], ["Oestrogen", "Repairs the uterus lining"], ["Progesterone", "Maintains the uterus lining"]]],
      ["m", "Ovulation is the release of", "an egg", "sperm", "a hormone", "a placenta", "It happens around day 14."],
      ["m", "Testosterone is made in the", "testes", "ovaries", "pituitary", "kidneys", "It controls male secondary sexual characteristics."]
    ],
    "Contraception": [
      ["s", "Sort the methods.", { "Hormonal": ["The pill", "Implant", "Patch"], "Barrier": ["Condom", "Diaphragm"] }, "Barrier methods also protect against STIs."],
      ["m", "Which method also protects against sexually transmitted infections?", "condom", "the pill", "implant", "IUD", "It acts as a barrier."],
      ["m", "The combined pill works by", "stopping ovulation", "killing sperm", "removing the womb", "blocking the oviduct", "It contains oestrogen and progesterone."]
    ],
    "Treating infertility": [
      ["m", "FSH and LH can be given to", "stimulate egg release", "stop ovulation", "reduce fertility", "treat diabetes", "A fertility treatment."],
      ["m", "In IVF, eggs are fertilised", "outside the body", "inside the body", "in the stomach", "in the bladder", "Then embryos are put back in the uterus."],
      ["m", "A disadvantage of IVF is", "it is emotionally stressful and has a low success rate", "it is free", "it is risk-free", "it is always successful", "It may lead to multiple births."]
    ],
    "Adrenaline and thyroxine": [
      ["m", "Adrenaline prepares the body for", "fight or flight", "sleep", "digestion", "growth", "It increases heart rate."],
      ["m", "Thyroxine controls", "metabolic rate", "blood glucose", "blood pressure only", "growth of hair", "It is made in the thyroid gland."],
      ["m", "Low thyroxine causes the TSH level to", "rise", "fall", "stay the same", "vanish", "Negative feedback."]
    ],
    "Plant hormones": [
      ["m", "Auxin causes shoots to bend towards light because", "it builds up on the shaded side and makes cells elongate", "it builds up on the light side", "it kills cells", "it stops growth everywhere", "That side grows faster."],
      ["m", "Positive phototropism is growth", "towards light", "away from light", "towards gravity", "away from gravity", "Shoots do this."],
      ["m", "Roots show positive", "gravitropism", "phototropism", "hydrotropism only", "thermotropism", "They grow down."]
    ],
    "Uses of plant hormones": [
      ["m", "Rooting powder contains", "auxins", "gibberellins", "ethene", "thyroxine", "It helps cuttings grow roots."],
      ["m", "Ethene is used to", "ripen fruit", "stop ripening", "grow roots", "kill weeds", "It speeds ripening."],
      ["m", "Selective weedkillers use", "auxins", "insulin", "oestrogen", "ethene", "They make broad-leaved weeds overgrow."]
    ],

    "Sexual and asexual reproduction, and meiosis": [
      ["m", "Meiosis produces", "four genetically different gametes", "two identical cells", "body cells", "clones", "Each has half the chromosomes."],
      ["n", "How many chromosomes are in a human gamete?", 23, "", "Half of 46."],
      ["m", "Asexual reproduction produces", "genetically identical offspring", "varied offspring", "gametes", "two parents", "One parent only."],
      ["m", "Fertilisation restores the chromosome number to", "46", "23", "92", "12", "Two gametes join."]
    ],
    "Pros and cons of each reproduction": [
      ["m", "An advantage of sexual reproduction is", "variation helps species survive changes", "it is faster", "needs one parent", "it makes clones", "It increases genetic diversity."],
      ["m", "An advantage of asexual reproduction is", "it is fast and needs only one parent", "it produces variety", "it needs a mate", "it uses gametes", "Good conditions are exploited quickly."],
      ["t", "Asexual reproduction produces variation.", false, "Offspring are genetically identical."]
    ],
    "DNA and the genome": [
      ["m", "The genome is", "all the genetic material of an organism", "one gene", "one chromosome", "a protein", "The Human Genome Project mapped it."],
      ["m", "A gene is", "a section of DNA that codes for a protein", "a protein", "a cell", "a chromosome", "It controls a characteristic."],
      ["m", "Understanding the human genome helps with", "tracing human migration and finding genes linked to disease", "nothing", "making clones", "digesting food", "It has medical uses."]
    ],
    "DNA structure and proteins": [
      ["m", "In DNA, adenine pairs with", "thymine", "cytosine", "guanine", "uracil", "A–T and C–G."],
      ["m", "Each amino acid is coded for by", "three bases", "one base", "two bases", "four bases", "A triplet code."],
      ["m", "A mutation is", "a change in the DNA base sequence", "a new protein", "a virus", "a hormone", "It may or may not change the protein."],
      ["m", "DNA is a polymer made of", "nucleotides", "amino acids", "sugars", "lipids", "Each has a sugar, a phosphate and a base."]
    ],
    "Genetic inheritance": [
      ["m", "An allele is", "a different version of a gene", "a chromosome", "a protein", "a cell", "For example B and b."],
      ["m", "A heterozygous genotype is", "Bb", "BB", "bb", "B", "Two different alleles."],
      ["n", "Two heterozygous parents (Bb × Bb). What percentage of offspring are bb?", 25, "%", "A 1 in 4 chance."],
      ["m", "The phenotype is", "the observable characteristic", "the alleles present", "the DNA", "a chromosome", "For example brown eyes."],
      ["m", "A recessive allele is shown", "only if two copies are present", "always", "never", "in one copy", "The dominant allele hides it."]
    ],
    "Inherited disorders": [
      ["m", "Cystic fibrosis is caused by", "a recessive allele", "a dominant allele", "a virus", "a bacterium", "A person needs two copies to have it."],
      ["m", "Polydactyly is caused by", "a dominant allele", "a recessive allele", "a bacterium", "diet", "Extra fingers or toes."],
      ["m", "Embryo screening could be used to", "check for genetic disorders before implantation", "cure disease", "make clones", "change genes", "An ethical issue is involved."]
    ],
    "Sex determination": [
      ["m", "Which chromosomes does a male have?", "XY", "XX", "YY", "X", "Females are XX."],
      ["n", "What is the probability that a baby is female? (as a decimal)", 0.5, "", "Half of sperm carry X."],
      ["m", "The sex chromosomes are carried by the", "23rd pair", "first pair", "12th pair", "none", "One of 23 pairs."]
    ],
    "Variation": [
      ["m", "Variation can be caused by", "genes and the environment", "genes only", "environment only", "nothing", "Many characteristics are both."],
      ["m", "Which characteristic is due to the environment only?", "a scar", "eye colour", "blood group", "natural hair colour", "Genes do not cause scars."],
      ["m", "Mutations can lead to", "new alleles", "no change", "disease only", "a new cell", "They are a source of variation."]
    ],
    "Evolution": [
      ["m", "Natural selection means that", "individuals with advantageous characteristics survive and reproduce more", "all individuals survive", "the strongest always win", "characteristics are lost", "The alleles are passed on."],
      ["o", "Order the steps of natural selection.", ["Variation exists", "Some are better adapted", "Better adapted survive and reproduce", "Advantageous alleles are passed on"], "Over many generations the population changes."],
      ["m", "Evolution takes place over", "many generations", "a single day", "one lifetime", "a few minutes", "Changes build up gradually."]
    ],
    "Selective breeding": [
      ["m", "Selective breeding is", "choosing parents with desired characteristics", "natural selection", "cloning", "genetic engineering", "Humans decide which organisms breed."],
      ["m", "A disadvantage of selective breeding is", "inbreeding and reduced genetic variation", "faster growth", "more yield", "better taste", "Increases the risk of genetic disease."],
      ["m", "Which is an example of selective breeding?", "dogs bred for temperament", "a clone of Dolly", "GM crops", "a mutation", "Over many generations."]
    ],
    "Genetic engineering": [
      ["m", "Genetic engineering is", "transferring a gene from one organism to another", "selective breeding", "cloning", "evolution", "It changes the genome."],
      ["m", "An advantage of GM crops is", "higher yield or resistance to pests", "they are always safe", "they are cheaper", "they need no soil", "Less pesticide may be used."],
      ["m", "Enzymes used to cut DNA are", "restriction enzymes", "protease", "lipase", "ligase only", "They cut at specific sequences."],
      ["m", "Bacteria are genetically engineered to make", "human insulin", "ATP", "blood", "water", "It is used to treat diabetes."]
    ],
    "Cloning": [
      ["m", "A clone is", "genetically identical to the parent", "different from the parent", "a mutation", "a gamete", "Made by asexual methods."],
      ["m", "Cuttings are", "a type of plant cloning", "an animal cloning method", "genetic engineering", "sexual reproduction", "Cheap and simple."],
      ["m", "In adult cell cloning the nucleus from a body cell is put into", "an egg cell with its nucleus removed", "a sperm cell", "a bacterium", "another body cell", "Then it is stimulated to divide."]
    ],
    "Darwin, Wallace, Mendel and speciation": [
      ["m", "Charles Darwin proposed", "evolution by natural selection", "inheritance by genes", "cell theory", "DNA structure", "He published On the Origin of Species."],
      ["m", "Gregor Mendel is known for", "discovering how characteristics are inherited by studying pea plants", "discovering DNA", "proposing evolution", "finding fossils", "He worked out dominant and recessive factors."],
      ["m", "Speciation occurs when", "populations become so different they can no longer interbreed", "they move", "one dies", "one mutates", "Isolation is often involved."]
    ],
    "Evidence, fossils and extinction": [
      ["m", "Fossils show", "how organisms have changed over time", "what colour animals were", "the current climate", "nothing", "They are the remains of organisms found in rocks."],
      ["m", "Extinction may be caused by", "a new predator, disease or environmental change", "too much food", "too many predators dying", "nothing", "Species that cannot adapt die out."],
      ["m", "Why are there gaps in the fossil record?", "many early organisms were soft-bodied and decayed", "all fossils were found", "no organisms lived then", "fossils are destroyed by people", "Few conditions allow fossilisation."]
    ],
    "Resistant bacteria": [
      ["m", "Antibiotic resistance spreads because", "resistant bacteria survive and reproduce", "bacteria choose to resist", "antibiotics make bacteria stronger", "viruses help", "It is natural selection."],
      ["m", "To slow the development of resistance you should", "finish the course of antibiotics and avoid overuse", "stop when you feel better", "use them for colds", "use them every day", "This reduces survivors."],
      ["m", "MRSA is", "a bacterium resistant to many antibiotics", "a virus", "a protist", "a fungus", "A hospital-acquired infection."]
    ],
    "Classification": [
      ["o", "Order the levels of classification, largest group first.", ["Kingdom", "Phylum", "Class", "Order", "Family", "Genus", "Species"], "King Philip Came Over For Good Soup."],
      ["m", "The binomial name has", "the genus then the species", "the kingdom then the class", "the species then the family", "just the species", "For example Homo sapiens."],
      ["m", "Carl Woese proposed the three-domain system of", "Archaea, Bacteria and Eukaryota", "plants, animals and fungi", "producers, consumers, decomposers", "monera, fungi, protists", "Based on chemical analysis."]
    ],

    "Communities and factors": [
      ["m", "An ecosystem is", "the interaction of a community with the non-living parts of its environment", "a group of one species", "a food chain", "a habitat only", "Includes the biotic and abiotic factors."],
      ["s", "Sort the factors.", { "Abiotic": ["Temperature", "Light intensity", "Soil pH"], "Biotic": ["Predators", "Competition", "Disease"] }, "Abiotic are non-living, biotic are living."],
      ["m", "Interdependence means", "organisms depend on each other", "organisms are independent", "plants depend on animals only", "nothing", "If one species changes, others are affected."]
    ],
    "Adaptations": [
      ["m", "Which is a structural adaptation of a polar bear?", "thick fur and a layer of fat", "hibernating", "migration", "being nocturnal", "Insulation in the cold."],
      ["m", "A behavioural adaptation is", "migration", "thick fur", "camouflage", "large ears", "It is what an organism does."],
      ["m", "A cactus has spines and thick stems because", "it reduces water loss in dry conditions", "it needs more water", "it is cold", "it is eaten", "Functional adaptations to deserts."]
    ],
    "Food chains and sampling": [
      ["m", "In a food chain, the arrow shows", "the direction of energy flow", "who eats who", "water movement", "competition", "It points to the consumer."],
      ["m", "A quadrat is used to", "estimate the number of plants in an area", "catch animals", "measure light", "weigh plants", "A square frame."],
      () => { const m = ri(3, 12), a = ri(20, 100); return ["n", "The mean number of daisies in a 1 m² quadrat is " + m + ". Estimate the number in a field of " + a + " m².", m * a, "", "Mean × area."]; },
      ["m", "A transect is used to", "study how organisms change along a gradient", "weigh plants", "catch fish", "measure speed", "Such as from the sea shore."]
    ],
    "Carbon and water cycles": [
      ["m", "Which process removes carbon dioxide from the air?", "photosynthesis", "respiration", "combustion", "decay", "Plants take it in."],
      ["m", "Which process returns carbon dioxide to the air?", "respiration", "photosynthesis", "condensation", "absorption", "Also combustion and decay."],
      ["m", "The water cycle includes", "evaporation, condensation and precipitation", "only rain", "respiration", "photosynthesis only", "Water moves between the land, sea and air."]
    ],
    "Decomposition": [
      ["m", "Decay is faster when it is", "warm and moist", "cold and dry", "cold and wet", "frozen", "Microorganisms work best in warmth and moisture."],
      ["m", "Compost is made by", "decomposers breaking down plant material", "adding salt", "freezing", "burning", "It makes a fertiliser."],
      ["m", "Anaerobic decay in a biogas generator produces", "methane", "oxygen", "nitrogen", "water only", "It can be burned as a fuel."]
    ],
    "Impact of environmental change": [
      ["m", "A change in the average temperature may cause", "a change in the distribution of a species", "no change", "faster growth in all species", "species to freeze", "Species move to cooler areas."],
      ["m", "Indicator species show", "the level of pollution or environmental quality", "the temperature", "the number of plants", "the time", "Lichens show air quality."],
      ["m", "Mayfly larvae in a river indicate", "clean water", "polluted water", "salt water", "warm water", "They need high oxygen levels."]
    ],
    "Biodiversity, waste and land use": [
      ["m", "Biodiversity is", "the variety of living organisms in an area", "the number of plants", "the size of an ecosystem", "the amount of food", "Higher means a healthier ecosystem."],
      ["m", "Humans increase pollution through", "waste and chemicals", "photosynthesis", "respiration", "evolution", "Sewage, fertilisers, smoke."],
      ["m", "Land is used for", "building, quarrying, farming and dumping waste", "nothing", "only farming", "only building", "This reduces the area for wildlife."]
    ],
    "Deforestation and global warming": [
      ["m", "Peat bogs are destroyed for", "compost", "fuel only", "food", "water", "Releasing carbon dioxide."],
      ["m", "Deforestation increases carbon dioxide because", "there are fewer trees for photosynthesis and burning releases CO₂", "trees make CO₂", "trees absorb oxygen", "it rains more", "Both reduce carbon storage."],
      ["m", "Methane is released by", "cattle and rice paddies", "trees", "oceans only", "wind", "A greenhouse gas."]
    ],
    "Maintaining biodiversity": [
      ["m", "A way to protect endangered species is", "breeding programmes and protected areas", "building on habitats", "hunting", "burning forests", "Conservation."],
      ["m", "A reason to maintain biodiversity is", "ecosystems and food chains depend on it", "it looks nice only", "it costs nothing", "it makes pollution", "Many species rely on each other."]
    ],
    "Trophic levels and biomass": [
      ["m", "Producers are", "organisms that make their own food by photosynthesis", "herbivores", "carnivores", "decomposers", "They are the first trophic level."],
      ["n", "A producer has 1000 kg of biomass. About how much is passed to the primary consumers (10% transfer)?", 100, "kg", "10% of 1000."],
      ["m", "Energy is lost between trophic levels as", "heat, waste and uneaten parts", "oxygen", "light", "sound", "Through respiration and egestion."],
      () => { const a = ri(2, 9) * 100, p = pick([5, 10, 20]); return ["n", "A herbivore receives " + a + " kJ and passes on " + a * p / 100 + " kJ to a carnivore. What is the efficiency of transfer?", p, "%", "Passed on ÷ received × 100."]; }
    ],
    "Food security and farming": [
      ["m", "Food security means", "having enough food to be healthy", "having a lot of food", "growing crops", "importing food", "It is a global issue."],
      ["m", "Hydroponics grows plants", "in mineral solutions without soil", "in sand", "in the dark", "on trees", "A controlled method."],
      ["m", "Keeping animals indoors in small spaces helps efficient food production because", "less energy is lost as heat and movement", "they eat more", "they grow slower", "it costs more", "But there are ethical concerns."]
    ],
    "Biotechnology": [
      ["m", "Mycoprotein is made from", "a fungus", "bacteria", "a plant", "an animal", "Used as a meat substitute."],
      ["m", "Bacteria can be engineered to produce", "insulin", "ATP", "plastic only", "sunlight", "Used to treat diabetes."],
      ["m", "A fermenter is used to", "grow microorganisms on a large scale", "cook food", "store crops", "cool milk", "Conditions are carefully controlled."]
    ]
  });
})();
