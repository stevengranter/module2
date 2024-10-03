import { useEffect } from "react";

import { useGuest } from "~/hooks/useGuest.ts";

export default function UserCollections() {
  // const { collections } = useCollections();
  const { guest } = useGuest();

  useEffect(() => {
    console.log(collections);
    console.log(guest);
  }, []);
}
