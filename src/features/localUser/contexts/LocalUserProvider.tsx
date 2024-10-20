import { createContext, ReactNode } from "react";

import useLocalStorage from "~/features/localUser/hooks/useLocalStorage.ts";

type LocalUserContextValue = {
  storage: object;
  saveStorage: () => void;
  updateStorage: (updates: object) => void;
};
const LocalUserContext = createContext<LocalUserContextValue | null>(null);

export default function LocalUserProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { storage, updateStorage, saveStorage } = useLocalStorage("test-user");
  return (
    <LocalUserContext.Provider value={{ storage, updateStorage, saveStorage }}>
      {children}
    </LocalUserContext.Provider>
  );
}
