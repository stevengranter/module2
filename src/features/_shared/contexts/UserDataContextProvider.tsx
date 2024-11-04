import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { useAuth } from "~/features/_shared/contexts/AuthContextProvider.tsx";
import { JSON_SERVER_URL } from "~/features/api/constants.ts";

type UserDataContext = {
  username: string | null;
  collections: [] | null;
};

const UserDataContext = createContext<UserDataContext | null>({
  username: null,
  collections: null,
});

export function useUserData() {
  // const context = useContext(UserDataContext);
  // if (!context) {
  //   throw new Error(
  //     "useUserData must be used within a UserDataContextProvider",
  //   );
  // }
  // const { username, collections } = context;
  // return { username, collections };
}

export default function UserDataContextProvider({
  children,
}: PropsWithChildren) {
  const [userData, setUserData] = useState<UserDataContext | null>(null);
  const [_error, setError] = useState("");
  const { id } = useAuth();

  useEffect(() => {
    fetchUserData().then();
  }, [id]);

  async function fetchUserData() {
    try {
      const response = await fetch(`${JSON_SERVER_URL}/users?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        // console.log(jsonResponse);
        if (jsonResponse.length > 0) {
          console.log("login successful");
          const { username, collections } = jsonResponse[0];
          // console.log(jsonResponse[0]);

          // setUser(userData);
          setUserData({ username, collections });
          // console.log(user);
        } else {
          setError("Username does not exist");
        }
      } else {
        setError(`Error logging in: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setError(`Error fetching user data: ${error}`);
    }
  }

  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
}
