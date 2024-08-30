import CardCollection from "../../components/user/CardCollection.tsx";
import { useFetch } from "../../hooks/useFetch.ts";
import { SpeciesCardType } from "../../models/SpeciesCardType.ts";
import { JSON_SERVER_URL } from "../../utils/constants.ts";

export default function CardsIndexRoute() {
  const { isLoading, error, data } = useFetch<SpeciesCardType[]>(`
    ${JSON_SERVER_URL}/cards`);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const cardIds = data?.map((card) => card.id);

  return <CardCollection collection={cardIds} />;
}
