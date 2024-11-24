import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"

import { ActionIcon } from "@mantine/core"
import {modals} from "@mantine/modals"
import useNest from "~/features/_shared/contexts/nest/useNest.ts"
import useNestActions from "~/features/_shared/hooks/useNestActions.ts"
import { IconHeart, IconHeartFilled } from "~/features/_shared/icons/icons.tsx"
import { displayNotification } from "~/features/_shared/utils/displayNotification.ts"

export default function ToggleFavoriteButton({ id }: { id: string | number }) {
  const {
    addItemToNest,
    addIdToCollection,
    isItemInCollection,
    removeIdFromCollection
  } = useNestActions()

  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  function handleClick(id: string | number) {
    if (!isItemInCollection) {
      removeIdFromCollection(id,"Favorites")
    }
    else {
     addIdToCollection(id,"Favorites")
    }
  }



  useEffect(() => {

    if (!collections) {
      console.log("No collections found")
    } else {
    setIsFavorite(collections.isItemInCollection(id, "Favorites"))
    }
  },[])


  return (
    <ActionIcon
      variant="default"
      radius="md"
      size={36}
      onClick={handleClick}
    >
      {isFavorite ? <IconHeartFilled /> : <IconHeart />}
    </ActionIcon>
  )
}
