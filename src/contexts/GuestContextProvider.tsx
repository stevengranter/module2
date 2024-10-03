import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { notifications } from "@mantine/notifications";
import { IconCheck } from "~/lib/icons.tsx";
import { v4 } from "uuid";

type Guest = {
  id: typeof v4;
  username: string;
  collections: [];
};

type GuestContext = {
  guest?: Guest | null;
  startGuestSession?: () => void;
  endGuestSession?: () => void;
  createCollection: () => void;
  addCardToCollection: (
    cardId: string | null,
    collectionId: string | null,
  ) => void;
  removeCardFromCollection: (
    cardId: string | null,
    collectionId: string | null,
  ) => void;
  saveGuest: () => void;
  loadGuest: () => void;
  error?: string | undefined | null;
};

export const GuestContext = createContext<GuestContext | null>(null);

export default function GuestContextProvider({ children }: PropsWithChildren) {
  const [guest, setGuest] = useState<Guest | null>(null);
  // const [collections, setCollections] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!guest) loadGuestFromLocalStorage();
    console.log("guest loaded from localStorage");
  }, []);

  useEffect(() => {
    if (guest) saveGuestToLocalStorage();
    console.log("guest saved to localStorage");
  }, [guest]);

  function createCollection(values) {
    if (guest) {
      setGuest((g) => {
        return {
          ...g,
          collections: [
            ...guest.collections,
            {
              id: v4(),
              name: values.name,
              description: values.description,
              items: [],
            },
          ],
        };
      });
      notifications.show({
        message: `Collection" +
              " '${values.name}' created.`,
        icon: <IconCheck />,
      });
    }
  }

  function addCardToCollection(cardId, collectionId) {
    const selectedCollection = guest.collections.find(
      (collection) => collection.id === collectionId,
    );

    if (selectedCollection) {
      if (selectedCollection) {
        const index = selectedCollection.items.indexOf(cardId);

        if (index === -1) {
          selectedCollection.items.push(cardId);
          setGuest((g) => {
            return {
              ...g,
              collections: g.collections.map((collection) =>
                collection.id === collectionId
                  ? selectedCollection
                  : collection,
              ),
            };
          });
        } else {
          console.log(
            `Card with ID ${cardId} already exists in the collection.`,
          );
        }
      } else {
        console.log("Collection not found");
      }
    }
  }

  function removeCardFromCollection(cardId, collectionId) {
    const selectedCollection = guest.collections.find(
      (collection) => collection.id === collectionId,
    );

    if (selectedCollection) {
      if (selectedCollection) {
        const index = selectedCollection.items.indexOf(cardId);

        if (index === 1) {
          selectedCollection.items.splice(cardId);
          setGuest((g) => {
            return {
              ...g,
              collections: g.collections.map((collection) =>
                collection.id === collectionId
                  ? selectedCollection
                  : collection,
              ),
            };
          });
        } else {
          console.log(
            `Cannot remove, card with ID ${cardId} is not in the collection.`,
          );
        }
      } else {
        console.log("Collection not found");
      }
    }
  }

  function loadGuestFromLocalStorage() {
    console.log("Loading guest from LocalStorage: ");

    const localGuestJSON = localStorage.getItem("guest");
    if (localGuestJSON) {
      const localGuest = JSON.parse(localGuestJSON);
      setGuest(localGuest);
    } else {
      const stateGuest = {
        id: "guest",
        username: "guest",
        collections: [
          {
            name: "starter",
            id: v4(),
            items: ["1", "2", "3"],
          },
        ],
      };
      setGuest(stateGuest);
      saveGuestToLocalStorage();
    }
  }

  function saveGuestToLocalStorage() {
    console.log("Saving guest object to LocalStorage: ");
    console.log({ guest });
    if (guest) {
      const stateGuestJSON = JSON.stringify(guest);
      localStorage.setItem("guest", stateGuestJSON);
    }
  }

  function startGuestSession() {
    console.log("START: Guest session");
    loadGuestFromLocalStorage();
  }

  function endGuestSession() {
    saveGuestToLocalStorage();
    console.log("END: Guest session");
    setGuest(null);
    ``;
  }

  return (
    <GuestContext.Provider
      value={{
        guest,
        startGuestSession,
        endGuestSession,
        createCollection,
        addCardToCollection,
        removeCardFromCollection,
        error,
        saveGuest: saveGuestToLocalStorage,
        loadGuest: loadGuestFromLocalStorage,
      }}
    >
      {children}
    </GuestContext.Provider>
  );
}
