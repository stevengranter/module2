import { useLoaderData } from 'react-router-dom';

import SpeciesCard from 'components/SpeciesCard';
import { speciesCardType } from 'models/speciesCardType';

export function CardIdRoute() {
  const data = useLoaderData() as speciesCardType;

  return <SpeciesCard {...data} />;
}
