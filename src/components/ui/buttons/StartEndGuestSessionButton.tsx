import { useContext } from "react";

import { Button } from "@mantine/core";
import { GuestSessionContext } from "~/features/localUser/contexts/GuestSessionProvider.tsx";

export default function StartEndGuestSessionButton() {
  const { isGuest, startSession, endSession, guestData } =
    useContext(GuestSessionContext);

  if (!isGuest) {
    return <Button>Continue as Guest</Button>;
  } else {
    return <Button>End Guest Session</Button>;
  }
}
