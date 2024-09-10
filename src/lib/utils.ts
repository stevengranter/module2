import { NotificationData, notifications } from "@mantine/notifications";

export function displayNotification(notificationData: NotificationData) {
  console.log(notificationData);
  notifications.show({
    ...notificationData,
  });
}
