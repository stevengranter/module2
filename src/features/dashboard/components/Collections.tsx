import { useContext, useEffect } from "react";

import { Title } from "@mantine/core";
import { NestContext } from "~/features/_shared/contexts/nest/NestProvider.tsx";
import CardCollection from "~/features/card/components/CardCollection/CardCollection.tsx";
import useGuest from "~/features/guest-session/hooks/useGuest.ts";

export default function Collections() {
  const { isGuest } = useGuest();
  const { collections } = useContext(NestContext);

  useEffect(() => {
    console.log("components.useEffect()");
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
