self.addEventListener("push", (event) => {
  if (!event.data) {
    return;
  }

  event.waitUntil((async () => {
    const payload = event.data.json();
    const clientList = await self.clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    });

    const hasVisibleAdminClient = clientList.some((client) => "focus" in client && client.url.includes("/admin"));

    if (hasVisibleAdminClient) {
      return;
    }

    await self.registration.showNotification(payload.title || "New contact message", {
      body: payload.body || "A new message has arrived.",
      icon: "/icon",
      badge: "/icon",
      tag: "admin-contact-message",
      data: {
        url: payload.url || "/admin/messages",
      },
    });
  })());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil((async () => {
    const targetUrl = new URL(event.notification.data?.url || "/admin/messages", self.location.origin).toString();
    const clientList = await self.clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    });

    for (const client of clientList) {
      if (client.url === targetUrl && "focus" in client) {
        await client.focus();
        return;
      }
    }

    await self.clients.openWindow(targetUrl);
  })());
});
