import { useContext } from "react";

import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import useGuest from "~/features/guest/useGuest.ts";

export default function ToggleGuestSessionButton() {
  const { isGuest, startGuestSession, endGuestSession, guestData } = useGuest();
  const openStartModal = () =>
    modals.openConfirmModal({
      title: "Please confirm",
      children: (
        <Text size="sm">
          Starting a guest session will temporarily save data to memory for this
          browser session only. To wipe this data, close your browser or click
          "End Guest Session" when you are done.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        startGuestSession();
        console.log("Confirmed");
      },
    });

  const openEndModal = () =>
    modals.openConfirmModal({
      title: "Please confirm",
      children: (
        <Text size="sm">
          Ending this guest session will clear any changes you have made.
          Continue?
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        endGuestSession();
        console.log("Confirmed");
      },
    });

  if (!isGuest) {
    return <Button onClick={openStartModal}>Continue as Guest</Button>;
  } else {
    return (
      <>
        <Button onClick={openEndModal}>End Guest Session</Button>
      </>
    );
  }
}
