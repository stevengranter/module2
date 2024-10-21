import { createContext, ReactNode, useContext } from "react";

type NestContext = {
  nest: number[] | string[] | null;
  collections: object[];
};

const NestContext = createContext({ nest: null, collections: [] });

export default function NestProvider({ children }: { children: ReactNode }) {
  function addToCollection(collection: object[]) {
    const isInCollection = collections;
  }

  return (
    <NestContext.Provider value={useContext(NestContext)}>
      {children}
    </NestContext.Provider>
  );
}
