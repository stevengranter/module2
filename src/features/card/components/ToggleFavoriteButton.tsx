import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ActionIcon } from "@mantine/core";
import useNest from "~/features/_shared/contexts/nest/useNest.ts";
import { IconHeart, IconHeartFilled } from "~/features/_shared/icons/icons.tsx";
import { displayNotification } from "~/features/_shared/utils/displayNotification.ts";

export default function ToggleFavoriteButton({ id }: { id: string | number }) {
  const { nest, collections } = useNest();
  const [isFavorite, setIsFavorite] = useState(() =>
    collections.isItemInCollection(id, "Favorites"),
  );
  const navigate = useNavigate();

  function toggleFavorite() {
    if (!collections.isItemInCollection(id, "Favorites")) {
      console.log("Item is not in collection, adding item");
      collections.addItem(id, "Favorites");
      setIsFavorite(true);
    } else {
      console.log("Item is in collection, removing item");
      collections.removeItem(id, "Favorites");
      setIsFavorite(false);
    }
  }

  // function handleClick() {
  //   if (!user) {
  //     modals.openConfirmModal({
  //       title: "Oh no!",
  //       children: <Text size="sm">You must be logged in to do that.</Text>,
  //       labels: { confirm: "Login", cancel: "Cancel" },
  //       onCancel: () => console.log("Cancel"),
  //       onConfirm: () => navigate("/login"),
  //     });
  //   } else {
  //     toggleFavorite();
  //   }
  // }

  return (
    <ActionIcon
      variant="default"
      radius="md"
      size={36}
      onClick={toggleFavorite}
    >
      {isFavorite ? <IconHeartFilled /> : <IconHeart />}
    </ActionIcon>
  );
}
