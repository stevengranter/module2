import { useContext } from "react";

import { GuestContext } from "~/contexts/GuestContextProvider.tsx";

export function useGuest() {
  const context = useContext(GuestContext);

  if (!context) {
    throw new Error("useGuest must be used within an AuthGuestProvider");
  }
  const {
    guest,
    startGuestSession,
    endGuestSession,
    createCollection,
    addCardToCollection,
    removeCardFromCollection,
    loadGuest,
    saveGuest,
    error,
  } = context;
  return {
    guest,
    startGuestSession,
    createCollection,
    addCardToCollection,
    removeCardFromCollection,
    endGuestSession,
    loadGuest,
    saveGuest,
    error,
  };
}
