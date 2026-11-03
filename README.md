# GCSE Quest

A game-based GCSE revision app for **Maths, Physics, Chemistry and Biology**. Learn with animated explainers, beat boss challenges, build streaks, level up your study buddy and sit timed mock exams. Content follows the AQA specifications (8300, 8463, 8462, 8461), covers Foundation and Higher tiers and Combined or Separate science, and runs entirely in the browser with no account.

## What is in the game

- **Learn path**: every subject is a winding path of units (324 units in total) grouped into sections that match the specification, with a boss challenge at the end of each section.
- **Animated explainers**: 63 step-by-step animations and simulations for the ideas that are hard to picture (number lines, Pythagoras, circle theorems, circuits, half-life, waves, gas pressure, ionic bonding, electrolysis, osmosis, mitosis, the heart, natural selection and many more).
- **Over 2,200 practice questions**, plus generated variants, in seven formats: multiple choice, true/false, calculations, typed answers, matching, sorting and ordering.
- **Game features**: XP and levels, a study buddy (Nova) with colours and gear to unlock, daily quests, streaks, hearts, combos, boss battles, achievements and confetti.
- **Exam skills**: timed mock exams with a graded report, coach mode, a speed round, spaced-repetition review of mistakes, a readiness estimate and a topic mastery table.
- **Per-unit resources**: links to videos, BBC Bitesize and Seneca, plus AQA specification pages (see the note below).
- **Toolkit**: formula and equation sheets, memory hooks, and interactive labs.
- **Works offline** once opened (service worker), installable as an app on phones when served over HTTPS, dark and light themes, keyboard shortcuts (1 to 4), responsive layout.

## Running it

Open `index.html` in a browser. To install it as an app or use offline caching, serve the folder over HTTPS (for example GitHub Pages). Progress saves in the browser; use Settings > Move your progress to transfer it.

## Structure

- `assets/engine.js`: the game engine (path, lessons, sessions, quests, progress)
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
