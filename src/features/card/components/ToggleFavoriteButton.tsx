import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ActionIcon } from "@mantine/core";
import { IconHeart, IconHeartFilled } from "~/features/_shared/icons/icons.tsx";

export default function ToggleFavoriteButton({ id }: { id: string | number }) {
  // const { user } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  function toggleFavorite() {
    // displayNotification(addToCollection(id, "favorites"));
    setIsFavorite(!isFavorite);
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
    <ActionIcon variant="default" radius="md" size={36}>
      {isFavorite ? <IconHeartFilled /> : <IconHeart />}
    </ActionIcon>
  );
}
