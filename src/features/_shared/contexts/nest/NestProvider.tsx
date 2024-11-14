import { createContext, ReactNode, useContext, useState } from "react";

import { useLogger } from "@mantine/hooks";
import {
  Collection,
  Nest,
  NestContextState,
} from "~/features/_shared/contexts/nest/NestProvider.types.ts";
import useNest from "~/features/_shared/contexts/nest/useNest.ts";
import { displayNotification } from "~/features/_shared/utils/displayNotification.ts";
import { Draft, produce } from "immer";
import { useImmer } from "use-immer";

const initialCollections = [{ name: "", id: crypto.randomUUID(), items: [] }];
const initialState: NestContextState = {
  nest: [],
  collections: initialCollections,
};

export const NestContext = createContext<NestContextState | undefined>(
  undefined,
);

export default function NestProvider({ children }: { children: ReactNode }) {
  const [state, update] = useImmer(initialState);
  useLogger("NestContext", [{ state }]);

  // ---- Nest functions ----

  // Adds a taxon ID to the nest array
  function addIdToNest(id: number) {
    if (state.nest.includes(id)) return null;

    update((draft) => {
      draft.nest.push(id);
    });
  }

  // Removes a taxon ID from the nest array
  function removeIdFromNest(id: number) {
    if (!state.nest.includes(id)) {
      displayNotification({ message: "ID already in collection" });
      return;
    }

    update((draft) => {
      draft.nest.splice(id, 1);
      return;
    });
  }

  // ---- Collection functions ----
  // Checks if collection with name already exists
  function hasCollection(name: string) {
    return state.collections.some((collection) => collection.name === name);
  }

  function createCollection(collectionName: string) {
    if (hasCollection(collectionName)) {
      displayNotification({
        message: `Collection ${collectionName} already exists`,
      });
      return;
    }

    update((draft) => {
      draft.collections.push({
        name: collectionName,
        id: crypto.randomUUID(),
        items: [],
      });
      displayNotification({ message: `Collection ${collectionName} created` });
    });

    console.log(state);
  }

  function addIdToCollection(id: number, name: string) {
    if (!hasCollection(name)) {
      displayNotification({
        message: `Collection ${name} does not exist`,
      });
      return;
    }

    update((draft) => {
      const namedCollection = draft.collections.find(
        (collection) => collection.name === name,
      );
      if (namedCollection) {
        if (namedCollection.items.includes(id)) {
          displayNotification({
            message: `Cannot add, Collection ${name} already includes id: ${id}}`,
          });
          return;
        }
        namedCollection.items.push(id);
        displayNotification({
          message: `Item: ${id} added to ${namedCollection.name}`,
        });
        return;
      }
    });
  }

  function removeIdFromCollection(id: number, name: string) {
    if (!hasCollection(name)) {
      displayNotification({
        message: `Collection ${name} does not exist`,
      });
      return;
    }

    if (!isIdInCollection(id, name)) {
      displayNotification({
        message: `ID: ${id} is not in collection ${name}`,
      });
    }

    update((draft) => {
      const collectionToUpdate = draft.collections.find(
        (collection) => collection.name === name,
      );
      collectionToUpdate &&
        collectionToUpdate.items.splice(
          collectionToUpdate.items.indexOf(id),
          1,
        );
      displayNotification({
        message: `Removed id:${id} from collection ${name}`,
      });
    });
  }

  function getCollectionIdByName(name: string) {
    const namedCollection = state.collections.find(
      (collection) => collection.name === name,
    );
    if (!namedCollection) return null;
    return namedCollection.id;
  }

  function getNest() {
    return state.nest;
  }

  function getCollections() {
    return state.collections;
  }

  function isIdInCollection(id: number, name: string) {
    if (!hasCollection(name)) {
      displayNotification({
        message: `Collection ${name} does not exist`,
      });
      return;
    }

    const namedCollection = state.collections.find(
      (collection) => collection.name === name,
    );
    return namedCollection && namedCollection.items.includes(id);
  }

  function getCollectionsIncludesId(id: number) {
    const matchingCollections = state.collections.filter(
      (collection: Collection) => collection.items.includes(id),
    );
    if (!matchingCollections) return null;
    return matchingCollections;
  }

  const nest = { get: getNest, addId: addIdToNest, removeId: removeIdFromNest };
  const collections = {
    get: getCollections,
    getMatchingNames: getCollectionsIncludesId,
    create: createCollection,
    addId: addIdToCollection,
    removeId: removeIdFromCollection,
  };

  return (
    <NestContext.Provider value={{ nest, collections }}>
      {children}
    </NestContext.Provider>
  );
}
