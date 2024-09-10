import { useState } from "react";

export default function useUser() {
  const [user, setUser] = useState<null | string>(null);

  function login() {
    setUser("userName");
  }

  function logout() {
    setUser(null);
  }

  return { user, login, logout };
}
