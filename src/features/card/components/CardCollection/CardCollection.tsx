import React from "react"
import { Link } from "react-router-dom"

import { Grid, GridCol, Text } from "@mantine/core"
import DeleteCollectionButton from "~/features/_shared/contexts/nest/components/DeleteCollectionButton.tsx"
import { WildCard } from "~/features/card/components/WildCard/WildCard.tsx"

export default function CardCollection({
  itemIdArray,
  collectionId,
  description,
}: {
  itemIdArray: string[] | null
  collectionId: string | null
  description: string | null
}) {
  if (!itemIdArray) return "Collection doesn't exist"
  if (itemIdArray.length === 0)
    return (
      <Text>
        Nothing here yet, use <Link to="/search">search</Link> to add to this
        collection, or{" "}
        {collectionId && <DeleteCollectionButton collectionId={collectionId} />}
      </Text>
    )

  return (
    itemIdArray.length > 0 && (
      <>
        {description && <Text>{description}</Text>}
        <Grid gutter={{ xs: 16, sm: 20, lg: 24 }}>
          {itemIdArray.length > 0 &&
            itemIdArray?.map((taxon_id) => {
              return (
                <GridCol
                  span={{ base: 12, xs: 6, sm: 4, lg: 3, xl: 2 }}
                  key={taxon_id}
                >
                  {/*{taxon_id}*/}
                  <WildCard
                    taxonId={taxon_id}

                    // isInUserCollection={!!userCollection?.includes(cardId)}
                  />
                </GridCol>
              )
            })}
        </Grid>
      </>
    )
  )
}
