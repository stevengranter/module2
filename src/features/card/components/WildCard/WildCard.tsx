import React, { PropsWithChildren, useEffect, useState } from "react"
import ReactCardFlip from "react-card-flip"

import {
  ActionIcon,
  Anchor,
  AspectRatio,
  BackgroundImage,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Indicator,
  Overlay,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core"
import {
  IconArrowForwardUp,
  IconBrandWikipedia,
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
  const theme = useMantineTheme()
  if (!iNatdata) return null
  // console.log(iNatdata)

  return (
    <Card
      key={iNatdata.id}
      withBorder
      radius={"lg"}
      shadow="md"
      className={styles.wildcard}
      pb="md"
      {...restProps}
    >
      <Card.Section>
        {iNatdata.default_photo && (
          <AspectRatio ratio={1}>
            <BackgroundImage src={iNatdata.default_photo?.medium_url}>
              <Group justify="flex-end">
                <ActionIcon
                  radius="xl"
                  size="lg"
                  onClick={onFlip}
                  m="xs"
                  aria-label="Flip card"
                >
                  <IconArrowForwardUp />
                </ActionIcon>
              </Group>
            </BackgroundImage>
          </AspectRatio>
        )}
      </Card.Section>
      <WildCardFooter iNatdata={iNatdata} />
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
  const theme = useMantineTheme()
  if (!iNatdata) return null

  return (
    <Card
      key={iNatdata.id}
      withBorder
      radius={"lg"}
      className={styles.wildcard}
      {...restProps}
    >
      <Card.Section>
        {iNatdata.default_photo && (
          <AspectRatio ratio={1}>
            <BackgroundImage src={iNatdata.default_photo?.medium_url}>
              <AspectRatio ratio={1}>
                <Overlay p="md" color="#000" backgroundOpacity={0.4} blur={12}>
                  <Card.Section>
                    <Group justify="flex-end">
                      <ActionIcon
                        radius="xl"
                        size="lg"
                        onClick={onFlip}
                        m="xs"
                        aria-label="Flip card"
                      >
                        <IconArrowForwardUp />
                      </ActionIcon>
                    </Group>
                  </Card.Section>
                  {iNatdata.wikipedia_summary && (
                    <Text
                      size="sm"
                      lineClamp={8}
                      color="white"
                      style={{ textShadow: "0px 0px 3px #000" }}
                    >
                      <Interweave content={iNatdata.wikipedia_summary} />
                    </Text>
                  )}

                  {iNatdata.wikipedia_url && (
                    <Text
                      size="xs"
                      fs="italic"
                      lineClamp={12}
                      mt="xs"
                      color="white"
                    >
                      Source:{" "}
                      <Anchor href={iNatdata.wikipedia_url}>
                        {iNatdata.name} / Wikipedia{" "}
                      </Anchor>
                    </Text>
                  )}
                </Overlay>
              </AspectRatio>
            </BackgroundImage>
          </AspectRatio>
        )}
      </Card.Section>
      <WildCardFooter iNatdata={iNatdata} />
    </Card>
  )
}

function WildCardFooter({ iNatdata }: { iNatdata: iNatTaxonRecord }) {
  return (
    <>
      <Card.Section className={styles.header} inheritPadding>
        <Flex justify="space-between" my="md" wrap="nowrap">
          <div>
            <Title
              order={3}
              size="h4"
              lineClamp={1}
              pb={0}
              mb={0}
              style={{ textTransform: "capitalize" }}
            >
              {iNatdata?.preferred_common_name || iNatdata?.english_common_name}
            </Title>
            <Text size="xs" lineClamp={1} mt={0} pt={0}>
              {iNatdata.name}
            </Text>
          </div>
        </Flex>
      </Card.Section>

      <Group justify="space-between">
        {iNatdata.id && (
          <Flex justify="center" align="flex-start" gap="xs" wrap="nowrap">
            <CollectionToggleButtons iNatdata={iNatdata} />
          </Flex>
        )}
        {iNatdata.id && iNatdata.name && (
          <FoundItButton
            size="lg"
            data={{
              taxonId: iNatdata.id,
              taxonName: iNatdata.name,
              taxonCommonName: iNatdata.preferred_common_name,
            }}
          />
        )}
      </Group>
    </>
  )
}

function CollectionToggleButtons({ iNatdata }: { iNatdata: iNatTaxonRecord }) {
  const theme = useMantineTheme()
  return (
    <>
      <ToggleCollectionButton
        id={iNatdata.id || ""}
        taxonName={iNatdata.name}
        taxonCommonName={iNatdata.preferred_common_name}
        collection="Wishlist"
        TrueIconComponent={
          <IconStarFilled
            color="yellow"
            style={{ stroke: "orange", strokeWidth: "2" }}
          />
        }
        FalseIconComponent={<IconStar />}
        variant="transparent"
      />
      <ToggleCollectionButton
        id={iNatdata.id || ""}
        taxonName={iNatdata.name}
        taxonCommonName={iNatdata.preferred_common_name}
        collection="Favorites"
        TrueIconComponent={
          <IconHeartFilled
            color="red"
            style={{
              stroke: theme.colors.red[9],
              strokeWidth: "2",
            }}
          />
        }
        FalseIconComponent={<IconHeart />}
        variant="transparent"
      />
    </>
  )
}
