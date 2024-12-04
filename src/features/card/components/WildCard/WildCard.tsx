import React, { PropsWithChildren, useEffect, useState } from "react"
import ReactCardFlip from "react-card-flip"

import {
  AspectRatio,
  Button,
  Card,
  Group,
  Image,
  Indicator,
  Paper,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core"
import {
  IconHeart,
  IconHeartFilled,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"
import { useLogger } from "~/dev.ts"
import { API_SERVER } from "~/features/api/constants.ts"
import FoundItButton from "~/features/card/components/FoundItButton.tsx"
import ToggleCollectionButton from "~/features/card/components/ToggleCollectionButton.tsx"
import {
  iNatTaxaResponseType,
  iNatTaxonRecord,
} from "~/models/iNatTaxaResponseType.ts"
import { WilderKindCardType } from "~/models/WilderKindCardType.ts"
import { Interweave } from "interweave"

import styles from "./WildCard.module.css"

type Props = {
  taxonId?: number | string
  dataObject?: iNatTaxonRecord | undefined
}

const cardImagePath = "./assets/images/cards/"

export function WildCard({ taxonId, dataObject }: Props) {
  const [cardId, setCardId] = useState(taxonId)
  const [iNatData, setINatData] = useState(dataObject)
  const [isFlipped, setIsFlipped] = useState(false)
  const [wilderNestData, setWilderNestData] =
    useState<WilderKindCardType | null>(null)

  useLogger("WildCard", [iNatData, wilderNestData])

  const iNatQuery = useQuery({
    queryKey: [API_SERVER.INAT, `/taxa`, `/${cardId}`],
    enabled: !!cardId,
  })

  const wilderNestQuery = useQuery({
    queryKey: [API_SERVER.JSON, `/cards`, `?taxon_id=${taxonId}`],
    enabled: !!cardId,
  })

  useEffect(() => {
    if (iNatQuery.data) {
      const { results } = iNatQuery.data as iNatTaxaResponseType
      setINatData(results[0])
    }
  }, [iNatQuery.data])

  useEffect(() => {
    if (wilderNestQuery.data) {
      const wilderNestData = wilderNestQuery.data as WilderKindCardType[]
      setWilderNestData(wilderNestData[0])
    }
  }, [wilderNestQuery.data])

  function handleFlip(e: React.MouseEvent) {
    e.preventDefault()
    if (iNatData && iNatData.id) setCardId(iNatData.id)
    setIsFlipped((prevState) => !prevState)
  }

  if (iNatQuery.isLoading)
    return (
      <Card mah={400} mih={400}>
        <Skeleton width={400} height={400} />
      </Card>
    )

  if (!iNatData) return null

  return (
    <>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <WildCard_Front
          iNatdata={iNatData}
          wilderNestData={wilderNestData}
          onFlip={(e: React.MouseEvent) => handleFlip(e)}
        />
        <WildCard_Back
          iNatdata={iNatData}
          onFlip={(e: React.MouseEvent) => handleFlip(e)}
        />
      </ReactCardFlip>
    </>
  )
}

function WildCard_Front({
  iNatdata,
  onFlip,
  wilderNestData,
  ...restProps
}: {
  iNatdata: iNatTaxonRecord | null
  onFlip?: (e: React.MouseEvent) => void
  wilderNestData?: WilderKindCardType | null
}) {
  if (!iNatdata) return null
  // console.log(iNatdata)

  return (
    <Card
      key={iNatdata.id}
      withBorder
      radius={"md"}
      className={styles.wildcard}
      mah={400}
      mih={400}
      {...restProps}
    >
      <Card.Section p="md" className={styles.header}>
        <Group justify="space-between" wrap="nowrap">
          <Stack gap="xs">
            <Text fz="h3">
              {iNatdata?.preferred_common_name || iNatdata?.english_common_name}
            </Text>{" "}
            <Text fz="h4">{iNatdata.name}</Text>
          </Stack>
          {iNatdata.id && (
            <Stack>
              <ToggleCollectionButton
                id={iNatdata.id?.toString()}
                collection="Wishlist"
                TrueIconComponent={<IconStarFilled color="gold" />}
                FalseIconComponent={<IconStar color="gold" />}
                variant="transparent"
              />
              <ToggleCollectionButton
                id={iNatdata.id?.toString()}
                collection="Favorites"
                TrueIconComponent={<IconHeartFilled />}
                FalseIconComponent={<IconHeart />}
                variant="transparent"
              />
            </Stack>
          )}
        </Group>
      </Card.Section>

      <AspectRatio ratio={1}>
        {!wilderNestData && iNatdata.default_photo && (
          <Image
            src={iNatdata.default_photo?.medium_url}
            alt={iNatdata.name}
            loading="lazy"
            radius="md"
          />
        )}
        {wilderNestData && (
          <>
            <Image src={cardImagePath + wilderNestData.imgSrc} />
          </>
        )}
      </AspectRatio>
      <Group justify="space-between">
        {iNatdata.id && <FoundItButton size="lg" id={iNatdata.id} />}
        <Button variant="white" color={"black"} onClick={onFlip}>
          Flip
        </Button>
      </Group>
    </Card>
  )
}

function WildCard_Back({
  iNatdata,
  onFlip,
  ...restProps
}: {
  iNatdata: iNatTaxonRecord | null
  onFlip?: (e: React.MouseEvent) => void
  _wilderNestData?: WilderKindCardType | null
}) {
  if (!iNatdata) return null
  return (
    <Card
      key={iNatdata.id}
      withBorder
      radius={"md"}
      className={styles.wildcard}
      mah={400}
      mih={400}
      {...restProps}
    >
      <Card.Section>
        <Group justify="space-between" wrap="nowrap">
          <Text fz="h3">{iNatdata.preferred_common_name}</Text>

          {iNatdata.id && (
            <Stack>
              <ToggleCollectionButton
                id={iNatdata.id?.toString()}
                collection="Wishlist"
                TrueIconComponent={<IconStarFilled color="gold" />}
                FalseIconComponent={<IconStar color="gold" />}
                variant="transparent"
              />

              <ToggleCollectionButton
                id={iNatdata.id?.toString()}
                collection="Favorites"
                TrueIconComponent={<IconHeartFilled color="red" />}
                FalseIconComponent={<IconHeart color="red" />}
                variant="transparent"
              />
            </Stack>
          )}
        </Group>
      </Card.Section>

      <Group>
        {/*{iNatdata.default_photo && (*/}
        {/*  <Image*/}
        {/*    src={iNatdata.default_photo?.square_url}*/}
        {/*    alt={iNatdata.name}*/}
        {/*    loading="lazy"*/}
        {/*  />*/}
        {/*)}*/}

        {iNatdata.wikipedia_summary && (
          <Text lineClamp={4}>
            <Interweave content={iNatdata.wikipedia_summary} />
          </Text>
        )}
        <Card.Section mt="md">
          {iNatdata.wikipedia_url && (
            <a href={iNatdata.wikipedia_url}>Wikipedia Link</a>
          )}
        </Card.Section>

        {/*<Text size="md">*/}
        {/*  <Interweave content={data.wikipedia_summary} />*/}
        {/*</Text>*/}
        <Group>
          {iNatdata.id && <FoundItButton id={iNatdata.id} />}
          <Button onClick={onFlip}>Flip</Button>
        </Group>
      </Group>
    </Card>
  )
}
