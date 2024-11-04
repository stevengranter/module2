import { Grid, GridCol } from "@mantine/core";
import { WildCard } from "~/features/card/components/WildCard/WildCard.tsx";

export default function CardCollection({
  collection,
}: {
  collection: number[];
}) {
  if (!collection) return "Collection doesn't exist";
  if (collection.length === 0) return "Nothing in collection";

  return (
    collection.length > 0 && (
      <Grid gutter={{ xs: 16, sm: 20, lg: 24 }}>
        {collection.length > 0 &&
          collection?.map((taxon_id) => {
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
    )
  );
}
