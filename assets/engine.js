/* GCSE Quest engine v2. No dependencies; runs from a local folder. Content lives in /data. */
(function () {
  "use strict";
  var KEY = "gcsequest.v1", memStore = null;
  var MASTERY = ["Not started", "Developing", "Secure", "Mastered"];
  var CHEERS = ["Correct!", "Brilliant!", "Nailed it!", "You got it!", "Spot on!", "Great recall!", "Easy work!"];
  var BOSSES = ["Exam Gremlin", "Cramming Fiend", "Doubt Dragon", "Procrastinator Prime", "Mock Menace", "Panic Beast", "Blank-Mind Blob", "Revision Wraith"];
  var NODE_ICONS = ["star", "book", "bolt", "target"];

  function blank() { return { settings: { tier: "H", course: "S", sound: true, theme: "auto", examDate: "", goal: 100 }, subj: {}, streak: { last: null, days: 0 }, daily: { d: null, xp: 0 }, badges: {}, look: { color: "blue", acc: "none" }, quests: { d: null, items: [] } }; }
  function normalise(s) {
    var b = blank(); s = s && typeof s === "object" ? s : {};
    s.settings = Object.assign(b.settings, s.settings || {}); s.subj = s.subj || {}; s.streak = s.streak || b.streak; s.daily = s.daily || b.daily; s.badges = s.badges || {}; s.look = Object.assign(b.look, s.look || {}); s.quests = s.quests || b.quests;
    return s;
  }
  function load() { try { var s = localStorage.getItem(KEY); if (s) return normalise(JSON.parse(s)); } catch (e) {} return normalise(memStore); }
  var S = load();
  function save() { memStore = S; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function applyTheme() { var r = document.documentElement; if (S.settings.theme === "light" || S.settings.theme === "dark") r.setAttribute("data-theme", S.settings.theme); else r.removeAttribute("data-theme"); }

  var G = window.GAME = { topics: [], labs: [], diagrams: {}, sheet: [], cfg: null, levels: {}, explainers: {}, _more: [], exams: [], workedEx: [], _media: [], extraScenes: {}, cases: [] };
  G.configure = function (c) { G.cfg = c; };
  G.diagram = function (o) { for (var k in o) G.diagrams[k] = o[k]; };
  G.lab = function (l) { G.labs.push(l); };
  G.explain = function (o) { for (var k in o) G.explainers[slug(k)] = o[k]; };
  G.more = function (o) { G._more.push(o); };
  G.media = function (o) { G._media.push(o); };
  G.explainMore = function (o) { for (var k in o) G.extraScenes[slug(k)] = (G.extraScenes[slug(k)] || []).concat(o[k]); };
  G.howto = function (a) { G.cases = G.cases.concat(a); };
  G.exam = function (a) { G.exams = G.exams.concat(a); };
  G.worked = function (a) { G.workedEx = G.workedEx.concat(a); };
  function slug(s) { return s.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  G.topic = function (name, icon, paper, levels, opts) {
    var id = slug(name), meta = (G.cfg && G.cfg.topics && G.cfg.topics[name]) || [];
    var t = { id: id, name: meta[0] || name, icon: icon, paper: paper, levels: levels, s: opts && opts.s, blurb: meta[1] || (opts && opts.blurb) || "" };
    levels.forEach(function (l) { l.id = t.id + "--" + slug(l.t); l.topic = t; if (G.levels[l.id]) console.error("Duplicate level id", l.id); G.levels[l.id] = l; });
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
    p.arcade = p.arcade || 0; p.finalBest = p.finalBest || 0; p.stats = p.stats || {}; p.mocks = p.mocks || []; p.exam = p.exam || {}; p.cases = p.cases || {};
    return p;
  }
  G.ri = function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); };
  G.pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
  G.shuf = shuffle;
  G.gcd = function (a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a; };
  var UNIT = "XP";
  function pad2(n) { return n < 10 ? "0" + n : "" + n; }
  function pct(a, b) { return b ? Math.round(a / b * 100) : 0; }
  function hashStr(s) { var h = 3; for (var i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) >>> 0; return h; }
  function tiered() { return !G.cfg || G.cfg.tiered !== false; }
  function sciCourse() { return !!G.cfg && ["physics", "chemistry", "biology"].indexOf(G.cfg.key) >= 0; }
  function visible(l) { return !(l.h && S.settings.tier === "F") && !(l.s && S.settings.course === "C"); }
  function vLevels(t) { return t.levels.filter(visible); }
  function vTopics() { return G.topics.filter(function (t) { return vLevels(t).length; }); }
  function allV() { var r = []; G.topics.forEach(function (t) { r = r.concat(vLevels(t)); }); return r; }
  function tags(l) { return (l.h ? '<span class="tag h">Higher only</span>' : "") + (l.s ? '<span class="tag s">Separate science</span>' : "") + (l.rp ? '<span class="tag r">Required practical</span>' : ""); }
  function ic(n) { return ICON[n] || ""; }

  /* ---------- sound ---------- */
  var ac = null;
  function beep(f, d, type, vol, when) {
    if (!S.settings.sound) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)(); var t = ac.currentTime + (when || 0), o = ac.createOscillator(), g = ac.createGain();
      o.type = type || "sine"; o.frequency.value = f; g.gain.setValueAtTime(vol || .06, t); g.gain.exponentialRampToValueAtTime(.001, t + d);
      o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + d);
    } catch (e) {}
  }
  function sndGood(c) { var b = 523 * Math.pow(1.0595, Math.min(c || 0, 8) * 2); beep(b, .12, "triangle"); beep(b * 1.25, .12, "triangle", .06, .09); beep(b * 1.5, .18, "triangle", .06, .18); }
  function sndBad() { beep(220, .18, "sawtooth", .04); beep(160, .3, "sawtooth", .04, .12); }
  function sndTap() { beep(480, .05, "sine", .04); }
  function sndWin() { [523, 659, 784, 1047, 1319].forEach(function (f, i) { beep(f, .22, "triangle", .06, i * .11); }); }
  function sndLevel() { [392, 523, 659, 784, 1047, 1319, 1568].forEach(function (f, i) { beep(f, .3, "square", .035, i * .09); }); }

  /* ---------- progress model ---------- */
  function gxp() { var t = 0; for (var k in S.subj) t += S.subj[k].xp || 0; return t; }
  function lvl(x) { x = x == null ? gxp() : x; var i = 0; for (var k = 0; k < LEVELS.length; k++) if (x >= LEVELS[k].xp) i = k; return { i: i, cur: LEVELS[i], nxt: LEVELS[i + 1] || null }; }
  if (S.lvl === undefined) S.lvl = lvl().i;
  function unlocked() { var c = { blue: 1 }, a = { none: 1 }; for (var i = 0; i <= lvl().i; i++) { if (LEVELS[i].color) c[LEVELS[i].color] = i; if (LEVELS[i].acc) a[LEVELS[i].acc] = i; } return { c: c, a: a }; }
  function look() { var u = unlocked(), l = S.look; return { color: u.c[l.color] !== undefined ? l.color : "blue", acc: u.a[l.acc] !== undefined ? l.acc : "none" }; }
  function M(mood, size) { return mascot(look(), mood, size); }
  function dkey(d) { return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function curStreak() { var st = S.streak, d = new Date(); if (st.last === dkey(d) || st.last === dkey(new Date(d - 864e5))) return st.days || 0; return 0; }
  function tickStreak() { var d = new Date(), today = dkey(d), st = S.streak; if (st.last === today) return; st.days = st.last === dkey(new Date(d - 864e5)) ? st.days + 1 : 1; st.last = today; }
  function todayXP() { return S.daily.d === dkey(new Date()) ? S.daily.xp : 0; }
  var pendingLvl = null;
  function addXP(n, noQuest) {
    var p = P(); p.xp += n; tickStreak();
    var k = dkey(new Date()); if (S.daily.d !== k) S.daily = { d: k, xp: 0 }; S.daily.xp += n;
    var L = lvl().i; if (L > S.lvl) { S.lvl = L; pendingLvl = L; }
    if (!noQuest) qtrack("xp", n);
    save(); refreshTop(); checkBadges();
  }
  function gymDue() { var m = P().missed, n = Date.now(), c = 0; for (var k in m) if (m[k].due <= n) c++; return c; }
  function examDays() { var v = S.settings.examDate; if (!v) return null; var d = new Date(v + "T09:00:00"); if (isNaN(d)) return null; var n = Math.ceil((d - new Date()) / 864e5); return n >= 0 ? n : null; }
  function topicStats(t) {
    var p = P(), ls = vLevels(t), st = p.stats[t.id] || { a: 0, c: 0 }, stars = 0, started = 0;
    ls.forEach(function (l) { var s = p.stars[l.id] || 0; stars += s; if (s) started++; });
    return { units: ls.length, started: started, mastered: ls.filter(function (l) { return p.stars[l.id] === 3; }).length, mastery: ls.length ? stars / (ls.length * 3) * 100 : 0, a: st.a, c: st.c, acc: st.a ? st.c / st.a * 100 : null };
  }
  function overall() {
    var tot = { units: 0, started: 0, mastered: 0, a: 0, c: 0 };
    vTopics().forEach(function (t) { var s = topicStats(t); tot.units += s.units; tot.started += s.started; tot.mastered += s.mastered; tot.a += s.a; tot.c += s.c; });
    tot.coverage = tot.units ? tot.started / tot.units : 0; tot.acc = tot.a ? tot.c / tot.a : 0; return tot;
  }
  function band(p) {
    var F = tiered() && S.settings.tier === "F", T = F ? [[80, "5"], [65, "4"], [50, "3"], [35, "2"], [20, "1"]] : [[85, "9"], [76, "8"], [66, "7"], [56, "6"], [46, "5"], [36, "4"], [26, "3"], [16, "2"]];
    for (var i = 0; i < T.length; i++) if (p >= T[i][0]) return T[i][1]; return "U";
  }
  function bandText(g) { return g === "U" ? "Below grade " + (tiered() && S.settings.tier === "F" ? "1" : "2") : "Around grade " + g; }

  /* ---------- daily quests ---------- */
  var QDEF = [
    { id: "xp", t: function (n) { return "Earn " + n + " XP"; }, g: [60, 100, 150], r: 20, icon: "bolt" },
    { id: "correct", t: function (n) { return "Answer " + n + " questions correctly"; }, g: [12, 20, 30], r: 25, icon: "check" },
    { id: "unit", t: function (n) { return n === 1 ? "Complete a unit" : "Complete " + n + " units"; }, g: [1, 2], r: 30, icon: "book" },
    { id: "combo", t: function (n) { return "Reach a ×" + n + " combo"; }, g: [3, 4, 5], r: 20, icon: "flame" },
    { id: "speed", t: function () { return "Play a speed round"; }, g: [1], r: 20, icon: "speed" },
    { id: "review", t: function (n) { return "Get " + n + " review questions right"; }, g: [4, 6], r: 20, icon: "review" }
  ];
  function ensureQuests() {
    var k = dkey(new Date()); if (S.quests.d === k && S.quests.items.length) return;
    var h = hashStr(k), pool = QDEF.slice(), items = [];
    for (var i = 0; i < 3; i++) { var j = (h >>> (i * 3)) % pool.length, d = pool.splice(j, 1)[0]; items.push({ id: d.id, goal: d.g[(h >>> (i + 5)) % d.g.length], prog: 0, done: false }); }
    S.quests = { d: k, items: items }; save();
  }
  function qtrack(id, n, max) {
    ensureQuests();
    S.quests.items.forEach(function (q) {
      if (q.id !== id || q.done) return; q.prog = max ? Math.max(q.prog, n) : Math.min(q.goal, q.prog + n);
      if (q.prog >= q.goal) { q.prog = q.goal; q.done = true; var d = QDEF.filter(function (x) { return x.id === id; })[0]; setTimeout(function () { toast("trophy", "Quest complete: " + d.t(q.goal), "+" + d.r + " " + UNIT + " bonus"); addXP(d.r, true); }, 400); }
    });
  }

  /* ---------- badges and toasts ---------- */
  var BADGES = [
    { id: "first", name: "First lesson", desc: "Read your first lesson.", icon: "book", t: function (a) { return a.read >= 1; } },
    { id: "q100", name: "Century", desc: "Answer 100 questions.", icon: "target", t: function (a) { return a.attempts >= 100; } },
    { id: "q500", name: "Heavy practice", desc: "Answer 500 questions.", icon: "target", t: function (a) { return a.attempts >= 500; } },
    { id: "gold", name: "Flawless unit", desc: "Master a unit with no slips.", icon: "star", t: function (a) { return a.mastered >= 1; } },
    { id: "m10", name: "Ten mastered", desc: "Master ten units.", icon: "trophy", t: function (a) { return a.mastered >= 10; } },
    { id: "s3", name: "Three in a row", desc: "Revise on three days running.", icon: "flame", t: function (a) { return a.streak >= 3; } },
    { id: "s7", name: "Week streak", desc: "Revise on seven days running.", icon: "flame", t: function (a) { return a.streak >= 7; } },
    { id: "boss", name: "Gremlin slayer", desc: "Defeat a topic boss.", icon: "trophy", t: function (a) { return a.tests >= 1; } },
    { id: "mock", name: "Exam conditions", desc: "Complete a mock exam.", icon: "mock", t: function (a) { return a.mocks >= 1; } },
    { id: "mock80", name: "Mock 80%+", desc: "Score 80% or more in a mock.", icon: "mock", t: function (a) { return a.best >= 80; } },
    { id: "speed", name: "Quick thinker", desc: "Score 200 in a speed round.", icon: "speed", t: function (a) { return a.speed >= 200; } },
    { id: "combo", name: "On fire", desc: "Reach a ×5 combo.", icon: "flame", t: function (a) { return a.combo >= 5; } }
  ];
  function totals() {
    var a = { read: 0, attempts: 0, mastered: 0, streak: curStreak(), tests: 0, mocks: 0, best: 0, speed: 0, combo: S.bestCombo || 0 };
    Object.keys(S.subj).forEach(function (k) {
      var p = S.subj[k]; a.read += Object.keys(p.read || {}).length; a.tests += Object.keys(p.bossDone || {}).length; a.speed = Math.max(a.speed, p.arcade || 0);
      Object.keys(p.stars || {}).forEach(function (id) { if (p.stars[id] === 3) a.mastered++; });
      Object.keys(p.stats || {}).forEach(function (t) { a.attempts += p.stats[t].a; });
      (p.mocks || []).forEach(function (m) { a.mocks++; a.best = Math.max(a.best, m.pct); });
    });
    return a;
  }
  function checkBadges() { var a = totals(); BADGES.forEach(function (b) { if (!S.badges[b.id] && b.t(a)) { S.badges[b.id] = Date.now(); save(); toast(b.icon, "Achievement: " + b.name, b.desc); } }); }
  var toastQ = [], toasting = false;
  function toast(icon, title, sub) { toastQ.push([icon, title, sub]); nextToast(); }
  function nextToast() {
    if (toasting || !toastQ.length || !$("#toasts")) return; toasting = true; var t = toastQ.shift();
    $("#toasts").innerHTML = '<div class="toast" role="status">' + ic(t[0]) + "<div><b>" + t[1] + "</b><span>" + t[2] + "</span></div></div>"; sndTap();
    setTimeout(function () { var h = $("#toasts"); if (h) h.innerHTML = ""; toasting = false; nextToast(); }, 3200);
  }
  function popXP(txt) { var e = document.createElement("div"); e.className = "xppop"; e.textContent = txt; document.body.appendChild(e); setTimeout(function () { e.remove(); }, 1000); }

  /* ---------- shell ---------- */
  var app;
  function ring(p, size, stroke, label) {
    var r = (size - stroke) / 2, c = 2 * Math.PI * r, off = c * (1 - Math.max(0, Math.min(100, p)) / 100), m = size / 2;
    return `<div class="ring" style="width:${size}px;height:${size}px;font-size:${Math.round(size * .27)}px"><svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true"><circle class="bg" cx="${m}" cy="${m}" r="${r}" fill="none" stroke-width="${stroke}"/><circle class="fg" cx="${m}" cy="${m}" r="${r}" fill="none" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}"/></svg><b>${label !== undefined ? label : Math.round(p) + "%"}</b></div>`;
  }
  function bar_(p, cls) { return `<div class="track ${cls || ""}" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(p)}"><i style="width:${Math.max(0, Math.min(100, p))}%"></i></div>`; }
  function refreshTop() {
    var el = $("#topbar"); if (!el || !G.cfg) return;
    var L = lvl(), x = gxp(), st = curStreak(), tx = todayXP(), goal = S.settings.goal || 100;
    el.innerHTML = `<div class="tpill streak ${st ? "lit" : ""}" title="Revision streak">${ic("flame")}<b>${st}</b></div>
      <div class="tpill goal" title="Today's XP goal">${ic("target")}<b>${Math.min(tx, goal)}</b><span>/ ${goal}</span></div>
      <a class="tpill xpp" href="#/locker" title="${L.cur.n}: ${x.toLocaleString()} XP total">${ic("bolt")}<b>${x.toLocaleString()}</b></a>
      <a class="avatar" href="#/locker" aria-label="Level ${L.i + 1}, ${L.cur.n}. Customise your buddy">${M("idle", 46)}<span class="lvbadge">${L.i + 1}</span></a>`;
  }
  function shell(active) {
    var c = G.cfg, nav = [["#/", "Learn", "dash", "home"], ["#/map", "Mind map", "map", "map"], ["#/practice", "Practice", "mock", "target"], ["#/exam", "Written exams", "exam", "sheet"], ["#/howto", "How to?", "howto", "hook"], ["#/speed", "Speed round", "speed", "speed"], ["#/review", "Review", "gym", "review"], ["#/labs", "Labs", "labs", "labs"], ["#/toolkit", "Toolkit", "sheet", "sheet"], ["#/progress", "Progress", "progress", "progress"], ["#/locker", "My buddy", "locker", "smile"], ["#/settings", "Settings", "settings", "settings"]];
    $("#bar").innerHTML = `<a class="brand" href="#/"><span class="mark">${SUBJECT_ICON[c.key]}</span><span><b>${c.subject}</b><small>GCSE Quest</small></span></a><nav aria-label="Sections">` +
      nav.filter(function (n) { return (n[2] !== "labs" || G.labs.length) && (n[2] !== "exam" || G.exams.length) && (n[2] !== "howto" || G.cases.length); }).map(function (n) { var due = n[2] === "gym" ? gymDue() : 0; return `<a href="${n[0]}" class="navlink ${active === n[2] ? "on" : ""}" ${active === n[2] ? 'aria-current="page"' : ""}>${ic(n[3])}<span>${n[1]}</span>${due ? `<span class="count">${due}</span>` : ""}</a>`; }).join("") +
      `</nav><div class="sidefoot"><a class="sidelink" href="index.html">${ic("back")}All subjects</a></div>`;
    refreshTop(); window.scrollTo(0, 0);
  }
  function crumbs(parts) { return '<div class="crumbs">' + parts.map(function (p, i) { return (i ? "<i>/</i>" : "") + (p[1] ? `<a href="${p[1]}">${p[0]}</a>` : `<span>${p[0]}</span>`); }).join("") + "</div>"; }
  function pageHead(c, title, lead) { return (c ? crumbs(c) : "") + `<h1 class="title">${title}</h1>` + (lead ? `<p class="lead">${lead}</p>` : ""); }

  /* ---------- home: the path ---------- */
  function nextUnit() { var p = P(), ts = vTopics(); for (var i = 0; i < ts.length; i++) { var ls = vLevels(ts[i]); for (var j = 0; j < ls.length; j++) if (!p.stars[ls[j].id]) return { t: ts[i], l: ls[j] }; } return null; }
  function questsHtml() {
    ensureQuests();
    return S.quests.items.map(function (q) { var d = QDEF.filter(function (x) { return x.id === q.id; })[0]; return `<div class="quest ${q.done ? "done" : ""}"><div class="qi">${ic(q.done ? "check" : d.icon)}</div><div class="qt"><b>${d.t(q.goal)}</b>${bar_(q.prog / q.goal * 100, q.done ? "good" : "")}<span>${q.prog} / ${q.goal} · +${d.r} ${UNIT}</span></div></div>`; }).join("");
  }
  function viewHome() {
    shell("dash");
    var c = G.cfg, p = P(), nx = nextUnit(), ts = vTopics(), L = lvl(), x = gxp(), pc = L.nxt ? (x - L.cur.xp) / (L.nxt.xp - L.cur.xp) * 100 : 100, st = curStreak(), days = examDays(), due = gymDue(), o = overall();
    var rail = `<aside class="rail">
      <div class="card prof"><div class="pm">${M("happy", 96)}</div><div><div class="eyebrow">Level ${L.i + 1}</div><h3>${L.cur.n}</h3>${bar_(pc)}<span class="muted sm">${L.nxt ? (L.nxt.xp - x).toLocaleString() + " XP to " + L.nxt.n : "Top level reached"}</span></div></div>
      <div class="card"><div class="rh"><h3>Daily quests</h3><span class="chip">${S.quests.items.filter(function (q) { return q.done; }).length} / 3</span></div>${questsHtml()}</div>
      <div class="card tiles"><div class="tile2">${ic("flame")}<b>${st}</b><span>day streak</span></div><div class="tile2">${ic("check")}<b>${o.a ? Math.round(o.acc * 100) + "%" : "–"}</b><span>accuracy</span></div>${days !== null ? `<div class="tile2">${ic("clock")}<b>${days}</b><span>days to exams</span></div>` : `<div class="tile2">${ic("trophy")}<b>${o.mastered}</b><span>mastered</span></div>`}</div>
      <div class="card secnav"><h3>Sections</h3>${ts.map(function (t, i) { var s = topicStats(t); return `<a href="#sec-${t.id}" data-go="sec-${t.id}"><span class="sn2">${pad2(i + 1)}</span><span>${t.name}</span>${ring(s.mastery, 30, 4, "")}</a>`; }).join("")}</div>
      ${due ? `<a class="btn big good" href="#/review">${ic("review")} ${due} to review</a>` : ""}
    </aside>`;
    var next = nx ? nx.l.id : null, path = "", offs = [0, -38, -62, -38, 0, 38, 62, 38];
    ts.forEach(function (t, ti) {
      var ls = vLevels(t), s = topicStats(t);
      path += `<section class="sect w-sec${ti % 4}" id="sec-${t.id}"><div class="banner"><div><div class="eyebrow">Section ${ti + 1} · ${s.started} of ${s.units} started</div><h2>${t.name}</h2><p>${t.blurb || ""}</p></div><a class="btn alt small" href="#/t/${t.id}">Guidebook</a></div><div class="pathcol">`;
      ls.forEach(function (l, i) {
        var star = p.stars[l.id] || 0, cls = star ? "done" : l.id === next ? "cur" : "todo", icn = star ? "check" : NODE_ICONS[(i + ti) % 4], x0 = offs[i % 8];
        path += `<div class="node ${cls}" style="--x:${x0}px" data-id="${l.id}"><button class="nbtn" aria-label="${l.t}, ${MASTERY[star]}" aria-expanded="false"><span class="ni">${ic(icn)}</span></button>${cls === "cur" ? `<div class="startme">START</div><div class="nm">${M("wow", 70)}</div>` : ""}<div class="nl">${l.t}</div>${star ? `<div class="nstars" aria-hidden="true">${"★".repeat(star)}${"☆".repeat(3 - star)}</div>` : ""}
          <div class="pop" role="dialog" aria-label="${l.t}"><b>${l.t}</b><span class="muted sm">${l.r ? "Spec " + l.r : t.name}</span><div>${tags(l)}</div><div class="muted sm">${MASTERY[star]}${G.explainers[slug(l.t)] ? " · includes animation" : ""}</div><a class="btn good" href="#/l/${l.id}">${star ? "Practise again" : "Start"}</a></div></div>`;
      });
      var bd = p.bossDone[t.id];
      path += `<div class="node boss ${bd ? "done" : ""}" style="--x:0px"><a class="nbtn big" href="#/test/${t.id}" aria-label="${t.name} boss challenge"><span class="ni">${boss(hashStr(t.id) % 360)}</span></a><div class="nl">${bd ? "Boss defeated" : "Boss challenge"}</div></div></div></section>`;
    });
    app.innerHTML = `<div class="home"><div class="homemain">
      <div class="hero2"><div><div class="eyebrow">${c.spec}</div><h1>${c.subject}</h1><p>${c.intro}</p>${nx ? `<a class="btn big" href="#/l/${nx.l.id}">${ic("play")} Continue: ${nx.l.t}</a>` : `<a class="btn big" href="#/practice">${ic("trophy")} Sit a mock exam</a>`}</div><div class="hm">${M("wow", 150)}</div></div>
      <div class="modes"><a class="mode" href="#/daily">${ic("target")}<b>Daily 10</b><span>Mixed quick-fire</span></a><a class="mode" href="#/speed">${ic("speed")}<b>Speed round</b><span>90 seconds</span></a><a class="mode" href="#/practice">${ic("mock")}<b>Mock exam</b><span>Timed paper</span></a><a class="mode" href="#/final">${ic("trophy")}<b>${c.finalName || "Final assessment"}</b><span>30 questions</span></a></div>
      <div class="path">${path}</div></div>${rail}</div>`;
    $$(".node:not(.boss) .nbtn", app).forEach(function (b) {
      b.onclick = function (e) { e.stopPropagation(); var n = b.closest(".node"), open = n.classList.contains("open"); $$(".node.open", app).forEach(function (x) { x.classList.remove("open"); x.querySelector(".nbtn").setAttribute("aria-expanded", "false"); }); if (!open) { n.classList.add("open"); b.setAttribute("aria-expanded", "true"); } sndTap(); };
    });
    app.onclick = function (e) { if (!e.target.closest(".pop")) $$(".node.open", app).forEach(function (x) { x.classList.remove("open"); }); };
    $$(".secnav a", app).forEach(function (a) { a.onclick = function (e) { e.preventDefault(); var s = document.getElementById(a.dataset.go); if (s) s.scrollIntoView({ behavior: "smooth", block: "start" }); }; });
    var cur = $(".node.cur", app), sk = "gq_scrolled_" + c.key;
    try { if (cur && !sessionStorage.getItem(sk)) { sessionStorage.setItem(sk, "1"); setTimeout(function () { cur.scrollIntoView({ block: "center", behavior: "smooth" }); }, 350); } } catch (e) {}
    flushLevelUp();
  }

  /* ---------- topic guidebook ---------- */
  function viewTopic(id) {
    shell("dash");
    var t = G.topics.filter(function (x) { return x.id === id; })[0]; if (!t) return go("#/");
    var p = P(), ls = vLevels(t), nx = false, s = topicStats(t);
    var rows = ls.map(function (l, i) {
      var st = p.stars[l.id] || 0, cls = "m" + st; if (!st && !nx) { cls += " next"; nx = true; }
      return `<a class="unit ${cls}" href="#/l/${l.id}"><span class="n">${st === 3 ? ic("check") : pad2(i + 1)}</span><div><b>${l.t}</b><div class="meta">${tags(l)}${l.r ? `<span class="tag">Spec ${l.r}</span>` : ""}${G.explainers[slug(l.t)] ? `<span class="tag anim">Animated</span>` : ""}</div></div><span class="state">${st ? MASTERY[st] : cls.indexOf("next") > -1 ? "Up next" : "Not started"}</span></a>`;
    }).join("");
    rows += `<a class="unit test ${p.bossDone[t.id] ? "m3" : ""}" href="#/test/${t.id}"><span class="n">${p.bossDone[t.id] ? ic("check") : ic("target")}</span><div><b>Boss challenge: ${t.name}</b><div class="meta"><span class="tag">${Math.min(12, Math.max(8, ls.length * 2))} mixed questions · 5 hearts</span></div></div><span class="state">${p.bossDone[t.id] ? "Defeated" : "Fight!"}</span></a>`;
    app.innerHTML = pageHead([["Learn", "#/"], [t.name]], t.name, (t.blurb || "") + (t.paper ? " (" + t.paper + ")" : "")) +
      `<div class="statrow" style="max-width:640px"><div class="stat"><div class="ic">${ic("progress")}</div><div><b>${Math.round(s.mastery)}%</b><span>Mastery</span></div></div><div class="stat"><div class="ic">${ic("check")}</div><div><b>${s.mastered} / ${s.units}</b><span>Mastered</span></div></div><div class="stat"><div class="ic">${ic("target")}</div><div><b>${s.acc === null ? "–" : Math.round(s.acc) + "%"}</b><span>Accuracy</span></div></div></div><div class="units">${rows}</div>`;
  }

  /* ---------- resource links ---------- */
  function linksFor(l) {
    var sub = G.cfg.subject, q = "GCSE " + sub + " " + l.t, enc = encodeURIComponent, ch = G.cfg.channel || (G.cfg.key === "maths" ? "Corbettmaths" : "Free Science Lessons");
    return [
      { k: "video", t: "Watch videos on YouTube", d: "Search: " + q, u: "https://www.youtube.com/results?search_query=" + enc(q) },
      { k: "video", t: ch, d: "Popular free GCSE channel: " + l.t, u: "https://www.youtube.com/results?search_query=" + enc(ch + " " + l.t) },
      { k: "link", t: "BBC Bitesize", d: "Notes, videos and quizzes", u: "https://www.bbc.co.uk/bitesize/search?q=" + enc(q) },
      { k: "link", t: "Oak National Academy", d: "Free lessons used in UK schools", u: "https://www.thenational.academy/search?term=" + enc(l.t + " " + sub) },
      { k: "link", t: "Save My Exams", d: "Revision notes and exam questions", u: "https://www.savemyexams.com/search/?q=" + enc(q) },
      { k: "globe", t: "Seneca Learning", d: "Free GCSE courses and practice", u: "https://senecalearning.com/en-GB/" }
    ].concat((l.links || []).map(function (x) { return { k: x[2] || "video", t: x[0], d: x[3] || "Recommended resource", u: x[1] }; }));
  }
  function linksHtml(l) { return `<div class="links">${linksFor(l).map(function (x) { return `<a class="linkcard" href="${x.u}" target="_blank" rel="noopener noreferrer"><span class="li">${ic(x.k)}</span><span><b>${x.t}</b><small>${x.d}</small></span><span class="ext">${ic("arrow")}</span></a>`; }).join("")}</div><p class="muted sm">These open in a new tab and need an internet connection. Pick a video or page that matches your exam board.</p>`; }

  /* ---------- lesson stepper ---------- */
  var A_ = window.ANIM; function A_stop() { if (A_ && A_.stopAll) A_.stopAll(); }
  function viewLevel(id) {
    shell("dash");
    var l = G.levels[id]; if (!l) return go("#/");
    var t = l.topic, ex = G.explainers[slug(l.t)], screens = [];
    if (ex) screens.push({ k: "watch", ex: ex });
    (G.extraScenes[slug(l.t)] || []).forEach(function (s, i) { screens.push({ k: "watch", ex: s, more: i + 1 }); });
    l.c.forEach(function (line, n) { screens.push({ k: "point", n: n, line: line, fig: n === 0 && l.d && G.diagrams[l.d] ? G.diagrams[l.d] : null }); });
    if (l.pics && l.pics.length) screens.push({ k: "pics" });
    screens.push({ k: "hook" }); screens.push({ k: "res" });
    var at = 0, dir = 1;
    app.innerHTML = `<div class="lesson2"><div class="lhead"><a class="xbtn" href="#/" aria-label="Close lesson">${ic("cross")}</a><div class="lprog" id="lprog"></div><button class="btn small alt" id="skip">Skip to questions</button></div>
      <div class="lmeta">${crumbs([["Learn", "#/"], [t.name, "#/t/" + t.id]])}<h1 class="title">${l.t}</h1><div>${tags(l)}${l.r ? `<span class="tag">Spec ${l.r}</span>` : ""}</div></div><div class="lstage" id="lstage"></div>
      <div class="lbar"><button class="btn alt" id="lback">Back</button><button class="btn big" id="lnext">Continue</button></div></div>`;
    P().read[l.id] = 1; save(); checkBadges();
    function render() {
      var sc = screens[at], st = $("#lstage"); A_stop(); var h = "";
      if (sc.k === "pics") h = `<div class="lscreen"><div class="say">${M("wow", 84)}<div class="bubble">Now see the real thing. These are photographs of actual hardware, so you can match the ideas to what you would find inside a real computer.</div></div><div class="photos">${l.pics.map(function (x) { var f = x[0], u = "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(f) + "?width=900"; return `<figure class="photo"><img loading="lazy" src="${u}" alt="${esc(x[1])}" onerror="this.parentNode.classList.add('nopic')"><div class="nopicmsg">Photo could not load (it needs an internet connection): ${eh(x[1])}</div><figcaption><b>${eh(x[1])}</b>${x[2] ? `<span>${eh(x[2])}</span>` : ""}<a href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(f)}" target="_blank" rel="noopener noreferrer">Photo: Wikimedia Commons (author and licence)</a></figcaption></figure>`; }).join("")}</div></div>`;
      else if (sc.k === "watch") h = `<div class="lscreen"><div class="say">${M("think", 84)}<div class="bubble">${sc.more ? "Here is another animation to explain the theory. Step through it at your own pace." : "Watch this first. Press play, pause, or step through it."}</div></div><div class="card scenecard" id="scenehost"></div></div>`;
      else if (sc.k === "point") h = `<div class="lscreen"><div class="say">${M(sc.n % 2 ? "think" : "happy", 84)}<div class="bubble"><span class="pnum">Key idea ${sc.n + 1} of ${l.c.length}</span>${sc.line}</div></div>${sc.fig ? `<figure class="figure"><figcaption>Diagram</figcaption>${sc.fig}</figure>` : ""}</div>`;
      else if (sc.k === "hook") h = `<div class="lscreen"><div class="say">${M("wow", 84)}<div class="bubble">Lock it in with a memory hook.</div></div><div class="hook flip"><h3>${ic("hook")}Memory hook</h3><p>${l.k}</p></div></div>`;
      else h = `<div class="lscreen"><div class="say">${M("happy", 84)}<div class="bubble">Want to go deeper? Try these free resources, then test yourself.</div></div>${linksHtml(l)}</div>`;
      st.className = "lstage " + (dir > 0 ? "fwd" : "back"); st.innerHTML = h;
      $("#lprog").innerHTML = screens.map(function (s, k) { return `<i class="${k < at ? "done" : k === at ? "on" : ""}"></i>`; }).join("");
      $("#lback").style.visibility = at ? "visible" : "hidden";
      $("#lnext").innerHTML = at === screens.length - 1 ? ic("play") + " Start practice" : "Continue";
      if (sc.k === "watch") { var host = $("#scenehost"); if (sc.ex.sim) { A_.sim(host, sc.ex.sim); if (sc.ex.cap) host.insertAdjacentHTML("beforeend", `<p class="simcap">${sc.ex.cap}</p>`); } else A_.scene(host, sc.ex); }
      sndTap(); window.scrollTo(0, 0);
    }
    function nextS() { if (at < screens.length - 1) { at++; dir = 1; render(); } else { A_stop(); playLevel(l); } }
    function backS() { if (at > 0) { at--; dir = -1; render(); } }
    $("#lnext").onclick = nextS; $("#lback").onclick = backS; $("#skip").onclick = function () { A_stop(); playLevel(l); };
    attach(function (e) { if (!$("#lstage") || /^(BUTTON|A|INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return; if (e.key === "ArrowRight" || e.key === "Enter") nextS(); else if (e.key === "ArrowLeft") backS(); });
    render();
  }

  /* ---------- sessions ---------- */
  function mkQ(raw, levelId, i) { return { raw: raw, qid: levelId + "#" + i, levelId: levelId }; }
  function sampleQs(l, n) { var idx = shuffle(l.q.map(function (_, i) { return i; })).slice(0, n); return idx.map(function (i) { return mkQ(l.q[i], l.id, i); }); }
  function playLevel(l) {
    practice({ title: l.t, crumbs: [["Learn", "#/"], [l.topic.name, "#/t/" + l.topic.id], [l.t, "#/l/" + l.id]], qs: sampleQs(l, 8), hearts: 4, pts: 10, onWin: function (res) {
      var p = P(), st = res.mistakes === 0 ? 3 : res.mistakes <= 2 ? 2 : 1, was = p.stars[l.id] || 0;
      if (st > was) p.stars[l.id] = st; if (!was) addXP(25); qtrack("unit", 1); save();
      resultScreen(st, res, { again: "#/l/" + l.id, next: nextAfter(l), label: l.t, first: !was });
    }, onLose: function (res) { loseScreen(res, function () { playLevel(l); }, "#/l/" + l.id, "Review the lesson"); } });
  }
  function nextAfter(l) { var ls = vLevels(l.topic), i = ls.indexOf(l); return i < ls.length - 1 ? { href: "#/l/" + ls[i + 1].id, name: "Next: " + ls[i + 1].t } : { href: "#/test/" + l.topic.id, name: "Fight the boss" }; }
  function poolFrom(ls, count) {
    var all = []; ls.forEach(function (l) { l.q.forEach(function (q, i) { all.push(mkQ(q, l.id, i)); }); });
    all = shuffle(all); var seen = {}, out = []; all.forEach(function (x) { if (!seen[x.levelId] && out.length < count) { seen[x.levelId] = 1; out.push(x); } });
    all.forEach(function (x) { if (out.indexOf(x) < 0 && out.length < count) out.push(x); }); return shuffle(out);
  }
  function viewTest(id) {
    shell("dash");
    var t = G.topics.filter(function (x) { return x.id === id; })[0]; if (!t) return go("#/");
    var hue = hashStr(t.id) % 360, name = BOSSES[hashStr(t.id) % BOSSES.length];
    practice({ title: "Boss: " + t.name, crumbs: [["Learn", "#/"], [t.name, "#/t/" + t.id], ["Boss challenge"]], qs: poolFrom(vLevels(t), Math.min(12, Math.max(8, vLevels(t).length * 2))), hearts: 5, pts: 15, boss: { hue: hue, name: name }, onWin: function (res) {
      P().bossDone[t.id] = 1; addXP(100); save(); checkBadges();
      resultScreen(res.mistakes <= 1 ? 3 : res.mistakes <= 3 ? 2 : 1, res, { again: "#/test/" + t.id, next: { href: "#/", name: "Back to the path" }, label: name + " defeated", bonus: 100, boss: true });
    }, onLose: function (res) { loseScreen(res, function () { viewTest(id); }, "#/t/" + t.id, "Back to topic"); } });
  }
  function viewFinal() {
    shell("dash"); var name = G.cfg.finalName || "Final assessment";
    practice({ title: name, crumbs: [["Learn", "#/"], [name]], qs: poolFrom(allV(), 30), hearts: 7, pts: 20, boss: { hue: 200, name: "The Final Gremlin" }, onWin: function (res) {
      var p = P(); p.finalBest = Math.max(p.finalBest, res.score); addXP(300); save();
      resultScreen(res.mistakes <= 2 ? 3 : res.mistakes <= 6 ? 2 : 1, res, { again: "#/final", next: { href: "#/", name: "Back to the path" }, label: name, bonus: 300, boss: true });
    }, onLose: function (res) { loseScreen(res, viewFinal, "#/", "Back to the path"); } });
  }
  function viewDaily() {
    shell("dash");
    practice({ title: "Daily 10", crumbs: [["Learn", "#/"], ["Daily 10"]], qs: poolFrom(allV(), 10), hearts: 3, pts: 12, onWin: function (res) {
      addXP(30); save(); resultScreen(res.mistakes === 0 ? 3 : res.mistakes <= 2 ? 2 : 1, res, { again: "#/daily", next: { href: "#/", name: "Back to the path" }, label: "Daily 10", bonus: 30 });
    }, onLose: function (res) { loseScreen(res, viewDaily, "#/", "Back to the path"); } });
  }
  function viewGym() {
    shell("gym");
    var p = P(), n = Date.now(), ids = Object.keys(p.missed).filter(function (k) { return p.missed[k].due <= n; }), later = Object.keys(p.missed).length - ids.length;
    var list = ids.map(function (k) { var pr = k.split("#"), l = G.levels[pr[0]]; return l && l.q[+pr[1]] !== undefined ? mkQ(l.q[+pr[1]], pr[0], +pr[1]) : null; }).filter(Boolean);
    if (!list.length) {
      app.innerHTML = pageHead(null, "Review", "Questions you miss come back on later days. Get one right three times, spaced out, and it leaves for good. This spacing is what makes facts last until the exam.") +
        `<div class="card emptyc">${M("happy", 110)}<div><b>All caught up!</b><p class="muted">${later ? later + " question" + (later > 1 ? "s are" : " is") + " scheduled for a later day." : "Any question you miss will be saved here automatically."}</p><a class="btn" href="#/">Back to the path</a></div></div>`;
      return;
    }
    practice({ title: "Review", crumbs: [["Review"]], qs: shuffle(list).slice(0, 15), hearts: 5, pts: 12, gym: true, onWin: function (res) {
      addXP(20); save(); resultScreen(res.mistakes === 0 ? 3 : res.mistakes <= 2 ? 2 : 1, res, { again: "#/review", next: { href: "#/", name: "Back to the path" }, label: "Review", bonus: 20 });
    }, onLose: function (res) { loseScreen(res, viewGym, "#/", "Back to the path"); } });
  }

  /* ---------- practice session ---------- */
  function heartsHtml(h, m) { var s = ""; for (var i = 0; i < m; i++) s += `<i class="${i < h ? "" : "off"}">${ic("heart")}</i>`; return s; }
  function practice(o) {
    detach();
    var queue = o.qs.slice(), total = queue.length, hits = 0, hp = o.hearts, maxH = o.hearts, combo = 0, bestCombo = 0, score = 0, mistakes = 0, answered = 0, correct = 0;
    var bossHtml = o.boss ? `<div class="bossrow"><div class="bwho">${M("idle", 84)}</div><div class="vs">VS</div><div class="bwho"><span id="bossw">${boss(o.boss.hue)}</span><b>${o.boss.name}</b><div class="hpbar"><i id="bhp"></i></div></div></div>` : "";
    app.innerHTML = (o.crumbs ? crumbs(o.crumbs) : "") + `<div class="session ${o.boss ? "bossmode" : ""}" id="sess">${bossHtml}<div class="statusbar"><div class="sbl"><a class="xbtn" href="#/" aria-label="Quit">${ic("cross")}</a><div id="pgwrap" class="pg"></div></div><div class="meta"><span class="combo" id="combo"></span>${hp != null ? '<span class="hearts" id="lives" aria-live="polite"></span>' : ""}<span class="xpnow" id="score"></span></div></div><div class="qcard" id="qb"></div></div>`;
    function hud() {
      if (hp != null) { $("#lives").innerHTML = heartsHtml(hp, maxH); $("#lives").setAttribute("aria-label", hp + " hearts left"); }
      $("#combo").innerHTML = combo > 1 ? `${ic("flame")}<b>×${Math.min(combo, 5)}</b>` : "";
      $("#score").innerHTML = `<b>${score}</b> ${UNIT}`;
      $("#pgwrap").innerHTML = `<div class="seg"><i style="width:${hits / total * 100}%"></i></div><span class="qn">${Math.min(hits + 1, total)} / ${total}</span>`;
      if (o.boss) $("#bhp").style.width = (100 - hits / total * 100) + "%";
    }
    function next() {
      if (!queue.length) { o.onWin({ score: score, mistakes: mistakes, total: total, answered: answered, correct: correct, best: bestCombo }); return; }
      var q = queue.shift();
      askQuestion(q.raw, $("#qb"), function (ok, why, cont) {
        var p = P(), tid = G.levels[q.levelId] && G.levels[q.levelId].topic.id, st = tid ? (p.stats[tid] = p.stats[tid] || { a: 0, c: 0 }) : null;
        answered++; if (st) st.a++;
        var card = $("#qb"); card.classList.remove("flash-ok", "flash-no"); void card.offsetWidth; card.classList.add(ok ? "flash-ok" : "flash-no");
        if (ok) {
          correct++; if (st) st.c++; hits++; combo++; bestCombo = Math.max(bestCombo, combo); S.bestCombo = Math.max(S.bestCombo || 0, combo);
          var gain = Math.round(o.pts * (1 + .25 * (Math.min(combo, 5) - 1))); score += gain; addXP(gain); qtrack("correct", 1); qtrack("combo", combo, true); if (o.gym) qtrack("review", 1); sndGood(combo); popXP("+" + gain + " XP");
          if (combo === 5 || combo === 10) A_.confetti(60);
          if (o.boss) { var bw = $("#bossw"); if (bw) { bw.classList.remove("hit"); void bw.offsetWidth; bw.classList.add("hit"); } var sess = $("#sess"); sess.insertAdjacentHTML("beforeend", '<div class="bolt"></div>'); setTimeout(function () { var b = $(".bolt", sess); if (b) b.remove(); }, 600); }
          if (o.gym && p.missed[q.qid]) { var m = p.missed[q.qid]; m.box++; if (m.box >= 3) delete p.missed[q.qid]; else m.due = Date.now() + [1, 3, 7][m.box] * 864e5; }
        } else {
          if (hp != null) hp--; combo = 0; mistakes++; sndBad(); p.missed[q.qid] = { box: 0, due: Date.now() };
          if (!o.noRetry) queue.push(q);
          if (o.boss) { var bw2 = $("#bossw"); if (bw2) { bw2.classList.remove("atk"); void bw2.offsetWidth; bw2.classList.add("atk"); } }
          var se = $("#sess"); if (se) { se.classList.remove("shake"); void se.offsetWidth; se.classList.add("shake"); }
        }
        save(); hud();
        cont(function () { if (hp != null && hp <= 0) o.onLose({ score: score, mistakes: mistakes, total: total, answered: answered, correct: correct, best: bestCombo }); else next(); });
      });
    }
    hud(); next();
  }

  /* one question: calls done(firstTryCorrect, why, cont, meta) */
  function normal(raw) { return typeof raw === "function" ? raw() : raw; }
  var fbar = null;
  function removeBar() { if (fbar) { fbar.remove(); fbar = null; } document.body.classList.remove("has-fbar"); }
  function showBar(ok, why, proceed) {
    removeBar(); fbar = document.createElement("div"); fbar.className = "fbar " + (ok ? "ok" : "no"); fbar.setAttribute("role", "status");
    fbar.innerHTML = `<div class="fin">${M(ok ? "happy" : "sad", 76)}<div class="ftxt"><b>${ok ? G.pick(CHEERS) : "Not quite"}</b><p>${why || ""}</p></div><button class="btn big ${ok ? "good" : "bad"}" id="cont">Continue</button></div>`;
    document.body.appendChild(fbar); document.body.classList.add("has-fbar");
    var b = $("#cont", fbar); b.onclick = function () { removeBar(); detach(); proceed(); }; b.focus({ preventScroll: true });
  }
  var keyHandler = null;
  function detach() { if (keyHandler) { document.removeEventListener("keydown", keyHandler); keyHandler = null; } }
  function attach(fn) { detach(); keyHandler = fn; document.addEventListener("keydown", fn); }
  var TYPE = { m: "Choose the answer", t: "True or false?", n: "Work it out", w: "Type the answer", p: "Match the pairs", s: "Sort into groups", o: "Put in order" };
  function askQuestion(raw, box, done, exam) {
    var q = normal(raw), k = q[0], meta = { prompt: q[1], correct: "" };
    G._last = q;
    var finish = function (ok, why, extra, correct) {
      detach(); meta.correct = correct || ""; meta.why = why || "";
      if (exam) setTimeout(function () { done(ok, why, function (proc) { proc(); }, meta); }, 220);
      else done(ok, why, function (proc) { showBar(ok, (ok ? "" : (extra || "")) + (why || ""), proc); }, meta);
    };
    var label = `<div class="qlabel"><span>${TYPE[k]}</span></div>`;
    box.innerHTML = "";
    if (k === "m" || k === "t") {
      var prompt = q[1], opts, why;
      if (k === "m") { opts = [{ h: q[2], ok: true }, { h: q[3] }, { h: q[4] }, { h: q[5] }].filter(function (x, i, arr) { return x.h !== undefined && x.h !== null && arr.map(function (y) { return String(y.h); }).indexOf(String(x.h)) === i; }); why = q[6]; opts = shuffle(opts); }
      else { opts = [{ h: "True", ok: q[2] === true }, { h: "False", ok: q[2] === false }]; why = q[3]; meta.prompt = "True or false: " + q[1]; }
      var corr = opts.filter(function (x) { return x.ok; })[0].h;
      box.innerHTML = label + `<p class="prompt">${prompt}</p><div class="choices ${k === "t" ? "two" : ""}">` + opts.map(function (o, i) { return `<button class="choice" data-i="${i}"><span class="kb">${i + 1}</span><span>${o.h}</span></button>`; }).join("") + "</div>";
      var answered = false;
      var pickI = function (i) {
        if (answered) return; answered = true; var ok = !!opts[i].ok; sndTap();
        $$(".choice", box).forEach(function (b, j) { b.disabled = true; if (exam) { if (j === i) b.classList.add("picked"); } else { if (opts[j].ok) b.classList.add("right"); if (j === i && !ok) b.classList.add("wrong"); } });
        finish(ok, why, "Correct answer: " + corr + ". ", corr);
      };
      $$(".choice", box).forEach(function (b) { b.onclick = function () { pickI(+b.dataset.i); }; });
      attach(function (e) { var n = +e.key; if (n >= 1 && n <= opts.length) pickI(n - 1); });
      return;
    }
    if (k === "n" || k === "w") {
      box.innerHTML = label + `<p class="prompt">${q[1]}</p><form class="typed"><input id="ans" aria-label="Your answer" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type your answer">${k === "n" && q[3] ? `<span class="unit-lab">${q[3]}</span>` : ""}<button class="btn">Check</button></form>`;
      var inp = $("#ans", box), form = $("form", box); inp.focus({ preventScroll: true });
      form.onsubmit = function (e) {
        e.preventDefault(); var v = inp.value.trim(); if (!v) return; inp.disabled = true; $("button", form).disabled = true;
        if (k === "n") { var ans = q[2], num = parseNum(v), tol = q[5] !== undefined ? q[5] : Math.max(Math.abs(ans) * .001, 1e-9), ok = num !== null && Math.abs(num - ans) <= tol, cs = fmt(ans) + (q[3] ? " " + q[3] : ""); finish(ok, q[4], "Answer: " + cs + ". ", cs); }
        else { var norm = function (s) { return s.toLowerCase().replace(/[^a-z0-9+\-]/g, ""); }, list = q[2], ok2 = list.some(function (a) { return norm(a) === norm(v); }); finish(ok2, q[3], "Answer: " + list[0] + ". ", list[0]); }
      };
      return;
    }
    if (k === "p") {
      var pairs = q[2], L = shuffle(pairs.map(function (p, i) { return { t: p[0], i: i }; })), R = shuffle(pairs.map(function (p, i) { return { t: p[1], i: i }; }));
      box.innerHTML = label + `<p class="prompt">${q[1]} <span class="muted hint">Tap one item from each side.</span></p><div class="pairs"><div>` + L.map(function (x) { return `<button class="tile" data-s="L" data-i="${x.i}">${x.t}</button>`; }).join("") + "</div><div>" + R.map(function (x) { return `<button class="tile" data-s="R" data-i="${x.i}">${x.t}</button>`; }).join("") + "</div></div>";
      var sel = null, left = pairs.length, err = false, ctext = pairs.map(function (p) { return p[0] + " = " + p[1]; }).join("; ");
      $$(".tile", box).forEach(function (b) {
        b.onclick = function () {
          if (b.classList.contains("done")) return; sndTap();
          if (!sel || sel.dataset.s === b.dataset.s) { if (sel) sel.classList.remove("sel"); sel = b; b.classList.add("sel"); return; }
          if (sel.dataset.i === b.dataset.i) { [sel, b].forEach(function (x) { x.classList.remove("sel"); x.classList.add("done"); x.disabled = true; }); beep(740, .07); sel = null; left--; if (!left) finish(!err, q[3] || "All matched.", "", ctext); }
          else { err = true; var a = sel; sel = null; a.classList.remove("sel"); [a, b].forEach(function (x) { x.classList.add("oops"); setTimeout(function () { x.classList.remove("oops"); }, 420); }); sndBad(); }
        };
      });
      return;
    }
    if (k === "s") {
      var bins = Object.keys(q[2]), items = []; bins.forEach(function (b) { q[2][b].forEach(function (t) { items.push({ t: t, b: b }); }); }); items = shuffle(items);
      box.innerHTML = label + `<p class="prompt">${q[1]}</p><div class="item" id="it"></div><div class="bins">` + bins.map(function (b, i) { return `<button class="bin" data-b="${esc(b)}">${b}<small>Key ${i + 1}</small></button>`; }).join("") + "</div>";
      var idx = 0, serr = false, stext = bins.map(function (b) { return b + ": " + q[2][b].join(", "); }).join("; "), show = function () { $("#it", box).innerHTML = items[idx].t + ` <small class="muted">(${idx + 1} of ${items.length})</small>`; };
      var choose = function (bn, el) {
        if (idx >= items.length) return;
        if (items[idx].b === bn) { beep(740, .07); idx++; if (idx >= items.length) { $("#it", box).textContent = "All sorted!"; finish(!serr, q[3] || "Everything is in the right place.", "", stext); } else show(); }
        else { serr = true; sndBad(); if (el) { el.classList.add("sad"); setTimeout(function () { el.classList.remove("sad"); }, 500); } }
      };
      $$(".bin", box).forEach(function (b) { b.onclick = function () { choose(b.dataset.b.replace(/&amp;/g, "&").replace(/&quot;/g, '"'), b); }; });
      attach(function (e) { var n = +e.key; if (n >= 1 && n <= bins.length) choose(bins[n - 1], $$(".bin", box)[n - 1]); });
      show(); return;
    }
    if (k === "o") {
      var seq = q[2], tiles = shuffle(seq.map(function (t, i) { return { t: t, i: i }; }));
      box.innerHTML = label + `<p class="prompt">${q[1]}</p><div class="ordered" id="od"></div><div class="choices">` + tiles.map(function (x) { return `<button class="tile" data-i="${x.i}">${x.t}</button>`; }).join("") + "</div>";
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

  /* ---------- results and level-ups ---------- */
  function countUp(el, to) { var t0 = performance.now(); (function f(t) { var p = Math.min(1, (t - t0) / 900); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0); }
  function resultScreen(st, res, o) {
    detach(); removeBar(); sndWin();
    var acc = pct(res.correct, res.answered), nx = o.next, earned = res.score + (o.bonus || 0) + (o.first ? 25 : 0);
    app.innerHTML = `<div class="card result">${o.boss ? `<div class="eyebrow">Victory</div>` : ""}<div class="rm">${M("happy", 130)}</div><h1>${MASTERY[st]}!</h1><p class="sub">${o.label}</p>
      <div class="starsrow" aria-label="${st} out of 3 stars">${[1, 2, 3].map(function (n) { return `<span class="bstar ${n <= st ? "on" : ""}" style="animation-delay:${n * 220}ms">${ic("star")}</span>`; }).join("")}</div>
      <div class="breakdown"><div><b id="xpc">0</b><span>${UNIT} earned</span></div><div><b>${acc}%</b><span>Accuracy</span></div><div><b>${res.mistakes}</b><span>Slips${res.mistakes ? " (to review)" : ""}</span></div><div><b>×${Math.max(1, Math.min(res.best || 1, 5))}</b><span>Best combo</span></div></div>
      <div class="row" style="justify-content:center"><a class="btn big" id="nxt" href="${nx.href}">${nx.name}</a><a class="btn alt big" href="${o.again}" id="again">Play again</a></div></div>`;
    if (location.hash === o.again) $("#again").onclick = function (e) { e.preventDefault(); route(); };
    countUp($("#xpc"), earned); $("#nxt").focus({ preventScroll: true }); window.scrollTo(0, 0);
    A_.confetti(st === 3 ? 160 : 90); setTimeout(flushLevelUp, 1500);
  }
  function flushLevelUp() {
    if (pendingLvl === null || !($(".result") || $(".home")) || $(".modal")) return; var L = pendingLvl, lv = LEVELS[L]; pendingLvl = null; sndLevel(); A_.confetti(200);
    var un = lv.color ? "New colour unlocked: " + MASCOT_COLORS[lv.color][2] : lv.acc ? "New gear unlocked: " + MASCOT_ACCS[lv.acc] : "Keep going to unlock more!";
    var m = document.createElement("div"); m.className = "modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-label", "Level up");
    m.innerHTML = `<div class="mcard"><div class="eyebrow">Level up!</div><div class="mm">${M("happy", 150)}</div><h2>Level ${L + 1}: ${lv.n}</h2><p class="muted">${un}</p><div class="row" style="justify-content:center"><button class="btn big" id="mok">Awesome</button><a class="btn alt big" href="#/locker" id="mgo">Open my buddy</a></div></div>`;
    document.body.appendChild(m); $("#mok", m).focus(); $("#mok", m).onclick = function () { m.remove(); refreshTop(); }; $("#mgo", m).onclick = function () { m.remove(); };
  }
  function loseScreen(res, retry, backHref, backLabel) {
    detach(); removeBar();
    app.innerHTML = `<div class="card result"><div class="rm">${M("sad", 130)}</div><h1>Out of hearts</h1><p class="sub" style="max-width:48ch;margin:8px auto 22px">You keep the ${res.score} XP you earned, and every missed question is saved in Review. Re-read the lesson or watch the animation again, then have another go. You've got this.</p><div class="row" style="justify-content:center"><button class="btn big" id="re">Try again</button><a class="btn alt big" href="${backHref}">${backLabel || "Back"}</a></div></div>`;
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
    app.innerHTML = pageHead(null, "Speed round", "90 seconds on the clock. Answer fast, build a combo and chase a high score. Press 1 to 4 to answer.") +
      `<div class="card emptyc">${M("wow", 120)}<div><div class="row"><label for="asc" style="font-weight:800">Topic</label><select id="asc" class="field"><option value="">Everything</option>${vTopics().map(function (t) { return `<option value="${t.id}">${t.name}</option>`; }).join("")}</select></div><p class="muted" style="margin:10px 0 14px">Personal best: <b style="color:var(--text)">${P().arcade}</b></p><button class="btn big" id="st">${ic("bolt")} Start</button></div></div>`;
    $("#st").onclick = function () { var id = $("#asc").value; runSpeed(id ? vLevels(G.topics.filter(function (t) { return t.id === id; })[0]) : allV()); };
  }
  function runSpeed(ls) {
    app.innerHTML = `<div class="session speed" id="sess"><div class="statusbar"><div class="sbl"><a class="xbtn" href="#/speed" aria-label="Quit">${ic("cross")}</a><div class="timer" id="tm"><i></i></div><span class="qn" id="at"></span></div><div class="meta"><span class="combo" id="ac"></span><span class="hearts" id="ah"></span><span class="xpnow" id="as"></span></div></div><div class="qcard" id="qb"></div></div>`;
    var lives = 3, score = 0, combo = 0, timeLeft = 90, cur = null, over = false, lock = false, answered = 0, right = 0, iv;
    function hud() { $("#ah").innerHTML = heartsHtml(lives, 3); $("#ac").innerHTML = combo > 1 ? `${ic("flame")}<b>×${Math.min(combo, 5)}</b>` : ""; $("#as").innerHTML = `<b>${score}</b> pts`; $("#at").textContent = Math.max(0, Math.ceil(timeLeft)) + "s"; var tm = $("#tm"); tm.classList.toggle("low", timeLeft <= 15); $("i", tm).style.width = Math.max(0, timeLeft / 90 * 100) + "%"; }
    function spawn() {
      cur = arcadeQ(ls); if (!cur) { end(); return; } lock = false; var qb = $("#qb"); qb.className = "qcard"; qb.innerHTML = `<div class="qlabel"><span>Quick! Choose the answer</span></div><p class="prompt">${cur.p}</p><div class="choices">` + cur.opts.map(function (o, i) { return `<button class="choice" data-i="${i}"><span class="kb">${i + 1}</span><span>${o.t}</span></button>`; }).join("") + "</div>";
      $$(".choice", qb).forEach(function (b) { b.onclick = function () { pick(+b.dataset.i); }; });
    }
    function pick(i) {
      if (lock || over || !cur || !cur.opts[i]) return; lock = true; answered++;
      var ok = !!cur.opts[i].ok, p = P(), st = p.stats[cur.tid] = p.stats[cur.tid] || { a: 0, c: 0 }; st.a++;
      $$(".choice", $("#qb")).forEach(function (b, j) { b.disabled = true; if (cur.opts[j].ok) b.classList.add("right"); else if (j === i) b.classList.add("wrong"); });
      var card = $("#qb"); card.classList.add(ok ? "flash-ok" : "flash-no");
      if (ok) { right++; st.c++; combo++; S.bestCombo = Math.max(S.bestCombo || 0, combo); qtrack("combo", combo, true); var g = Math.round(10 * (1 + .25 * (Math.min(combo, 5) - 1))); score += g; addXP(Math.ceil(g / 2), true); sndGood(combo); popXP("+" + g); hud(); setTimeout(spawn, 320); }
      else { combo = 0; lives--; sndBad(); hud(); if (cur.why) card.insertAdjacentHTML("beforeend", `<div class="inlinefb no"><b>${ic("cross")}Not quite</b><p>${cur.why}</p></div>`); if (lives <= 0) setTimeout(end, 1500); else setTimeout(spawn, 1500); }
    }
    function end() {
      if (over) return; over = true; clearInterval(iv); detach();
      var p = P(), best = score > p.arcade; if (best) p.arcade = score; qtrack("speed", 1); save(); sndWin(); checkBadges(); A_.confetti(best ? 140 : 50);
      app.innerHTML = `<div class="card result"><div class="rm">${M(best ? "happy" : "wow", 130)}</div><h1>${best ? "New personal best!" : "Round over"}</h1><p class="sub">${lives <= 0 ? "You ran out of hearts." : "Time's up."}</p><div class="breakdown"><div><b>${score}</b><span>Score</span></div><div><b>${right}/${answered}</b><span>Correct</span></div><div><b>${pct(right, answered)}%</b><span>Accuracy</span></div><div><b>${p.arcade}</b><span>Best</span></div></div><div class="row" style="justify-content:center"><button class="btn big" id="ag">Play again</button><a class="btn alt big" href="#/">Back to the path</a></div></div>`;
      $("#ag").onclick = function () { runSpeed(ls); }; setTimeout(flushLevelUp, 1200);
    }
    attach(function (e) { var n = +e.key; if (n >= 1 && n <= 4) pick(n - 1); });
    G._stop = function () { over = true; clearInterval(iv); };
    hud(); spawn(); iv = setInterval(function () { if (over) return; timeLeft -= .25; if (timeLeft <= 0) { timeLeft = 0; hud(); end(); } else hud(); }, 250);
  }

  /* ---------- practice zone and mock exams ---------- */
  function viewPractice() {
    shell("mock");
    var topics = vTopics(), best = P().mocks.reduce(function (m, x) { return Math.max(m, x.pct); }, 0), sel = 1, mode = "exam";
    var presets = [[10, 10, "Quick check", "10 questions · 10 min"], [20, 20, "Half paper", "20 questions · 20 min"], [40, 40, "Full mock", "40 questions · 40 min"]];
    app.innerHTML = pageHead(null, "Practice zone", "Choose your own challenge. Coach mode gives instant feedback. Exam mode is timed with no hints, then marks you with a full report.") +
      `<div class="card setup"><h3>1. Length</h3><div class="presets">${presets.map(function (p, i) { return `<button class="preset ${i === sel ? "on" : ""}" data-i="${i}"><b>${p[2]}</b><span>${p[3]}</span></button>`; }).join("")}</div>
      <h3>2. Mode</h3><div class="presets two"><button class="preset mode-b on" data-m="exam"><b>Exam mode</b><span>Timed, no feedback, graded report</span></button><button class="preset mode-b" data-m="coach"><b>Coach mode</b><span>Instant feedback, no clock, unlimited hearts</span></button></div>
      <h3>3. Topic</h3><div class="row"><select id="msc" class="field"><option value="">Whole course</option>${topics.map(function (t) { return `<option value="${t.id}">${t.name}</option>`; }).join("")}</select><button class="btn big" id="go">${ic("play")} Start</button></div>
      <p class="muted sm" style="margin-top:12px">${P().mocks.length ? "Mock attempts: " + P().mocks.length + " · best score " + best + "%." : "No mock attempts yet."} Questions are retrieval practice drawn from the specification, not full past papers.</p></div>`;
    $$(".preset:not(.mode-b)").forEach(function (b) { b.onclick = function () { sel = +b.dataset.i; $$(".preset:not(.mode-b)").forEach(function (x) { x.classList.toggle("on", x === b); }); }; });
    $$(".mode-b").forEach(function (b) { b.onclick = function () { mode = b.dataset.m; $$(".mode-b").forEach(function (x) { x.classList.toggle("on", x === b); }); }; });
    $("#go").onclick = function () {
      var id = $("#msc").value, tp = id ? G.topics.filter(function (t) { return t.id === id; })[0] : null, ls = tp ? vLevels(tp) : allV(), n = presets[sel][0];
      if (mode === "exam") runMock(ls, n, presets[sel][1], tp ? tp.name : "Whole course");
      else practice({ title: "Coach mode · " + (tp ? tp.name : "Whole course"), crumbs: [["Practice zone", "#/practice"], ["Coach mode"]], qs: poolFrom(ls, n), hearts: null, noRetry: true, pts: 10, onWin: function (res) { addXP(20); save(); resultScreen(pct(res.correct, res.answered) >= 90 ? 3 : pct(res.correct, res.answered) >= 70 ? 2 : 1, res, { again: "#/practice", next: { href: "#/practice", name: "Set up another" }, label: "Coach mode complete", bonus: 20 }); }, onLose: function () {} });
    };
  }
  function runMock(ls, n, mins, scope) {
    var qs = poolFrom(ls, n), N = qs.length, i = 0, left = mins * 60, log = [], over = false, iv, t0 = Date.now();
    app.innerHTML = `<div class="session" id="sess"><div class="statusbar"><div class="sbl"><a class="xbtn" href="#/practice" aria-label="Quit">${ic("cross")}</a><div id="pgwrap" class="pg"></div></div><div class="meta"><span class="clock" id="ck"></span></div></div><p class="muted sm" style="margin:-4px 0 10px">Mock exam · ${scope}</p><div class="qcard" id="qb"></div></div>`;
    function clock() { var m = Math.floor(left / 60), s = left % 60, ck = $("#ck"); if (ck) { ck.innerHTML = `${ic("clock")} ${m}:${pad2(s)}`; ck.classList.toggle("low", left <= 60); } }
    function hud() { $("#pgwrap").innerHTML = `<div class="seg"><i style="width:${i / N * 100}%"></i></div><span class="qn">${Math.min(i + 1, N)} / ${N}</span>`; clock(); }
    function next() {
      if (over) return; if (i >= N) return end(); hud(); var q = qs[i];
      askQuestion(q.raw, $("#qb"), function (ok, why, cont, meta) {
        if (over) return; var tid = G.levels[q.levelId].topic; log.push({ ok: ok, tid: tid.id, tname: tid.name, prompt: meta.prompt, correct: meta.correct, why: meta.why }); i++; cont(next);
      }, true);
    }
    function end() {
      if (over) return; over = true; clearInterval(iv); detach(); G._stop = null;
      var used = Math.round((Date.now() - t0) / 1000), p = P(), okc = log.filter(function (x) { return x.ok; }).length, score = pct(okc, N), byTopic = {};
      log.forEach(function (x) { var b = byTopic[x.tid] || (byTopic[x.tid] = { n: x.tname, a: 0, c: 0 }); b.a++; if (x.ok) b.c++; var st = p.stats[x.tid] = p.stats[x.tid] || { a: 0, c: 0 }; st.a++; if (x.ok) st.c++; });
      for (var j = log.length; j < N; j++) { var tt = G.levels[qs[j].levelId].topic, bb = byTopic[tt.id] || (byTopic[tt.id] = { n: tt.name, a: 0, c: 0 }); bb.a++; log.push({ ok: false, skipped: true, tname: tt.name, prompt: normal(qs[j].raw)[1], correct: "", why: "" }); }
      p.mocks.push({ d: Date.now(), pct: score, n: N, scope: scope, secs: used }); if (p.mocks.length > 12) p.mocks.shift();
      addXP(okc * 5 + 40); save(); sndWin(); checkBadges(); A_.confetti(score >= 60 ? 140 : 40);
      var g = band(score), rows = Object.keys(byTopic).map(function (k) { return byTopic[k]; }).sort(function (a, b) { return a.c / a.a - b.c / b.a; }), bad = log.filter(function (x) { return !x.ok; });
      app.innerHTML = `<div class="card result" style="max-width:760px"><div class="rm">${M(score >= 60 ? "happy" : "think", 110)}</div>${ring(score, 124, 11)}<h1>${okc} out of ${N}</h1><p class="sub">${bandText(g)} (indicative only). Real grade boundaries change each year, so use this to decide what to revise next.</p>
        <div class="breakdown"><div><b>${score}%</b><span>Score</span></div><div><b>${Math.floor(used / 60)}:${pad2(used % 60)}</b><span>Time used</span></div><div><b>${okc * 5 + 40}</b><span>${UNIT} earned</span></div></div>
        <div style="text-align:left"><h3>Topic breakdown</h3><table class="eq"><tbody>${rows.map(function (r) { return `<tr><td>${r.n}</td><td style="width:90px;text-align:right" class="formula">${r.c} / ${r.a}</td></tr>`; }).join("")}</tbody></table>${bad.length ? `<h3 style="margin:8px 0">Questions to review (${bad.length})</h3><div class="review">${bad.map(function (x) { return `<div class="it bad"><small>${x.tname}${x.skipped ? " · not reached" : ""}</small><p>${x.prompt}</p>${x.correct ? `<p class="ans">Answer: ${x.correct}</p>` : ""}${x.why ? `<p class="muted">${x.why}</p>` : ""}</div>`; }).join("")}</div>` : `<p class="note">Full marks. Superb!</p>`}</div>
        <div class="row" style="justify-content:center;margin-top:22px"><button class="btn big" id="ag">Another go</button><a class="btn alt big" href="#/progress">View progress</a></div></div>`;
      $("#ag").onclick = function () { go("#/practice"); route(); }; window.scrollTo(0, 0); setTimeout(flushLevelUp, 1500);
    }
    G._stop = function () { over = true; clearInterval(iv); };
    iv = setInterval(function () { if (over) return; left--; if (left <= 0) { left = 0; clock(); end(); } else clock(); }, 1000);
    next();
  }

  /* ---------- progress ---------- */
  function radialSvg(ts, p) {
    var W = 1500, Hh = 1250, cx = W / 2, cy = Hh / 2, r1 = 215, r2 = 420, N = 0, out = "", ang = -Math.PI / 2;
    ts.forEach(function (t) { N += vLevels(t).length; });
    var gap = 0.04, total = Math.PI * 2 - gap * ts.length, short = function (s) { return s.length > 34 ? s.slice(0, 33) + "…" : s; };
    var pt = function (a, r) { return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
    ts.forEach(function (t, ti) {
      var ls = vLevels(t), span = total * ls.length / N, a0 = ang, mid = a0 + span / 2, col = "var(--c" + (ti % 4 + 1) + ")", tp = pt(mid, r1 + (ti % 2) * 60);
      ls.forEach(function (l, i) {
        var a = a0 + span * (i + .5) / ls.length, q = pt(a, r2), st = p.stars[l.id] || 0, right = Math.cos(a) >= 0, lp = pt(a, r2 + 12);
        out += `<path d="M${tp[0].toFixed(1)} ${tp[1].toFixed(1)} Q${pt(a, (r1 + r2) / 2 + 30)[0].toFixed(1)} ${pt(a, (r1 + r2) / 2 + 20)[1].toFixed(1)} ${q[0].toFixed(1)} ${q[1].toFixed(1)}" fill="none" stroke="${col}" stroke-width="2.5" opacity=".7"/>`;
        out += `<a href="#/l/${l.id}"><title>${esc(l.t)}</title><circle cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="8" fill="${st === 3 ? "var(--good)" : st ? "var(--accent-soft)" : "var(--surface)"}" stroke="${st === 1 ? "var(--gold)" : st === 2 ? "var(--accent)" : st === 3 ? "var(--good)" : col}" stroke-width="3"/>` +
          `<text x="${lp[0].toFixed(1)}" y="${(lp[1] + 5).toFixed(1)}" text-anchor="${right ? "start" : "end"}" class="mm-t">${short(l.t)}</text></a>`;
      });
      out = `<path d="M${cx} ${cy} L${tp[0].toFixed(1)} ${tp[1].toFixed(1)}" stroke="${col}" stroke-width="6" stroke-linecap="round"/>` + out;
      var words = t.name.split(" "), l1 = "", l2 = "";
      words.forEach(function (wd) { if ((l1 + " " + wd).trim().length <= 17 && !l2) l1 = (l1 + " " + wd).trim(); else l2 = (l2 + " " + wd).trim(); });
      if (l2.length > 18) l2 = l2.slice(0, 17) + "…";
      var w = Math.max(l1.length, l2.length) * 8.6 + 22, hh = l2 ? 48 : 34;
      out += `<a href="#/t/${t.id}"><title>${esc(t.name)}</title><rect x="${(tp[0] - w / 2).toFixed(1)}" y="${(tp[1] - hh / 2).toFixed(1)}" width="${w.toFixed(1)}" height="${hh}" rx="14" fill="${col}"/><text text-anchor="middle" class="mm-tt"><tspan x="${tp[0].toFixed(1)}" y="${(tp[1] + (l2 ? -3 : 5)).toFixed(1)}">${l1}</tspan>${l2 ? `<tspan x="${tp[0].toFixed(1)}" y="${(tp[1] + 15).toFixed(1)}">${l2}</tspan>` : ""}</text></a>`;
      ang += span + gap;
    });
    out += `<circle cx="${cx}" cy="${cy}" r="78" fill="var(--accent)"/><text x="${cx}" y="${cy - 2}" text-anchor="middle" class="mm-ct">${G.cfg.subject.length > 14 ? "GCSE" : G.cfg.subject}</text><text x="${cx}" y="${cy + 22}" text-anchor="middle" class="mm-cs">${N} units</text>`;
    return `<svg viewBox="0 0 ${W} ${Hh}" role="img" aria-label="Radial mind map of ${G.cfg.subject}">${out}</svg>`;
  }
  function viewMap() {
    shell("map");
    var p = P(), c = G.cfg, ts = vTopics(), showK = false;
    var all = allV(), done = all.filter(function (l) { return p.stars[l.id] === 3; }).length;
    var branches = ts.map(function (t, ti) {
      var s = topicStats(t), ls = vLevels(t);
      return `<section class="mm-br" style="--bc:var(--c${ti % 4 + 1})"><a class="mm-h" href="#/t/${t.id}"><span class="mm-ic">${t.icon}</span><span><b>${t.name}</b><small>${ls.length} units · ${Math.round(s.mastery)}% mastery${t.paper ? " · " + t.paper : ""}</small></span></a><ul>` +
        ls.map(function (l) { var st = p.stars[l.id] || 0; return `<li><a class="mm-leaf m${st}" href="#/l/${l.id}" title="${esc(l.k || "")}"><i></i><span>${l.t}${G.explainers[slug(l.t)] ? ' <em>animated</em>' : ""}</span></a>${l.k ? `<p class="mm-k">${l.k}</p>` : ""}</li>`; }).join("") + "</ul></section>";
    }).join("");
    app.innerHTML = pageHead(null, "Mind map", "The whole " + c.subject + " course on one page: every topic and unit. Tap a unit to learn it. Colours show your mastery.") +
      `<div class="row mm-tools"><button class="btn alt" id="mmk" aria-pressed="false">Show key ideas</button><span class="mm-leg"><i class="m0"></i>Not started <i class="m1"></i>Developing <i class="m2"></i>Secure <i class="m3"></i>Mastered</span></div>` +
      `<div class="tabs mm-views" role="tablist"><button class="tab on" id="vt" role="tab">Tree</button><button class="tab" id="vr" role="tab">Radial map</button></div>` +
      `<div class="mm-radial" id="mmr" hidden>${radialSvg(ts, p)}</div>` +
      `<div class="mm" id="mm"><div class="mm-root"><b>${c.subject}</b><small>${ts.length} topics · ${all.length} units · ${done} mastered</small></div><div class="mm-trunk"></div><div class="mm-branches">${branches}</div></div>`;
    $("#vt").onclick = function () { $("#mm").hidden = false; $("#mmr").hidden = true; $("#mmk").hidden = false; $("#vt").classList.add("on"); $("#vr").classList.remove("on"); };
    $("#vr").onclick = function () { $("#mm").hidden = true; $("#mmr").hidden = false; $("#mmk").hidden = true; $("#vr").classList.add("on"); $("#vt").classList.remove("on"); };
    $("#mmk").onclick = function () { showK = !showK; $("#mm").classList.toggle("showk", showK); this.setAttribute("aria-pressed", showK); this.textContent = showK ? "Hide key ideas" : "Show key ideas"; };
  }
  function eh(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function photoHtml(list) { return `<div class="photos">${list.map(function (x) { var f = x[0], u = "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(f) + "?width=900"; return `<figure class="photo"><img loading="lazy" src="${u}" alt="${esc(x[1])}" onerror="this.parentNode.classList.add('nopic')"><div class="nopicmsg">Photo could not load (it needs an internet connection): ${eh(x[1])}</div><figcaption><b>${eh(x[1])}</b>${x[2] ? `<span>${eh(x[2])}</span>` : ""}<a href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(f)}" target="_blank" rel="noopener noreferrer">Photo: Wikimedia Commons (author and licence)</a></figcaption></figure>`; }).join("")}</div>`; }
  G.photoHtml = photoHtml;
  function msHtml(q, id) {
    return `<h3>Mark scheme</h3><p class="muted sm">Tick each point you made. One mark per point, up to ${q.m}.</p><ul class="mslist">${q.ms.map(function (pt) { return `<li><label><input type="checkbox" class="msc ${id}"> <span>${eh(pt)}</span></label></li>`; }).join("")}</ul><div class="note"><b>Model answer</b><p>${eh(q.a)}</p>${q.tip ? `<p class="muted sm"><b>Exam tip:</b> ${eh(q.tip)}</p>` : ""}</div>`;
  }
  function viewExam(arg) {
    shell("exam"); var p = P(), E = G.exams;
    if (!E.length) { app.innerHTML = pageHead(null, "Written exams", "Written exam questions are coming soon for this subject."); return; }
    if (arg && /^paper\d+$/.test(arg)) return examPaper(+arg.slice(5));
    if (arg && /^q\d+$/.test(arg)) return examQuestion(+arg.slice(1));
    var done = Object.keys(p.exam).length, got = 0, max = 0; Object.keys(p.exam).forEach(function (k) { got += p.exam[k].got; max += p.exam[k].max; });
    var groups = {}; E.forEach(function (q, i) { (groups[q.t] = groups[q.t] || []).push(i); });
    app.innerHTML = pageHead(null, "Written exams", "Exam-style questions with mark schemes and model answers. Write your answer first, then mark it yourself against the scheme. This is how you learn what examiners reward.") +
      `<div class="statrow" style="max-width:640px"><div class="stat"><div class="ic">${ic("check")}</div><div><b>${done} / ${E.length}</b><span>Attempted</span></div></div><div class="stat"><div class="ic">${ic("target")}</div><div><b>${max ? Math.round(got / max * 100) + "%" : "–"}</b><span>Marks gained</span></div></div></div>` +
      `<div class="card"><h3>Timed written paper</h3><p class="muted">A set of questions with a countdown (about one minute per mark). Mark yourself at the end for a score and an indicative grade.</p><div class="row"><a class="btn big" href="#/exam/paper20">Short paper · ~20 marks</a><a class="btn alt big" href="#/exam/paper40">Standard paper · ~40 marks</a></div></div>` +
      Object.keys(groups).map(function (t) { return `<h2 class="sec">${eh(t)}</h2><div class="units">${groups[t].map(function (i) { var q = E[i], d = p.exam[i]; return `<a class="unit ${d ? "m" + (d.got >= d.max ? 3 : d.got / d.max >= .5 ? 2 : 1) : ""}" href="#/exam/q${i}"><span class="n">${d ? ic("check") : q.m}</span><div><b>${eh(q.q.length > 90 ? q.q.slice(0, 88) + "…" : q.q)}</b><div class="meta"><span class="tag">${q.m} marks</span></div></div><span class="state">${d ? d.got + "/" + d.max : "Try it"}</span></a>`; }).join("")}</div>`; }).join("");
  }
  function examQuestion(i) {
    var q = G.exams[i], p = P(); if (!q) { location.hash = "#/exam"; return; }
    app.innerHTML = pageHead([["Written exams", "#/exam"], ["Question " + (i + 1)]], eh(q.t), "") +
      `<div class="card"><div class="row"><span class="tag">${q.m} marks</span><span class="muted sm">Aim for about ${q.m} minute${q.m > 1 ? "s" : ""}</span></div><p class="exq">${eh(q.q)}</p><textarea class="field" id="ans" rows="${Math.min(14, 3 + q.m)}" placeholder="Write your answer here, then check it against the mark scheme."></textarea><div class="row" style="margin-top:12px"><button class="btn big" id="chk">Check my answer</button></div><div id="ms" hidden></div></div>`;
    $("#chk").onclick = function () {
      $("#chk").hidden = true; var ms = $("#ms"); ms.hidden = false;
      ms.innerHTML = msHtml(q, "q") + `<p class="exq"><b id="got">0</b> / ${q.m} marks</p><div class="row"><button class="btn big" id="sv">Save my score</button><a class="btn alt" href="#/exam/q${(i + 1) % G.exams.length}">Next question</a></div>`;
      var upd = function () { var n = Math.min(q.m, $$(".msc:checked", ms).length); $("#got").textContent = n; return n; };
      $$(".msc", ms).forEach(function (c) { c.onchange = upd; });
      $("#sv").onclick = function () { var n = upd(), old = p.exam[i]; if (!old || n > old.got) { p.exam[i] = { got: n, max: q.m, d: Date.now() }; } addXP(n * 3); save(); toast("check", "Score saved", n + " / " + q.m + " marks"); location.hash = "#/exam"; };
    };
  }
  function examPaper(total) {
    var E = G.exams, idx = shuffle(E.map(function (q, i) { return i; })), pick = [], marks = 0;
    for (var k = 0; k < idx.length && marks < total; k++) { if (marks + E[idx[k]].m <= total + 3) { pick.push(idx[k]); marks += E[idx[k]].m; } }
    var secs = marks * 60, iv, over = false;
    var fmt = function (s) { return Math.floor(s / 60) + ":" + pad2(s % 60); };
    app.innerHTML = pageHead([["Written exams", "#/exam"], ["Timed paper"]], "Written paper · " + marks + " marks", "Answer every question. Time allowed: " + marks + " minutes. Self-marking follows.") +
      `<div class="card"><div class="row" style="justify-content:space-between"><b>Time left: <span id="clk">${fmt(secs)}</span></b><button class="btn" id="fin">Finish and mark</button></div></div>` +
      pick.map(function (i, n) { var q = E[i]; return `<div class="card"><div class="row"><span class="tag">Q${n + 1}</span><span class="tag">${q.m} marks</span><span class="muted sm">${eh(q.t)}</span></div><p class="exq">${eh(q.q)}</p><textarea class="field" rows="${Math.min(12, 3 + q.m)}" placeholder="Your answer"></textarea></div>`; }).join("");
    var mark = function () {
      if (over) return; over = true; clearInterval(iv); G._stop = null;
      app.innerHTML = pageHead([["Written exams", "#/exam"], ["Mark your paper"]], "Mark your paper", "Be honest and strict. Tick a point only if your answer clearly made it.") +
        pick.map(function (i, n) { var q = E[i]; return `<div class="card" data-q="${n}"><div class="row"><span class="tag">Q${n + 1}</span><span class="tag">${q.m} marks</span></div><p class="exq">${eh(q.q)}</p>${msHtml(q, "p" + n)}<p class="exq"><b class="gt">0</b> / ${q.m}</p></div>`; }).join("") + `<div class="card"><button class="btn big" id="sc">Get my score</button></div>`;
      $$(".card[data-q]").forEach(function (c) { var q = E[pick[+c.dataset.q]]; $$(".msc", c).forEach(function (b) { b.onchange = function () { $(".gt", c).textContent = Math.min(q.m, $$(".msc:checked", c).length); }; }); });
      $("#sc").onclick = function () {
        var got = 0; $$(".card[data-q]").forEach(function (c) { var q = E[pick[+c.dataset.q]], n = Math.min(q.m, $$(".msc:checked", c).length); got += n; var old = p0.exam[pick[+c.dataset.q]]; if (!old || n > old.got) p0.exam[pick[+c.dataset.q]] = { got: n, max: q.m, d: Date.now() }; });
        var pc = Math.round(got / marks * 100), g = band(pc); p0.mocks.push({ d: Date.now(), pct: pc, n: pick.length, scope: "Written paper", secs: marks * 60 - Math.max(0, secs) }); if (p0.mocks.length > 12) p0.mocks.shift(); addXP(got * 2 + 20); save();
        app.innerHTML = `<div class="card result" style="max-width:700px"><div class="rm">${M(pc >= 60 ? "happy" : "think", 110)}</div>${ring(pc, 124, 11)}<h1>${got} / ${marks} marks</h1><p class="sub">${bandText(g)} (indicative only). Real grade boundaries change every year and differ by paper and tier, so use this to decide what to revise next.</p><div class="row" style="justify-content:center"><a class="btn big" href="#/exam">Back to written exams</a><a class="btn alt big" href="#/exam/paper${total}">Another paper</a></div></div>`;
      };
    };
    var p0 = P();
    iv = setInterval(function () { secs--; var c = $("#clk"); if (c) c.textContent = fmt(Math.max(0, secs)); if (secs <= 0) mark(); }, 1000);
    G._stop = function () { over = true; clearInterval(iv); };
    $("#fin").onclick = mark;
  }
  function findUnit(title) {
    var parts = title.split("::"), ids = Object.keys(G.levels), i, l;
    for (i = 0; i < ids.length; i++) { l = G.levels[ids[i]]; if (parts.length > 1 ? (l.topic.name === parts[0] && l.t === parts[1]) : l.t === title) return l; }
    return null;
  }
  function viewHowto(id) {
    shell("howto"); var p = P(), C = G.cases;
    if (!C.length) { app.innerHTML = pageHead(null, "How to?", "Real-life cases are coming soon for this subject."); return; }
    var cs = id && C.filter(function (x) { return x.id === id; })[0];
    if (!cs) {
      var sectors = []; C.forEach(function (x) { if (sectors.indexOf(x.sector) < 0) sectors.push(x.sector); });
      var done = Object.keys(p.cases).length, cur = "All", q = "";
      app.innerHTML = pageHead(null, "How to?", "Real-life questions, answered with the knowledge you are learning. Open a case, watch it explained, then jump back to the lessons behind it.") +
        `<div class="statrow" style="max-width:480px"><div class="stat"><div class="ic">${ic("check")}</div><div><b>${done} / ${C.length}</b><span>Cases explored</span></div></div></div>` +
        `<div class="hubsearch"><input id="hq" type="search" class="field" placeholder="Search cases, e.g. fireworks, rockets, rust..." aria-label="Search cases"></div><div class="rx-var" id="hs"><button class="chip on" data-s="All">All</button>${sectors.map(function (s) { return `<button class="chip" data-s="${esc(s)}">${eh(s)}</button>`; }).join("")}</div><div class="grid g2" id="hg"></div>`;
      var draw = function () {
        $("#hg").innerHTML = C.filter(function (x) { return (cur === "All" || x.sector === cur) && (!q || (x.title + " " + x.hook + " " + (x.tags || "")).toLowerCase().indexOf(q) >= 0); }).map(function (x) {
          return `<a class="tcard" href="#/howto/${x.id}"><div class="hd"><span class="num">${x.icon || "💡"}</span><div><h3>${eh(x.title)}</h3></div></div><p>${eh(x.hook)}</p><div class="ft"><span>${eh(x.sector)}${p.cases[x.id] ? " · explored" : ""}</span><span>${ic("play")}</span></div></a>`;
        }).join("") || '<p class="muted">No cases match. Try another word.</p>';
      };
      $("#hq").oninput = function () { q = this.value.toLowerCase().trim(); draw(); };
      $("#hs").onclick = function (e) { var b = e.target.closest("button"); if (!b) return; cur = b.dataset.s; $$("#hs .chip").forEach(function (x) { x.classList.toggle("on", x === b); }); draw(); };
      draw(); return;
    }
    var units = (cs.units || []).map(findUnit).filter(Boolean);
    app.innerHTML = pageHead([["How to?", "#/howto"], [cs.sector]], cs.title, "") +
      `<div class="card"><p class="lead" style="margin-top:0">${eh(cs.hook)}</p>${cs.scene ? '<div class="card scenecard" id="hscene"></div>' : ""}</div>` +
      (cs.steps ? `<div class="card"><h3>How it works, step by step</h3><ol class="wsteps">${cs.steps.map(function (s) { return `<li>${eh(s)}</li>`; }).join("")}</ol></div>` : "") +
      (cs.facts ? `<div class="card"><h3>Key facts and equations</h3><ul>${cs.facts.map(function (s) { return `<li>${G.fmtChem ? G.fmtChem(s) : eh(s)}</li>`; }).join("")}</ul></div>` : "") +
      (cs.photos ? `<div class="card"><h3>See it in real life</h3>${photoHtml(cs.photos)}</div>` : "") +
      (cs.vids ? `<div class="card"><h3>Watch</h3><div class="links">${cs.vids.map(function (v) { return `<a class="linkcard" href="${v[1]}" target="_blank" rel="noopener noreferrer"><span class="li">${ic("video")}</span><span><b>${eh(v[0])}</b><small>${eh(v[2] || "Video")}</small></span><span class="ext">${ic("arrow")}</span></a>`; }).join("")}</div></div>` : "") +
      (cs.think ? `<div class="card"><h3>Think like an expert</h3>${cs.think.map(function (x) { return `<details class="think"><summary>${eh(x[0])}</summary><p>${eh(x[1])}</p></details>`; }).join("")}</div>` : "") +
      (cs.safe ? `<p class="rx-safe"><b>Stay safe:</b> ${eh(cs.safe)}</p>` : "") +
      `<div class="card"><h3>Recall the knowledge</h3><p class="muted">This case uses ideas from these lessons. Revisit them to lock it in.</p><div class="rx-units">${units.map(function (l) { return `<a class="chip" href="#/l/${l.id}">${eh(l.t)}</a>`; }).join("")}${cs.lab ? `<a class="chip on" href="#/lab/${cs.lab}">Try the virtual experiment</a>` : ""}</div></div>`;
    if (cs.scene) A_.scene($("#hscene"), cs.scene);
    if (!p.cases[cs.id]) { p.cases[cs.id] = 1; addXP(10); save(); toast("check", "Case explored", "+10 XP"); }
  }
  function viewProgress() {
    shell("progress");
    var p = P(), o = overall(), ts = vTopics(), ready = o.a >= 25 ? Math.round(o.acc * (.35 + .65 * o.coverage) * 100) : null;
    var weak = ts.map(function (t) { return { t: t, s: topicStats(t) }; }).filter(function (x) { return x.s.a >= 5 && x.s.acc < 75; }).sort(function (a, b) { return a.s.acc - b.s.acc; }).slice(0, 3);
    var fresh = ts.map(function (t) { return { t: t, s: topicStats(t) }; }).filter(function (x) { return x.s.started === 0; }).slice(0, 3);
    var head = `<div class="hero"><div><div class="eyebrow">Readiness</div><h2>${ready === null ? "Not enough data yet" : bandText(band(ready))}</h2><p>${ready === null ? "Answer at least 25 questions and this panel will estimate where you are working, combining how much of the course you have covered with how accurate you are." : "An indicative estimate from your accuracy (" + Math.round(o.acc * 100) + "%) and how much of the course you have started (" + Math.round(o.coverage * 100) + "%). It is a guide, not a prediction."}</p></div>${ring(ready === null ? 0 : ready, 100, 10, ready === null ? "–" : ready + "%")}</div>`;
    var focus = weak.length || fresh.length ? `<h2 class="sec">Where to focus next</h2><div class="quick">${weak.map(function (x) { return `<a class="qlink" href="#/t/${x.t.id}"><div class="ic">${ic("target")}</div><div><b>${x.t.name}</b><span>${Math.round(x.s.acc)}% accuracy. Revisit and retry.</span></div></a>`; }).join("")}${fresh.map(function (x) { return `<a class="qlink" href="#/t/${x.t.id}"><div class="ic">${ic("book")}</div><div><b>${x.t.name}</b><span>Not started yet.</span></div></a>`; }).join("")}</div>` : "";
    var table = `<h2 class="sec">Topic mastery</h2><div class="card"><div class="heat"><div class="heatrow hd"><span>Topic</span><span class="track-h">Mastery</span><span class="v">Units</span><span class="v">Accuracy</span></div>${ts.map(function (t) { var s = topicStats(t); return `<div class="heatrow"><a href="#/t/${t.id}">${t.name}</a>${bar_(s.mastery, s.mastery >= 99 ? "good" : "")}<span class="v">${s.started}/${s.units}</span><span class="v">${s.acc === null ? "–" : Math.round(s.acc) + "%"}</span></div>`; }).join("")}</div></div>`;
    var mocks = p.mocks.slice(-8), hist = mocks.length ? `<h2 class="sec">Mock exam history</h2><div class="card"><div class="spark" role="img" aria-label="Mock exam scores">${mocks.map(function (m) { return `<div style="height:${Math.max(4, m.pct)}%" title="${new Date(m.d).toLocaleDateString()}: ${m.pct}%"><span>${m.pct}</span></div>`; }).join("")}</div><p class="muted sm" style="margin-top:8px">Most recent on the right. Latest: ${mocks[mocks.length - 1].pct}% on ${mocks[mocks.length - 1].scope}.</p></div>` : "";
    var bd = `<h2 class="sec">Achievements <small>${Object.keys(S.badges).length} of ${BADGES.length}</small></h2><div class="badges">${BADGES.map(function (b) { return `<div class="bdg ${S.badges[b.id] ? "got" : ""}"><div class="ic">${ic(b.icon)}</div><div><b>${b.name}</b><span>${b.desc}</span></div></div>`; }).join("")}</div>`;
    app.innerHTML = pageHead(null, "Progress", "How your revision is going in " + G.cfg.subject + ".") + head + focus + table + hist + bd;
  }

  /* ---------- my buddy ---------- */
  function viewLocker() {
    shell("locker");
    var u = unlocked(), L = lvl();
    function draw() {
      var cur = look(), mood = "happy";
      app.innerHTML = pageHead(null, "My buddy", "Meet Nova, your study buddy. Earn XP in any subject to level up and unlock new colours and gear.") +
        `<div class="locker"><div class="card lprev"><div id="lbig">${mascot(cur, mood, 220)}</div><div class="row" style="justify-content:center"><button class="btn small alt" data-mood="happy">Cheer</button><button class="btn small alt" data-mood="think">Think</button><button class="btn small alt" data-mood="wow">Wow</button><button class="btn small alt" data-mood="sad">Oops</button></div><p class="muted" style="margin-top:10px">Level ${L.i + 1}: <b>${L.cur.n}</b></p></div>
        <div><div class="card"><h3>Colour</h3><div class="swatches">${Object.keys(MASCOT_COLORS).map(function (k) { var ok = u.c[k] !== undefined, need = LEVELS.filter(function (x) { return x.color === k; })[0]; return `<button class="swatch ${cur.color === k ? "on" : ""} ${ok ? "" : "locked"}" data-c="${k}" ${ok ? "" : "disabled"} style="--sw:${MASCOT_COLORS[k][0]}" aria-label="${MASCOT_COLORS[k][2]}${ok ? "" : ", locked"}"><span>${ok ? "" : ic("lock")}</span><small>${ok ? MASCOT_COLORS[k][2] : "Level " + (LEVELS.indexOf(need) + 1)}</small></button>`; }).join("")}</div></div>
        <div class="card" style="margin-top:14px"><h3>Gear</h3><div class="swatches">${Object.keys(MASCOT_ACCS).map(function (k) { var ok = u.a[k] !== undefined, need = LEVELS.filter(function (x) { return x.acc === k; })[0]; return `<button class="swatch gear ${cur.acc === k ? "on" : ""} ${ok ? "" : "locked"}" data-a="${k}" ${ok ? "" : "disabled"}><span>${ok ? (k === "none" ? "–" : mascot({ color: cur.color, acc: k }, "idle", 54)) : ic("lock")}</span><small>${ok ? MASCOT_ACCS[k] : "Level " + (LEVELS.indexOf(need) + 1)}</small></button>`; }).join("")}</div></div></div></div>`;
      $$("[data-c]", app).forEach(function (b) { b.onclick = function () { S.look.color = b.dataset.c; save(); refreshTop(); draw(); sndTap(); }; });
      $$("[data-a]", app).forEach(function (b) { b.onclick = function () { S.look.acc = b.dataset.a; save(); refreshTop(); draw(); sndTap(); }; });
      $$("[data-mood]", app).forEach(function (b) { b.onclick = function () { $("#lbig").innerHTML = mascot(look(), b.dataset.mood, 220); if (b.dataset.mood === "happy") sndGood(2); }; });
    }
    draw();
  }

  /* ---------- reference pages ---------- */
  function viewLabs() {
    shell("labs");
    app.innerHTML = pageHead(null, "Labs", G.cfg.labsIntro) + `<div class="grid g2">${G.labs.map(function (l, i) { return `<a class="tcard" href="#/lab/${l.id}"><div class="hd"><span class="num">${pad2(i + 1)}</span><div><h3>${l.name}</h3></div></div><p>${l.desc}</p><div class="ft"><span>Interactive</span><span>${ic("play")}</span></div></a>`; }).join("")}</div>`;
  }
  function viewLab(id) {
    shell("labs");
    var l = G.labs.filter(function (x) { return x.id === id; })[0]; if (!l) return go("#/labs");
    app.innerHTML = pageHead([["Labs", "#/labs"], [l.name]], l.name, "") + '<div class="card labbox" id="lab"></div>';
    var api = {
      award: function (n, msg) { addXP(n); sndGood(2); popXP("+" + n + " XP"); var g = $(".goal", app); if (g && msg) g.innerHTML = msg + " +" + n + " " + UNIT; },
      ri: G.ri, pick: G.pick, fmt: fmt,
      slider: function (host, label, min, max, step, val, unit, fn) {
        var d = document.createElement("div"); d.className = "slider"; var id2 = "s" + Math.random().toString(36).slice(2);
        d.innerHTML = `<label for="${id2}">${label}</label><input id="${id2}" type="range" min="${min}" max="${max}" step="${step}" value="${val}"><span></span>`;
        host.appendChild(d); var inp = $("input", d), sp = $("span", d), f = function () { sp.textContent = inp.value + (unit ? " " + unit : ""); fn(parseFloat(inp.value)); };
        inp.oninput = f; sp.textContent = val + (unit ? " " + unit : ""); return { input: inp, set: function (v) { inp.value = v; f(); } };
      }
    };
    l.run($("#lab"), api);
  }
  function viewToolkit(tab) {
    shell("sheet"); tab = tab || "sheet"; var c = G.cfg, p = P(), body = "";
    if (tab === "sheet") body = '<div class="card">' + (c.sheetNote ? `<div class="note">${c.sheetNote}</div>` : "") + G.sheet.map(function (g) { return `<h2 class="sec2">${g.h}</h2><table class="eq"><tbody>${g.rows.map(function (r) { return `<tr><td style="width:38%">${r[0]}</td><td class="formula">${r[1]}</td>${r[2] ? `<td class="muted" style="font-size:14px">${r[2]}</td>` : "<td></td>"}</tr>`; }).join("")}</tbody></table>`; }).join("") + "</div>";
    else if (tab === "worked") {
      body = G.workedEx.length ? '<p class="muted">Work through each example one step at a time. Try the next step yourself before you reveal it.</p>' + G.workedEx.map(function (w, wi) { return `<div class="card wk" data-n="${w.s.length}"><span class="tag">${eh(w.t)}</span><h3>${eh(w.title)}</h3><p class="exq">${eh(w.p)}</p><ol class="wsteps">${w.s.map(function (s) { return `<li hidden>${eh(s)}</li>`; }).join("")}</ol><div class="note wans" hidden><b>Answer:</b> ${eh(w.a)}</div><button class="btn alt wnext">Show first step</button></div>`; }).join("") : '<div class="card">Worked examples are coming soon for this subject.</div>';
    } else if (tab === "hooks") {
      var found = 0, tot = 0; body = vTopics().map(function (t) { return `<h2 class="sec">${t.name}</h2><div class="album">${vLevels(t).map(function (l) { tot++; var has = p.read[l.id]; if (has) found++; return has ? `<div class="sticker"><b>${l.t}</b><span>${l.k}</span></div>` : `<a class="sticker locked" href="#/l/${l.id}"><b>${l.t}</b><span>Complete the lesson to unlock</span></a>`; }).join("")}</div>`; }).join("");
      body = `<p class="muted" style="margin-bottom:6px">Unlocked: ${found} of ${tot}</p>` + body;
    } else {
      var spec = c.specUrl ? c.specUrl : c.key === "maths" ? "https://www.aqa.org.uk/subjects/mathematics/gcse/mathematics-8300" : "https://www.aqa.org.uk/subjects/science/gcse/" + c.key + "-" + { physics: "8463", chemistry: "8462", biology: "8461" }[c.key];
      var L = [{ k: "globe", t: "AQA specification and past papers", d: "Official exam board pages", u: spec }, { k: "link", t: "BBC Bitesize: GCSE " + c.subject, d: "Revision notes, videos and quizzes", u: "https://www.bbc.co.uk/bitesize/search?q=" + encodeURIComponent("GCSE " + c.subject) }, { k: "video", t: "YouTube: " + (c.channel || (c.key === "maths" ? "Corbettmaths" : "Free Science Lessons")), d: "Popular free GCSE video channel", u: "https://www.youtube.com/results?search_query=" + encodeURIComponent((c.channel || (c.key === "maths" ? "Corbettmaths" : "Free Science Lessons")) + " GCSE") }, { k: "globe", t: "Seneca Learning", d: "Free GCSE courses", u: "https://senecalearning.com/en-GB/" }, { k: "globe", t: "Physics and Maths Tutor", d: "Free past papers and topic questions", u: "https://www.physicsandmathstutor.com/" }];
      (window.LINKS && window.LINKS[c.key] || []).forEach(function (x) { L.unshift({ k: x[2] || "link", t: x[0], d: x[3] || "Checked link", u: x[1] }); });
      body = `<div class="links">${L.map(function (x) { return `<a class="linkcard" href="${x.u}" target="_blank" rel="noopener noreferrer"><span class="li">${ic(x.k)}</span><span><b>${x.t}</b><small>${x.d}</small></span><span class="ext">${ic("arrow")}</span></a>`; }).join("")}</div><p class="muted sm" style="margin-top:10px">Links open external sites in a new tab and need an internet connection. Check which exam board and tier you are sitting.</p>`;
    }
    window.setTimeout(function () { $$(".wk").forEach(function (card) { var n = 0, tot = +card.dataset.n, btn = $(".wnext", card); btn.onclick = function () { var li = $$("li", card)[n]; if (li) li.hidden = false; n++; if (n >= tot) { $(".wans", card).hidden = false; btn.hidden = true; } else btn.textContent = "Show next step (" + (n + 1) + " of " + tot + ")"; }; }); }, 0);
    app.innerHTML = pageHead(null, "Toolkit", "") + `<div class="tabs" role="tablist">${[["sheet", c.sheetName], ["worked", "Worked examples"], ["hooks", "Memory hooks"], ["links", "Links and past papers"]].map(function (x) { return `<a role="tab" aria-selected="${tab === x[0]}" class="tab ${tab === x[0] ? "on" : ""}" href="#/toolkit/${x[0]}">${x[1]}</a>`; }).join("")}</div>` + body;
  }
  function viewSettings() {
    shell("settings");
    var st = S.settings, sci = sciCourse(), radio = function (name, val, text) { return `<label class="radio"><input type="radio" name="${name}" value="${val}" ${String(st[name]) === String(val) ? "checked" : ""}> <span>${text}</span></label>`; };
    app.innerHTML = pageHead(null, "Settings", "Settings apply to every subject.") + `<div style="max-width:720px">
      ${tiered() ? `<fieldset><legend>Exam tier</legend>${radio("tier", "H", "Higher (grades 4 to 9): shows everything")}${radio("tier", "F", "Foundation (grades 1 to 5): hides Higher-only units")}</fieldset>` : ""}
      ${sci ? `<fieldset><legend>Science course</legend>${radio("course", "S", "Separate science (Biology, Chemistry and Physics GCSEs)")}${radio("course", "C", "Combined Science: hides separate-only units")}</fieldset>` : ""}
      <fieldset><legend>Appearance</legend>${radio("theme", "auto", "Match my device")}${radio("theme", "dark", "Dark")}${radio("theme", "light", "Light")}</fieldset>
      <fieldset><legend>Study plan</legend><div class="row"><label for="goal" style="font-weight:700">Daily goal</label><select id="goal" class="field">${[50, 100, 200, 300, 500].map(function (g) { return `<option value="${g}"${st.goal === g ? " selected" : ""}>${g} ${UNIT}</option>`; }).join("")}</select><label for="exam" style="font-weight:700;margin-left:12px">First exam date</label><input type="date" id="exam" class="field" style="font-size:15px;width:auto" value="${st.examDate || ""}"></div></fieldset>
      <fieldset><legend>Sound</legend><label class="radio"><input type="checkbox" id="snd" ${st.sound ? "checked" : ""}> <span>Sound effects</span></label></fieldset>
      <fieldset><legend>Move your progress</legend><p class="muted sm" style="margin:0 0 8px">Progress saves in this browser. To move it to another device, copy this code, then paste it there and choose Load.</p><textarea id="code" aria-label="Progress code">${btoa(unescape(encodeURIComponent(JSON.stringify(S))))}</textarea><div class="row" style="margin-top:10px"><button class="btn small" id="imp">Load code</button><span id="msg" style="font-weight:700"></span></div></fieldset>
      <fieldset><legend>Start over</legend><button class="btn alt small" id="rs">Reset ${G.cfg.subject} progress</button></fieldset></div>`;
    $$("input[type=radio]", app).forEach(function (r) { r.onchange = function () { st[r.name] = r.value; save(); if (r.name === "theme") applyTheme(); refreshTop(); }; });
    $("#snd").onchange = function () { st.sound = this.checked; save(); }; $("#goal").onchange = function () { st.goal = +this.value; save(); refreshTop(); }; $("#exam").onchange = function () { st.examDate = this.value; save(); };
    $("#imp").onclick = function () { try { var o = JSON.parse(decodeURIComponent(escape(atob($("#code").value.trim())))); if (!o.subj) throw 0; S = normalise(o); S.lvl = lvl().i; save(); applyTheme(); $("#msg").textContent = "Progress loaded"; shell("settings"); } catch (e) { $("#msg").textContent = "That code isn't valid. Copy the whole code and try again."; } };
    var armed = false; $("#rs").onclick = function () { if (!armed) { armed = true; this.textContent = "Click again to confirm the reset"; return; } delete S.subj[G.cfg.key]; save(); go("#/"); };
  }

  /* router */
  function go(h) { location.hash = h; }
  function route() {
    detach(); removeBar(); if (G._stop) { G._stop(); G._stop = null; } A_stop();
    var h = location.hash.replace(/^#/, "") || "/", m; app.innerHTML = ""; app.onclick = null;
    if (h === "/") viewHome();
    else if ((m = h.match(/^\/t\/(.+)/))) viewTopic(m[1]);
    else if ((m = h.match(/^\/l\/(.+)/))) viewLevel(m[1]);
    else if ((m = h.match(/^\/(?:test|boss)\/(.+)/))) viewTest(m[1]);
    else if ((m = h.match(/^\/exam(?:\/(\w+))?/))) viewExam(m[1]);
    else if ((m = h.match(/^\/howto(?:\/([\w-]+))?/))) viewHowto(m[1]);
    else if (h === "/map") viewMap();
    else if (h === "/final") viewFinal(); else if (h === "/daily") viewDaily();
    else if (h === "/review" || h === "/gym") viewGym();
    else if (h === "/speed" || h === "/arcade") viewSpeed();
    else if (h === "/practice" || h === "/mock") viewPractice();
    else if (h === "/progress") viewProgress(); else if (h === "/locker") viewLocker();
    else if (h === "/labs") viewLabs(); else if ((m = h.match(/^\/lab\/(.+)/))) viewLab(m[1]);
    else if ((m = h.match(/^\/toolkit(?:\/(\w+))?/))) viewToolkit(m[1]);
    else if (h === "/sheet") viewToolkit("sheet"); else if (h === "/hooks" || h === "/tricks") viewToolkit("hooks");
    else if (h === "/settings") viewSettings();
    else viewHome();
  }
  G.start = function () {
    /* merge the extra question banks into their units */
    var bySlug = {}; Object.keys(G.levels).forEach(function (k) { bySlug[slug(G.levels[k].t)] = G.levels[k]; });
    G._more.forEach(function (o) { for (var title in o) { var l = title.indexOf("::") > -1 ? G.levels[slug(title.split("::")[0]) + "--" + slug(title.split("::")[1])] : bySlug[slug(title)]; if (!l) { console.warn("more(): no unit named", title); continue; } l.q = l.q.concat(o[title]); } });
    G._media.forEach(function (o) { for (var title in o) { var l = bySlug[slug(title)]; if (!l) { console.warn("media(): no unit named", title); continue; } var m = o[title]; if (m.pics) l.pics = (l.pics || []).concat(m.pics); if (m.vids) l.links = (l.links || []).concat(m.vids.map(function (v) { return [v[0], v[1], "video", v[2]]; })); } });
    applyTheme(); document.body.dataset.world = G.cfg.key; document.title = G.cfg.subject + " | GCSE Quest";
    document.body.innerHTML = '<div class="shell"><aside class="sidebar" id="bar"></aside><main class="main"><div class="topbar" id="topbar"></div><div class="wrap" id="app"></div></main></div><div id="toasts" aria-live="polite"></div>';
    app = $("#app"); window.addEventListener("hashchange", route); route();
    if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) { try { navigator.serviceWorker.register("sw.js"); } catch (e) {} }
  };
  G._test = { ask: askQuestion, normal: normal, parseNum: parseNum, state: function () { return S; }, visible: visible, band: band, route: route, slug: slug };
})();
