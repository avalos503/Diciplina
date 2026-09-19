const CACHE = "diciplina-v2";

function scopeBase() {
  const path = self.location.pathname;
  return path.endsWith("sw.js") ? path.slice(0, -5) : "/";
}

self.addEventListener("install", (event) => {
  const base = scopeBase();
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      cache.addAll([base, `${base}manifest.json`, `${base}icon.svg`]),
    ),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.pathname.includes("/_next/") || url.pathname.includes("hot-update")) {
    return;
  }
  const base = scopeBase();
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() =>
        caches.match(event.request).then((cached) => cached || caches.match(base)),
      ),
  );
});
