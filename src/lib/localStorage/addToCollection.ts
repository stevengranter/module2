import { NotificationData } from "@mantine/notifications";
import { UserType } from "~/models/UserType.ts";

function initLocalStorage() {
  const localStorageObject = {
    collections: {
      favorites: [],
      default: [],
    },
    name: "Guest",
    id: "1",
  };
  localStorage.setItem("user", JSON.stringify(localStorageObject));
}

export function addToCollection(
  cardId: string,
  cardCollection: string = "collection",
) {
  let notificationData: NotificationData;
  const userJSON = localStorage.getItem("user");
  if (!userJSON) {
    notificationData = {
      title: "Error",
      message: "User not found in local storage",
      color: "red",
    };
    return notificationData;
  }

  const user: UserType | null = JSON.parse(userJSON);
  if (!user) {
    notificationData = {
      title: "Error",
      message: "Invalid user data in local storage",
      color: "red",
    };
    return notificationData;
  }

  const collection = user.collection ?? [];

  if (collection.includes(cardId)) {
    console.log("Card already in collection");
    notificationData = {
      title: "Sorry!",
      message: `The card is already in ${cardCollection}`,
      color: "orange",
    };
  } else {
    // card is NOT in collection
    console.log("Card NOT already in collection");
    collection.push(cardId);
    user.collection = collection;
    console.log("Card added to collection");
    localStorage.setItem("user", JSON.stringify(user));
    console.log("User updated in localStorage");
    notificationData = {
      title: "Success!",
      message: `Card added to collection`,
      color: "green",
    };
  }
  return notificationData;
}
