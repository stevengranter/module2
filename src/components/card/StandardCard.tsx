import { useEffect, useState } from "react";

import { Card } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { WildCard } from "~/components/card/WildCard.tsx";
import { iNatTaxonRecord } from "~/models/iNatTaxaResponseType.ts";

export default function StandardCard({
  taxon_id,
  prefetchedTaxonData,
}: {
  taxon_id: string;
  prefetchedTaxonData?: iNatTaxonRecord;
}) {
  const query = useQuery({
    queryKey: [`/taxa/${taxon_id}`],
    enabled: !!taxon_id,
  });

  const [cardData, setCardData] = useState<iNatTaxonRecord | undefined>(
    prefetchedTaxonData,
  );

  useEffect(() => {
    if (query.data && query.data.results) {
      setCardData(query.data.results[0]);
    }
  }, [query.data]);

  return cardData && <WildCard dataObject={cardData} />;
}
