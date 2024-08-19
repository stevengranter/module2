import { iNatTaxaResponseType } from 'models/iNatTaxaResponseType';
import type { Params } from 'react-router-dom';
import SpeciesCard from '../../components/SpeciesCard';
import { useLoaderData } from 'react-router-dom';

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
      id={iNatTaxaRecord.id}
      imgSrc={iNatTaxaRecord.default_photo.medium_url}
      commonName={iNatTaxaRecord.preferred_common_name}
      scientificName={iNatTaxaRecord.name}
      description={iNatTaxaRecord.wikipedia_summary}
    ></SpeciesCard>
  );
}
