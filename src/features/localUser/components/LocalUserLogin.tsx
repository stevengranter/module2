import { useContext } from "react";

import { Alert, Button, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import ToggleGuestSessionButton from "~/features/guest/ToggleGuestSessionButton.tsx";
import { LocalUserContext } from "~/features/localUser/contexts/LocalUserProvider.tsx";

export default function LocalUserLogin() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { username: "" },
  });
  const { localUserData, login, logout } = useContext(LocalUserContext);

  return (
    <>
      <Title order={2}>Local User Login</Title>
      <Alert variant="light" color="blue" title="Alert title">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis,
        quae tempore necessitatibus placeat saepe.
      </Alert>
      <form
        onSubmit={form.onSubmit((values) =>
          login ? login(values.username) : null,
        )}
      >
        <TextInput
          description="Username"
          label="Username"
          placeholder="username"
          key={form.key("username")}
          {...form.getInputProps("username")}
        />
        <Button type="submit">Login</Button> or <ToggleGuestSessionButton />
      </form>
    </>
  );
}
