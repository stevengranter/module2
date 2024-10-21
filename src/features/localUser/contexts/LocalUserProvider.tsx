import { createContext, ReactNode, useState } from "react";

import useStorage from "~/features/localUser/hooks/useStorage.ts";

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
  const { storage, updateStorage, saveStorage } = useStorage("__local_user__");
  const localUserStorage = {
    storage,
    save: saveStorage,
    update: updateStorage,
  };
  const [localUserName, setLocalUserName] = useState("");

  function login() {
    console.log(storage);
    console.log(`Hi ${localUserName}`);
  }

  function logout() {
    console.log(storage);
  }

  return (
    <LocalUserContext.Provider value={localUserStorage}>
      {children}
    </LocalUserContext.Provider>
  );
}
