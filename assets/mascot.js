/* Nova the study buddy, exam gremlins and the level ladder. All drawn as inline SVG so the game works offline. */
(function () {
  var INK = "#1b1340";
  var COLORS = {
    blue: ["#58a6ff", "#2f6fe0", "Sky blue"], pink: ["#ff7eb6", "#e0488a", "Bubblegum"], green: ["#4ade80", "#1fa859", "Lime"],
    orange: ["#ffa94d", "#e8761a", "Sunset"], purple: ["#a78bfa", "#6d4ee0", "Nebula"], gold: ["#ffd43b", "#e0a400", "Gold"]
  };
  /* Level ladder: total XP across all subjects. Each level may unlock a colour or an accessory. */
  var LEVELS = [
    { n: "Rookie", xp: 0 }, { n: "Learner", xp: 150, color: "pink" }, { n: "Explorer", xp: 450, acc: "cap" }, { n: "Challenger", xp: 900, color: "green" },
    { n: "Brainiac", xp: 1600, acc: "phones" }, { n: "Scholar", xp: 2600, acc: "glasses" }, { n: "Master", xp: 4000, color: "orange" },
    { n: "Genius", xp: 6000, acc: "wizard" }, { n: "Legend", xp: 8500, color: "purple" }, { n: "Grade 9 Hero", xp: 12000, acc: "crown", color: "gold" }
  ];
  var ACCS = { none: "None", cap: "Cap", phones: "Headphones", glasses: "Glasses", wizard: "Wizard hat", crown: "Crown" };

  var acc = {
    cap: '<path d="M30 54 Q60 22 92 52 L92 58 Q60 46 30 58Z" fill="#ef4444" stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round"/><path d="M86 55 Q108 56 112 62 Q100 64 84 60Z" fill="#dc2626" stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round"/>',
    phones: '<path d="M22 72 Q22 28 60 28 Q98 28 98 72" fill="none" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/><path d="M22 72 Q22 28 60 28 Q98 28 98 72" fill="none" stroke="#8b5cf6" stroke-width="3" stroke-linecap="round"/><rect x="12" y="62" width="16" height="26" rx="7" fill="#8b5cf6" stroke="' + INK + '" stroke-width="3.5"/><rect x="92" y="62" width="16" height="26" rx="7" fill="#8b5cf6" stroke="' + INK + '" stroke-width="3.5"/>',
    glasses: '<circle cx="44" cy="68" r="15" fill="rgba(255,255,255,.18)" stroke="' + INK + '" stroke-width="3.5"/><circle cx="76" cy="68" r="15" fill="rgba(255,255,255,.18)" stroke="' + INK + '" stroke-width="3.5"/><path d="M59 67 Q60 64 61 67" fill="none" stroke="' + INK + '" stroke-width="3.5"/>',
    wizard: '<path d="M26 52 L60 -6 L96 52 Q60 62 26 52Z" fill="#6d4ee0" stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round"/><path d="M24 52 Q60 66 98 52" fill="none" stroke="#facc15" stroke-width="5" stroke-linecap="round"/><circle cx="60" cy="22" r="5" fill="#facc15" stroke="' + INK + '" stroke-width="2.5"/>',
    crown: '<path d="M32 50 L36 22 L50 38 L60 16 L70 38 L84 22 L88 50Z" fill="#ffd43b" stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round"/><circle cx="60" cy="16" r="4" fill="#ef4444" stroke="' + INK + '" stroke-width="2"/>'
  };

  /* mood is applied through a class on the wrapper: idle, happy, sad, think, wow */
  window.mascot = function (look, mood, size) {
    look = look || {}; var c = COLORS[look.color] || COLORS.blue, a = acc[look.acc] || "";
    return '<span class="mascot m-' + (mood || "idle") + '" style="--m1:' + c[0] + ";--m2:" + c[1] + (size ? ";width:" + size + "px;height:" + size + "px" : "") + '" role="img" aria-label="Nova, your study buddy">' +
      '<svg viewBox="0 0 120 130" aria-hidden="true">' +
      '<g class="mbody">' +
      '<ellipse cx="60" cy="122" rx="30" ry="5" fill="rgba(0,0,0,.22)"/>' +
      '<path class="mspark" d="M64 2 L50 26 H61 L54 42 L76 18 H64 L70 2Z" fill="#ffd43b" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>' +
      '<ellipse cx="42" cy="114" rx="13" ry="7" fill="var(--m2)" stroke="' + INK + '" stroke-width="3.5"/><ellipse cx="78" cy="114" rx="13" ry="7" fill="var(--m2)" stroke="' + INK + '" stroke-width="3.5"/>' +
      '<g class="marm l"><ellipse cx="14" cy="80" rx="9" ry="13" transform="rotate(20 14 80)" fill="var(--m1)" stroke="' + INK + '" stroke-width="3.5"/></g><g class="marm r"><ellipse cx="106" cy="80" rx="9" ry="13" transform="rotate(-20 106 80)" fill="var(--m1)" stroke="' + INK + '" stroke-width="3.5"/></g>' +
      '<path d="M60 36 C96 36 112 60 112 84 C112 106 92 118 60 118 C28 118 8 106 8 84 C8 60 24 36 60 36Z" fill="var(--m1)" stroke="' + INK + '" stroke-width="4"/>' +
      '<path d="M22 96 Q60 124 98 96 Q94 112 60 116 Q28 112 22 96Z" fill="var(--m2)" opacity=".55"/><ellipse cx="34" cy="52" rx="10" ry="5" transform="rotate(-30 34 52)" fill="#fff" opacity=".45"/>' +
      '<g class="meyes"><circle cx="44" cy="76" r="12" fill="#fff" stroke="' + INK + '" stroke-width="3.5"/><circle cx="76" cy="76" r="12" fill="#fff" stroke="' + INK + '" stroke-width="3.5"/>' +
      '<circle class="pup" cx="46" cy="78" r="6" fill="' + INK + '"/><circle class="pup" cx="78" cy="78" r="6" fill="' + INK + '"/><circle cx="48" cy="75" r="2.2" fill="#fff"/><circle cx="80" cy="75" r="2.2" fill="#fff"/></g>' +
      '<ellipse cx="30" cy="94" rx="7" ry="4.5" fill="#ff6b8a" opacity=".5"/><ellipse cx="90" cy="94" rx="7" ry="4.5" fill="#ff6b8a" opacity=".5"/>' +
      '<path class="mo mo-smile" d="M50 94 Q60 104 70 94" fill="none" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>' +
      '<path class="mo mo-open" d="M48 92 Q60 114 72 92Z" fill="#7a1f3d" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
      '<path class="mo mo-sad" d="M50 102 Q60 92 70 102" fill="none" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>' +
      '<ellipse class="mo mo-o" cx="60" cy="98" rx="5" ry="6" fill="#7a1f3d" stroke="' + INK + '" stroke-width="3.5"/>' +
      a + "</g></svg></span>";
  };

  /* Exam gremlin boss. hue rotates its colour so every topic gets its own. */
  window.boss = function (hue) {
    return '<span class="boss" style="--hue:' + (hue || 0) + 'deg" role="img" aria-label="Exam gremlin"><svg viewBox="0 0 140 140" aria-hidden="true"><g class="bbody">' +
      '<ellipse cx="70" cy="132" rx="38" ry="6" fill="rgba(0,0,0,.25)"/>' +
      '<path d="M26 54 L12 14 L48 38Z" fill="#f43f5e" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/><path d="M114 54 L128 14 L92 38Z" fill="#f43f5e" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="M70 30 C112 30 130 62 130 90 C130 118 104 130 70 130 C36 130 10 118 10 90 C10 62 28 30 70 30Z" fill="#7c3aed" stroke="' + INK + '" stroke-width="4.5"/>' +
      '<path d="M18 104 Q70 134 122 104 Q112 124 70 128 Q28 124 18 104Z" fill="#4c1d95" opacity=".55"/>' +
      '<path d="M34 24 L40 8 L48 22M92 22 L100 8 L106 24" fill="none" stroke="' + INK + '" stroke-width="0"/>' +
      '<circle cx="46" cy="76" r="14" fill="#fff" stroke="' + INK + '" stroke-width="4"/><circle cx="94" cy="76" r="14" fill="#fff" stroke="' + INK + '" stroke-width="4"/>' +
      '<circle class="bp" cx="50" cy="80" r="6.5" fill="#ef4444" stroke="' + INK + '" stroke-width="2"/><circle class="bp" cx="90" cy="80" r="6.5" fill="#ef4444" stroke="' + INK + '" stroke-width="2"/>' +
      '<path d="M28 58 L60 70M112 58 L80 70" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/>' +
      '<path class="bmouth" d="M40 104 Q70 90 100 104 L96 114 L86 106 L78 116 L70 106 L62 116 L54 106 L44 114Z" fill="#1b1340" stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round"/>' +
      '<path d="M52 104 L56 112 L60 104M80 104 L84 112 L88 104" fill="#fff" stroke="#fff" stroke-width="2"/>' +
      "</g></svg></span>";
  };

  window.LEVELS = LEVELS; window.MASCOT_COLORS = COLORS; window.MASCOT_ACCS = ACCS;
})();
