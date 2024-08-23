import type { speciesCardType } from 'models/speciesCardType';

import { iNatTaxaResponseType } from 'models/iNatTaxaResponseType';

import { iNatAPIUrl } from './constants';
import { fetchData } from './fetchData';

export default async function enrichCards(cardsArray: speciesCardType[]) {
  //Construct query for iNaturalist API (comma-seperated taxon IDs)

  // Filter out any undefined values
  const taxonIds = cardsArray.map((card) => card.taxon_id).filter(Boolean);

  // Ensure unique taxon IDs
  const uniqueTaxonIds = Array.from(new Set(taxonIds));

  // Create a comma-delimited string
  const taxonIdQuery = uniqueTaxonIds.join(',');

  // Fetch data from iNaturalist API
  const fetchediNatData = (await fetchData(
    `${iNatAPIUrl}/taxa/${taxonIdQuery}`
  )) as iNatTaxaResponseType;

  // Map over cards array
  const enrichedCards = cardsArray.map((card) => {
    const speciesData = fetchediNatData.results.find(
      (species) => species.id === card.taxon_id
    );

    // Combine card data with iNaturalist data
    return {
      ...card,
      preferred_common_name: speciesData?.preferred_common_name || null,
      wikipedia_summary: speciesData?.wikipedia_summary || null,
      wikipedia_url: speciesData?.wikipedia_url || null,
      default_photo: speciesData?.default_photo || null,
      name: speciesData?.name || null,
    };
  });

  // Return enriched cards with combined data
  return enrichedCards;
}
