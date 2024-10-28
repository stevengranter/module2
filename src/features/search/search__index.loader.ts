import { INAT_API_URL } from "~/lib/constants.ts";
import { iNatTaxonRecord } from "~/models/iNatTaxaResponseType.ts";

type iNatTaxaSearchResponse = {
  page: number;
  per_page: number;
  results: iNatTaxonRecord[];
  total_results: number;
};
export default async function routeSearchLoader(
  queryString: undefined | string | null,
): Promise<iNatTaxaSearchResponse | string> {
  if (!queryString) return "Please enter a search term";

  const queryUrl = `${INAT_API_URL}/taxa/?rank=species&q=${queryString}`;
  console.log({ queryUrl });

  const response = fetch(queryUrl).then((res) => res.json());
  console.log(await response);

  return response;
}
