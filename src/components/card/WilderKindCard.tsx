import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  AspectRatio,
  Card,
  Grid,
  GridCol,
  Image,
  SimpleGrid,
  Skeleton,
  Title,
} from "@mantine/core";
import { IconBabyCarriage, IconButterfly, IconEgg } from "@tabler/icons-react";

// import { EnrichedCardType } from "../../models/EnrichedCardType.ts";
import { INAT_API_URL, JSON_SERVER_URL } from "../../utils/constants.ts";
import styles from "./SpeciesCard.module.css";
import { SpeciesCardSkeleton } from "./SpeciesCardSkeleton.tsx";

export default function WilderKindCard(props: { cardId?: string }) {
  let cardId;
  const params = useParams();
  params.cardId ? (cardId = params.cardId) : (cardId = props.cardId);

  const [localData, setLocalData] = useState();
  const [remoteData, setRemoteData] = useState();
  const [isLoadingLocal, setIsLoadingLocal] = useState(true);
  const [isLoadingRemote, setIsLoadingRemote] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        const response = await fetch(`${JSON_SERVER_URL}/cards?id=${cardId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const localCardData = await response.json();
        if (localCardData) {
          setLocalData(localCardData[0]);
        }
        console.log(localData);
      } catch (err: Error) {
        setError(err.message);
      } finally {
        setIsLoadingLocal(false);
      }
    };
    fetchLocalData();
  }, [cardId, localData]);

  useEffect(() => {
    const fetchRemoteData = async () => {
      if (localData?.taxon_id) {
        try {
          const remoteResponse = await fetch(
            `${INAT_API_URL}/taxa/${localData.taxon_id}`,
          );
          if (!remoteResponse.ok) {
            throw new Error("Network response was not ok");
          }
          const remoteCardData = await remoteResponse.json();
          setRemoteData(remoteCardData.results[0]);
        } catch (err: Error) {
          setError(err.message);
        } finally {
          setIsLoadingRemote(false);
        }
      }
    };

    fetchRemoteData();
  }, [localData]); // Fetch remote data whenever localData changes

  console.log(localData);

  error && `Error: ${error.message}`;

  // return <h1>test</h1>;

  return isLoadingLocal ? (
    <SpeciesCardSkeleton />
  ) : (
    <>
      <Card
        className={styles["card-front"]}
        key={localData?.id}
        shadow="md"
        // p='xl'
        radius="lg"
        withBorder
      >
        <Grid justify="space-between" align="center">
          {localData?.nickname && (
            <GridCol span={9}>
              <Title order={4} size="h2">
                {localData?.nickname}
              </Title>
            </GridCol>
          )}
          <GridCol span={3}>
            {/*<button onClick={data.flipFn}>flip</button>*/}
          </GridCol>
        </Grid>

        <Card.Section>
          {localData?.imgSrc ? (
            <AspectRatio ratio={1}>
              <Image
                // radius='lg'
                className={styles.drop_shadow}
                src={localData.imgSrc}
                alt={remoteData?.name}
                loading="lazy"
              />
            </AspectRatio>
          ) : (
            <Skeleton animate={false} height={500} width={500}></Skeleton>
          )}
        </Card.Section>

        <Title lineClamp={1} order={2} size="h3">
          {isLoadingRemote ? "Loading..." : remoteData?.preferred_common_name}
        </Title>
        <Title lineClamp={1} order={3} size="h4">
          {isLoadingRemote ? "Loading..." : remoteData?.name}
        </Title>
        <SimpleGrid>
          {localData?.current_stage === "egg" && <IconEgg />}
          {localData?.current_stage === "larva" && <IconBabyCarriage />}
          {localData?.current_stage === "adult" && <IconButterfly />}
        </SimpleGrid>
      </Card>
    </>
  );
}
