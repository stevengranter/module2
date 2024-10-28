import { Title } from "@mantine/core";

import SearchForm from "./SearchForm.tsx";

export default function Route__Search() {
  return (
    <>
      <SearchForm />
      <br />
      <Title order={2}>Featured</Title>
    </>
  );
}
