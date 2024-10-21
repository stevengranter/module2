import { createContext, ReactNode, useState } from "react";

import useStorage from "~/features/localUser/hooks/useStorage.ts";

type GuestSessionContext = {
  isGuest: boolean;
  storage: object;
  saveStorage: () => void;
  updateStorage: (updates: object) => void;
};

export const GuestSessionContext = createContext<GuestSessionContext | null>({
  isGuest: false,
  storage: () => {},
  saveStorage: () => {},
  updateStorage: () => {},
});

export default function GuestSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const guestData = useStorage("__guest__", sessionStorage);
  const [isGuest, setIsGuest] = useState(false);

  return (
    <GuestSessionContext.Provider value={{ guestData, isGuest }}>
      {children}
    </GuestSessionContext.Provider>
  );
}
