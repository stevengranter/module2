import { createFileRoute } from '@tanstack/react-router';

import {
  useQuery,
  useQueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

export const Route = createFileRoute('/wildernaut/$id/')({
  component: WilderNautComponent,
});

function WilderNautComponent() {
  const queryClient = useQueryClient();
  const { data: localData } = useQuery({
    queryKey: ['wilderkind'],
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

  console.log(localData);

  return (
    <QueryClientProvider client={queryClient}>
      <h2>Welcome WilderNaut!</h2>

      {/* {localData.map((item) => {
        return (
          <>
            <Image src={item.imageSrc} />
            <ul>
              <li>{item.id}</li>
              <li>
                {item.firstName} {item.lastName}
              </li>
            </ul>
          </>
        );
      })} */}
    </QueryClientProvider>
  );
}
