import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";

import useAuth from "../../../hooks/useAuth.ts";
import { useLocalStorage } from "../../../hooks/useLocalStorage.ts";

export default function AddToCollectionButton({ cardId }: { cardId: string }) {
  if (!cardId) {
    console.error("No cardId specified");
  }
  const { user, login } = useAuth();
  const { setItem, getItem } = useLocalStorage();

  function openModal() {
    modals.openConfirmModal({
      title: "Oh no!",
      children: (
        <Text size="sm">
          You must be logged in to add this card to your collection.
        </Text>
      ),
      labels: { confirm: "Login", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => login(),
    });
  }
  function displayNotification(title: string, message: string) {
    notifications.show({
      title: [title],
      message: [message],
    });
  }
  function addToCollection(cardId: string) {
    console.log("Adding to collection...");
    let collectionJSON = getItem("collection");
    if (collectionJSON) {
      const collection = JSON.parse(collectionJSON);
      if (collection.includes(cardId)) {
        return { title: "Error", message: "Card already in collection" };
      } else {
        const updatedCollection = [...collection, cardId];
        setItem("collection", JSON.stringify(updatedCollection));
        return { title: "Success!", message: "Card added to collection" };
      }
    } else {
      collectionJSON = JSON.stringify([cardId]);
      setItem("collection", collectionJSON);
      return { title: "Success!", message: "Card added to collection" };
    }
  }

  function handleClick() {
    console.log("Button pressed");
    if (user) {
      const { title, message } = addToCollection(cardId);
      displayNotification(title, message);
    } else {
      openModal();
    }
  }

  return (
    <Button onClick={() => handleClick()} leftSection={<IconPlus />}>
      Add to collection
    </Button>
  );
}
