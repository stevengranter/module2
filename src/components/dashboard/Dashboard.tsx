import { useContext, useEffect, useState } from "react";

import { RoleContext } from "~/contexts/RoleContextProvider.tsx";

// import useAuth from "hooks/useAuth";
import CardCollection from "components/card/CardCollection";

export default function Dashboard() {
  const { user } = useContext(RoleContext);
  const [userCollection, setUserCollection] = useState<string[]>([]);

  // const collections = useCollections();

  useEffect(() => {
    if (user) {
      const localUserJSON = localStorage.getItem("user");
      const localUser = localUserJSON ? JSON.parse(localUserJSON) : null;
      const collection = localUser?.collection ?? [];
      console.log(collection);
      setUserCollection(collection);
    }
  }, [user]);

  return (
    <>
      <h2>Dashboard</h2>
      <h3>Collection</h3>
      <CardCollection collection={userCollection} />
    </>
  );
}
