import { useFetch } from "@mantine/hooks"
import { JSON_SERVER_URL } from "~/features/_shared/api/constants.ts"
import CardCollection from "~/features/card/components/CardCollection/CardCollection.tsx"
import { WilderKindCardType } from "~/models/WilderKindCardType.ts"

export default function CardsPage() {
  const { loading, error, data } = useFetch<WilderKindCardType[]>(`
    ${JSON_SERVER_URL}/cards`)

  if (error) {
    return <p>Error: {error.message}</p>
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (!data) {
    return null
  }

  return data && <CardCollection itemIdArray={getCardIds(data)} />
}

function getCardIds(data: WilderKindCardType[]) {
  const cardIds = data.map((card) => String(card.taxon_id))
  console.log(`<Route__Cards> getCardIds() => ${cardIds}`)
  return cardIds
}
