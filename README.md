# GCSE Quest

Web-based GCSE revision for **Maths, Physics, Chemistry and Biology**, built for secondary-school students preparing for their exams. Short lessons, memory hooks and exam-style questions follow the AQA specifications (8300, 8463, 8462, 8461), with everything running offline in the browser.

## Features

- **Structured topics and units**: every unit has a concise lesson (diagrams, key points, spec reference) followed by a practice session that earns a mastery level (Developing, Secure, Mastered).
- **Mock exams**: timed 10, 20 or 40-question papers with no feedback until the end, then a score, an indicative grade band, a topic breakdown and a review of every missed question.
- **Progress dashboard**: topic mastery, accuracy per topic, readiness estimate, focus areas, mock history and achievements.
- **Spaced-repetition review queue**: questions you miss come back on later days until you get them right three times.
- **Speed round, Daily 10, topic tests and a final assessment** for recall speed and exam stamina.
- **Interactive labs**, a formula/equation sheet and a collection of memory hooks for last-minute revision.
- **Study plan**: daily XP goal, revision streak, and an exam-date countdown.
- Higher/Foundation tier and Combined/Separate science filters, dark and light themes, keyboard shortcuts (1 to 4 to answer), works on phones.

## Running it

Open `index.html` in a browser. No internet or install needed. Keep `index.html`, the four subject pages and the `assets` and `data` folders together. Progress saves in the browser; use Settings > Move your progress to transfer it.

## Structure

- `assets/engine.js`: the game engine (routing, practice sessions, mock exams, progress, achievements)
- `assets/game.css`: the interface styles and themes
- `assets/icons.js`: inline SVG icons and the level ladder
- `data/*-config.js`: per-subject title, topic names and descriptions, reference sheet
- `data/*-N.js`: lesson and question content for each topic
- `data/*-labs.js`: interactive labs

These games are revision practice and are not made or endorsed by AQA.
