import { useContext } from "react";

import { Title } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { JSON_SERVER_URL } from "~/features/_shared/lib/constants.ts";
import CardCollection from "~/features/card/components/CardCollection/CardCollection.tsx";
import Collections from "~/features/dashboard/components/Collections.tsx";
import Nest from "~/features/dashboard/components/Nest.tsx";
import ToggleGuestSessionButton from "~/features/guest-session/components/ToggleGuestSessionButton.tsx";
import useGuest from "~/features/guest-session/hooks/useGuest.ts";
import { WilderKindCardType } from "~/models/WilderKindCardType.ts";

export default function DashboardPage() {
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
