import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import useAuth from "hooks/useAuth.ts";
import { useLocalStorage } from "hooks/useLocalStorage.ts";

import { IconX, IconPlus, IconCheck } from "lib/icons.tsx";
import { displayNotification } from "lib/utils.ts";

const successNotification = {
  title: "Success!",
  message: "Card added to collection",
  color: "green",
  icon: <IconCheck />,
};

const duplicateNotification = {
  title: "Error",
  message: "Card already in collection",
  icon: <IconX />,
  color: "red",
};

const errorNotification = {
  title: "Error",
  message: "An unknown error occurred",
  icon: <IconX />,
  color: "red",
};

export default function AddToCollectionButton({ cardId }: { cardId: string }) {
  if (!cardId) {
    console.error("No cardId specified");
  }
  const { user, login } = useAuth();
  const { setItem, getItem } = useLocalStorage();

  function isCardInCollection() {
    const updatedCollectionJSON = getItem("collection");
    if (updatedCollectionJSON) {
      return !!JSON.parse(updatedCollectionJSON).includes(cardId);
    }
  }
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

  function addToCollection(cardId: string) {
    console.log("Adding to collection...");
    let collectionJSON = getItem("collection");
    if (collectionJSON) {
      if (isCardInCollection()) {
        return duplicateNotification;
      } else {
        // else: card is not already in collection
        const collection = JSON.parse(collectionJSON);
        const updatedCollection = [...collection, cardId];
        setItem("collection", JSON.stringify(updatedCollection));

        if (isCardInCollection()) {
          return successNotification;
        } else {
          return errorNotification;
        }
      }
    } else {
      collectionJSON = JSON.stringify([cardId]);
      setItem("collection", collectionJSON);
      return successNotification;
    }
  }

  function handleClick() {
    console.log("Button pressed");
    if (user) {
      displayNotification(addToCollection(cardId));
    } else {
      openModal();
    }
  }

  return (
    <Button onClick={() => handleClick()} leftSection={<IconPlus />}>
      Add
    </Button>
  );
}
