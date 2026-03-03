/* Firebase Messaging service worker */
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js");

let messagingInitialized = false;

async function initMessaging() {
  if (messagingInitialized) return;

  const response = await fetch("/firebase-config.json", { cache: "no-store" });
  const firebaseConfig = await response.json();

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const messaging = firebase.messaging();
  messaging.onBackgroundMessage((payload) => {
    const title = payload?.notification?.title || "New Notification";
    const options = {
      body: payload?.notification?.body,
      icon: payload?.notification?.icon || "/logo.jpg",
      data: payload?.data || {},
    };
    self.registration.showNotification(title, options);
  });

  messagingInitialized = true;
}

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      await self.clients.claim();
      await initMessaging();
    })()
  );
});

self.addEventListener("push", (event) => {
  event.waitUntil(
    (async () => {
      await initMessaging();
    })()
  );
});
