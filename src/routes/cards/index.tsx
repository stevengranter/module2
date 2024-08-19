import { speciesType } from 'models/speciesType';
import wretch from 'wretch';
import { jsonServerUrl } from 'utils/constants';
import { Grid, GridCol } from '@mantine/core';
import SpeciesCard from 'components/SpeciesCard';
import { useLoaderData } from 'react-router-dom';

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
