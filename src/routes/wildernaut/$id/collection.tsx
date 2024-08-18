import { createFileRoute } from '@tanstack/react-router';

import fetchData from 'utils/fetchData.ts';
let jsonServerUrl = 'http://localhost:3000';
jsonServerUrl = import.meta.env.VITE_JSONSERVER_URL;

async function fetchUserData(userId: string) {
  const response = await fetchData(jsonServerUrl + 'users/' + userId);
  return response;
}

async function fetchSpecies(id: string) {
  const response = await fetch('https://api.inaturalist.org/v1/taxa/' + id);
  return await response.json();
}

export const Route = createFileRoute('/wildernaut/$id/collection')({
  loader: async ({ params: { id } }) => {
    const userData = await fetchUserData(id);
    const speciesDataPromises = userData.collection.map(
      async (speciesId: string) => {
        const collectionData = await fetchSpecies(speciesId);
        return collectionData;
      }
    );
    // Wait for all promises to resolve
    return await Promise.all(speciesDataPromises);
  },
});

// export const Route = createFileRoute('/wildernaut/$id/collection')({
//   loader: async ({ params: { id } }) =>z {
//     const userData = await fetchUserData(id);
//     const speciesDataPromises = userData.collection.map(
//       async (speciesId: string) => {
//         const collectionData = await fetchSpecies(speciesId);
//         return collectionData;
//       }
//     );
//     // Wait for all promises to resolve
//     return await Promise.all(speciesDataPromises);
//   },
// });
