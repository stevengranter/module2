import { createContext, ReactNode, useEffect } from "react";

import { useSessionStorage } from "@mantine/hooks";

export type NestContextProps = {
  nest: { get: () => number[]; addId: (id: number) => void };
  collections: {
    get: () => Collection[];
    getNames: () => string[] | null;
    getMatching: (id: number) => Collection[] | null;
    getMatchingNames: (id: number) => string[] | null;
    addId: (id: number, name: string) => void;
    removeId: (taxonId: number, collectionName: string) => void;
    create: (name: string) => void;
    clear: () => void;
  };
};

type Collection = {
  name: string;
  id: string | null;
  items: number[];
};

const storageHook = useSessionStorage;

export const NestContext = createContext<NestContextProps | undefined>(
  undefined,
);
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

  const clearNest = () => setNestData([]);
  const clearCollections = () => setCollectionsData([]);
  const getNest = () => nestData;
  const getCollections = () => collectionsData;

  function createCollection(name: string) {
    console.log("createCollection()");
    if (name.length === 0) {
      return console.log("Name must be at least 1 character");
    } else if (hasCollection(name)) {
      return console.log(
        `Collection ${name} already exists (id: ${getCollectionIdByName(name)}`,
      );
    } else {
      const newCollection = { name: name, id: crypto.randomUUID(), items: [] };
      setCollectionsData((current) => [...current, newCollection]);
      console.log(`Collection ${name} created`);
    }
  }

  useEffect(() => {
    console.log(collectionsData);
  }, [collectionsData]);

  function hasCollection(name: string) {
    return collectionsData.some((collection) => collection.name === name);
  }

  function checkId(id: number) {
    if (!id) {
      return false;
    }
  }

  function addIdToNest(id: number) {
    if (checkId(id)) return console.log(`${id} is not a valid Id`);
    if (isIdInNest(id)) return console.log(`id:${id} is already in nest`);
    setNestData((current) => [...current, id]);
    console.log(`id: ${id} has been added to nest`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function removeIdFromNest(id: number) {
    if (checkId(id)) return console.log(`${id} is not a valid Id`);
    if (!isIdInNest(id)) return console.log(`id:${id} is not in nest`);
    const currentNest = [...nestData];
    currentNest.splice(id, 1);
    setNestData(currentNest);
  }

  function addIdToCollection(id: number, name: string) {
    if (checkId(id)) return console.log(`${id} is not a valid Id`);
    if (isIdInCollection(id, name)) {
      return console.log(`Collection ${name} already includes id: ${id}!`);
    }
    if (!hasCollection(name)) {
      createCollection(name);
      console.log(`Collection ${name} didn't exist - created collection `);
    }
    addIdToNest(id);
    const collectionId = getCollectionIdByName(name);
    setCollectionsData((collections) =>
      collections.map((collection: Collection) =>
        collection.id === collectionId
          ? { ...collection, items: [...collection.items, id] }
          : collection,
      ),
    );
    console.log(`id: ${id} has been added to collection: ${name}`);
  }

  function removeIdFromCollection(taxonId: number, collectionName: string) {
    if (checkId(taxonId)) return console.log(`${taxonId} is not a valid Id`);
    if (!hasCollection(collectionName)) {
      return console.log(`Collection ${collectionName} doesn't exist!`);
    }
    if (!isIdInCollection(collectionName, taxonId)) {
      return console.log(
        `Collection ${collectionName} doesn't include: ${taxonId}!`,
      );
    }
    setCollectionsData((collections) =>
      collections.map((collection: Collection) =>
        collection.name === collectionName
          ? {
              ...collection,
              items: [...collection.items].filter((item) => item !== taxonId),
            }
          : collection,
      ),
    );

    console.log(
      `id: ${taxonId} has been added to collection: ${collectionName}`,
    );
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

  function isIdInCollection(id: number, name: string) {
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
    if (!matchingCollections) return null;
    return matchingCollections;
  }

  function getCollectionNames() {
    const collectionNames = collectionsData.map(
      (collection: Collection) => collection.name,
    );
    if (!collectionNames) return null;
    return collectionNames;
  }

  function getMatchingCollectionNames(id: number) {
    const matchingCollections = getMatchingCollections(id);
    if (!matchingCollections) {
      return null;
    } else {
      return matchingCollections.map(
        (collection: Collection) => collection.name,
      );
    }
  }

  const nest = {
    get: getNest,
    addId: addIdToNest,
    removeId: removeIdFromNest,
    clear: clearNest,
  };
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
