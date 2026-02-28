/* ═══════════════════════════════════════════════
   LevelUp Life — Service Worker v6
   Estratégia: Cache First + Network Fallback
═══════════════════════════════════════════════ */

const CACHE_NAME = 'levelup-v6';
const OFFLINE_URL = '/index.html';

// Todos os arquivos para cache inicial
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // Google Fonts (cacheado para funcionar offline)
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap',
];

// ── INSTALL ──
self.addEventListener('install', event => {
  console.log('[SW] Installing LevelUp Life v6...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache recursos locais (fontes podem falhar em dev, ok)
      return cache.addAll(PRECACHE_URLS.filter(u => !u.startsWith('http')))
        .then(() => {
          // Tenta cachear fontes separadamente (falha silenciosa)
          return cache.addAll(
            PRECACHE_URLS.filter(u => u.startsWith('http'))
          ).catch(() => console.log('[SW] Fonts não cacheadas (sem conexão)'));
        });
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE ──
self.addEventListener('activate', event => {
  console.log('[SW] Activating LevelUp Life v6...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => {
              console.log('[SW] Deletando cache antigo:', key);
              return caches.delete(key);
            })
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH ──
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignora requests não-GET e extensões do browser
  if (request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;
  if (url.protocol === 'moz-extension:') return;

  // Estratégia: Cache First para assets, Network First para HTML
  if (request.destination === 'document') {
    // HTML: Network first, fallback para cache
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(OFFLINE_URL))
    );
  } else {
    // Assets (CSS, JS, fonts, images): Cache first
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return response;
        }).catch(() => {
          // Fallback para ícone padrão se imagem não disponível
          if (request.destination === 'image') {
            return caches.match('/icons/icon-192.png');
          }
        });
      })
    );
  }
});

// ── PUSH NOTIFICATIONS ──
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'Mantenha seu streak em dia! 🔥',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/' },
    actions: [
      { action: 'open',    title: 'Abrir App' },
      { action: 'dismiss', title: 'Dispensar' }
    ],
    tag: 'levelup-notification',
    requireInteraction: false,
  };
  event.waitUntil(
    self.registration.showNotification(
      data.title || '⚡ LevelUp Life', options
    )
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'dismiss') return;
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        return clients.openWindow(event.notification.data.url || '/');
      })
  );
});

// ── BACKGROUND SYNC ──
self.addEventListener('sync', event => {
  if (event.tag === 'sync-tasks') {
    console.log('[SW] Background sync: tasks');
  }
});

console.log('[SW] LevelUp Life Service Worker carregado ✓');
