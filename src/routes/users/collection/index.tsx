import { useLoaderData } from 'react-router-dom';

import CardCollection from 'components/CardCollection';
import { speciesCardType } from 'models/speciesCardType';

export function UserCollection() {
  const data = useLoaderData() as speciesCardType[];

  return <CardCollection data={data} />;
}
