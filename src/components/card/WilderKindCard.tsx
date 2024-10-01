import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import { useWilderKindData } from "hooks/useWilderKindData.ts";

import type { iNatTaxaResponseType } from "../../models/iNatTaxaResponseType.ts";

import { WilderKindCardType } from "../../models/WilderKindCardType.ts";
import { WilderKindCard_SideA } from "./WilderKindCard_SideA.tsx";
import { WilderKindCard_SideB } from "./WilderKindCard_SideB.tsx";
import { WilderKindCard_Skeleton } from "./WilderKindCard_Skeleton.tsx";

type RemoteDataType = iNatTaxaResponseType["results"][number];

export interface CardSideProps {
  localData: WilderKindCardType | null | undefined;
  remoteData: RemoteDataType | null | undefined;
  isLoadingLocal: boolean;
  isLoadingRemote: boolean;
  flipFn: () => void;
  isInUserCollection?: boolean;
}

export default function WilderKindCard(props: {
  cardId?: string;
  isInUserCollection?: false;
}) {
  // Get cardId from URL params, or if not provided, from props
  const params = useParams();
  const cardId = params.cardId || props.cardId;

  // Get collections data from user/guest data
  // const { collections } = useCollections();
  //
  // useEffect(() => {
  //   console.log(collections);
  // }, [collections]);

  // Get data for populating card values
  const { localData, remoteData, loading, error } = useWilderKindData(cardId);

  // State for setting which side of card to show
  const [showFlipSide, setShowFlipSide] = useState(false);
  const flipCard = useCallback(() => setShowFlipSide((prev) => !prev), []);

  //  If card data is still loading, return the skeleton
  if (loading.local) return <WilderKindCard_Skeleton />;

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {!showFlipSide ? (
        <WilderKindCard_SideA
          isLoadingLocal={loading.local}
          isLoadingRemote={loading.remote}
          localData={localData}
          remoteData={remoteData}
          flipFn={flipCard}
          // isInUserCollection={props.isInUserCollection}
        />
      ) : (
        <WilderKindCard_SideB
          isLoadingLocal={loading.local}
          isLoadingRemote={loading.remote}
          localData={localData}
          remoteData={remoteData}
          flipFn={flipCard}
          // isInUserCollection={props.isInUserCollection}
        />
      )}
    </>
  );
}
