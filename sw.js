const CACHE_NAME = 'sh90-v18';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Install - precache essential files
self.addEventListener('install', (event) => {
  console.log('SH-90 Service Worker v18 installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Precaching essential files...');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('SH-90 Service Worker v18 activating...');
  event.waitUntil(
    caches.keys()
      .then((keys) => {
        return Promise.all(
          keys.filter(key => key !== CACHE_NAME).map(key => {
            console.log('Deleting old cache:', key);
            return caches.delete(key);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch - Cache first for assets, network first for API
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Cache first strategy for static assets
  if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image' ||
    request.destination === 'font' ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.json') ||
    url.origin.includes('cdn')
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cached) => {
          if (cached) {
            console.log('Cache hit:', url.pathname);
            // Return cached, but update in background
            fetch(request).then((response) => {
              if (response.ok) cache.put(request, response.clone());
            }).catch(() => {});
            return cached;
          }
          // Not in cache, fetch and cache
          return fetch(request).then((response) => {
            if (response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          });
        });
      })
    );
    return;
  }

  // Network first for HTML/navigation
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, response.clone());
          });
        }
        return response;
      })
      .catch(() => {
        // Offline - serve from cache
        return caches.match(request).then((cached) => {
          if (cached) {
            console.log('Offline - serving from cache:', url.pathname);
            return cached;
          }
          // For navigation, return index.html
          if (request.mode === 'navigate') {
            return caches.match('/index.html').then((index) => {
              return index || caches.match('/');
            });
          }
        });
      })
  );
});