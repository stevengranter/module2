import { Button, Checkbox, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useGuest } from "~/hooks/useGuest.ts";

export default function AddCardToCollectionForm(cardId) {
  const { guest, addCardToCollection, removeCardFromCollection } = useGuest();
  const form = useForm({
    mode: "uncontrolled",
  });

  function handleSubmit(cardId, values) {
    console.log(`Please add cardID: ${Object.values(cardId)} to:`);
    console.log(values);
    for (const [key, value] of Object.entries(values)) {
      if (value === true) {
        console.log(`Add to ${key}`);
        addCardToCollection(cardId.cardId, key);
      } else {
        console.log(`Remove from ${key}`);
        removeCardFromCollection(cardId.cardId, key);
      }
    }
  }

  return (
    <>
      <h2>Add/Remove Cards To Collections</h2>
      <form onSubmit={form.onSubmit((values) => handleSubmit(cardId, values))}>
        <Checkbox.Group
          label="Select collection(s) to add this card to"
          withAsterisk
        >
          <Group>
            {guest &&
              guest.collections.map((collection) => {
                return (
                  <Checkbox
                    value={collection.id}
                    label={collection.name}
                    key={form.key(collection.id)}
                    {...form.getInputProps(collection.id)}
                  />
                );
              })}
          </Group>
        </Checkbox.Group>
        <Button type="submit">Add/Remove from collections</Button>
      </form>
    </>
  );
}
