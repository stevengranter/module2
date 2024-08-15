import { createFileRoute } from '@tanstack/react-router';
import {
  useQuery,
  useQueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import fetchData from '../../../api/iNaturalist.org.js';

export const Route = createFileRoute('/wildernaut/$id/collection')({
  component: CollectionComponent,
});

function CollectionComponent() {
  const queryClient = useQueryClient();
  const { data: localData } = useQuery({
    queryKey: ['wildernaut'],
    queryFn: async () => {
      const url = `http://localhost:3000/users`;

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

  return (
    <>
      <h2>WilderKindComponent</h2>
      <QueryClientProvider client={queryClient}>
        <ul></ul>
      </QueryClientProvider>
    </>
  );
}
