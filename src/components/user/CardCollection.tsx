import { Grid, GridCol } from "@mantine/core";

import WilderKindCard from "../card/WilderKindCard.tsx";

export default function CardCollection({
  collection,
}: {
  collection: string[] | undefined;
}) {
  console.log(collection);
  return (
    <Grid gutter={{ xs: 16, sm: 20, lg: 24 }}>
      {collection?.map((cardId) => {
        return (
          <GridCol span={{ base: 12, xs: 6, sm: 4, lg: 3, xl: 2 }} key={cardId}>
            <WilderKindCard cardId={cardId} />
          </GridCol>
        );
      })}
    </Grid>
  );
}
