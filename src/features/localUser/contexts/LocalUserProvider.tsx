import { createContext, ReactNode, useState } from "react";

import useStorage from "~/features/localUser/hooks/useStorage.ts";
import { JSON_SERVER_URL } from "~/lib/constants.ts";

type LocalUserContextValue = {
  localUserData: object;
  login: () => void;
  logout: () => void;
};
export const LocalUserContext = createContext<LocalUserContextValue>({
  localUserData: {},
  login: () => {},
  logout: () => {},
});

const localUserTemplate = {
  birthdate: "9999-000-000",
  description: "",
  firstName: "Local",
  id: "1",
  imgSrc: "",
  lastName: "User",
  password: "",
  title: "Local User",
  username: "localUser",
  nest: {
    creatures: [48586, 59442, 494559],
  },
};

export default function LocalUserProvider({
  children,
}: {
  children: ReactNode;
}) {
  const localUserData = useStorage("__local_user__", localStorage);
  const [localUserName, setLocalUserName] = useState("");

  function login(userName) {
    localUserData.saveStorage();
    localUserData.updateStorage({ userName: userName });
    console.log(localUserData.storage);
    console.log(`Hi ${localUserName}`);
  }

  function logout() {
    localUserData.saveStorage();
    console.log(localUserData.storage);
  }

  return (
    <LocalUserContext.Provider value={{ localUserData, login, logout }}>
      {children}
    </LocalUserContext.Provider>
  );
}
