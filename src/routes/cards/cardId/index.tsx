import { useLoaderData } from 'react-router-dom';

import SpeciesCard from 'components/SpeciesCard';
import { SpeciesCardType } from 'models/SpeciesCardType';

export function CardIdRoute() {
  const data = useLoaderData() as SpeciesCardType;

  return <SpeciesCard {...data} />;
}
