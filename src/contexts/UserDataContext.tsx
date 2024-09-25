import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "~/contexts/AuthContextProvider.tsx";

type UserDataContext = {
  username: string | null;
  collections: [] | null;
};

const UserDataContext = createContext<UserDataContext | null>({
  username: null,
  collections: null,
});

export function useUserData() {
  const context = useContext(UserDataContext);

  if (!context) {
    throw new Error(
      "useUserData must be used within a UserDataContextProvider",
    );
  }
  const { username, collections } = context;
  return { username, collections };
}

export default function UserDataContextProvider({
  children,
}: PropsWithChildren) {
  const [userData, setUserData] = useState<UserDataContext | null>(null);
  const [_error, _setError] = useState("");
  const { id } = useAuth();

  useEffect(() => {
    setUserData({ username: "Bob", collections: [] });
    // const userDataJSON = fetchUserData();
    // if (userDataJSON) setUserData(userDataJSON);
  }, [id]);

  // async function fetchUserData() {
  //   try {
  //     const response = await fetch(`${JSON_SERVER_URL}/users?id=${id}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //
  //     if (response.ok) {
  //       console.log("got response");
  //
  //       const jsonResponse = await response.json();
  //       console.log(jsonResponse);
  //       if (jsonResponse.length > 0) {
  //         console.log("login successful");
  //         const { id, username, collections } = jsonResponse[0];
  //         // console.log(jsonResponse[0]);
  //
  //         // setUser(userData);
  //         setUserData({ id, username, collections });
  //         // console.log(user);
  //       } else {
  //         setError("Username does not exist");
  //       }
  //     } else {
  //       setError(`Error logging in: ${response.status} ${response.statusText}`);
  //     }
  //   } catch (error) {
  //     setError(`Error fetching user data: ${error}`);
  //   }
  // }
  //
  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
}
