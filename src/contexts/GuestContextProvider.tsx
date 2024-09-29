import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type GuestContext = {
  guest?: { id: string } | null;
  startGuestSession?: () => void;
  endGuestSession?: () => void;
  error?: string | undefined | null;
};

const GuestContext = createContext<GuestContext | null>({
  guest: null,
  startGuestSession: () => {},
  endGuestSession: () => {},
  error: null,
});

export function useGuest() {
  const context = useContext(GuestContext);

  if (!context) {
    throw new Error("useGuest must be used within an AuthGuestProvider");
  }
  const { guest, startGuestSession, endGuestSession, error } = context;
  return { guest, startGuestSession, endGuestSession, error };
}

export default function GuestContextProvider({ children }: PropsWithChildren) {
  const [guest, setGuest] = useState(null);
  const [error, _setError] = useState(null);

  useEffect(() => {
    console.log("Guest is now:");
    console.table({ guest });
  }, [guest]);

  function startGuestSession() {
    console.log("in Guest session");

    let localUserJSON = localStorage.getItem("guest");
    if (!localUserJSON)
      localUserJSON = JSON.stringify({
        id: "guest",
        username: "guest",
        collections: [{ starter: ["1", "2", "3"] }],
      });
    localStorage.setItem("guest", localUserJSON);
    const localUser = JSON.parse(localUserJSON);
    setGuest(localUser);
  }

  function endGuestSession() {
    // console.log(guest);
    // localStorage.setItem("user", JSON.stringify(guest));
    setGuest(null);
  }

  return (
    <GuestContext.Provider
      value={{ guest, startGuestSession, endGuestSession, error }}
    >
      {children}
    </GuestContext.Provider>
  );
}
