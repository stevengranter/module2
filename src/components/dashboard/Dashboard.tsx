import { useEffect, useState } from "react";

import useAuth from "hooks/useAuth";

import CardCollection from "components/card/CardCollection";
import ProtectedRoute from "components/routes/ProtectedRoute";

export default function Dashboard() {
  const { user } = useAuth();
  const [userCollection, setUserCollection] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      const localUserJSON = localStorage.getItem("user");
      const localUser = localUserJSON ? JSON.parse(localUserJSON) : null;
      const collection = localUser?.collection ?? [];
      setUserCollection(collection);
    }
  }, [user]);

  return (
    <ProtectedRoute>
      <h2>Dashboard</h2>
      <h3>Collection</h3>
      <CardCollection collection={userCollection} />
    </ProtectedRoute>
  );
}
