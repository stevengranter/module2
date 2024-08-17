import { createFileRoute, useLoaderData } from '@tanstack/react-router';

import SpeciesCard from '../../components/SpeciesCard';

async function fetchSpecies(id: string) {
  const response = await fetch('https://api.inaturalist.org/v1/taxa/' + id);
  return await response.json();
}

export const Route = createFileRoute('/wilderkind/$id')({
  component: WilderKindComponent,
  loader: async ({ params: { id } }) => {
    return await fetchSpecies(id);
  },
});

function WilderKindComponent() {
  const data = useLoaderData({ from: '/wilderkind/$id' });
  const iNatRecord = data.results[0];

  return (
    <SpeciesCard
      id={iNatRecord.id}
      imgSrc={iNatRecord.default_photo.medium_url}
      commonName={iNatRecord.preferred_common_name}
      scientificName={iNatRecord.name}
      description={iNatRecord.wikipedia_summary}
    ></SpeciesCard>
  );
}
