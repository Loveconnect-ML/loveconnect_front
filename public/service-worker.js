// service-worker.js

self.addEventListener('activate', event => {
    event.waitUntil((async () => {
      if ('navigationPreload' in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })());
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith((async () => {
      // Check if the request is a navigation request
      if (event.request.mode === 'navigate') {
        // Try to get the preloaded response
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }
      }
  
      // Fallback to network fetch if no preloadResponse
      return fetch(event.request);
    })());
  });