import { useEffect, useState } from "react"

import {
  ActionIcon,
  createTheme,
  MantineThemeProvider,
  rem,
} from "@mantine/core"
import { IconHeart, IconHeartFilled } from "@tabler/icons-react"
import { useCollections } from "~/features/_shared/contexts/collections/useCollections.ts"
import useCollectionActions from "~/features/_shared/hooks/useCollectionActions.ts"

import classes from "./ToggleFavoriteButton.module.css"

const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      classNames: classes,
    }),
  },
})

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
  }, [collectionAction, collections, id])

  return (
    <MantineThemeProvider theme={theme}>
      <ActionIcon
        variant="transparent"
        radius="md"
        color="red"
        size="xxl"
        onClick={() => handleClick(id)}
        aria-label="Favorites"
      >
        {isFavorite ? (
          <IconHeartFilled style={{ width: rem(32), height: rem(32) }} />
        ) : (
          <IconHeart style={{ width: rem(32), height: rem(32) }} />
        )}
      </ActionIcon>
    </MantineThemeProvider>
  )
}
