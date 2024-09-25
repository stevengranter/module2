import { useEffect, useState } from "react";

import { UserType } from "../models/UserType.ts";

export default function useGuest() {
  const [guest, setGuest] = useState<null | UserType>(null);

  useEffect(() => {
    console.log({ guest });
  }, [guest]);

  function continueAsGuest() {
    console.log("in Guest session");

    let localUserJSON = localStorage.getItem("user");
    if (!localUserJSON)
      localUserJSON = JSON.stringify({
        id: "guest",
        name: "guestUser",
        collection: [],
      });
    localStorage.setItem("user", localUserJSON);
    const localUser = JSON.parse(localUserJSON);
    setGuest(localUser);
    console.log(localUser);
  }

  function endGuestSession() {
    console.log(guest);
    // localStorage.setItem("user", JSON.stringify(guest));
    setGuest(null);
  }

  return { guest, continueAsGuest, endGuestSession };
}
