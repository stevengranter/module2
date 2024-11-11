import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { NestContext } from "~/features/_shared/contexts/nest/NestProvider.tsx";
import useNest from "~/features/_shared/contexts/nest/useNest.ts";

export const GuestSessionContext = createContext<GuestSessionContext | null>(
  null,
);

const starterPack = [48586, 99901, 59442];

export default function GuestSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isGuest, setIsGuest] = useState(false);
  const { nest, collections } = useNest();

  function startGuestSession() {
    console.log("START: Guest session");
    nest.clear();
    collections.clear();
    setIsGuest(true);
  }

  useEffect(() => {
    startGuestSession();
  }, []);

  // function createGuestCollection(items: number[], collectionName: string) {
  //   console.log("createGuestCollection");
  //   collections.create(collectionName);
  //   items.forEach((item) => {
  //     collections.addId(item, collectionName);
  //   });
  // }

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
        guestData: { nest, collections },
      }}
    >
      {children}
    </GuestSessionContext.Provider>
  );
}
