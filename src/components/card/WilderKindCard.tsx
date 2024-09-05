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
}

export default function WilderKindCard(props: { cardId?: string }) {
  const params = useParams();
  const cardId = params.cardId || props.cardId;

  const { localData, remoteData, isLoading, error } = useWilderKindData(cardId);

  const [showFlipSide, setShowFlipSide] = useState(false);
  const flipCard = useCallback(() => setShowFlipSide((prev) => !prev), []);

  if (isLoading.local) return <WilderKindCard_Skeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {!showFlipSide ? (
        <WilderKindCard_SideA
          isLoadingLocal={isLoading.local}
          isLoadingRemote={isLoading.remote}
          localData={localData}
          remoteData={remoteData}
          flipFn={flipCard}
        />
      ) : (
        <WilderKindCard_SideB
          isLoadingLocal={isLoading.local}
          isLoadingRemote={isLoading.remote}
          localData={localData}
          remoteData={remoteData}
          flipFn={flipCard}
        />
      )}
    </>
  );
}
