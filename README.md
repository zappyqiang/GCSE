# GCSE Quest

A game-based GCSE revision app for **14 subjects**: Maths, Physics, Chemistry, Biology, plus English Language, English Literature, History, Geography, Business, Sociology, Religious Studies, Computer Science, Psychology and Economics. Learn with animated explainers, beat boss challenges, build streaks, level up your study buddy and sit timed mock exams. Content follows the AQA specifications (8300, 8463, 8462, 8461), covers Foundation and Higher tiers and Combined or Separate science, and runs entirely in the browser with no account.

## What is in the game

- **Learn path**: every subject is a winding path of units (567 units in total) grouped into sections that match the specification, with a boss challenge at the end of each section.
- **How to? cases**: every subject has its own "How to?" section of real-life questions (for example how fireworks get their colours, how GPS works, why vaccines protect us, how rockets reach space). Each case has an animation, step-by-step explanation, key equations or facts, real photographs, video links, "think like an expert" questions and links back to the lessons it recalls. Chemistry has 14 cases; the other subjects have 5 to 7.
- **Reaction lab (Chemistry)**: 18 realistic virtual experiments with glassware, bubbles, precipitates, flames, a thermometer, prediction questions, an automatic atom-balance check and real photographs.
- **Real-world pictures and videos**: unit lessons show photographs of the real thing (from Wikimedia Commons, each linked to its licence page) and curated video links.
- **Mind map**: every subject has a one-page mind map of all its topics and units, coloured by your mastery, with optional key ideas.
- **Animated explainers**: 252 step-by-step animations (16 or more in every subject) and simulations for the ideas that are hard to picture (number lines, Pythagoras, circle theorems, circuits, half-life, waves, gas pressure, ionic bonding, electrolysis, osmosis, mitosis, the heart, natural selection and many more).
- **Over 2,200 practice questions**, plus generated variants, in seven formats: multiple choice, true/false, calculations, typed answers, matching, sorting and ordering.
- **Game features**: XP and levels, a study buddy (Nova) with colours and gear to unlock, daily quests, streaks, hearts, combos, boss battles, achievements and confetti.
- **Written exams**: 101 exam-style written questions across all 14 subjects, each with a mark scheme to self-mark against, a model answer and an exam tip, plus timed written papers (about 1 minute per mark) that end with an indicative grade.
- **Worked examples**: 48 step-by-step worked examples in each subject's Toolkit, revealed one step at a time.
- **Exam skills**: timed mock exams with a graded report, coach mode, a speed round, spaced-repetition review of mistakes, a readiness estimate and a topic mastery table.
- **Per-unit resources**: links to videos, BBC Bitesize and Seneca, plus AQA specification pages (see the note below).
- **Toolkit**: formula and equation sheets, memory hooks, and interactive labs.
- **Works offline** once opened (service worker), installable as an app on phones when served over HTTPS, dark and light themes, keyboard shortcuts (1 to 4), responsive layout.

## Content still to do

The written questions, model answers and notes were written without a subject-specialist review and must be checked against the current specifications before real use. Links in the Toolkit are top-level hub pages and could not be checked from the build environment. Only AQA specifications are mapped; other exam boards (Edexcel, OCR, WJEC and Eduqas) need their own content mapping.

## Adding a subject

1. Copy any subject page (for example `history.html`), set `data-world` and the data script.
2. Add `data/written-<subject>.js` (`GAME.exam` and `GAME.worked`) for written exam questions and worked examples.
2. Write `data/<subject>.js` (and optionally `<subject>-2.js` for more units, `more-<subject>.js` for extra questions and `anim-<subject>.js` for animations; `GAME.more` accepts `"Topic::Unit"` keys when unit names repeat): `GAME.configure({... tiered: false})`, `GAME.sheet`, then `GAME.topic(name, icon, paper, [units])`. Units use the same question formats as the science subjects. Set `tiered: false` for subjects without Foundation and Higher tiers; omit labs if there are none.
3. Add a colour theme in `assets/game.css`, an icon in `assets/icons.js`, an entry in `index.html` and `data/counts.js`, and list the files in `sw.js`.

The non-science subjects now cover most of their AQA specifications (extra units, 5+ questions per unit and 16+ animated explainers each), but they still have fewer questions, animations and labs than Maths and the sciences. Unit pages also link to Oak National Academy and Save My Exams.

## Running it

Open `index.html` in a browser. To install it as an app or use offline caching, serve the folder over HTTPS (for example GitHub Pages). Progress saves in the browser; use Settings > Move your progress to transfer it.

## Structure

- `assets/engine.js`: the game engine (path, lessons, sessions, quests, progress)
- `data/anim-kit.js`: reusable explainer templates (flow, cycle, timeline, compare, bars, layers) used by `data/anim2-<subject>.js`
- `assets/anim.js`: animation toolkit (step-by-step scenes, simulations, confetti)
- `assets/mascot.js`: Nova, the boss gremlins and the level ladder
- `assets/game.css`: styles and themes
- `data/*-config.js`: per-subject names, descriptions and reference sheets
- `data/<subject>-N.js`: lesson and question content for each topic
- `data/anim-<subject>.js`: the animated explainers
- `data/more-<subject>.js`: the extra practice question banks
- `sw.js`, `manifest.json`: offline and install support

## Notes and limits

- Questions are retrieval practice written for this project, not past papers. Grade bands in mock exams and the readiness estimate are indicative only.
- Video and web resources are links to search pages and well-known free sites. They open in a new tab and need an internet connection. They were not checked automatically, so tell us if one is broken.
- The content maps to AQA. Edexcel, OCR and WJEC Eduqas overlap heavily but are not mapped unit by unit.

GCSE Quest is revision practice and is not made or endorsed by any exam board or by the BBC.
