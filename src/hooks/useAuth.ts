import { useContext } from "react";

import AuthContext from "../contexts/AuthContext.ts";

export default function useAuth() {
  const { user, login, logout } = useContext(AuthContext);
  return { user, login, logout };
}
