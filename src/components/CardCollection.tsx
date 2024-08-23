import { GridCol, Center, Grid } from '@mantine/core';

import { enrichedCardType } from 'models/enrichedCardType';
import { speciesCardType } from 'models/speciesCardType';

import SpeciesCard from './SpeciesCard';

export default function CardCollection({ data }: { data: enrichedCardType[] }) {
  return (
    <>
      <h1>Card Collection</h1>
      <Center>
        <Grid>
          {data.map((item: speciesCardType) => (
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
