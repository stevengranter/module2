import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";

import useAuth from "../../../hooks/useAuth.ts";

export default function AddToCollectionButton() {
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
      notifications.show({
        title: "Hooray",
        message: "Added to collection",
      });
    } else {
      openModal();
    }
  }

  return (
    <Button onClick={handleClick} leftSection={<IconPlus />}>
      Add to collection
    </Button>
  );
}
