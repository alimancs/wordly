const CACHE_NAME = "wordly-cache-v1";
const urlToCache = [ "./offline.html", "./index.html", "./favicon.ico" ];

const self = this;
// service worker install
self.addEventListener('install', ( event ) => {
    event.waitUntil(
        (async () => {
            try {
                const cache = await caches.open(CACHE_NAME);
                await cache.addAll(urlToCache);
            } catch (err) {
                console.log('Caching install error: ', err.message);
            }
        })()
    )
});

// service worker listen for request
self.addEventListener('fetch', (event) => {
    console.log('Service worker running fetch')
    event.respondWith( 
        (async () => {
            try {
                const fetchResponse = await fetch(event.request);
                return fetchResponse;
            } catch {
                const cacheResponse = await caches.match(event.request);
                if (cacheResponse) return cacheResponse;

                if ( event.request.mode === 'navigate') {
                    // If the request is a navigation request, return the offline page
                    return await caches.match('offline.html');
                }                

                return new Response('You are offline and no cached data is available.', {
                    status: 503,
                    statusText: 'Service Unavailable'
                });

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