import { useState } from "react";

import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";

import { IconStar, IconStarFilled } from "lib/icons";

import useAuth from "../../../hooks/useAuth.ts";

export default function FavoriteToggleButton() {
  const { user, login } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  function toggleFavorite() {
    setIsFavorite(!isFavorite);
  }

  function handleClick() {
    if (!user) {
      modals.openConfirmModal({
        title: "Oh no!",
        children: <Text size="sm">You must be logged in to do that.</Text>,
        labels: { confirm: "Login", cancel: "Cancel" },
        onCancel: () => console.log("Cancel"),
        onConfirm: () => login(),
      });
    } else {
      toggleFavorite();
    }
  }

  return (
    <Button onClick={handleClick}>
      {isFavorite ? <IconStarFilled /> : <IconStar />}
    </Button>
  );
}