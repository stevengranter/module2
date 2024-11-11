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
import { useQuery } from "@tanstack/react-query";
import { CollectionDropdown } from "~/features/card/components/CardCollection/CollectionDropdown.tsx";
import FoundItButton from "~/features/card/components/FoundItButton.tsx";
import ToggleFavoriteButton from "~/features/card/components/ToggleFavoriteButton.tsx";
import {
  iNatTaxaResponseType,
  iNatTaxonRecord,
} from "~/models/iNatTaxaResponseType.ts";
import { Interweave } from "interweave";

type Props = {
  taxonId?: number;
  dataObject?: iNatTaxonRecord | undefined;
};

export function WildCard({ taxonId, dataObject }: Props) {
  // const [currentTaxonId, setCurrentTaxonId] = useState(taxonId);
  const [cardId, setCardId] = useState<number | undefined>(taxonId);
  const [cardData, setCardData] = useState(dataObject);
  const [isFlipped, setIsFlipped] = useState(false);

  const query = useQuery({
    queryKey: [`/taxa/${cardId}`],
    enabled: !!cardId,
  });

  useEffect(() => {
    if (query.data) {
      const { results } = query.data as iNatTaxaResponseType;
      setCardData(results[0]);
      // console.log(cardData);
    }
  }, [query.data]);

  function handleFlip(e: React.MouseEvent) {
    e.preventDefault();
    if (cardData && cardData.id) setCardId(cardData.id);
    setIsFlipped((prevState) => !prevState);
  }

  if (query.isLoading)
    return (
      <Card mah={400} mih={400}>
        <Skeleton width={400} height={400} />
      </Card>
    );

  if (!cardData) return null;

  return (
    <>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <WildCard_Front
          data={cardData}
          onFlip={(e: React.MouseEvent) => handleFlip(e)}
        />
        <WildCard_Back
          data={cardData}
          onFlip={(e: React.MouseEvent) => handleFlip(e)}
        />
      </ReactCardFlip>
    </>
  );
}

function WildCard_Front({
  data,
  onFlip,
}: {
  data: iNatTaxonRecord | null;
  onFlip?: (e: React.MouseEvent) => void;
}) {
  if (!data) return null;
  console.log(data);
  return (
    <Card key={data.id} withBorder>
      <Card.Section>
        <Group justify="space-between">
          <Text fz="lg">{data.preferred_common_name}</Text>
          {data.id && <ToggleFavoriteButton id={data.id?.toString()} />}
        </Group>
      </Card.Section>

      <Card.Section>
        <AspectRatio ratio={1}>
          {data.default_photo && (
            <Image
              src={data.default_photo?.medium_url}
              alt={data.name}
              loading="lazy"
            />
          )}
        </AspectRatio>
      </Card.Section>

      <Group justify="space-between">
        {data.id && <FoundItButton size="lg" id={data.id} />}
        <Button onClick={onFlip}>Flip</Button>
      </Group>
    </Card>
  );
}

function WildCard_Back({
  data,
  onFlip,
}: {
  data: iNatTaxonRecord | null;
  onFlip?: (e: React.MouseEvent) => void;
}) {
  if (!data) return null;
  return (
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
            alt={data.name}
            loading="lazy"
          />
        )}

        <Card.Section mt="md">
          {data.wikipedia_url && (
            <a href={data.wikipedia_url}>Wikipedia Link</a>
          )}
        </Card.Section>

        {/*<Text size="md">*/}
        {/*  <Interweave content={data.wikipedia_summary} />*/}
        {/*</Text>*/}
        <Group>
          {data.id && <FoundItButton id={data.id} />}
          <Button onClick={onFlip}>Flip</Button>
        </Group>
      </Group>
    </Card>
  );
}
