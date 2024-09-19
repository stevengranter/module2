import { TextInput, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import AddToCollectionButton from "~/components/ui/buttons/AddToCollectionButton.tsx";
import { JSON_SERVER_URL } from "~/lib/constants.ts";

export default function UserLogin() {
  // const [token, setToken] = useState(null);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "", password: "" },
  });

  function handleSubmit(formData: { email: string; password: string }) {
    {
      // console.log(formData);
      const response = fetch(`${JSON_SERVER_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((res) => res.json());
      console.log(response);
    }
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <TextInput
        description="Email Address"
        label="Email address"
        placeholder="user@domain.com"
        key={form.key("email")}
        {...form.getInputProps("email")}
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
