import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import useAuth from "hooks/useAuth.ts";

import { IconPlus } from "lib/icons.tsx";
import { addToCollection, displayNotification } from "lib/utils.ts";

export default function AddToCollectionButton({ cardId }: { cardId: string }) {
  if (!cardId) {
    console.error("No cardId specified");
  }
  const { user, login } = useAuth();

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

  // function addToCollection(
  //   cardId: string,
  //   userCollection: string = "collection",
  // ) {
  //   console.log(`Adding cardId: ${cardId} to collection: ${userCollection}`);
  //   let collectionJSON = getItem(userCollection);
  //   if (collectionJSON) {
  //     if (isCardInCollection()) {
  //       return duplicateNotification;
  //     } else {
  //       // else: card is not already in collection
  //       const collection = JSON.parse(collectionJSON);
  //       const updatedCollection = [...collection, cardId];
  //       setItem("collection", JSON.stringify(updatedCollection));
  //
  //       if (isCardInCollection()) {
  //         return successNotification(userCollection);
  //       } else {
  //         return errorNotification;
  //       }
  //     }
  //   } else {
  //     collectionJSON = JSON.stringify([cardId]);
  //     setItem("collection", collectionJSON);
  //     return successNotification(userCollection);
  //   }
  // }

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
