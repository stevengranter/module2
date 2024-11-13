import {
  Context,
  ContextType,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import useNest from "~/features/_shared/contexts/nest/useNest.ts";
import { log } from "~/features/_shared/utils/dev.ts";

type GuestSessionContextType = {
  isGuest: boolean;
  startGuestSession: () => void;
  endGuestSession: () => void;
  guestData: { nest: object; collections: object };
};

// const initialContext = {
//   isGuest: false,
//   startGuestSession: () => {},
//   endGuestSession: () => {},
//   guestData: { nest: {}, collections: {} },
// };

export const GuestSessionContext =
  createContext<GuestSessionContextType | null>(null);

const starterPack = [48586, 99901, 59442];

export default function GuestSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isGuest, setIsGuest] = useState(true);
  const nestCtx = useNest();
  if (!nestCtx) {
    throw new Error("Nest Context is undefined");
  }
  const { nest, collections } = nestCtx;

  const clearGuestData = useCallback(() => {
    nest.clear();
    collections.clear();
    log("Guest data cleared");
  }, [nest, collections]);

  function startGuestSession() {
    log("START: Guest Session");
    clearGuestData();
    setIsGuest(true);
    collections.addId(48586, "Favorites");
  }

  useEffect(() => {
    log("START: Guest Session");
    clearGuestData();
    setIsGuest(true);
    collections.create("Favorites");
    collections.addId(48586, "Favorites");
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
    clearGuestData();
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
