import { createContext, ReactNode, useState } from "react";

import { useLocalStorage, useLogger } from "@mantine/hooks";
import {
  Collection,
  NestProviderState,
} from "~/features/_shared/contexts/nest/NestProvider.types.ts";
import { displayNotification } from "~/features/_shared/utils/displayNotification.ts";
import { produce } from "immer";
import { useImmer } from "use-immer";

type ImmerState = {
  nest: string[];
  collections: Collection[];
};
//
// const localStorageJSON = localStorage.getItem("guestData");
// let localStorageObject = { nest: [1, 2, 3] };
// if (!localStorageJSON) {
//   localStorageObject = { nest: [], collections: [] };
// }
// const initialState = produce((draft) => {
//   Object.assign(draft, { nest: [1, 2, 4] });
// });

// console.log(localStorageObject);

const initialState: ImmerState = {
  nest: [""],
  collections: [
    {
      name: "Starter Pack",
      id: crypto.randomUUID(),
      items: ["48586", "48987", "81545"],
    },
    { name: "Wish List", id: crypto.randomUUID(), items: [] },
    { name: "Favorites", id: crypto.randomUUID(), items: [] },
  ],
};

export const NestContext = createContext<NestProviderState | undefined>(
  undefined,
);
export default function NestProvider({ children }: { children: ReactNode }) {
  const [state, update] = useImmer(initialState);

  useLogger("NestContext", [{ state }]);

  // ---- Nest functions ----

  function isValidId(itemId: string | number) {
    if (!itemId) {
      displayNotification({ message: `Id ${itemId} is not a valid id.` });
      return false;
    }
    return true;
  }

  function isItemInNest(itemId: number | string) {
    return state.nest.includes(itemId.toString());
  }

  // Adds a taxon ID to the nest array
  function addItemToNest(itemId: number | string) {
    if (isItemInNest(itemId)) {
      displayNotification({
        message: `Duplicate, Id: ${itemId} is already in nest`,
        color: "orange",
      });
      return;
    }

    update((draft) => {
      draft.nest.push(itemId.toString());
      if (draft.nest.includes(itemId.toString())) {
        displayNotification({ message: `Id: ${itemId} added to nest` });
        return;
      }
    });
  }

  // Removes a taxon ID from the nest array
  function removeItemFromNest(itemId: number | string) {
    if (!state.nest.includes(itemId.toString())) {
      displayNotification({
        message: `Cannot remove, id: ${itemId} is not in nest`,
        color: "orange",
      });
      return;
    }

    const collectionsIncludingId = getCollectionsIncludingId(itemId.toString());
    if (collectionsIncludingId && collectionsIncludingId.length > 0) {
      collectionsIncludingId.forEach((collection) => {
        removeIdFromCollection(itemId.toString(), collection.name);
      });
    }

    update((draft) => {
      draft.nest.splice(draft.nest.indexOf(itemId.toString()), 1);
      if (!draft.nest.includes(itemId.toString())) {
        displayNotification({ message: `Id: ${itemId} removed from nest` });
        return;
      }
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
        color: "orange",
      });
      return;
    }

    if (collectionName.length === 0) {
      displayNotification({
        message: `Collection name must be at least 1 character in length`,
        color: "orange",
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

  function addIdToCollection(id: number | string, name: string) {
    if (!isValidId(id)) {
      displayNotification({
        message: `Cannot add id: ${id}, not a valid id`,
      });
      return;
    }

    if (!isItemInNest(id)) {
      // push the id into the nest
      update((draft) => {
        draft.nest.push(id.toString());
      });
    }

    if (!hasCollection(name)) {
      displayNotification({
        message: `Collection: ${name} does not exist, creating collection...`,
      });
      update((draft) => {
        draft.collections.push({
          name: name,
          id: crypto.randomUUID(),
          items: [],
        });
      });
    }

    update((draft) => {
      // get the collection requested in 'name' param
      const namedCollection = draft.collections.find(
        (collection) => collection.name === name,
      );

      // if namedCollection !== nullish value and the namedCollection.items
      // array includes the id from the 'id' parameter, then...
      if (namedCollection) {
        if (namedCollection.items.includes(id.toString())) {
          // ...notify user that collection includes id
          displayNotification({
            message: `Cannot add, Collection ${name} already includes id: ${id}`,
            color: "orange",
          });
          return;
        }

        // push the id into the namedCollection.items array
        namedCollection.items.push(id.toString());
        // verify that the id has been added, then...
        if (namedCollection.items.includes(id.toString())) {
          // ...notify user that id has been added
          displayNotification({
            message: `Item: ${id} added to ${namedCollection.name}`,
          });
        }
        return;
      }
    });
  }

  function removeIdFromCollection(id: number | string, name: string) {
    if (!hasCollection(name)) {
      displayNotification({
        message: `Cannot remove id, Collection ${name} does not exist`,
        color: "orange",
      });
      return;
    }

    if (!isItemInCollection(id, name)) {
      displayNotification({
        message: `Cannot remove, ID: ${id} is not in collection ${name}`,
        color: "orange",
      });
      return;
    }

    update((draft) => {
      const collectionToUpdate = draft.collections.find(
        (collection) => collection.name === name,
      );
      collectionToUpdate &&
        collectionToUpdate.items.splice(
          collectionToUpdate.items.indexOf(id.toString()),
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
    if (!namedCollection) {
      displayNotification({
        message: `Collection ${name} does not exist, no corresponding id`,
      });
      return;
    }
    return namedCollection.id;
  }

  function getNest() {
    return state.nest;
  }

  function getCollections() {
    return state.collections;
  }

  function isItemInCollection(id: number | string, name: string) {
    if (!hasCollection(name)) {
      displayNotification({
        message: `Collection ${name} does not exist`,
      });
      return;
    }

    const namedCollection = state.collections.find(
      (collection) => collection.name === name,
    );
    return namedCollection && namedCollection.items.includes(id.toString());
  }

  function getCollectionsIncludingId(id: string | number) {
    const matchingCollections = state.collections.filter(
      (collection: Collection) => collection.items.includes(id.toString()),
    );
    if (!matchingCollections) {
      displayNotification({
        message: `Id: ${id} cannot be found in any collection`,
      });
      return null;
    }
    return matchingCollections;
  }

  function getCollectionNamesIncludingId(id: string | number) {
    const matchingCollections = getCollectionsIncludingId(id);
    if (!matchingCollections) return null;
    return matchingCollections.map((collection) => collection.name);
  }

  const nest = {
    get: getNest,
    addItem: addItemToNest,
    removeItem: removeItemFromNest,
  };
  const collections = {
    get: getCollections,
    getMatchingCollections: getCollectionsIncludingId,
    getMatchingNames: getCollectionNamesIncludingId,
    isItemInCollection: isItemInCollection,
    create: createCollection,
    addItem: addIdToCollection,
    removeItem: removeIdFromCollection,
  };

  return (
    <NestContext.Provider value={{ nest, collections }}>
      {children}
    </NestContext.Provider>
  );
}
