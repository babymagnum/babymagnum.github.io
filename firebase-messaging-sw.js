importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js');

   /*Update with yours config*/
  const firebaseConfig = {
    apiKey: "AIzaSyAQqhCmWjKZGkKvZ2Xhf1KmHaneB9o4unc",
    authDomain: "dummy-5d683.firebaseapp.com",
    projectId: "dummy-5d683",
    storageBucket: "dummy-5d683.appspot.com",
    messagingSenderId: "272923157507",
    appId: "1:272923157507:web:70df443c4952cce6a15a36"
  };
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();

  /*messaging.onMessage((payload) => {
  console.log('Message received. ', payload);*/
  messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });

  // Notification click event listener
  self.addEventListener('notificationclick', e => {
    data=e.notification.data.obj;
    // Close the notification popout
    e.notification.close();
    // Get all the Window clients
    e.waitUntil(clients.matchAll({ type: 'window' }).then(clientsArr => {
      // If a Window tab matching the targeted URL already exists, focus that;
      const hadWindowToFocus = clientsArr.some(windowClient => windowClient.url === e.notification.data.click_action ? (windowClient.focus(), true) : false);
      // Otherwise, open a new tab to the applicable URL and focus it.
      if (!hadWindowToFocus) clients.openWindow(e.notification.data.click_action).then(windowClient => windowClient ? windowClient.focus() : null);
    }));
  });