import { Title } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import CardCollection from "~/components/card/CardCollection.tsx";
import { JSON_SERVER_URL } from "~/lib/constants.ts";
import { WilderKindCardType } from "~/models/WilderKindCardType.ts";

import SearchForm from "./SearchForm.tsx";

export default function Route__Search() {
  const { loading, error, data } = useFetch<WilderKindCardType[]>(`
    ${JSON_SERVER_URL}/cards`);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const _cardIds = data?.map((card) => card.taxon_id);

  return (
    <>
      <SearchForm />
      <br />
      <Title order={2}>Featured</Title>
      <CardCollection collection={_cardIds} />
    </>
  );
}
