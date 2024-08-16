import { createFileRoute } from '@tanstack/react-router';

import {
  useQuery,
  useQueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
// import fetchData from '../../utils/fetchData';

import SpeciesCard from '../../components/SpeciesCard';

export const Route = createFileRoute('/wilderkind/$id')({
  component: WilderKindComponent,
});

function WilderKindComponent() {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ['inat_record'],
    queryFn: async () => {
      const response = await fetch('https://api.inaturalist.org/v1/taxa/48586');
      return await response.json();
    },
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

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
