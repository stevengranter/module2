import { useContext } from "react";

import { Button } from "@mantine/core";
import { RoleContext } from "~/contexts/RoleContextProvider.tsx";
import { endGuestSession, startGuestSession } from "~/lib/utils.ts";

export default function StartEndGuestSessionButton() {
  const { role, isAuthenticated } = useContext(RoleContext);

  if (role === "public" && isAuthenticated === false) {
    return <Button onClick={startGuestSession}>Continue as Guest</Button>;
  } else if (role === "guest") {
    return <Button onClick={endGuestSession}>End Guest Session</Button>;
  }
}
