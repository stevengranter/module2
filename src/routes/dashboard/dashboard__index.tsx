import { useContext } from "react";

import { Title } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import CardCollection from "~/components/card/CardCollection.tsx";
import ToggleGuestSessionButton from "~/features/guest/ToggleGuestSessionButton.tsx";
import useGuest from "~/features/guest/useGuest.ts";
import { JSON_SERVER_URL } from "~/lib/constants.ts";
import { WilderKindCardType } from "~/models/WilderKindCardType.ts";
import Collections from "~/routes/dashboard/Collections.tsx";
import Nest from "~/routes/dashboard/Nest.tsx";

export default function Route__Dashboard() {
  const { isGuest } = useGuest();
  const { loading, error, data } = useFetch<WilderKindCardType[]>(`
    ${JSON_SERVER_URL}/cards`);

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
        <Nest />

        <Collections />
      </>
    )
  );
}
