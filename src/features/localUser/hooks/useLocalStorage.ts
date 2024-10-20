import { useEffect, useState } from "react";

const STORAGE_KEY = "__local_user__";

export default function useLocalStorage(STORAGE_KEY: string) {
  const [storage, setStorage] = useState(
    JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"),
  );

  useEffect(() => {
    saveStorage();
  }, [storage]);

  function init() {
    console.log("initStorage()");
    setStorage(storage);
    saveStorage();
  }

  function saveStorage() {
    console.log("saveStorage()");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  }

  function updateStorage(updates: object) {
    console.log("updateStorage");
    setStorage((previousStorage: object) => ({
      ...previousStorage,
      ...updates,
    }));
    saveStorage();
  }

  function clearStorage() {
    console.log("clearStorage()");
    localStorage.removeItem(STORAGE_KEY);
    setStorage({});
  }

  return { storage, saveStorage, updateStorage, clearStorage };
}
