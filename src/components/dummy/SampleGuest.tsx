import { useContext } from "react";

import { Title } from "@mantine/core";
import { GuestSessionContext } from "~/features/guest/GuestSessionProvider.tsx";
import ToggleGuestSessionButton from "~/features/guest/ToggleGuestSessionButton.tsx";

export function SampleGuest() {
  const { isGuest, startGuestSession, endGuestSession } =
    useContext(GuestSessionContext);
  return (
    <>
      <Title order={2}>Sample Guest</Title>
      <ToggleGuestSessionButton />
    </>
  );
}
