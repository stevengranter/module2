import { notifications } from "@mantine/notifications"
// import { useLogger } from "@mantine/hooks"
import { useCollections } from "~/features/_shared/contexts/collections/useCollections.ts"
import { Collection } from "~/features/_shared/contexts/nest/NestProvider.types.ts"
import useNestActions from "~/features/_shared/hooks/useNestActions.ts"
import { displayNotification } from "~/features/_shared/utils/displayNotification.ts"
// import { displayNotification } from "~/features/_shared/utils/displayNotification.ts"
// import { displayNotification } from "~/features/_shared/utils/displayNotification.ts"
import _ from "lodash"

const notificationsQueueId = "message-queue"

function initNotifications() {
  notifications.show({
    id: notificationsQueueId,
    message: "",
    position: "top-right",
  })
}

export default function useCollectionActions() {
  const [state, update] = useCollections()
  const nestAction = useNestActions()

  // useLogger("useCollectionActions", [state])

  // ---- Collection Management ----
  function hasCollection(name: string): boolean {
    return state.some((collection) => collection.name === name)
  }

  function createCollection(collectionName: string): void {
    console.log("createCollection()")
    initNotifications()
    if (getAllCollectionNames().includes(collectionName)) {
      notifications.update({
        id: notificationsQueueId,
        message: `Collection ${collectionName} already exists`,
        color: "orange",
      })
    } else {
      if (collectionName.length === 0) {
        notifications.update({
          id: notificationsQueueId,
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
          notifications.update({
            id: notificationsQueueId,
            message: `Collection ${collectionName} created`,
          })
        })
      }
    }
  }

  function deleteCollection(collectionId: number | string): void {
    update((draft) => {
      _.remove(draft, function (collection: Collection) {
        return collection.id === collectionId
      })
    })
  }

  function addIdToCollection(id: number | string, name: string): void {
    initNotifications()
    if (!nestAction.isValidId(id)) {
      notifications.update({
        id: notificationsQueueId,
        message: `Cannot add id: ${id}, not a valid id`,
      })
      return
    }

    if (!nestAction.isItemInNest(id)) {
      // Add item to the Nest
      nestAction.addItemToNest(id.toString())
    }

    if (!hasCollection(name)) {
      notifications.update({
        id: notificationsQueueId,
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
          notifications.update({
            id: notificationsQueueId,
            message: `Cannot add, Collection ${name} already includes id: ${id}`,
            color: "orange",
          })
          return
        }

        namedCollection.items.push(id.toString())
        notifications.update({
          id: notificationsQueueId,
          message: `Item: ${id} added to ${namedCollection.name}`,
        })
      }
    })
  }

  function removeIdFromCollection(id: number | string, name: string): void {
    initNotifications()
    if (!hasCollection(name)) {
      notifications.update({
        id: notificationsQueueId,
        message: `Cannot remove id, Collection ${name} does not exist`,
        color: "orange",
      })
      return
    }

    const namedCollection = state.find((collection) => collection.name === name)
    if (!namedCollection || !namedCollection.items.includes(id.toString())) {
      notifications.update({
        id: notificationsQueueId,
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
          notifications.update({
            id: notificationsQueueId,
            message: `Removed id:${id} from collection ${name}`,
          })
        }
      }
    })
  }

  function getCollectionIdByName(name: string): string | null {
    // initNotifications()
    const namedCollection = state.find((collection) => collection.name === name)
    if (!namedCollection) {
      // notifications.update({
      //   id: notificationsQueueId,
      //   message: `Collection ${name} does not exist, no corresponding id`,
      // })
      return null
    }
    return namedCollection.id
  }

  function isItemInCollection(id: number | string, name: string): boolean {
    // initNotifications()
    // if (!hasCollection(name)) {
    //   notifications.update({
    //     id: notificationsQueueId,
    //     message: `Collection ${name} does not exist`,
    //   })
    //   return false
    // }

    const namedCollection = state.find((collection) => collection.name === name)

    return !!namedCollection?.items.includes(id.toString())
  }

  function getCollectionsIncludingId(id: string | number): Collection[] | null {
    // initNotifications()
    const matchingCollections = state.filter((collection) =>
      collection.items.includes(id.toString()),
    )
    if (matchingCollections.length === 0) {
      // notifications.update({
      //   message: `id: ${id} cannot be found in any collection`,
      // })
      return null
    }
    return matchingCollections
  }

  function getCollectionNamesIncludingId(id: string | number): string[] | null {
    const matchingCollections = getCollectionsIncludingId(id)
    if (!matchingCollections) return null
    return matchingCollections.map((collection) => collection.name)
  }

  function getAllCollectionNames() {
    return state.map((collection) => collection.name)
  }

  return {
    createCollection,
    getCollectionNamesIncludingId,
    getCollectionIdByName,
    deleteCollection,
    getAllCollectionNames,
    addIdToCollection,
    removeIdFromCollection,
    isItemInCollection,
  }
}
