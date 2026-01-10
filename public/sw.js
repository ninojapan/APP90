const CACHE_NAME = 'sh90-v24';
const STATIC_CACHE = 'sh90-static-v24';

// Essential URLs to cache immediately
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/icon-512.png'
];

// Install - precache ALL necessary files
self.addEventListener('install', (event) => {
  console.log('SH-90 Service Worker v24 installing...');
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then(async (cache) => {
        console.log('Precaching static files...');
        await cache.addAll(PRECACHE_URLS);

        // Fetch index.html and extract all assets
        const indexResponse = await fetch('/index.html');
        const indexText = await indexResponse.text();

        // Extract script and link tags
        const scriptMatches = indexText.matchAll(/src="([^"]+)"/g);
        const cssMatches = indexText.matchAll(/href="([^"]+\.css)"/g);
        const jsonMatches = indexText.matchAll(/href="([^"]+\.json)"/g);
        const pngMatches = indexText.matchAll(/href="([^"]+\.png)"/g);

        const assetUrls = [];
        for (const match of scriptMatches) {
          assetUrls.push(match[1]);
        }
        for (const match of cssMatches) {
          assetUrls.push(match[1]);
        }
        for (const match of jsonMatches) {
          assetUrls.push(match[1]);
        }
        for (const match of pngMatches) {
          assetUrls.push(match[1]);
        }

        console.log('Caching assets:', assetUrls);

        // Cache all extracted assets
        for (const url of assetUrls) {
          try {
            const response = await fetch(url);
            if (response.ok) {
              await cache.put(url, response);
            }
          } catch (err) {
            console.warn('Failed to cache:', url);
          }
        }

        console.log('All assets cached successfully!');
      })
    ]).then(() => {
      console.log('Installation complete - ready for offline!');
      return self.skipWaiting();
    })
  );
});

// Activate - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('SH-90 Service Worker v24 activating...');
  event.waitUntil(
    caches.keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter(key => key !== CACHE_NAME && key !== STATIC_CACHE)
            .map(key => {
              console.log('Deleting old cache:', key);
              return caches.delete(key);
            })
        );
      })
      .then(() => {
        console.log('Activation complete - claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch - Cache first for everything (full offline support)
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        console.log('Serving from cache:', request.url);
        // Return from cache immediately, update in background if online
        if (navigator.onLine) {
          fetch(request)
            .then((response) => {
              if (response.ok) {
                caches.open(STATIC_CACHE).then((cache) => {
                  cache.put(request, response.clone());
                });
              }
            })
            .catch(() => {});
        }
        return cached;
      }

      // Not in cache - fetch and cache
      return fetch(request)
        .then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Offline and not in cache
          console.error('Offline and resource not cached:', request.url);

          // For navigation, try to serve index.html
          if (request.mode === 'navigate') {
            return caches.match('/index.html').then((index) => {
              return index || caches.match('/');
            });
          }
        });
    })
  );
});