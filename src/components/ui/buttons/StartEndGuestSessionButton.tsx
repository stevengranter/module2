import { Button } from "@mantine/core";
import { useUser } from "~/hooks/useUser.ts";

export default function StartEndGuestSessionButton() {
  const { user, startGuestSession, endGuestSession } = useUser();
  // const { role } = useContext(RoleContext);

  if (!user || user.id !== "guest") {
    return <Button onClick={startGuestSession}>Continue as Guest</Button>;
  } else if (user && user.id === "guest") {
    return <Button onClick={endGuestSession}>End Guest Session</Button>;
  }
}
