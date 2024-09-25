import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { RoleContext } from "~/contexts/RoleContextProvider.tsx";
import { IconPlus } from "~/lib/icons.tsx";
// import { displayNotification } from "lib/utils.ts";
import { addToCollection } from "~/lib/localStorage/addToCollection.ts";
import { displayNotification } from "~/lib/utils.ts";

export default function AddToCollectionButton({ cardId }: { cardId: string }) {
  if (!cardId) {
    console.error("No cardId specified");
  }
  const { user } = useContext(RoleContext);
  const navigate = useNavigate();

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
      onConfirm: () => navigate("/login"),
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
