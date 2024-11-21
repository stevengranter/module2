import { useContext } from "react";
import { Link } from "react-router-dom";

import { Title } from "@mantine/core";
import { NestContext } from "~/features/_shared/contexts/nest/NestProvider.tsx";
import CardCollection from "~/features/card/components/CardCollection/CardCollection.tsx";
import useGuest from "~/features/guest-session/hooks/useGuest.ts";

export default function Nest() {
  const { isGuest } = useGuest();
  const { nest } = useContext(NestContext);

  if (nest.get().length === 0) {
    return (
      <p>
        Nothing here yet, visit <Link to="/search">search</Link> to add to your
        nest.
      </p>
    );
  }
  return (
    <>
      <Title order={3}>my Nest</Title>
      <CardCollection itemIdArray={nest.get()} key="1" />
    </>
  );
}
