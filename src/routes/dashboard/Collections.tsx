import { useContext, useEffect } from "react";

import { Title } from "@mantine/core";
import CardCollection from "~/components/card/CardCollection.tsx";
import useGuest from "~/features/guest/useGuest.ts";
import { NestContext } from "~/features/nest/NestProvider.tsx";

export default function Collections() {
  const { isGuest } = useGuest();
  const { collections } = useContext(NestContext);

  useEffect(() => {
    console.log("Collections.useEffect()");
    console.log({ isGuest });
  }, [isGuest]);

  if (isGuest && collections.get().length === 0) {
    return (
      <p>No collections yet, add creatures in search to add to collections.</p>
    );
  }

  return (
    <>
      <Title order={3}>Collections</Title>

      {isGuest ? (
        collections.get().length > 0 ? (
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
          })
        ) : (
          <p>Add a collection</p>
        )
      ) : null}
    </>
  );
}
