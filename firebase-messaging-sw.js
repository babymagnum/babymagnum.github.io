importScripts('https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging.js');

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