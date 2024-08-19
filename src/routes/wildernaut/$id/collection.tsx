import { createFileRoute } from '@tanstack/react-router';
import wretch from 'wretch';

let jsonServerUrl = 'http://localhost:3000';
jsonServerUrl = import.meta.env.VITE_JSONSERVER_URL;

async function fetchUserData(userId: string) {
  const response = await wretch(jsonServerUrl + 'users/' + userId)
    .get()
    .json();
  return response;
}

async function fetchSpecies(id: string) {
  const response = await wretch('https://api.inaturalist.org/v1/taxa/' + id)
    .get()
    .json();
  return response;
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
