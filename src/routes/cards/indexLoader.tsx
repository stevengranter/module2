// src/routes/Cards/CardListLoader.tsx
import { iNatTaxaResponseType } from 'models/iNatTaxaResponseType';
import { SpeciesCardType } from 'models/SpeciesCardType';
import { jsonServerUrl, iNatAPIUrl } from 'utils/constants';
import { fetchData } from 'utils/fetchData';

export async function loader() {
  const cards = await fetch(
    `${jsonServerUrl}/cards?_sort=nickname&order=asc`
  ).then((res) => res.json());

  const taxonQueryString = constructTaxaQueryString(cards);

  const iNatData = (await fetch(`${iNatAPIUrl}/taxa/${taxonQueryString}`).then(
    (res) => res.json()
  )) as iNatTaxaResponseType;

  if (!iNatData) return null;

  const enrichedCards = cards.map((card: SpeciesCardType) => {
    const iNatTaxonData = iNatData.results.find(
      (species) => species.id === card.taxon_id
    );
    // Step 5: Combine card data with iNaturalist data
    return {
      ...card,
      preferred_common_name: iNatTaxonData?.preferred_common_name || null,
      wikipedia_summary: iNatTaxonData?.wikipedia_summary || null,
      wikipedia_url: iNatTaxonData?.wikipedia_url || null,
      default_photo: iNatTaxonData?.default_photo || null,
      name: iNatTaxonData?.name || null,
    };
  });
  console.log(enrichedCards);

  return enrichedCards;
}

function constructTaxaQueryString(cards: SpeciesCardType[]) {
  const taxonIds = cards.map((card) => card.taxon_id).filter(Boolean); // Filter out any undefined values
  const uniqueTaxonIds = Array.from(new Set(taxonIds)); // Ensure unique taxon IDs
  const taxonIdQuery = uniqueTaxonIds.join(','); // Create a comma-delimited string
  return taxonIdQuery;
}

export async function cardsIndexLoader() {
  const cards = (await fetchData(
    jsonServerUrl + '/cards'
  )) as SpeciesCardType[];

  const taxonIds = cards.map((card) => card.taxon_id).filter(Boolean); // Filter out any undefined values

  const uniqueTaxonIds = Array.from(new Set(taxonIds)); // Ensure unique taxon IDs
  const taxonIdQuery = uniqueTaxonIds.join(','); // Create a comma-delimited string
  const fetchediNatData = (await fetchData(
    `${iNatAPIUrl}/taxa/${taxonIdQuery}`
  )) as iNatTaxaResponseType;

  // Step 4: Map the result of the API call back to the original cards
  const enrichedCards = cards.map((card) => {
    const speciesData = fetchediNatData.results.find(
      (species) => species.id === card.taxon_id
    );
    // Step 5: Combine card data with iNaturalist data
    return {
      ...card,
      preferred_common_name: speciesData?.preferred_common_name || null,
      wikipedia_summary: speciesData?.wikipedia_summary || null,
      wikipedia_url: speciesData?.wikipedia_url || null,
      default_photo: speciesData?.default_photo || null,
      name: speciesData?.name || null,
    };
  });

  return enrichedCards; // Return enriched cards with combined data
}
