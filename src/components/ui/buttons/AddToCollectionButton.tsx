import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPlus, IconCheck, IconX } from "@tabler/icons-react";

import useAuth from "../../../hooks/useAuth.ts";
import { useLocalStorage } from "../../../hooks/useLocalStorage.ts";
import { displayNotification } from "../../../lib/utils.ts";

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
        return {
          title: "Error",
          message: "Card already in collection",
          icon: <IconX />,
          color: "red",
        };
      } else {
        // else: card is not already in collection
        const collection = JSON.parse(collectionJSON);
        const updatedCollection = [...collection, cardId];
        setItem("collection", JSON.stringify(updatedCollection));

        if (isCardInCollection()) {
          return {
            title: "Success!",
            message: "Card added to collection",
            color: "green",
            icon: <IconCheck />,
          };
        } else {
          return {
            title: "Error",
            message: "An unknown error occurred",
            icon: <IconX />,
            color: "red",
          };
        }
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
      displayNotification(addToCollection(cardId));
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
