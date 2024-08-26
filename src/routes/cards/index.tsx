// import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import CardCollection from 'components/CardCollection';
import { EnrichedCardType } from 'models/EnrichedCardType';
// import { EnrichedCardType } from 'models/EnrichedCardType';

// import { CardIdRoute } from './cardId';

export function CardsIndexRoute() {
  const data = useLoaderData() as EnrichedCardType | unknown;

  // return <CardIdRoute />;
  return <CardCollection data={data} />;
}
