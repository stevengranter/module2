// import useAuth from "hooks/useAuth";
import { useContext, useEffect } from "react";

import { GuestSessionContext } from "~/features/guest/GuestSessionProvider.tsx";
import { NestContext } from "~/features/nest/NestProvider.tsx";

import CardCollection from "components/card/CardCollection";

export default function Collections() {
  const { isGuest } = useContext(GuestSessionContext);
  const { collections } = useContext(NestContext);

  useEffect(() => {
    console.log("Collections.useEffect()");
    console.log({ isGuest });
  }, [isGuest]);

  return (
    isGuest && (
      <>
        <h2>Collections</h2>

        {/*<CollectionCreateButton />*/}
        <h3>Collections</h3>
        {collections &&
          collections.get().map((collection) => {
            return (
              <>
                <h4>{collection.name}</h4>
                {/*<p>{collection.description}</p>*/}
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
