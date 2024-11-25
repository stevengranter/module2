import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { ActionIcon } from "@mantine/core"
import { modals } from "@mantine/modals"
import { useCollections } from "~/features/_shared/contexts/collections/CollectionsProvider.tsx"
import useNest from "~/features/_shared/contexts/nest/useNest.ts"
import useCollectionActions from "~/features/_shared/hooks/useCollectionActions.ts"
import useNestActions from "~/features/_shared/hooks/useNestActions.ts"
import { IconHeart, IconHeartFilled } from "~/features/_shared/icons/icons.tsx"
import { displayNotification } from "~/features/_shared/utils/displayNotification.ts"

export default function ToggleFavoriteButton({ id }: { id: string | number }) {
  const collectionAction = useCollectionActions()
  const collections = useCollections()

  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  function handleClick(id: string | number) {
    const hasFavoritesCollection = collectionAction
      .getAllCollectionNames()
      .includes("Favorites")
    console.log({ hasFavoritesCollection })
    // if Favorites doesn't exist, create it
    if (!collectionAction.getAllCollectionNames().includes("Favorites")) {
      collectionAction.createCollection("Favorites")
    }
    // add/remove id from Favorites depending on if it already in Favorites
    // group
    if (collectionAction.isItemInCollection(id, "Favorites")) {
      collectionAction.removeIdFromCollection(id, "Favorites")
    } else {
      collectionAction.addIdToCollection(id, "Favorites")
    }
    setIsFavorite(collectionAction.isItemInCollection(id, "Favorites"))
  }

  useEffect(() => {
    if (!collections) {
      console.log("No collections found")
    } else {
      if (collectionAction.getAllCollectionNames().includes("Favorites")) {
        setIsFavorite(
          collectionAction.isItemInCollection(id.toString(), "Favorites"),
        )
      } else {
        collectionAction.createCollection("Favorites")
        setIsFavorite(
          collectionAction.isItemInCollection(id.toString(), "Favorites"),
        )
      }
    }
  }, [])

  return (
    <ActionIcon
      variant="default"
      radius="md"
      size={36}
      onClick={() => handleClick(id)}
    >
      {isFavorite ? <IconHeartFilled /> : <IconHeart />}
    </ActionIcon>
  )
}
