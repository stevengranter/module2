import { useLoaderData } from 'react-router-dom';

import CardCollection from 'components/CardCollection';
import { enrichedCardType } from 'models/enrichedCardType';
// import { speciesCardType } from 'models/speciesCardType';

export function UserCollection() {
  const data = useLoaderData() as enrichedCardType[];
  console.log({ data });
  return <CardCollection data={data} />;
}
