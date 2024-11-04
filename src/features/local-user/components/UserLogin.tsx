import { Alert, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuth } from "~/features/_shared/contexts/AuthContextProvider.tsx";
import StartEndGuestSessionButton from "~/features/guest-session/components/ToggleGuestSessionButton.tsx";

export default function UserLogin() {
  const { login, logout, error, isAuthenticated } = useAuth();
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

        {!isAuthenticated ? (
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
          {!isAuthenticated ? (
            <Button type="submit">Login</Button>
          ) : (
            <Button onClick={logout}>Logout</Button>
          )}

          {!isAuthenticated && (
            <>
              or <StartEndGuestSessionButton />
            </>
          )}
        </Group>
      </form>
    </>
  );
}
