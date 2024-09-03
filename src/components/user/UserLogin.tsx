import { useEffect, useState } from "react";

import { TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Simulate } from "react-dom/test-utils";

import { useSubmitUserRegistration } from "../../hooks/useSubmitUserRegistration.ts";
import { JSON_SERVER_URL } from "../../utils/constants.ts";

import resize = Simulate.resize;

export default function UserLogin() {
  const [token, setToken] = useState(null);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "", password: "" },
  });

  function handleSubmit(formData: { email: string; password: string }) {
    {
      console.log(formData);
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
      <Button type="submit">Submit</Button>
    </form>
  );
}
