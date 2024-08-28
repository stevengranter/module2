import { EnrichedCardType } from "models/EnrichedCardType.ts";
import { SpeciesCardType } from "models/SpeciesCardType.ts";
import { UserType } from "models/UserType.ts";
import { JSON_SERVER_URL } from "utils/constants.ts";
import enrichCards from "utils/enrichCards.ts";
import { fetchData } from "utils/fetchData.ts";

export async function userCollectionLoader(
  userId: undefined | string,
): Promise<EnrichedCardType[]> {
  const [user] = (await fetchData(
    JSON_SERVER_URL + "/users?id=" + userId,
  )) as UserType[];
  console.log(user);
  if (!user.collection) {
    throw new Error("User does not have a card collection");
  }

  const userCards = await Promise.all(
    user.collection.map(async (cardId) => {
      // Fetch data for each cardId
      const cardData = await fetchData(JSON_SERVER_URL + "/cards?id=" + cardId);
      return cardData;
    }),
  );

  const flattenedUserCards = userCards.flat() as SpeciesCardType[];

  return enrichCards(flattenedUserCards); // Return enriched cards with combined data
}
