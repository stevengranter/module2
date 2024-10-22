import { createContext, ReactNode, useState } from "react";

import { useSessionStorage } from "@mantine/hooks";

export const GuestSessionContext = createContext<GuestSessionContext>({
  isGuest: false,
  guestData: null,
  startGuestSession: () => {},
  endGuestSession: () => {},
});

const guestSessionDataTemplate = {
  id: "1",
  username: "guest",
  nest: {
    creatures: [48586, 59442, 494559],
  },
  collections: [
    {
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
  const [guestData, setGuestData] = useSessionStorage({
    key: "guest",
    defaultValue: {
      id: "1",
      username: "guest",
      nest: {
        items: [48586, 59442, 494559],
        collections: [
          {
            name: "starter",
            items: [48586, 59442, 494559],
          },
        ],
      },
    },
  });
  const [isGuest, setIsGuest] = useState(false);

  function startGuestSession() {
    console.log("START: Guest session");
    try {
      sessionStorage.get("guest");
    } catch {
      sessionStorage.setItem("guest", JSON.stringify(guestSessionDataTemplate));
      console.log("No guest in sessionStorage, creating guest");
      sessionStorage.getItem("guest");
      console.log(sessionStorage.getItem("guest"));
    }
    setIsGuest(true);
  }

  function updateGuestSessionStorage(data) {
    const currentGuest = sessionStorage.getItem("guest");
    console.log(currentGuest);
  }

  function endGuestSession() {
    console.log("END: Guest session");
    sessionStorage.removeItem("guest");
    setIsGuest(false);
  }

  return (
    <GuestSessionContext.Provider
      value={{
        isGuest,
        guestData,
        startGuestSession,
        endGuestSession,
      }}
    >
      {children}
    </GuestSessionContext.Provider>
  );
}
