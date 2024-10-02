import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { v4 } from "uuid";

type Guest = {
  id: typeof v4;
  name: string;
  collections: [];
};

type GuestContext = {
  guest?: Guest | null;
  startGuestSession?: () => void;
  endGuestSession?: () => void;
  saveGuest: () => void;
  loadGuest: () => void;
  error?: string | undefined | null;
};

const GuestContext = createContext<GuestContext | null>({
  guest: null,
  startGuestSession: () => {},
  endGuestSession: () => {},
  saveGuest: () => {},
  loadGuest: () => {},
  error: null,
});

export function useGuest() {
  const context = useContext(GuestContext);

  if (!context) {
    throw new Error("useGuest must be used within an AuthGuestProvider");
  }
  const {
    guest,
    startGuestSession,
    endGuestSession,
    loadGuest,
    saveGuest,
    error,
  } = context;
  return {
    guest,
    startGuestSession,
    endGuestSession,
    loadGuest,
    saveGuest,
    error,
  };
}

export default function GuestContextProvider({ children }: PropsWithChildren) {
  const [guest, setGuest] = useState(null);
  // const [collections, setCollections] = useState();
  const [error, _setError] = useState(null);

  useEffect(() => {
    if (guest) saveGuestToLocalStorage();
  }, [guest]);

  function loadGuestFromLocalStorage() {
    console.log("Loading guest from LocalStorage: ");
    const localGuestJSON = localStorage.getItem("guest");
    if (typeof localGuestJSON === "string") {
      const localGuest = JSON.parse(localGuestJSON) ?? {
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
      console.log({ localGuest });
      setGuest(localGuest);
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
  }

  return (
    <GuestContext.Provider
      value={{
        guest,
        startGuestSession,
        endGuestSession,
        error,
        saveGuest: saveGuestToLocalStorage,
        loadGuest: loadGuestFromLocalStorage,
      }}
    >
      {children}
    </GuestContext.Provider>
  );
}
