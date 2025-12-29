const CACHE_NAME = 'dealeron-v2'; // Changed version to force update

self.addEventListener('install', (event) => {
    self.skipWaiting(); // Forces the new service worker to take over immediately
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
