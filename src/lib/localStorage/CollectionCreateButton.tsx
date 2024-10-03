import { Button } from "@mantine/core";
import { useGuest } from "~/hooks/useGuest.ts";

export default function CollectionCreateButton() {
  const { guest, saveGuest } = useGuest();

  function createCollection() {
    if (guest) {
      const newCollection = {
        name: "newCollection",
        items: [3, 4, 5],
        id: "3174a407-818b-4c8a-b4a4-07818b7c8ac9",
      };
      guest.collections.push(newCollection);
      console.log(guest);
      saveGuest();
    }
  }

  return <Button onClick={createCollection}>Create new collection</Button>;
}
