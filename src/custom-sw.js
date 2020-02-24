/* eslint-disable no-undef,no-restricted-globals */

importScripts(process.env.PUBLIC_URL+"/third_party/workbox/workbox-v5.0.0/workbox-sw.js");
// importScripts("/third_party/workbox/workbox-v5.0.0/workbox-background-sync.prod.js");

workbox.setConfig({
  modulePathPrefix: process.env.PUBLIC_URL+"/third_party/workbox/workbox-v5.0.0"
});

const queue = new workbox.backgroundSync.Queue("myQueueName");

// Enable navigation preload.
workbox.navigationPreload.enable();


export const showNotification = ({
  body = "You are back online and your post was successfully sent!",
  icon = "../images/icon/256.png",
  badge = "../images/icon/32png.png",
  vibrate = [200, 100, 200, 100, 200, 100, 200],
  tag = "vibration-sample"
}) => {
  // Notification.requestPermission(function(result) {
  //   if (result === 'granted') {
  //     // navigator.serviceWorker.ready.then(function(registration) {
  //     //   registration.showNotification('Vibration Sample', {
  //     //     body: 'Buzz! Buzz!',
  //     //     icon: '../images/touch/chrome-touch-icon-192x192.png',
  //     //     vibrate: [200, 100, 200, 100, 200, 100, 200],
  //     //     tag: 'vibration-sample'
  //     //   });
  //     // });
  //   }
  // });
  if (Notification.permission === "granted") {
    self.registration.showNotification(process.env.REACT_APP_NAME, {
      body,
      icon,
      badge,
      vibrate,
      tag
    });
  }
};

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

  self.addEventListener("push", event => {
    const data = event.data.json();
    console.log("New notification", data);
    const options = {
      body: data.body
    };
    // event.waitUntil(self.registration.showNotification(data.title, options));
    event.waitUntil(showNotification(options))
  });

  self.addEventListener("fetch", event => {
    // Clone the request to ensure it's safe to read when
    // adding to the Queue.
    const promiseChain = fetch(event.request.clone()).catch(err => {
      return queue.pushRequest({ request: event.request });
    });

    event.waitUntil(promiseChain);
  });

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
