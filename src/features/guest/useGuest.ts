import { useContext } from "react";

import { GuestSessionContext } from "~/features/guest/GuestSessionProvider.tsx";

export default function useGuest() {
  const ctx = useContext(GuestSessionContext);
  if (ctx === null) {
    return console.log("useGuest must be used inside a GuestSessionProvider");
  }
  return ctx;
}
