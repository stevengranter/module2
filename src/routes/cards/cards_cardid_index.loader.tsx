import { defer } from "react-router-dom";

//
// import { iNatTaxaResponseType } from 'models/iNatTaxaResponseType';
// import { SpeciesCardType } from 'models/SpeciesCardType';
import { JSON_SERVER_URL, INAT_API_URL } from "utils/constants.ts";

export async function loader(cardId: undefined | string): Promise<unknown> {
  const localData = await fetch(`${JSON_SERVER_URL}/cards?id=${cardId}`).then(
    (res) => res.json(),
  );

  const taxonId = localData[0].taxon_id;

  const iNatData = fetch(`${INAT_API_URL}/taxa/${taxonId}`).then((res) =>
    res.json(),
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
