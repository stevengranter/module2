import { useFetch } from "@mantine/hooks";
import { JSON_SERVER_URL } from "~/lib/constants.ts";
import { WilderKindCardType } from "~/models/WilderKindCardType.ts";

import SearchForm from "../../components/form/SearchForm.tsx";

export default function Route__Search() {
  const { loading, error, data } = useFetch<WilderKindCardType[]>(`
    ${JSON_SERVER_URL}/cards`);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const cardIds = data?.map((card) => card.id);

  return (
    <>
      <SearchForm />
      <br />
    </>
  );
}
