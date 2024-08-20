/* eslint-disable react-refresh/only-export-components */
import { useLoaderData, useNavigate, Link } from 'react-router-dom';

// import { iNatTaxaResponseType } from 'models/iNatTaxaResponseType';
import type { speciesType } from 'models/speciesType';

import SpeciesCard from '../../components/SpeciesCard';

// export async function loader({ params }: { params: Params<'cardId'> }) {
//   const response = await fetch(
//     'https://api.inaturalist.org/v1/taxa/' + params.cardId
//   );
//   const jsonData: iNatTaxaResponseType = await response.json();
//   return jsonData;
// }

export function CardDetailRoute() {
  const navigate = useNavigate();
  const [data] = useLoaderData() as speciesType[];
  return (
    <Link
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
      style={{ textDecoration: 'none' }}
      to={'..'}
    >
      <SpeciesCard {...data} />
    </Link>
  );
}
