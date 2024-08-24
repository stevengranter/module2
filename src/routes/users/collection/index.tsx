import { useLoaderData } from 'react-router-dom';

import CardCollection from 'components/CardCollection';
import { EnrichedCardType } from 'models/EnrichedCardType';
// import { speciesCardType } from 'models/speciesCardType';

export function UserCollection() {
  const data = useLoaderData() as EnrichedCardType[];
  console.log({ data });
  return <CardCollection data={data} />;
}
