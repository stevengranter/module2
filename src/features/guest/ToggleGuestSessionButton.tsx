import { useContext } from "react";

import { Button } from "@mantine/core";
import { GuestSessionContext } from "~/features/guest/GuestSessionProvider.tsx";

export default function ToggleGuestSessionButton() {
  const { isGuest, startGuestSession, endGuestSession, guestData } =
    useContext(GuestSessionContext);

  if (!isGuest) {
    return <Button onClick={startGuestSession}>Continue as Guest</Button>;
  } else {
    return <Button onClick={endGuestSession}>End Guest Session</Button>;
  }
}
