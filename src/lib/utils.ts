import { NotificationData, notifications } from "@mantine/notifications";

export function displayNotification(notificationData: NotificationData) {
  notifications.show({
    ...notificationData,
  });
}

export function addToCollection(
  cardId: string,
  cardCollection: string = "collection",
) {
  let prevCollection: string[] = [];
  let notificationData: NotificationData = {
    title: undefined,
    message: undefined,
    color: undefined,
    icon: undefined,
  };

  const collectionJSON = localStorage.getItem(cardCollection);
  if (collectionJSON) {
    if (JSON.parse(collectionJSON).includes(cardId)) {
      console.log("Card already in collection");
      notificationData = {
        title: "Sorry!",
        message: `The card is already in ${cardCollection}`,
        color: "orange",
      };
    } else {
      // card is not already in collection
      console.log("Card NOT in collection");
      prevCollection = JSON.parse(collectionJSON);
      const updatedCollection = [...prevCollection, cardId];
      localStorage.setItem(cardCollection, JSON.stringify(updatedCollection));
      notificationData = {
        title: "Success!",
        message: `Card added to ${cardCollection}`,
        color: "green",
      };
    }
  } else {
    // collection doesn't exist in localStorage
    const updatedCollection = [...prevCollection, cardId];
    localStorage.setItem(cardCollection, JSON.stringify(updatedCollection));
    notificationData = {
      title: "Success!",
      message: `Card added to ${cardCollection}`,
      color: "green",
    };
  }
  return notificationData;
}
