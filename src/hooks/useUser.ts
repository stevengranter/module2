import { useState } from "react";

import { UserType } from "../models/UserType.ts";

export default function useUser() {
  const [user, setUser] = useState<null | UserType>(null);

  function login() {
    let localUserJSON = localStorage.getItem("user");
    if (!localUserJSON)
      localUserJSON = JSON.stringify({
        id: "X",
        name: "guestUser",
        collection: [],
      });
    localStorage.setItem("user", localUserJSON);
    const localUser = JSON.parse(localUserJSON);
    setUser(localUser);
  }

  function logout() {
    console.log(user);
    // localStorage.setItem("user", JSON.stringify(user));
    setUser(null);
  }

  return { user, login, logout };
}
