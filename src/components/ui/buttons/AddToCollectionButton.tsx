import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPlus } from "~/lib/icons.tsx";
import useAuth from "hooks/useAuth.ts";
// import { displayNotification } from "lib/utils.ts";

import { addToCollection } from "~/lib/localStorage/addToCollection.ts";
import { displayNotification } from "~/lib/utils.ts";

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
