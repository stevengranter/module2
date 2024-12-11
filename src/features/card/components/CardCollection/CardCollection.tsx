import React, { createRef, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group"

import { Grid, GridCol, SimpleGrid, Text } from "@mantine/core"
import { randomId } from "@mantine/hooks"
import { useLogger } from "~/dev.ts"
import DeleteCollectionButton from "~/features/_shared/contexts/nest/components/DeleteCollectionButton.tsx"
import { WildCard } from "~/features/card/components/WildCard/WildCard.tsx"

// import "./CardCollection.css"

export default function CardCollection({
  itemIdArray,
  collectionId,
  description,
}: {
  itemIdArray: string[]
  collectionId?: string | null
  description?: string | null
}) {
  useLogger("CardCollection", [{ collectionId }, { itemIdArray }])
  if (!itemIdArray) return "Collection doesn't exist"
  if (itemIdArray.length === 0) return

  const itemIdArrayWithRefs = itemIdArray.map((item) => {})
  const groupKey = itemIdArray.join()
  console.log({ groupKey })

  return (
    itemIdArray.length > 0 && (
      <>
        {description && description.length > 0 && <Text>{description}</Text>}

        {/*<Grid gutter={{ xs: 16, sm: 20, lg: 24 }} my={"md"}>*/}
        <SimpleGrid
          cols={{ base: 1, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
          spacing={{ base: "lg" }}
          verticalSpacing={{ base: "lg" }}
        >
          <TransitionGroup component={null} key={collectionId}>
            {itemIdArray.length > 0 &&
              itemIdArray?.map((taxon_id) => {
                return (
                  <CSSTransition
                    key={taxon_id}
                    classNames="card"
                    timeout={500}
                    unmountOnExit
                  >
                    <WildCard taxonId={taxon_id} />
                  </CSSTransition>
                )
              })}
          </TransitionGroup>
        </SimpleGrid>
        {/*</Grid>*/}
      </>
    )
  )
}
