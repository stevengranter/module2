import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

import { useSessionStorage } from "@mantine/hooks";
import {
  Collection,
  NestContextState,
} from "~/features/_shared/contexts/nest/NestProvider.types.ts";
import { log } from "~/features/_shared/utils/dev.ts";
import { displayNotification } from "~/features/_shared/utils/displayNotification.ts";

const storageHook = useSessionStorage;

export const NestContext = createContext<NestContextState | undefined>(
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
    log("createCollection()");
    if (name.length === 0) {
      displayNotification({
        color: "red",
        message: `Name must be at least 1 character`,
      });
    } else if (hasCollection(name)) {
      displayNotification({
        color: "red",
        message: `Collection ${name} already exists (id: ${getCollectionIdByName(name)}`,
      });
    } else {
      const newCollection = { name: name, id: crypto.randomUUID(), items: [] };
      console.log(newCollection);
      setCollectionsData((current) => [...current, newCollection]);
      displayNotification({
        color: "green",
        message: `Collection ${newCollection.name} created, id: ${newCollection.id}`,
      });
      // setMessage(`Collection ${name} created`);
    }
  }

  useEffect(() => {
    if (collectionsData && collectionsData.length > 0) {
      log(`NestProvider.tsx => collectionsData: `);
      log(collectionsData);
    }
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
    log("info", `${id} has been added to nest`);
    // displayNotification({
    //   color: "green",
    //   message: `id: ${id} has been added to nest`,
    // });
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
      displayNotification({
        color: "red",
        message: `Collection ${name} already includes id: ${id}!`,
      });
    }
    if (!hasCollection(name)) {
      createCollection(name);
    }
    addIdToNest(id);
    const collectionName = getCollectionByName(name, collectionsData);
    const collectionId = getCollectionIdByName(name);
    console.log(collectionName);
    setCollectionsData((collections) =>
      collections.map((collection: Collection) =>
        collection.id === collectionId
          ? { ...collection, items: [...collection.items, 4325] }
          : collection,
      ),
    );
    displayNotification({
      message: `id: ${id} has been added to collection: ${name}`,
    });
  }

  function removeIdFromCollection(taxonId: number, collectionName: string) {
    if (checkId(taxonId)) return console.log(`${taxonId} is not a valid Id`);
    if (!hasCollection(collectionName)) {
      return console.log(`Collection ${collectionName} doesn't exist!`);
    }
    if (!isIdInCollection(taxonId, collectionName)) {
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
      `id: ${taxonId} has been removed from collection: ${collectionName}`,
    );
  }

  function getCollectionByName(name: string, collectionsData) {
    if (collectionsData) {
      console.log(collectionsData);
      const namedCollection = collectionsData.find(
        (collection) => collection.name === name,
      );
      console.log(namedCollection);
      if (!namedCollection) return null;

      return namedCollection;
    }
  }

  function getCollectionIdByName(name: string) {
    const namedCollection = getCollectionByName(name);
    if (!namedCollection) return "";
    else return namedCollection.id;
  }

  function isIdInNest(id: number) {
    return nestData.includes(id);
  }

  function isIdInCollection(id: number, name: string) {
    if (!hasCollection(name)) {
      return console.log(`Collection ${name} doesn't exist!`);
    }
    const namedCollection = getCollectionByName(name, collectionsData);
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
    if (!collectionNames) return [""];
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
    getCollection: getCollectionByName,
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
