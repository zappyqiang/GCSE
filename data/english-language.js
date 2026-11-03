(function () {
var G = GAME;
G.configure({
  key: "english", subject: "English Language", spec: "AQA 8700 · 2 papers", title: "English Language course", tiered: false,
  specUrl: "https://www.aqa.org.uk/subjects/english/gcse/english-language-8700", channel: "Mr Bruff",
  intro: "Reading and writing skills for both papers: how to analyse language and structure, compare viewpoints, and write accurately for a purpose.",
  finalName: "Final assessment", sheetName: "Key terms", sheetNote: "Both papers are 1 hour 45 minutes and worth 80 marks. Learn these terms and the question guide."
});
G.sheet = [
  { h: "The questions at a glance", rows: [
    ["Paper 1 Q1", "List 4 things from a short extract", "4 marks · about 5 minutes"], ["Paper 1 Q2", "Analyse the writer's use of language", "8 marks"], ["Paper 1 Q3", "Analyse structure", "8 marks"], ["Paper 1 Q4", "Evaluate a statement about the text", "20 marks"], ["Paper 1 Q5", "Descriptive or narrative writing", "40 marks (24 content, 16 accuracy)"],
    ["Paper 2 Q1", "Choose 4 true statements", "4 marks"], ["Paper 2 Q2", "Summarise differences between two sources", "8 marks"], ["Paper 2 Q3", "Analyse language in one source", "12 marks"], ["Paper 2 Q4", "Compare the writers' perspectives and methods", "16 marks"], ["Paper 2 Q5", "Transactional writing: give your viewpoint", "40 marks"]
  ] },
  { h: "Key terms", rows: [
    ["Simile", "Compares using 'like' or 'as'"], ["Metaphor", "Says one thing is another"], ["Personification", "Gives human qualities to a non-human thing"], ["Onomatopoeia", "A word that sounds like its meaning"], ["Alliteration", "Repeated starting consonant sounds"], ["Juxtaposition", "Placing contrasting ideas side by side"], ["Pathetic fallacy", "Weather or setting that reflects mood"], ["Semantic field", "A group of words linked by meaning"], ["Anecdote", "A short personal story used as evidence"], ["Rhetorical question", "A question asked for effect, not an answer"], ["Triple (rule of three)", "Three items in a list for impact"], ["Emotive language", "Words chosen to stir feelings"]
  ] }
];

G.topic("Language toolkit", "🧰", "Both papers", [
{ t: "Word classes and sentence types", icon: "🔤",
  c: ["Know your word classes: nouns name things, verbs show action, adjectives describe nouns, adverbs describe verbs.", "Sentences can be simple (one clause), compound (clauses joined by and, but, or) or complex (a main clause plus a subordinate clause).", "Sentence function matters too: statements, questions, commands (imperatives) and exclamations.", "In the exam, link a word choice to an effect. Say what the word suggests, not just that it is an adjective."],
  k: "Name it, then explain the effect.",
  q: [["m", "Which word class describes a verb?", "adverb", "adjective", "noun", "pronoun", "Adverbs tell us how, when or where something happens."],
      ["m", "'Close the door.' is which sentence function?", "command", "question", "statement", "exclamation", "It gives an order, so it is an imperative."],
      ["p", "Match the sentence type to its description.", [["Simple", "One main clause"], ["Compound", "Two main clauses joined by a conjunction"], ["Complex", "Main clause plus subordinate clause"], ["Minor", "No main verb, for example 'Silence.'"]]],
      ["t", "A single-word sentence can be used for dramatic effect.", true, "Short, minor sentences create tension or emphasis."]] },

{ t: "Imagery and figurative language", icon: "🎨",
  c: ["A simile compares two things using like or as. A metaphor says one thing is another, which is stronger.", "Personification gives human qualities to objects, for example 'the wind howled'.", "Always zoom in on the key word and explain what it suggests: 'The word howled suggests the wind is angry and wild.'", "Use the PEE or PEEL idea: Point, Evidence, Explain the effect (and Link back to the question)."],
  k: "Quote, zoom in, explain the effect on the reader.",
  q: [["s", "Sort these into the right technique.", { "Simile": ["as cold as ice", "ran like the wind"], "Metaphor": ["the classroom was a zoo", "her words were daggers"], "Personification": ["the sun smiled down", "the trees whispered"] }],
      ["m", "'The city was a beating heart.' is a", "metaphor", "simile", "alliteration", "onomatopoeia", "It states the city is a heart, with no like or as."],
      ["m", "Which phrase is onomatopoeia?", "crash", "silently", "golden", "because", "The word sounds like the noise it describes."],
      ["o", "Put the PEE steps in order.", ["Make a point", "Give a short quotation", "Zoom in on a key word", "Explain the effect on the reader"]]] },

{ t: "Punctuation for effect", icon: "✒️",
  c: ["Full stops, commas and capital letters must be secure: marks for technical accuracy depend on them.", "Semi-colons join two related main clauses. Colons introduce a list or an explanation.", "Dashes add a sudden thought or interruption. Ellipsis (…) creates suspense or trailing off.", "Use apostrophes for contraction (don't) and possession (the dog's bone), never for plurals."],
  k: "A semi-colon joins two sentences that could stand alone.",
  q: [["m", "Which punctuation joins two related main clauses?", "semi-colon", "comma", "apostrophe", "colon", "A semi-colon links closely related sentences."],
      ["m", "Which is correct?", "The girls' coats were wet.", "The girls coat's were wet.", "The girl's coats' were wet.", "The girls coats were' wet.", "The apostrophe goes after girls for plural possession."],
      ["t", "An apostrophe can be used to make a plural.", false, "Apostrophes show possession or missing letters, not plurals."],
      ["w", "Which punctuation mark can create suspense by trailing off? (one word)", ["ellipsis"], "An ellipsis is three dots."]] },

{ t: "Tone, mood and viewpoint", icon: "🎭",
  c: ["Tone is the writer's attitude (serious, sarcastic, nostalgic). Mood is the feeling created for the reader.", "Viewpoint is whose eyes we see through. First person uses I. Third person uses he, she or they.", "A narrator can be reliable or unreliable. Changing viewpoint changes what we learn.", "Pathetic fallacy matches weather to mood: storms for anger, sunshine for joy."],
  k: "Tone is the writer's voice; mood is the reader's feeling.",
  q: [["m", "Rain and thunder as a character argues is an example of", "pathetic fallacy", "simile", "juxtaposition", "alliteration", "The weather reflects the mood."],
      ["t", "A first person narrator uses 'I'.", true, "First person narration comes from the narrator's own viewpoint."],
      ["m", "A sarcastic voice is a type of", "tone", "plot", "setting", "genre", "Tone is the attitude of the writer or speaker."]] }
]);

G.topic("Paper 1 reading", "📖", "Paper 1", [
{ t: "Q1: retrieve information", icon: "🔎",
  c: ["Question 1 asks you to list four things from a given part of the text. It is worth 4 marks.", "Pick out short, clear details. You may use quotation or your own words. Stay within the lines given.", "Spend about 5 minutes. Do not analyse: there are no marks for explaining here.", "Check that each point is a different piece of information and is true to the text."],
  k: "Four lines, four facts, five minutes.",
  q: [["m", "How many marks is Paper 1 question 1 worth?", "4", "8", "12", "20", "It asks for four points from the text."],
      ["t", "In Q1 you should write a long analysis of each point.", false, "Q1 is only retrieval. Keep answers short."],
      ["m", "How long should you spend on Q1?", "about 5 minutes", "about 25 minutes", "about 40 minutes", "no time at all", "It is a quick warm-up question."]] },

{ t: "Q2: language analysis", icon: "🔬",
  c: ["Question 2 is worth 8 marks. It asks how the writer uses language to achieve an effect in a given section.", "Pick short quotations and zoom in on individual words or techniques.", "Use subject terms such as simile or semantic field, but always explain the effect on the reader.", "Aim for around three well developed points. Spend about 10 minutes."],
  k: "Word, technique, effect.",
  q: [["m", "Q2 asks about the writer's use of", "language", "structure", "spelling", "plot", "Q3 is structure; Q2 is language."],
      ["m", "Which is best for a Q2 answer?", "Zoom in on a single word and explain what it suggests", "Retell the story", "Count the paragraphs", "Say whether you liked the text", "Detailed word analysis earns the top marks."],
      ["o", "Order a strong Q2 paragraph.", ["Make a clear point", "Embed a short quotation", "Name the technique", "Explain the effect on the reader"]]] },

{ t: "Q3: structure", icon: "🧱",
  c: ["Question 3 is worth 8 marks and asks how the text is structured to interest the reader.", "Think about the whole text: where does it begin, how does the focus shift, what changes at the end?", "Comment on shifts in time, place, focus and mood, on zooming in or out, and on paragraph length and sentence length.", "Do not just list structural features. Explain why the writer did that and its effect."],
  k: "Beginning, middle, end: what shifts and why?",
  q: [["m", "A shift from describing a whole town to one person's face is called", "zooming in", "personification", "alliteration", "rhetoric", "It moves the focus from wide to narrow."],
      ["s", "Language or structure?", { "Language": ["simile", "emotive adjectives"], "Structure": ["change of focus", "short paragraph for impact"] }],
      ["t", "Q3 asks you to analyse the structure of the whole extract.", true, "Look at how the text is organised from start to finish."]] },

{ t: "Q4: evaluate", icon: "⚖️",
  c: ["Question 4 is worth 20 marks. You are given a statement and must say how far you agree.", "You are looking at one later section of the text. Support your view with quotations.", "Evaluate: judge how successfully the writer creates an effect. Try 'This is effective because…'.", "Aim for a clear opinion, three or four developed points, and analyse language and structure. Spend about 20 minutes."],
  k: "How far do I agree? Back it up with quotations.",
  q: [["m", "How many marks is Q4 worth?", "20", "8", "4", "40", "It is the biggest reading question."],
      ["t", "In Q4 you must agree fully with the statement.", false, "You can agree, partly agree or disagree if you justify your view."],
      ["m", "Which phrase starts an evaluative comment?", "This is effective because", "The text has four paragraphs", "I think the writer is nice", "Then it says", "Evaluation judges how well something works."]] }
]);

G.topic("Paper 1 writing", "✍️", "Paper 1", [
{ t: "Descriptive writing", icon: "🌅",
  c: ["Question 5 is worth 40 marks: 24 for content and organisation, 16 for technical accuracy.", "For description, build a vivid picture using all five senses, not just sight.", "Use varied sentence lengths, precise vocabulary and a few well chosen techniques such as metaphor.", "Plan for about 5 minutes, write for 35, and leave 5 to proofread."],
  k: "Show, don't tell: use the senses.",
  q: [["m", "How many marks are for technical accuracy in Q5?", "16", "24", "8", "40", "24 for content and 16 for accuracy."],
      ["m", "'Show, don't tell' means", "create images instead of stating feelings", "write more dialogue", "only use adjectives", "avoid punctuation", "Let details reveal the mood."],
      ["t", "A descriptive piece should use only the sense of sight.", false, "Use sound, smell, touch and taste to build atmosphere."]] },

{ t: "Narrative writing", icon: "📚",
  c: ["A good narrative has a clear shape: opening, build-up, turning point, climax and ending.", "Keep it short enough to control. One main event or moment works better than a whole life story.", "Start in an interesting way, such as in the middle of the action or with a detail.", "Control tension with sentence length and pace, and end with a twist, reflection or cliffhanger."],
  k: "One strong event, shaped well.",
  q: [["o", "Order the stages of a narrative.", ["Opening", "Build-up", "Turning point", "Climax", "Ending"]],
      ["m", "Which opening grabs attention best?", "in the middle of the action", "a long history of the character", "a weather report", "a list of names", "Starting in the action pulls the reader in."],
      ["t", "A narrative in the exam should cover many years of events.", false, "A short focused story scores better than a rushed long one."]] },

{ t: "Structure and paragraphing", icon: "📐",
  c: ["Paragraphs organise ideas. Start a new one for a new time, place, speaker or topic.", "Vary paragraph length on purpose. A one-line paragraph can create shock.", "Use discourse markers (However, Meanwhile, Suddenly) to link ideas.", "Plan the shape first, such as zooming in from a wide view to a small detail."],
  k: "New idea, new paragraph.",
  q: [["m", "Which is a discourse marker?", "Meanwhile", "banana", "quickly", "red", "It links ideas or shows time."],
      ["t", "A very short paragraph can be used for effect.", true, "It stands out and adds drama."],
      ["m", "A new paragraph is needed when", "the time or place changes", "you write a comma", "you run out of ideas", "you want to use a simile", "Shifts signal a new paragraph."]] },

{ t: "Technical accuracy", icon: "✅",
  c: ["Sixteen marks go on spelling, punctuation, grammar and vocabulary.", "Use a range of punctuation accurately: commas, apostrophes, speech marks, semi-colons.", "Spell commonly misused words correctly: their/there/they're, your/you're, its/it's.", "Proofread for the last five minutes. Read each sentence slowly and check capital letters."],
  k: "Proofread: read it as the examiner would.",
  q: [["m", "Which is correct?", "It's raining, so the dog is in its kennel.", "Its raining, so the dog is in it's kennel.", "It's raining, so the dog is in it's kennel.", "Its raining, so the dog is in its' kennel.", "It's = it is; its = belongs to it."],
      ["m", "Choose the correct word: 'They left ___ bags here.'", "their", "there", "they're", "thier", "Their shows ownership."],
      ["t", "Technical accuracy marks are only for spelling.", false, "They cover punctuation, grammar and vocabulary as well."]] }
]);

G.topic("Paper 2 reading", "📰", "Paper 2", [
{ t: "Fact and opinion", icon: "🧾",
  c: ["A fact can be checked and proven. An opinion is a belief or judgement.", "Question 1 on Paper 2 gives eight statements and asks you to choose the four that are true.", "Read carefully: one wrong word can make a statement false.", "In non-fiction, writers often blend facts and opinion to persuade."],
  k: "Fact = provable. Opinion = a view.",
  q: [["s", "Fact or opinion?", { "Fact": ["Water boils at 100 degrees Celsius at sea level", "London is the capital of England"], "Opinion": ["Winter is the best season", "Homework is pointless"] }],
      ["t", "Paper 2 Q1 asks you to choose true statements.", true, "You choose four true statements from eight."],
      ["m", "Which word signals an opinion?", "clearly the worst", "in 1999", "twelve", "Manchester", "It shows a judgement."]] },

{ t: "Q2: summary across two texts", icon: "🪞",
  c: ["Question 2 asks you to summarise the differences (or similarities) between two sources. It is worth 8 marks.", "You must write about both sources, using a short quotation and a clear inference for each point.", "An inference is what the evidence suggests, for example 'suggests she felt isolated'.", "Link the sources with words like whereas and in contrast."],
  k: "Both texts, linked, with inferences.",
  q: [["m", "Q2 on Paper 2 asks for", "a summary of differences or similarities", "a creative story", "a list of figures of speech", "a review", "You synthesise the two sources."],
      ["m", "Which connective compares two texts?", "whereas", "because", "firstly", "meanwhile", "Whereas contrasts."],
      ["t", "You can answer Q2 by writing about only one source.", false, "It must cover both."]] },

{ t: "Q3: language of non-fiction", icon: "📢",
  c: ["Question 3 is worth 12 marks and asks how the writer uses language for effect in one source.", "Look for rhetorical devices: rhetorical questions, triples, direct address, emotive language, statistics.", "Comment on tone (formal, chatty, urgent) and on the audience.", "Treat it like Q2 on Paper 1: quote, name the technique, explain the effect."],
  k: "Method, effect, audience.",
  q: [["m", "'Don't you think it's time we acted?' is a", "rhetorical question", "metaphor", "statistic", "alliteration", "It asks for agreement, not an answer."],
      ["m", "'Brave, bold and brilliant' uses a", "triple", "simile", "pun", "fact", "Three items for rhythm and impact."],
      ["p", "Match the device to its effect.", [["Direct address", "Speaks straight to the reader"], ["Statistics", "Adds authority and evidence"], ["Emotive language", "Stirs feelings"], ["Anecdote", "Makes the point personal"]]]] },

{ t: "Q4: compare perspectives", icon: "🔀",
  c: ["Question 4 is worth 16 marks. Compare the two writers' perspectives and how they communicate them.", "Perspective means the attitude or viewpoint towards the topic.", "Compare methods too: language, structure, tone, form. Use comparative phrases (similarly, in contrast).", "Aim for three or four developed comparisons, each with quotations from both texts."],
  k: "Same topic, different view: compare both and the methods.",
  q: [["m", "How many marks is Paper 2 Q4?", "16", "12", "8", "20", "It is the comparison question."],
      ["t", "Q4 requires quotations from both sources.", true, "Use evidence from both."],
      ["m", "Which is a comparative phrase?", "In contrast", "Once upon a time", "To conclude", "Suddenly", "It signals a difference."]] }
]);

G.topic("Paper 2 writing", "📮", "Paper 2", [
{ t: "Audience, purpose and form", icon: "🎯",
  c: ["Before writing, decide who you are writing for (audience), why (purpose: argue, persuade, advise, inform) and the form (letter, article, speech, leaflet).", "Match the register: formal for a head teacher, more informal for peers.", "Use form features: 'Dear Sir' and 'Yours faithfully' for a formal letter; a headline and subheading for an article; direct address for a speech.", "Use a clear viewpoint from the start."],
  k: "Who? Why? What form?",
  q: [["m", "'Dear Sir' should end with", "Yours faithfully", "Yours sincerely", "Love from", "See you", "Use faithfully when you don't know the name."],
      ["m", "Which form usually has a headline and subheading?", "article", "speech", "diary", "email to a friend", "Articles use headings."],
      ["t", "A letter to a head teacher should be written in a formal register.", true, "Formal register suits an official audience."]] },

{ t: "Persuasive techniques (AFOREST)", icon: "🔥",
  c: ["AFOREST: Alliteration, Facts, Opinions, Rhetorical questions, Emotive language, Statistics, Triples.", "Add anecdotes, direct address and repetition for impact.", "Do not overload: choose techniques that suit your argument and audience.", "Counter-argument shows maturity: acknowledge another view, then rebut it."],
  k: "AFOREST: persuade with purpose.",
  q: [["o", "Put the A F O R E S T letters in order of their meaning.", ["Alliteration", "Facts", "Opinions", "Rhetorical questions", "Emotive language", "Statistics", "Triples"]],
      ["m", "A counter-argument", "acknowledges another view and challenges it", "repeats your own view", "uses only statistics", "avoids the issue", "It strengthens persuasion."],
      ["t", "Using every technique in one sentence is always best.", false, "Choose techniques carefully for effect."]] },

{ t: "Planning and timing", icon: "⏱️",
  c: ["Paper 2 Q5 is worth 40 marks. Spend about 45 minutes: 5 planning, 35 writing, 5 checking.", "Plan 4 or 5 paragraphs: a hook, 2 or 3 main points and a strong ending.", "Make your main points different. Develop each with evidence or an example.", "End by returning to your opening idea or with a call to action."],
  k: "Plan five minutes, write thirty-five, check five.",
  q: [["m", "About how long should Paper 2 Q5 take?", "45 minutes", "10 minutes", "20 minutes", "1 hour", "It carries the most marks."],
      ["t", "Planning is a waste of time in the exam.", false, "A short plan improves structure and prevents rambling."],
      ["m", "A good ending often", "returns to the opening idea or calls for action", "introduces a new topic", "apologises", "lists quotes", "It gives a sense of completion."]] }
]);
})();
