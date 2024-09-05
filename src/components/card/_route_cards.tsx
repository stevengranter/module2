import { useFetch } from "../../hooks/useFetch.ts";
import { WilderKindCardType } from "../../models/WilderKindCardType.ts";
import { JSON_SERVER_URL } from "../../utils/constants.ts";
import CardCollection from "./CardCollection.tsx";

export default function Route__Cards() {
  const { loading, error, data } = useFetch<WilderKindCardType[]>(`
    ${JSON_SERVER_URL}/cards`);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const cardIds = data?.map((card) => card.id);

  return <CardCollection collection={cardIds} />;
}
