// Service Worker for improved performance and offline capabilities

const CACHE_NAME = 'academic-site-v1';

// Assets to cache on install
const urlsToCache = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/index.js',
    '/images/shengbin.png',
    // Add your other essential assets here
    '/favicon.ico',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js',
    'https://kit.fontawesome.com/430daef422.js',
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,700;1,400&display=swap'
];

// Install event - cache essential assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache if available, otherwise fetch from network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return the response from cache
                if (response) {
                    return response;
                }
                
                // Clone the request because it's a one-time use stream
                const fetchRequest = event.request.clone();
                
                return fetch(fetchRequest).then(response => {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Clone the response because it's a one-time use stream
                    const responseToCache = response.clone();
                    
                    // Open cache and store the fetched response
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            // Only cache same-origin requests
                            if (event.request.url.startsWith(self.location.origin)) {
                                cache.put(event.request, responseToCache);
                            }
                        });
                    
                    return response;
                });
            })
    );
});

// Handle offline fallback
self.addEventListener('fetch', event => {
    // Check if the request is for an HTML page
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match('/offline.html');
            })
        );
    }
});