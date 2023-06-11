self.addEventListener('push', event => {
  const notificationData = event.data.json();
  const title = notificationData.title;
  const options = {
    body: notificationData.body,
    // You can add more options here, such as icons or actions
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});