import { useContext } from "react";

import { Alert, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import StartEndGuestSessionButton from "~/components/ui/buttons/StartEndGuestSessionButton.tsx";
import { RoleContext } from "~/contexts/RoleContextProvider.tsx";

export default function UserLogin() {
  const { user, login, logout, error } = useContext(RoleContext);
  // const navigate = useNavigate();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { username: "", password: "" },
  });

  return (
    <>
      {/*{user ? "user logged in" : "user logged out"}*/}
      <form
        onSubmit={form.onSubmit((values) => (login ? login(values) : null))}
      >
        {error && <Alert>{error}</Alert>}

        {!user ? (
          <>
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
          </>
        ) : (
          "Login = success! 🥳"
        )}

        <Group mt="sm">
          {!user ? (
            <Button type="submit">Login</Button>
          ) : (
            <Button onClick={logout}>Logout</Button>
          )}

          {!user && (
            <>
              or <StartEndGuestSessionButton />
            </>
          )}
        </Group>
      </form>
    </>
  );
}
