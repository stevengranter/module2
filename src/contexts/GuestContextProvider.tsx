import { createContext, PropsWithChildren, useState } from "react";

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

// export function useGuest():GuestContext] {
//   const { guest, startGuestSession, endGuestSession, error } =
//     useContext(GuestContext);
//   return { guest, startGuestSession, endGuestSession, error };
// }

export default function GuestContextProvider({ children }: PropsWithChildren) {
  const [guest, setGuest] = useState(null);
  const [error, _setError] = useState(null);
  // setError(null);

  function startGuestSession() {
    console.log("in Guest session");

    let localUserJSON = localStorage.getItem("guest");
    if (!localUserJSON)
      localUserJSON = JSON.stringify({
        id: "guest",
        name: "guestUser",
        collections: [],
      });
    localStorage.setItem("guest", localUserJSON);
    const localUser = JSON.parse(localUserJSON);
    setGuest(localUser);
    console.log(localUser);
  }

  function endGuestSession() {
    console.log(guest);
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
