import { defaultCache } from "@serwist/next/worker";
import { CacheableResponsePlugin, NetworkFirst, Serwist } from "serwist";
// import * as navigationPreload from 'workbox-navigation-preload';
// import { Strategy } from "serwist";
// import { NavigationRoute } from 'workbox-routing';
// import { NetworkFirst } from 'workbox-strategies';
// import { CacheableResponsePlugin } from 'serwist/cacheable-response';
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js')
//       .then(registration => {
//         console.log('Service Worker registered with scope:', registration.scope);
//       })
//       .catch(error => {
//         console.error('Service Worker registration failed:', error);
//       });
//   });
// }


const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

// class CacheNetworkRace extends Strategy {
//   _handle(request, handler) {
//     const fetchAndCachePutDone = handler.fetchAndCachePut(request);
//     const cacheMatchDone = handler.cacheMatch(request);

//     return new Promise<Response>((resolve, reject) => {
//       fetchAndCachePutDone.then(resolve);
//       cacheMatchDone.then((response) => {
//         if (response) {
//           resolve(response);
//         }
//       });

//       // Reject if both network and cache error or find no response.
//       Promise.allSettled([fetchAndCachePutDone, cacheMatchDone]).then((results) => {
//         const [fetchAndCachePutResult, cacheMatchResult] = results;
//         if (fetchAndCachePutResult.status === "rejected" && (cacheMatchResult.status === "rejected" || !cacheMatchResult.value)) {
//           reject(fetchAndCachePutResult.reason);
//         }
//       });
//     });
//   }
// }

// // const navigationPreload = new CacheNetworkRace();

// // registerRoute(
// //   ({ request }) => request.mode === 'navigate',
// //   new NetworkFirst({
// //     cacheName: 'pages',
// //     plugins: [
// //       new CacheableResponsePlugin({
// //         statuses: [200],
// //       }),
// //     ],
// //   })
// // );

// // self.addEventListener('activate', event => {
// //   event.waitUntil(navigationPreload.enable());
// // });

// self.addEventListener('activate', event => {
//   event.waitUntil(
//     (async () => {
//       if (self.registration.navigationPreload) {
//         await self.registration.navigationPreload.enable();
//       }
//     })()
//   );
// });



// self.addEventListener('fetch', event => {
//   if (event.request.mode === 'navigate') {
//     event.respondWith((async () => {
//       try {
//         const preloadResponse = await event.preloadResponse;
//         if (preloadResponse) {
//           return preloadResponse;
//         }

//         const networkResponse = await fetch(event.request);
//         return networkResponse;
//       } catch (error) {
//         // Fallback to cache or network
//         const cache = await caches.open('pages');
//         const cachedResponse = await cache.match(event.request);
//         return cachedResponse || await fetch(event.request);
//       }
//     })());
//   }
// });
// navigationPreload.enable();

// // Create a new navigation route that uses the Network-first strategy
// const navigationRoute = new NavigationRoute(new NetworkFirst({
//   cacheName: 'navigations'
// }));

// // Register the navigation route
// serwist.registerRoute(navigationRoute);

// self.addEventListener('fetch', event => {
//   if (event.request.mode === 'navigate') {
//     event.respondWith(
//       (async () => {
//         try {
//           const preloadResponse = await event.preloadResponse;
//           if (preloadResponse) {
//             return preloadResponse;
//           }
//           return await fetch(event.request);
//         } catch (error) {
//           console.error('Navigation preload failed:', error);
//           return new Response('Navigation preload failed', { status: 500 });
//         }
//       })()
//     );
//   }
// });

// serwist.registerRoute(
//   ({ request }) => request.mode === 'navigate',
//   new NetworkFirst({
//     cacheName: 'pages',
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [200],
//       }),
//     ],
//   })
// );
// Enable navigation preload


serwist.addEventListeners()

// src/serviceWorkerRegistration.js

// Check if service workers are supported
