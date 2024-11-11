import {
  ContextType,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import useNest from "~/features/_shared/contexts/nest/useNest.ts";

export const GuestSessionContext = createContext<ContextType<any> | null>(null);

const starterPack = [48586, 99901, 59442];

export default function GuestSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isGuest, setIsGuest] = useState(false);
  const nestCtx = useNest();
  if (!nestCtx) {
    throw new Error("Nest Context is undefined");
  }
  const { nest, collections } = nestCtx;

  const clearGuestData = useCallback(() => {
    nest.clear();
    collections.clear();
  }, [nest, collections]);

  const startGuestSession = useCallback(() => {
    console.log("START: Guest Session");
    clearGuestData();
    setIsGuest(true);
  }, []);

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
