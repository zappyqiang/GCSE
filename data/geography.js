(function () {
var G = GAME;
G.configure({
  key: "geography", subject: "Geography", spec: "AQA 8035 · 3 papers", title: "Geography course", tiered: false,
  specUrl: "https://www.aqa.org.uk/subjects/geography/gcse/geography-8035", channel: "Internet Geography",
  intro: "The physical and human geography you need for the AQA exam: hazards, ecosystems, rivers and coasts, cities, development and resources.",
  finalName: "Final assessment", sheetName: "Key terms", sheetNote: "Paper 1 is physical, Paper 2 is human, and Paper 3 covers geographical applications and fieldwork skills. Case studies matter, so learn named places."
});
G.sheet = [
  { h: "Key terms", rows: [
    ["Epicentre", "Point on the surface directly above the focus of an earthquake"], ["Focus", "The point underground where an earthquake starts"], ["Hydrograph", "Graph showing river discharge over time"], ["Erosion", "Wearing away of rock or soil"], ["Longshore drift", "Zigzag movement of sediment along a coast"], ["Biome", "A large ecosystem such as tropical rainforest"], ["Urbanisation", "Growth of the proportion of people living in cities"], ["Sustainability", "Meeting present needs without harming future generations"], ["HDI", "Human Development Index: life expectancy, education and income"], ["Globalisation", "Increasing links between countries"]
  ] },
  { h: "Case studies to learn", rows: [
    ["Tectonic hazards", "A high-income and low-income example, for example Japan 2011 and Nepal 2015"], ["Tropical storm", "Typhoon Haiyan 2013"], ["Rainforest", "Malaysia or the Amazon"], ["Hot desert", "Sahara or Thar"], ["River", "River Tees or another UK river"], ["Coast", "Holderness or Lyme Regis"], ["UK city", "London, Bristol or Birmingham"], ["Low-income city", "Rio, Lagos or Mumbai"], ["Development", "Nigeria or India"]
  ] }
];

G.topic("Natural hazards", "🌋", "Paper 1", [
{ t: "Tectonic plates and hazards", icon: "🌍",
  c: ["The Earth's crust is split into tectonic plates moving by convection currents in the mantle.", "At constructive margins plates move apart. At destructive margins an oceanic plate sinks under a continental one. At conservative margins plates slide past.", "Earthquakes happen at all three; volcanoes mainly at constructive and destructive margins.", "The Pacific 'Ring of Fire' has many volcanoes and earthquakes."],
  k: "Plate margins make earthquakes and volcanoes.",
  q: [["m", "At which margin does subduction occur?", "destructive", "constructive", "conservative", "none", "The denser oceanic plate sinks."],
      ["s", "Plate margin?", { "Destructive": ["Subduction", "Andes mountains"], "Constructive": ["Plates move apart", "Mid-Atlantic Ridge"], "Conservative": ["Plates slide past", "San Andreas Fault"] }],
      ["t", "The Ring of Fire is around the Pacific Ocean.", true, "Many plate boundaries lie there."]] },

{ t: "Earthquake impacts and responses", icon: "🏚️",
  c: ["Primary effects include collapsed buildings and deaths. Secondary effects include fires, tsunamis, disease and lost jobs.", "Immediate responses are search and rescue, food, water and shelters. Long-term responses rebuild and strengthen buildings.", "Richer countries such as Japan have better preparation, building design and warning systems.", "Poorer countries often suffer greater loss of life and slower recovery."],
  k: "Wealth affects how well a country copes.",
  q: [["m", "A tsunami after an earthquake is a", "secondary effect", "primary effect", "plate margin", "cause", "It happens as a result."],
      ["s", "Primary or secondary?", { "Primary": ["Buildings collapse", "People killed by falling debris"], "Secondary": ["Fires break out", "Disease spreads"] }],
      ["t", "Low-income countries usually recover faster.", false, "They have fewer resources."]] },

{ t: "Tropical storms", icon: "🌀",
  c: ["Tropical storms form over warm oceans above 27 degrees Celsius, between 5 and 30 degrees north and south of the Equator.", "Warm moist air rises, creating low pressure; winds spiral inwards. The eye is calm.", "Hazards include strong winds, storm surges and flooding. Climate change may increase intensity.", "Management includes prediction, warnings, evacuation, shelters and planning."],
  k: "Warm seas power storms.",
  q: [["m", "Tropical storms need sea temperatures above", "27 degrees Celsius", "10 degrees Celsius", "40 degrees Celsius", "0 degrees Celsius", "Warm water provides energy."],
      ["m", "The calm centre of a storm is the", "eye", "wall", "tail", "front", "It has sinking air."],
      ["t", "Tropical storms mainly form near the poles.", false, "They form near the tropics."]] },

{ t: "Weather hazards and climate change", icon: "🌡️",
  c: ["The UK experiences extreme weather including heatwaves, floods and storms.", "Climate change is caused by greenhouse gases from burning fossil fuels, farming and deforestation.", "Evidence includes rising temperatures, ice melting and sea level rise.", "Mitigation reduces causes (renewable energy). Adaptation copes with effects (flood defences)."],
  k: "Mitigate the cause, adapt to the effect.",
  q: [["m", "Planting trees to absorb carbon is", "mitigation", "adaptation", "erosion", "weathering", "It reduces greenhouse gases."],
      ["m", "Building sea walls is", "adaptation", "mitigation", "deposition", "migration", "It copes with sea-level rise."],
      ["t", "Carbon dioxide is a greenhouse gas.", true, "It traps heat in the atmosphere."]] }
]);

G.topic("Ecosystems and landscapes", "🌿", "Paper 1", [
{ t: "Tropical rainforests", icon: "🌴",
  c: ["Rainforests lie near the Equator with hot, wet weather all year and layers: emergent, canopy, understorey, shrub.", "Plants are adapted: drip-tips, buttress roots and tall trees. Nutrient cycling is fast and soils are thin.", "Deforestation is caused by logging, farming, mining and roads. It reduces biodiversity and raises carbon dioxide.", "Sustainable management includes selective logging, ecotourism and protected areas."],
  k: "Fast cycle, fragile soil.",
  q: [["m", "Drip-tip leaves help plants", "shed excess rain", "store water", "attract insects", "absorb heat", "Water runs off quickly."],
      ["m", "The tallest rainforest layer is the", "emergent", "canopy", "understorey", "shrub", "Emergents rise above the canopy."],
      ["t", "Deforestation reduces biodiversity.", true, "Habitats are lost."]] },

{ t: "Hot deserts", icon: "🏜️",
  c: ["Hot deserts have little rainfall (under 250 mm a year) and high daytime temperatures.", "Plants such as cacti store water; animals like camels are adapted to heat and lack of water.", "Desertification is the spread of desert, caused by overgrazing, farming and climate change.", "Solutions include planting trees and better farming methods."],
  k: "Little water, big adaptations.",
  q: [["m", "Annual rainfall in a hot desert is under", "250 mm", "1000 mm", "2000 mm", "500 mm", "It is very dry."],
      ["m", "Desertification is", "spread of desert land", "growth of forests", "river erosion", "tsunami", "It happens at desert edges."],
      ["t", "A cactus stores water in its stem.", true, "This helps it survive."]] },

{ t: "River landscapes", icon: "🏞️",
  c: ["Rivers erode through hydraulic action, abrasion, attrition and solution. Transport includes traction, saltation, suspension and solution.", "Upper courses have V-shaped valleys and waterfalls; lower courses have meanders, floodplains and levees.", "Floods are caused by heavy rain and impermeable surfaces. Hard engineering (dams) and soft engineering (floodplain zoning) manage floods.", "Hydrographs show lag time and peak discharge."],
  k: "Steep and narrow upstream, wide and flat downstream.",
  q: [["m", "Which landform forms in the lower course?", "meander", "waterfall", "V-shaped valley", "interlocking spur", "Meanders wind across floodplains."],
      ["s", "Hard or soft engineering?", { "Hard": ["Dams", "Embankments"], "Soft": ["Floodplain zoning", "Planting trees"] }],
      ["t", "A short lag time means a flashier flood.", true, "Water reaches the river quickly."]] },

{ t: "Coastal landscapes", icon: "🌊",
  c: ["Waves erode with hydraulic action and abrasion. Cliffs, wave-cut platforms, caves, arches and stacks form on headlands.", "Longshore drift moves sediment along the coast, forming beaches, spits and bars.", "Coastal management includes hard options (sea walls, groynes, rock armour) and soft options (beach nourishment, managed retreat).", "Costs, benefits and the value of land guide decisions."],
  k: "Cave, arch, stack, stump.",
  q: [["o", "Order headland erosion landforms.", ["Crack", "Cave", "Arch", "Stack", "Stump"]],
      ["m", "Groynes are used to", "trap sediment", "build cliffs", "cause erosion", "make waves", "They stop longshore drift."],
      ["t", "Managed retreat allows the sea to flood land.", true, "It is a soft engineering option."]] }
]);

G.topic("Urban issues and development", "🏙️", "Paper 2", [
{ t: "Urbanisation and megacities", icon: "🌆",
  c: ["Urbanisation is rapid in low and middle-income countries because of rural-urban migration.", "Push factors include poverty and poor services; pull factors include jobs and education.", "A megacity has more than 10 million people. Squatter settlements often have poor housing and sanitation.", "Some cities improve with self-help schemes and better transport."],
  k: "Push from the countryside, pull to the city.",
  q: [["s", "Push or pull?", { "Push": ["Lack of jobs", "Drought"], "Pull": ["Better schools", "Higher wages"] }],
      ["m", "A megacity has over", "10 million people", "1 million people", "100,000 people", "5 million people", "That is the definition."],
      ["t", "Urbanisation is when cities grow in proportion of population.", true, "More people live in towns."]] },

{ t: "Urban change in the UK", icon: "🏘️",
  c: ["UK cities change through deindustrialisation, regeneration and migration.", "Brownfield sites are reused; greenfield sites are new. Urban sprawl takes countryside.", "Sustainable cities use public transport, recycling and green space.", "Inequality can be seen between inner-city areas and suburbs."],
  k: "Cities change to stay liveable.",
  q: [["m", "A brownfield site is", "land used before", "farmland", "ocean", "forest", "It is previously developed."],
      ["m", "Regeneration means", "improving run-down areas", "building farms", "ending growth", "removing roads", "It brings investment."],
      ["t", "Urban sprawl takes over countryside.", true, "Cities spread outwards."]] },

{ t: "Development and inequality", icon: "📊",
  c: ["Development is measured with GNI per capita, HDI, life expectancy and literacy.", "The development gap has causes such as colonial history, trade, conflict, climate and corruption.", "Strategies include aid, fair trade, debt relief, investment and tourism.", "Nigeria or India can show how a country changes and its place in the world."],
  k: "No single measure tells the whole story.",
  q: [["m", "HDI includes", "income, education and life expectancy", "rainfall only", "population only", "area only", "It combines three measures."],
      ["m", "Fair trade aims to", "give farmers a fair price", "increase debt", "stop exports", "raise taxes", "It supports producers."],
      ["t", "Aid always solves poverty.", false, "Impact depends on how it is used."]] }
]);

G.topic("Resource management", "💧", "Paper 2", [
{ t: "Food, water and energy", icon: "🌾",
  c: ["Resources are food, water and energy. Demand rises with population and wealth.", "Global patterns of supply and demand are unequal. Food insecurity affects many places.", "Energy comes from fossil fuels, nuclear and renewables. Sustainable use is important.", "Water supply uses reservoirs, groundwater and transfers; conservation reduces use."],
  k: "Supply and demand are uneven.",
  q: [["m", "Which is a renewable energy source?", "wind", "coal", "oil", "gas", "It does not run out."],
      ["m", "Water transfer means", "moving water between regions", "making rain", "desalination", "melting ice", "Pipes and canals move it."],
      ["t", "Fossil fuels are finite.", true, "They will eventually run out."]] },

{ t: "Sustainable resource use", icon: "♻️",
  c: ["Sustainable use means meeting needs without damaging future supply.", "Reduce, reuse and recycle lowers demand.", "Local food, organic farming and appropriate technology help.", "Governments and individuals can both take action."],
  k: "Reduce, reuse, recycle.",
  q: [["o", "Order the waste hierarchy from best.", ["Reduce", "Reuse", "Recycle", "Dispose"]],
      ["m", "Organic farming avoids", "artificial chemicals", "water", "soil", "sunshine", "It uses natural methods."],
      ["t", "Food miles are the distance food travels.", true, "Lower miles mean less carbon."]] }
]);

G.topic("Geographical skills", "🗺️", "Paper 3", [
{ t: "Map skills", icon: "🧭",
  c: ["Grid references: four-figure refers to a square, six-figure to a precise point. Eastings come first, then northings.", "Contour lines show height; close together means steep.", "Scale: 1:50 000 means 1 cm on the map is 500 m on the ground.", "Use compass bearings and keys to describe features."],
  k: "Along the corridor, then up the stairs.",
  q: [["m", "In a grid reference you give", "eastings then northings", "northings then eastings", "height only", "scale only", "Along first, then up."],
      ["n", "On a 1:50 000 map, 4 cm represents how many metres?", 2000, "m", "1 cm = 500 m."],
      ["t", "Close contour lines show steep slopes.", true, "Height changes quickly."]] },

{ t: "Fieldwork", icon: "📝",
  c: ["Fieldwork has stages: enquiry question, method, data collection, presentation, analysis, conclusion and evaluation.", "Primary data is collected yourself; secondary data comes from others.", "Sampling can be random, systematic or stratified. Risk assessment keeps you safe.", "Evaluate reliability, limitations and improvements."],
  k: "Question, collect, present, analyse, conclude, evaluate.",
  q: [["m", "Data you collect yourself is", "primary", "secondary", "tertiary", "digital", "It is first-hand."],
      ["s", "Primary or secondary?", { "Primary": ["Your own river measurements", "Questionnaire you gave out"], "Secondary": ["Census data", "Weather records from a website"] }],
      ["t", "Fieldwork must include evaluation.", true, "You judge the method and results."]] }
]);
})();
