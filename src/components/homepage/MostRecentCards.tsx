import CardCollection from "~/components/card/CardCollection.tsx";
import { useFetch } from "~/hooks/useFetch.ts";
import { JSON_SERVER_URL } from "~/lib/constants.ts";
import { WilderKindCardType } from "~/models/WilderKindCardType.ts";

export function MostRecentCards({
  numberOfCards,
}: {
  numberOfCards: number | string;
}) {
  const cardQuantity = Number(numberOfCards);
  const {
    data,
    loading,
  }: { data: WilderKindCardType[] | null; loading: boolean } = useFetch(
    `${JSON_SERVER_URL}/cards`,
  );

  if (data) {
    // console.log({ data });
    const sortedCards = data.sort(
      (a, b) => Number(b.created) - Number(a.created),
    );
    const selectedCards = sortedCards.slice(0, cardQuantity);
    // console.log(selectedCards);
    const selectedCardsArray = selectedCards.map((card) => card.id);
    // console.log(selectedCardsArray);
    // const selectedCardsIds selectedCards.map(card => card.id)

    return !loading && <CardCollection collection={selectedCardsArray} />;
    // return (
    //   !isLoading &&
    //   selectedCards.map((card) => (
    //     // <WilderKindCard cardId={card.id} key={card.id} />
    //   ))
    // );
  }
}
