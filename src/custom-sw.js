/* eslint-disable no-undef,no-restricted-globals */

importScripts("/third_party/workbox/workbox-v5.0.0/workbox-sw.js");

workbox.setConfig({
  modulePathPrefix: "/third_party/workbox/workbox-v5.0.0"
});

console.log("hello from custom-sw.js");

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  // See https://developers.google.com/web/tools/workbox/guides/configure-workbox
  // workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

  self.addEventListener("install", event =>
    event.waitUntil(self.skipWaiting())
  );
  self.addEventListener("activate", event =>
    event.waitUntil(self.clients.claim())
  );

  // app-shell
  // workbox.routing.registerRoute("/", workbox.strategies.networkFirst());

  // workbox.routing.registerRoute(
  //   new RegExp("https://jsonplaceholder.typicode.com/users"),
  //   new workbox.strategies.CacheFirst()
  // );

  // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.(googleapis|gstatic)\.com/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "google-fonts-stylesheets"
    })
		// new workbox.strategies.CacheFirst()
  );

  // workbox.precaching.precacheAndRoute(self.__precacheManifest);
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
