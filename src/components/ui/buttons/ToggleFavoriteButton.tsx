import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ActionIcon, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { addToCollection } from "~/lib/localStorage/addToCollection.ts";
import { displayNotification } from "~/lib/utils.ts";

import { IconHeart, IconHeartFilled } from "lib/icons";

export default function ToggleFavoriteButton({ cardId }: { cardId: string }) {
  // const { user } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  function toggleFavorite() {
    displayNotification(addToCollection(cardId, "favorites"));
    setIsFavorite(!isFavorite);
  }

  function handleClick() {
    if (!user) {
      modals.openConfirmModal({
        title: "Oh no!",
        children: <Text size="sm">You must be logged in to do that.</Text>,
        labels: { confirm: "Login", cancel: "Cancel" },
        onCancel: () => console.log("Cancel"),
        onConfirm: () => navigate("/login"),
      });
    } else {
      toggleFavorite();
    }
  }

  return (
    <ActionIcon variant="default" radius="md" size={36}>
      {isFavorite ? <IconHeartFilled /> : <IconHeart />}
    </ActionIcon>
  );
}
