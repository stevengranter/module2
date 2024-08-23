import { GridCol, Center, Grid } from '@mantine/core';

import { speciesCardType } from 'models/speciesCardType';

import SpeciesCard from './SpeciesCard';

interface CardCollectionProps {
  data: speciesCardType[];
}

export default function CardCollection({ data }: CardCollectionProps) {
  return (
    <>
      <Center>
        <Grid>
          {data?.map((item: speciesCardType) => (
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
