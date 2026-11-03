/* Offline support: cache the app shell and content so GCSE Quest works without internet. Bump VERSION when files change. */
const VERSION = "gcsequest-v2-2";
const FILES = ["./", "index.html", "maths.html", "physics.html", "chemistry.html", "biology.html", "manifest.json", "assets/game.css", "assets/icon.svg", "assets/icons.js", "assets/mascot.js", "assets/anim.js", "assets/engine.js", "assets/fonts/nunito.woff2", "data/anim-biology.js", "data/anim-chemistry.js", "data/anim-maths.js", "data/anim-physics.js", "data/biology-1.js", "data/biology-2.js", "data/biology-3.js", "data/biology-config.js", "data/biology-labs.js", "data/chemistry-1.js", "data/chemistry-2.js", "data/chemistry-3.js", "data/chemistry-config.js", "data/chemistry-labs.js", "data/counts.js", "data/maths-algebra.js", "data/maths-config.js", "data/maths-geometry.js", "data/maths-labs.js", "data/maths-number.js", "data/maths-prob-stats.js", "data/maths-ratio.js", "data/more-biology.js", "data/more-chemistry.js", "data/more-maths.js", "data/more-physics.js", "data/more-ws.js", "data/physics-1.js", "data/physics-2.js", "data/physics-config.js", "data/physics-labs.js", "data/science-ws.js"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request).then((hit) => {
    const net = fetch(e.request).then((r) => { if (r.ok) { const copy = r.clone(); caches.open(VERSION).then((c) => c.put(e.request, copy)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
