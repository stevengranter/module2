import { useLoaderData } from 'react-router-dom';
import type { Params } from 'react-router-dom';
import wretch from 'wretch';
import { userType } from 'models/userType';
import { Grid, GridCol } from '@mantine/core';
import SpeciesCard from 'components/SpeciesCard';
import { iNatTaxaResponseType } from 'models/iNatTaxaResponseType';

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

// export const Route = createFileRoute('/users/$id/collection')({
//   component: CollectionComponent,
//   beforeLoad: ({ params: { id } }) => ({
//     fetchUser: () => {
//       const response = wretch(jsonServerUrl + '/users?id=' + id)
//         .get()
//         .json<userType[]>();
//       return response;
//     },
//   }),
//   loader: async ({ context: { fetchUser } }) => {
//     const [user] = await fetchUser();
//     if (user && user.collection) {
//       const speciesDataPromises = user.collection.map(
//         async (speciesId: string) => {
//           const collectionData = await fetchSpecies(speciesId);
//           return collectionData;
//         }
//       );
//       // Wait for all promises to resolve
//       return await Promise.all(speciesDataPromises);
//     }
//   },
// });

export function UserCollection() {
  const data = useLoaderData() as iNatTaxaResponseType[];
  console.log(data);
  return (
    <div>
      <h2>CollectionComponent</h2>
      <Grid>
        {data?.map((item, index: number) => {
          const {
            id,
            preferred_common_name,
            name,
            wikipedia_summary,
            default_photo,
          } = item.results[0];

          return (
            <GridCol
              key={index}
              span={{ base: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
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
