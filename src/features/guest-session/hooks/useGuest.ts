import { useContext } from "react";

import { GuestSessionContext } from "~/features/guest-session/context/GuestSessionProvider.tsx";

export default function useGuest() {
  const context = useContext(GuestSessionContext);
  if (!context) {
    throw new Error("Guest Context not found");
  }
  return context;
}
