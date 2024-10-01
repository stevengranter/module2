// import useAuth from "hooks/useAuth";
import { useEffect } from "react";

import WIPComponent from "~/components/wip/WIPComponent.tsx";
import { useGuest } from "~/contexts/GuestContextProvider.tsx";
import useCollections from "~/hooks/useCollections.ts";

import CardCollection from "components/card/CardCollection";

export default function Dashboard() {
  const { guest } = useGuest();
  const { collections } = useCollections();

  useEffect(() => {
    console.log({ collections });
  }, [guest]);

  return (
    <>
      <h2>Dashboard</h2>
      <WIPComponent />
      <h3>Collections</h3>
      {collections &&
        collections.map((collection) => {
          return (
            <>
              <h4>{collection.name}</h4>
              {collection.items.length > 0 ? (
                <CardCollection
                  collection={collection.items}
                  key={collection.name}
                />
              ) : (
                "No items in collection"
              )}
            </>
          );
        })}
    </>
  );
}
