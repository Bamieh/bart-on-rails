var appCacheName = 'offline-first-app-v0'

self.addEventListener('activate', function(event) {
  var cacheNames = caches.keys();

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.All(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('offline-first-app-') &&
            cacheName !== appCacheName
        }).map(function(cacheName) {
          cache.delete(cacheName);
        })
      )
    })
  );
})
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(appCacheName).then(function(cache) {
      cache.addAll([
        '/',
      ])
    })
  )
})
self.addEventListener('fetch', function(event) {
console.log(event.request);
 event.respondWith(
  caches.match(event.request).then(function(response) {
    return response || fetch(event.request);
  })
  )
});
