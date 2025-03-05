self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("static-cache").then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./manifest.json",
        "./favicon.ico",
        // Add other assets you want to cache
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
