import { Grid, Title } from "@mantine/core";

import { useFetch } from "../../hooks/useFetch.ts";
import { WilderKindCardType } from "../../models/WilderKindCardType.ts";
import { JSON_SERVER_URL } from "../../utils/constants.ts";
import CardCollection from "../card/CardCollection.tsx";

export default function HomePage() {
  return (
    <Grid>
      <Grid.Col span={12}>
        <Title order={3}>Featured cards</Title>
        {/*<CardCollection collection={[2, 5, 10]} />*/}
        <MostRecentCards numberOfCards="3" />
      </Grid.Col>
    </Grid>
  );
}

// function Hero() {
//   return (
//     <Skeleton width="100%" visible={true}>
//       <Container size="xl">
//         <h1>Hi there</h1>
//       </Container>
//     </Skeleton>
//   );
// }

function MostRecentCards({
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
    console.log({ data });
    const sortedCards = data.sort(
      (a, b) => Number(b.created) - Number(a.created),
    );
    const selectedCards = sortedCards.slice(0, cardQuantity);
    console.log(selectedCards);
    const selectedCardsArray = selectedCards.map((card) => card.id);
    console.log(selectedCardsArray);
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
