import { useState } from "react";

import { UserType } from "../models/UserType.ts";

export default function useUser() {
  const [user, setUser] = useState<null | UserType>(null);

  function login() {
    const localUserJSON = localStorage.getItem("user");
    const localUser = localUserJSON
      ? JSON.parse(localUserJSON)
      : { id: "X", name: "guestUser", collection: [] };
    setUser(localUser);
  }

  function logout() {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(null);
  }

  return { user, login, logout };
}
