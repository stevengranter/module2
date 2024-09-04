import { useContext } from "react";

import type { UserType } from "models/UserType.ts";

import { AuthContext } from "../contexts/AuthContext.ts";
import { useLocalStorage } from "./useLocalStorage.ts";

export function useUser() {
  const { user, setUser } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  function addUser(user: UserType) {
    setUser(user);
    setItem("user", JSON.stringify(user));
  }

  function removeUser() {
    setUser(null);
    setItem("user", "");
  }

  return { user, addUser, removeUser, setUser };
}
