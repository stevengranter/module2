import { useEffect } from "react"

import { useLocalStorage } from "@mantine/hooks"
import { useImmer } from "use-immer"

function getLocalStorageObject(localStorageKey: string) {
  const localStorageObject = localStorage.getItem(localStorageKey)
  if (!localStorageObject) return null
  return JSON.parse(localStorageObject)
}

export default function useLocalSyncedImmerState(
  defaultState = {},
  localStorageKey = "localData",
) {
  let initialState
  initialState = getLocalStorageObject(localStorageKey)
  if (!initialState || initialState.length === 0) {
    initialState = defaultState
  }

  const [localStorageState, setLocalStorageState] = useLocalStorage({
    key: localStorageKey,
    defaultValue: initialState,
  })

  const [state, updater] = useImmer(localStorageState)

  useEffect(() => {
    setLocalStorageState(state)
  }, [state, setLocalStorageState])

  return [state, updater]
}
