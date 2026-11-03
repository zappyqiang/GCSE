/* Curated top-level links per subject: official exam board hubs, trusted channels and sites.
   These are stable hub pages rather than deep links. Check them from a connected device before wide release. */
(function () {
  var boards = [
    ["Edexcel (Pearson) GCSE hub", "https://qualifications.pearson.com/en/qualifications/edexcel-gcses.html", "globe", "Other exam board: find your subject's specification and past papers"],
    ["OCR GCSE hub", "https://www.ocr.org.uk/qualifications/gcse/", "globe", "Other exam board: specifications and past papers"],
    ["WJEC / Eduqas GCSE hub", "https://www.eduqas.co.uk/qualifications/", "globe", "Other exam board (Wales and England): specifications and past papers"]
  ];
  var general = [
    ["Oak National Academy", "https://www.thenational.academy/", "link", "Free lessons and quizzes from the national curriculum body"],
    ["Seneca Learning", "https://senecalearning.com/en-GB/", "globe", "Free GCSE courses and practice"],
    ["Physics and Maths Tutor", "https://www.physicsandmathstutor.com/", "globe", "Free past papers and topic questions"]
  ];
  var ch = {
    maths: [["Corbettmaths on YouTube", "https://www.youtube.com/@corbettmaths", "video", "Short GCSE maths videos"]],
    physics: [["Free Science Lessons on YouTube", "https://www.youtube.com/@freesciencelessons", "video", "GCSE science videos"]],
    chemistry: [["Free Science Lessons on YouTube", "https://www.youtube.com/@freesciencelessons", "video", "GCSE science videos"]],
    biology: [["Free Science Lessons on YouTube", "https://www.youtube.com/@freesciencelessons", "video", "GCSE science videos"]],
    english: [["Mr Bruff on YouTube", "https://www.youtube.com/@mrbruff", "video", "English language and literature walkthroughs"]],
    literature: [["Mr Bruff on YouTube", "https://www.youtube.com/@mrbruff", "video", "Set text and poetry walkthroughs"]],
    business: [["tutor2u on YouTube", "https://www.youtube.com/@tutor2u", "video", "Business and economics revision"]],
    economics: [["tutor2u on YouTube", "https://www.youtube.com/@tutor2u", "video", "Business and economics revision"]],
    sociology: [["tutor2u on YouTube", "https://www.youtube.com/@tutor2u", "video", "Sociology and psychology revision"]],
    psychology: [["tutor2u on YouTube", "https://www.youtube.com/@tutor2u", "video", "Sociology and psychology revision"]],
    computing: [["Craig'n'Dave on YouTube", "https://www.youtube.com/@craigndave", "video", "GCSE computer science lessons"]]
  };
  window.LINKS = {};
  ["maths", "physics", "chemistry", "biology", "english", "literature", "history", "geography", "business", "sociology", "re", "computing", "psychology", "economics"].forEach(function (k) {
    window.LINKS[k] = (ch[k] || []).concat(general, boards);
  });
})();
