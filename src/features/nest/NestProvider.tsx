import { createContext, ReactNode, useContext } from "react";

import { GuestSessionContext } from "~/features/guest/GuestSessionProvider.tsx";
import { LocalUserContext } from "~/features/localUser/contexts/LocalUserProvider.tsx";

type NestContext = {
  nest: { items: number[] | string[] | null; collections: object[] };
  getNest: () => void;
  saveNest: () => void;
};

export const NestContext = createContext({
  nest: null,
  getNest: () => {},
  saveNest: () => {},
});

export default function NestProvider({ children }: { children: ReactNode }) {
  const { isGuest, guestData } = useContext(GuestSessionContext);
  const { isLocalUser } = useContext(LocalUserContext);

  const nest = { nest: "Nest data here" };

  function getNest() {
    if (isGuest) {
      console.log(localStorage.getItem("guest"));
    }
  }

  function saveNest() {
    console.log("saveNest()");
  }

  function addToCollection() {
    console.log("addToCollection()");
  }

  function removeFromCollection() {
    console.log("removeFromCollection()");
  }

  function createCollection() {
    console.log("createCollection()");
  }

  function deleteCollection() {
    console.log("deleteCollection()");
  }

  return (
    <NestContext.Provider value={{ nest, getNest, saveNest }}>
      {children}
    </NestContext.Provider>
  );
}
