(function () {
var G = GAME;
G.configure({
  key: "literature", subject: "English Literature", spec: "AQA 8702 · 2 papers", title: "English Literature course", tiered: false,
  specUrl: "https://www.aqa.org.uk/subjects/english/gcse/english-literature-8702", channel: "Mr Bruff",
  intro: "Three popular set texts (Macbeth, A Christmas Carol, An Inspector Calls) plus poetry and essay skills. Your school may study other texts, so use the skills units for any text.",
  finalName: "Final assessment", sheetName: "Essay toolkit", sheetNote: "Paper 1: Shakespeare and the 19th-century novel. Paper 2: modern text, poetry anthology and unseen poetry. Quote short, analyse closely, and link to context."
});
G.sheet = [
  { h: "Paper structure", rows: [
    ["Paper 1 Section A", "Shakespeare: extract and whole text", "34 marks (30 + 4 SPaG)"], ["Paper 1 Section B", "19th-century novel: extract and whole text", "30 marks"], ["Paper 2 Section A", "Modern prose or drama", "34 marks (30 + 4 SPaG)"], ["Paper 2 Section B", "Poetry anthology comparison", "30 marks"], ["Paper 2 Section C", "Unseen poem and comparison", "8 + 8 = 24 marks"]
  ] },
  { h: "Assessment objectives", rows: [
    ["AO1", "Read, understand and respond with a critical, personal response and quotations"], ["AO2", "Analyse language, form and structure and use subject terms"], ["AO3", "Show understanding of context"], ["AO4", "Spelling, punctuation and grammar"]
  ] }
];

G.topic("Essay skills", "🖋️", "Both papers", [
{ t: "Writing a literature essay", icon: "📝",
  c: ["Start with a clear thesis that answers the question in the first sentence.", "Use PEE or PETAL: Point, Evidence, Technique, Analysis, Link. Keep quotations short and embedded.", "Zoom in on individual words and explore more than one interpretation ('perhaps', 'suggests').", "Link to context only where it deepens your analysis."],
  k: "Argue, quote, analyse, link.",
  q: [["m", "AO1 rewards", "a personal response with well chosen quotations", "spelling only", "memorised notes", "long plot summaries", "It is the response to the text."],
      ["m", "AO3 refers to", "context", "spelling and punctuation", "language analysis", "plot", "Social, historical and literary context."],
      ["t", "Retelling the plot earns high marks.", false, "Analysis is needed, not narration."]] },

{ t: "Analysing poetry", icon: "🎶",
  c: ["Look at form (sonnet, free verse, dramatic monologue), structure (stanzas, volta, enjambment) and language.", "Rhythm and rhyme can create pace or tension. Caesura is a pause within a line.", "In comparison, use phrases such as 'whereas' and 'similarly' and compare ideas, methods and effects.", "For unseen poetry, start with the title and the speaker's attitude."],
  k: "Form, structure, language: then compare.",
  q: [["m", "Enjambment is", "a sentence running over a line break", "a pause in the middle of a line", "a rhyme", "a repeated word", "It creates flow."],
      ["m", "A volta is", "a turn in argument or mood", "a rhyme scheme", "a metaphor", "a title", "Often in sonnets."],
      ["m", "A caesura is", "a pause within a line", "a stanza", "a verb", "an image", "It slows the rhythm."]] }
]);

G.topic("Macbeth", "🗡️", "Paper 1", [
{ t: "Plot and key characters", icon: "👑",
  c: ["Macbeth, a brave Scottish thane, meets three witches who predict he will be king.", "Urged by Lady Macbeth, he murders King Duncan and takes the throne, then kills Banquo and orders the murder of Macduff's family.", "Guilt and paranoia destroy him. Lady Macbeth sleepwalks and dies; Macduff kills Macbeth.", "Malcolm, Duncan's son, becomes king."],
  k: "Ambition leads to murder, guilt and downfall.",
  q: [["m", "Who murders King Duncan?", "Macbeth", "Macduff", "Banquo", "Malcolm", "He kills him in his sleep."],
      ["m", "Who kills Macbeth?", "Macduff", "Banquo", "Malcolm", "Ross", "Macduff was not 'of woman born'."],
      ["o", "Order the plot.", ["Witches' prophecy", "Duncan murdered", "Banquo murdered", "Lady Macbeth's sleepwalking", "Macbeth killed"]]] },

{ t: "Themes: ambition, guilt and the supernatural", icon: "🌑",
  c: ["Ambition is the driving force. Shakespeare shows its danger when unchecked.", "Guilt appears in the dagger vision, Banquo's ghost and Lady Macbeth's 'Out, damned spot'.", "The supernatural includes the witches, apparitions and omens.", "Context: Jacobean audiences believed in the divine right of kings and feared witchcraft; King James I was on the throne."],
  k: "Ambition, guilt, fate versus free will.",
  q: [["m", "'Out, damned spot' is spoken by", "Lady Macbeth", "Macbeth", "Duncan", "Macduff", "She imagines blood on her hands."],
      ["m", "The divine right of kings means", "kings are chosen by God", "kings are elected", "kings serve parliament", "kings are equal", "Regicide was a great sin."],
      ["t", "Banquo's ghost appears at a banquet.", true, "Only Macbeth sees it."]] }
]);

G.topic("A Christmas Carol", "🎄", "Paper 1", [
{ t: "Plot and structure", icon: "👻",
  c: ["Ebenezer Scrooge is a miserly old man who hates Christmas. On Christmas Eve he is visited by Marley's ghost.", "Three spirits show him Christmas Past, Present and Yet to Come.", "He sees Bob Cratchit's family, Tiny Tim and his own lonely grave.", "He wakes transformed, generous and joyful. The novella is divided into five staves."],
  k: "Redemption through three ghosts.",
  q: [["m", "Dickens divides the book into", "staves", "chapters", "acts", "scenes", "Like verses in a carol."],
      ["o", "Order the spirits.", ["Marley", "Past", "Present", "Yet to Come"]],
      ["t", "Tiny Tim is Bob Cratchit's son.", true, "He is sick but cheerful."]] },

{ t: "Themes and context", icon: "💰",
  c: ["Key themes: redemption, social responsibility, poverty and the dangers of greed.", "Symbols: Ignorance and Want, the two children hidden beneath the Spirit of Christmas Present.", "Context: Victorian poverty, the Poor Law and workhouses, and Dickens's own childhood in a blacking factory.", "Dickens wanted to prompt a change in attitude among the wealthy."],
  k: "Dickens argues the rich have a duty to the poor.",
  q: [["m", "Ignorance and Want represent", "the dangers of social neglect", "Christmas food", "Scrooge's nephews", "the Cratchits", "They warn of consequences."],
      ["m", "Which Victorian institution does Scrooge support?", "workhouses", "hospitals", "schools", "churches", "He says 'Are there no workhouses?'"],
      ["t", "Dickens wrote the book to raise awareness of poverty.", true, "Social criticism."]] }
]);

G.topic("An Inspector Calls", "🔎", "Paper 2", [
{ t: "Plot and characters", icon: "🏠",
  c: ["The play is set in 1912 in the Birling family home. Inspector Goole arrives to question the family about the death of Eva Smith.", "Each family member played a part: Mr Birling sacked her, Sheila had her sacked from a shop, Gerald had an affair, Mrs Birling refused her help and Eric got her pregnant.", "The Inspector leaves; the family learns he may not have been a real inspector. A final phone call says a girl has just died.", "The play is a well-made play with revelations and a cliffhanger."],
  k: "Everyone is responsible.",
  q: [["m", "Who is the Inspector?", "Inspector Goole", "Gerald Croft", "Arthur Birling", "Eric Birling", "His name sounds like 'ghoul'."],
      ["m", "The play was written in", "1945", "1912", "1990", "1800", "It is set in 1912 but written in 1945."],
      ["t", "Mr Birling is a capitalist who thinks war will not happen.", true, "Dramatic irony: the audience knows."]] },

{ t: "Themes and context", icon: "⚖️",
  c: ["Responsibility, social class, age and gender are central. The Inspector says: 'We are members of one body.'", "Priestley, a socialist, wrote in 1945 to promote collective responsibility.", "The younger generation (Sheila and Eric) accept responsibility; the older generation (Mr and Mrs Birling) do not.", "Dramatic irony is created by the audience knowing the Titanic sank and war came."],
  k: "Collective responsibility, not individual greed.",
  q: [["m", "Priestley's political views were", "socialist", "capitalist", "royalist", "anarchist", "He believed in community."],
      ["m", "Which character is most changed by the end?", "Sheila", "Mr Birling", "Mrs Birling", "Gerald", "She accepts guilt."],
      ["t", "The older Birlings change their views by the end.", false, "They refuse to take responsibility."]] }
]);
})();
