import { userType } from 'models/userType';
import { jsonServerUrl } from 'utils/constants';
import enrichCards from 'utils/enrichCards';
import { fetchData } from 'utils/fetchData';

export interface UserCollectionParams {
  userId: number | string;
}

export async function UserCollectionLoader(params: UserCollectionParams) {
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

  const flattenedUserCards = userCards.flat();

  return enrichCards(flattenedUserCards); // Return enriched cards with combined data
}
