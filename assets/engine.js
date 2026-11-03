/* GCSE Quest engine. No dependencies; runs from a local folder. Content lives in /data. */
(function () {
  "use strict";
  var KEY = "gcsequest.v1", memStore = null;
  var RANKS = window.RANKS || [["Level 1 · Starter", 0], ["Level 2 · Foundations", 400], ["Level 3 · Building", 1000], ["Level 4 · Secure", 2000], ["Level 5 · Confident", 3500], ["Level 6 · Strong", 5500], ["Level 7 · Advanced", 8500], ["Level 8 · Expert", 12500], ["Level 9 · Top grade", 18000]];
  var MASTERY = ["Not started", "Developing", "Secure", "Mastered"];

  function blank() { return { settings: { tier: "H", course: "S", sound: true, theme: "auto", examDate: "", goal: 100 }, subj: {}, streak: { last: null, days: 0 }, daily: { d: null, xp: 0 }, badges: {} }; }
  function normalise(s) {
    var b = blank(); s = s && typeof s === "object" ? s : {};
    s.settings = Object.assign(b.settings, s.settings || {}); s.subj = s.subj || {}; s.streak = s.streak || b.streak; s.daily = s.daily || b.daily; s.badges = s.badges || {};
    return s;
  }
  function load() { try { var s = localStorage.getItem(KEY); if (s) return normalise(JSON.parse(s)); } catch (e) {} return normalise(memStore); }
  var S = load();
  function save() { memStore = S; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function applyTheme() { var r = document.documentElement; if (S.settings.theme === "light" || S.settings.theme === "dark") r.setAttribute("data-theme", S.settings.theme); else r.removeAttribute("data-theme"); }

  var G = window.GAME = { topics: [], labs: [], diagrams: {}, sheet: [], cfg: null, levels: {} };
  G.configure = function (c) { G.cfg = c; };
  G.diagram = function (o) { for (var k in o) G.diagrams[k] = o[k]; };
  G.lab = function (l) { G.labs.push(l); };
  function slug(s) { return s.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  G.topic = function (name, icon, paper, levels, opts) {
    var id = slug(name), meta = (G.cfg && G.cfg.topics && G.cfg.topics[name]) || [];
    var t = { id: id, name: meta[0] || name, icon: icon, paper: paper, levels: levels, s: opts && opts.s, blurb: meta[1] || (opts && opts.blurb) || "" };
    levels.forEach(function (l) {
      l.id = t.id + "--" + slug(l.t); l.topic = t;
      if (G.levels[l.id]) console.error("Duplicate level id", l.id);
      G.levels[l.id] = l;
    });
    G.topics.push(t);
  };

  /* helpers */
  var $ = function (sel, el) { return (el || document).querySelector(sel); };
  var $$ = function (sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); };
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;"); }
  function P() {
    var k = G.cfg.key, p = S.subj[k] || (S.subj[k] = {});
    p.xp = p.xp || 0; p.stars = p.stars || {}; p.read = p.read || {}; p.missed = p.missed || {}; p.bossDone = p.bossDone || {};
    p.arcade = p.arcade || 0; p.finalBest = p.finalBest || 0; p.stats = p.stats || {}; p.mocks = p.mocks || [];
    return p;
  }
  G.ri = function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); };
  G.pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
  G.shuf = shuffle;
  G.gcd = function (a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a; };
  var UNIT = "XP";

  function visible(l) { return !(l.h && S.settings.tier === "F") && !(l.s && S.settings.course === "C"); }
  function vLevels(t) { return t.levels.filter(visible); }
  function vTopics() { return G.topics.filter(function (t) { return vLevels(t).length; }); }
  function allV() { var r = []; G.topics.forEach(function (t) { r = r.concat(vLevels(t)); }); return r; }
  function tags(l) {
    return (l.h ? '<span class="tag h">Higher only</span>' : "") + (l.s ? '<span class="tag s">Separate science</span>' : "") + (l.rp ? '<span class="tag r">Required practical</span>' : "");
  }
  function tagsShort(l) { return tags(l) + (l.r ? '<span class="tag">Spec ' + l.r + "</span>" : ""); }
  function pad2(n) { return n < 10 ? "0" + n : "" + n; }
  function pct(a, b) { return b ? Math.round(a / b * 100) : 0; }

  /* sound */
  var ac = null;
  function beep(f, d, type) {
    if (!S.settings.sound) return;
    try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); var o = ac.createOscillator(), g = ac.createGain();
      o.type = type || "sine"; o.frequency.value = f; g.gain.setValueAtTime(.045, ac.currentTime); g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + d);
      o.connect(g); g.connect(ac.destination); o.start(); o.stop(ac.currentTime + d);
    } catch (e) {}
  }
  function sndGood() { beep(660, .1); setTimeout(function () { beep(880, .14); }, 90); }
  function sndBad() { beep(200, .25, "triangle"); }
  function sndWin() { [523, 659, 784, 1047].forEach(function (f, i) { setTimeout(function () { beep(f, .16); }, i * 110); }); }

  /* progress model */
  function rankIdx(x) { var i = 0; for (var k = 0; k < RANKS.length; k++) if (x >= RANKS[k][1]) i = k; return i; }
  function rank(xp) { var x = xp === undefined ? P().xp : xp, i = rankIdx(x); return { i: i, cur: RANKS[i], nxt: RANKS[i + 1] || null }; }
  function dkey(d) { return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function curStreak() { var st = S.streak, d = new Date(); if (st.last === dkey(d) || st.last === dkey(new Date(d - 864e5))) return st.days || 0; return 0; }
  function tickStreak() {
    var d = new Date(), today = dkey(d), st = S.streak;
    if (st.last === today) return;
    st.days = st.last === dkey(new Date(d - 864e5)) ? st.days + 1 : 1; st.last = today;
  }
  function todayXP() { return S.daily.d === dkey(new Date()) ? S.daily.xp : 0; }
  function addXP(n) {
    var p = P(); p.xp += n; tickStreak();
    var k = dkey(new Date()); if (S.daily.d !== k) S.daily = { d: k, xp: 0 }; S.daily.xp += n;
    save(); refreshSide(); checkBadges();
  }
  function gymDue() { var m = P().missed, n = Date.now(), c = 0; for (var k in m) if (m[k].due <= n) c++; return c; }
  function examDays() {
    var v = S.settings.examDate; if (!v) return null; var d = new Date(v + "T09:00:00"); if (isNaN(d)) return null;
    var n = Math.ceil((d - new Date()) / 864e5); return n >= 0 ? n : null;
  }
  function topicStats(t) {
    var p = P(), ls = vLevels(t), st = p.stats[t.id] || { a: 0, c: 0 }, stars = 0, started = 0;
    ls.forEach(function (l) { var s = p.stars[l.id] || 0; stars += s; if (s) started++; });
    return { units: ls.length, started: started, mastered: ls.filter(function (l) { return p.stars[l.id] === 3; }).length, mastery: ls.length ? stars / (ls.length * 3) * 100 : 0, a: st.a, c: st.c, acc: st.a ? st.c / st.a * 100 : null };
  }
  function overall() {
    var tot = { units: 0, started: 0, mastered: 0, a: 0, c: 0, stars: 0 }, p = P();
    vTopics().forEach(function (t) { var s = topicStats(t); tot.units += s.units; tot.started += s.started; tot.mastered += s.mastered; tot.a += s.a; tot.c += s.c; });
    allV().forEach(function (l) { tot.stars += p.stars[l.id] || 0; });
    tot.coverage = tot.units ? tot.started / tot.units : 0; tot.acc = tot.a ? tot.c / tot.a : 0;
    return tot;
  }
  /* indicative bands only: real boundaries change every year */
  function band(p) {
    var F = S.settings.tier === "F", T = F ? [[80, "5"], [65, "4"], [50, "3"], [35, "2"], [20, "1"]] : [[85, "9"], [76, "8"], [66, "7"], [56, "6"], [46, "5"], [36, "4"], [26, "3"], [16, "2"]];
    for (var i = 0; i < T.length; i++) if (p >= T[i][0]) return T[i][1];
    return "U";
  }
  function bandText(g) { return g === "U" ? "Below grade " + (S.settings.tier === "F" ? "1" : "2") : "Around grade " + g; }

  /* badges */
  var BADGES = [
    { id: "first", name: "First lesson", desc: "Read your first lesson.", icon: "book", t: function (a) { return a.read >= 1; } },
    { id: "q100", name: "Century", desc: "Answer 100 questions.", icon: "target", t: function (a) { return a.attempts >= 100; } },
    { id: "q500", name: "Heavy practice", desc: "Answer 500 questions.", icon: "target", t: function (a) { return a.attempts >= 500; } },
    { id: "gold", name: "Mastered a unit", desc: "Finish a unit with no slips.", icon: "check", t: function (a) { return a.mastered >= 1; } },
    { id: "m10", name: "Ten units mastered", desc: "Master ten units.", icon: "trophy", t: function (a) { return a.mastered >= 10; } },
    { id: "s3", name: "Three in a row", desc: "Revise on three days in a row.", icon: "flame", t: function (a) { return a.streak >= 3; } },
    { id: "s7", name: "Week streak", desc: "Revise on seven days in a row.", icon: "flame", t: function (a) { return a.streak >= 7; } },
    { id: "boss", name: "Topic test passed", desc: "Pass a topic test.", icon: "trophy", t: function (a) { return a.tests >= 1; } },
    { id: "mock", name: "Exam conditions", desc: "Complete a mock exam.", icon: "mock", t: function (a) { return a.mocks >= 1; } },
    { id: "mock80", name: "Mock 80%+", desc: "Score 80% or more in a mock exam.", icon: "mock", t: function (a) { return a.best >= 80; } },
    { id: "speed", name: "Quick thinker", desc: "Score 200 in a speed round.", icon: "speed", t: function (a) { return a.speed >= 200; } }
  ];
  function totals() {
    var a = { read: 0, attempts: 0, mastered: 0, streak: curStreak(), tests: 0, mocks: 0, best: 0, speed: 0 };
    Object.keys(S.subj).forEach(function (k) {
      var p = S.subj[k]; a.read += Object.keys(p.read || {}).length; a.tests += Object.keys(p.bossDone || {}).length; a.speed = Math.max(a.speed, p.arcade || 0);
      Object.keys(p.stars || {}).forEach(function (id) { if (p.stars[id] === 3) a.mastered++; });
      Object.keys(p.stats || {}).forEach(function (t) { a.attempts += p.stats[t].a; });
      (p.mocks || []).forEach(function (m) { a.mocks++; a.best = Math.max(a.best, m.pct); });
    });
    return a;
  }
  var toastQ = [];
  function checkBadges() {
    var a = totals(), fresh = [];
    BADGES.forEach(function (b) { if (!S.badges[b.id] && b.t(a)) { S.badges[b.id] = Date.now(); fresh.push(b); } });
    if (fresh.length) { save(); fresh.forEach(function (b) { toastQ.push(b); }); showToast(); }
  }
  var toasting = false;
  function showToast() {
    if (toasting || !toastQ.length || !$("#toasts")) return;
    toasting = true; var b = toastQ.shift();
    $("#toasts").innerHTML = '<div class="toast" role="status">' + ICON[b.icon] + "<div><b>Achievement: " + b.name + "</b><span>" + b.desc + "</span></div></div>";
    setTimeout(function () { var h = $("#toasts"); if (h) h.innerHTML = ""; toasting = false; showToast(); }, 3600);
  }

  /* ---------- shell ---------- */
  var app;
  function ring(p, size, stroke, label) {
    var r = (size - stroke) / 2, c = 2 * Math.PI * r, off = c * (1 - Math.max(0, Math.min(100, p)) / 100), m = size / 2;
    return '<div class="ring" style="width:' + size + "px;height:" + size + "px;font-size:" + Math.round(size * .27) + 'px"><svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + " " + size + '" aria-hidden="true"><circle class="bg" cx="' + m + '" cy="' + m + '" r="' + r + '" fill="none" stroke-width="' + stroke + '"/><circle class="fg" cx="' + m + '" cy="' + m + '" r="' + r + '" fill="none" stroke-width="' + stroke + '" stroke-linecap="round" stroke-dasharray="' + c + '" stroke-dashoffset="' + off + '"/></svg><b>' + (label !== undefined ? label : Math.round(p) + "%") + "</b></div>";
  }
  function track(p, cls) { return '<div class="track ' + (cls || "") + '" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + Math.round(p) + '"><i style="width:' + Math.max(0, Math.min(100, p)) + '%"></i></div>'; }
  function refreshSide() {
    var el = $("#xpmini"); if (!el || !G.cfg) return;
    var r = rank(), p = P(), pc = r.nxt ? (p.xp - r.cur[1]) / (r.nxt[1] - r.cur[1]) * 100 : 100;
    el.innerHTML = '<div class="top"><b>' + r.cur[0] + "</b><span>" + p.xp.toLocaleString() + " " + UNIT + "</span></div>" + track(pc) + '<div class="top" style="margin-top:6px"><span>' + (r.nxt ? (r.nxt[1] - p.xp).toLocaleString() + " " + UNIT + " to next level" : "Top level reached") + "</span></div>";
  }
  function shell(active) {
    var c = G.cfg, nav = [["#/", "Dashboard", "dash", "dash"], ["#/mock", "Mock exam", "mock", "mock"], ["#/speed", "Speed round", "speed", "speed"], ["#/review", "Review queue", "gym", "review"], ["#/labs", "Labs", "labs", "labs"], ["#/sheet", c.sheetName, "sheet", "sheet"], ["#/hooks", "Memory hooks", "tricks", "hook"], ["#/progress", "Progress", "progress", "progress"], ["#/settings", "Settings", "settings", "settings"]];
    $("#bar").innerHTML = '<a class="brand" href="#/"><span class="mark">' + SUBJECT_ICON[c.key] + '</span><span><b>GCSE ' + c.subject + "</b><small>" + (c.spec || "") + '</small></span></a><nav aria-label="Sections">' +
      nav.map(function (n) { var due = n[2] === "gym" ? gymDue() : 0; return '<a href="' + n[0] + '" class="navlink ' + (active === n[2] ? "on" : "") + '"' + (active === n[2] ? ' aria-current="page"' : "") + ">" + ICON[n[3]] + "<span>" + n[1] + "</span>" + (due ? '<span class="count" aria-label="' + due + ' due">' + due + "</span>" : "") + "</a>"; }).join("") +
      '</nav><div class="sidefoot"><div class="xpcard" id="xpmini"></div><a class="sidelink" href="index.html">' + ICON.back + "All subjects</a></div>";
    refreshSide(); window.scrollTo(0, 0);
  }
  function crumbs(parts) { return '<div class="crumbs">' + parts.map(function (p, i) { return (i ? "<i>/</i>" : "") + (p[1] ? '<a href="' + p[1] + '">' + p[0] + "</a>" : "<span>" + p[0] + "</span>"); }).join("") + "</div>"; }
  function pageHead(c, title, lead) { return (c ? crumbs(c) : "") + '<h1 class="title">' + title + "</h1>" + (lead ? '<p class="lead">' + lead + "</p>" : ""); }

  /* ---------- dashboard ---------- */
  function nextUnit() {
    var p = P(), ts = vTopics();
    for (var i = 0; i < ts.length; i++) { var ls = vLevels(ts[i]); for (var j = 0; j < ls.length; j++) if (!p.stars[ls[j].id]) return { t: ts[i], l: ls[j] }; }
    return null;
  }
  function viewDash() {
    shell("dash");
    var c = G.cfg, p = P(), o = overall(), nx = nextUnit(), due = gymDue(), days = examDays(), goal = S.settings.goal || 100, tx = todayXP(), streak = curStreak();
    var stats = '<div class="statrow">' +
      '<div class="stat"><div class="ic">' + ICON.flame + "</div><div><b>" + streak + (streak === 1 ? " day" : " days") + "</b><span>Revision streak</span></div></div>" +
      '<div class="stat"><div class="ic">' + ICON.target + "</div><div><b>" + Math.min(tx, goal) + " / " + goal + "</b><span>Today's " + UNIT + " goal</span></div></div>" +
      '<div class="stat"><div class="ic">' + ICON.check + "</div><div><b>" + (o.a ? Math.round(o.acc * 100) + "%" : "–") + "</b><span>Accuracy (" + o.a.toLocaleString() + " answered)</span></div></div>" +
      (days !== null ? '<div class="stat"><div class="ic">' + ICON.clock + "</div><div><b>" + days + (days === 1 ? " day" : " days") + "</b><span>Until your exams</span></div></div>" : '<div class="stat"><div class="ic">' + ICON.trophy + "</div><div><b>" + o.mastered + " / " + o.units + "</b><span>Units mastered</span></div></div>") + "</div>";
    var hero = nx ?
      '<section class="hero"><div><div class="eyebrow">Continue learning</div><h2>' + nx.l.t + '</h2><p>' + nx.t.name + (nx.l.r ? " · Spec " + nx.l.r : "") + ". Read the short lesson, then answer questions to lock it in.</p>" + '<div class="row"><a class="btn" href="#/l/' + nx.l.id + '">Start this unit ' + ICON.arrow + '</a><a class="btn alt" href="#/daily">Daily 10 quick-fire</a></div></div>' + ring(pct(o.started, o.units), 92, 9) + "</section>" :
      '<section class="hero"><div><div class="eyebrow">Every unit started</div><h2>Time to test yourself</h2><p>You have been through the whole course. Sit a timed mock exam, or clear your review queue to strengthen weak spots.</p><div class="row"><a class="btn" href="#/mock">Sit a mock exam ' + ICON.arrow + '</a><a class="btn alt" href="#/review">Review queue</a></div></div>' + ring(100, 92, 9) + "</section>";
    var quick = '<div class="quick">' +
      '<a class="qlink" href="#/daily"><div class="ic">' + ICON.target + "</div><div><b>Daily 10</b><span>Ten mixed questions from across the course.</span></div></a>" +
      '<a class="qlink" href="#/mock"><div class="ic">' + ICON.mock + "</div><div><b>Mock exam</b><span>Timed, no hints, with a graded report.</span></div></a>" +
      '<a class="qlink" href="#/review"><div class="ic">' + ICON.review + "</div><div><b>Review queue</b><span>" + (due ? due + " question" + (due > 1 ? "s" : "") + " due today." : "Nothing due. Mistakes return here.") + "</span></div></a>" +
      '<a class="qlink" href="#/final"><div class="ic">' + ICON.trophy + "</div><div><b>" + (c.finalName || "Final assessment") + "</b><span>30 questions across every topic.</span></div></a></div>";
    var nextId = nx ? nx.t.id : null;
    var grid = '<div class="topicgrid">' + vTopics().map(function (t, i) {
      var s = topicStats(t), isNext = t.id === nextId;
      return '<a class="tcard ' + (isNext ? "next" : "") + '" href="#/t/' + t.id + '">' + (isNext ? '<span class="badge">UP NEXT</span>' : "") + '<div class="hd"><span class="num">' + pad2(i + 1) + '</span><div><h3>' + t.name + "</h3></div></div>" + (t.blurb ? "<p>" + t.blurb + "</p>" : "") + track(s.mastery) +
        '<div class="ft"><span>' + s.started + " of " + s.units + " units started" + (p.bossDone[t.id] ? " · test passed" : "") + "</span><span>" + (s.acc === null ? (t.paper || "") : Math.round(s.acc) + "% accuracy") + "</span></div></a>";
    }).join("") + "</div>";
    app.innerHTML = pageHead(null, c.title, c.intro) + stats + hero + '<h2 class="sec">Practise</h2>' + quick + '<h2 class="sec">Topics <small>' + o.units + " units · " + (S.settings.tier === "H" ? "Higher tier" : "Foundation tier") + (c.key !== "maths" ? (S.settings.course === "S" ? " · Separate science" : " · Combined science") : "") + "</small></h2>" + grid;
  }

  /* ---------- topic ---------- */
  function viewTopic(id) {
    shell("dash");
    var t = G.topics.filter(function (x) { return x.id === id; })[0]; if (!t) return go("#/");
    var p = P(), ls = vLevels(t), nx = false, s = topicStats(t);
    var rows = ls.map(function (l, i) {
      var st = p.stars[l.id] || 0, cls = "m" + st; if (!st && !nx) { cls += " next"; nx = true; }
      return '<a class="unit ' + cls + '" href="#/l/' + l.id + '"><span class="n">' + (st === 3 ? ICON.check : pad2(i + 1)) + "</span><div><b>" + l.t + '</b><div class="meta">' + tagsShort(l) + '</div></div><span class="state">' + (st ? MASTERY[st] : cls.indexOf("next") > -1 ? "Up next" : "Not started") + "</span></a>";
    }).join("");
    rows += '<a class="unit test ' + (p.bossDone[t.id] ? "m3" : "") + '" href="#/test/' + t.id + '"><span class="n">' + (p.bossDone[t.id] ? ICON.check : ICON.target) + "</span><div><b>" + t.name + ' topic test</b><div class="meta"><span class="tag">' + Math.min(12, Math.max(8, ls.length * 2)) + ' mixed questions · 5 strikes</span></div></div><span class="state">' + (p.bossDone[t.id] ? "Passed" : "Take the test") + "</span></a>";
    app.innerHTML = pageHead([["Dashboard", "#/"], [t.name]], t.name, (t.blurb || "") + (t.paper ? " (" + t.paper + ")" : "")) +
      '<div class="statrow" style="max-width:640px"><div class="stat"><div class="ic">' + ICON.progress + "</div><div><b>" + Math.round(s.mastery) + "%</b><span>Mastery</span></div></div>" +
      '<div class="stat"><div class="ic">' + ICON.check + "</div><div><b>" + s.mastered + " / " + s.units + "</b><span>Units mastered</span></div></div>" +
      '<div class="stat"><div class="ic">' + ICON.target + "</div><div><b>" + (s.acc === null ? "–" : Math.round(s.acc) + "%") + "</b><span>Accuracy</span></div></div></div>" + '<div class="units">' + rows + "</div>";
  }

  /* ---------- lesson ---------- */
  function viewLevel(id) {
    shell("dash");
    var l = G.levels[id]; if (!l) return go("#/");
    var t = l.topic, html = "";
    if (l.d && G.diagrams[l.d]) html += '<figure class="figure" style="margin:0"><figcaption>Diagram</figcaption>' + G.diagrams[l.d] + "</figure>";
    l.c.forEach(function (line, i) { html += '<div class="point" style="animation-delay:' + i * 60 + 'ms"><div class="who">' + pad2(i + 1) + '</div><div class="say">' + line + "</div></div>"; });
    html += '<div class="hook"><h3>' + ICON.hook + "Memory hook</h3><p>" + l.k + "</p></div>";
    app.innerHTML = pageHead([["Dashboard", "#/"], [t.name, "#/t/" + t.id], [l.t]], l.t, "") + '<div style="margin:-2px 0 18px">' + tags(l) + (l.r ? '<span class="tag">Spec ' + l.r + "</span>" : "") + '</div><div class="lesson">' + html +
      '<div class="lessonbar"><button class="btn" id="go">Start practice ' + ICON.arrow + '</button><a class="btn alt" href="#/t/' + t.id + '">Back to topic</a></div></div>';
    P().read[l.id] = 1; save(); checkBadges();
    $("#go").onclick = function () { playLevel(l); };
  }

  function mkQ(raw, levelId, i) { return { raw: raw, qid: levelId + "#" + i, levelId: levelId }; }
  function hashStr(s) { var h = 3; for (var i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) >>> 0; return h; }
  function playLevel(l) {
    var qs = l.q.map(function (q, i) { return mkQ(q, l.id, i); });
    practice({ title: l.t, crumbs: [["Dashboard", "#/"], [l.topic.name, "#/t/" + l.topic.id], [l.t, "#/l/" + l.id]], qs: shuffle(qs), hearts: 3, pts: 10, onWin: function (res) {
      var p = P(), st = res.mistakes === 0 ? 3 : res.mistakes <= 2 ? 2 : 1, was = p.stars[l.id] || 0;
      if (st > was) p.stars[l.id] = st;
      if (!was) addXP(25); save();
      resultScreen(st, res, { again: "#/l/" + l.id, lesson: "#/l/" + l.id, next: nextAfter(l), label: l.t, first: !was });
    }, onLose: function (res) { loseScreen(res, function () { playLevel(l); }, "#/l/" + l.id, "Review the lesson"); } });
  }
  function nextAfter(l) {
    var ls = vLevels(l.topic), i = ls.indexOf(l);
    return i < ls.length - 1 ? { href: "#/l/" + ls[i + 1].id, name: "Next: " + ls[i + 1].t } : { href: "#/test/" + l.topic.id, name: "Take the topic test" };
  }
  function poolFrom(ls, count) {
    var all = [];
    ls.forEach(function (l) { l.q.forEach(function (q, i) { all.push(mkQ(q, l.id, i)); }); });
    all = shuffle(all); var seen = {}, out = [];
    all.forEach(function (x) { if (!seen[x.levelId] && out.length < count) { seen[x.levelId] = 1; out.push(x); } });
    all.forEach(function (x) { if (out.indexOf(x) < 0 && out.length < count) out.push(x); });
    return shuffle(out);
  }
  function viewTest(id) {
    shell("dash");
    var t = G.topics.filter(function (x) { return x.id === id; })[0]; if (!t) return go("#/");
    var name = t.name + " topic test";
    practice({ title: name, crumbs: [["Dashboard", "#/"], [t.name, "#/t/" + t.id], ["Topic test"]], qs: poolFrom(vLevels(t), Math.min(12, Math.max(8, vLevels(t).length * 2))), hearts: 5, pts: 15, onWin: function (res) {
      P().bossDone[t.id] = 1; addXP(100); save(); checkBadges();
      resultScreen(res.mistakes <= 1 ? 3 : res.mistakes <= 3 ? 2 : 1, res, { again: "#/test/" + t.id, next: { href: "#/", name: "Back to dashboard" }, label: name, bonus: 100 });
    }, onLose: function (res) { loseScreen(res, function () { viewTest(id); }, "#/t/" + t.id, "Back to topic"); } });
  }
  function viewFinal() {
    shell("dash");
    var name = G.cfg.finalName || "Final assessment";
    practice({ title: name, crumbs: [["Dashboard", "#/"], [name]], qs: poolFrom(allV(), 30), hearts: 7, pts: 20, onWin: function (res) {
      var p = P(); p.finalBest = Math.max(p.finalBest, res.score); addXP(300); save();
      resultScreen(res.mistakes <= 2 ? 3 : res.mistakes <= 6 ? 2 : 1, res, { again: "#/final", next: { href: "#/", name: "Back to dashboard" }, label: name, bonus: 300 });
    }, onLose: function (res) { loseScreen(res, viewFinal, "#/", "Back to dashboard"); } });
  }
  function viewDaily() {
    shell("dash");
    practice({ title: "Daily 10", crumbs: [["Dashboard", "#/"], ["Daily 10"]], qs: poolFrom(allV(), 10), hearts: 3, pts: 12, onWin: function (res) {
      addXP(30); save(); resultScreen(res.mistakes === 0 ? 3 : res.mistakes <= 2 ? 2 : 1, res, { again: "#/daily", next: { href: "#/", name: "Back to dashboard" }, label: "Daily 10", bonus: 30 });
    }, onLose: function (res) { loseScreen(res, viewDaily, "#/", "Back to dashboard"); } });
  }
  function viewGym() {
    shell("gym");
    var p = P(), n = Date.now(), ids = Object.keys(p.missed).filter(function (k) { return p.missed[k].due <= n; }), later = Object.keys(p.missed).length - ids.length;
    var list = ids.map(function (k) { var pr = k.split("#"), l = G.levels[pr[0]]; return l && l.q[+pr[1]] !== undefined ? mkQ(l.q[+pr[1]], pr[0], +pr[1]) : null; }).filter(Boolean);
    if (!list.length) {
      app.innerHTML = pageHead(null, "Review queue", "Questions you get wrong are scheduled to return on later days. Get one right three times, spaced out, and it leaves the queue for good. Spacing like this is what makes facts last until the exam.") +
        '<div class="card" style="max-width:620px"><b>Nothing to review right now.</b><p class="muted" style="margin:6px 0 16px">' + (later ? later + " question" + (later > 1 ? "s are" : " is") + " scheduled for a later day." : "Any question you miss will be saved here automatically.") + '</p><a class="btn" href="#/">Back to dashboard</a></div>';
      return;
    }
    practice({ title: "Review queue", crumbs: [["Review queue"]], qs: shuffle(list).slice(0, 15), hearts: 5, pts: 12, gym: true, onWin: function (res) {
      addXP(20); save(); resultScreen(res.mistakes === 0 ? 3 : res.mistakes <= 2 ? 2 : 1, res, { again: "#/review", next: { href: "#/", name: "Back to dashboard" }, label: "Review queue", bonus: 20 });
    }, onLose: function (res) { loseScreen(res, viewGym, "#/", "Back to dashboard"); } });
  }

  /* ---------- practice session ---------- */
  var rank0 = 0, ci = ["Correct", "Well done", "Exactly right", "Spot on", "Nice work", "Good recall"];
  function livesHtml(h, m) { var s = ""; for (var i = 0; i < m; i++) s += '<i class="' + (i < h ? "" : "off") + '"></i>'; return s; }
  function practice(o) {
    var queue = o.qs.slice(), total = queue.length, hits = 0, hearts = o.hearts, maxH = o.hearts, combo = 0, bestCombo = 0, score = 0, mistakes = 0, answered = 0, correct = 0;
    rank0 = rank().i;
    app.innerHTML = (o.crumbs ? crumbs(o.crumbs) : "") + '<div class="session"><div class="statusbar"><div><div class="qlabel" style="margin-bottom:8px"><span>' + o.title + '</span><span id="qn"></span></div><div id="pgwrap"></div></div><div class="meta"><span class="pips" id="lives" aria-live="polite"></span><span class="streak" id="combo"></span><span id="score"></span></div></div><div class="qcard" id="qb"></div></div>';
    function hud() {
      $("#lives").innerHTML = '<span style="margin-right:6px">Strikes left</span>' + livesHtml(hearts, maxH); $("#lives").setAttribute("aria-label", hearts + " strikes left");
      $("#combo").innerHTML = combo > 1 ? ICON.flame + "×" + Math.min(combo, 5) : "";
      $("#score").innerHTML = "<b>" + score + "</b> " + UNIT;
      $("#qn").textContent = "Question " + Math.min(hits + 1, total) + " of " + total;
      $("#pgwrap").innerHTML = track(hits / total * 100);
    }
    function next() {
      if (!queue.length) { o.onWin({ score: score, mistakes: mistakes, total: total, answered: answered, correct: correct, best: bestCombo }); return; }
      var q = queue.shift();
      askQuestion(q.raw, $("#qb"), function (ok, why, cont) {
        var p = P(), tid = G.levels[q.levelId] && G.levels[q.levelId].topic.id, st = tid ? (p.stats[tid] = p.stats[tid] || { a: 0, c: 0 }) : null;
        answered++; if (st) st.a++;
        var card = $("#qb"); card.classList.remove("flash-ok", "flash-no"); void card.offsetWidth; card.classList.add(ok ? "flash-ok" : "flash-no");
        if (ok) {
          correct++; if (st) st.c++; hits++; combo++; bestCombo = Math.max(bestCombo, combo); var gain = o.pts * Math.min(combo, 5); score += gain; addXP(gain); sndGood();
          if (o.gym && p.missed[q.qid]) { var m = p.missed[q.qid]; m.box++; if (m.box >= 3) delete p.missed[q.qid]; else m.due = Date.now() + [1, 3, 7][m.box] * 864e5; }
        } else {
          hearts--; combo = 0; mistakes++; sndBad();
          p.missed[q.qid] = { box: 0, due: Date.now() };
          queue.push(q); /* the question returns until it lands */
        }
        save(); hud();
        cont(function () { if (hearts <= 0) o.onLose({ score: score, mistakes: mistakes, total: total, answered: answered, correct: correct, best: bestCombo }); else next(); });
      });
    }
    hud(); next();
  }

  /* one question: calls done(firstTryCorrect, why, cont, meta) */
  function normal(raw) { return typeof raw === "function" ? raw() : raw; }
  function fbk(box, ok, why, proceed) {
    var f = document.createElement("div"); f.className = "feedback " + (ok ? "ok" : "no"); f.setAttribute("role", "status");
    f.innerHTML = "<p><b>" + (ok ? ICON.check + G.pick(ci) : ICON.cross + "Not quite") + "</b>" + (why || "") + '</p><button class="btn small" id="cont">Continue ' + ICON.arrow + "</button>";
    box.appendChild(f); var b = $("#cont", f); b.onclick = function () { detach(); proceed(); }; b.focus({ preventScroll: true });
    f.scrollIntoView && f.scrollIntoView({ block: "nearest" });
  }
  var keyHandler = null;
  function detach() { if (keyHandler) { document.removeEventListener("keydown", keyHandler); keyHandler = null; } }
  function attach(fn) { detach(); keyHandler = fn; document.addEventListener("keydown", fn); }
  var TYPE = { m: "Multiple choice", t: "True or false", n: "Calculation", w: "Short answer", p: "Match the pairs", s: "Sort into groups", o: "Put in order" };
  function askQuestion(raw, box, done, exam) {
    var q = normal(raw), k = q[0], meta = { prompt: q[1], correct: "" };
    var finish = function (ok, why, extra, correct) {
      detach(); meta.correct = correct || ""; meta.why = why || "";
      if (exam) setTimeout(function () { done(ok, why, function (proc) { proc(); }, meta); }, 220);
      else done(ok, why, function (proc) { fbk(box, ok, (extra || "") + (why || ""), proc); }, meta);
    };
    var label = '<div class="qlabel"><span>' + TYPE[k] + "</span></div>";
    box.innerHTML = "";
    if (k === "m" || k === "t") {
      var prompt = q[1], opts, why;
      if (k === "m") { opts = [{ h: q[2], ok: true }, { h: q[3] }, { h: q[4] }, { h: q[5] }].filter(function (x, i, arr) { return x.h !== undefined && x.h !== null && arr.map(function (y) { return String(y.h); }).indexOf(String(x.h)) === i; }); why = q[6]; opts = shuffle(opts); }
      else { opts = [{ h: "True", ok: q[2] === true }, { h: "False", ok: q[2] === false }]; why = q[3]; meta.prompt = "True or false: " + q[1]; }
      var corr = opts.filter(function (x) { return x.ok; })[0].h;
      box.innerHTML = label + '<p class="prompt">' + prompt + '</p><div class="choices">' + opts.map(function (o, i) { return '<button class="choice" data-i="' + i + '"><span class="kb">' + (i + 1) + "</span><span>" + o.h + "</span></button>"; }).join("") + "</div>";
      var answered = false;
      var pickI = function (i) {
        if (answered) return; answered = true;
        var ok = !!opts[i].ok;
        $$(".choice", box).forEach(function (b, j) { b.disabled = true; if (exam) { if (j === i) b.classList.add("picked"); } else { if (opts[j].ok) b.classList.add("right"); if (j === i && !ok) b.classList.add("wrong"); } });
        finish(ok, why, "", corr);
      };
      $$(".choice", box).forEach(function (b) { b.onclick = function () { pickI(+b.dataset.i); }; });
      attach(function (e) { var n = +e.key; if (n >= 1 && n <= opts.length) pickI(n - 1); });
      return;
    }
    if (k === "n" || k === "w") {
      box.innerHTML = label + '<p class="prompt">' + q[1] + '</p><form class="typed"><input id="ans" aria-label="Your answer" autocomplete="off" autocapitalize="off" spellcheck="false">' + (k === "n" && q[3] ? '<span class="unit-lab">' + q[3] + "</span>" : "") + '<button class="btn small">Check answer</button></form>';
      var inp = $("#ans", box), form = $("form", box); inp.focus({ preventScroll: true });
      form.onsubmit = function (e) {
        e.preventDefault(); var v = inp.value.trim(); if (!v) return;
        inp.disabled = true; $("button", form).disabled = true;
        if (k === "n") {
          var ans = q[2], num = parseNum(v), tol = q[5] !== undefined ? q[5] : Math.max(Math.abs(ans) * .001, 1e-9);
          var ok = num !== null && Math.abs(num - ans) <= tol, cs = fmt(ans) + (q[3] ? " " + q[3] : "");
          finish(ok, q[4], ok ? "" : "The answer is " + cs + ". ", cs);
        } else {
          var norm = function (s) { return s.toLowerCase().replace(/[^a-z0-9+\-]/g, ""); }, list = q[2], ok2 = list.some(function (a) { return norm(a) === norm(v); });
          finish(ok2, q[3], ok2 ? "" : "The answer is " + list[0] + ". ", list[0]);
        }
      };
      return;
    }
    if (k === "p") {
      var pairs = q[2], L = shuffle(pairs.map(function (p, i) { return { t: p[0], i: i }; })), R = shuffle(pairs.map(function (p, i) { return { t: p[1], i: i }; }));
      box.innerHTML = label + '<p class="prompt">' + q[1] + ' <span class="muted" style="font-weight:500;font-size:15px">Select one item from each side.</span></p><div class="pairs"><div>' + L.map(function (x) { return '<button class="tile" data-s="L" data-i="' + x.i + '">' + x.t + "</button>"; }).join("") + "</div><div>" + R.map(function (x) { return '<button class="tile" data-s="R" data-i="' + x.i + '">' + x.t + "</button>"; }).join("") + "</div></div>";
      var sel = null, left = pairs.length, err = false, ctext = pairs.map(function (p) { return p[0] + " – " + p[1]; }).join("; ");
      $$(".tile", box).forEach(function (b) {
        b.onclick = function () {
          if (b.classList.contains("done")) return;
          if (!sel || sel.dataset.s === b.dataset.s) { if (sel) sel.classList.remove("sel"); sel = b; b.classList.add("sel"); return; }
          if (sel.dataset.i === b.dataset.i) { [sel, b].forEach(function (x) { x.classList.remove("sel"); x.classList.add("done"); x.disabled = true; }); beep(740, .07); sel = null; left--; if (!left) finish(!err, q[3] || "All matched.", "", ctext); }
          else { err = true; var a = sel; sel = null; a.classList.remove("sel"); [a, b].forEach(function (x) { x.classList.add("oops"); setTimeout(function () { x.classList.remove("oops"); }, 420); }); sndBad(); }
        };
      });
      return;
    }
    if (k === "s") {
      var bins = Object.keys(q[2]), items = [];
      bins.forEach(function (b) { q[2][b].forEach(function (t) { items.push({ t: t, b: b }); }); }); items = shuffle(items);
      box.innerHTML = label + '<p class="prompt">' + q[1] + '</p><div class="item" id="it"></div><div class="bins">' + bins.map(function (b, i) { return '<button class="bin" data-b="' + esc(b) + '">' + b + "<small>Key " + (i + 1) + "</small></button>"; }).join("") + "</div>";
      var idx = 0, serr = false, stext = bins.map(function (b) { return b + ": " + q[2][b].join(", "); }).join("; "), show = function () { $("#it", box).innerHTML = items[idx].t + ' <small class="muted" style="font-size:13px;font-weight:600">(' + (idx + 1) + " of " + items.length + ")</small>"; };
      var choose = function (bn, el) {
        if (idx >= items.length) return;
        if (items[idx].b === bn) { beep(740, .07); idx++; if (idx >= items.length) { $("#it", box).textContent = "All sorted"; finish(!serr, q[3] || "Everything is in the right place.", "", stext); } else show(); }
        else { serr = true; sndBad(); if (el) { el.classList.add("sad"); setTimeout(function () { el.classList.remove("sad"); }, 500); } }
      };
      $$(".bin", box).forEach(function (b) { b.onclick = function () { choose(b.dataset.b.replace(/&amp;/g, "&").replace(/&quot;/g, '"'), b); }; });
      attach(function (e) { var n = +e.key; if (n >= 1 && n <= bins.length) choose(bins[n - 1], $$(".bin", box)[n - 1]); });
      show(); return;
    }
    if (k === "o") {
      var seq = q[2], tiles = shuffle(seq.map(function (t, i) { return { t: t, i: i }; }));
      box.innerHTML = label + '<p class="prompt">' + q[1] + '</p><div class="ordered" id="od"></div><div class="choices">' + tiles.map(function (x) { return '<button class="tile" data-i="' + x.i + '">' + x.t + "</button>"; }).join("") + "</div>";
      var pos = 0, oerr = false;
      $$(".tile", box).forEach(function (b) {
        b.onclick = function () {
          if (+b.dataset.i === pos) { $("#od", box).insertAdjacentHTML("beforeend", "<div>" + seq[pos] + "</div>"); b.style.display = "none"; beep(740, .07); pos++; if (pos === seq.length) finish(!oerr, q[3] || "That's the right order.", "", seq.map(function (x, i) { return (i + 1) + ". " + x; }).join(" ")); }
          else { oerr = true; sndBad(); b.classList.add("oops"); setTimeout(function () { b.classList.remove("oops"); }, 420); }
        };
      });
      return;
    }
    console.error("Unknown question type", q);
  }
  function parseNum(v) {
    v = v.replace(/,/g, "").replace(/[−–]/g, "-").replace(/\s+/g, "").replace(/×10\^?/g, "e");
    var m = v.match(/^(-?\d*\.?\d+)\/(\d*\.?\d+)$/); if (m) return parseFloat(m[1]) / parseFloat(m[2]);
    v = v.replace(/[a-zA-Z%°£²³\/]+$/g, function (u) { return /^e/i.test(u) ? u : ""; }).replace(/^£/, "");
    var n = Number(v); return isNaN(n) ? null : n;
  }
  function fmt(n) { return Math.abs(n) >= 1e12 || (n !== 0 && Math.abs(n) < 1e-4) ? n.toExponential(3) : String(Math.round(n * 1e6) / 1e6); }
  G.fmt = fmt;

  function levelUpHtml() { var r = rank(); return r.i > rank0 ? '<div class="levelup">' + ICON.trophy + "Level up: " + r.cur[0] + "</div>" : ""; }
  function resultScreen(st, res, o) {
    detach(); sndWin();
    var acc = pct(res.correct, res.answered), nx = o.next;
    app.innerHTML = '<div class="card result">' + levelUpHtml() + ring(acc, 112, 10) + "<h1>" + MASTERY[st] + '</h1><p class="sub">' + o.label + (o.first ? " · +25 " + UNIT + " for your first completion" : "") + (o.bonus ? " · +" + o.bonus + " " + UNIT + " completion bonus" : "") + "</p>" +
      '<div class="breakdown"><div><b>' + (res.score + (o.bonus || 0) + (o.first ? 25 : 0)) + "</b><span>" + UNIT + " earned</span></div><div><b>" + acc + "%</b><span>Accuracy</span></div><div><b>" + res.mistakes + "</b><span>Slips" + (res.mistakes ? " (saved to review)" : "") + "</span></div><div><b>×" + Math.max(1, Math.min(res.best || 1, 5)) + "</b><span>Best streak</span></div></div>" +
      '<div class="row" style="justify-content:center"><a class="btn" id="nxt" href="' + nx.href + '">' + nx.name + " " + ICON.arrow + '</a><a class="btn alt" href="' + o.again + '" id="again">Practise again</a></div></div>';
    if (location.hash === o.again) $("#again").onclick = function (e) { e.preventDefault(); route(); };
    $("#nxt").focus({ preventScroll: true }); window.scrollTo(0, 0);
  }
  function loseScreen(res, retry, backHref, backLabel) {
    detach();
    app.innerHTML = '<div class="card result"><h1>Session ended</h1><p class="sub" style="max-width:48ch;margin:8px auto 20px">You used all your strikes. You still keep the ' + res.score + " " + UNIT + " you earned, and every question you missed is saved to your review queue. A quick reread of the lesson usually fixes it.</p>" +
      '<div class="row" style="justify-content:center"><button class="btn" id="re">Try again</button><a class="btn alt" href="' + backHref + '">' + (backLabel || "Back") + "</a></div></div>";
    $("#re").onclick = retry; $("#re").focus({ preventScroll: true }); window.scrollTo(0, 0);
  }

  /* ---------- speed round ---------- */
  function arcadeQ(ls) {
    for (var tries = 0; tries < 60; tries++) {
      var l = G.pick(ls), q = normal(G.pick(l.q)), k = q[0];
      if (k === "m") { var a = q.slice(2, 6).filter(function (x, i, arr) { return x !== undefined && x !== null && arr.indexOf(x) === i; }); if (a.join("").length < 220) return { p: q[1], opts: shuffle(a.map(function (t, i) { return { t: t, ok: i === 0 }; })), why: q[6], tid: l.topic.id }; }
      else if (k === "t") return { p: "True or false? " + q[1], opts: [{ t: "True", ok: q[2] === true }, { t: "False", ok: q[2] === false }], why: q[3], tid: l.topic.id };
      else if (k === "n") {
        var ans = q[2], u = q[3] ? " " + q[3] : "", set = {}; set[fmt(ans)] = 1;
        var dist = [ans * 2, ans / 2, ans + 1, ans - 1, ans * 10, ans / 10, ans + 2].map(function (x) { return Math.round(x * 1e4) / 1e4; }).filter(function (x) { if (set[fmt(x)]) return false; set[fmt(x)] = 1; return true; }).slice(0, 3);
        return { p: q[1], opts: shuffle([{ t: fmt(ans) + u, ok: true }].concat(dist.map(function (d) { return { t: fmt(d) + u }; }))), why: q[4], tid: l.topic.id };
      }
    }
    return null;
  }
  function viewSpeed() {
    shell("speed");
    var topics = vTopics();
    app.innerHTML = pageHead(null, "Speed round", "Ninety seconds, three strikes. Quick-fire multiple choice to build recall speed. Press 1 to 4 to answer, and keep your streak going for a score multiplier.") +
      '<div class="card" style="max-width:640px"><div class="row"><label for="asc" style="font-weight:700">Topic</label><select id="asc" class="field"><option value="">Everything</option>' + topics.map(function (t) { return '<option value="' + t.id + '">' + t.name + "</option>"; }).join("") + '</select><button class="btn" id="st">Start ' + ICON.arrow + '</button></div><p class="muted" style="margin-top:14px;font-size:14px">Personal best: <b style="color:var(--text)">' + P().arcade + "</b></p></div>";
    $("#st").onclick = function () { var id = $("#asc").value; runSpeed(id ? vLevels(G.topics.filter(function (t) { return t.id === id; })[0]) : allV()); };
  }
  function runSpeed(ls) {
    rank0 = rank().i;
    app.innerHTML = '<div class="session speed"><div class="statusbar"><div><div class="qlabel" style="margin-bottom:8px"><span>Speed round</span><span id="at"></span></div><div class="timer" id="tm"><i></i></div></div><div class="meta"><span class="pips" id="ah"></span><span class="streak" id="ac"></span><span id="as"></span></div></div><div class="qcard" id="qb"></div></div>';
    var lives = 3, score = 0, combo = 0, timeLeft = 90, cur = null, over = false, lock = false, answered = 0, right = 0, iv;
    function hud() {
      $("#ah").innerHTML = '<span style="margin-right:6px">Strikes left</span>' + livesHtml(lives, 3); $("#ac").innerHTML = combo > 1 ? ICON.flame + "×" + Math.min(combo, 5) : ""; $("#as").innerHTML = "<b>" + score + "</b> pts";
      $("#at").textContent = Math.max(0, Math.ceil(timeLeft)) + "s"; var tm = $("#tm"); tm.classList.toggle("low", timeLeft <= 15); $("i", tm).style.width = Math.max(0, timeLeft / 90 * 100) + "%";
    }
    function spawn() {
      cur = arcadeQ(ls); if (!cur) { end(); return; } lock = false;
      $("#qb").className = "qcard"; $("#qb").innerHTML = '<div class="qlabel"><span>Multiple choice</span></div><p class="prompt">' + cur.p + '</p><div class="choices">' + cur.opts.map(function (o, i) { return '<button class="choice" data-i="' + i + '"><span class="kb">' + (i + 1) + "</span><span>" + o.t + "</span></button>"; }).join("") + "</div>";
      $$(".choice", $("#qb")).forEach(function (b) { b.onclick = function () { pick(+b.dataset.i); }; });
    }
    function pick(i) {
      if (lock || over || !cur || !cur.opts[i]) return; lock = true; answered++;
      var ok = !!cur.opts[i].ok, p = P(), st = p.stats[cur.tid] = p.stats[cur.tid] || { a: 0, c: 0 }; st.a++;
      $$(".choice", $("#qb")).forEach(function (b, j) { b.disabled = true; if (cur.opts[j].ok) b.classList.add("right"); else if (j === i) b.classList.add("wrong"); });
      var card = $("#qb"); card.classList.add(ok ? "flash-ok" : "flash-no");
      if (ok) { right++; st.c++; combo++; var g = 10 * Math.min(combo, 5); score += g; addXP(Math.ceil(g / 2)); sndGood(); hud(); setTimeout(spawn, 380); }
      else { combo = 0; lives--; sndBad(); hud(); if (cur.why) card.insertAdjacentHTML("beforeend", '<div class="feedback no"><p><b>' + ICON.cross + "Not quite</b>" + cur.why + "</p></div>"); if (lives <= 0) setTimeout(end, 1400); else setTimeout(spawn, 1400); }
    }
    function end() {
      if (over) return; over = true; clearInterval(iv); detach();
      var p = P(), best = score > p.arcade; if (best) p.arcade = score; save(); sndWin(); checkBadges();
      app.innerHTML = '<div class="card result">' + levelUpHtml() + "<h1>" + (best ? "New personal best" : "Round over") + '</h1><p class="sub">' + (lives <= 0 ? "You ran out of strikes." : "Time's up.") + '</p><div class="breakdown"><div><b>' + score + "</b><span>Score</span></div><div><b>" + right + "/" + answered + "</b><span>Correct</span></div><div><b>" + pct(right, answered) + "%</b><span>Accuracy</span></div><div><b>" + p.arcade + '</b><span>Best</span></div></div><div class="row" style="justify-content:center"><button class="btn" id="ag">Play again</button><a class="btn alt" href="#/">Back to dashboard</a></div></div>';
      $("#ag").onclick = function () { runSpeed(ls); };
    }
    attach(function (e) { var n = +e.key; if (n >= 1 && n <= 4) pick(n - 1); });
    G._stop = function () { over = true; clearInterval(iv); };
    hud(); spawn(); iv = setInterval(function () { if (over) return; timeLeft -= .25; if (timeLeft <= 0) { timeLeft = 0; hud(); end(); } else hud(); }, 250);
  }

  /* ---------- mock exam ---------- */
  function viewMock() {
    shell("mock");
    var topics = vTopics(), best = P().mocks.reduce(function (m, x) { return Math.max(m, x.pct); }, 0), sel = 1;
    var presets = [[10, 10, "Quick check", "10 questions · 10 minutes"], [20, 20, "Half paper", "20 questions · 20 minutes"], [40, 40, "Full mock", "40 questions · 40 minutes"]];
    app.innerHTML = pageHead(null, "Mock exam", "Exam conditions: a countdown clock, no feedback while you work, and a full marked report with a topic breakdown at the end. Use it to find what to revise next.") +
      '<div class="card" style="max-width:760px"><h3 style="font-size:16px">Choose a length</h3><div class="presets">' + presets.map(function (p, i) { return '<button class="preset ' + (i === sel ? "on" : "") + '" data-i="' + i + '"><b>' + p[2] + "</b><span>" + p[3] + "</span></button>"; }).join("") +
      '</div><div class="row"><label for="msc" style="font-weight:700">Topic</label><select id="msc" class="field"><option value="">Whole course</option>' + topics.map(function (t) { return '<option value="' + t.id + '">' + t.name + "</option>"; }).join("") + '</select><button class="btn" id="go">Start the exam ' + ICON.arrow + "</button></div>" +
      '<p class="muted" style="margin-top:14px;font-size:14px">' + (P().mocks.length ? "Attempts so far: " + P().mocks.length + " · best score " + best + "%." : "No attempts yet.") + " Questions are retrieval practice drawn from the specification, not full past papers.</p></div>";
    $$(".preset").forEach(function (b) { b.onclick = function () { sel = +b.dataset.i; $$(".preset").forEach(function (x) { x.classList.toggle("on", x === b); }); }; });
    $("#go").onclick = function () { var id = $("#msc").value, ls = id ? vLevels(G.topics.filter(function (t) { return t.id === id; })[0]) : allV(); runMock(ls, presets[sel][0], presets[sel][1], id ? G.topics.filter(function (t) { return t.id === id; })[0].name : "Whole course"); };
  }
  function runMock(ls, n, mins, scope) {
    rank0 = rank().i;
    var qs = poolFrom(ls, n), N = qs.length, i = 0, left = mins * 60, log = [], over = false, iv, t0 = Date.now();
    app.innerHTML = '<div class="session"><div class="statusbar"><div><div class="qlabel" style="margin-bottom:8px"><span>Mock exam · ' + scope + '</span><span id="qn"></span></div><div id="pgwrap"></div></div><div class="meta"><span class="clock" id="ck"></span></div></div><div class="qcard" id="qb"></div></div>';
    function hud() { $("#qn").textContent = "Question " + Math.min(i + 1, N) + " of " + N; $("#pgwrap").innerHTML = track(i / N * 100); var m = Math.floor(left / 60), s = left % 60, ck = $("#ck"); ck.textContent = m + ":" + pad2(s) + " remaining"; ck.classList.toggle("low", left <= 60); }
    function next() {
      if (over) return; if (i >= N) return end();
      hud(); var q = qs[i];
      askQuestion(q.raw, $("#qb"), function (ok, why, cont, meta) {
        if (over) return; var tid = G.levels[q.levelId].topic;
        log.push({ ok: ok, tid: tid.id, tname: tid.name, prompt: meta.prompt, correct: meta.correct, why: meta.why });
        i++; cont(next);
      }, true);
    }
    function end() {
      if (over) return; over = true; clearInterval(iv); detach(); G._stop = null;
      var used = Math.round((Date.now() - t0) / 1000), p = P(), okc = log.filter(function (x) { return x.ok; }).length, score = pct(okc, N);
      var byTopic = {}; log.forEach(function (x) { var b = byTopic[x.tid] || (byTopic[x.tid] = { n: x.tname, a: 0, c: 0 }); b.a++; if (x.ok) b.c++; var st = p.stats[x.tid] = p.stats[x.tid] || { a: 0, c: 0 }; st.a++; if (x.ok) st.c++; });
      for (var j = log.length; j < N; j++) { var tt = G.levels[qs[j].levelId].topic; var bb = byTopic[tt.id] || (byTopic[tt.id] = { n: tt.name, a: 0, c: 0 }); bb.a++; log.push({ ok: false, skipped: true, tname: tt.name, prompt: normal(qs[j].raw)[1], correct: "", why: "" }); }
      p.mocks.push({ d: Date.now(), pct: score, n: N, scope: scope, secs: used }); if (p.mocks.length > 12) p.mocks.shift();
      addXP(okc * 5 + 40); save(); sndWin(); checkBadges();
      var g = band(score), rows = Object.keys(byTopic).map(function (k) { return byTopic[k]; }).sort(function (a, b) { return a.c / a.a - b.c / b.a; });
      var bad = log.filter(function (x) { return !x.ok; });
      app.innerHTML = '<div class="card result" style="max-width:760px">' + levelUpHtml() + ring(score, 124, 11) + "<h1>" + okc + " out of " + N + '</h1><p class="sub">' + bandText(g) + " (indicative only). Real grade boundaries change each year, so use this as a guide to what to revise.</p>" +
        '<div class="breakdown"><div><b>' + score + "%</b><span>Score</span></div><div><b>" + Math.floor(used / 60) + ":" + pad2(used % 60) + "</b><span>Time used</span></div><div><b>" + (okc * 5 + 40) + "</b><span>" + UNIT + " earned</span></div></div>" +
        '<div style="text-align:left"><h3 style="font-size:15px;margin-bottom:6px">Topic breakdown</h3><table class="eq"><tbody>' + rows.map(function (r) { return "<tr><td>" + r.n + '</td><td style="width:90px;text-align:right" class="formula">' + r.c + " / " + r.a + "</td></tr>"; }).join("") + "</tbody></table>" +
        (bad.length ? '<h3 style="font-size:15px;margin:6px 0 4px">Questions to review (' + bad.length + ')</h3><div class="review">' + bad.map(function (x) { return '<div class="it bad"><small>' + x.tname + (x.skipped ? " · not reached" : "") + "</small><p>" + x.prompt + "</p>" + (x.correct ? '<p class="ans">Answer: ' + x.correct + "</p>" : "") + (x.why ? '<p class="muted">' + x.why + "</p>" : "") + "</div>"; }).join("") + "</div>" : '<p class="note">Full marks. Impressive.</p>') + "</div>" +
        '<div class="row" style="justify-content:center;margin-top:22px"><button class="btn" id="ag">Another mock</button><a class="btn alt" href="#/progress">View progress</a></div></div>';
      $("#ag").onclick = function () { go("#/mock"); route(); }; window.scrollTo(0, 0);
    }
    G._stop = function () { over = true; clearInterval(iv); };
    iv = setInterval(function () { if (over) return; left--; if (left <= 0) { left = 0; hud(); end(); } else { var m = Math.floor(left / 60), s = left % 60, ck = $("#ck"); if (ck) { ck.textContent = m + ":" + pad2(s) + " remaining"; ck.classList.toggle("low", left <= 60); } } }, 1000);
    next();
  }

  /* ---------- progress ---------- */
  function viewProgress() {
    shell("progress");
    var p = P(), o = overall(), ts = vTopics(), ready = o.a >= 25 ? Math.round(o.acc * (.35 + .65 * o.coverage) * 100) : null;
    var weak = ts.map(function (t) { return { t: t, s: topicStats(t) }; }).filter(function (x) { return x.s.a >= 5 && x.s.acc < 75; }).sort(function (a, b) { return a.s.acc - b.s.acc; }).slice(0, 3);
    var fresh = ts.map(function (t) { return { t: t, s: topicStats(t) }; }).filter(function (x) { return x.s.started === 0; }).slice(0, 3);
    var head = '<div class="hero"><div><div class="eyebrow">Readiness</div><h2>' + (ready === null ? "Not enough data yet" : bandText(band(ready))) + "</h2><p>" + (ready === null ? "Answer at least 25 questions and this panel will estimate where you are working. It combines how much of the course you have covered with how accurate you are." : "An indicative estimate from your accuracy (" + Math.round(o.acc * 100) + "%) and how much of the course you have started (" + Math.round(o.coverage * 100) + "%). It is a guide, not a prediction.") + "</p></div>" + ring(ready === null ? 0 : ready, 100, 10, ready === null ? "–" : ready + "%") + "</div>";
    var focus = "";
    if (weak.length || fresh.length) focus = '<h2 class="sec">Where to focus next</h2><div class="quick">' + weak.map(function (x) { return '<a class="qlink" href="#/t/' + x.t.id + '"><div class="ic">' + ICON.target + "</div><div><b>" + x.t.name + "</b><span>" + Math.round(x.s.acc) + "% accuracy. Revisit the lessons and retry.</span></div></a>"; }).join("") + fresh.map(function (x) { return '<a class="qlink" href="#/t/' + x.t.id + '"><div class="ic">' + ICON.book + "</div><div><b>" + x.t.name + "</b><span>Not started yet.</span></div></a>"; }).join("") + "</div>";
    var table = '<h2 class="sec">Topic mastery</h2><div class="card"><div class="heat"><div class="heatrow hd"><span>Topic</span><span class="track-h">Mastery</span><span class="v">Units</span><span class="v">Accuracy</span></div>' + ts.map(function (t) { var s = topicStats(t); return '<div class="heatrow"><a href="#/t/' + t.id + '">' + t.name + "</a>" + track(s.mastery, s.mastery >= 99 ? "good" : "") + '<span class="v">' + s.started + "/" + s.units + '</span><span class="v">' + (s.acc === null ? "–" : Math.round(s.acc) + "%") + "</span></div>"; }).join("") + "</div></div>";
    var mocks = p.mocks.slice(-8), hist = mocks.length ? '<h2 class="sec">Mock exam history</h2><div class="card"><div class="spark" role="img" aria-label="Mock exam scores">' + mocks.map(function (m) { return '<div style="height:' + Math.max(4, m.pct) + '%" title="' + new Date(m.d).toLocaleDateString() + ": " + m.pct + '%"><span>' + m.pct + "</span></div>"; }).join("") + '</div><p class="muted" style="font-size:13px;margin-top:8px">Most recent on the right. Latest: ' + mocks[mocks.length - 1].pct + "% on " + mocks[mocks.length - 1].scope + ".</p></div>" : "";
    var bd = '<h2 class="sec">Achievements <small>' + Object.keys(S.badges).length + " of " + BADGES.length + '</small></h2><div class="badges">' + BADGES.map(function (b) { return '<div class="bdg ' + (S.badges[b.id] ? "got" : "") + '"><div class="ic">' + ICON[b.icon] + "</div><div><b>" + b.name + "</b><span>" + b.desc + "</span></div></div>"; }).join("") + "</div>";
    app.innerHTML = pageHead(null, "Progress", "How your revision is going in " + G.cfg.subject + ".") + head + focus + table + hist + bd;
  }

  /* ---------- reference pages ---------- */
  function viewLabs() {
    shell("labs");
    app.innerHTML = pageHead(null, "Labs", G.cfg.labsIntro) + '<div class="grid g2">' + G.labs.map(function (l, i) { return '<a class="tcard" href="#/lab/' + l.id + '"><div class="hd"><span class="num">' + pad2(i + 1) + "</span><div><h3>" + l.name + "</h3></div></div><p>" + l.desc + "</p></a>"; }).join("") + "</div>";
  }
  function viewLab(id) {
    shell("labs");
    var l = G.labs.filter(function (x) { return x.id === id; })[0]; if (!l) return go("#/labs");
    app.innerHTML = pageHead([["Labs", "#/labs"], [l.name]], l.name, "") + '<div class="card labbox" id="lab"></div>';
    var api = {
      award: function (n, msg) { addXP(n); sndGood(); var g = $(".goal", app); if (g && msg) g.innerHTML = msg + " +" + n + " " + UNIT; },
      ri: G.ri, pick: G.pick, fmt: fmt,
      slider: function (host, label, min, max, step, val, unit, fn) {
        var d = document.createElement("div"); d.className = "slider"; var id2 = "s" + Math.random().toString(36).slice(2);
        d.innerHTML = '<label for="' + id2 + '">' + label + '</label><input id="' + id2 + '" type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"><span></span>';
        host.appendChild(d); var inp = $("input", d), sp = $("span", d), f = function () { sp.textContent = inp.value + (unit ? " " + unit : ""); fn(parseFloat(inp.value)); };
        inp.oninput = f; sp.textContent = val + (unit ? " " + unit : ""); return { input: inp, set: function (v) { inp.value = v; f(); } };
      }
    };
    l.run($("#lab"), api);
  }
  function viewSheet() {
    shell("sheet");
    app.innerHTML = pageHead(null, G.cfg.sheetName, "") + '<div class="card">' + (G.cfg.sheetNote ? '<div class="note">' + G.cfg.sheetNote + "</div>" : "") +
      G.sheet.map(function (g) { return '<h2 style="font-size:17px;margin:16px 0 4px">' + g.h + '</h2><table class="eq"><tbody>' + g.rows.map(function (r) { return '<tr><td style="width:38%">' + r[0] + '</td><td class="formula">' + r[1] + "</td>" + (r[2] ? '<td class="muted" style="font-size:14px">' + r[2] + "</td>" : "<td></td>") + "</tr>"; }).join("") + "</tbody></table>"; }).join("") + "</div>";
  }
  function viewTricks() {
    shell("tricks");
    var p = P(), found = 0, tot = 0;
    var body = vTopics().map(function (t) {
      return '<h2 class="sec">' + t.name + '</h2><div class="album">' + vLevels(t).map(function (l) {
        tot++; var has = p.read[l.id]; if (has) found++;
        return has ? '<div class="sticker"><b>' + l.t + "</b><span>" + l.k + "</span></div>" : '<a class="sticker locked" href="#/l/' + l.id + '"><b>' + l.t + "</b><span>Read this lesson to unlock</span></a>";
      }).join("") + "</div>";
    }).join("");
    app.innerHTML = pageHead(null, "Memory hooks", "Every mnemonic and memory trick you unlock is collected here for quick last-minute revision. Unlocked: " + found + " of " + tot + ".") + body;
  }
  function viewSettings() {
    shell("settings");
    var st = S.settings, sci = G.cfg.key !== "maths", radio = function (name, val, text) { return '<label class="radio"><input type="radio" name="' + name + '" value="' + val + '" ' + (String(st[name]) === String(val) ? "checked" : "") + "> <span>" + text + "</span></label>"; };
    app.innerHTML = pageHead(null, "Settings", "Settings apply to every subject.") + '<div style="max-width:720px">' +
      "<fieldset><legend>Exam tier</legend>" + radio("tier", "H", "Higher (grades 4 to 9): shows everything") + radio("tier", "F", "Foundation (grades 1 to 5): hides Higher-only units") + "</fieldset>" +
      (sci ? "<fieldset><legend>Science course</legend>" + radio("course", "S", "Separate science (Biology, Chemistry and Physics GCSEs)") + radio("course", "C", "Combined Science: hides separate-only units") + "</fieldset>" : "") +
      "<fieldset><legend>Appearance</legend>" + radio("theme", "auto", "Match my device") + radio("theme", "dark", "Dark") + radio("theme", "light", "Light") + "</fieldset>" +
      '<fieldset><legend>Study plan</legend><div class="row"><label for="goal" style="font-weight:600">Daily goal</label><select id="goal" class="field">' + [50, 100, 200, 300, 500].map(function (g) { return '<option value="' + g + '"' + (st.goal === g ? " selected" : "") + ">" + g + " " + UNIT + "</option>"; }).join("") + '</select><label for="exam" style="font-weight:600;margin-left:12px">First exam date</label><input type="date" id="exam" class="field" style="font-family:var(--ui);font-size:15px;width:auto" value="' + (st.examDate || "") + '"></div></fieldset>' +
      '<fieldset><legend>Sound</legend><label class="radio"><input type="checkbox" id="snd" ' + (st.sound ? "checked" : "") + "> <span>Sound effects</span></label></fieldset>" +
      '<fieldset><legend>Move your progress</legend><p class="muted" style="margin:0 0 8px;font-size:14px">Progress saves in this browser. To move it to another device or browser, copy this code, then paste it there and choose Load.</p><textarea id="code" aria-label="Progress code">' + btoa(unescape(encodeURIComponent(JSON.stringify(S)))) + '</textarea><div class="row" style="margin-top:10px"><button class="btn small" id="imp">Load code</button><span id="msg" style="font-weight:600"></span></div></fieldset>' +
      '<fieldset><legend>Start over</legend><button class="btn alt small" id="rs">Reset ' + G.cfg.subject + " progress</button></fieldset></div>";
    $$("input[type=radio]", app).forEach(function (r) { r.onchange = function () { st[r.name] = r.name === "goal" ? +r.value : r.value; save(); if (r.name === "theme") applyTheme(); refreshSide(); }; });
    $("#snd").onchange = function () { st.sound = this.checked; save(); };
    $("#goal").onchange = function () { st.goal = +this.value; save(); };
    $("#exam").onchange = function () { st.examDate = this.value; save(); };
    $("#imp").onclick = function () { try { var o = JSON.parse(decodeURIComponent(escape(atob($("#code").value.trim())))); if (!o.subj) throw 0; S = normalise(o); save(); applyTheme(); $("#msg").textContent = "Progress loaded"; shell("settings"); } catch (e) { $("#msg").textContent = "That code isn't valid. Copy the whole code and try again."; } };
    var armed = false; $("#rs").onclick = function () { if (!armed) { armed = true; this.textContent = "Click again to confirm the reset"; return; } delete S.subj[G.cfg.key]; save(); go("#/"); };
  }

  /* router */
  function go(h) { location.hash = h; }
  function route() {
    detach(); if (G._stop) { G._stop(); G._stop = null; }
    var h = location.hash.replace(/^#/, "") || "/", m;
    app.innerHTML = "";
    if (h === "/") viewDash();
    else if ((m = h.match(/^\/t\/(.+)/))) viewTopic(m[1]);
    else if ((m = h.match(/^\/l\/(.+)/))) viewLevel(m[1]);
    else if ((m = h.match(/^\/(?:test|boss)\/(.+)/))) viewTest(m[1]);
    else if (h === "/final") viewFinal();
    else if (h === "/daily") viewDaily();
    else if (h === "/review" || h === "/gym") viewGym();
    else if (h === "/speed" || h === "/arcade") viewSpeed();
    else if (h === "/mock") viewMock();
    else if (h === "/progress") viewProgress();
    else if (h === "/labs") viewLabs();
    else if ((m = h.match(/^\/lab\/(.+)/))) viewLab(m[1]);
    else if (h === "/sheet") viewSheet();
    else if (h === "/hooks" || h === "/tricks") viewTricks();
    else if (h === "/settings") viewSettings();
    else viewDash();
  }
  G.start = function () {
    applyTheme();
    document.body.dataset.world = G.cfg.key;
    document.title = "GCSE " + G.cfg.subject + " | GCSE Quest";
    document.body.innerHTML = '<div class="shell"><aside class="sidebar" id="bar"></aside><main class="main"><div class="wrap" id="app"></div></main></div><div id="toasts" aria-live="polite"></div>';
    app = $("#app");
    window.addEventListener("hashchange", route);
    route();
  };
  /* used by automated tests */
  G._test = { ask: askQuestion, normal: normal, parseNum: parseNum, state: function () { return S; }, visible: visible, band: band, route: route };
})();
