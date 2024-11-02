import { Grid, GridCol } from "@mantine/core";
import { WildCard } from "~/components/card/WildCard.tsx";

export default function CardCollection({
  collection,
}: {
  collection: number[];
}) {
  return (
    <Grid gutter={{ xs: 16, sm: 20, lg: 24 }}>
      {collection?.map((taxon_id) => {
        return (
          <GridCol
            span={{ base: 12, xs: 6, sm: 4, lg: 3, xl: 2 }}
            key={taxon_id}
          >
            {/*{taxon_id}*/}
            <WildCard
              taxonId={taxon_id}

              // isInUserCollection={!!userCollection?.includes(cardId)}
            />
          </GridCol>
        );
      })}
    </Grid>
  );
}
