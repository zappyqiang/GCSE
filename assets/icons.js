/* Inline SVG icons used across GCSE Quest. Everything is drawn in code so the app works offline. */
(function () {
  window.RANKS = [["Level 1 · Starter", 0], ["Level 2 · Foundations", 400], ["Level 3 · Building", 1000], ["Level 4 · Secure", 2000], ["Level 5 · Confident", 3500], ["Level 6 · Strong", 5500], ["Level 7 · Advanced", 8500], ["Level 8 · Expert", 12500], ["Level 9 · Top grade", 18000]];
  var base = function (b, label) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + (label ? ' role="img" aria-label="' + label + '"' : "") + ">" + b + "</svg>";
  };

  /* subject marks */
  window.SUBJECT_ICON = {
    maths: base('<path d="M4 7h16"/><path d="M8 7v11"/><path d="M16 7c0 4 0 8 2 11"/>'),
    physics: base('<circle cx="12" cy="12" r="1.6" fill="currentColor"/><ellipse cx="12" cy="12" rx="9" ry="3.8"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)"/>'),
    chemistry: base('<path d="M9 3h6"/><path d="M10 3v6l-5.2 8.6A2 2 0 0 0 6.5 21h11a2 2 0 0 0 1.7-3.4L14 9V3"/><path d="M7.6 15h8.8"/>'),
    biology: base('<path d="M6 3c0 5 3 6 6 9s6 4 6 9"/><path d="M18 3c0 5-3 6-6 9s-6 4-6 9"/><path d="M8.2 7h7.6M8.2 17h7.6M10.4 12h3.2"/>')
  };

  /* interface icons */
  window.ICON = {
    dash: base('<rect x="3.5" y="3.5" width="7" height="8" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="5" rx="1.5"/><rect x="13.5" y="11.5" width="7" height="9" rx="1.5"/><rect x="3.5" y="14.5" width="7" height="6" rx="1.5"/>'),
    mock: base('<rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M9 8.5h6M9 12h6M9 15.5h3"/>'),
    speed: base('<path d="M13 3 5 13.5h6L10 21l8-10.5h-6z"/>'),
    review: base('<path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5"/><path d="M20 4v4.5h-4.5"/><path d="M20 12a8 8 0 0 1-13.7 5.6L4 15.5"/><path d="M4 20v-4.5h4.5"/>'),
    labs: base('<path d="M9 3h6"/><path d="M10 3v6l-5.2 8.6A2 2 0 0 0 6.5 21h11a2 2 0 0 0 1.7-3.4L14 9V3"/>'),
    sheet: base('<path d="M6 3.5h9l3.5 3.5v13.5H6z"/><path d="M14.5 3.5V7H18"/><path d="M9 12h6M9 15.5h6"/>'),
    hook: base('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3z"/>'),
    progress: base('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
    settings: base('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
    flame: base('<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 .2 1.5 1 2 1.8 2C10.5 8 11 5.5 12 3z"/>'),
    clock: base('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    check: base('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
    cross: base('<path d="M6 6l12 12M18 6 6 18"/>'),
    arrow: base('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    back: base('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
    home: base('<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v10h12V10"/>'),
    trophy: base('<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H4v1.5A3.5 3.5 0 0 0 7.5 11M16 6h4v1.5A3.5 3.5 0 0 1 16.5 11"/><path d="M12 13v4M8.5 20h7M10 17h4"/>'),
    book: base('<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 0 4 21.5z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 1 1.5 1.5z"/>'),
    target: base('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>')
  };
})();
