import { useLoaderData } from 'react-router-dom';

import { GridCol, Grid } from '@mantine/core';
import wretch from 'wretch';

import SpeciesCard from '../../components/SpeciesCard';
import { speciesType } from '../../models/speciesType';
import { jsonServerUrl } from '../../utils/constants';

export async function loader() {
  const response = await wretch(jsonServerUrl + '/cards')
    .get()
    .json<speciesType[]>();
  return response;
}

export function CardIndexRoute() {
  const data = useLoaderData() as speciesType[];
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
              scientificName={item.scientificName}
              imgSrc={'./images/' + item.imgSrc}
              description={item.description}
              commonName={item.commonName}
              nickName={item.nickName}
              id={item.id}
            />
            {/* </Link> */}
          </GridCol>
        ))}
      </Grid>
    </>
  );
}
