(function () {
var G = GAME, ri = G.ri;
G.configure({
  key: "psychology", subject: "Psychology", spec: "AQA 8182 · 2 papers", title: "Psychology course", tiered: false,
  specUrl: "https://www.aqa.org.uk/subjects/psychology/gcse/psychology-8182", channel: "tutor2u",
  intro: "How the mind and behaviour work: memory, perception, development, social influence, language, brain and neuropsychology, psychological problems, and research methods.",
  finalName: "Final assessment", sheetName: "Key studies and terms", sheetNote: "Learn each study with the researchers, method, findings and evaluation. Research methods and maths skills appear on both papers."
});
G.sheet = [
  { h: "Key studies", rows: [
    ["Multi-store model", "Atkinson and Shiffrin (1968): sensory register, short-term memory, long-term memory"], ["Working memory", "Baddeley and Hitch (1974)"], ["Obedience", "Milgram (1963): 65 percent gave the maximum 450V"], ["Prison study", "Zimbardo (1973): social roles"], ["Conformity", "Asch (1951): line judgement"], ["Strange Situation", "Ainsworth (1970)"], ["Little Albert", "Watson and Rayner (1920): conditioned fear"], ["Visual cliff", "Gibson and Walk (1960)"]
  ] },
  { h: "Research methods", rows: [
    ["Independent variable", "The variable the researcher changes"], ["Dependent variable", "The variable that is measured"], ["Extraneous variable", "Other variable that may affect results"], ["Random sampling", "Everyone has an equal chance"], ["Opportunity sampling", "Using people who are available"], ["Mean", "Total ÷ number of values"], ["Median", "Middle value when ordered"], ["Mode", "Most common value"], ["Range", "Highest − lowest"]
  ] }
];

G.topic("Memory", "🧠", "Paper 1", [
{ t: "The multi-store model", icon: "🗃️",
  c: ["Atkinson and Shiffrin: information flows from sensory register to short-term memory (STM) to long-term memory (LTM).", "STM has limited capacity (about 7 plus or minus 2 items) and duration (about 18 to 30 seconds). LTM has potentially unlimited capacity and duration.", "Rehearsal moves information from STM to LTM.", "Evidence comes from studies of serial position effects; the model is simple and lacks detail about types of LTM."],
  k: "Sensory register, STM, LTM.",
  q: [["o", "Order the stores.", ["Sensory register", "Short-term memory", "Long-term memory"]],
      ["m", "STM capacity is about", "7 items", "70 items", "700 items", "unlimited", "Miller's magic number."],
      ["t", "Rehearsal helps transfer information to LTM.", true, "Repetition strengthens the trace."]] },

{ t: "Types of long-term memory and working memory", icon: "🗂️",
  c: ["Episodic memory stores personal events; semantic memory stores facts; procedural memory stores skills.", "Baddeley and Hitch's working memory model has a central executive, phonological loop, visuospatial sketchpad and (later) episodic buffer.", "Dual-task studies support separate stores.", "Evaluation: good explanatory power but the central executive is vague."],
  k: "Episodic, semantic, procedural.",
  q: [["s", "Which LTM type?", { "Episodic": ["Your last birthday"], "Semantic": ["Paris is the capital of France"], "Procedural": ["How to ride a bike"] }],
      ["m", "The central executive", "controls attention and other parts", "stores sounds", "stores images", "is long-term", "It directs resources."],
      ["t", "Working memory is a more detailed model of STM.", true, "It replaced the single store."]] },

{ t: "Forgetting and improving memory", icon: "🤔",
  c: ["Forgetting theories: interference (proactive and retroactive) and retrieval failure (context and state-dependent cues).", "Godden and Baddeley (1975) found divers recalled better in the same context.", "Eyewitness testimony can be affected by leading questions (Loftus and Palmer 1974) and misleading information.", "Cognitive interview techniques and mnemonics can improve recall."],
  k: "Cues help retrieval.",
  q: [["m", "Loftus and Palmer used the word", "smashed", "tapped", "bumped", "touched", "Different verbs changed speed estimates."],
      ["m", "Retroactive interference is when", "new information blocks old", "old information blocks new", "nothing is stored", "memory is perfect", "New learning interferes with old."],
      ["t", "Recall can be better when the context matches learning.", true, "Context acts as a cue."]] }
]);

G.topic("Perception and development", "👶", "Paper 1", [
{ t: "Visual perception", icon: "👀",
  c: ["Depth cues include binocular (retinal disparity, convergence) and monocular (height in plane, relative size, occlusion, linear perspective).", "Visual illusions such as the Müller-Lyer and Ponzo illusions show perception can be fooled.", "Gibson and Walk's visual cliff suggests depth perception is innate.", "Nature versus nurture: Gregory says we learn to interpret cues."],
  k: "Cues help judge depth.",
  q: [["s", "Binocular or monocular?", { "Binocular": ["Retinal disparity", "Convergence"], "Monocular": ["Relative size", "Linear perspective"] }],
      ["m", "The visual cliff tested", "depth perception in babies", "memory", "obedience", "attachment", "Infants avoided the drop."],
      ["t", "Illusions show perception is always accurate.", false, "They reveal how it can mislead."]] },

{ t: "Attachment and early experience", icon: "🧸",
  c: ["Bowlby proposed monotropy and that attachment is innate with a critical period.", "Ainsworth's Strange Situation identified secure, insecure-avoidant and insecure-resistant attachment.", "Harlow's monkeys showed contact comfort is more important than food.", "Maternal deprivation and privation can affect later development."],
  k: "Secure attachment needs responsive care.",
  q: [["m", "Ainsworth's procedure is called the", "Strange Situation", "Visual Cliff", "Bobo Doll", "Prison Study", "It classifies attachment types."],
      ["m", "Harlow found monkeys preferred", "the cloth mother", "the wire mother with milk", "no mother", "other monkeys only", "Comfort mattered more than food."],
      ["t", "Bowlby believed attachment is innate.", true, "He proposed a biological basis."]] },

{ t: "Piaget and learning", icon: "📚",
  c: ["Piaget's stages: sensorimotor, preoperational, concrete operational, formal operational.", "Concepts: schema, assimilation, accommodation, equilibrium.", "Conservation tasks show children under 7 struggle to see volume is unchanged.", "Evaluation: stages may be too rigid and children can succeed earlier than Piaget thought."],
  k: "Children think differently at each stage.",
  q: [["o", "Order Piaget's stages.", ["Sensorimotor", "Preoperational", "Concrete operational", "Formal operational"]],
      ["m", "A schema is", "a mental framework", "a type of brain scan", "a hormone", "a game", "It organises knowledge."],
      ["t", "Piaget used conservation tasks.", true, "For example pouring liquid between glasses."]] }
]);

G.topic("Social influence", "👥", "Paper 1", [
{ t: "Conformity and obedience", icon: "📣",
  c: ["Types of conformity: internalisation, identification and compliance.", "Asch (1951) used line judgements: about 32 percent conformed on critical trials.", "Milgram (1963): 65 percent of participants gave 450 volts. Zimbardo's prison study (1973) showed the power of social roles.", "Factors: uniform, proximity and authority; ethical issues of deception and harm."],
  k: "Authority and groups shape behaviour.",
  q: [["m", "Milgram's maximum voltage was", "450 volts", "45 volts", "4500 volts", "100 volts", "65 percent went to this level."],
      ["m", "Asch used", "line judgements", "electric shocks", "prison roles", "memory lists", "A group gave wrong answers."],
      ["t", "Zimbardo's study is criticised on ethical grounds.", true, "Participants suffered distress."]] },

{ t: "Crowds and prosocial behaviour", icon: "🙋",
  c: ["The bystander effect: people are less likely to help when others are present (Latané and Darley).", "Diffusion of responsibility and pluralistic ignorance help to explain it.", "Deindividuation: loss of self-awareness in a crowd can reduce restraint.", "Ways to increase helping include raising awareness and taking personal responsibility."],
  k: "More bystanders, less help.",
  q: [["m", "Diffusion of responsibility means", "each person feels less responsible", "everyone takes charge", "nobody is present", "help is certain", "The duty is spread out."],
      ["t", "The bystander effect suggests more people always means more help.", false, "The opposite often occurs."],
      ["m", "Deindividuation is", "losing individual identity in a crowd", "being alone", "gaining power", "being punished", "It leads to anonymity."]] }
]);

G.topic("Research methods", "🔬", "Both papers", [
{ t: "Experiments and variables", icon: "🧪",
  c: ["The IV is changed, the DV is measured. Control extraneous variables.", "Hypotheses: a directional one predicts the direction; a non-directional one just predicts a difference.", "Designs: independent groups, repeated measures, matched pairs.", "Lab, field and natural experiments differ in control and realism."],
  k: "Change one thing, measure another.",
  q: [["m", "The variable the researcher measures is the", "dependent variable", "independent variable", "control", "sample", "It depends on the IV."],
      ["m", "Using the same people in both conditions is", "repeated measures", "independent groups", "matched pairs", "opportunity", "It controls individual differences."],
      ["t", "A field experiment takes place in a natural setting.", true, "It is more realistic but less controlled."]] },

{ t: "Sampling, ethics and data", icon: "📊",
  c: ["Sampling methods: random, systematic, stratified, opportunity and volunteer.", "BPS ethics: consent, deception, protection from harm, confidentiality, right to withdraw, debrief.", "Averages: mean, median, mode; spread: range.",
   "Graphs: bar charts for categories, histograms for continuous data, scatter graphs for correlation."],
  k: "Ethical research protects participants.",
  q: [function () { var a = [ri(1, 9), ri(1, 9), ri(1, 9), ri(1, 9), ri(1, 9)], s = a.reduce(function (x, y) { return x + y; }, 0); return ["n", "Find the mean of " + a.join(", ") + ".", s / 5, "", "Mean = total ÷ number of values (e.g. " + s + " ÷ 5)."]; },
      function () { var a = [ri(1, 20), ri(1, 20), ri(1, 20), ri(1, 20)]; return ["n", "Find the range of " + a.join(", ") + ".", Math.max.apply(null, a) - Math.min.apply(null, a), "", "Range = highest − lowest."]; },
      ["m", "Debriefing means", "explaining the study afterwards", "hiding the aim", "paying participants", "choosing sample", "It restores participants' understanding."],
      ["t", "Participants have the right to withdraw.", true, "That is part of the ethical guidelines."]] }
]);
})();
