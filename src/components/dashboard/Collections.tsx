// import useAuth from "hooks/useAuth";
import { useContext, useEffect } from "react";

import { Title } from "@mantine/core";
import { GuestSessionContext } from "~/features/guest/GuestSessionProvider.tsx";
import ToggleGuestSessionButton from "~/features/guest/ToggleGuestSessionButton.tsx";
import { NestContext } from "~/features/nest/NestProvider.tsx";

import CardCollection from "components/card/CardCollection";

export default function Collections() {
  const { isGuest } = useContext(GuestSessionContext);
  const { collections } = useContext(NestContext);

  useEffect(() => {
    console.log("Collections.useEffect()");
    console.log({ isGuest });
  }, [isGuest]);

  if (!isGuest) {
    return (
      <>
        <p>You must be a guest to create a collection</p>
        <ToggleGuestSessionButton />
      </>
    );
  }

  if (collections.get().length === 0) {
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
      ) : (
        <>
          <Title order={3}>No collections</Title>
          <p>You must be a guest to create a collection.</p>
          <ToggleGuestSessionButton />
        </>
      )}
    </>
  );
}
