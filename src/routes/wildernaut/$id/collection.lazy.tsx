import { createLazyFileRoute, useLoaderData } from '@tanstack/react-router';

import { Grid, GridCol, Loader } from '@mantine/core';
import SpeciesCard from '../../../components/SpeciesCard';

export const Route = createLazyFileRoute('/wildernaut/$id/collection')({
  component: CollectionComponent,
  pendingComponent: Loader,
});

export function CollectionComponent() {
  const data = useLoaderData({ from: '/wildernaut/$id/collection' });
  return (
    <div>
      <h2>CollectionComponent</h2>
      <Grid>
        {data.map((species, index) => {
          const {
            id,
            preferred_common_name,
            name,
            wikipedia_summary,
            default_photo,
          } = species.results[0];

          return (
            <GridCol
              key={index}
              span={{ base: 12, sm: 6, md: 4, lg: 3 }}
            >
              <SpeciesCard
                id={id}
                commonName={preferred_common_name}
                scientificName={name}
                description={wikipedia_summary}
                imgSrc={default_photo.medium_url}
              />
            </GridCol>
          );
        })}
      </Grid>
    </div>
  );
}
