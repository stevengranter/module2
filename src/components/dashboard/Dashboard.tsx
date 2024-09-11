import { useEffect, useState } from "react";

import useAuth from "../../hooks/useAuth.ts";
import CardCollection from "../card/CardCollection.tsx";
import ProtectedRoute from "../routes/ProtectedRoute.tsx";

export default function Dashboard() {
  const { user } = useAuth();
  const [userCollection, setUserCollection] = useState();
  useEffect(() => {
    const userCollectionJSON = user ? localStorage.getItem("collection") : null;
    userCollectionJSON
      ? setUserCollection(JSON.parse(userCollectionJSON))
      : null;
  }, [user]);

  return (
    <ProtectedRoute>
      <h2>Dashboard</h2>
      <h3>Collection</h3>
      <CardCollection collection={userCollection} />
    </ProtectedRoute>
  );
}
