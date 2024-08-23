// src/routes/Cards/CardListLoader.tsx
import { userType } from 'models/userType';
import { jsonServerUrl } from 'utils/constants';
import enrichCards from 'utils/enrichCards';
import { fetchData } from 'utils/fetchData';

export interface UserCollectionParams {
  userId: number | string;
}

export async function UserCollectionLoader(params: UserCollectionParams) {
  // const cards = fetchData(jsonServerUrl + '/cards');
  const [user] = (await fetchData(
    jsonServerUrl + '/users?id=' + params.userId
  )) as userType[];
  console.log(user);
  if (!user.collection) {
    throw new Error('User does not have a card collection');
  }

  const userCards = await Promise.all(
    user.collection.map(async (cardId) => {
      // Fetch data for each cardId
      const cardData = await fetchData(jsonServerUrl + '/cards?id=' + cardId);
      return cardData;
    })
  );
  console.log(userCards);
  const flattenedUserCards = userCards.flat();
  console.log(flattenedUserCards);
  // return flattenedUserCards;
  //   const taxonIds = flattenedUserCards
  //     .map((card) => card.taxon_id)
  //     .filter(Boolean); // Filter out any undefined values

  //   const uniqueTaxonIds = Array.from(new Set(taxonIds)); // Ensure unique taxon IDs
  //   const taxonIdQuery = uniqueTaxonIds.join(','); // Create a comma-delimited string
  //   const fetchediNatData = await fetchData(`${iNatAPIUrl}/taxa/${taxonIdQuery}`);

  //   // Step 4: Map the result of the API call back to the original cards
  //   const enrichedCards = flattenedUserCards.map((card) => {
  //     const speciesData = fetchediNatData.results.find(
  //       (species) => species.id === card.taxon_id
  //     );
  //     // Step 5: Combine card data with iNaturalist data
  //     return {
  //       ...card,
  //       preferred_common_name: speciesData?.preferred_common_name || null,
  //       wikipedia_summary: speciesData?.wikipedia_summary || null,
  //       wikipedia_url: speciesData?.wikipedia_url || null,
  //       default_photo: speciesData?.default_photo || null,
  //       name: speciesData?.name || null,
  //     };
  //   });

  return enrichCards(flattenedUserCards); // Return enriched cards with combined data
}
