import { Button } from "@mantine/core";
import { useGuest } from "~/contexts/GuestContextProvider.tsx";

export default function StartEndGuestSessionButton() {
  const { guest, startGuestSession, endGuestSession } = useGuest();
  // const { role } = useContext(RoleContext);

  if (!guest || guest.id !== "guest") {
    return <Button onClick={startGuestSession}>Continue as Guest</Button>;
  } else if (guest && guest.id === "guest") {
    return <Button onClick={endGuestSession}>End Guest Session</Button>;
  }
}
