import { createContext, ReactNode } from "react";

import { useUser } from "~/hooks/useUser.ts";

type AuthUser = {
  id: string;
  username: string;
  collections: [];
};

interface AuthContextValue {
  user: AuthUser | null;
  login: (formData: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  startGuestSession: () => void;
  endGuestSession: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: async () => {},
  logout: () => {},
  startGuestSession: () => {},
  endGuestSession: () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { user, login, logout, startGuestSession, endGuestSession } = useUser();

  return (
    <AuthContext.Provider
      value={{ user, login, logout, startGuestSession, endGuestSession }}
    >
      {children}
    </AuthContext.Provider>
  );
}
