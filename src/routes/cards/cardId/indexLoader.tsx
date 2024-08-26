import { defer } from 'react-router-dom';

//
// import { iNatTaxaResponseType } from 'models/iNatTaxaResponseType';
// import { SpeciesCardType } from 'models/SpeciesCardType';
import { jsonServerUrl, iNatAPIUrl } from 'utils/constants';

export async function loader(cardId: undefined | string): Promise<unknown> {
  const localData = await fetch(`${jsonServerUrl}/cards?id=${cardId}`).then(
    (res) => res.json()
  );

  const taxonId = localData[0].taxon_id;

  const iNatData = fetch(`${iNatAPIUrl}/taxa/${taxonId}`).then((res) =>
    res.json()
  );
  return defer({ localData: await localData, iNatData });
}

// export async function cardIdLoader(cardId: undefined | string) {
//   const [data] = (await fetchData(
//     jsonServerUrl + '/cards?id=' + cardId
//   )) as SpeciesCardType[];
//   // const flatData = rawLocaldata.flat();
//   // console.log(data);
//   const fetchediNatData = (await fetchData(
//     iNatAPIUrl + '/taxa/' + data.taxon_id
//   )) as iNatTaxaResponseType;
//   const iNatSpeciesData = fetchediNatData.results[0];
//   // console.log({ iNatSpeciesData });
//   const {
//     preferred_common_name,
//     wikipedia_summary,
//     wikipedia_url,
//     default_photo,
//     name,
//   } = iNatSpeciesData;
//   const iNatDataProps = {
//     preferred_common_name,
//     wikipedia_summary,
//     wikipedia_url,
//     default_photo,
//     name,
//   };
//   // console.log(iNatDataProps);
//   const cardDetailProps = { ...data, ...iNatDataProps };
//   // console.log(cardDetailProps);
//   return cardDetailProps;
// }
