self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('accessflow-cache').then((cache) => {
      return cache.addAll([
        'index.html',
        'register.html',
        'dashboard.html',
        'style.css',
        'app.js'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
