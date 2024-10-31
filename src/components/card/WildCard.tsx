import React, { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";

import {
  AspectRatio,
  Button,
  Card,
  Group,
  Image,
  px,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "~/components/card/WilderKindCard.module.css";
import FoundItButton from "~/components/ui/buttons/FoundItButton.tsx";
import ToggleFavoriteButton from "~/components/ui/buttons/ToggleFavoriteButton.tsx";
import {
  iNatTaxaResponseType,
  iNatTaxonRecord,
} from "~/models/iNatTaxaResponseType.ts";
import { Interweave } from "interweave";

export function WildCard({
  taxonId,
  dataObject,
}: {
  taxonId?: string | undefined;
  dataObject?: iNatTaxonRecord | undefined;
}) {
  // const [currentTaxonId, setCurrentTaxonId] = useState(taxonId);
  const [cardId, setCardId] = useState<string | undefined>(taxonId);
  const [cardData, setCardData] = useState(dataObject);
  const [isFlipped, setIsFlipped] = useState(false);

  const query = useQuery({
    queryKey: [`/taxa/${cardId}`],
    enabled: !!cardId,
  });

  useEffect(() => {
    if (query.data && query.data.results) {
      setCardData(query.data.results[0]);
      // console.log(cardData);
    }
  }, [query.data]);

  function handleFlip(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (cardData && cardData.id) setCardId(cardData.id.toString());
    setIsFlipped((prevState) => !prevState);
  }

  if (query.isLoading)
    return (
      <Card mah={400} mih={400}>
        <Skeleton width={400} height={400} />
      </Card>
    );

  return (
    cardData && (
      <>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          <WildCard_Front data={cardData} />
          <WildCard_Back data={cardData} />
        </ReactCardFlip>
        <Button onClick={(e) => handleFlip(e)}>Flip</Button>
      </>
    )
  );
}

export function WildCardSkeleton() {
  return (
    <>
      Loading...
      {/*<Card*/}
      {/*  shadow="md"*/}
      {/*  // p='xl'*/}
      {/*  radius="lg"*/}
      {/*  withBorder*/}
      {/*  mah="400"*/}
      {/*  mih="400"*/}
      {/*>*/}
      {/*    */}
      {/*</Card>*/}
    </>
  );
}
function WildCard_Front({ data }: { data: iNatTaxonRecord | null }) {
  return (
    data && (
      <Card key={data.id} withBorder mah="400" mih="400">
        <Card.Section>
          <Group justify="space-between">
            <Text fz="lg">{data.preferred_common_name}</Text>
            <ToggleFavoriteButton id={data.id} />
          </Group>
        </Card.Section>

        <Card.Section>
          <AspectRatio ratio={1}>
            {data.default_photo && (
              <Image
                src={data.default_photo?.medium_url}
                className={styles.drop_shadow}
                alt={data.name}
                loading="lazy"
              />
            )}
          </AspectRatio>
        </Card.Section>

        <Card.Section mt="md">
          <a href={data.wikipedia_url}>Wikipedia Link</a>
        </Card.Section>

        <Card.Section mt="md">
          <FoundItButton id={data.id} />
        </Card.Section>
      </Card>
    )
  );
}

function WildCard_Back({ data }: { data: iNatTaxonRecord | null }) {
  return (
    data && (
      <Card withBorder mah="400" mih="400">
        <Card.Section>
          <Group justify="space-between">
            <Text fz="lg">{data.preferred_common_name}</Text>
            {data.id && <ToggleFavoriteButton id={data.id.toString()} />}
          </Group>
        </Card.Section>

        <Group>
          {data.default_photo && (
            <Image
              src={data.default_photo?.square_url}
              className={styles.drop_shadow}
              alt={data.name}
              loading="lazy"
            />
          )}

          <Text size="md">
            <Interweave content={data.wikipedia_summary} />
          </Text>
        </Group>
      </Card>
    )
  );
}
