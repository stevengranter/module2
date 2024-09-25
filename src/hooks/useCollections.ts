import { useContext, useEffect, useState } from "react";

import { RoleContext } from "~/contexts/RoleContextProvider.tsx";
import { Role } from "~/contexts/Roles.ts";

type Collection = Record<string, string[]>;
type Collections = Collection[];

export default function useCollections() {
  const { role, user, isAuthenticated } = useContext(RoleContext);
  const [collections, setCollections] = useState<Collections | null>(null);
  // const [error, setError] = useState<string | null>(null);
  console.log({ user });
  useEffect(() => {
    if (user && user.id === "guest") {
      try {
        const guestJSON = localStorage.getItem("guest");
        console.log(guestJSON);
        if (guestJSON) {
          console.log(guestJSON);
        }
      } catch {
        throw new Error("Something went wrong");
      }
    }
  }, [user]);

  function getCollections() {
    if (user && user.id === "guest") {
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
    if (user && !user.collections) {
      console.log("Guest user has no collections");
    }
  }

  if (isAuthenticated) {
    console.log("Fetching collections from database...");
    // const myCollections = [
    //   { default: ["10"] },
    //   { favorites: ["1", "2", "3"] },
    //   { wishlist: ["6", "7", "8"] },
    // ];
    // setCollections([...myCollections]);
  } else if (role === Role.Guest) {
    console.log("Fetching collections from localStorage");
    const myCollections = [{ favorites: ["4", "5", "6"] }];
    setCollections([...myCollections]);
  } else {
    // console.log("No collections defined");
  }
  return {
    collections,
    getCollections,
    setCollections,
    getGuestCollections,
  };
}
