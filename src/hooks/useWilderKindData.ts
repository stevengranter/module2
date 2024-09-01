import { useEffect, useState } from "react";

import { iNatTaxaResponseType } from "models/iNatTaxaResponseType.ts";
import { WilderKindCardType } from "models/WilderKindCardType.ts";
import { INAT_API_URL, JSON_SERVER_URL } from "utils/constants.ts";

export function useWilderKindData(cardId: string | undefined) {
  const [localData, setLocalData] = useState<WilderKindCardType | null>(null);
  const [remoteData, setRemoteData] = useState<
    iNatTaxaResponseType["results"][0] | null
  >(null);
  const [isLoading, setIsLoading] = useState({ local: true, remote: true });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        const response = await fetch(`${JSON_SERVER_URL}/cards?id=${cardId}`);
        if (!response.ok) {
          setError("Network response was not ok");
          return;
        }
        const localCardData = await response.json();
        if (localCardData.length > 0) setLocalData(localCardData[0]);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setIsLoading((prev) => ({ ...prev, local: false }));
      }
    };

    if (cardId) fetchLocalData();
  }, [cardId]);

  useEffect(() => {
    const fetchRemoteData = async () => {
      if (localData?.taxon_id) {
        try {
          const response = await fetch(
            `${INAT_API_URL}/taxa/${localData.taxon_id}`,
          );
          if (!response.ok) {
            setError("Network response was not ok");
            return;
          }
          const remoteCardData = await response.json();
          setRemoteData(remoteCardData.results[0]);
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "An unknown error occurred";
          setError(errorMessage);
        } finally {
          setIsLoading((prev) => ({ ...prev, remote: false }));
        }
      }
    };

    if (localData) fetchRemoteData();
  }, [localData]);

  return { localData, remoteData, isLoading, error };
}
