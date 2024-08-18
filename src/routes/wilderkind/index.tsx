import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import SpeciesCard, { speciesType } from 'components/SpeciesCard';

import { Grid, GridCol } from '@mantine/core';

let jsonServerUrl = 'http://localhost:3000/';
jsonServerUrl = import.meta.env.VITE_JSONSERVER_URL;

export const Route = createFileRoute('/wilderkind/')({
  component: WilderKindIndexComponent,
  loader: async () => {
    const response = await fetch(jsonServerUrl + 'wilderkind/');
    const jsonData = response.json();
    return jsonData;
  },
});

function WilderKindIndexComponent() {
  const data = useLoaderData({ from: '/wilderkind/' });
  return (
    <>
      <h2>Welcome to the WilderKind Index</h2>
      <Grid>
        {data?.map((item: speciesType) => (
          <GridCol span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
            <SpeciesCard
              id={item.id}
              nickName={item.nickName}
              commonName={item.commonName}
              imgSrc={'./images/' + item.imgSrc}
              scientificName={item.scientificName}
              description={item.description}
            />
          </GridCol>
        ))}
      </Grid>
    </>
  );
}
