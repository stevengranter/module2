import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import SpeciesCard from 'components/SpeciesCard';
import { speciesType } from 'models/speciesType';

import { Grid, GridCol } from '@mantine/core';

import wretch from 'wretch';

import { jsonServerUrl } from 'utils/constants';

export const Route = createFileRoute('/cards/')({
  component: WilderKindIndexComponent,
  loader: async () => {
    const response = await wretch(jsonServerUrl + '/cards')
      .get()
      .json<speciesType[]>();
    return response;
  },
});

function WilderKindIndexComponent() {
  const data = useLoaderData({ from: '/cards/' });
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
