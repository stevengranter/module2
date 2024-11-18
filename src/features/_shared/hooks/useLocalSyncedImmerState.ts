import { useEffect } from "react";

import { useLocalStorage } from "@mantine/hooks";
import { useImmer } from "use-immer";

function getLocalStorageObject(localStorageKey: string) {
  const localStorageObject = localStorage.getItem(localStorageKey);
  if (!localStorageObject) return {};
  return JSON.parse(localStorageObject);
}

export default function useLocalSyncedImmerState(
  defaultState,
  localStorageKey = "localData",
) {
  let initialState;
  initialState = getLocalStorageObject(localStorageKey);
  if (!initialState) {
    initialState = defaultState;
  }

  const [localStorageState, setLocalStorageState] = useLocalStorage({
    key: localStorageKey,
    defaultValue: initialState,
  });

  const [state, setState] = useImmer(localStorageState);

  useEffect(() => {
    setLocalStorageState(state);
  }, [state, setLocalStorageState]);

  return [state, setState];
}
