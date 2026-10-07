// sw.js — Fresh Fish Market service worker
// Strategy: NETWORK FIRST for everything on this site (pages, CSS, JS, images),
// so customers always get the latest version when online. The cache is only
// used when the phone is offline. Change VERSION when you upload big changes.
const VERSION = 'ffm-v8';
const CACHE = VERSION;

const APP_SHELL = [
  './',
  './index.html',
  './offline.html',
  './manifest.json',
  './images/logo-mark.svg',
  './icons/icon-192.png'
];

// Payments and the order webhook always go straight to the network.
const NEVER_CACHE = ['razorpay.com', 'script.google.com', 'script.googleusercontent.com'];

// CDN libraries (versioned URLs, never change) can be served from cache.
const CDN_HOSTS = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(c => c.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (NEVER_CACHE.some(h => url.hostname.includes(h))) return;

  // Own files: always try the network first (bypassing the browser's HTTP cache).
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(req, { cache: 'no-cache' })
        .then(res => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req, { ignoreSearch: true })
          .then(r => r || (req.mode === 'navigate' ? caches.match('./offline.html') : undefined)))
    );
    return;
  }

  // CDN files: cache first, they never change at the same URL.
  if (CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(res => {
        if (res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }))
    );
  }
});
