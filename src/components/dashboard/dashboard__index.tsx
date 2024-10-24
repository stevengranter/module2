import { useContext } from "react";

import Collections from "~/components/dashboard/Collections.tsx";
import Nest from "~/components/dashboard/Nest.tsx";
import { GuestSessionContext } from "~/features/guest/GuestSessionProvider.tsx";
import ToggleGuestSessionButton from "~/features/guest/ToggleGuestSessionButton.tsx";

export default function Route__Dashboard() {
  const { isGuest } = useContext(GuestSessionContext);

  if (!isGuest) {
    return (
      <>
        <p>You must be a guest to add to collections</p>
        <ToggleGuestSessionButton />
      </>
    );
  }
  return (
    isGuest && (
      <>
        <Nest />
        <Collections />
      </>
    )
  );
}
