import { useEffect, useState } from "react"

import { Text } from "@mantine/core"
import { useLogger } from "@mantine/hooks"
import { useCollections } from "~/features/_shared/contexts/collections/CollectionsProvider.tsx"
import { Collection } from "~/features/_shared/contexts/nest/NestProvider.types.ts"
import useNest from "~/features/_shared/contexts/nest/useNest.ts"
import useCollectionActions from "~/features/_shared/hooks/useCollectionActions.ts"
// import useNestActions from "~/features/_shared/hooks/useNestActions.ts"
import CardCollection from "~/features/card/components/CardCollection/CardCollection.tsx"
import CollectionSelectBox from "~/features/card/components/CollectionSelectBox.tsx"

export default function NestView() {
  // Initialize nestState and collectionState for NestContext and
  // CollectionContext access
  const [nestState] = useNest()
  const [collectionsState] = useCollections()

  // Initialize nestAction for accessing nest management functions
  // const nestAction = useNestActions()

  // Initialize collectionActions for collection management functions
  const collectionAction = useCollectionActions()

  //
  const [dropdownDataArray, setDropdownDataArray] = useState<
    { value: string; label: string }[] | []
  >()
  const [itemIdsArray, setItemIdsArray] = useState<string[]>([])
  const [collectionIdsArray, setCollectionIdsArray] = useState<string[]>([])
  const [collectionDescription, setCollectionDescription] = useState<
    string | null
  >(null)
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | null
  >(null)

  function formatDropdownData(collectionsArray: Collection[]) {
    if (!collectionsArray) return
    const dropDownData = collectionsArray.map((collection) => {
      return { value: collection.id, label: collection.name }
    })
    return dropDownData
  }

  useLogger("NestView", [
    nestState,
    collectionsState,
    { collectionNames: dropdownDataArray },
    { selectedCollectionId },
    { itemIdsArray },
  ])

  useEffect(() => {
    if (!collectionAction.getAllCollectionNames().includes("Starter Pack")) {
      collectionAction.createCollection("Starter Pack")
    }
    setSelectedCollectionId(
      collectionAction.getCollectionIdByName("Starter Pack"),
    )
  }, [])

  useEffect(() => {
    if (!collectionsState) {
      return // setDropdownDataArray([{ value: "2", label: "group" }])
    } else {
      const formattedData = formatDropdownData(collectionsState)
      setDropdownDataArray(formattedData)
    }
  }, [collectionsState.length])

  useEffect(() => {
    if (!selectedCollectionId) return
    // const itemIds = nestAction.getIdsByCollectionId(selectedCollectionId)
    // const itemIds = collectionsState.map(
    //   (collection) => (collection.id = selectedCollectionId),
    // )
    const selectedCollection = collectionsState.find(
      (collection) => collection.id === selectedCollectionId,
    )
    if (!selectedCollection) return
    setItemIdsArray(selectedCollection.items)
    console.log({ selectedCollection })
    if (selectedCollection.description) {
      console.log(selectedCollection.description)
      const description = selectedCollection.description
      setCollectionDescription(description)
    }
    console.log("selectedCollectionId has changed")
  }, [selectedCollectionId, collectionsState])

  // TODO: Fix for choosing current option (errors with null value)
  function handleSelect(selectedValue: string) {
    console.log(selectedValue)
    if (selectedValue) setSelectedCollectionId(selectedValue)
    console.log(selectedValue)
  }

  return collectionsState && collectionsState.length > 0 ? (
    <>
      <CollectionsInitializer />
      <CollectionSelectBox
        data={dropdownDataArray}
        value={selectedCollectionId}
        handleSelectFn={handleSelect}
      />

      <CardCollection
        itemIdArray={itemIdsArray}
        collectionId={selectedCollectionId}
        description={collectionDescription}
      />
    </>
  ) : (
    <>
      <Text>No collections found</Text>
      <CardCollection
        itemIdArray={itemIdsArray}
        collectionId={selectedCollectionId}
        description={collectionDescription}
      />
    </>
  )
}

// Initialize the Favorites collection if it doesn't exist
function CollectionsInitializer() {
  const collectionAction = useCollectionActions()

  useEffect(() => {
    if (!collectionAction.getAllCollectionNames().includes("Favorites")) {
      collectionAction.createCollection("Favorites")
    }
    if (!collectionAction.getAllCollectionNames().includes("Starter Pack")) {
      collectionAction.createCollection("Starter Pack")
    }
  }, [collectionAction])

  return null // This component doesn't render anything
}
