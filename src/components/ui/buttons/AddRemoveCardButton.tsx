import { Button } from "@mantine/core";
import useCollections from "~/hooks/useCollections.ts";
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

interface AddCardButtonProps {
  cardId?: string | undefined;
}

function AddCardButton({ _cardId }: AddCardButtonProps) {
  // { cardId }: AddCardButtonProps
  // console.log(cardId);
  // { cardId }
  const { getCollections } = useCollections();
  // const { user } = useContext(RoleContext);
  // console.log(getCollections);
  function handleClick() {
    // console.log(getCollections());
  }

  return (
    <Button onClick={handleClick} leftSection={<IconPlus />}>
      Add to collection
    </Button>
  );
}

// function RemoveCardButton({ cardId : string}) {
//   function removeCard() {
//     console.log(`removeCard(${cardId})`);
//   }
//   return (
//     <Button onClick={removeCard} leftSection={<IconMinus />}>
//       Remove from collection
//     </Button>
//   );
// }

export default function AddRemoveCardButton({ cardId }: AddCardButtonProps) {
  // const { role, user, isAuthenticated } = useContext(RoleContext);
  return <AddCardButton cardId={cardId} />;

  // if (permissionMap[role].includes("edit-collection")) {
  //   return <AddCardButton cardId={cardId} />;
  // } else if (permissionMap[role].includes("read-collection")) {
  //   return <AddCardButton cardId={cardId} />;
  // } else {
  //   return <p>Something went wrong!</p>;
  // }
}
