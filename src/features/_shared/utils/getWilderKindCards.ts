import { JSON_SERVER_URL } from "~/features/api/constants.ts";

export default async function getWilderKindCardsIds() {
  const cardData = await fetch(`${JSON_SERVER_URL}/cards`);
  const cardDataJSON = await cardData.json();
  const cardIds = cardDataJSON.map((card) => card.taxon_id);
  return cardIds;
}
