import { useNavigate } from "react-router-dom";

import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useGuest } from "~/hooks/useGuest.ts";
import { IconPlus } from "~/lib/icons.tsx";
import AddCardToCollectionForm from "~/lib/localStorage/AddCardToCollectionForm.tsx";
// import { displayNotification } from "lib/utils.ts";

export default function AddToCollectionButton(props) {
  const { guest } = useGuest();
  if (!props.cardId) {
    console.error("No cardId specified");
  }

  const navigate = useNavigate();

  function openErrorModal() {
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

  function openFormModal() {
    modals.open({
      title: "Add card to collection",
      children: <AddCardToCollectionForm cardId={props.cardId} />,
    });
  }

  function handleClick() {
    console.log("Button pressed");
    if (guest) {
      console.log("Guest requesting adding card to collection");
      openFormModal();
    } else {
      openErrorModal();
    }
  }

  return (
    <Button onClick={() => handleClick()} leftSection={<IconPlus />} {...props}>
      Found it!
    </Button>
  );
}
