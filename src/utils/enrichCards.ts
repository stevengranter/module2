import { EnrichedCardType } from "models/EnrichedCardType";
import { iNatTaxaResponseType } from "models/iNatTaxaResponseType";
import { SpeciesCardType } from "models/SpeciesCardType";

import { INAT_API_URL } from "./constants.ts";
import { fetchData } from "./fetchData";

export default async function enrichCards(
  cardsArray: SpeciesCardType[],
): Promise<EnrichedCardType[]> {
  //Construct query for iNaturalist API (comma-seperated taxon IDs)

  // Filter out any undefined values
  const taxonIds = cardsArray.map((card) => card.taxon_id).filter(Boolean);

  // Ensure unique taxon IDs
  const uniqueTaxonIds = Array.from(new Set(taxonIds));

  // Create a comma-delimited string
  const taxonIdQuery = uniqueTaxonIds.join(",");

  // Fetch data from iNaturalist API
  const fetchedData = (await fetchData(
    `${INAT_API_URL}/taxa/${taxonIdQuery}`,
  )) as iNatTaxaResponseType;
  console.log(fetchedData);

  // Map over cards array
  // Return enriched cards with combined data
  return cardsArray.map((card) => {
    const speciesData = fetchedData.results.find(
      (species) => species.id === card.taxon_id,
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
}
