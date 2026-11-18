// Service worker: caches the whole app (including every flag) so it works offline.
// Bump VERSION whenever you change any file, so phones pick up the new version.
const VERSION = 'worldly-v5';
importScripts('data.js'); // defines COUNTRIES

const CORE = [
  './', 'index.html', 'styles.css', 'app.js', 'data.js', 'map.js', 'mapquiz.js', 'config.js', 'sync.js',
  'facts/africa.js', 'facts/asia-oceania.js', 'facts/europe-americas.js', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png', 'icons/favicon-32.png',
];
const FLAGS = COUNTRIES.map(c => `flags/${c.code}.svg`);

self.addEventListener('install', e => {
  // cache: 'reload' skips the browser's HTTP cache so a new version never stores stale files.
  const reqs = [...CORE, ...FLAGS].map(u => new Request(u, { cache: 'reload' }));
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(reqs)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).origin !== location.origin) return; // e.g. sync requests: always go to the network
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(res => {
      if (res.ok && new URL(e.request.url).origin === location.origin) {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match('index.html')))
  );
});
