// import useAuth from "hooks/useAuth";
import { useEffect } from "react";

import { useGuest } from "~/contexts/GuestContextProvider.tsx";
import CollectionCreateButton from "~/lib/localStorage/CollectionCreateButton.tsx";

import CardCollection from "components/card/CardCollection";

export default function Collections() {
  const { guest } = useGuest();
  // const { collections, error } = useCollections();
  // if (error) {
  //   console.log(error);
  // }
  useEffect(() => {
    console.log("Collections.useEffect()");
  }, [guest]);

  return (
    guest && (
      <>
        <h2>Collections</h2>
        <CollectionCreateButton />
        <h3>Collections</h3>
        {guest.collections &&
          guest.collections.map((collection) => {
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
    )
  );
}
