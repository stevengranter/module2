import { useEffect } from "react";

import { useGuest } from "~/contexts/GuestContextProvider.tsx";
import useCollections from "~/hooks/useCollections.ts";

export default function UserCollections() {
  const { collections } = useCollections();
  const { guest } = useGuest();

  useEffect(() => {
    console.log(colletions);
  }, []);
}
