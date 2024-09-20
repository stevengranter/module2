import { ReactNode } from "react";

import useGuest from "../hooks/useGuest.ts";
import AuthContext from "./AuthContext.ts";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, login, logout } = useGuest();

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// export default AuthContext;
