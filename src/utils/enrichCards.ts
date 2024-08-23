import { enrichedCardType } from 'models/enrichedCardType';
import { iNatTaxaResponseType } from 'models/iNatTaxaResponseType';
import { speciesCardType } from 'models/speciesCardType';

import { iNatAPIUrl } from './constants';
import { fetchData } from './fetchData';

export default async function enrichCards(
  cardsArray: speciesCardType[]
): Promise<enrichedCardType[]> {
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

    console.log(speciesData);
    // Combine card data with iNaturalist data
    return {
      ...card,
      preferred_common_name: speciesData?.preferred_common_name || undefined,
      wikipedia_summary: speciesData?.wikipedia_summary || undefined,
      wikipedia_url: speciesData?.wikipedia_url || undefined,
      default_photo: speciesData?.default_photo || undefined,
      name: speciesData?.name || undefined,
    };
  });

  // Return enriched cards with combined data
  return enrichedCards;
}
