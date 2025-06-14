const CACHE_NAME = "wordly-cache-v1.32";
const urlToCache = [ "./offline.html", "./favicon.ico", "./wordly_logo.png", "/favorites" ];

const self = this;
// service worker install
self.addEventListener('install', ( event ) => {
    event.waitUntil(
        (async () => {
            try {
                const cache = await caches.open(CACHE_NAME);
                await cache.addAll(urlToCache);
                self.skipWaiting();
            } catch (err) {
                console.log('Service install error: ', err.message);
            }
        })()
    )
});

// service worker listen for request
self.addEventListener('fetch', (event) => {
    console.log('Service worker running fetch');

    if ( event.request.mode === 'navigate' ) {
        // If the request is a navigation request, we can return the offline page
        event.respondWith(
            (async () => {
                try {
                    const fetchResponse = await fetch(event.request);
                    return fetchResponse;
                } catch {
                    const path = new URL(event.request.url).pathname;
                    console.log(path);
                    if (path === "/favorites") {
                        return await caches.match( '/favorites');
                    }
                    // If the fetch fails (e.g., offline), we return the cached favorites page
                    return await caches.match( '/offline.html');
                }
            })()
        );
        return;
    }

    // cache first strategy for other requests
    event.respondWith(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            // Check if the request is already in the cache
            const cachedResponse = await cache.match(event.request);
            if (cachedResponse) return cachedResponse;

            try {
                const fetchResponse = await fetch(event.request);
                // If the fetch is successful, we return the response and also cache it
                if (fetchResponse && fetchResponse.status === 200 && fetchResponse.type === 'basic' && event.request.destination !== 'manifest') {
                    // Clone the response before putting it in the cache
                    // This is necessary because the response can only be used once
                    await cache.put(event.request, fetchResponse.clone());
                }
                return fetchResponse;
            } catch (err) {
                console.error('Error fetching resource from network:', err.message);
            }
        })()
    )
});

// service worker activation
self.addEventListener('activate', ( event ) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    event.waitUntil(
        (async () => {
            const cacheNames = await caches.keys();
            Promise.all(
                cacheNames.map( ( cacheName ) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        caches.delete(cacheName);
                    }
                })
            )
        })()
    )
})