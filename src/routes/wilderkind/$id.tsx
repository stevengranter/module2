import { createFileRoute } from '@tanstack/react-router';
import {
  useQuery,
  useQueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import fetchData from '../../api/iNaturalist.org.js';

export const Route = createFileRoute('/wilderkind/$id')({
  component: WilderKindComponent,
});

function WilderKindComponent() {
  const queryClient = useQueryClient();
  const { data: iNatData } = useQuery({
    queryKey: ['iNatData'],
    queryFn: () => fetchData('taxa/68901'),
  });

  const { data: localData } = useQuery({
    queryKey: ['wilderkind'],
    queryFn: async () => {
      const url = `http://localhost:3000/wilderkind`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    },
  });

  console.log(localData);
  // const wilderList = () =>
  //   localData.map((item) => {
  //     return (
  //       <ul>
  //         <li>${item.commonName}</li>
  //       </ul>
  //     );
  //   });

  return (
    <>
      <h2>WilderKindComponent</h2>
      <QueryClientProvider client={queryClient}>
        <ul>
          {localData &&
            localData.map((item) => {
              return (
                <ul key={item.id}>
                  <li key={item.id}>{item.id}</li>
                </ul>
              );
            })}
        </ul>
      </QueryClientProvider>
    </>
  );
}
