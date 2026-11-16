// Keeps the app shell (HTML/CSS/JS/icons) available so the installed app opens fast.
// Network first, so a new deploy shows up on the next launch; data (/api) is never cached.
const CACHE = 'minh-os-v2';
// Paths are relative to where sw.js lives, so it works at / (Flask) and at /todo-app/ (GitHub Pages).
const SHELL = ['./', 'static/style.css', 'static/app.js', 'manifest.webmanifest', 'static/icons/icon-192.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => { }));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin || /\/(api|login|logout)(\/|$)/.test(u.pathname)) return;
  e.respondWith(
    fetch(e.request).then(r => {
      if (r.ok && !r.redirected) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return r;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./')))
  );
});
