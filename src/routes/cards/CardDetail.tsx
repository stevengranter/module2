import type { Params } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';

import { iNatTaxaResponseType } from 'models/iNatTaxaResponseType';

import SpeciesCard from '../../components/SpeciesCard';

export async function loader({ params }: { params: Params<'cardId'> }) {
  const response = await fetch(
    'https://api.inaturalist.org/v1/taxa/' + params.cardId
  );
  const jsonData: iNatTaxaResponseType = await response.json();
  return jsonData;
}

export function CardDetailRoute() {
  const data = useLoaderData() as iNatTaxaResponseType;
  const iNatTaxaRecord = data.results[0];
  return (
    <SpeciesCard
      commonName={iNatTaxaRecord.preferred_common_name}
      imgSrc={iNatTaxaRecord.default_photo.medium_url}
      description={iNatTaxaRecord.wikipedia_summary}
      scientificName={iNatTaxaRecord.name}
      id={iNatTaxaRecord.id}
    ></SpeciesCard>
  );
}
