import { INAT_API_URL } from "~/lib/constants.ts";

export default async function routeSearchLoader(
  queryString: undefined | string | null,
) {
  if (!queryString) return "Please enter a search term";

  return fetch(`${INAT_API_URL}/taxa/?rank=species&q=${queryString}`).then(
    (res) => res.json(),
  );
}
