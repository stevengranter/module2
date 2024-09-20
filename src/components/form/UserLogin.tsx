import { useState } from "react";

import { Alert, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import AddToCollectionButton from "~/components/ui/buttons/AddToCollectionButton.tsx";
import { JSON_SERVER_URL } from "~/lib/constants.ts";

export default function UserLogin() {
  // const { user, login, logout } = useGuest();
  // const [formData, setFormData] = useState();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { username: "", password: "" },
  });

  async function handleSubmit(formData: {
    username: string;
    password: string;
  }) {
    // setFormData(formData);
    // console.log(formData);

    try {
      const response = await fetch(
        `${JSON_SERVER_URL}/users?username=${formData.username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log(response);

      if (!response) {
        setError("Issue fetching data"); // for 404 or other errors
      }

      const jsonResponse = await response.json();
      if (jsonResponse.length === 0) {
        // console.log("No user found");
        setError("Username does not exist");
      } else {
        if (
          formData.username === jsonResponse[0].username &&
          formData.password === jsonResponse[0].password
        ) {
          console.log("Login success");
        } else {
          setError("Password is incorrect");
        }
      }
      // console.log(jsonResponse);
    } catch (error) {
      setError(`Error fetching user data: ${error}`);
    }
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      {error && <Alert>{error}</Alert>}
      <TextInput
        description="Username"
        label="Username"
        placeholder="username"
        key={form.key("username")}
        {...form.getInputProps("username")}
      />
      <TextInput
        description="Password"
        label="Password"
        placeholder="Password"
        key={form.key("password")}
        {...form.getInputProps("password")}
      />
      <Group mt="sm">
        <Button type="submit">Login</Button> or
        <Button variant="subtle">Continue as Guest</Button>
      </Group>
      <AddToCollectionButton cardId="2" />
    </form>
  );
}
