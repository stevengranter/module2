import { createContext, ReactNode, useState } from "react";

import useStorage from "~/features/localUser/hooks/useStorage.ts";

type GuestSessionContext = {
  isGuest: boolean;
  guestData: object | null;
  startGuestSession: () => void | null;
  endGuestSession: () => void | null;
};

export const GuestSessionContext = createContext<GuestSessionContext>({
  isGuest: false,
  guestData: null,
  startGuestSession: () => {},
  endGuestSession: () => {},
});

const guestSessionDataTemplate = {
  birthdate: "9999-000-000",
  description: "",
  firstName: "Local",
  id: "1",
  imgSrc: "",
  lastName: "User",
  password: "",
  title: "Local User",
  username: "localUser",
  nest: {
    creatures: [48586, 59442, 494559],
  },
  collections: [
    {
      id: "c991fb44-1a27-4b5d-be0a-dda631d1c5c6",
      name: "favorites",
      items: [48586, 59442, 494559],
    },
  ],
};

export default function GuestSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const guestData = useStorage("__guest__", sessionStorage);
  const [isGuest, setIsGuest] = useState(false);

  function startGuestSession() {
    console.log("START: Guest session");
    guestData.clearStorage();
    guestData.updateStorage(guestSessionDataTemplate);
    setIsGuest(true);
  }

  function endGuestSession() {
    console.log("END: Guest session");
    guestData.clearStorage();
    setIsGuest(false);
  }

  return (
    <GuestSessionContext.Provider
      value={{
        guestData,
        isGuest,
        startGuestSession,
        endGuestSession,
      }}
    >
      {children}
    </GuestSessionContext.Provider>
  );
}
