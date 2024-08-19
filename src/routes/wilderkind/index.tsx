import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import SpeciesCard from 'components/SpeciesCard';
import { speciesType } from 'models/speciesType';

import { Grid, GridCol } from '@mantine/core';

import wretch from 'wretch';

let jsonServerUrl = 'http://localhost:3000/';
jsonServerUrl = import.meta.env.VITE_JSONSERVER_URL;

export const Route = createFileRoute('/wilderkind/')({
  component: WilderKindIndexComponent,
  loader: async () => {
    const response = await wretch(jsonServerUrl + 'wilderkind/')
      .get()
      .json();
    return response;
  },
});

function WilderKindIndexComponent() {
  const data = useLoaderData({ from: '/wilderkind/' });
  return (
    <>
      <h2>Welcome to the WilderKind Index</h2>
      <Grid>
        {data?.map((item: speciesType) => (
          <GridCol
            span={{ base: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
            key={item.id}
          >
            {/* <Link to={item.id.toString()}> */}
            <SpeciesCard
              id={item.id}
              nickName={item.nickName}
              commonName={item.commonName}
              imgSrc={'./images/' + item.imgSrc}
              scientificName={item.scientificName}
              description={item.description}
            />
            {/* </Link> */}
          </GridCol>
        ))}
      </Grid>
    </>
  );
}
