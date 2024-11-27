// useNestActions.ts
import { useCallback } from "react"

import { useLogger } from "@mantine/hooks"
import useNest from "~/features/_shared/contexts/nest/useNest.ts"
import { displayNotification } from "~/features/_shared/utils/displayNotification.ts"

export default function useNestActions() {
  const [state, update] = useNest()

  // useLogger("useNestActions", [state])

  // 🧰---- Utility Functions ----
  const isValidId = useCallback((itemId: string | number): boolean => {
    if (!itemId) {
      displayNotification({ message: `Id ${itemId} is not a valid id.` })
      return false
    }
    return true
  }, [])

  const isItemInNest = useCallback(
    (itemId: number | string): boolean => {
      if (isValidId(itemId)) {
        return state.includes(itemId.toString())
      }
      return false
    },
    [isValidId, state],
  )

  // 🪺---- Nest Management ----
  const addItemToNest = useCallback(
    (itemId: number | string): void => {
      if (isItemInNest(itemId)) {
        displayNotification({
          message: `Duplicate, Id: ${itemId} is already in nest`,
          color: "orange",
        })
        return
      }

      update((draft) => {
        draft.push(itemId.toString())
        displayNotification({ message: `Id: ${itemId} added to nest` })
      })
    },
    [isItemInNest, update],
  )

  const removeItemFromNest = useCallback(
    (itemId: number | string): void => {
      if (!state.includes(itemId.toString())) {
        displayNotification({
          message: `Cannot remove, id: ${itemId} is not in nest`,
          color: "orange",
        })
        return
      }

      update((draft) => {
        draft.splice(draft.indexOf(itemId.toString()), 1)
        displayNotification({ message: `Id: ${itemId} removed from nest` })
      })
    },
    [state, update],
  )

  return {
    isValidId,
    isItemInNest,
    addItemToNest,
    removeItemFromNest,
  }
}
