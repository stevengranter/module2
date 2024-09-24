import { createContext, ReactNode } from "react";

import { useUser } from "~/hooks/useUser.ts";

export const AuthContext = createContext({
  user: "",
  login: () => {},
  logout: () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { user, login, logout } = useUser();

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
