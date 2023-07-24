const staticCacheName = 's-app-v1';
const dynamicCacheName = 'd-app-v1';
const assetUrls = ['index.html', '/js/app.js', '/css/styles.css'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(staticCacheName).then((cache) => cache.addAll(assetUrls)));
});

self.addEventListener('activate', async () => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter((name) => name !== staticCacheName)
      .filter((name) => name !== dynamicCacheName)
      .map((name) => caches.delete(name)),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  return cached ?? (await fetch(request));
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName);
  try {
    const response = await fetch(request);

    if (!response || response.status !== 200 || response.type !== 'basic') {
      return response;
    }

    await cache.put(request, response.clone());
    return response;
  } catch (e) {
    const cached = await cache.match(request);
    return cached ?? (await caches.match('/offline.html'));
  }
}
