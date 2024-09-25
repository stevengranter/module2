import { useContext } from "react";

import { Button } from "@mantine/core";
import { IconMinus } from "@tabler/icons-react";
import { RoleContext } from "~/contexts/RoleContextProvider.tsx";
import useCollections from "~/hooks/useCollections.ts";
import { useUser } from "~/hooks/useUser.ts";
import { IconPlus } from "~/lib/icons.tsx";

// function openModal() {
//   modals.openConfirmModal({
//     title: "Oh no!",
//     children: (
//       <Text size="sm">
//         You must be logged in to add this card to your collection.
//       </Text>
//     ),
//     labels: { confirm: "Login", cancel: "Cancel" },
//     onCancel: () => console.log("Cancel"),
//     onConfirm: () => login(),
//   });
// }

function AddCardButton({ cardId }) {
  const { collections, getCollections } = useCollections();
  const { user } = useUser();
  console.log(getCollections);
  function handleClick() {
    console.log(getCollections("1"));
  }

  return (
    <Button onClick={handleClick} leftSection={<IconPlus />}>
      Add to collection
    </Button>
  );
}

function RemoveCardButton({ cardId }) {
  function removeCard() {
    console.log(`removeCard(${cardId})`);
  }
  return (
    <Button onClick={removeCard} leftSection={<IconMinus />}>
      Remove from collection
    </Button>
  );
}

export default function AddRemoveCardButton({ cardId }: { cardId: string }) {
  const { role, user, isAuthenticated } = useContext(RoleContext);
  return <AddCardButton cardId={cardId} />;

  // if (permissionMap[role].includes("edit-collection")) {
  //   return <AddCardButton cardId={cardId} />;
  // } else if (permissionMap[role].includes("read-collection")) {
  //   return <AddCardButton cardId={cardId} />;
  // } else {
  //   return <p>Something went wrong!</p>;
  // }
}
