/* Extra practice questions for every Physics unit. Functions generate fresh numbers every time. */
(function () {
  const { ri, pick } = GAME;

  GAME.more({
    "Energy stores and transfers": [
      ["m", "Which energy store does a stretched spring have?", "Elastic potential", "Kinetic", "Chemical", "Nuclear", "A stretched or compressed spring stores energy elastically."],
      ["m", "A kettle heats water. What is the main energy transfer?", "Electrical to thermal", "Chemical to kinetic", "Kinetic to sound", "Nuclear to light", "The heating element converts electrical energy to thermal energy."],
      ["t", "In a closed system the total energy stays the same.", true, "Energy is conserved: it is transferred, not created or destroyed."],
      ["s", "Sort the examples into their main energy stores.", { "Kinetic": ["A moving car", "A running athlete"], "Chemical": ["Food", "Petrol"], "Gravitational": ["A book on a high shelf", "A plane in flight"] }, "Kinetic is movement, chemical is in fuels and food, gravitational depends on height."],
      ["m", "A ball falls from a table. Which transfer happens?", "Gravitational to kinetic", "Kinetic to gravitational", "Chemical to thermal", "Elastic to kinetic", "As it falls it loses height and gains speed."]
    ],
    "Calculating energy changes": [
      () => { const m = ri(2, 10), v = ri(2, 10); return ["n", "Find the kinetic energy of a " + m + " kg object moving at " + v + " m/s.", 0.5 * m * v * v, "J", "Ek = ½ m v²."]; },
      () => { const m = ri(2, 40), h = ri(2, 20); return ["n", "How much gravitational potential energy does a " + m + " kg object gain when lifted " + h + " m? (g = 10 N/kg)", m * 10 * h, "J", "Ep = m g h."]; },
      () => { const k = ri(20, 100), e = ri(1, 5) / 10; return ["n", "A spring (k = " + k + " N/m) is stretched by " + e + " m. How much energy is stored? (1 d.p. if needed)", Math.round(0.5 * k * e * e * 100) / 100, "J", "Ee = ½ k e².", 0.02]; },
      ["m", "The speed of an object doubles. Its kinetic energy becomes", "four times as big", "twice as big", "half as big", "the same", "Ek depends on v²."]
    ],
    "Specific heat capacity": [
      () => { const m = ri(1, 5), t = ri(5, 40); return ["n", "How much energy heats " + m + " kg of water by " + t + " °C? (c = 4200 J/kg°C)", m * 4200 * t, "J", "ΔE = m c Δθ."]; },
      ["m", "The specific heat capacity of a substance is the energy needed to raise", "1 kg by 1 °C", "1 g by 10 °C", "1 kg by 1 K per second", "any mass by 1 °C", "It is measured in J/kg°C."],
      ["n", "100 000 J heats 2.5 kg of a metal by 100 °C. What is its specific heat capacity?", 400, "J/kg°C", "c = ΔE ÷ (m Δθ)."],
      ["t", "A material with a high specific heat capacity heats up slowly.", true, "It needs more energy for each degree."]
    ],
    "Power": [
      () => { const P = ri(2, 50) * 10, t = ri(2, 10); return ["n", "A motor transfers " + P * t + " J in " + t + " s. What is its power?", P, "W", "P = E ÷ t."]; },
      ["n", "How many watts are in 1 kW?", 1000, "W", "Kilo means 1000."],
      ["n", "A 2 kW kettle runs for 3 minutes. How much energy does it transfer?", 360000, "J", "2000 W × 180 s."],
      ["m", "One watt is the same as", "one joule per second", "one joule per metre", "one newton per second", "one volt per amp", "Power is the rate of energy transfer."]
    ],
    "Conservation and wasted energy": [
      ["m", "Wasted energy usually ends up as", "thermal energy in the surroundings", "chemical energy", "nuclear energy", "gravitational energy", "It spreads out and becomes harder to use."],
      ["t", "Lubricating moving parts reduces wasted energy.", true, "It reduces friction and so the thermal energy produced."],
      ["m", "The width of an arrow on a Sankey diagram shows", "the amount of energy", "the time", "the temperature", "the voltage", "Wider arrows mean more energy."],
      ["m", "In a closed system, the total energy before a change compared with after is", "the same", "greater", "less", "zero", "Energy is conserved."]
    ],
    "Thermal insulators": [
      ["m", "Thicker walls made of a material with lower thermal conductivity make the rate of energy loss", "lower", "higher", "the same", "zero", "Less energy is conducted through each second."],
      ["m", "Which would be the best thermal insulator?", "trapped air in wool", "copper", "steel", "aluminium", "Trapped air is a very poor conductor."],
      ["t", "A higher thermal conductivity makes a better insulator.", false, "A good insulator has a LOW thermal conductivity."],
      ["m", "Cavity wall insulation mainly reduces energy loss by", "convection and conduction", "radiation only", "evaporation", "friction", "It traps air and stops it moving."]
    ],
    "Efficiency": [
      () => { const t = pick([40, 50, 80, 100, 200]), u = t * pick([0.25, 0.5, 0.75, 0.6]); return ["n", "A device receives " + t + " J and transfers " + u + " J usefully. What is its efficiency?", u / t * 100, "%", "Efficiency = useful ÷ total × 100."]; },
      ["n", "A bulb is 20% efficient and receives 100 J. How much useful light energy does it give?", 20, "J", "20% of 100."],
      ["t", "A device can have an efficiency greater than 100%.", false, "Useful output can never exceed the input."],
      ["m", "How can the efficiency of a machine be improved?", "reduce unwanted energy transfers, for example by lubrication", "increase the input energy", "use a bigger machine", "paint it", "Reducing waste raises the useful fraction."]
    ],
    "Energy resources": [
      ["s", "Sort the energy resources.", { "Renewable": ["Wind", "Solar", "Tidal"], "Non-renewable": ["Coal", "Oil", "Gas"] }, "Renewable resources are replenished; fossil fuels are not."],
      ["m", "Which resource is unreliable because it depends on the weather?", "wind", "gas", "coal", "nuclear", "Wind speed varies."],
      ["t", "Nuclear fuel is a renewable energy resource.", false, "Uranium is limited, so it is non-renewable."],
      ["m", "A disadvantage of burning fossil fuels is", "carbon dioxide is released", "they are unreliable", "they cost too much to start", "they only work in daylight", "CO₂ adds to global warming."]
    ],

    "Circuit symbols": [
      ["p", "Match the component to its job.", [["Ammeter", "Measures current"], ["Voltmeter", "Measures potential difference"], ["Resistor", "Limits the current"], ["Fuse", "Melts if the current is too high"]]],
      ["m", "A voltmeter is connected", "in parallel with the component", "in series with the component", "before the battery only", "to the earth wire", "It measures the potential difference across a component."],
      ["m", "An ammeter is connected", "in series", "in parallel", "across the cell", "to the neutral wire", "Current has to flow through it."],
      ["t", "The resistance of an LDR increases as light gets brighter.", false, "It decreases in bright light."]
    ],
    "Charge and current": [
      () => { const I = ri(1, 5), t = ri(2, 20); return ["n", "A current of " + I + " A flows for " + t + " s. How much charge flows?", I * t, "C", "Q = I t."]; },
      ["n", "A current of 0.5 A flows for 60 s. How much charge flows?", 30, "C", "0.5 × 60."],
      ["m", "Electric current is the rate of flow of", "charge", "energy", "voltage", "resistance", "Current = charge ÷ time."],
      ["m", "What is the unit of electric charge?", "coulomb", "ampere", "volt", "ohm", "Charge is measured in coulombs."]
    ],
    "Ohm's law and resistance": [
      () => { const I = ri(1, 6), R = ri(2, 20); return ["n", "A current of " + I + " A flows through a " + R + " Ω resistor. What is the potential difference?", I * R, "V", "V = I R."]; },
      () => { const I = ri(1, 6), R = ri(2, 12); return ["n", "A resistor has " + I * R + " V across it and a current of " + I + " A. What is its resistance?", R, "Ω", "R = V ÷ I."]; },
      () => { const R = ri(2, 10), I = ri(1, 5); return ["n", "A " + I * R + " V battery is connected to a " + R + " Ω resistor. What current flows?", I, "A", "I = V ÷ R."]; },
      ["m", "The resistance of an ohmic conductor at constant temperature is", "constant", "increasing", "decreasing", "zero", "Current is directly proportional to potential difference."]
    ],
    "Components and I-V graphs": [
      ["m", "The I–V graph of a resistor at constant temperature is", "a straight line through the origin", "a curve that flattens", "a flat line", "a curve through (0, 1)", "Current is proportional to voltage."],
      ["m", "Why does the I–V graph of a filament lamp curve?", "its resistance increases as it gets hotter", "its resistance decreases as it heats", "the voltage changes", "the current is constant", "The hotter filament resists more."],
      ["m", "A diode allows current to flow", "in one direction only", "in both directions", "only when hot", "only in light", "It has a very high resistance in reverse."],
      ["m", "The resistance of a thermistor as the temperature rises", "decreases", "increases", "stays the same", "becomes infinite", "That makes it useful in thermostats."]
    ],
    "Series and parallel circuits": [
      () => { const a = ri(2, 9), b = ri(2, 9); return ["n", "Resistors of " + a + " Ω and " + b + " Ω are in series. What is the total resistance?", a + b, "Ω", "Add the resistances in series."]; },
      ["n", "Two identical 6 Ω resistors are in parallel. What is the total resistance?", 3, "Ω", "Two identical resistors in parallel have half the resistance."],
      ["m", "In a parallel circuit, the current in the main wire is", "the sum of the currents in the branches", "the same as each branch", "zero", "the average of the branches", "Current splits and rejoins."],
      ["t", "Adding a resistor in parallel decreases the total resistance.", true, "It gives the current an extra path."]
    ],
    "Mains electricity": [
      ["p", "Match the wire to its colour.", [["Live", "Brown"], ["Neutral", "Blue"], ["Earth", "Green and yellow stripes"]]],
      ["m", "UK mains electricity is about", "230 V a.c. at 50 Hz", "12 V d.c.", "230 V d.c.", "50 V a.c. at 230 Hz", "It alternates 50 times a second."],
      ["m", "The fuse is connected in the", "live wire", "neutral wire", "earth wire", "plug casing", "It must cut off the live supply."],
      ["t", "The earth wire carries current during normal use.", false, "It only carries current if there is a fault."]
    ],
    "Electrical power and energy": [
      () => { const V = ri(3, 12) * 10, I = ri(1, 5); return ["n", "A device uses " + V + " V and " + I + " A. What is its power?", V * I, "W", "P = V I."]; },
      () => { const I = ri(1, 6), R = ri(2, 10); return ["n", "A current of " + I + " A flows through a " + R + " Ω resistor. What is the power?", I * I * R, "W", "P = I² R."]; },
      ["n", "A kettle is rated 800 W and is on for 30 s. How much energy does it transfer?", 24000, "J", "E = P t."],
      ["n", "A 2 kW heater runs for 3 hours. How many kWh is that?", 6, "kWh", "2 × 3."]
    ],
    "The National Grid": [
      ["m", "Step-up transformers are used to", "increase voltage so the current is lower", "increase current", "decrease voltage", "store energy", "A lower current means less energy lost as heat in the cables."],
      ["o", "Put the National Grid in order from power station to home.", ["Power station", "Step-up transformer", "Transmission lines", "Step-down transformer", "Homes"], "Voltage is raised for transmission, then lowered for use."],
      ["t", "Power lines use low voltage so they are safer.", false, "They use very high voltage to reduce energy losses."],
      ["m", "The National Grid transmits electricity at high voltage because", "it reduces energy lost as heat", "it makes the cables lighter", "it is cheaper to generate", "it is easier to store", "P = I²R, so lower current means lower loss."]
    ],
    "Static electricity": [
      ["m", "When an insulating rod is charged by rubbing, which particles move?", "electrons", "protons", "neutrons", "atoms", "Only electrons are free to move."],
      ["m", "Two objects with the same type of charge", "repel", "attract", "have no effect", "neutralise", "Like charges repel."],
      ["t", "Protons move when a rod is charged by friction.", false, "Protons are fixed in the nucleus."],
      ["m", "Earthing a charged object", "lets the charge flow away to the ground", "adds more charge", "makes it a magnet", "heats it", "It discharges safely."]
    ],

    "Density": [
      () => { const V = ri(2, 10) * 50, d = ri(1, 9); return ["n", "An object has mass " + V * d + " g and volume " + V + " cm³. What is its density?", d, "g/cm³", "Density = mass ÷ volume."]; },
      ["n", "What is the density of an object with mass 500 g and volume 250 cm³?", 2, "g/cm³", "500 ÷ 250."],
      ["m", "An object will float in water if its density is", "less than 1 g/cm³", "more than 1 g/cm³", "exactly 5 g/cm³", "any value", "Water's density is about 1 g/cm³."],
      () => { const d = ri(2, 9), V = ri(2, 12); return ["n", "A material has density " + d + " g/cm³. What is the mass of " + V + " cm³?", d * V, "g", "Mass = density × volume."]; }
    ],
    "Changes of state": [
      ["m", "What is the change of state from solid directly to gas called?", "sublimation", "condensation", "melting", "freezing", "It skips the liquid state."],
      ["t", "Mass is conserved when a substance melts.", true, "Only the arrangement of the particles changes."],
      ["t", "Changes of state are chemical changes.", false, "They are physical changes and can be reversed."],
      ["o", "Order the changes as a solid is heated.", ["Solid", "Melting", "Liquid", "Boiling", "Gas"], "Heating takes it from solid to liquid to gas."]
    ],
    "Internal energy and latent heat": [
      () => { const m = ri(1, 5); return ["n", "How much energy melts " + m + " kg of ice at 0 °C? (specific latent heat of fusion = 334 000 J/kg)", m * 334000, "J", "E = m L."]; },
      ["n", "How much energy boils 0.5 kg of water at 100 °C? (L = 2 260 000 J/kg)", 1130000, "J", "0.5 × 2 260 000."],
      ["m", "Internal energy is the", "total kinetic and potential energy of all the particles", "energy of the container", "temperature", "average speed", "It includes both movement and bond energy."],
      ["t", "The temperature rises during melting.", false, "The energy goes into breaking bonds, not speeding up particles."]
    ],
    "Particle motion in gases": [
      ["n", "Convert 0 °C to kelvin.", 273, "K", "Add 273."],
      ["n", "Convert 300 K to degrees Celsius.", 27, "°C", "Subtract 273."],
      ["m", "The temperature of a gas in kelvin is proportional to", "the average kinetic energy of its particles", "its volume", "its mass", "its density", "Hotter gas particles move faster."],
      ["m", "Heating a gas in a sealed container increases the pressure because", "the particles move faster and hit the walls harder and more often", "there are more particles", "the container expands", "the particles get bigger", "More frequent, harder collisions."]
    ],
    "Gas pressure and volume": [
      () => { const p = ri(1, 4) * 100, V = ri(2, 6) * 10, f = pick([2, 4]); return ["n", "A gas at " + p + " kPa has volume " + V + " cm³. It is compressed to " + V / f + " cm³ at constant temperature. What is the new pressure?", p * f, "kPa", "p₁V₁ = p₂V₂."]; },
      ["n", "A gas at 100 kPa and 6 m³ is compressed to 2 m³ at constant temperature. What is the new pressure?", 300, "kPa", "100 × 6 ÷ 2."],
      ["t", "At constant temperature, the pressure of a fixed mass of gas is inversely proportional to its volume.", true, "p × V is constant."],
      ["m", "Reducing the volume of a gas makes the pressure rise because", "the particles hit the walls more often", "the particles speed up", "the particles get heavier", "the temperature drops", "Less space means more frequent collisions."]
    ],
    "Work on a gas": [
      ["m", "Compressing a gas quickly makes its temperature", "increase", "decrease", "stay the same", "drop to zero", "Work done on the gas increases its internal energy."],
      ["t", "Work done on a gas decreases its internal energy.", false, "It transfers energy to the gas and raises its internal energy."]
    ],

    "Structure of the atom": [
      ["n", "An atom has 6 protons and 6 neutrons. What is its mass number?", 12, "", "6 + 6."],
      ["n", "How many electrons are in a neutral atom with 8 protons?", 8, "", "Protons and electrons balance."],
      ["m", "The radius of an atom is about", "1 × 10⁻¹⁰ m", "1 × 10⁻¹⁵ m", "1 × 10⁻⁵ m", "1 mm", "The nucleus is about 10 000 times smaller."],
      ["m", "Isotopes of an element have different numbers of", "neutrons", "protons", "electrons", "shells", "Same protons, different neutrons."]
    ],
    "History of the atom": [
      ["o", "Order the models of the atom, earliest first.", ["Solid sphere (Dalton)", "Plum pudding (Thomson)", "Nuclear model (Rutherford)", "Electron shells (Bohr)"], "Each model was changed by new evidence."],
      ["m", "The alpha scattering experiment showed that", "the atom has a small, dense, positive nucleus", "atoms are solid spheres", "electrons are in the nucleus", "protons are negative", "Most alpha particles passed straight through, a few bounced back."],
      ["m", "Who discovered the neutron?", "Chadwick", "Rutherford", "Thomson", "Dalton", "James Chadwick, in 1932."],
      ["t", "The plum pudding model had a nucleus.", false, "It was a ball of positive charge with electrons embedded."]
    ],
    "Radioactive decay": [
      ["p", "Match the radiation to its description.", [["Alpha", "Helium nucleus, stopped by paper"], ["Beta", "Fast electron, stopped by thin aluminium"], ["Gamma", "EM wave, reduced by thick lead"]]],
      ["m", "Which radiation is the most ionising?", "alpha", "beta", "gamma", "X-rays", "Alpha particles are large and strongly charged."],
      ["t", "Radioactive decay is a random process.", true, "You cannot predict when one nucleus will decay."],
      ["m", "Which radiation is the most penetrating?", "gamma", "alpha", "beta", "they are equal", "It passes through many materials."]
    ],
    "Nuclear equations": [
      ["n", "An alpha particle is emitted. By how much does the mass number change?", -4, "", "An alpha particle has mass number 4."],
      ["n", "Uranium-238 emits an alpha particle. What is the new mass number?", 234, "", "238 − 4."],
      ["n", "A nucleus with atomic number 92 emits an alpha particle. What is the new atomic number?", 90, "", "An alpha particle takes away 2 protons."],
      ["m", "In beta decay the atomic number of the nucleus", "increases by 1", "decreases by 2", "stays the same", "decreases by 1", "A neutron turns into a proton and an electron."]
    ],
    "Half-life": [
      () => { const hl = ri(2, 6), k = ri(2, 4), m = Math.pow(2, k) * ri(1, 5) * 10; return ["n", "A sample of " + m + " g has a half-life of " + hl + " days. How much is left after " + hl * k + " days?", m / Math.pow(2, k), "g", k + " half-lives: halve the mass " + k + " times."]; },
      ["n", "A count rate of 800 counts/s has a half-life of 5 minutes. What is it after 15 minutes?", 100, "counts/s", "800 → 400 → 200 → 100."],
      ["m", "The half-life is the time for", "the activity to halve", "the whole sample to decay", "the count rate to double", "one nucleus to decay", "It applies to a large number of nuclei."]
    ],
    "Contamination and irradiation": [
      ["m", "Radioactive contamination means", "unwanted radioactive atoms are on or in an object", "an object is exposed to radiation from outside", "an object becomes magnetic", "a nucleus fissions", "The radioactive material itself is present."],
      ["t", "An object that is irradiated becomes radioactive.", false, "Irradiation is exposure; the object does not become radioactive."],
      ["m", "Why is an alpha emitter most dangerous inside the body?", "it is very ionising", "it penetrates through the body", "it is very hot", "it has a long wavelength", "All its energy is absorbed by nearby tissue."]
    ],
    "Background radiation and uses": [
      ["m", "What is the largest natural source of background radiation?", "radon gas", "cosmic rays", "food", "medical X-rays", "Radon from rocks in the ground."],
      ["m", "A medical tracer should have a half-life that is", "short", "very long", "infinite", "zero", "It should be gone soon but last long enough to scan."],
      ["m", "Gamma emitters are used as medical tracers because", "gamma passes out of the body and can be detected", "it is stopped by skin", "it makes the body glow", "it is cheap", "Alpha would not escape."]
    ],
    "Nuclear fission": [
      ["m", "Nuclear fission is", "the splitting of a large unstable nucleus", "the joining of two small nuclei", "the decay of a neutron", "a chemical reaction", "It releases energy and neutrons."],
      ["m", "Control rods in a reactor", "absorb neutrons", "slow neutrons", "cool the core", "produce neutrons", "They control the rate of the chain reaction."],
      ["m", "The moderator in a reactor", "slows down neutrons", "absorbs neutrons", "carries the electricity", "is the fuel", "Slow neutrons are more likely to cause fission."]
    ],
    "Nuclear fusion": [
      ["m", "Nuclear fusion is", "the joining of two light nuclei", "the splitting of a heavy nucleus", "radioactive decay", "a chemical reaction", "It releases energy."],
      ["m", "Fusion needs very high temperatures because", "the positive nuclei repel each other", "the neutrons are heavy", "electrons block the way", "it is endothermic", "They need enough energy to get close together."],
      ["t", "The Sun gets its energy from fission.", false, "The Sun uses fusion of hydrogen into helium."]
    ],

    "Scalars, vectors and forces": [
      ["s", "Sort these quantities.", { "Scalar": ["Mass", "Speed", "Distance", "Energy"], "Vector": ["Velocity", "Force", "Displacement", "Acceleration"] }, "Vectors have direction as well as size."],
      ["m", "A vector quantity has", "magnitude and direction", "magnitude only", "direction only", "no units", "A force of 10 N to the left is not the same as 10 N to the right."],
      ["t", "Speed is a vector.", false, "Speed has no direction; velocity does."]
    ],
    "Weight and gravity": [
      () => { const m = ri(2, 80); return ["n", "What is the weight of a " + m + " kg object? (g = 10 N/kg)", m * 10, "N", "W = m g."]; },
      ["n", "What is the weight of a 60 kg person on the Moon, where g = 1.6 N/kg?", 96, "N", "60 × 1.6."],
      ["m", "A person travels to the Moon. Their", "mass stays the same, weight is less", "mass is less, weight stays the same", "mass and weight stay the same", "mass and weight both increase", "Mass is the amount of matter; weight depends on gravity."],
      ["t", "Weight is measured in kilograms.", false, "Weight is a force, measured in newtons."]
    ],
    "Resultant forces": [
      () => { const a = ri(10, 40), b = ri(1, 9); return ["n", "A box is pushed with " + a + " N to the right and " + b + " N to the left. What is the resultant force to the right?", a - b, "N", "Subtract forces in opposite directions."]; },
      ["n", "Two forces of 15 N act in opposite directions on an object. What is the resultant force?", 0, "N", "The forces are balanced."],
      ["m", "A resultant force of zero means the object is", "at rest or moving at constant velocity", "accelerating", "slowing down", "moving in a circle", "Newton's first law."]
    ],
    "Work done": [
      () => { const F = ri(2, 50), s = ri(2, 20); return ["n", "A force of " + F + " N moves an object " + s + " m. How much work is done?", F * s, "J", "W = F s."]; },
      ["n", "How much work is done pushing with 40 N through 5 m?", 200, "J", "40 × 5."],
      ["m", "Work done against friction is mostly transferred as", "thermal energy", "chemical energy", "sound only", "nuclear energy", "Surfaces rubbing together get warm."]
    ],
    "Springs and elasticity": [
      () => { const k = ri(10, 100), e = ri(1, 9) / 10; return ["n", "A spring with spring constant " + k + " N/m is stretched by " + e + " m. What is the force?", Math.round(k * e * 10) / 10, "N", "F = k e.", 0.05]; },
      ["n", "A spring has k = 40 N/m and is extended 0.2 m. What force is needed?", 8, "N", "40 × 0.2."],
      ["m", "Hooke's law says the extension of a spring is", "directly proportional to the force, up to the limit of proportionality", "inversely proportional to the force", "constant", "proportional to the mass of the spring", "A straight line through the origin on a force–extension graph."],
      ["t", "Past the limit of proportionality a spring may not return to its original length.", true, "Plastic deformation occurs."]
    ],
    "Moments, levers and gears": [
      () => { const F = ri(5, 40), d = ri(1, 5); return ["n", "A force of " + F + " N acts at " + d + " m from a pivot. What is the moment?", F * d, "Nm", "Moment = force × perpendicular distance."]; },
      ["n", "A 20 N force acts 3 m to the left of a pivot. What force at 2 m to the right balances it?", 30, "N", "20 × 3 = F × 2."],
      ["t", "A moment is force multiplied by the perpendicular distance from the pivot.", true, "That is the definition."],
      ["m", "Two meshed gears turn", "in opposite directions", "in the same direction", "at the same speed always", "without touching", "Adjacent gears reverse direction."]
    ],
    "Pressure in fluids": [
      () => { const F = ri(2, 20) * 10, A = pick([0.5, 2, 4, 5]); return ["n", "A force of " + F + " N acts on an area of " + A + " m². What is the pressure?", F / A, "Pa", "p = F ÷ A."]; },
      ["n", "What is the pressure at a depth of 2 m in water? (density 1000 kg/m³, g = 10 N/kg)", 20000, "Pa", "p = h ρ g = 2 × 1000 × 10."],
      ["m", "The pressure in a liquid increases with", "depth", "width of the container", "surface area", "temperature only", "More liquid is above you."],
      ["t", "The pressure in a liquid acts in one direction only.", false, "It acts in all directions."]
    ],
    "Distance, speed and velocity": [
      () => { const v = ri(2, 30), t = ri(2, 20); return ["n", "A car travels " + v * t + " m in " + t + " s. What is its speed?", v, "m/s", "Speed = distance ÷ time."]; },
      ["n", "A person walks at 1.5 m/s for 60 s. How far do they go?", 90, "m", "1.5 × 60."],
      ["m", "What is a typical walking speed?", "1.5 m/s", "15 m/s", "0.15 m/s", "150 m/s", "About 5 km/h."],
      ["m", "Velocity is", "speed in a given direction", "distance ÷ time only", "acceleration × time", "a scalar", "It is a vector."]
    ],
    "Motion graphs and acceleration": [
      () => { const u = ri(0, 10), a = ri(2, 6), t = ri(2, 8); return ["n", "A car speeds up from " + u + " m/s to " + (u + a * t) + " m/s in " + t + " s. What is its acceleration?", a, "m/s²", "a = (v − u) ÷ t."]; },
      ["n", "An object starts from rest and accelerates at 2 m/s² for a distance of 9 m. What is its final speed? (v² = u² + 2as)", 6, "m/s", "v² = 2 × 2 × 9 = 36."],
      ["m", "The area under a velocity–time graph represents", "distance travelled", "acceleration", "speed", "time", "Area = velocity × time."],
      ["m", "A horizontal line on a velocity–time graph means", "constant velocity", "no movement", "acceleration", "deceleration", "The velocity is not changing."]
    ],
    "Terminal velocity": [
      ["m", "At terminal velocity the resultant force is", "zero", "equal to the weight", "downwards", "increasing", "Weight and drag are balanced."],
      ["m", "Air resistance on a falling object increases as", "its speed increases", "its mass increases", "it falls further", "gravity drops", "Faster objects push more air out of the way."],
      ["t", "Terminal velocity depends on the shape of the object.", true, "A parachute has a lower terminal velocity than a streamlined diver."]
    ],
    "Newton's laws": [
      () => { const m = ri(2, 20) * 100, a = ri(1, 5); return ["n", "A " + m + " kg car accelerates at " + a + " m/s². What is the resultant force?", m * a, "N", "F = m a."]; },
      () => { const m = ri(2, 10), a = ri(2, 8); return ["n", "A resultant force of " + m * a + " N acts on a " + m + " kg object. What is its acceleration?", a, "m/s²", "a = F ÷ m."]; },
      ["m", "Inertia is", "the tendency of an object to resist changes in its motion", "a type of force", "the same as weight", "the speed of an object", "Newton's first law."],
      ["m", "Newton's third law pairs of forces act on", "different objects", "the same object", "no object", "the Earth only", "Equal and opposite, but on two different objects."]
    ],
    "Stopping distances": [
      () => { const v = ri(10, 30), t = pick([0.5, 0.6, 0.8, 1]); return ["n", "A car travels at " + v + " m/s and the driver's reaction time is " + t + " s. What is the thinking distance?", Math.round(v * t * 10) / 10, "m", "Thinking distance = speed × reaction time."]; },
      ["m", "Braking distance increases with", "higher speed and wet roads", "lower speed", "new tyres", "dry roads", "More energy must be removed."],
      ["t", "Tiredness increases the thinking distance.", true, "It slows the reaction time."],
      ["m", "Stopping distance is", "thinking distance plus braking distance", "braking distance only", "thinking distance only", "thinking distance minus braking distance", "Both parts matter."]
    ],
    "Momentum": [
      () => { const m = ri(2, 20), v = ri(2, 10); return ["n", "What is the momentum of a " + m + " kg object moving at " + v + " m/s?", m * v, "kg m/s", "p = m v."]; },
      ["n", "A 2 kg trolley moving at 3 m/s hits a stationary 1 kg trolley and they stick together. What is their speed afterwards?", 2, "m/s", "Momentum before 6; mass after 3."],
      ["m", "Momentum is conserved in", "a closed system with no external forces", "every situation", "only elastic collisions", "no situation", "Total momentum before equals after."],
      ["t", "Momentum is a vector quantity.", true, "It has direction as well as size."]
    ],

    "Types of wave": [
      ["p", "Match the wave to its type.", [["Light", "Transverse"], ["Sound", "Longitudinal"], ["Water ripples", "Transverse"], ["Ultrasound", "Longitudinal"]]],
      ["m", "In a transverse wave the oscillations are", "at right angles to the direction of travel", "parallel to the direction of travel", "random", "circular", "Like a wave on a rope."],
      ["m", "A region where the particles are squashed together in a longitudinal wave is a", "compression", "rarefaction", "crest", "trough", "Rarefactions are where they are spread out."]
    ],
    "Wave properties and speed": [
      () => { const f = ri(2, 50), l = ri(1, 10); return ["n", "A wave has frequency " + f + " Hz and wavelength " + l + " m. What is its speed?", f * l, "m/s", "v = f λ."]; },
      () => { const f = pick([2, 4, 5, 10, 20, 25]); return ["n", "A wave has frequency " + f + " Hz. What is its period?", 1 / f, "s", "T = 1 ÷ f."]; },
      ["m", "The amplitude of a wave is", "the maximum displacement from the rest position", "the distance between two crests", "the number of waves per second", "the speed of the wave", "It relates to the energy of the wave."],
      ["m", "The unit of frequency is", "hertz", "metre", "second", "watt", "1 Hz is one wave per second."]
    ],
    "Reflection and refraction": [
      ["m", "A ray of light entering glass from air bends", "towards the normal", "away from the normal", "along the normal", "it does not bend", "Light slows down in the denser material."],
      ["m", "Specular reflection happens on", "a smooth surface", "a rough surface", "a black surface", "a transparent surface", "Parallel rays stay parallel."],
      ["t", "The angle of incidence equals the angle of reflection.", true, "That is the law of reflection."]
    ],
    "Sound and ultrasound": [
      ["m", "The range of human hearing is about", "20 Hz to 20 000 Hz", "2 Hz to 200 Hz", "200 Hz to 2000 Hz", "20 kHz to 200 kHz", "Ultrasound is above this range."],
      ["n", "A sonar pulse takes 0.2 s to return from the seabed. Sound travels at 1500 m/s in water. How deep is it?", 150, "m", "Distance = 1500 × 0.2 ÷ 2."],
      ["m", "Ultrasound is used in", "prenatal scans", "microwave ovens", "X-rays", "radio", "Reflections from boundaries build an image."],
      ["m", "A bat's echo takes 0.1 s. Sound speed is 340 m/s. How far away is the object?", "17 m", "34 m", "3.4 m", "170 m", "340 × 0.1 ÷ 2 = 17."]
    ],
    "The EM spectrum": [
      ["o", "Order the EM spectrum from lowest to highest frequency.", ["Radio waves", "Microwaves", "Infrared", "Visible light", "Ultraviolet", "X-rays", "Gamma rays"], "Frequency and energy increase while wavelength decreases."],
      ["m", "All electromagnetic waves travel through a vacuum at", "3 × 10⁸ m/s", "340 m/s", "3 × 10⁶ m/s", "1 × 10⁸ m/s", "The speed of light."],
      ["t", "Gamma rays have the longest wavelength.", false, "They have the shortest."]
    ],
    "EM wave properties and dangers": [
      ["m", "Too much ultraviolet radiation can cause", "skin cancer", "heat stroke", "radio interference", "deafness", "It is ionising."],
      ["m", "X-rays and gamma rays are dangerous because they are", "ionising", "hot", "very long wavelength", "loud", "They can damage cells and DNA."],
      ["m", "Microwaves can heat food because they are absorbed by", "water molecules", "oxygen", "metal", "glass", "The water gains thermal energy."]
    ],
    "Uses of EM waves": [
      ["p", "Match the EM wave to a use.", [["Radio waves", "Television broadcasting"], ["Microwaves", "Satellite communication"], ["Infrared", "Remote controls and thermal imaging"], ["X-rays", "Medical imaging of bones"], ["Gamma rays", "Sterilising equipment and treating cancer"]]],
      ["m", "Optical fibres use", "visible light or infrared", "radio waves", "gamma rays", "X-rays", "Total internal reflection carries the signal."],
      ["t", "Ultraviolet light can be used to detect forged banknotes.", true, "Security markings fluoresce."]
    ],
    "Lenses": [
      ["m", "A convex lens", "brings parallel rays together", "spreads rays out", "reflects light", "absorbs light", "It is a converging lens."],
      ["n", "An image is 6 cm tall and the object is 2 cm tall. What is the magnification?", 3, "", "Magnification = image height ÷ object height."],
      ["t", "A virtual image can be projected onto a screen.", false, "Only real images can."]
    ],
    "Colour and visible light": [
      ["m", "A red object appears red because it", "reflects red light and absorbs the others", "absorbs red light", "emits red light", "transmits all light", "The other colours are absorbed."],
      ["m", "White light is split into a spectrum by", "a prism", "a mirror", "a lens only", "a filter", "Different colours refract by different amounts."],
      ["t", "A green filter only transmits green light.", true, "Other colours are absorbed."]
    ],
    "Black body radiation": [
      ["m", "All objects emit", "infrared radiation", "only visible light", "only sound", "no radiation", "The hotter, the more they emit."],
      ["m", "As the temperature of an object increases, the radiation emitted", "has more intensity and shorter wavelengths", "has less intensity", "stays the same", "stops", "The peak wavelength shifts."],
      ["t", "The Earth's temperature is steady when it absorbs as much radiation as it emits.", true, "Absorbed power equals emitted power."]
    ],

    "Magnets and fields": [
      ["m", "Which of these materials is magnetic?", "iron", "copper", "aluminium", "plastic", "Iron, steel, cobalt and nickel are magnetic."],
      ["m", "The magnetic field of a bar magnet is strongest", "at the poles", "in the middle", "far away", "at the sides", "Field lines are closest together there."],
      ["t", "Magnetic field lines outside a bar magnet go from the south pole to the north pole.", false, "They go from north to south."],
      ["m", "A compass needle points north because", "it lines up with the Earth's magnetic field", "it is attracted to the Sun", "it is made of gold", "gravity pulls it", "The Earth has a magnetic field."]
    ],
    "Electromagnets": [
      ["m", "How can you make an electromagnet stronger?", "more turns, more current or an iron core", "less current", "a plastic core", "fewer turns", "All of those increase the field."],
      ["t", "An electromagnet can be switched off.", true, "No current means no magnetic field."],
      ["m", "The magnetic field around a straight wire carrying current", "is in circles around the wire", "points along the wire", "is zero", "is random", "Use the right-hand grip rule."]
    ],
    "The motor effect": [
      ["m", "The force on a current-carrying wire in a magnetic field is largest when the wire is", "at 90° to the field", "parallel to the field", "at 45°", "far from the magnet", "Only the part of the field perpendicular to the wire counts."],
      () => { const B = pick([0.2, 0.5, 1]), I = ri(2, 6), l = pick([0.1, 0.2, 0.5]); return ["n", "A " + l + " m wire carries " + I + " A in a " + B + " T field at right angles. What is the force?", Math.round(B * I * l * 1000) / 1000, "N", "F = B I l.", 0.005]; },
      ["m", "Which rule gives the direction of the force on a wire?", "Fleming's left-hand rule", "Fleming's right-hand rule", "Pythagoras", "Ohm's law", "Thumb = force, first finger = field, second finger = current."]
    ],
    "Electric motors": [
      ["m", "The commutator in a d.c. motor", "reverses the current every half turn", "increases the voltage", "cools the coil", "holds the magnets", "This keeps the coil turning in the same direction."],
      ["m", "A motor can be made to turn faster by", "using a stronger magnetic field or more current", "using less current", "reversing the magnets", "adding a resistor", "That increases the force."],
      ["m", "A motor transfers energy", "from electrical to kinetic", "from kinetic to electrical", "from chemical to thermal", "from nuclear to light", "It uses the motor effect."]
    ],
    "Loudspeakers and microphones": [
      ["m", "A loudspeaker uses", "the motor effect", "the generator effect", "static electricity", "refraction", "A changing current causes a coil to move the cone."],
      ["m", "A microphone converts", "sound into an electrical signal", "electricity into sound", "light into heat", "heat into sound", "A moving diaphragm induces a voltage."]
    ],
    "Generator effect": [
      ["m", "A potential difference is induced in a wire when", "it moves through a magnetic field", "it is heated", "it is painted", "it is in the dark", "Cutting field lines induces a voltage."],
      ["m", "Which does NOT increase the output of a generator?", "slowing the rotation", "a stronger magnet", "more turns on the coil", "faster rotation", "Slower rotation reduces the induced voltage."],
      ["t", "A dynamo produces alternating current.", true, "The polarity reverses as the coil rotates."]
    ],
    "Transformers": [
      () => { const Np = pick([200, 400, 500, 1000]), k = pick([2, 4, 5, 10]), Vp = ri(2, 20) * 10; return ["n", "A transformer has " + Np + " turns on the primary coil and " + Np / k + " turns on the secondary. The primary voltage is " + Vp + " V. What is the secondary voltage?", Vp / k, "V", "Vs ÷ Vp = Ns ÷ Np."]; },
      ["n", "A transformer is 100% efficient. The primary is 230 V and 2 A, and the secondary is 23 V. What is the secondary current?", 20, "A", "Power in = power out: 230 × 2 = 23 × I."],
      ["m", "A step-up transformer has", "more turns on the secondary coil", "more turns on the primary coil", "the same number of turns", "no iron core", "More turns means a higher voltage."],
      ["t", "Transformers work with direct current.", false, "They need a changing magnetic field, so a.c."]
    ],

    "Our solar system": [
      ["o", "Order the planets by distance from the Sun, nearest first.", ["Mercury", "Venus", "Earth", "Mars", "Jupiter"], "My Very Easy Method Just Speeds Up Naming."],
      ["m", "A moon is", "a natural satellite of a planet", "a small star", "a type of comet", "a planet", "It orbits a planet."],
      ["t", "The Sun is a star.", true, "It is the star at the centre of our solar system."]
    ],
    "Life cycle of a star": [
      ["o", "Order the life cycle of a star like the Sun.", ["Nebula", "Protostar", "Main sequence star", "Red giant", "White dwarf"], "Gravity forms the star, fusion keeps it stable, then it runs out of hydrogen."],
      ["m", "A supernova produces", "elements heavier than iron", "only hydrogen", "dark matter", "nothing new", "The explosion forms heavy elements."],
      ["m", "A main sequence star is stable because", "the outward pressure from fusion balances gravity", "it is cold", "it has no mass", "it has stopped fusing", "Equilibrium between forces."],
      ["m", "A star much bigger than the Sun may end as", "a neutron star or black hole", "a white dwarf", "a nebula", "a planet", "The core collapses after a supernova."]
    ],
    "Orbits and satellites": [
      ["m", "An object in circular orbit has constant speed but changing velocity because", "its direction keeps changing", "its mass changes", "it speeds up", "gravity switches off", "Velocity is a vector."],
      ["m", "A satellite in a lower orbit moves", "faster", "slower", "at the same speed", "not at all", "Stronger gravity needs a higher speed."],
      ["t", "Gravity provides the force that keeps a satellite in orbit.", true, "It acts towards the centre."],
      ["m", "A geostationary satellite has an orbital period of", "24 hours", "90 minutes", "1 year", "12 hours", "It stays above one point on the equator."]
    ],
    "Red-shift and the Big Bang": [
      ["m", "Red-shift in light from a galaxy shows that the galaxy is", "moving away from us", "moving towards us", "standing still", "very small", "The wavelengths are stretched."],
      ["m", "The cosmic microwave background radiation is evidence for", "the Big Bang", "the Steady State theory", "black holes", "dark energy only", "It is the leftover radiation from the early universe."],
      ["t", "Galaxies that are further away show a greater red-shift.", true, "They are moving away faster."],
      ["m", "The Big Bang theory says the universe", "began from a very small, hot, dense region and expanded", "has always been the same", "is shrinking", "is infinite and static", "Expansion started about 13.8 billion years ago."]
    ]
  });
})();
