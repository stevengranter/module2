/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from 'react-router-dom';

import { speciesCardType } from 'models/speciesCardType';

import SpeciesCard from '../../../components/SpeciesCard';

export function CardIdRoute() {
  const data = useLoaderData() as speciesCardType;
  return <SpeciesCard {...data} />;
}
