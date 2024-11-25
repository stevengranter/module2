import { useCallback } from "react"

import { useCollections } from "~/features/_shared/contexts/collections/CollectionsProvider.tsx"
import { Collection } from "~/features/_shared/contexts/nest/NestProvider.types.ts"
import useNestActions from "~/features/_shared/hooks/useNestActions.ts"
import { displayNotification } from "~/features/_shared/utils/displayNotification.ts"
import { _ } from "lodash"

export default function useCollectionActions() {
  const [state, update] = useCollections()
  const nestAction = useNestActions()

  // ---- Collection Management ----
  const hasCollection = useCallback(
    (name: string): boolean => {
      return state.some((collection) => collection.name === name)
    },
    [state],
  )

  const createCollection = useCallback(
    (collectionName: string): void => {
      if (getAllCollectionNames().includes(collectionName)) {
        return displayNotification({
          message: `Collection ${collectionName} already exists`,
          color: "orange",
        })
      } else {
        if (collectionName.length === 0) {
          displayNotification({
            message: `Collection name must be at least 1 character in length`,
            color: "orange",
          })
          return
        } else {
          update((draft) => {
            draft.push({
              name: collectionName,
              id: crypto.randomUUID(),
              items: [],
            })
            displayNotification({
              message: `Collection ${collectionName} created`,
            })
          })
        }
      }
    },
    [hasCollection, update],
  )

  const deleteCollection = useCallback(
    // TODO: confirmation modal if collection still contains items
    (collectionId: number | string): void => {
      update((draft) => {
        _.remove(draft, function (collection: Collection) {
          return collection.id === collectionId
        })
      })
    },
    [update],
  )

  const addIdToCollection = useCallback(
    (id: number | string, name: string): void => {
      if (!nestAction.isValidId(id)) {
        displayNotification({
          message: `Cannot add id: ${id}, not a valid id`,
        })
        return
      }

      if (!nestAction.isItemInNest(id)) {
        // Add item to the Nest
        nestAction.addItemToNest(id.toString())
      }

      if (!hasCollection(name)) {
        displayNotification({
          message: `Collection: ${name} does not exist, creating collection...`,
          color: "orange",
        })
        createCollection(name)
      }

      update((draft) => {
        const namedCollection = draft.find(
          (collection) => collection.name === name,
        )

        if (namedCollection) {
          if (namedCollection.items.includes(id.toString())) {
            displayNotification({
              message: `Cannot add, Collection ${name} already includes id: ${id}`,
              color: "orange",
            })
            return
          }

          namedCollection.items.push(id.toString())
          displayNotification({
            message: `Item: ${id} added to ${namedCollection.name}`,
          })
        }
      })
    },
    [hasCollection, createCollection, update],
  )

  const removeIdFromCollection = useCallback(
    (id: number | string, name: string): void => {
      if (!hasCollection(name)) {
        displayNotification({
          message: `Cannot remove id, Collection ${name} does not exist`,
          color: "orange",
        })
        return
      }

      const namedCollection = state.find(
        (collection) => collection.name === name,
      )
      if (!namedCollection || !namedCollection.items.includes(id.toString())) {
        displayNotification({
          message: `Cannot remove, ID: ${id} is not in collection ${name}`,
          color: "orange",
        })
        return
      }

      update((draft) => {
        const collectionToUpdate = draft.find(
          (collection) => collection.name === name,
        )
        if (collectionToUpdate) {
          const index = collectionToUpdate.items.indexOf(id.toString())
          if (index > -1) {
            collectionToUpdate.items.splice(index, 1)
            displayNotification({
              message: `Removed id:${id} from collection ${name}`,
            })
          }
        }
      })
    },
    [state, hasCollection, update],
  )

  const getCollectionIdByName = useCallback(
    (name: string): string | null => {
      const namedCollection = state.find(
        (collection) => collection.name === name,
      )
      if (!namedCollection) {
        displayNotification({
          message: `Collection ${name} does not exist, no corresponding id`,
        })
        return null
      }
      return namedCollection.id
    },
    [state],
  )

  const isItemInCollection = useCallback(
    (id: number | string, name: string): boolean => {
      if (!hasCollection(name)) {
        displayNotification({
          message: `Collection ${name} does not exist`,
        })
        return false
      }

      const namedCollection = state.find(
        (collection) => collection.name === name,
      )

      const isInCollection = !!namedCollection?.items.includes(id.toString())
      console.log(`id:${id} is in collection: ${isInCollection}}`)
      return isInCollection
    },
    [hasCollection, state],
  )

  const getCollectionsIncludingId = useCallback(
    (id: string | number): Collection[] | null => {
      const matchingCollections = state.filter((collection) =>
        collection.items.includes(id.toString()),
      )
      if (matchingCollections.length === 0) {
        // displayNotification({
        //   message: `Id: ${id} cannot be found in any collection`,
        // })
        return null
      }
      return matchingCollections
    },
    [state],
  )

  const getCollectionNamesIncludingId = useCallback(
    (id: string | number): string[] | null => {
      const matchingCollections = getCollectionsIncludingId(id)
      if (!matchingCollections) return null
      return matchingCollections.map((collection) => collection.name)
    },
    [getCollectionsIncludingId],
  )

  const getAllCollectionNames = useCallback(() => {
    const collectionNames = state.map((collection) => collection.name)
    console.log({ collectionNames })
    return collectionNames
  }, [state])

  const getIdsByCollectionId = useCallback(
    (name: string): string[] => {
      const collection = state.find((collection) => collection.name === name)
      if (!collection || !collection.items) return []
      return collection.items
    },
    [state],
  )

  return {
    createCollection,
    getCollectionsIncludingId,
    getCollectionNamesIncludingId,
    getCollectionIdByName,
    getIdsByCollectionId,
    deleteCollection,
    getAllCollectionNames,
    addIdToCollection,
    removeIdFromCollection,
    isItemInCollection,
  }
}
