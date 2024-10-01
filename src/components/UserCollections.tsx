import { useEffect } from "react";

import { useGuest } from "~/contexts/GuestContextProvider.tsx";

export default function UserCollections() {
  // const { collections } = useCollections();
  const { guest } = useGuest();

  useEffect(() => {
    console.log(collections);
    console.log(guest);
  }, []);
}
