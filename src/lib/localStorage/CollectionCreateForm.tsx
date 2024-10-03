import { useState } from "react";

import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useGuest } from "~/hooks/useGuest.ts";

export default function CollectionCreateForm() {
  const { guest, createCollection } = useGuest();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {},
    validateInputOnBlur: true,
    validate: (values) => ({
      name: validateNameField(values),
    }),
  });

  const handleError = (errors: typeof form.errors) => {
    if (errors.name) {
      notifications.show({ message: "Please fill name field", color: "red" });
    }
  };

  function validateNameField(values) {
    let formError;
    console.log(values);
    if (!guest) return "You must be logged in to do that";
    if (guest) {
      if (values.name.length < 1 || !values.name.length) {
        formError = "Name must be at least 1 character.";
      } else {
        guest.collections.forEach((collection) => {
          // console.log(collection);
          if (collection.name === values.name) {
            // console.log("collection already exists");
            formError = "Collection already exists.";
          }
        });
      }
    }
    return formError;
  }

  return (
    <form onSubmit={form.onSubmit((values) => createCollection(values))}>
      {error}
      <TextInput
        withAsterisk
        label="Name"
        placeholder="Name"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      <TextInput
        label="Description"
        placeholder="Description"
        key={form.key("description")}
        {...form.getInputProps("description")}
      />
      <Button type="submit">Create collection</Button>
    </form>
  );
}
