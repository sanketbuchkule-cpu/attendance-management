// Changing the version number to v3 forces the browser to see this as a NEW app
const CACHE_NAME = 'attendance-v17'; 

self.addEventListener('install', (event) => {
    // This line forces the new, fixed code to take over immediately
    self.skipWaiting(); 
});

self.addEventListener('activate', (event) => {
    // This deletes the old "broken" cache automatically
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Always try the network first so redirects don't get stuck
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
