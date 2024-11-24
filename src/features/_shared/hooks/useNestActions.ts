// useNestActions.ts
import { useCallback } from "react"

import { useLogger } from "@mantine/hooks"
import { useCollections } from "~/features/_shared/contexts/collections/CollectionsProvider.tsx"
import { Collection } from "~/features/_shared/contexts/nest/NestProvider.types.ts"
import useNest from "~/features/_shared/contexts/nest/useNest.ts"
import useStorageSyncedImmerState from "~/features/_shared/hooks/useLocalSyncedImmerState.ts"
import { displayNotification } from "~/features/_shared/utils/displayNotification.ts"

// 🗣️---- Type Definition ----
type StorageSyncedState = {
  nest: string[]
  collections: Collection[]
}

export default function useNestActions() {
  const [state, update] = useNest()
  const collections = useCollections()

  useLogger("useNestActions", [state])

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
  //
  // // ---- Collection Management ----
  // const hasCollection = useCallback(
  //   (name: string): boolean => {
  //     return state.collections.some((collection) => collection.name === name)
  //   },
  //   [state.collections],
  // )
  //
  // const createCollection = useCallback(
  //   (collectionName: string): void => {
  //     if (hasCollection(collectionName)) {
  //       displayNotification({
  //         message: `Collection ${collectionName} already exists`,
  //         color: "orange",
  //       })
  //       return
  //     }
  //
  //     if (collectionName.length === 0) {
  //       displayNotification({
  //         message: `Collection name must be at least 1 character in length`,
  //         color: "orange",
  //       })
  //       return
  //     }
  //
  //     update((draft) => {
  //       draft.collections.push({
  //         name: collectionName,
  //         id: crypto.randomUUID(),
  //         items: [],
  //       })
  //       displayNotification({
  //         message: `Collection ${collectionName} created`,
  //       })
  //     })
  //   },
  //   [hasCollection, update],
  // )
  //
  // const deleteCollection = useCallback(
  //   (collectionId: number | string): void => {
  //     update((draft) => {
  //       const beforeLength = draft.collections.length
  //       draft.collections = draft.collections.filter(
  //         (collection) => collection.id !== collectionId.toString(),
  //       )
  //       if (draft.collections.length < beforeLength) {
  //         displayNotification({ message: `Collection deleted successfully` })
  //       }
  //     })
  //   },
  //   [update],
  // )
  //
  // const addIdToCollection = useCallback(
  //   (id: number | string, name: string): void => {
  //     if (!isValidId(id)) {
  //       displayNotification({
  //         message: `Cannot add id: ${id}, not a valid id`,
  //       })
  //       return
  //     }
  //
  //     if (!isItemInNest(id)) {
  //       // Push the id into the nest
  //       update((draft) => {
  //         draft.push(id.toString())
  //       })
  //     }
  //
  //     if (!hasCollection(name)) {
  //       displayNotification({
  //         message: `Collection: ${name} does not exist, creating collection...`,
  //         color: "orange",
  //       })
  //       createCollection(name)
  //     }
  //
  //     update((draft) => {
  //       const namedCollection = draft.collections.find(
  //         (collection) => collection.name === name,
  //       )
  //
  //       if (namedCollection) {
  //         if (namedCollection.items.includes(id.toString())) {
  //           displayNotification({
  //             message: `Cannot add, Collection ${name} already includes id: ${id}`,
  //             color: "orange",
  //           })
  //           return
  //         }
  //
  //         namedCollection.items.push(id.toString())
  //         displayNotification({
  //           message: `Item: ${id} added to ${namedCollection.name}`,
  //         })
  //       }
  //     })
  //   },
  //   [isValidId, isItemInNest, hasCollection, createCollection, update],
  // )
  //
  // const removeIdFromCollection = useCallback(
  //   (id: number | string, name: string): void => {
  //     if (!hasCollection(name)) {
  //       displayNotification({
  //         message: `Cannot remove id, Collection ${name} does not exist`,
  //         color: "orange",
  //       })
  //       return
  //     }
  //
  //     const namedCollection = state.collections.find(
  //       (collection) => collection.name === name,
  //     )
  //     if (!namedCollection || !namedCollection.items.includes(id.toString())) {
  //       displayNotification({
  //         message: `Cannot remove, ID: ${id} is not in collection ${name}`,
  //         color: "orange",
  //       })
  //       return
  //     }
  //
  //     update((draft) => {
  //       const collectionToUpdate = draft.collections.find(
  //         (collection) => collection.name === name,
  //       )
  //       if (collectionToUpdate) {
  //         const index = collectionToUpdate.items.indexOf(id.toString())
  //         if (index > -1) {
  //           collectionToUpdate.items.splice(index, 1)
  //           displayNotification({
  //             message: `Removed id:${id} from collection ${name}`,
  //           })
  //         }
  //       }
  //     })
  //   },
  //   [hasCollection, state.collections, update],
  // )
  //
  // const getCollectionIdByName = useCallback(
  //   (name: string): string | null => {
  //     const namedCollection = state.collections.find(
  //       (collection) => collection.name === name,
  //     )
  //     if (!namedCollection) {
  //       displayNotification({
  //         message: `Collection ${name} does not exist, no corresponding id`,
  //       })
  //       return null
  //     }
  //     return namedCollection.id
  //   },
  //   [state.collections],
  // )
  //
  // const isItemInCollection = useCallback(
  //   (id: number | string, name: string): boolean => {
  //     if (!hasCollection(name)) {
  //       displayNotification({
  //         message: `Collection ${name} does not exist`,
  //       })
  //       return false
  //     }
  //
  //     const namedCollection = state.collections.find(
  //       (collection) => collection.name === name,
  //     )
  //     return namedCollection?.items.includes(id.toString()) ?? false
  //   },
  //   [hasCollection, state.collections],
  // )
  //
  // const getCollectionsIncludingId = useCallback(
  //   (id: string | number): Collection[] | null => {
  //     const matchingCollections = state.collections.filter((collection) =>
  //       collection.items.includes(id.toString()),
  //     )
  //     if (matchingCollections.length === 0) {
  //       displayNotification({
  //         message: `Id: ${id} cannot be found in any collection`,
  //       })
  //       return null
  //     }
  //     return matchingCollections
  //   },
  //   [state.collections],
  // )
  //
  // const getCollectionNamesIncludingId = useCallback(
  //   (id: string | number): string[] | null => {
  //     const matchingCollections = getCollectionsIncludingId(id)
  //     if (!matchingCollections) return null
  //     return matchingCollections.map((collection) => collection.name)
  //   },
  //   [getCollectionsIncludingId],
  // )
  //
  // const getIdsByCollectionId = useCallback(
  //   (name: string): string[] => {
  //     const collection = collections.find(
  //       (collection) => collection.name === name,
  //     )
  //     if (!collection || !collection.items) return []
  //     return collection.items
  //   },
  //   [collections],
  // )
  return {
    isValidId,
    isItemInNest,
    addItemToNest,
    removeItemFromNest,
  }
}
