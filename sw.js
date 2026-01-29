const CACHE_NAME = "poomozhi-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/images/icon-192.png",
  "/images/icon-512.png",
  "/images/rose.webp",
  "/images/sunflower.jpg",
  "/images/garland.jpg",
  "/images/logo.jpeg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
