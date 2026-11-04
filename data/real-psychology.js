/* Real-life photos, videos and "How to?" cases for Psychology */
(function () {
  var K = ANIM.kit;
  GAME.media({
    "Structure and function of the brain": { pics: [["Phineas Gage injury - lateral view (frontal lobe).png", "The path of the iron bar that injured Phineas Gage (frontal lobe in red)"], ["3D reconstruction of Gage’s skull.png", "A 3D reconstruction of Phineas Gage's skull"]] },
    "Studying the brain and neuroplasticity": { pics: [["Modern 3T MRI.JPG", "An MRI scanner used to study the brain"], ["MRI-Philips.JPG", "A Philips MRI scanner"]] },
    "Conformity and obedience": { pics: [["Milgram Experiment.png", "The setup of Milgram's obedience experiment (diagram)"], ["Plaque Dedicated to the Location of the Stanford Prison Experiment.jpg", "A plaque at the Stanford Prison Experiment site"]], vids: [["The Milgram Experiment Fully Explained", "https://www.youtube.com/watch?v=a9U1OUk-m5o", "Obedience to authority"], ["How to explain the results of Milgram's experiment", "https://www.youtube.com/watch?v=Kw8p8OKwFWE", "Explaining the findings"]] },
    "Crowds and prosocial behaviour": { pics: [["Plaque Dedicated to the Location of the Stanford Prison Experiment.jpg", "The Stanford Prison Experiment site"]] },
    "Visual perception": { pics: [["Human eye close up, anterior view.jpg", "The human eye"], ["Human eye in bright light.jpg", "The pupil narrows in bright light"]] },
    "Attachment and early experience": { pics: [["1930s family portrait.jpg", "Early family relationships shape attachment"]] },
    "The multi-store model": { pics: [["SEM blood cells.jpg", "Memory relies on networks of neurons in the brain (this image shows blood cells for scale)"]] },
    "Mental health: diagnosis and treatment": { pics: [["Modern 3T MRI.JPG", "Brain scans help research on mental health"]] },
    "Piaget and learning": { pics: [["Primary school children in classroom.jpg", "Piaget's ideas influence how children are taught"]] }
  });

  GAME.howto([
    { id: "obedience", sector: "Social behaviour", icon: "⚡", title: "Why do ordinary people sometimes obey terrible orders?", tags: "milgram obedience authority conformity",
      hook: "In Milgram's famous 1960s study, most volunteers gave what they believed were painful electric shocks because an experimenter in a lab coat told them to. What does it tell us about ourselves?",
      scene: K.flow("Milgram's experiment", ["Volunteer is the|'teacher'", "Learner (an actor)|answers questions", "Wrong answer:|teacher gives a shock", "Experimenter says|'please continue'", "65% went to|the maximum 450 V"], ["A study of obedience to authority.", "A volunteer was told to be the teacher.", "Another person (really an actor) was the learner.", "For each mistake, the shocks got stronger.", "If the teacher hesitated, the experimenter insisted.", "Most participants kept going to the maximum voltage."]),
      steps: ["Obedience rose when the experimenter was in the room, wore a lab coat and the study was at a prestigious university.", "It fell when the learner was close, when the experimenter gave orders by phone, or when others refused.", "Ethical problems: deception, distress and difficulty withdrawing.", "Modern ethics demand informed consent, protection from harm and debriefing."],
      facts: ["Obedience: following orders from an authority figure", "Conformity: changing behaviour to fit in with a group (Asch)", "Normative influence: wanting to be accepted; informational: believing the group knows better"],
      photos: [["Milgram Experiment.png", "A diagram of the Milgram set-up"], ["Plaque Dedicated to the Location of the Stanford Prison Experiment.jpg", "The Stanford Prison Experiment site"]],
      vids: [["The Milgram Experiment Fully Explained", "https://www.youtube.com/watch?v=a9U1OUk-m5o", "Overview"], ["How to explain the results of Milgram's experiment", "https://www.youtube.com/watch?v=Kw8p8OKwFWE", "Exam-style explanation"]],
      think: [["How could you resist an unfair order?", "Question it, talk to others, ask for evidence and know you can refuse; having a dissenting ally helps a lot."], ["Why would Milgram's study not be allowed today?", "Participants were deceived and distressed, breaking modern ethical guidelines."]],
      units: ["Conformity and obedience", "Crowds and prosocial behaviour", "Sampling, ethics and data"] },
    { id: "memorytips", sector: "Learning", icon: "🧠", title: "How can you remember more for your exams?", tags: "memory revision chunking retrieval multi-store forgetting",
      hook: "Your memory is not a recording; it is a system you can train. Psychology gives you tested tricks to remember more.",
      scene: K.flow("Getting information into long-term memory", ["Pay attention|(sensory register)", "Hold it in|short-term memory", "Rehearse, link and|organise it", "Stored in|long-term memory", "Practise retrieval|with cues"], ["The multi-store model shows how memory works.", "Only what you attend to moves on.", "Short-term memory holds about 7 items for about 30 seconds.", "Rehearsal and meaningful links move it onward.", "Long-term memory can hold unlimited information.", "Retrieval practice and cues bring it back."]),
      steps: ["Chunking: group information into meaningful bundles (for example phone numbers).", "Mnemonics: use a phrase or image to link facts.", "Spaced practice: revisit material over days, not in one cram session.", "Retrieval practice: test yourself instead of rereading.", "Context cues: recall can be better in the same place where you learned."],
      facts: ["Short-term memory: about 7 ± 2 items", "Forgetting: interference, retrieval failure, decay", "Working memory has a phonological loop and a visuospatial sketchpad"],
      photos: [["Primary school children in classroom.jpg", "Revision strategies help in every classroom"]],
      think: [["Why is testing yourself better than rereading notes?", "It practises retrieval, which strengthens the memory trace."], ["Why might you remember a fact better if you link it to something you already know?", "It creates more retrieval cues in long-term memory."]],
      units: ["The multi-store model", "Types of long-term memory and working memory", "Forgetting and improving memory"] },
    { id: "gage", sector: "Brain", icon: "🧩", title: "What does a famous brain injury teach us about how the brain works?", tags: "brain phineas gage frontal lobe localisation",
      hook: "In 1848 an iron bar passed through Phineas Gage's skull. He survived, but his personality changed, giving the world early clues about what different parts of the brain do.",
      scene: K.layers("Lobes of the cortex", ["Frontal: movement, decisions, personality", "Parietal: touch and body position", "Temporal: hearing and memory", "Occipital: vision"], ["Different brain areas have different jobs.", "The frontal lobe handles planning and personality: Gage's damaged area.", "The parietal lobe processes touch.", "The temporal lobe handles sound and memory.", "The occipital lobe at the back processes what we see."], false),
      steps: ["Localisation of function says specific areas do specific jobs, for example Broca's area for speech production.", "Case studies such as Gage show what is lost when a part is damaged.", "Modern scanning (CT, MRI, fMRI, EEG) lets scientists watch the living brain.", "Neuroplasticity: the brain can reorganise itself after injury or learning."],
      facts: ["Broca's area: speech production; Wernicke's area: language understanding", "fMRI shows active areas through blood flow"],
      photos: [["Phineas Gage injury - lateral view (frontal lobe).png", "The path of the bar (frontal lobe in red)"], ["3D reconstruction of Gage’s skull.png", "3D reconstruction of Gage's skull"], ["Modern 3T MRI.JPG", "An MRI scanner"]],
      think: [["Why are case studies useful but limited?", "They give rich detail but are about one person, so can't be generalised."], ["How could neuroplasticity help someone recover after a stroke?", "Other brain areas can take over lost functions with therapy and practice."]],
      units: ["Structure and function of the brain", "Studying the brain and neuroplasticity", "Mental health: diagnosis and treatment"] },
    { id: "babies", sector: "Development", icon: "👶", title: "Why do babies cling to their parents, and does it shape us?", tags: "attachment bowlby ainsworth harlow development",
      hook: "A baby's first close bond affects how they handle friendships and stress years later. Psychologists have studied how it forms.",
      scene: K.compare("Attachment types (Ainsworth)", ["Secure", "Insecure"], [["Distressed when mother leaves, happy at return", "Avoidant: ignores caregiver; resistant: clingy and angry"], ["Uses parent as a safe base", "Struggles to explore or trust"], ["Best long-term outcomes", "Linked to later difficulties"]], ["Ainsworth's strange situation tests attachment.", "Secure infants use the caregiver as a safe base.", "Insecure infants show avoidance or resistance.", "Early attachment seems to affect later relationships."]),
      steps: ["Bowlby proposed that babies form one special bond, and that long separation can harm development (maternal deprivation).", "Harlow's monkeys preferred a soft cloth 'mother' to a wire one that had milk, showing comfort matters.", "Critics note that fathers, grandparents and others can also form strong attachments.", "Studies raise ethical questions about harm to animals and children."],
      facts: ["Attachment: a close emotional bond", "Strange situation: Ainsworth's test of attachment"],
      photos: [["1930s family portrait.jpg", "Early bonds begin in the family"], ["US-hoosier-family.jpg", "Families offer many attachment figures"]],
      think: [["Why is it hard to say attachment style causes later behaviour?", "Many other factors, such as temperament and later experiences, also matter."], ["What ethical issues arise in Harlow's study?", "The monkeys suffered distress and were deprived of normal care."]],
      units: ["Attachment and early experience", "Piaget and learning", "Development of language and thought"] },
    { id: "stress", sector: "Wellbeing", icon: "😰", title: "Why does exam stress feel like that, and how can you manage it?", tags: "stress fight flight cortisol adrenaline anxiety",
      hook: "Racing heart, sweaty palms, butterflies: the body prepares to fight or flee even when the 'threat' is an exam paper.",
      scene: K.flow("The stress response", ["Brain perceives|a threat", "Adrenaline and|cortisol released", "Heart rate and|breathing rise", "Energy sent to|muscles", "Long-term stress|harms health"], ["Stress is a bodily reaction.", "The brain spots a challenge.", "Hormones flood the body.", "The heart beats faster, breathing quickens.", "Glucose and oxygen go to the muscles.", "If the stress never switches off, it can harm sleep, immunity and mood."]),
      steps: ["Short-term stress can sharpen focus.", "Chronic stress is linked to poor sleep, anxiety and illness.", "Management: exercise, relaxation, planning, talking to someone and good sleep.", "Psychological therapies such as CBT help people change unhelpful thought patterns."],
      facts: ["Fight-or-flight response: adrenaline prepares the body for action", "CBT links thoughts, feelings and behaviour"],
      photos: [["Primary school children in classroom.jpg", "Exams are a common source of stress"]],
      think: [["Why can a little stress improve performance?", "It raises alertness and motivation, but too much overwhelms thinking."], ["How can breathing slowly help?", "It calms the nervous system and lowers heart rate."]],
      units: ["Stress and addiction", "Mental health: diagnosis and treatment", "Hypotheses and experimental design"] }
  ]);
})();
