import React, { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";

import {
  AspectRatio,
  Button,
  Card,
  Group,
  Image,
  Skeleton,
  Text,
} from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "~/components/card/WilderKindCard.module.css";
import FoundItButton from "~/components/ui/buttons/FoundItButton.tsx";
import ToggleFavoriteButton from "~/components/ui/buttons/ToggleFavoriteButton.tsx";
import { INAT_API_URL } from "~/lib/constants.ts";
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

  if (query.isLoading) return "Loading...";

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

function WildCard_Front({ data }: { data: iNatTaxonRecord | null }) {
  // if (loading) return "Loading...";

  // useEffect(() => {
  //   console.log(data);
  // }, []);
  return (
    data && (
      <Card key={data.id} withBorder>
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
          {/*<AddToCollectionButton id={data.id} fullWidth />*/}
        </Card.Section>
      </Card>
    )
  );
}

function WildCard_Back({ data }: { data: iNatTaxonRecord | null }) {
  return (
    data && (
      <Card withBorder>
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
                height={100}
              />
            )}
          </AspectRatio>
        </Card.Section>
        <Text size="md">
          <Interweave content={data.wikipedia_summary} />
        </Text>
      </Card>
    )
  );
}
