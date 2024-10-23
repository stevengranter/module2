import { createContext, ReactNode, useContext, useState } from "react";

import { NestContext } from "~/features/nest/NestProvider.tsx";

export const GuestSessionContext = createContext<GuestSessionContext>({
  isGuest: false,
  startGuestSession: () => {},
  endGuestSession: () => {},
});

export default function GuestSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isGuest, setIsGuest] = useState(false);
  const { nest, collections } = useContext(NestContext);

  function startGuestSession() {
    console.log("START: Guest session");
    nest.clear();
    collections.clear();
    setIsGuest(true);
  }

  function endGuestSession() {
    console.log("END: Guest session");
    nest.clear();
    collections.clear();
    setIsGuest(false);
  }

  return (
    <GuestSessionContext.Provider
      value={{
        isGuest,
        startGuestSession,
        endGuestSession,
      }}
    >
      {children}
    </GuestSessionContext.Provider>
  );
}
