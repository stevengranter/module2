import { createFileRoute } from '@tanstack/react-router';

async function fetchUserData(id: string) {
  const response = await fetch('http://localhost:3000/users/' + id);
  return await response.json();
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
