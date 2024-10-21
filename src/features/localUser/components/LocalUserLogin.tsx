import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function LocalUserLogin() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { username: "" },
  });

  function login(username: string) {
    console.log(username);
  }

  return (
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
    </form>
  );
}
