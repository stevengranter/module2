import { JSON_SERVER_URL } from "~/features/api/constants.ts"
import { WilderKindCardType } from "~/models/WilderKindCardType.ts"

export default async function getWilderKindCardsIds() {
  const cardData = await fetch(`${JSON_SERVER_URL}/cards`)
  const cardDataJSON = await cardData.json()
  return cardDataJSON.map((card: WilderKindCardType) => card.taxon_id)
}
