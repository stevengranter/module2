import { createContext, ReactNode } from "react";

import { useSessionStorage } from "@mantine/hooks";

type NestContext = {
  nest: { get: () => number[]; addId: (id: number) => void };
  collections: {
    removeId: (taxonId: string | number, collectionName: string) => void;
    get: () => Collection[];
    addId: (id: number | string, name: string) => void;
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
    if (nestData) console.log(nestData);
    return nestData;
  }

  function getCollections() {
    if (collectionsData) console.log(collectionsData);
    return collectionsData;
  }

  function createCollection(name: string) {
    if (name.length === 0) {
      return console.log("Name must be at least 1 character");
    }
    if (name.length === 0) {
      console.log("Name must be at least 1 character");
      return;
    }
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

  function checkId(id: number) {
    if (!id || id === null || id === undefined) {
      return false;
    }
  }

  function addIdToNest(id: number) {
    if (checkId(id)) return console.log(`${id} is not a valid Id`);
    if (isIdInNest(id)) return console.log(`id:${id} is already in nest`);
    setNestData((current) => [...current, id]);
    console.log(`id: ${id} has been added to nest`);
  }

  function removeIdFromNest(id: number) {
    if (checkId(id)) return console.log(`${id} is not a valid Id`);
    if (!isIdInNest(id)) return console.log(`id:${id} is not in nest`);
    const currentNest = [...nestData];
    currentNest.splice(id, 1);
    setNestData(currentNest);
  }

  function addIdToCollection(id: number, name: string) {
    if (checkId(id)) return console.log(`${id} is not a valid Id`);
    if (isIdInCollection(name, id)) {
      return console.log(`Collection ${name} already includes id: ${id}!`);
    }
    if (!hasCollection(name)) {
      createCollection(name);
      console.log(`Collection ${name} didn't exist - created collection `);
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

  function removeIdFromCollection(id: number, name: string) {
    if (checkId(id)) return console.log(`${id} is not a valid Id`);
    if (!hasCollection(name)) {
      return console.log(`Collection ${name} doesn't exist!`);
    }
    if (!isIdInCollection(name, id)) {
      return console.log(`Collection ${name} doesn't include: ${id}!`);
    }
    setCollectionsData((collections) =>
      collections.map((collection: Collection) =>
        collection.name === name
          ? {
              ...collection,
              items: [...collection.items].filter((item) => item !== id),
            }
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

  function getMatchingCollections(id: number) {
    const matchingCollections = collectionsData.filter(
      (collection: Collection) => collection.items.includes(id),
    );
    if (!matchingCollections) return "No matching collections";
    return matchingCollections;
  }

  function getCollectionNames() {
    const collectionNames = collectionsData.map(
      (collection: Collection) => collection.name,
    );
    if (!collectionNames) return "No collections found.";
    return collectionNames;
  }

  function getMatchingCollectionNames(id: number) {
    const matchingCollections = getMatchingCollections(id);
    return matchingCollections.map((collection: Collection) => collection.name);
  }

  const nest = { get: getNest, addId: addIdToNest, clear: clearNest };
  const collections = {
    get: getCollections,
    getNames: getCollectionNames,
    getMatching: getMatchingCollections,
    getMatchingNames: getMatchingCollectionNames,
    addId: addIdToCollection,
    removeId: removeIdFromCollection,
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
