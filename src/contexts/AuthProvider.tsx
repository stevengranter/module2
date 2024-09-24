import { createContext, ReactNode } from "react";

import useGuest from "~/hooks/useGuest.ts";
import { useUser } from "~/hooks/useUser.ts";

type AuthUser = {
  user: string;
  collections: [];
};

type GuestSession = {
  id: number;
  expiresAt: Date;
};

interface AuthContextValue {
  user: AuthUser | null;
  login: () => void;
  logout: () => void;
  guest: GuestSession | null;
  continueAsGuest: () => void;
  endGuestSession: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: () => {},
  logout: () => {},
  guest: null,
  continueAsGuest: () => {},
  endGuestSession: () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { user, login, logout } = useUser();
  const { guest, continueAsGuest, endGuestSession } = useGuest();

  return (
    <AuthContext.Provider
      value={{ user, login, logout, guest, continueAsGuest, endGuestSession }}
    >
      {children}
    </AuthContext.Provider>
  );
}
