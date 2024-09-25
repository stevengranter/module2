import { useState } from "react";

// import useAuth from "hooks/useAuth";
import CardCollection from "components/card/CardCollection";

export default function Dashboard() {
  // const { isAuthenticated } = useAuth();
  // const { guest } = useGuest();
  // const { collections } = useUserData();

  const [userCollection, _setUserCollection] = useState<string[]>([]);

  // const collections = useCollections();

  // useEffect(() => {
  //   if (!isAuthenticated && collections) {
  //     // const localUserJSON = localStorage.getItem("user");
  //     // const localUser = localUserJSON ? JSON.parse(localUserJSON) : null;
  //     // const collection = localUser?.collection ?? [];
  //     // console.log(collection);
  //     setUserCollection(collections.default);
  //   } else if (guest) {
  //     setUserCollection(guest.collection);
  //   }
  // }, [!isAuthenticated, guest]);

  return (
    <>
      <h2>Dashboard</h2>
      <h3>Collection</h3>
      <CardCollection collection={userCollection} />
    </>
  );
}
