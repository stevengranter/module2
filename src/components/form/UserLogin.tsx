import { Alert, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUser } from "~/hooks/useUser.ts";

export default function UserLogin() {
  const { user, login, logout, error } = useUser();
  // const [formData, setFormData] = useState();

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
          "Already logged in"
        )}

        <Group mt="sm">
          {!user ? (
            <Button type="submit">Login</Button>
          ) : (
            <Button onClick={logout}>Logout</Button>
          )}{" "}
          or
          <Button variant="subtle">Continue as Guest</Button>
        </Group>
      </form>
    </>
  );
}
