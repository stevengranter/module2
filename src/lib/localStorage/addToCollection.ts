import { NotificationData } from "@mantine/notifications";

import { UserType } from "../../models/UserType.ts";

export function addToCollection(
  cardId: string,
  cardCollection: string = "collection",
) {
  let notificationData: NotificationData = {
    title: undefined,
    message: undefined,
    color: undefined,
    icon: undefined,
  };
  let user: UserType;
  const userJSON = localStorage.getItem("user");

  if (userJSON) {
    user = JSON.parse(userJSON);
    console.log(user);
    if (!user.collection) {
      user.collection = [];
    }

    if (user.collection.includes(cardId)) {
      console.log("Card already in collection");
      notificationData = {
        title: "Sorry!",
        message: `The card is already in ${cardCollection}`,
        color: "orange",
      };
    } else {
      // card is NOT in collection
      console.log("Card NOT already in collection");
      user.collection.push(cardId);
      console.log("Card added to user.collection");
      localStorage.setItem("user", JSON.stringify(user));
      console.log("User updated in localStorage");
      notificationData = {
        title: "Success!",
        message: `Card added to collection`,
        color: "green",
      };
    }
  }

  return notificationData;
}
