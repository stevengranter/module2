import { useEffect, useState } from "react";

import useAuth from "hooks/useAuth";

import CardCollection from "components/card/CardCollection";

export default function Dashboard() {
  const { user, guest } = useAuth();
  const [userCollection, setUserCollection] = useState<string[]>([]);

  // const collections = useCollections();

  useEffect(() => {
    if (user || guest) {
      const localUserJSON = localStorage.getItem("user");
      const localUser = localUserJSON ? JSON.parse(localUserJSON) : null;
      const collection = localUser?.collection ?? [];
      console.log(collection);
      setUserCollection(collection);
    }
  }, [user, guest]);

  return (
    <>
      <h2>Dashboard</h2>
      <h3>Collection</h3>
      <CardCollection collection={userCollection} />
    </>
  );
}
