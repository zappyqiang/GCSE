(function () {
  var K = ANIM.kit;
  GAME.explain({
    "Word classes and sentence types": K.compare("Word classes", ["Class", "Example in 'The dog ran quickly'"], [
      ["Noun: names a thing", "dog"], ["Verb: an action", "ran"], ["Adverb: describes a verb", "quickly"], ["Determiner: introduces a noun", "The"]], [
      "Every word belongs to a class. Spot them to analyse sentences.",
      "Nouns name people, places and things.", "Verbs show actions or states.", "Adverbs describe verbs, adjectives or other adverbs.",
      "Determiners such as the, a, this come before nouns."]),
    "Imagery and figurative language": K.compare("Figurative language", ["Technique", "Example and effect"], [
      ["Simile", "'as cold as ice': vivid comparison"],
      ["Metaphor", "'the classroom was a zoo': strong image"],
      ["Personification", "'the wind whispered': brings nature alive"],
      ["Onomatopoeia", "'crash': sound creates action"]], [
      "Writers use figurative language to create pictures in the reader's mind.",
      "A simile compares using like or as.", "A metaphor says one thing is another.", "Personification gives human qualities to things.", "Onomatopoeia imitates sounds."]),
    "Punctuation for effect": K.compare("Punctuation and its effect", ["Mark", "Effect"], [
      ["Full stop", "Finality, calm, control"],
      ["Exclamation mark", "Strong emotion or urgency"],
      ["Ellipsis ...", "Suspense, trailing thought"],
      ["Dash –", "Interruption or sudden afterthought"]], [
      "Punctuation shapes the tone and pace of writing.",
      "A short sentence ending in a full stop can feel final.", "Use exclamation marks sparingly for impact.", "An ellipsis builds suspense.", "A dash creates a sudden break."]),
    "Tone, mood and viewpoint": K.flow("Narrative viewpoint", ["First person|'I' tells|the story", "Second person|'you' addresses|the reader", "Third person|limited: one|character", "Third person|omniscient: all|characters"], [
      "The narrator's viewpoint affects what the reader knows.",
      "First person is personal and can be unreliable.",
      "Second person speaks directly to the reader.",
      "Third person limited follows one character's thoughts.",
      "An omniscient narrator knows everything about everyone."]),
    "Q1: retrieve information": K.flow("Answering Q1", ["Find the lines|named in the|question", "Pick out|the facts", "Copy or|paraphrase", "Stop: do not|analyse"], [
      "Q1 is about finding facts, so be quick and accurate.",
      "Underline only what the question asks for.",
      "Copy short quotations or put them in your own words.",
      "Do not spend time analysing: it is worth only a few marks."]),
    "Q2: language analysis": K.flow("Quote, technique, effect", ["Choose a short|quotation", "Name the|technique", "Zoom in on|a key word", "Explain the|effect on the|reader"], [
      "Language analysis follows a repeatable pattern.",
      "Pick a short, relevant quotation.",
      "Name the technique, such as a metaphor or a verb choice.",
      "Pick out one word and explore its connotations.",
      "Explain what ideas and feelings it creates for the reader."]),
    "Q3: structure": K.timeline("How a text moves", [["Opening", "Sets scene|or hooks reader"], ["Build", "Focus shifts or|tension rises"], ["Turn", "Change of|mood or idea"], ["Ending", "Resolution or|final image"]], [
      "Structure means how a writer organises a text to guide the reader.",
      "Openings often set the scene or grab attention.",
      "Look for shifts in focus, time or tone as the text builds.",
      "A turning point may change mood or direction.",
      "Endings may circle back, resolve or leave a final image."]),
    "Q4: evaluate": K.flow("Evaluating a statement", ["Read the|statement|carefully", "Decide how|far you|agree", "Support with|quotations", "Analyse the|writer's methods", "Reach a|judgement"], [
      "Q4 gives a statement about the text and asks how far you agree.",
      "Start by deciding your own view.",
      "Find short quotations that support it.",
      "Analyse the methods the writer uses to create that effect.",
      "End with a clear overall judgement."]),
    "Descriptive writing": K.flow("Zoom in: describing a place", ["Wide shot:|the whole scene", "Mid shot:|a key area", "Close-up:|one detail", "Back out|with a final|image"], [
      "Think like a camera to organise a description.",
      "Open with the big picture: setting and atmosphere.",
      "Move to a smaller area.",
      "Zoom in to one vivid detail using several senses.",
      "End with a final image that echoes the mood."]),
    "Narrative writing": K.timeline("Story shape", [["Opening", "Hook and|setting"], ["Build-up", "Problem or|tension grows"], ["Climax", "Most intense|moment"], ["Ending", "Resolution|or twist"]], [
      "A strong story has a clear shape.",
      "Hook the reader and introduce the setting and character.",
      "Raise the tension with a problem.",
      "The climax is the peak of the action.",
      "End with a resolution, a twist or a reflective image."]),
    "Structure and paragraphing": K.flow("TiPToP: when to start a new paragraph", ["Ti|new Time", "P|new Place", "To|new Topic", "P|new Person|speaking"], [
      "Use TiPToP to decide when to start a new paragraph.",
      "Ti: a change of time.", "P: a change of place.", "To: a change of topic.",
      "P: a new person speaks, so start a new line for dialogue."]),
    "Technical accuracy": K.flow("Proofreading routine", ["Read your|work aloud|in your head", "Check sentence|boundaries", "Check spelling|and homophones", "Check|punctuation", "Fix and|improve|vocabulary"], [
      "Leave about five minutes to proofread.",
      "Reading slowly helps you spot slips.",
      "Make sure each sentence has a capital letter and full stop.",
      "Check common spelling traps like their/there/they're.",
      "Check apostrophes and commas.",
      "Swap weak words for more precise ones."]),
    "Fact and opinion": K.compare("Fact or opinion?", ["Fact", "Opinion"], [
      ["Can be proved", "A belief or judgement"],
      ["'Water boils at 100 °C.'", "'Winter is the best season.'"],
      ["Uses statistics and evidence", "Uses words like 'best' or 'should'"],
      ["Can be checked", "Others may disagree"]], [
      "Writers mix facts and opinions to persuade you.",
      "A fact can be checked.", "Facts often use numbers and evidence.", "Opinions use loaded or judgement words.",
      "Always ask: can this be proved?"]),
    "Audience, purpose and form": K.flow("Plan with APF", ["Audience|who is it for?", "Purpose|inform, persuade,|entertain", "Form|letter, speech,|article", "Choose tone|and language"], [
      "Before writing, ask three questions.",
      "Audience: who will read it? That decides tone and vocabulary.",
      "Purpose: why are you writing?",
      "Form: letter, article, speech, or story each has features.",
      "Choose formal or informal language to match."]),
    "Persuasive techniques (AFOREST)": K.flow("AFOREST", ["A|Alliteration|Anecdote", "F|Facts and|Flattery", "O|Opinion", "R|Rhetorical|question|Repetition", "E|Emotive|language", "S|Statistics", "T|Triples"], [
      "AFOREST is a checklist of persuasive techniques to use or spot.",
      "Alliteration and anecdote make writing memorable.",
      "Facts give credibility; flattery makes the reader feel good.",
      "Opinion states the writer's view confidently.",
      "Rhetorical questions and repetition drive the point home.",
      "Emotive language stirs feelings.",
      "Statistics add evidence.",
      "Groups of three are rhythmic and powerful."]),
    "Apostrophes and commas": K.compare("Apostrophes", ["Contraction", "Possession"], [
      ["don't = do not", "the dog's bone (one dog)"],
      ["it's = it is", "the dogs' bones (many dogs)"],
      ["Replaces missing letters", "Shows belonging"],
      ["Never for plurals: apples", "its (belonging) has no apostrophe"]], [
      "Apostrophes have two jobs only.",
      "Contraction: the apostrophe replaces missing letters.",
      "Possession: before the s for one owner, after for many.",
      "Never use one for a simple plural."]),
    "Sentence structures and variety": K.compare("Sentence types", ["Type", "Example"], [
      ["Simple: one clause", "The rain fell."],
      ["Compound: joined by and, but, or", "The rain fell, but we went out."],
      ["Complex: main + subordinate clause", "Although it rained, we went out."],
      ["Minor: no main verb", "Silence."]], [
      "Vary your sentences to control pace.",
      "Simple sentences are clear and punchy.", "Compound sentences join equal ideas.", "Complex sentences add detail and reasons.", "Minor sentences create atmosphere."]),
    "Annotation and inference": K.flow("Reading between the lines", ["Read the|question first", "Underline key|quotations", "Ask what is|suggested, not|stated", "Link to|a short quote", "Explain the|inference"], [
      "Inference means working out what a text suggests.",
      "Knowing the question lets you read with purpose.",
      "Mark words that stand out.",
      "Think about connotations: what does this word make you feel?",
      "Back your idea with evidence.",
      "Write: 'This suggests... because...'."])
  });
})();
