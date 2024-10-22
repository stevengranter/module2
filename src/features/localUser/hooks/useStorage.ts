import { useEffect, useState } from "react";

export default function useStorage(
  storageKey: string,
  storageType = localStorage,
) {
  const [storage, setStorage] = useState(
    JSON.parse(storageType.getItem(storageKey) || "{}"),
  );

  useEffect(() => {
    saveStorage();
  }, [storage]);

  useEffect(() => {
    init();
  }, []);

  function init() {
    console.log("initStorage()");
    setStorage(storage);
    saveStorage();
  }

  function saveStorage() {
    console.log("saveStorage()");
    try {
      storageType.setItem(storageKey, JSON.stringify(storage));
    } catch (error) {
      console.log(error);
    }
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
    storageType.removeItem(storageKey);
    setStorage({});
  }

  return { storage, saveStorage, updateStorage, clearStorage };
}
