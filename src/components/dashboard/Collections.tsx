// import useAuth from "hooks/useAuth";
import { useEffect } from "react";

import { useGuest } from "~/hooks/useGuest.ts";
import CollectionCreateForm from "~/lib/localStorage/CollectionCreateForm.tsx";

import CardCollection from "components/card/CardCollection";

export default function Collections() {
  const { guest } = useGuest();

  useEffect(() => {
    console.log("Collections.useEffect()");
  }, [guest]);

  return (
    guest && (
      <>
        <h2>Collections</h2>
        <CollectionCreateForm />
        {/*<CollectionCreateButton />*/}
        <h3>Collections</h3>
        {guest.collections &&
          guest.collections.map((collection) => {
            return (
              <>
                <h4>{collection.name}</h4>
                <p>{collection.description}</p>
                {collection.items && collection.items.length > 0 ? (
                  <CardCollection
                    collection={collection.items}
                    key={collection.id}
                  />
                ) : (
                  "No items in collection. Add some items"
                )}
              </>
            );
          })}
      </>
    )
  );
}
