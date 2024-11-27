import { useEffect, useState } from "react"

import { ActionIcon } from "@mantine/core"
import { IconHeart } from "@tabler/icons-react"
import { useCollections } from "~/features/_shared/contexts/collections/useCollections.ts"
import useCollectionActions from "~/features/_shared/hooks/useCollectionActions.ts"
import { IconHeartFilled } from "~/features/_shared/icons/icons.tsx"

export default function ToggleFavoriteButton({ id }: { id: string | number }) {
  const collectionAction = useCollectionActions()
  const collections = useCollections()

  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  function handleClick(id: string | number) {
    if (collectionAction.isItemInCollection(id, "Favorites")) {
      collectionAction.removeIdFromCollection(id, "Favorites")
      setIsFavorite(false)
    } else {
      collectionAction.addIdToCollection(id, "Favorites")
      setIsFavorite(true)
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
      }
    }
  }, [collections])

  return (
    <ActionIcon
      variant="gradient"
      radius="md"
      // color="pink"
      gradient={{ from: "#FAA2C1", to: "red", deg: 0 }}
      size={36}
      onClick={() => handleClick(id)}
    >
      {isFavorite ? <IconHeartFilled /> : <IconHeart />}
    </ActionIcon>
  )
}
