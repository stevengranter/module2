import { iNatAPIUrl } from 'utils/constants';

export default async function iNatSearch(
  queryString: undefined | string | null
) {
  return fetch(`${iNatAPIUrl}/taxa?q=${queryString}&rank=species`).then((res) =>
    res.json()
  );
}
