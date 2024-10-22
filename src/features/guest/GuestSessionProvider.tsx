import { createContext, ReactNode, useState } from "react";

import { useSessionStorage } from "@mantine/hooks";

export const GuestSessionContext = createContext<GuestSessionContext>({
  isGuest: false,
  guestData: null,
  startGuestSession: () => {},
  endGuestSession: () => {},
});

const guestSessionDataTemplate = {
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
};

export default function GuestSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [guestData, setGuestData] = useSessionStorage(guestSessionDataTemplate);

  const [isGuest, setIsGuest] = useState(false);

  function startGuestSession() {
    setGuestData({
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
    });
    console.log("START: Guest session");
    setIsGuest(true);
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
