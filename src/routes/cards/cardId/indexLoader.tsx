import { iNatTaxaResponseType } from 'models/iNatTaxaResponseType';
import { speciesCardType } from 'models/speciesCardType';
import { jsonServerUrl, iNatAPIUrl } from 'utils/constants';
import { fetchData } from 'utils/fetchData';

export interface cardIdLoaderParams {
  cardId: string;
}

export async function cardIdLoader(params: cardIdLoaderParams) {
  const [data] = (await fetchData(
    jsonServerUrl + '/cards?id=' + params.cardId
  )) as speciesCardType[];
  // const flatData = rawLocaldata.flat();
  // console.log(data);
  const fetchediNatData = (await fetchData(
    iNatAPIUrl + '/taxa/' + data.taxon_id
  )) as iNatTaxaResponseType;
  const iNatSpeciesData = fetchediNatData.results[0];
  // console.log({ iNatSpeciesData });
  const {
    preferred_common_name,
    wikipedia_summary,
    wikipedia_url,
    default_photo,
    name,
  } = iNatSpeciesData;
  const iNatDataProps = {
    preferred_common_name,
    wikipedia_summary,
    wikipedia_url,
    default_photo,
    name,
  };
  // console.log(iNatDataProps);
  const cardDetailProps = { ...data, ...iNatDataProps };
  // console.log(cardDetailProps);
  return cardDetailProps;
}
