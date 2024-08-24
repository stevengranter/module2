import { EnrichedCardType } from 'models/EnrichedCardType';
import { SpeciesCardType } from 'models/SpeciesCardType';
import { UserType } from 'models/UserType';
import { jsonServerUrl } from 'utils/constants';
import enrichCards from 'utils/enrichCards';
import { fetchData } from 'utils/fetchData';

export async function userCollectionLoader(
  userId: undefined | string
): Promise<EnrichedCardType[]> {
  const [user] = (await fetchData(
    jsonServerUrl + '/users?id=' + userId
  )) as UserType[];
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

  const flattenedUserCards = userCards.flat() as SpeciesCardType[];

  return enrichCards(flattenedUserCards); // Return enriched cards with combined data
}
