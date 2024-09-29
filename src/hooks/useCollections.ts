import { useEffect, useState } from "react";

import { useGuest } from "~/contexts/GuestContextProvider.tsx";

type Collection = { name: string; items: [] };
type Collections = Collection[];

export default function useCollections() {
  const [collections, setCollections] = useState<Collections | null>(null);
  const { guest } = useGuest();
  // const { user } = useUserData();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (guest) {
      try {
        const guestJSON = localStorage.getItem("guest");
        const guest = JSON.parse(guestJSON);
        if (guest && guest.collections) {
          setCollections(guest.collections);
        }
      } catch {
        setError("Something went wrong");
      }
    }
  }, [guest]);

  function getCollections() {
    if (guest) {
      getGuestCollections();
    }
  }
  // function storeCollections(collectionsArray) {
  //   if (user && user.id === "guest") {
  //     const guest = localStorage.getItem("guest");
  //     if (guest) guestJSON = JSON.parse(guest);
  //     else setError("No guest in localStorage");
  //     localStorage.setItem("user", "collections");
  //   }
  // }

  function getGuestCollections() {
    // const guestJSON = localStorage.getItem("guest");
    // const guestObj = JSON.parse(guestJSON);
    if (guest && !guest.collections) {
      console.log("Guest user has no collections");
    }
  }

  // if (isAuthenticated) {
  //   console.log("Fetching collections from database...");
  //   // const myCollections = [
  //   //   { default: ["10"] },
  //   //   { favorites: ["1", "2", "3"] },
  //   //   { wishlist: ["6", "7", "8"] },
  //   // ];
  //   // setCollections([...myCollections]);
  // } else if (role === Role.Guest) {
  //   console.log("Fetching collections from localStorage");
  //   const myCollections = [{ favorites: ["4", "5", "6"] }];
  //   setCollections([...myCollections]);
  // } else {
  //   // console.log("No collections defined");
  // }
  return {
    collections,
    getCollections,
    setCollections,
    error,
  };
}
