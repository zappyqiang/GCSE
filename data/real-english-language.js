/* Real-life pictures, videos and "How to?" cases for English Language */
(function () {
  var K = ANIM.kit;
  GAME.media({
    "Q2: language analysis": { vids: [["AQA English Language Paper 1 Question 2 (updated and animated)", "https://www.youtube.com/watch?v=L_dE68iUg-k", "Mr Bruff"], ["Question 2", "https://www.youtube.com/watch?v=EtYoVy3LyfU", "Advice on Question 2"]] },
    "Q1: retrieve information": { vids: [["AQA English Language Paper 1 Question 1 (2024 onwards)", "https://www.youtube.com/watch?v=hMhQIX9DCcQ", "Mr Bruff"]] },
    "Persuasive techniques (AFOREST)": { pics: [["Martin Luther King - March on Washington.jpg", "Martin Luther King's 'I have a dream' speech used repetition, imagery and emotive language"]] },
    "Writing letters, articles and speeches": { pics: [["Martin Luther King - March on Washington.jpg", "Speeches use rhetorical devices"], ["Charles Dickens by Daniel Maclise.jpg", "Charles Dickens, a master of vivid description"]] },
    "Descriptive writing": { pics: [["Durdle Door Overview.jpg", "Describe a place: zoom from the wide view to a close detail"], ["Aerial view of the Amazon Rainforest.jpg", "Practise describing with the senses"]] },
    "Narrative writing": { pics: [["Dickens-at-the-Blacking-Warehouse.jpg", "A child in a factory: a setting that tells a story"]] },
    "Imagery and figurative language": { pics: [["Prism flat rainbow.jpg", "Image and colour make writing vivid"]] }
  });

  GAME.howto([
    { id: "persuade", sector: "Writing", icon: "📣", title: "How do you write a speech that persuades people?", tags: "persuasion speech aforest rhetoric writing",
      hook: "Martin Luther King, Greta Thunberg and advertisers all use the same toolkit. Learn it and you can move a crowd.",
      scene: K.flow("Building a persuasive speech", ["Know your|audience and aim", "Open with|a hook", "Use AFOREST|techniques", "Anticipate|objections", "End with|a call to action"], ["Persuasion begins with audience and purpose.", "A strong opening grabs attention: a question, a story or a shocking fact.", "Use alliteration, facts, opinion, rhetorical questions, emotive language, statistics and the rule of three.", "Answer the other side's best argument so you sound fair.", "Finish with a memorable, clear instruction."]),
      steps: ["Plan three main points and put the strongest last.", "Use direct address: 'you' and 'we'.", "Vary sentence lengths for rhythm; short sentences hit hard.", "Repeat key phrases so they stick.", "Check tone is right for the audience, formal for governors, friendlier for peers."],
      facts: ["AFOREST: Alliteration, Facts, Opinion, Rhetorical questions, Emotive language, Statistics, Triples (rule of three)", "Audience, purpose, form: ask these before you write"],
      photos: [["Martin Luther King - March on Washington.jpg", "Martin Luther King delivering his speech"]],
      think: [["Why does the rule of three work?", "Three items feel balanced, rhythmic and memorable."], ["How would you change a speech for younger pupils?", "Simpler words, shorter sentences, more examples and humour."]],
      units: ["Persuasive techniques (AFOREST)", "Audience, purpose and form", "Writing letters, articles and speeches", "Planning and timing"] },
    { id: "analyselang", sector: "Reading", icon: "🔍", title: "How do you find hidden meaning in a text?", tags: "language analysis inference connotation q2",
      hook: "Writers choose every word on purpose. Learning to spot the clues is like being a detective, and it is exactly what Paper 1 Question 2 rewards.",
      scene: K.flow("Quote, technique, effect", ["Pick a short|quotation", "Name the|technique", "Zoom in on|one word", "Explain the|connotation", "Link to|the effect"], ["A repeatable way to analyse language.", "Choose a short, relevant quotation.", "Name the technique, such as personification or a verb.", "Zoom in on a single word.", "Explain what ideas and feelings it suggests.", "Link back to the effect on the reader."]),
      steps: ["Connotations are the ideas and feelings a word suggests: 'crept' feels sneaky, 'strolled' relaxed.", "Verbs and adjectives often carry the most meaning.", "Always say what the effect is, not just what the technique is.", "Use words like 'suggests', 'implies' and 'creates a sense of'."],
      facts: ["Simile: like or as", "Metaphor: is", "Personification: human qualities for non-human things"],
      photos: [["Prism flat rainbow.jpg", "Words, like a prism, split meaning into many colours"]],
      vids: [["AQA English Language Paper 1 Question 2", "https://www.youtube.com/watch?v=L_dE68iUg-k", "Technique walkthrough"]],
      think: [["What is the difference between 'walked', 'marched' and 'wandered'?", "They imply purpose, discipline and aimlessness respectively."], ["Why is naming a technique alone not enough?", "Marks reward explaining the effect on the reader."]],
      units: ["Q2: language analysis", "Imagery and figurative language", "Annotation and inference", "Tone, mood and viewpoint"] },
    { id: "storywrite", sector: "Writing", icon: "📖", title: "How do you write a story that grips the reader?", tags: "narrative creative writing structure opening",
      hook: "Every good story, from a novel to a film, follows a shape. Master it and your writing will stand out in the exam.",
      scene: K.timeline("Story shape", [["Hook", "Grab attention"], ["Build", "Raise tension"], ["Climax", "Peak moment"], ["Resolution", "Ending or twist"]], ["Stories have a shape.", "Open with a hook: action, dialogue or an image.", "Build tension with small details and delays.", "The climax is the most intense moment.", "End with a resolution, a twist or a reflective image."]),
      steps: ["Focus on one main event and a few characters.", "Show feelings through actions and senses, not by naming them.", "Vary sentence length: short sentences for tension.", "Use paragraphs for new time, place, topic or speaker.", "Proofread for spelling, punctuation and tense."],
      facts: ["TiPToP: new Time, Place, Topic or Person means a new paragraph", "Show, don't tell"],
      photos: [["Dickens-at-the-Blacking-Warehouse.jpg", "A scene with a story behind it"], ["Durdle Door Overview.jpg", "A dramatic setting can start a story"]],
      think: [["How could you open a story with a sound?", "Begin with something like a door slamming, then reveal who made it."], ["Why do twists need clues?", "Readers should feel the ending was surprising but fair."]],
      units: ["Narrative writing", "Descriptive writing", "Openings, endings and cohesion", "Structure and paragraphing"] },
    { id: "spotbias", sector: "Reading", icon: "📰", title: "How can you tell fact from opinion and spot bias in the news?", tags: "fact opinion bias viewpoint non-fiction paper 2",
      hook: "Headlines, adverts and social media posts mix facts with opinions. Spotting the difference protects you from being misled.",
      scene: K.compare("Fact or opinion?", ["Fact", "Opinion"], [["Can be proved or checked", "A belief or judgement"], ["'The school has 900 pupils.'", "'The school is the best in town.'"], ["Uses figures and evidence", "Uses words like 'best', 'should', 'clearly'"]], ["Writers mix both to persuade.", "A fact can be checked.", "An opinion is what someone thinks.", "Ask: can this be proved?"]),
      steps: ["Look for loaded or emotive words that signal an opinion.", "Check who wrote the text and why (their purpose and audience).", "Compare how two writers present the same topic differently.", "Use phrases such as 'Source A suggests... whereas Source B...'."],
      facts: ["Bias: favouring one side", "Perspective: a writer's point of view"],
      photos: [["Martin Luther King - March on Washington.jpg", "Powerful speeches blend facts and emotion"]],
      think: [["Why might an advert say 'Nine out of ten'?", "Statistics sound factual and persuasive, but you should ask who was surveyed."], ["How can a headline be biased?", "Word choices can imply blame or praise before you read the article."]],
      units: ["Fact and opinion", "Q4: compare perspectives", "Comparing writers' viewpoints", "Q3: language of non-fiction"] },
    { id: "spellwell", sector: "Skills", icon: "✍️", title: "How do you stop losing marks for spelling and punctuation?", tags: "spag spelling punctuation grammar accuracy",
      hook: "Up to a quarter of the writing marks depend on technical accuracy. A few habits fix the most common errors.",
      scene: K.flow("Proofreading routine", ["Read your work|slowly", "Check each|sentence boundary", "Check tricky|spellings", "Check apostrophes|and commas", "Improve weak|vocabulary"], ["Leave 5 minutes to check.", "Read slowly: your eye skips errors.", "Each sentence needs a capital letter and full stop.", "Watch out for their/there/they're and your/you're.", "Apostrophes show missing letters or belonging, never plurals.", "Swap vague words for precise ones."]),
      steps: ["Comma splices join two sentences with only a comma; fix them with a full stop, semicolon or conjunction.", "Use a range of sentence types: simple, compound and complex.", "Keep tense consistent.", "Learn a short list of your own most common mistakes."],
      facts: ["its = belonging; it's = it is", "Plurals never need an apostrophe"],
      photos: [["Charles Dickens by Daniel Maclise.jpg", "Even great writers edited their work"]],
      think: [["Why does reading aloud help?", "You hear missing words and awkward sentences that your eye misses."], ["How many errors can the apostrophe cause in one paragraph?", "Often several: practise the two rules: contraction and possession."]],
      units: ["Technical accuracy", "Spelling rules and common errors", "Apostrophes and commas", "Sentence structures and variety"] }
  ]);
})();
