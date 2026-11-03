/* Cartoon cast: every character is hand-drawn inline SVG so the games work offline. */
(function () {
  var ink = '#1c1436';
  var S = 'stroke="' + ink + '" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"';
  var wrap = function (b, label) {
    return '<svg viewBox="0 0 120 120" role="img" aria-label="' + label + '" xmlns="http://www.w3.org/2000/svg">' + b + '</svg>';
  };
  var eye = function (x, y, r) {
    r = r || 7;
    return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#fff" ' + S + '/><circle cx="' + (x + 1.5) + '" cy="' + (y + 1) + '" r="' + (r * 0.45) + '" fill="' + ink + '"/>';
  };
  window.CAST = {
    pi: wrap(
      '<path d="M18 52 Q60 40 102 50" fill="none" stroke="' + ink + '" stroke-width="26" stroke-linecap="round"/>' +
      '<path d="M42 54 Q42 90 28 108" fill="none" stroke="' + ink + '" stroke-width="26" stroke-linecap="round"/>' +
      '<path d="M78 54 Q76 92 92 108" fill="none" stroke="' + ink + '" stroke-width="26" stroke-linecap="round"/>' +
      '<path d="M18 52 Q60 40 102 50" fill="none" stroke="#ffb02e" stroke-width="18" stroke-linecap="round"/>' +
      '<path d="M42 54 Q42 90 28 108" fill="none" stroke="#ffb02e" stroke-width="18" stroke-linecap="round"/>' +
      '<path d="M78 54 Q76 92 92 108" fill="none" stroke="#ffb02e" stroke-width="18" stroke-linecap="round"/>' +
      '<path d="M26 38 Q60 -6 94 38 Q60 26 26 38Z" fill="#23304f" ' + S + '/><circle cx="60" cy="22" r="5" fill="#fff" ' + S + '/>' +
      eye(46, 50, 7) + '<circle cx="74" cy="50" r="8" fill="' + ink + '"/><path d="M66 44 L92 34" ' + S + ' fill="none"/>' +
      '<path d="M50 62 Q60 70 70 60" fill="none" ' + S + '/>', 'Captain Pi, a pirate shaped like the pi symbol'),
    polly: wrap(
      '<path d="M34 104 Q24 62 54 40 Q90 26 94 66 Q96 96 66 108Z" fill="#ff5a4d" ' + S + '/>' +
      '<path d="M54 62 Q86 66 74 104 Q50 96 54 62Z" fill="#2fbf8f" ' + S + '/>' +
      '<path d="M34 104 L20 116 L46 112Z" fill="#2c7be5" ' + S + '/>' +
      eye(58, 44, 8) + '<path d="M36 40 Q14 42 20 62 Q30 58 40 54Z" fill="#ffc933" ' + S + '/>' +
      '<path d="M60 24 Q58 8 72 6 M68 28 Q72 14 86 16" fill="none" ' + S + '/>' +
      '<text x="62" y="92" font-family="Georgia,serif" font-size="20" font-weight="700" fill="' + ink + '">x²</text>', 'Polly Nomial, a parrot'),
    newt: wrap(
      '<rect x="32" y="70" width="56" height="40" rx="14" fill="#f4f6ff" ' + S + '/><rect x="48" y="80" width="24" height="14" rx="3" fill="#ff5da2" ' + S + '/>' +
      '<path d="M88 96 Q112 98 110 76" fill="none" stroke="' + ink + '" stroke-width="12" stroke-linecap="round"/><path d="M88 96 Q112 98 110 76" fill="none" stroke="#4fd06b" stroke-width="6" stroke-linecap="round"/>' +
      '<circle cx="60" cy="44" r="38" fill="#bfefff" ' + S + '/>' +
      '<ellipse cx="60" cy="50" rx="27" ry="22" fill="#4fd06b" ' + S + '/>' + eye(47, 38, 8) + eye(73, 38, 8) +
      '<path d="M46 58 Q60 68 74 58" fill="none" ' + S + '/><path d="M28 24 Q36 14 46 12" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>', 'Newt, an astronaut newt'),
    volt: wrap(
      '<path d="M60 26 V12" ' + S + ' fill="none"/><path d="M64 0 L52 14 H62 L56 24 L70 10 H60Z" fill="#ffd23f" ' + S + '/>' +
      '<rect x="24" y="26" width="72" height="50" rx="12" fill="#29d3e7" ' + S + '/>' +
      '<rect x="34" y="38" width="52" height="24" rx="10" fill="#14103a" ' + S + '/><circle cx="48" cy="50" r="6" fill="#ffd23f"/><circle cx="72" cy="50" r="6" fill="#ffd23f"/>' +
      '<rect x="36" y="80" width="48" height="26" rx="6" fill="#ff7a3d" ' + S + '/><path d="M48 106v8M72 106v8M24 88 H14 M96 88 h10" ' + S + ' fill="none"/>' +
      '<path d="M46 66 h28" stroke="#fff" stroke-width="4"/><circle cx="60" cy="93" r="5" fill="#ffd23f" ' + S + '/>', 'Volt, a robot'),
    mole: wrap(
      '<path d="M22 112 Q18 46 60 40 Q102 46 98 112Z" fill="#f4f7ff" ' + S + '/>' +
      '<ellipse cx="60" cy="50" rx="34" ry="32" fill="#8a5a3c" ' + S + '/>' +
      '<rect x="30" y="34" width="26" height="22" rx="10" fill="#c7f3ff" ' + S + '/><rect x="64" y="34" width="26" height="22" rx="10" fill="#c7f3ff" ' + S + '/><path d="M56 44 h8" ' + S + '/>' +
      '<circle cx="43" cy="45" r="4" fill="' + ink + '"/><circle cx="77" cy="45" r="4" fill="' + ink + '"/>' +
      '<ellipse cx="60" cy="64" rx="9" ry="7" fill="#ff7bac" ' + S + '/><path d="M46 66 L28 62 M46 72 L30 76 M74 66 L92 62 M74 72 L90 76" ' + S + ' fill="none"/>' +
      '<rect x="66" y="88" width="20" height="14" fill="#a6e22e" ' + S + '/><path d="M60 82 V112" ' + S + '/>', 'Professor Mole, a mole in a lab coat and goggles'),
    ion: wrap(
      '<path d="M60 6 L72 34 L102 22 L90 52 L116 66 L88 76 L96 108 L68 90 L52 114 L46 86 L14 94 L30 66 L6 48 L36 44 L30 14 L54 32Z" fill="#ffdc3a" ' + S + '/>' +
      eye(47, 54, 8) + eye(73, 54, 8) + '<path d="M50 72 Q60 80 70 72" fill="none" ' + S + '/>' +
      '<circle cx="90" cy="26" r="12" fill="#ff5da2" ' + S + '/><path d="M90 20 v12 M84 26 h12" stroke="#fff" stroke-width="4" stroke-linecap="round"/>', 'Ion, a spiky spark'),
    mitch: wrap(
      '<path d="M14 62 Q14 22 62 24 Q108 26 108 62 Q108 100 60 98 Q14 98 14 62Z" fill="#ff8a3d" ' + S + '/>' +
      '<path d="M28 68 q6 -22 12 0 t12 0 t12 0 t12 0 t12 0" fill="none" stroke="#ffe0b0" stroke-width="6" stroke-linecap="round" transform="translate(0 8)"/>' +
      '<path d="M30 42 h26 v10 q-14 10 -26 0Z M64 42 h26 v10 q-14 10 -26 0Z" fill="' + ink + '" ' + S + '/><path d="M56 44 h8" ' + S + '/>' +
      '<path d="M50 64 Q60 70 72 62" fill="none" ' + S + '/>' +
      '<path d="M38 96 l-4 16 M82 96 l4 16" ' + S + ' fill="none"/>', 'Mitch, a mitochondrion in sunglasses'),
    finch: wrap(
      '<ellipse cx="60" cy="72" rx="34" ry="36" fill="#ffc933" ' + S + '/>' +
      '<path d="M78 66 Q104 76 88 96 Q74 92 78 66Z" fill="#e8476a" ' + S + '/>' +
      '<ellipse cx="54" cy="84" rx="18" ry="16" fill="#fff4c7"/>' +
      eye(48, 56, 8) + eye(70, 56, 7) + '<path d="M50 68 L60 66 L56 78Z" fill="#ff7a3d" ' + S + '/>' +
      '<path d="M22 40 H98 Q92 36 84 34 Q78 8 58 10 Q40 10 36 34 Q28 36 22 40Z" fill="#c9a36b" ' + S + '/><path d="M37 30 Q60 38 84 30" fill="none" stroke="#14633c" stroke-width="6"/>' +
      '<path d="M46 106 v8 h-8 M72 106 v8 h8" ' + S + ' fill="none"/>', 'Dr Finch, a bird in an explorer hat')
  };

  /* Monster generator: the same name always draws the same cartoon monster. */
  function hash(s) { var h = 7; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }
  window.drawMonster = function (name, colours) {
    var h = hash(name || 'x');
    var c = colours[h % colours.length], c2 = colours[(h >> 3) % colours.length];
    if (c2 === c) c2 = colours[(colours.indexOf(c) + 1) % colours.length];
    var bodies = [
      'M24 104 Q6 60 34 34 Q60 12 88 34 Q114 60 96 104 Q84 94 74 106 Q62 92 48 106 Q36 94 24 104Z',
      'M20 100 Q16 40 60 30 Q104 40 100 100 Q60 116 20 100Z',
      'M14 74 Q14 34 44 40 Q60 18 78 40 Q108 36 106 74 Q104 108 60 108 Q16 108 14 74Z',
      'M30 108 Q6 86 20 56 Q10 28 40 34 Q60 10 82 34 Q110 30 100 58 Q114 88 90 108Z'
    ];
    var horns = [
      '<path d="M36 36 L26 10 L52 28Z M84 36 L94 10 L68 28Z" fill="' + c2 + '" ' + S + '/>',
      '<path d="M60 26 Q52 4 66 2 Q60 14 70 24Z" fill="' + c2 + '" ' + S + '/>',
      '<path d="M40 32 Q30 8 18 16 M80 32 Q90 8 102 16" fill="none" ' + S + '/><circle cx="18" cy="16" r="6" fill="' + c2 + '" ' + S + '/><circle cx="102" cy="16" r="6" fill="' + c2 + '" ' + S + '/>',
      ''
    ];
    var eyes = [
      eye(45, 60, 10) + eye(75, 60, 10),
      eye(60, 56, 15),
      eye(38, 62, 8) + eye(60, 52, 10) + eye(82, 62, 8)
    ];
    var mouths = [
      '<path d="M40 84 Q60 72 80 84 L72 80 L66 88 L60 78 L54 88 L48 80Z" fill="#fff" ' + S + '/>',
      '<path d="M42 80 Q60 98 78 80Z" fill="#7a1f3d" ' + S + '/><path d="M50 82 l4 6 l4 -6 M62 82 l4 6 l4 -6" fill="#fff"/>',
      '<path d="M42 84 q6 -6 12 0 t12 0 t12 0" fill="none" ' + S + '/>'
    ];
    return '<svg viewBox="0 0 120 120" role="img" aria-label="Cartoon monster" xmlns="http://www.w3.org/2000/svg">' +
      horns[(h >> 2) % horns.length] +
      '<path d="' + bodies[h % bodies.length] + '" fill="' + c + '" ' + S + '/>' +
      eyes[(h >> 4) % eyes.length] + mouths[(h >> 6) % mouths.length] + '</svg>';
  };
})();
