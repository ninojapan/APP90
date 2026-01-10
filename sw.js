const CACHE_NAME = 'sh90-v17';

// Install - activate immediately
self.addEventListener('install', (event) => {
  console.log('SH-90 Service Worker v17 installing...');
  self.skipWaiting();
});

// Activate - take control immediately
self.addEventListener('activate', (event) => {
  console.log('SH-90 Service Worker v17 activating...');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => {
          console.log('Deleting old cache:', key);
          return caches.delete(key);
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch - Network first, cache fallback
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return fetch(event.request)
        .then((response) => {
          // Cache successful responses
          if (response.ok) {
            cache.put(event.request, response.clone());
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache when offline
          return cache.match(event.request).then((cached) => {
            if (cached) {
              console.log('Serving from cache:', event.request.url);
              return cached;
            }
            // For navigation requests, return index.html
            if (event.request.mode === 'navigate') {
              return cache.match('/index.html').then((indexCached) => {
                return indexCached || cache.match('./index.html');
              });
            }
            throw new Error('No cache available');
          });
        });
    })
  );
});