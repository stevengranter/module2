import { Alert, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import StartEndGuestSessionButton from "~/components/ui/buttons/StartEndGuestSessionButton.tsx";
import { useUser } from "~/hooks/useUser.ts";

export default function UserLogin() {
  const { user, login, error } = useUser();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { username: "", password: "" },
  });

  return (
    <>
      {/*{user ? "user logged in" : "user logged out"}*/}
      <form onSubmit={form.onSubmit((values) => login(values))}>
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
          <Button type="submit">Login</Button>
          or
          <StartEndGuestSessionButton />
        </Group>
      </form>
    </>
  );
}
