import { NotificationData, notifications } from "@mantine/notifications";
import { INAT_API_URL } from "~/lib/constants.ts";

export function displayNotification(notificationData: NotificationData) {
  notifications.show({
    ...notificationData,
  });
}

export async function queryINatAPI({ queryKey }: { queryKey: string }) {
  console.log(`iNatQueryFunction()`);
  const queryUrl = `${INAT_API_URL}${queryKey[0]}`;
  console.log(`fetching ${queryUrl}`);
  const response = await fetch(`${INAT_API_URL}${queryKey[0]}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
