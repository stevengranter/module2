import { useContext } from "react";

import { AuthContext } from "~/contexts/AuthProvider.tsx";

export default function useAuth() {
  const { user, login, logout } = useContext(AuthContext);
  return { user, login, logout };
}
