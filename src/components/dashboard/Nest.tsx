import { useContext } from "react";
import { Link } from "react-router-dom";

import { Title } from "@mantine/core";
import CardCollection from "~/components/card/CardCollection.tsx";
import { GuestSessionContext } from "~/features/guest/GuestSessionProvider.tsx";
import { NestContext } from "~/features/nest/NestProvider.tsx";

export default function Nest() {
  const { isGuest } = useContext(GuestSessionContext);
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
      <CardCollection collection={nest.get()} key="1" />
    </>
  );
}
