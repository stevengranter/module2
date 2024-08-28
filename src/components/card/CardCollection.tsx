import { GridCol, Center, Grid } from "@mantine/core";

import { EnrichedCardType } from "models/EnrichedCardType.ts";
import { SpeciesCardType } from "models/SpeciesCardType.ts";

import SpeciesCard from "./SpeciesCard.tsx";

export default function CardCollection({
  data,
}: {
  data: EnrichedCardType[] | unknown;
}) {
  return (
    <>
      <h1>Card Collection</h1>
      <Center>
        <Grid>
          {Array.isArray(data) &&
            data.map((item: SpeciesCardType) => (
              <GridCol
                span={{ base: 12, xs: 6, sm: 6, md: 4, lg: 3, xl: 2 }}
                key={item.id}
              >
                <SpeciesCard {...item} />
              </GridCol>
            ))}
        </Grid>
      </Center>
    </>
  );
}
