import { useEffect, useState } from "react";

import type { NestContextProps } from "~/features/_shared/contexts/nest/NestProvider.tsx";

import { Title } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { JSON_SERVER_URL } from "~/features/api/constants.ts";
import CardCollection from "~/features/card/components/CardCollection/CardCollection.tsx";
import CollectionSelectBox from "~/features/card/components/CollectionSelectBox.tsx";
import ToggleGuestSessionButton from "~/features/guest-session/components/ToggleGuestSessionButton.tsx";
import useGuest from "~/features/guest-session/hooks/useGuest.ts";
import { WilderKindCardType } from "~/models/WilderKindCardType.ts";

export default function CollectionView({
  nest,
  collections,
}: NestContextProps) {
  const [data, setData] = useState(() => {
    if (collections) {
      return collections.getNames();
    } else return [];
  });

  return (
    <>
      <CollectionSelectBox data={data} value="" />

      <CardCollection collection={[]} />
    </>
  );
}
