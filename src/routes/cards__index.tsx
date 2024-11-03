import { useFetch } from "@mantine/hooks";
import { JSON_SERVER_URL } from "~/lib/constants.ts";
import { WilderKindCardType } from "~/models/WilderKindCardType.ts";

import CardCollection from "../components/card/CardCollection.tsx";

export default function Route__Cards() {
  const { loading, error, data } = useFetch<WilderKindCardType[]>(`
    ${JSON_SERVER_URL}/cards`);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return null;
  }

  return <CardCollection collection={data && getCardIds(data)} />;
}

function getCardIds(data: WilderKindCardType[]) {
  const cardIds = data.map((card) => card.taxon_id);
  console.log(`<Route__Cards> getCardIds() => ${cardIds}`);
  return cardIds;
}
