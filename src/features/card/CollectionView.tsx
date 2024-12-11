import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import { Button, Select, SimpleGrid, Text } from "@mantine/core"
import { randomId } from "@mantine/hooks"
import { useLogger } from "~/dev.ts"
import { useCollections } from "~/features/_shared/contexts/collections/useCollections.ts"
import useCollectionActions from "~/features/_shared/hooks/useCollectionActions.tsx"
import useLocalSyncedImmerState from "~/features/_shared/hooks/useLocalSyncedImmerState.ts"
import { WildCard } from "~/features/card/components/WildCard/WildCard.tsx"
import { Interweave } from "interweave"
import { transform } from "lodash"

import "./CollectionView.css"

export default function CollectionView() {
  const [collections] = useCollections()
  const collectionAction = useCollectionActions()

  // const [selectedCollectionId, setSelectedCollectionId] = useState<
  //   string | null
  // >("")

  const [selectedCollectionId, setSelectedCollectionId] =
    useLocalSyncedImmerState(
      collectionAction.getCollectionIdByName("Starter" + " Pack"),
      "selectedCollectionId",
    )

  let itemIdsArray = [] as string[]

  function transform(
    node: HTMLElement,
    children: React.ReactNode,
  ): React.ReactNode {
    if (node.tagName === "A") {
      return <Link to={node.getAttribute("href") || ""}>{children}</Link>
    }
  }

  const selectedCollection = collections.find(
    (collection) => collection.id === selectedCollectionId,
  )

  if (selectedCollection) itemIdsArray = selectedCollection.items

  // set a unique groupKey so TransitionGroup will rerender on
  // selectedCollectionId change
  const [groupKey, setGroupKey] = useState<string | null>(null)

  useEffect(() => {
    setGroupKey(randomId())
  }, [selectedCollectionId])

  useLogger("CollectionView", [collections, selectedCollectionId, itemIdsArray])

  function handleDelete() {
    if (!selectedCollectionId) return
    collectionAction.deleteCollection(selectedCollectionId)
    setSelectedCollectionId(null)
  }

  return (
    <>
      <Select
        data={collections.map((collection) => {
          return { value: collection.id, label: collection.name }
        })}
        defaultValue={collectionAction.getCollectionIdByName("Starter Pack")}
        value={selectedCollectionId}
        onChange={setSelectedCollectionId}
        mb="xs"
        radius="lg"
      />

      {selectedCollection && (
        <>
          <Text m="xs">
            <Interweave
              transform={transform}
              content={selectedCollection.description}
            />
          </Text>
          {itemIdsArray.length === 0 && (
            <Text m="xs">
              Oops! No items in this collection. Add items through{" "}
              <Link to="/search">Search</Link> or you can{" "}
              <Button onClick={handleDelete}>Delete</Button> this collection
            </Text>
          )}
          <SimpleGrid
            cols={{ base: 1, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
            spacing={{ base: "lg" }}
            verticalSpacing={{ base: "lg" }}
            mt={"md"}
          >
            <TransitionGroup component={null} key={groupKey}>
              {itemIdsArray.length > 0 &&
                itemIdsArray?.map((taxon_id) => {
                  // const itemKey = `${taxon_id}-${selectedCollectionId}-${Date.now()}`
                  return (
                    <CSSTransition
                      key={taxon_id}
                      classNames="card"
                      timeout={500}
                      // unmountOnExit
                    >
                      <WildCard taxonId={taxon_id} />
                    </CSSTransition>
                  )
                })}
            </TransitionGroup>
          </SimpleGrid>
        </>
      )}
    </>
  )
}