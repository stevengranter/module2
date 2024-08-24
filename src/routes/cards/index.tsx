// import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import CardCollection from 'components/CardCollection';
import { EnrichedCardType } from 'models/EnrichedCardType';

export function CardsIndexRoute() {
  const data = useLoaderData() as EnrichedCardType[];

  return <CardCollection data={data} />;
}
