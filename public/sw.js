// public/sw.js
// Sog'lomBola AI — Service Worker (offline-first)
// =====================================================

const CACHE_NAME = 'soglom-bola-v1';
const STATIC_ASSETS = [
  '/',
  '/insights',
  '/booking',
  '/baby-mode',
  '/profile',
  '/manifest.json',
];

// Install: cache asosiy fayllar
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: eski cachelarni tozalash
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch: network-first for /api, cache-first for static
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API requests: network-first (D-Med ma'lumotlari yangi bo'lishi kerak)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const cloned = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(request, cloned));
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Static assets: cache-first
  event.respondWith(
    caches.match(request).then((cached) => {
      return (
        cached ||
        fetch(request).then((res) => {
          if (res.ok && request.method === 'GET') {
            const cloned = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(request, cloned));
          }
          return res;
        })
      );
    })
  );
});

// Push notifications (kelajak uchun)
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  const title = data.title || 'Sog\'lomBola eslatmasi';
  const options = {
    body: data.body || 'Bugungi vazifani bajarish vaqti keldi',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    vibrate: [200, 100, 200],
    data: data.url || '/',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data || '/'));
});
