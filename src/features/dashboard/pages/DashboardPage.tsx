import { useContext, useEffect, useState } from "react";

import { Title } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import useNest from "~/features/_shared/contexts/nest/useNest.ts";
import { JSON_SERVER_URL } from "~/features/api/constants.ts";
import CardCollection from "~/features/card/components/CardCollection/CardCollection.tsx";
import CollectionSelectBox from "~/features/card/components/CollectionSelectBox.tsx";
import ToggleGuestSessionButton from "~/features/guest-session/components/ToggleGuestSessionButton.tsx";
import useGuest from "~/features/guest-session/hooks/useGuest.ts";
import { WilderKindCardType } from "~/models/WilderKindCardType.ts";

export default function DashboardPage() {
  const { isGuest, guestData } = useGuest();

  const { loading, error, data } = useFetch<WilderKindCardType[]>(`
    ${JSON_SERVER_URL}/cards`);

  const { nest, collections } = guestData;

  const [userCollections, setUserCollections] = useState(() => [
    ...collections.getNames(),
    "nest",
  ]);
  const [selectedCollection, setSelectedCollection] = useState<string>("nest");
  const [collectionItems, setCollectionItems] = useState<number[]>([]);

  useEffect(() => {
    if (isGuest) {
      console.log(guestData);
    }
  }, [isGuest, guestData]);

  useEffect(() => {
    if (!selectedCollection) return console.log("No collection selected");
    if (selectedCollection === "nest") {
      const nestItems = nest.get();
      console.log({ nestItems });
      setCollectionItems(nestItems);
    }
  }, [selectedCollection]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const cardIds = data?.map((card) => card.taxon_id);

  if (!isGuest) {
    return (
      <>
        <p>You must be a guest to add to collections</p>
        <ToggleGuestSessionButton />
        <Title order={2}>Featured</Title>
        <CardCollection collection={cardIds} />
      </>
    );
  }
  return (
    isGuest && (
      <>
        <CollectionSelectBox
          data={userCollections}
          value={selectedCollection}
        />

        <CardCollection collection={collectionItems} />
      </>
    )
  );
}
