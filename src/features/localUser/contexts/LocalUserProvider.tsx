import { createContext, ReactNode, useReducer, useState } from "react";

import useStorage from "~/features/localUser/hooks/useStorage.ts";

type LocalUserContextValue = {
  localUserData: object;
  login: () => void;
  logout: () => void;
  isLocalUser: boolean;
};
export const LocalUserContext = createContext<LocalUserContextValue>({
  localUserData: {},
  login: () => {},
  logout: () => {},
  isLocalUser: false,
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

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, [action.userName]: { userName: action.userName } };
    case "INIT":
      return { ...state, [action.userName]: { userName: action.userName } };
    default:
      return state;
  }
}

export default function LocalUserProvider({
  children,
}: {
  children: ReactNode;
}) {
  const localUsersData = useStorage("users", localStorage);
  const [isLocalUser, setIsLocalUser] = useState(false);
  const [userData, dispatch] = useReducer(reducer, {});

  function saveUser(userName, data) {
    users[userName] = JSON.stringify(data);
    localStorage.setItem("users", JSON.stringify(users));
  }

  function getUser(userName) {
    if (localStorage.getItem("users") !== undefined || null) {
      const userJSON = localStorage.getItem("users");
      try {
        const users = JSON.parse(userJSON);
        if (typeof users === "object" && !Array.isArray(users)) {
          // Check if users is an object
          return userName in users ? users[userName] : null;
        } else {
          // If users is not an object, return null
          console.error("Unexpected data format. Expected an object.");
          return null;
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
      }
    } else {
      // If no users data is stored, return null
      return null;
    }
  }

  function deleteUser(userName) {
    const users = JSON.parse(localStorage.getItem("users"));
    delete users[userName];
    localStorage.setItem("users", JSON.stringify(users));
  }

  function login(userName) {
    if (!getUser(userName)) {
      console.log("user does not exist, creating user");
      saveUser(userName, { userName: userName });
    }
  }

  function logout() {
    saveUserData();
    setIsLocalUser(false);
    console.log(localUserData.storage);
  }

  return (
    <LocalUserContext.Provider value={{ isLocalUser, userData, login, logout }}>
      {children}
    </LocalUserContext.Provider>
  );
}
