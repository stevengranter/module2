import { NotificationData, notifications } from "@mantine/notifications";

export function displayNotification(notificationData: NotificationData) {
  notifications.show({
    ...notificationData,
  });
}

export function login() {
  console.log("login()");
}

export function logout() {
  console.log("logout()");
}

export function startGuestSession() {
  console.log("startGuestSession()");
}

export function endGuestSession() {
  console.log("endGuestSession()");
}
