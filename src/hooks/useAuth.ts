import { useEffect } from "react";

import { UserType } from "../models/UserType.ts";
import { useLocalStorage } from "./useLocalStorage";
import { useUser } from "./useUser";

export const useAuth = () => {
  // we can re export the user methods or object from this hook
  const { user, addUser, removeUser, setUser } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem("user");
    if (user) {
      addUser(JSON.parse(user));
    }
  }, [addUser, getItem]);

  const login = (user: UserType) => {
    addUser(user);
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, logout, setUser };
};
