import { useContext } from "react";

import { Button } from "@mantine/core";
import { RoleContext } from "~/contexts/RoleContextProvider.tsx";

export default function StartEndGuestSessionButton() {
  const { user, startGuestSession, endGuestSession } = useContext(RoleContext);
  // const { role } = useContext(RoleContext);

  if (!user || user.id !== "guest") {
    return <Button onClick={startGuestSession}>Continue as Guest</Button>;
  } else if (user && user.id === "guest") {
    return <Button onClick={endGuestSession}>End Guest Session</Button>;
  }
}
