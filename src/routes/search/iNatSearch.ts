import { iNatAPIUrl } from 'utils/constants';

export default async function iNatSearch(
  queryString: undefined | string | null
) {
  if (!queryString) return 'Please enter a search term';

  return fetch(`${iNatAPIUrl}/taxa?q=${queryString}&rank=species`).then((res) =>
    res.json()
  );
}
