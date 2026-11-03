(function () {
var G = GAME;
G.configure({
  key: "physics", subject: "Physics", spec: "AQA 8463 · Papers 1 and 2", title: "Physics course",
  intro: "The full AQA GCSE Physics specification in short, focused lessons, with exam-style questions and interactive labs for the ideas that are hard to picture.",
  finalName: "Final assessment", sheetName: "Equation sheet", sheetNote: "In the summer 2027 exams every Physics paper comes with a full equation sheet, and AQA says clean sheets continue from 2028. You still need to choose and use each equation correctly. Check your board's latest notice.",
  labsIntro: "Change the variables and watch the system respond. Reach each target to earn XP.",
  topics: {
    "Planet Energy": ["Energy", "Stores and transfers, work, power, efficiency, and energy resources."],
    "Planet Electric": ["Electricity", "Circuits, resistance, series and parallel, mains electricity and power."],
    "Particle Planet": ["Particle model of matter", "Density, states of matter, specific heat capacity and latent heat, gas pressure."],
    "Planet Atom": ["Atomic structure", "Models of the atom, radioactive decay, half-life, fission and fusion."],
    "Forces Planet": ["Forces", "Vectors, Newton's laws, motion graphs, momentum, moments and pressure."],
    "Wave World": ["Waves", "Wave properties, the electromagnetic spectrum, reflection, refraction, sound and lenses."],
    "Magnet Moon": ["Magnetism and electromagnetism", "Magnetic fields, motors, generators, transformers and the solenoid."],
    "Space Station": ["Space physics", "The Solar System, life cycle of stars, orbits and red-shift."]
  }
});
G.sheet = [
  { h: "Energy (Paper 1)", rows: [
    ["Kinetic energy", "Eₖ = ½ m v²", "J, kg, m/s"], ["Elastic potential energy", "Eₑ = ½ k e²", "J, N/m, m"], ["Gravitational potential energy", "Eₚ = m g h", "J, kg, N/kg, m"],
    ["Thermal energy change", "ΔE = m c Δθ", "J, kg, J/kg °C, °C"], ["Power", "P = E ÷ t = W ÷ t", "W, J, s"], ["Efficiency", "useful output ÷ total input", "Energy or power, no units"]
  ] },
  { h: "Electricity (Paper 1)", rows: [
    ["Charge", "Q = I t", "C, A, s"], ["Potential difference", "V = I R", "V, A, Ω"], ["Electrical power", "P = V I = I² R", "W"], ["Energy transferred", "E = P t = Q V", "J"]
  ] },
  { h: "Particles (Paper 1)", rows: [
    ["Density", "ρ = m ÷ V", "kg/m³, kg, m³"], ["Thermal energy for a change of state", "E = m L", "J, kg, J/kg"], ["Gas at constant temperature (separate)", "p V = constant", "Pa, m³"]
  ] },
  { h: "Forces (Paper 2)", rows: [
    ["Weight", "W = m g", "N, kg, N/kg"], ["Work done", "W = F s", "J, N, m"], ["Force on a spring", "F = k e", "N, N/m, m"], ["Moment (separate)", "M = F d", "Nm, N, m"], ["Pressure (separate)", "p = F ÷ A", "Pa, N, m²"],
    ["Liquid pressure (separate, Higher)", "p = h ρ g", "Pa, m, kg/m³, N/kg"], ["Speed", "s = v t", "m, m/s, s"], ["Acceleration", "a = Δv ÷ t", "m/s²"], ["Uniform acceleration", "v² − u² = 2 a s", ""], ["Newton's second law", "F = m a", "N, kg, m/s²"],
    ["Momentum (Higher)", "p = m v", "kg m/s"], ["Force and momentum change (separate, Higher)", "F = m Δv ÷ Δt", "N"]
  ] },
  { h: "Waves and magnetism (Paper 2)", rows: [
    ["Period", "T = 1 ÷ f", "s, Hz"], ["Wave speed", "v = f λ", "m/s, Hz, m"], ["Magnification (separate)", "image height ÷ object height", "No units"],
    ["Force on a wire (Higher)", "F = B I l", "N, T, A, m"], ["Transformer turns (separate, Higher)", "Vₚ ÷ Vₛ = nₚ ÷ nₛ", ""], ["Transformer power (separate, Higher)", "Vₛ Iₛ = Vₚ Iₚ", "At 100% efficiency"]
  ] }
];
var ink = 'stroke="#1c1436" stroke-width="3"', txt = 'font-family="Nunito,sans-serif" font-weight="800" font-size="16" fill="#1c1436"';
G.diagram({
  circuit: '<svg viewBox="0 0 460 250"><rect x="60" y="40" width="340" height="170" fill="none" '+ink+'/><path d="M215 25v30M235 33v14" '+ink+'/><rect x="200" y="20" width="60" height="42" fill="#fff" stroke="none"/><path d="M220 22v36M236 32v16" '+ink+'/><rect x="195" y="196" width="70" height="28" fill="#ffd23f" '+ink+'/><circle cx="60" cy="125" r="22" fill="#fff" '+ink+'/><text x="53" y="131" '+txt+'>A</text><circle cx="230" cy="115" r="22" fill="#fff" '+ink+'/><text x="223" y="121" '+txt+'>V</text><path d="M195 210H180V115H208M265 210H280V115H252" fill="none" '+ink+'/><text x="202" y="16" '+txt+'>cell</text><text x="200" y="246" '+txt+'>resistor</text><text x="72" y="178" '+txt+'>Ammeter</text><text x="115" y="90" '+txt+'>Voltmeter across</text></svg>',
  iv: '<svg viewBox="0 0 640 210">'+[['Resistor','M20 180L160 30'],['Filament lamp','M20 180C60 80 100 50 160 40'],['Diode','M20 180H90C110 170 125 100 135 30']].map(function(d,i){return '<g transform="translate('+(i*212)+' 0)"><path d="M90 20V195M15 110H165" '+ink+'/><path d="'+d[1].replace(/^M20 180/,'M20 180')+'" fill="none" stroke="#ff5da2" stroke-width="5"/><text x="90" y="16" text-anchor="middle" '+txt+'>'+d[0]+'</text></g>';}).join("")+'</svg>',
  wave: '<svg viewBox="0 0 520 210"><path d="M20 105H500" stroke="#999" stroke-dasharray="6 5"/><path d="M20 105 C60 15,100 15,140 105 S220 195,260 105 S340 15,380 105 S460 195,500 105" fill="none" stroke="#3d2bb0" stroke-width="5"/><path d="M80 34V105" stroke="#ff5da2" stroke-width="4"/><text x="50" y="128" '+txt+'>amplitude</text><path d="M80 22H320" stroke="#ff7a3d" stroke-width="4"/><text x="150" y="16" '+txt+'>wavelength</text><text x="200" y="202" '+txt+'>Transverse wave</text></svg>',
  em: '<svg viewBox="0 0 640 110">'+['Radio','Micro','Infra','Visible','UV','X-ray','Gamma'].map(function(n,i){var c=['#ff5d5d','#ff9a3d','#ffd23f','#4fd06b','#29b6e7','#6a5cff','#c04fff'][i];return '<rect x="'+(i*90+5)+'" y="28" width="88" height="46" fill="'+c+'" '+ink+'/><text x="'+(i*90+49)+'" y="57" text-anchor="middle" '+txt+'>'+n+'</text>';}).join("")+'<text x="6" y="20" '+txt+'>Long wavelength, low frequency</text><text x="634" y="98" text-anchor="end" '+txt+'>Short wavelength, high frequency, more dangerous</text></svg>',
  atom: '<svg viewBox="0 0 320 300"><circle cx="160" cy="150" r="130" fill="#eef3ff" '+ink+'/><circle cx="160" cy="150" r="80" fill="none" stroke="#3d2bb0" stroke-dasharray="5 5" stroke-width="2"/><circle cx="160" cy="150" r="26" fill="#ffd23f" '+ink+'/><text x="160" y="156" text-anchor="middle" '+txt+'>p, n</text><circle cx="240" cy="150" r="10" fill="#ff5da2" '+ink+'/><circle cx="62" cy="70" r="10" fill="#ff5da2" '+ink+'/><circle cx="100" cy="255" r="10" fill="#ff5da2" '+ink+'/><text x="250" y="130" '+txt+'>e⁻</text><text x="108" y="115" '+txt+'>nucleus</text></svg>',
  radiation: '<svg viewBox="0 0 560 210"><rect x="170" y="20" width="14" height="170" fill="#eee" '+ink+'/><rect x="310" y="20" width="26" height="170" fill="#c8ccd4" '+ink+'/><rect x="450" y="20" width="60" height="170" fill="#7a7f8a" '+ink+'/><path d="M30 50H170" stroke="#ff5da2" stroke-width="6"/><path d="M30 105H310" stroke="#3d9c4f" stroke-width="6"/><path d="M30 160H535" stroke="#7b5cff" stroke-width="6" stroke-dasharray="8 4"/><text x="30" y="42" '+txt+'>Alpha</text><text x="30" y="97" '+txt+'>Beta</text><text x="30" y="152" '+txt+'>Gamma</text><text x="154" y="206" '+txt+'>Paper</text><text x="285" y="206" '+txt+'>Aluminium</text><text x="456" y="206" '+txt+'>Thick lead</text></svg>',
  motor: '<svg viewBox="0 0 360 240"><g '+ink+' fill="none"><path d="M180 200V80" stroke-width="10" stroke="#ff5da2"/><path d="M180 200V40" stroke="#ff5da2" stroke-width="10"/><path d="M180 130 H40" stroke-width="10" stroke="#3d2bb0"/><path d="M180 130 L310 200" stroke="#ff7a3d" stroke-width="10"/></g><text x="192" y="52" '+txt+'>Thumb: Force</text><text x="30" y="118" '+txt+'>First: Field</text><text x="225" y="150" '+txt+'>Second: Current</text></svg>',
  star: '<svg viewBox="0 0 640 220"><g font-family="Nunito,sans-serif" font-size="14" font-weight="800"><circle cx="50" cy="110" r="32" fill="#c9b6ff" '+ink+'/><text x="50" y="114" text-anchor="middle">Nebula</text><circle cx="140" cy="110" r="22" fill="#ffb36b" '+ink+'/><text x="140" y="150" text-anchor="middle">Protostar</text><circle cx="235" cy="110" r="26" fill="#ffd23f" '+ink+'/><text x="235" y="150" text-anchor="middle">Main</text><circle cx="340" cy="55" r="36" fill="#ff7a3d" '+ink+'/><text x="340" y="59" text-anchor="middle">Red giant</text><circle cx="450" cy="55" r="16" fill="#fff" '+ink+'/><text x="450" y="28" text-anchor="middle">White dwarf</text><circle cx="560" cy="55" r="9" fill="#555" '+ink+'/><text x="560" y="28" text-anchor="middle">Black dwarf</text><circle cx="340" cy="165" r="44" fill="#ff5d5d" '+ink+'/><text x="340" y="169" text-anchor="middle">Supergiant</text><path d="M455 138l18 20 24-10-10 24 20 18-26 2-8 24-14-20-26 4 12-22-14-20 24 2Z" fill="#ffd23f" '+ink+'/><text x="470" y="206" text-anchor="middle">Supernova</text><circle cx="580" cy="130" r="9" fill="#29e7cd" '+ink+'/><text x="580" y="115" text-anchor="middle">Neutron star</text><circle cx="580" cy="190" r="13" fill="#111"/><text x="580" y="214" text-anchor="middle">Black hole</text></g></svg>'
});
})();
