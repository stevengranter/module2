import { createFileRoute, useLoaderData } from '@tanstack/react-router';

import SpeciesCard from '../../components/SpeciesCard';

async function fetchSpecies(id: number) {
  const response = await fetch('https://api.inaturalist.org/v1/taxa/' + id);
  return await response.json();
}

export const Route = createFileRoute('/wilderkind/$id')({
  component: WilderKindComponent,
  loader: async ({ params: { id } }) => {
    return await fetchSpecies(id);
  },
});

function WilderKindComponent() {
  const data = useLoaderData({ from: '/wilderkind/$id' });
  const iNatRecord = data.results[0];
  console.log(iNatRecord);

  // const myData = data.results[0];

  // console.log(myData.preferred_common_name);
  // const { data: localData } = useQuery({
  //   queryKey: ['wilderkind'],
  //   queryFn: async () => {
  //     const url = `http://localhost:3000/wilderkind`;

  //     try {
  //       const response = await fetch(url);

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       return await response.json();
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       throw error;
  //     }
  //   },
  // });

  return (
    <SpeciesCard
      id={iNatRecord.id}
      imgSrc={iNatRecord.default_photo.medium_url}
      commonName={iNatRecord.preferred_common_name}
      scientificName={iNatRecord.name}
      description={iNatRecord.wikipedia_summary}
    ></SpeciesCard>
  );
}
