/* eslint-disable react-refresh/only-export-components */
import type { Params } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';

import { GridCol, Center, Grid } from '@mantine/core';
import wretch from 'wretch';

import type { iNatTaxaResponseType } from 'models/iNatTaxaResponseType';
import type { userType } from 'models/userType';

import SpeciesCard from 'components/SpeciesCard';
import { jsonServerUrl } from 'utils/constants';

async function fetchSpecies(id: string) {
  const response = await wretch('https://api.inaturalist.org/v1/taxa/' + id)
    .get()
    .json<iNatTaxaResponseType>();
  return response;
}

export async function loader({ params }: { params: Params<'userId'> }) {
  const response = wretch(jsonServerUrl + '/users?id=' + params.userId)
    .get()
    .json<userType[]>();

  const [user] = await response;
  if (user && user.collection) {
    const speciesDataPromises = user.collection.map(
      async (speciesId: string) => {
        const collectionData = await fetchSpecies(speciesId);
        return collectionData;
      }
    );
    // Wait for all promises to resolve
    return await Promise.all(speciesDataPromises);
  }
}

export function UserCollection() {
  const data = useLoaderData() as iNatTaxaResponseType[];
  console.log(data);
  return (
    <div>
      <h2>CollectionComponent</h2>

      <Center>
        <Grid>
          {data?.map((item, index: number) => {
            const {
              preferred_common_name,
              wikipedia_summary,
              default_photo,
              name,
              id,
            } = item.results[0];
            return (
              <GridCol
                span={{ base: 12, sm: 6, md: 4, lg: 3, xl: 2, xs: 6 }}
                key={index}
              >
                <SpeciesCard
                  commonName={preferred_common_name}
                  imgSrc={default_photo.medium_url}
                  description={wikipedia_summary}
                  scientificName={name}
                  id={id}
                />
              </GridCol>
            );
          })}
        </Grid>
      </Center>
    </div>
  );
}
