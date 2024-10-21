import { useEffect, useState } from "react";

const STORAGE_KEY = "__local_user__";

export default function useStorage(
  STORAGE_KEY: string,
  storageType = localStorage,
) {
  const [storage, setStorage] = useState(
    JSON.parse(storageType.getItem(STORAGE_KEY) || "{}"),
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
      storageType.setItem(STORAGE_KEY, JSON.stringify(storage));
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
    storageType.removeItem(STORAGE_KEY);
    setStorage({});
  }

  return { storage, saveStorage, updateStorage, clearStorage };
}
