// import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import CardCollection from 'components/CardCollection';
import { enrichedCardType } from 'models/enrichedCardType';

export function CardsIndexRoute() {
  const data = useLoaderData() as enrichedCardType[];

  return <CardCollection data={data} />;
}
