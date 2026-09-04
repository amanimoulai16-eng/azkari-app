const CACHE_NAME = 'azkari-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './audio/sabah.mp3',
  './audio/masaa.mp3',
  './audio/baed-al-wodoa.mp3',
  './audio/al-3awda-lel-manzl.mp3',
  './audio/kabla-al-khorodj.mp3',
  './audio/baed-al-azan.mp3',
  './audio/baed-al-salah.mp3',
  './audio/nawm.mp3',
  './audio/al-estiqaz.mp3',
  './audio/safar.mp3',
  './audio/adia-djamiaa.mp3'
];

// تثبيت الـ Service Worker وتخزين الملفات
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// تفعيل وتحديث الكاش القديم
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// جلب البيانات من الذاكرة إذا كان بدون إنترنت
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
