import { ReactNode, useEffect, useState } from "react"

import { ActionIcon, createTheme, MantineThemeProvider } from "@mantine/core"
import { useCollections } from "~/features/_shared/contexts/collections/useCollections.ts"
import useCollectionActions from "~/features/_shared/hooks/useCollectionActions.ts"

import classes from "./ToggleCollectionButton.module.css"

const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      classNames: classes,
    }),
  },
})

export default function ToggleCollectionButton({
  id,
  collection,
  TrueIconComponent,
  FalseIconComponent,
  variant = "default",
}: {
  id: string | number
  collection: string
  TrueIconComponent: ReactNode
  FalseIconComponent: ReactNode
  variant?: string
}) {
  const collectionAction = useCollectionActions()
  const collections = useCollections()

  const [isInCollection, setIsInCollection] = useState<boolean>(false)

  function handleClick(id: string | number) {
    if (collectionAction.isItemInCollection(id, collection)) {
      collectionAction.removeIdFromCollection(id, collection)
      setIsInCollection(false)
    } else {
      collectionAction.addIdToCollection(id, collection)
      setIsInCollection(true)
    }
    setIsInCollection(collectionAction.isItemInCollection(id, collection))
  }

  useEffect(() => {
    if (!collections) {
      console.log("No collections found")
    } else {
      if (collectionAction.getAllCollectionNames().includes(collection)) {
        setIsInCollection(
          collectionAction.isItemInCollection(id.toString(), collection),
        )
      }
    }
  }, [collectionAction, collections, id])

  return (
    <MantineThemeProvider theme={theme}>
      <ActionIcon
        variant={variant}
        onClick={() => handleClick(id)}
        aria-label={collection}
      >
        {isInCollection ? TrueIconComponent : FalseIconComponent}
      </ActionIcon>
    </MantineThemeProvider>
  )
}
