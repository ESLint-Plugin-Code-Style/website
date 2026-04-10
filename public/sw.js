// Service worker for eslint-plugin-code-style website
// Strategy: cache-first for static assets, network-first for HTML, fallback to /offline

const CACHE_NAME = "code-style-docs-v1";

const OFFLINE_URL = "/offline";

const PRECACHE_URLS = [
    "/",
    "/offline",
    "/manifest.json",
    "/icon.svg",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)),
    );

    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames
                .filter((name) => name !== CACHE_NAME)
                .map((name) => caches.delete(name)),
        )),
    );

    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    const { request } = event;

    if (request.method !== "GET") return;

    const url = new URL(request.url);

    if (url.origin !== self.location.origin) return;

    // Network-first strategy for HTML pages with offline fallback
    if (request.mode === "navigate" || request.headers.get("accept")?.includes("text/html")) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const clonedResponse = response.clone();

                    caches.open(CACHE_NAME).then((cache) => cache.put(request, clonedResponse));

                    return response;
                })
                .catch(() => caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL))),
        );

        return;
    }

    // Cache-first strategy for static assets
    event.respondWith(
        caches.match(request).then((cached) => {
            if (cached) return cached;

            return fetch(request).then((response) => {
                if (response.ok && response.type === "basic") {
                    const clonedResponse = response.clone();

                    caches.open(CACHE_NAME).then((cache) => cache.put(request, clonedResponse));
                }

                return response;
            });
        }),
    );
});
