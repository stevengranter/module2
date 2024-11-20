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
import { useLogger } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import getLocalCardData, {
  useServerData,
} from "~/features/_shared/hooks/getLocalCardData.ts";
import { API_SERVER, JSON_SERVER_URL } from "~/features/api/constants.ts";
import FoundItButton from "~/features/card/components/FoundItButton.tsx";
import ToggleFavoriteButton from "~/features/card/components/ToggleFavoriteButton.tsx";
import {
  iNatTaxaResponseType,
  iNatTaxonRecord,
} from "~/models/iNatTaxaResponseType.ts";
import { WilderKindCardType } from "~/models/WilderKindCardType.ts";

type Props = {
  taxonId?: number;
  dataObject?: iNatTaxonRecord | undefined;
};

const endpoint = "/cards";
const queryString = "?taxon_id=";
const fetchURL = JSON_SERVER_URL + endpoint + queryString;

export function WildCard({ taxonId, dataObject }: Props) {
  // const [currentTaxonId, setCurrentTaxonId] = useState(taxonId);
  const [cardId, setCardId] = useState<number | undefined>(taxonId);
  const [iNatData, setINatData] = useState(dataObject);
  const [isFlipped, setIsFlipped] = useState(false);
  const [wilderNestData, setWilderNestData] =
    useState<WilderKindCardType | null>(null);
  useLogger("WildCard", [{ cardId }, { wilderNestData }]);

  const shouldFetchServerData = !!cardId;
  useServerData(
    shouldFetchServerData,
    `${JSON_SERVER_URL}/cards?taxon_id=${taxonId}`,
  );

  const iNatQuery = useQuery({
    queryKey: [API_SERVER.INAT, `/taxa`, `/${cardId}`],
    enabled: !!cardId,
  });

  // on initial render:
  //
  useEffect(() => {
    if (!cardId) console.log("Card id not found");
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${JSON_SERVER_URL}/cards?taxon_id=${cardId}`,
        );
        const json = await response.json();
        console.log(json);
        return json;
      } catch (error) {
        return console.error("Error fetching card ID:", error);
      }
    };
    fetchData().then((data) => {
      console.log(data);
      setWilderNestData(data[0]);
    });
  }, [cardId]);

  useEffect(() => {
    if (iNatQuery.data) {
      const { results } = iNatQuery.data as iNatTaxaResponseType;
      setINatData(results[0]);
    }
  }, [iNatQuery.data]);

  function handleFlip(e: React.MouseEvent) {
    e.preventDefault();
    if (iNatData && iNatData.id) setCardId(iNatData.id);
    setIsFlipped((prevState) => !prevState);
  }

  if (iNatQuery.isLoading)
    return (
      <Card mah={400} mih={400}>
        <Skeleton width={400} height={400} />
      </Card>
    );

  if (!iNatData) return null;

  return (
    <>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <WildCard_Front
          iNatdata={iNatData}
          wilderNestData={wilderNestData}
          onFlip={(e: React.MouseEvent) => handleFlip(e)}
        />
        <WildCard_Back
          data={iNatData}
          wilderNestData={wilderNestData}
          onFlip={(e: React.MouseEvent) => handleFlip(e)}
        />
      </ReactCardFlip>
    </>
  );
}

function WildCard_Front({
  iNatdata,
  onFlip,
  wilderNestData,
}: {
  iNatdata: iNatTaxonRecord | null;
  onFlip?: (e: React.MouseEvent) => void;
  wilderNestData?: WilderKindCardType;
}) {
  if (!iNatdata) return null;
  console.log(iNatdata);
  return (
    <Card key={iNatdata.id} withBorder>
      <Card.Section>
        <Group justify="space-between">
          <Text fz="lg">{iNatdata.preferred_common_name}</Text>
          {iNatdata.id && <ToggleFavoriteButton id={iNatdata.id?.toString()} />}
        </Group>
      </Card.Section>

      <Card.Section>
        <AspectRatio ratio={1}>
          {!wilderNestData && iNatdata.default_photo && (
            <Image
              src={iNatdata.default_photo?.medium_url}
              alt={iNatdata.name}
              loading="lazy"
            />
          )}
          {wilderNestData && (
            <>
              <Image src={wilderNestData.imgSrc} />
            </>
          )}
        </AspectRatio>
      </Card.Section>

      <Group justify="space-between">
        {iNatdata.id && <FoundItButton size="lg" id={iNatdata.id} />}
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
