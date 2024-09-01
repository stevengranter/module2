import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import { useWilderKindData } from "hooks/useWilderKindData.ts";

import type { iNatTaxaResponseType } from "../../models/iNatTaxaResponseType.ts";

import { WilderKindCardType } from "../../models/WilderKindCardType.ts";
import { CardSideA } from "./CardSideA.tsx";
import { CardSideB } from "./CardSideB.tsx";
import { WilderKindCardSkeleton } from "./WilderKindCardSkeleton.tsx";

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

  if (isLoading.local) return <WilderKindCardSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {!showFlipSide ? (
        <CardSideA
          isLoadingLocal={isLoading.local}
          isLoadingRemote={isLoading.remote}
          localData={localData}
          remoteData={remoteData}
          flipFn={flipCard}
        />
      ) : (
        <CardSideB
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
