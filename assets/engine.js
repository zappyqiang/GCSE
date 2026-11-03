/* GCSE Quest engine. No dependencies; runs from a local folder. Content lives in /data. */
(function () {
  "use strict";
  var KEY = "gcsequest.v1", memStore = null;
  function blank() { return { settings: { tier: "H", course: "S", sound: true }, subj: {}, streak: { last: null, days: 0 } }; }
  function load() { try { var s = localStorage.getItem(KEY); if (s) return JSON.parse(s); } catch (e) {} return memStore || blank(); }
  var S = load();
  function save() { memStore = S; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

  var G = window.GAME = { topics: [], labs: [], diagrams: {}, sheet: [], cfg: null, levels: {} };
  G.configure = function (c) { G.cfg = c; };
  G.diagram = function (o) { for (var k in o) G.diagrams[k] = o[k]; };
  G.lab = function (l) { G.labs.push(l); };
  function slug(s) { return s.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  G.topic = function (name, icon, paper, levels, opts) {
    var t = { id: slug(name), name: name, icon: icon, paper: paper, levels: levels, s: opts && opts.s, blurb: opts && opts.blurb };
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
  function P() { var k = G.cfg.key; if (!S.subj[k]) S.subj[k] = { xp: 0, stars: {}, read: {}, missed: {}, bossDone: {}, arcade: 0, finalBest: 0 }; return S.subj[k]; }
  G.ri = function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); };
  G.pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
  G.shuf = shuffle;
  G.gcd = function (a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a; };

  function visible(l) { return !(l.h && S.settings.tier === "F") && !(l.s && S.settings.course === "C"); }
  function vLevels(t) { return t.levels.filter(visible); }
  function allV() { var r = []; G.topics.forEach(function (t) { r = r.concat(vLevels(t)); }); return r; }
  function tags(l) {
    return (l.h ? '<span class="tag h">Higher only</span>' : "") + (l.s ? '<span class="tag s">Separate science only</span>' : "") +
      (l.rp ? '<span class="tag r">Required practical</span>' : "");
  }

  /* sound */
  var ac = null;
  function beep(f, d, type) {
    if (!S.settings.sound) return;
    try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); var o = ac.createOscillator(), g = ac.createGain();
      o.type = type || "square"; o.frequency.value = f; g.gain.setValueAtTime(.05, ac.currentTime); g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + d);
      o.connect(g); g.connect(ac.destination); o.start(); o.stop(ac.currentTime + d);
    } catch (e) {}
  }
  function sndGood() { beep(660, .1); setTimeout(function () { beep(880, .14); }, 90); }
  function sndBad() { beep(170, .3, "sawtooth"); }
  function sndWin() { [523, 659, 784, 1047].forEach(function (f, i) { setTimeout(function () { beep(f, .16); }, i * 110); }); }

  function rank() { var r = G.cfg.ranks, x = P().xp, cur = r[0], nxt = null; for (var i = 0; i < r.length; i++) { if (x >= r[i][1]) { cur = r[i]; nxt = r[i + 1] || null; } } return { cur: cur, nxt: nxt }; }
  function addXP(n) { P().xp += n; tickStreak(); save(); var w = $("#wallet"); if (w) w.textContent = P().xp.toLocaleString() + " " + G.cfg.unit; }
  function tickStreak() {
    var d = new Date(), today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(), st = S.streak;
    if (st.last === today) return;
    var y = new Date(d - 864e5), yest = y.getFullYear() + "-" + (y.getMonth() + 1) + "-" + y.getDate();
    st.days = st.last === yest ? st.days + 1 : 1; st.last = today;
  }
  function gymDue() { var m = P().missed, n = Date.now(), c = 0; for (var k in m) if (m[k].due <= n) c++; return c; }

  /* shell */
  var app;
  function shell(active) {
    var c = G.cfg, nav = [["#/", "Map", "map"], ["#/arcade", c.arcade.name, "arcade"], ["#/labs", "Labs", "labs"], ["#/gym", "Mistake gym", "gym"], ["#/tricks", "Trick book", "tricks"], ["#/sheet", c.sheetName, "sheet"], ["#/settings", "Settings", "settings"]];
    $("#bar").innerHTML = '<a class="home" href="#/">' + CAST[c.a.char] + "<span>" + c.title + "</span></a><nav aria-label=\"Game sections\">" +
      nav.map(function (n) { var cnt = n[2] === "gym" && gymDue() ? '<span class="count">' + gymDue() + "</span>" : ""; return '<a href="' + n[0] + '" class="' + (active === n[2] ? "on" : "") + '">' + n[1] + cnt + "</a>"; }).join("") +
      '</nav><span class="wallet" id="wallet">' + P().xp.toLocaleString() + " " + c.unit + '</span><a class="exit" href="index.html">All subjects</a>';
    window.scrollTo(0, 0);
  }
  function trailHtml(items) {
    /* items: {href,icon,label,sub,cls,stars} */
    var rowH = 158, H = items.length * rowH + 20, pts = items.map(function (it, i) { return { x: 50 + 30 * Math.sin(i * 1.25 + .4), y: (i + .5) * rowH + 8 }; });
    var d = "M " + pts[0].x + " " + pts[0].y;
    for (var i = 1; i < pts.length; i++) { var a = pts[i - 1], b = pts[i], my = (a.y + b.y) / 2; d += " C " + a.x + " " + my + ", " + b.x + " " + my + ", " + b.x + " " + b.y; }
    var deco = "", D = G.cfg.decor;
    pts.forEach(function (p, i) { if (i % 2 === 0) deco += '<span class="decor" aria-hidden="true" style="left:' + (p.x > 50 ? 6 + (i * 7) % 12 : 80 + (i * 5) % 12) + "%;top:" + (p.y - 16) + 'px">' + D[i % D.length] + "</span>"; });
    return '<div class="trail" style="height:' + H + 'px"><svg class="road" viewBox="0 0 100 ' + H + '" preserveAspectRatio="none" aria-hidden="true"><path vector-effect="non-scaling-stroke" d="' + d + '"/></svg>' + deco +
      items.map(function (it, i) {
        return '<a class="stop ' + (it.cls || "") + '" href="' + it.href + '" style="left:' + pts[i].x + "%;top:" + (pts[i].y - 12) + 'px"><span class="coin" aria-hidden="true">' + it.icon + '</span><span class="lab">' + it.label + (it.sub ? "<small>" + it.sub + "</small>" : "") + "</span></a>";
      }).join("") + "</div>";
  }
  function starStr(n) { return n ? "★".repeat(n) + "☆".repeat(3 - n) : ""; }

  function sidePanel() {
    var p = P(), r = rank(), all = allV(), done = all.filter(function (l) { return p.stars[l.id]; }).length, c = G.cfg;
    var pct = r.nxt ? Math.min(100, (p.xp - r.cur[1]) / (r.nxt[1] - r.cur[1]) * 100) : 100;
    return '<aside class="side"><div class="sheet"><div class="mascots">' + CAST[c.a.char] + CAST[c.b.char] + '</div><h3 style="font-size:24px">' + r.cur[0] + '</h3><div class="rankbar"><i style="width:' + pct + '%"></i></div><div style="font-size:14px;font-weight:700">' +
      (r.nxt ? (r.nxt[1] - p.xp).toLocaleString() + " " + c.unit + " to " + r.nxt[0] : "Top rank reached") + '</div><hr style="border:0;border-top:2px dashed var(--ink);margin:10px 0">' +
      '<div class="statline"><span>Knowledge points</span><span>' + done + "/" + all.length + '</span></div><div class="rankbar"><i style="width:' + (all.length ? done / all.length * 100 : 0) + '%"></i></div>' +
      '<div class="statline"><span>Daily streak</span><span>' + (S.streak.days || 0) + (S.streak.days === 1 ? " day" : " days") + '</span></div><div class="statline"><span>' + c.arcade.name + ' best</span><span>' + p.arcade + '</span></div></div>' +
      '<a class="btn" style="text-align:center" href="#/daily">Daily 10 quick-fire</a><a class="btn alt" style="text-align:center" href="#/final">' + c.finalName + "</a></aside>";
  }

  /* ---------- screens ---------- */
  function viewMap() {
    shell("map");
    var p = P(), nextMarked = false, items = G.topics.filter(function (t) { return vLevels(t).length; }).map(function (t) {
      var ls = vLevels(t), d = ls.filter(function (l) { return p.stars[l.id]; }).length, cls = d === ls.length ? "done" : "";
      if (!cls && !nextMarked) { cls = "next"; nextMarked = true; }
      return { href: "#/t/" + t.id, icon: t.icon, label: t.name, sub: d + " of " + ls.length + " done" + (p.bossDone[t.id] ? ", boss beaten" : ""), cls: cls };
    });
    app.innerHTML = '<h1 class="title">' + G.cfg.title + '</h1><p class="lead">' + G.cfg.intro + '</p><div class="mapgrid"><div>' + trailHtml(items) + "</div>" + sidePanel() + "</div>";
  }
  function viewTopic(id) {
    shell("map");
    var t = G.topics.filter(function (x) { return x.id === id; })[0]; if (!t) return go("#/");
    var p = P(), ls = vLevels(t), nx = false;
    var items = ls.map(function (l) {
      var st = p.stars[l.id], cls = st ? "done" : ""; if (!st && !nx) { cls = "next"; nx = true; }
      return { href: "#/l/" + l.id, icon: l.icon || t.icon, label: l.t, sub: st ? '<span class="stars">' + starStr(st) + "</span>" : tagsShort(l), cls: cls };
    });
    items.push({ href: "#/boss/" + t.id, icon: "👹", label: bossName(t), sub: p.bossDone[t.id] ? '<span class="stars">Beaten</span>' : "Topic boss", cls: "boss" });
    app.innerHTML = '<div class="crumbs"><a href="#/">Map</a> &gt; ' + t.name + '</div><h1 class="title">' + t.icon + " " + t.name + '</h1><p class="lead">' + (t.blurb || "") + (t.paper ? " " + t.paper + "." : "") + '</p><div class="mapgrid"><div>' + trailHtml(items) + "</div>" + sidePanel() + "</div>";
  }
  function tagsShort(l) { var a = []; if (l.h) a.push("Higher"); if (l.s) a.push("Separate"); if (l.rp) a.push("Practical"); return a.join(", "); }
  function bossName(t) { var n = G.cfg.bossNames; var h = 0; for (var i = 0; i < t.id.length; i++) h += t.id.charCodeAt(i); return n[h % n.length] + " of " + t.name; }

  function viewLevel(id) {
    shell("map");
    var l = G.levels[id]; if (!l) return go("#/");
    var c = G.cfg, t = l.topic, panels = [];
    if (l.d && G.diagrams[l.d]) panels.push({ d: G.diagrams[l.d] });
    l.c.forEach(function (line, i) { panels.push({ who: i % 2 === 0 ? c.a : c.b, right: i % 2 === 1, line: line }); });
    panels.push({ trick: l.k });
    var shown = 0;
    app.innerHTML = '<div class="crumbs"><a href="#/">Map</a> &gt; <a href="#/t/' + t.id + '">' + t.name + '</a></div><h1 class="title">' + l.t + '</h1><div style="margin-bottom:12px">' + tags(l) + (l.r ? '<span class="tag">Spec ' + l.r + "</span>" : "") + '</div><div class="comic" id="comic"></div><div class="row" style="margin-top:16px" id="ctl"></div>';
    var box = $("#comic"), ctl = $("#ctl");
    function panelHtml(pn) {
      if (pn.d) return '<div class="cpanel diagram">' + pn.d + "</div>";
      if (pn.trick) return '<div class="trick"><h3>' + (c.trickName || "Memory trick") + "</h3><p>" + pn.trick + "</p></div>";
      return '<div class="cpanel ' + (pn.right ? "right" : "") + '"><div class="char">' + CAST[pn.who.char] + "<div>" + pn.who.name + '</div></div><div class="bubble">' + pn.line + "</div></div>";
    }
    function step() {
      if (shown < panels.length) { box.insertAdjacentHTML("beforeend", panelHtml(panels[shown])); shown++; var n = box.lastElementChild; if (shown > 1 && n.scrollIntoView) n.scrollIntoView({ block: "center", behavior: "smooth" }); }
      if (shown >= panels.length) {
        P().read[l.id] = 1; save();
        ctl.innerHTML = '<button class="btn" id="go">Start the challenge</button>';
        $("#go").onclick = function () { playLevel(l); }; $("#go").focus({ preventScroll: true });
      } else {
        ctl.innerHTML = '<button class="btn" id="nx">Next panel</button><button class="btn alt small" id="all">Show all</button>';
        $("#nx").onclick = step; $("#all").onclick = function () { while (shown < panels.length) step(); };
        $("#nx").focus({ preventScroll: true });
      }
    }
    step();
    if (panels[0].d) step();
  }
  function mkQ(raw, levelId, i) { return { raw: raw, qid: levelId + "#" + i, levelId: levelId }; }
  function playLevel(l) {
    var qs = l.q.map(function (q, i) { return mkQ(q, l.id, i); });
    battle({ title: l.t, foe: G.cfg.monsters[hashStr(l.id) % G.cfg.monsters.length], qs: shuffle(qs), hearts: 3, pts: 10, onWin: function (res) {
      var p = P(), st = res.mistakes === 0 ? 3 : res.mistakes <= 2 ? 2 : 1, was = p.stars[l.id] || 0;
      if (st > was) p.stars[l.id] = st;
      if (!was) addXP(25); save();
      resultScreen(st, res, { again: "#/l/" + l.id, next: nextAfter(l), label: l.t, first: !was });
    }, onLose: function (res) { loseScreen(res, function () { playLevel(l); }, "#/t/" + l.topic.id); } });
  }
  function hashStr(s) { var h = 3; for (var i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) >>> 0; return h; }
  function nextAfter(l) {
    var ls = vLevels(l.topic), i = ls.indexOf(l);
    return i < ls.length - 1 ? { href: "#/l/" + ls[i + 1].id, name: "Next: " + ls[i + 1].t } : { href: "#/boss/" + l.topic.id, name: "Face the topic boss" };
  }
  function poolFrom(ls, count) {
    var all = [];
    ls.forEach(function (l) { l.q.forEach(function (q, i) { all.push(mkQ(q, l.id, i)); }); });
    all = shuffle(all); var seen = {}, out = [];
    all.forEach(function (x) { if (!seen[x.levelId] && out.length < count) { seen[x.levelId] = 1; out.push(x); } });
    all.forEach(function (x) { if (out.indexOf(x) < 0 && out.length < count) out.push(x); });
    return shuffle(out);
  }
  function viewBoss(id) {
    shell("map");
    var t = G.topics.filter(function (x) { return x.id === id; })[0]; if (!t) return go("#/");
    app.innerHTML = '<div class="crumbs"><a href="#/">Map</a> &gt; <a href="#/t/' + t.id + '">' + t.name + "</a></div>";
    var name = bossName(t);
    battle({ title: name, foe: name, qs: poolFrom(vLevels(t), Math.min(12, Math.max(8, vLevels(t).length * 2))), hearts: 5, pts: 15, boss: true, onWin: function (res) {
      P().bossDone[t.id] = 1; addXP(100); save(); sndWin();
      resultScreen(res.mistakes <= 1 ? 3 : res.mistakes <= 3 ? 2 : 1, res, { again: "#/boss/" + t.id, next: { href: "#/", name: "Back to the map" }, label: name, bonus: 100 });
    }, onLose: function (res) { loseScreen(res, function () { viewBoss(id); }, "#/t/" + t.id); } });
  }
  function viewFinal() {
    shell("map");
    var name = G.cfg.finalName;
    battle({ title: name, foe: name, qs: poolFrom(allV(), 30), hearts: 7, pts: 20, boss: true, onWin: function (res) {
      var p = P(); p.finalBest = Math.max(p.finalBest, res.score); addXP(300); save(); sndWin();
      resultScreen(res.mistakes <= 2 ? 3 : res.mistakes <= 6 ? 2 : 1, res, { again: "#/final", next: { href: "#/", name: "Back to the map" }, label: name, bonus: 300 });
    }, onLose: function (res) { loseScreen(res, function () { viewFinal(); }, "#/"); } });
  }
  function viewDaily() {
    shell("map");
    battle({ title: "Daily 10", foe: "Daily 10", qs: poolFrom(allV(), 10), hearts: 3, pts: 12, onWin: function (res) {
      addXP(30); save(); resultScreen(res.mistakes === 0 ? 3 : res.mistakes <= 2 ? 2 : 1, res, { again: "#/daily", next: { href: "#/", name: "Back to the map" }, label: "Daily 10", bonus: 30 });
    }, onLose: function (res) { loseScreen(res, viewDaily, "#/"); } });
  }
  function viewGym() {
    shell("gym");
    var p = P(), n = Date.now(), ids = Object.keys(p.missed).filter(function (k) { return p.missed[k].due <= n; }), later = Object.keys(p.missed).length - ids.length;
    var list = ids.map(function (k) { var pr = k.split("#"), l = G.levels[pr[0]]; return l && l.q[+pr[1]] !== undefined ? mkQ(l.q[+pr[1]], pr[0], +pr[1]) : null; }).filter(Boolean);
    if (!list.length) {
      app.innerHTML = '<h1 class="title">Mistake gym</h1><div class="sheet"><p style="margin:0 0 10px;font-weight:700">Nothing to train right now.' + (later ? " " + later + " question" + (later > 1 ? "s" : "") + " will come back on a later day." : "") + '</p><p style="margin:0 0 14px">Any question you get wrong lands here. Get it right three times, days apart, and it leaves for good. Spacing like this is how facts stick for the exam.</p><a class="btn" href="#/">Back to the map</a></div>';
      return;
    }
    battle({ title: "Mistake gym", foe: "Mistake gym", qs: shuffle(list).slice(0, 15), hearts: 5, pts: 12, gym: true, onWin: function (res) {
      addXP(20); save(); resultScreen(res.mistakes === 0 ? 3 : res.mistakes <= 2 ? 2 : 1, res, { again: "#/gym", next: { href: "#/", name: "Back to the map" }, label: "Mistake gym", bonus: 20 });
    }, onLose: function (res) { loseScreen(res, viewGym, "#/"); } });
  }

  /* ---------- battle ---------- */
  function battle(o) {
    var c = G.cfg, queue = o.qs.slice(), total = queue.length, hits = 0, hearts = o.hearts, maxH = o.hearts, combo = 0, score = 0, mistakes = 0, retry = {};
    var host = document.createElement("div"); host.className = "arena";
    var keep = o.boss && $(".crumbs", app) ? $(".crumbs", app).outerHTML : "";
    app.innerHTML = keep; app.appendChild(host);
    host.innerHTML = '<h1 class="title" style="margin-bottom:0">' + o.title + '</h1><div class="hud"><span class="hearts" id="hearts" aria-live="polite"></span><span class="combo" id="combo"></span><span id="score"></span><span id="left"></span></div>' +
      '<div class="stage" id="stage"><div id="heroSpr">' + CAST[c.a.char] + '</div><div class="hpwrap"><div class="hpname">' + esc(o.foe) + '</div><div class="hp"><i id="hp" style="width:100%"></i></div></div><div id="foeSpr">' + drawMonster(o.foe, c.monsterColours) + '</div></div><div class="qbox" id="qb"></div>';
    function hud() {
      $("#hearts").textContent = "❤️".repeat(Math.max(hearts, 0)) + "🖤".repeat(Math.max(maxH - hearts, 0));
      $("#hearts").setAttribute("aria-label", hearts + " lives left");
      $("#combo").textContent = combo > 1 ? "Combo x" + Math.min(combo, 5) : "";
      $("#score").textContent = score + " " + c.unit;
      $("#left").textContent = hits + "/" + total + " hits";
      $("#hp").style.width = (100 - hits / total * 100) + "%";
    }
    function anim(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
    function next() {
      if (!queue.length) { o.onWin({ score: score, mistakes: mistakes, total: total }); return; }
      var q = queue.shift();
      askQuestion(q.raw, $("#qb"), function (ok, why, cont) {
        var p = P();
        if (ok) {
          hits++; combo++; var gain = o.pts * Math.min(combo, 5); score += gain; addXP(gain); sndGood();
          anim($("#heroSpr"), "lunge"); anim($("#foeSpr"), "hit");
          var pw = document.createElement("div"); pw.className = "pow"; pw.textContent = G.pick(c.pows); $("#stage").appendChild(pw); setTimeout(function () { pw.remove(); }, 620);
          if (o.gym && p.missed[q.qid]) { var m = p.missed[q.qid]; m.box++; if (m.box >= 3) delete p.missed[q.qid]; else m.due = Date.now() + [1, 3, 7][m.box] * 864e5; }
        } else {
          hearts--; combo = 0; mistakes++; sndBad();
          anim($("#heroSpr"), "sad");
          p.missed[q.qid] = { box: 0, due: Date.now() };
          queue.push(q); total = Math.max(total, 0); /* the question returns until it lands */
        }
        save(); hud();
        cont(function () {
          if (hearts <= 0) o.onLose({ score: score, mistakes: mistakes, total: total }); else next();
        });
      });
    }
    hud(); next();
  }

  /* one question: calls done(firstTryCorrect, why, cont) */
  function normal(raw) { return typeof raw === "function" ? raw() : raw; }
  function fbk(box, ok, why, proceed) {
    var f = document.createElement("div"); f.className = "feedback " + (ok ? "ok" : "no");
    f.innerHTML = "<p><b>" + (ok ? G.pick(G.cfg.cheers) : "Not this time") + "</b>" + (why || "") + '</p><button class="btn small" id="cont">Continue</button>';
    box.appendChild(f); var b = $("#cont", f); b.onclick = function () { detach(); proceed(); }; b.focus({ preventScroll: true });
    f.scrollIntoView && f.scrollIntoView({ block: "nearest" });
  }
  var keyHandler = null;
  function detach() { if (keyHandler) { document.removeEventListener("keydown", keyHandler); keyHandler = null; } }
  function attach(fn) { detach(); keyHandler = fn; document.addEventListener("keydown", fn); }
  function askQuestion(raw, box, done) {
    var q = normal(raw), k = q[0], finish = function (ok, why, extra) { detach(); done(ok, why, function (proc) { fbk(box, ok, (extra || "") + (why || ""), proc); }); };
    box.innerHTML = "";
    if (k === "m" || k === "t") {
      var prompt = q[1], opts, why;
      if (k === "m") { opts = [{ h: q[2], ok: true }, { h: q[3] }, { h: q[4] }, { h: q[5] }].filter(function (x, i, arr) { return x.h !== undefined && x.h !== null && arr.map(function (y) { return String(y.h); }).indexOf(String(x.h)) === i; }); why = q[6]; opts = shuffle(opts); }
      else { opts = [{ h: "True", ok: q[2] === true }, { h: "False", ok: q[2] === false }]; why = q[3]; prompt = '<span style="font-family:var(--display);font-weight:400">True or false?</span> ' + prompt; }
      box.innerHTML = '<p class="prompt">' + prompt + '</p><div class="choices">' + opts.map(function (o, i) { return '<button class="choice" data-i="' + i + '"><span class="kb">' + (i + 1) + "</span><span>" + o.h + "</span></button>"; }).join("") + "</div>";
      var answered = false;
      var pickI = function (i) {
        if (answered) return; answered = true;
        var ok = !!opts[i].ok;
        $$(".choice", box).forEach(function (b, j) { b.disabled = true; if (opts[j].ok) b.classList.add("right"); if (j === i && !ok) b.classList.add("wrong"); });
        finish(ok, why);
      };
      $$(".choice", box).forEach(function (b) { b.onclick = function () { pickI(+b.dataset.i); }; });
      attach(function (e) { var n = +e.key; if (n >= 1 && n <= opts.length) pickI(n - 1); });
      return;
    }
    if (k === "n" || k === "w") {
      box.innerHTML = '<p class="prompt">' + q[1] + '</p><form class="typed"><input id="ans" aria-label="Your answer" autocomplete="off" ' + (k === "n" ? 'inputmode="text"' : "") + ">" + (k === "n" && q[3] ? '<span class="unit">' + q[3] + "</span>" : "") + '<button class="btn small">Check</button></form>';
      var inp = $("#ans", box), form = $("form", box); inp.focus({ preventScroll: true });
      form.onsubmit = function (e) {
        e.preventDefault(); var v = inp.value.trim(); if (!v) return;
        inp.disabled = true; $("button", form).disabled = true;
        if (k === "n") {
          var ans = q[2], num = parseNum(v), tol = q[5] !== undefined ? q[5] : Math.max(Math.abs(ans) * .001, 1e-9);
          var ok = num !== null && Math.abs(num - ans) <= tol;
          finish(ok, q[4], ok ? "" : "The answer is " + fmt(ans) + (q[3] ? " " + q[3] : "") + ". ");
        } else {
          var norm = function (s) { return s.toLowerCase().replace(/[^a-z0-9+\-]/g, ""); }, list = q[2], ok2 = list.some(function (a) { return norm(a) === norm(v); });
          finish(ok2, q[3], ok2 ? "" : "The answer is " + list[0] + ". ");
        }
      };
      return;
    }
    if (k === "p") {
      var pairs = q[2], L = shuffle(pairs.map(function (p, i) { return { t: p[0], i: i }; })), R = shuffle(pairs.map(function (p, i) { return { t: p[1], i: i }; }));
      box.innerHTML = '<p class="prompt">' + q[1] + '</p><div class="pairs"><div>' + L.map(function (x) { return '<button class="tile" data-s="L" data-i="' + x.i + '">' + x.t + "</button>"; }).join("") + "</div><div>" + R.map(function (x) { return '<button class="tile" data-s="R" data-i="' + x.i + '">' + x.t + "</button>"; }).join("") + "</div></div>";
      var sel = null, left = pairs.length, err = false;
      $$(".tile", box).forEach(function (b) {
        b.onclick = function () {
          if (b.classList.contains("done")) return;
          if (!sel || sel.dataset.s === b.dataset.s) { if (sel) sel.classList.remove("sel"); sel = b; b.classList.add("sel"); return; }
          if (sel.dataset.i === b.dataset.i) { [sel, b].forEach(function (x) { x.classList.remove("sel"); x.classList.add("done"); x.disabled = true; }); beep(740, .07); sel = null; left--; if (!left) finish(!err, q[3] || "All matched."); }
          else { err = true; var a = sel; sel = null; a.classList.remove("sel"); [a, b].forEach(function (x) { x.classList.add("oops"); setTimeout(function () { x.classList.remove("oops"); }, 420); }); sndBad(); }
        };
      });
      return;
    }
    if (k === "s") {
      var bins = Object.keys(q[2]), items = [];
      bins.forEach(function (b) { q[2][b].forEach(function (t) { items.push({ t: t, b: b }); }); }); items = shuffle(items);
      box.innerHTML = '<p class="prompt">' + q[1] + '</p><div class="item" id="it"></div><div class="bins">' + bins.map(function (b, i) { return '<button class="bin" data-b="' + esc(b) + '">' + b + "<small>Key " + (i + 1) + "</small></button>"; }).join("") + "</div>";
      var idx = 0, serr = false, show = function () { $("#it", box).innerHTML = items[idx].t + ' <small style="font-size:15px;font-family:var(--body)">(' + (idx + 1) + "/" + items.length + ")</small>"; };
      var choose = function (bn, el) {
        if (idx >= items.length) return;
        if (items[idx].b === bn) { beep(740, .07); idx++; if (idx >= items.length) { $("#it", box).textContent = "All sorted"; finish(!serr, q[3] || "Everything is in the right place."); } else show(); }
        else { serr = true; sndBad(); if (el) { el.classList.add("sad"); setTimeout(function () { el.classList.remove("sad"); }, 500); } }
      };
      $$(".bin", box).forEach(function (b) { b.onclick = function () { choose(b.dataset.b.replace(/&amp;/g, "&").replace(/&quot;/g, '"'), b); }; });
      attach(function (e) { var n = +e.key; if (n >= 1 && n <= bins.length) choose(bins[n - 1], $$(".bin", box)[n - 1]); });
      show(); return;
    }
    if (k === "o") {
      var seq = q[2], tiles = shuffle(seq.map(function (t, i) { return { t: t, i: i }; }));
      box.innerHTML = '<p class="prompt">' + q[1] + '</p><div class="ordered" id="od"></div><div class="choices">' + tiles.map(function (x) { return '<button class="tile" data-i="' + x.i + '">' + x.t + "</button>"; }).join("") + "</div>";
      var pos = 0, oerr = false;
      $$(".tile", box).forEach(function (b) {
        b.onclick = function () {
          if (+b.dataset.i === pos) { $("#od", box).insertAdjacentHTML("beforeend", "<div>" + seq[pos] + "</div>"); b.style.display = "none"; beep(740, .07); pos++; if (pos === seq.length) finish(!oerr, q[3] || "That's the right order."); }
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

  function resultScreen(st, res, o) {
    detach(); sndWin();
    var c = G.cfg;
    app.innerHTML = '<div class="sheet result"><div class="mascots" style="justify-content:center">' + CAST[c.a.char] + CAST[c.b.char] + '</div><h1 style="font-size:38px">' + G.pick(c.wins) + '</h1><div class="bigstars" aria-label="' + st + ' out of 3 stars">' + "★".repeat(st) + '<span class="off">' + "★".repeat(3 - st) + "</span></div><p style=\"font-weight:800;margin:8px 0\">" + o.label + ": " + res.score + " " + c.unit + (o.first ? " plus 25 for a new knowledge point" : "") + (o.bonus ? " plus a " + o.bonus + " bonus" : "") + (res.mistakes ? ". Slips: " + res.mistakes + " (now in the Mistake gym)" : ". No slips") + '.</p><div class="row" style="justify-content:center;margin-top:14px"><a class="btn" id="nxt" href="' + o.next.href + '">' + o.next.name + '</a><a class="btn alt" href="' + o.again + '">Play again</a></div></div>';
    if (location.hash === o.again) { $$(".btn.alt", app)[0].onclick = function (e) { e.preventDefault(); route(); }; }
    $("#nxt").focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
  function loseScreen(res, retry, backHref) {
    detach();
    var c = G.cfg;
    app.innerHTML = '<div class="sheet result"><div class="mascots" style="justify-content:center">' + CAST[c.b.char] + '</div><h1 style="font-size:36px">Out of lives</h1><p style="font-weight:700;max-width:50ch;margin:8px auto">You kept the ' + res.score + " " + c.unit + ' you won. Your slips are saved in the Mistake gym, so you can drill them. Reread the comic if a fact feels shaky, then go again.</p><div class="row" style="justify-content:center"><button class="btn" id="re">Try again</button><a class="btn alt" href="' + backHref + '">Back</a></div></div>';
    $("#re").onclick = retry; $("#re").focus({ preventScroll: true }); window.scrollTo(0, 0);
  }

  /* ---------- arcade ---------- */
  function arcadeQ(ls) {
    for (var tries = 0; tries < 60; tries++) {
      var l = G.pick(ls), q = normal(G.pick(l.q)), k = q[0];
      if (k === "m") { var a = q.slice(2, 6).filter(function (x, i, arr) { return x !== undefined && x !== null && arr.indexOf(x) === i; }); if (a.join("").length < 200) return { p: q[1], opts: shuffle(a.map(function (t, i) { return { t: t, ok: i === 0 }; })), why: q[6] }; }
      else if (k === "t") return { p: "True or false? " + q[1], opts: [{ t: "True", ok: q[2] === true }, { t: "False", ok: q[2] === false }], why: q[3] };
      else if (k === "n") {
        var ans = q[2], u = q[3] ? " " + q[3] : "", set = {}; set[fmt(ans)] = 1;
        var dist = [ans * 2, ans / 2, ans + 1, ans - 1, ans * 10, ans / 10, ans + 2].map(function (x) { return Math.round(x * 1e4) / 1e4; }).filter(function (x) { if (set[fmt(x)]) return false; set[fmt(x)] = 1; return true; }).slice(0, 3);
        return { p: q[1], opts: shuffle([{ t: fmt(ans) + u, ok: true }].concat(dist.map(function (d) { return { t: fmt(d) + u }; }))), why: q[4] };
      }
    }
    return null;
  }
  function viewArcade() {
    shell("arcade");
    var c = G.cfg, A = c.arcade, topics = G.topics.filter(function (t) { return vLevels(t).length; });
    app.innerHTML = '<h1 class="title">' + A.name + '</h1><p class="lead">' + A.blurb + ' You have 90 seconds and 3 lives. Click the right answer, or press its number key, before it escapes.</p><div class="sheet"><div class="row"><label for="asc" style="font-weight:800">Topic</label><select id="asc" style="border:var(--line);border-radius:9px;padding:6px"><option value="">Everything</option>' + topics.map(function (t) { return '<option value="' + t.id + '">' + t.name + "</option>"; }).join("") + '</select><button class="btn" id="st">Start</button><span style="font-weight:800">Best score: ' + P().arcade + "</span></div></div>";
    $("#st").onclick = function () {
      var id = $("#asc").value, ls = id ? vLevels(G.topics.filter(function (t) { return t.id === id; })[0]) : allV();
      runArcade(ls);
    };
  }
  function runArcade(ls) {
    var c = G.cfg, A = c.arcade, reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    app.innerHTML = '<div class="arena"><div class="hud"><span class="hearts" id="ah"></span><span class="combo" id="ac"></span><span id="as"></span><span id="at"></span></div><div class="aprompt" id="ap" aria-live="polite"></div><div class="field" id="af"></div></div>';
    var f = $("#af"), lives = 3, score = 0, combo = 0, timeLeft = 90, speed = 1, sprites = [], cur = null, raf = 0, last = 0, over = false, lock = false;
    function hud() { $("#ah").textContent = "❤️".repeat(Math.max(lives, 0)) + "🖤".repeat(3 - Math.max(lives, 0)); $("#ac").textContent = combo > 1 ? "Combo x" + Math.min(combo, 5) : ""; $("#as").textContent = score + " " + c.unit; $("#at").textContent = Math.ceil(timeLeft) + "s"; }
    function spawn() {
      cur = arcadeQ(ls); if (!cur) { end(); return; }
      lock = false; $("#ap").innerHTML = cur.p; f.innerHTML = ""; sprites = [];
      var W = f.clientWidth, H = f.clientHeight, n = cur.opts.length, vert = (A.dir === "up" || A.dir === "down") && W >= 640;
      cur.opts.forEach(function (o, i) {
        var b = document.createElement("button"); b.className = "sprite"; b.innerHTML = '<span class="kb">' + (i + 1) + "</span><i>" + A.sprite + "</i><span>" + o.t + "</span>";
        if (vert) b.style.maxWidth = (W / n - 14) + "px";
        f.appendChild(b);
        var w = b.offsetWidth, h = b.offsetHeight, s = { el: b, o: o, w: w, h: h }, jitter = Math.random() * (reduced ? 0 : (vert ? 50 : 120));
        if (vert) { s.x = (i + .5) * W / n - w / 2; s.y = A.dir === "down" ? -h - jitter : H + jitter; }
        else { var laneH = H / n; s.y = (i + .5) * laneH - h / 2; s.x = A.dir === "left" ? W + jitter : -w - jitter; }
        if (reduced) { if (vert) s.y = H / 2 - h / 2; else s.x = W / 2 - w / 2; }
        s.vert = vert; sprites.push(s); place(s);
        b.onclick = function () { hitSprite(s); };
      });
    }
    function place(s) { s.el.style.transform = "translate(" + s.x + "px," + s.y + "px)"; }
    function hitSprite(s) {
      if (lock || over) return; lock = true;
      if (s.o.ok) { combo++; var g = 10 * Math.min(combo, 5); score += g; addXP(g); sndGood(); speed = Math.min(2.2, speed + .04); s.el.style.background = "#b8f2cf"; setTimeout(spawn, 260); }
      else { miss(); s.el.style.background = "#ffc4cb"; sprites.forEach(function (x) { if (x.o.ok) x.el.style.background = "#b8f2cf"; }); }
      hud();
    }
    function miss() { lives--; combo = 0; sndBad(); hud(); if (lives <= 0) { setTimeout(end, 700); } else setTimeout(spawn, 850); }
    function tick(t) {
      if (over) return; var dt = last ? Math.min(.05, (t - last) / 1000) : 0; last = t;
      timeLeft -= dt; if (timeLeft <= 0) { end(); return; }
      if (!lock && !reduced) {
        var W = f.clientWidth, H = f.clientHeight, gone = 0, v = A.speed * speed * (W < 640 ? .75 : 1);
        sprites.forEach(function (s) {
          if (s.vert) { s.y += (A.dir === "down" ? 1 : -1) * v * dt * H / 440; if (A.dir === "down" ? s.y > H : s.y + s.h < 0) gone++; }
          else { s.x += (A.dir === "left" ? -1 : 1) * v * dt * 1.6; if (A.dir === "left" ? s.x + s.w < 0 : s.x > W) gone++; }
          place(s);
        });
        if (gone === sprites.length && sprites.length) { lock = true; miss(); }
      }
      if (Math.floor(timeLeft + dt) !== Math.floor(timeLeft)) hud();
      raf = requestAnimationFrame(tick);
    }
    function end() {
      if (over) return; over = true; cancelAnimationFrame(raf); detach();
      var p = P(), best = score > p.arcade; if (best) p.arcade = score; save(); sndWin();
      app.innerHTML = '<div class="sheet result"><h1 style="font-size:38px">' + (best ? "New best score" : "Round over") + '</h1><p style="font-weight:800;font-size:22px;margin:8px 0">' + score + " " + c.unit + '</p><div class="row" style="justify-content:center"><button class="btn" id="ag">Play again</button><a class="btn alt" href="#/">Back to the map</a></div></div>';
      $("#ag").onclick = function () { runArcade(ls); };
    }
    attach(function (e) { var n = +e.key; if (n >= 1 && n <= sprites.length) hitSprite(sprites[n - 1]); });
    hud(); spawn(); if (!over) raf = requestAnimationFrame(tick);
    G._stopArcade = function () { over = true; cancelAnimationFrame(raf); };
  }

  /* ---------- reference pages ---------- */
  function viewLabs() {
    shell("labs");
    app.innerHTML = '<h1 class="title">Labs</h1><p class="lead">' + G.cfg.labsIntro + '</p><div class="grid2">' + G.labs.map(function (l) { return '<a class="card" href="#/lab/' + l.id + '"><div class="ic" aria-hidden="true">' + l.icon + "</div><h3>" + l.name + "</h3><p>" + l.desc + "</p></a>"; }).join("") + "</div>";
  }
  function viewLab(id) {
    shell("labs");
    var l = G.labs.filter(function (x) { return x.id === id; })[0]; if (!l) return go("#/labs");
    app.innerHTML = '<div class="crumbs"><a href="#/labs">Labs</a> &gt; ' + l.name + '</div><h1 class="title">' + l.icon + " " + l.name + '</h1><div class="sheet labbox" id="lab"></div>';
    var api = {
      award: function (n, msg) { addXP(n); sndGood(); var g = $(".goal", app); if (g && msg) g.innerHTML = msg + " +" + n + " " + G.cfg.unit; },
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
    app.innerHTML = '<h1 class="title">' + G.cfg.sheetName + '</h1><div class="sheet">' + (G.cfg.sheetNote ? '<div class="note">' + G.cfg.sheetNote + "</div>" : "") +
      G.sheet.map(function (g) { return "<h2 style=\"font-size:24px;margin-top:12px\">" + g.h + '</h2><table class="eq"><tbody>' + g.rows.map(function (r) { return '<tr><td style="width:40%">' + r[0] + '</td><td class="formula">' + r[1] + "</td>" + (r[2] ? '<td style="font-size:14.5px">' + r[2] + "</td>" : "<td></td>") + "</tr>"; }).join("") + "</tbody></table>"; }).join("") + "</div>";
  }
  function viewTricks() {
    shell("tricks");
    var p = P(), found = 0, tot = 0;
    var body = G.topics.filter(function (t) { return vLevels(t).length; }).map(function (t) {
      return '<h2 style="font-size:24px">' + t.icon + " " + t.name + '</h2><div class="album">' + vLevels(t).map(function (l) {
        tot++; var has = p.read[l.id]; if (has) found++;
        return has ? '<div class="sticker"><b>' + l.t + "</b><span>" + l.k + '</span></div>' : '<a class="sticker locked" style="text-decoration:none" href="#/l/' + l.id + '"><b>' + l.t + "</b><span>Read this level to collect it</span></a>";
      }).join("") + "</div>";
    }).join("");
    app.innerHTML = '<h1 class="title">Trick book</h1><p class="lead">Every memory trick you find sticks in here, ready for last-minute revision. Collected: ' + found + " of " + tot + '.</p><div class="sheet">' + body + "</div>";
  }
  function viewSettings() {
    shell("settings");
    var st = S.settings, sci = G.cfg.key !== "maths";
    app.innerHTML = '<h1 class="title">Settings</h1><div class="sheet"><fieldset><legend>Exam tier</legend><label class="radio"><input type="radio" name="tier" value="H" ' + (st.tier === "H" ? "checked" : "") + '> Higher (grades 4 to 9), shows everything</label><label class="radio"><input type="radio" name="tier" value="F" ' + (st.tier === "F" ? "checked" : "") + '> Foundation (grades 1 to 5), hides Higher-only levels</label></fieldset>' +
      (sci ? '<fieldset><legend>Science course</legend><label class="radio"><input type="radio" name="course" value="S" ' + (st.course === "S" ? "checked" : "") + '> Separate science (Biology, Chemistry and Physics GCSEs)</label><label class="radio"><input type="radio" name="course" value="C" ' + (st.course === "C" ? "checked" : "") + '> Combined Science, hides separate-only levels</label></fieldset>' : "") +
      '<fieldset><legend>Sound</legend><label class="radio"><input type="checkbox" id="snd" ' + (st.sound ? "checked" : "") + '> Sound effects</label></fieldset>' +
      '<fieldset><legend>Move your progress</legend><p style="margin:0 0 8px">Progress saves automatically in this browser. To move it to another computer or browser, copy this code, then paste it there and choose Load.</p><textarea id="code" aria-label="Progress code">' + btoa(unescape(encodeURIComponent(JSON.stringify(S)))) + '</textarea><div class="row" style="margin-top:8px"><button class="btn small" id="imp">Load code</button><span id="msg" style="font-weight:800"></span></div></fieldset>' +
      '<fieldset><legend>Start over</legend><button class="btn alt small" id="rs">Reset ' + G.cfg.subject + ' progress</button></fieldset></div>';
    $$('input[type=radio]', app).forEach(function (r) { r.onchange = function () { st[r.name] = r.value; save(); }; });
    $("#snd").onchange = function () { st.sound = this.checked; save(); };
    $("#imp").onclick = function () { try { var o = JSON.parse(decodeURIComponent(escape(atob($("#code").value.trim())))); if (!o.subj) throw 0; S = o; save(); $("#msg").textContent = "Progress loaded"; shell("settings"); } catch (e) { $("#msg").textContent = "That code isn't valid. Copy the whole code and try again."; } };
    var armed = false; $("#rs").onclick = function () { if (!armed) { armed = true; this.textContent = "Click again to confirm the reset"; return; } delete S.subj[G.cfg.key]; save(); go("#/"); };
  }

  /* router */
  function go(h) { location.hash = h; }
  function route() {
    detach(); if (G._stopArcade) { G._stopArcade(); G._stopArcade = null; }
    var h = location.hash.replace(/^#/, "") || "/", m;
    app.innerHTML = "";
    if (h === "/") viewMap();
    else if ((m = h.match(/^\/t\/(.+)/))) viewTopic(m[1]);
    else if ((m = h.match(/^\/l\/(.+)/))) viewLevel(m[1]);
    else if ((m = h.match(/^\/boss\/(.+)/))) viewBoss(m[1]);
    else if (h === "/final") viewFinal();
    else if (h === "/daily") viewDaily();
    else if (h === "/gym") viewGym();
    else if (h === "/arcade") viewArcade();
    else if (h === "/labs") viewLabs();
    else if ((m = h.match(/^\/lab\/(.+)/))) viewLab(m[1]);
    else if (h === "/sheet") viewSheet();
    else if (h === "/tricks") viewTricks();
    else if (h === "/settings") viewSettings();
    else viewMap();
  }
  G.start = function () {
    document.body.dataset.world = G.cfg.key;
    document.title = G.cfg.title + " | GCSE " + G.cfg.subject;
    document.body.innerHTML = '<header class="bar" id="bar"></header><main class="wrap" id="app"></main>';
    app = $("#app");
    window.addEventListener("hashchange", route);
    route();
  };
  /* used by automated tests */
  G._test = { ask: askQuestion, normal: normal, parseNum: parseNum, state: function () { return S; }, visible: visible };
})();
