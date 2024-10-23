import { createContext, ReactNode } from "react";

import { useSessionStorage } from "@mantine/hooks";

type NestContext = {
  nest: { get: () => number[]; addId: (id: number) => void };
  collections: {
    get: () => Collection[];
    addId: (name: string, id: number) => void;
    create: (name: string) => void;
  };
};

type Collection = {
  name: string;
  id: string | null;
  items: number[];
};

const storageHook = useSessionStorage;

export const NestContext = createContext<NestContext>({
  nest: { get: () => [], addId: () => {} },
  collections: {
    get: () => [],
    addId: () => {},
    create: () => {},
  },
});
export default function NestProvider({ children }: { children: ReactNode }) {
  const [nestData, setNestData] = storageHook<number[]>({
    key: "nest",
    defaultValue: [],
  });
  const [collectionsData, setCollectionsData] = useSessionStorage<Collection[]>(
    {
      key: "collections",
      defaultValue: [],
    },
  );

  function clearNest() {
    setNestData([]);
  }

  function clearCollections() {
    setCollectionsData([]);
  }

  function getNest() {
    console.log(nestData);
    return nestData;
  }

  function getCollections() {
    console.log(collectionsData);
    return collectionsData;
  }

  function createCollection(name: string) {
    if (hasCollection(name)) {
      return console.log(
        `Collection ${name} already exists (id: ${getCollectionIdByName(name)}`,
      );
    }
    const newCollection = { name: name, id: crypto.randomUUID(), items: [] };
    setCollectionsData((current) => [...current, newCollection]);
    console.log(`Collection ${name} created`);
  }

  function hasCollection(name: string) {
    return collectionsData.some((collection) => collection.name === name);
  }

  function addIdToNest(id: number) {
    if (isIdInNest(id)) return console.log(`id:${id} is already in nest`);
    setNestData((current) => [...current, id]);
    console.log(`id: ${id} has been added to nest`);
  }

  function addIdToCollection(name: string, id: number) {
    if (!hasCollection(name)) {
      return console.log(`Collection ${name} doesn't exist!`);
    }
    if (isIdInCollection(name, id)) {
      return console.log(`Collection ${name} already includes id: ${id}!`);
    }
    addIdToNest(id);
    setCollectionsData((collections) =>
      collections.map((collection: Collection) =>
        collection.name === name
          ? { ...collection, items: [...collection.items, id] }
          : collection,
      ),
    );
    console.log(`id: ${id} has been added to collection: ${name}`);
  }

  function getCollectionByName(name: string) {
    const namedCollection = collectionsData.find(
      (collection) => collection.name === name,
    );
    if (!namedCollection) return null;
    return namedCollection;
  }

  function getCollectionIdByName(name: string) {
    const namedCollection = getCollectionByName(name);
    if (!namedCollection) return null;
    else return namedCollection.id;
  }

  function isIdInNest(id: number) {
    return nestData.includes(id);
  }

  function isIdInCollection(name: string, id: number) {
    if (!hasCollection(name)) {
      return console.log(`Collection ${name} doesn't exist!`);
    }
    const namedCollection = getCollectionByName(name);
    if (namedCollection) return namedCollection.items.includes(id);
  }

  const nest = { get: getNest, addId: addIdToNest, clear: clearNest };
  const collections = {
    get: getCollections,
    addId: addIdToCollection,
    create: createCollection,
    clear: clearCollections,
  };

  return (
    <NestContext.Provider
      value={{
        nest,
        collections,
      }}
    >
      {children}
    </NestContext.Provider>
  );
}
