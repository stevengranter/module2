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
  Text,
  Title,
} from "@mantine/core";
import { IconBabyCarriage, IconButterfly, IconEgg } from "@tabler/icons-react";
import { Interweave } from "interweave";

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
  const [showFlipSide, setShowFlipSide] = useState(false);

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
  }, [cardId]);

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

  function flipCard() {
    console.log("flipping card");
    setShowFlipSide((prevState) => !prevState);
  }

  error && `Error: ${error.message}`;

  // return <h1>test</h1>;

  return isLoadingLocal ? (
    <SpeciesCardSkeleton />
  ) : (
    <>
      {!showFlipSide ? (
        <CardSideA
          isLoadingLocal={isLoadingLocal}
          isLoadingRemote={isLoadingRemote}
          localData={localData}
          remoteData={remoteData}
          flipFn={flipCard}
        />
      ) : (
        <CardSideB
          isLoadingLocal={isLoadingLocal}
          isLoadingRemote={isLoadingRemote}
          localData={localData}
          remoteData={remoteData}
          flipFn={flipCard}
        />
      )}
    </>
  );
}

function CardSideA({ localData, remoteData, isLoadingRemote, flipFn }) {
  return (
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
            <button onClick={flipFn}>flip</button>
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

function CardSideB({ localData, remoteData, isLoadingRemote, flipFn }) {
  return (
    <Card
      className={styles["card-back"]}
      key={localData.id}
      shadow="md"
      // p='xl'
      radius="lg"
      withBorder
    >
      <Grid justify="space-between" align="center">
        {localData.nickname && (
          <GridCol span={9}>
            <Title order={4} size="h2">
              {localData.nickname}
            </Title>
          </GridCol>
        )}
        <GridCol span={3}>
          <button onClick={flipFn}>flip</button>
        </GridCol>
      </Grid>
      <Card.Section>
        {remoteData?.default_photo ? (
          <AspectRatio ratio={1}>
            <Image
              src={remoteData.default_photo?.medium_url}
              // radius='lg'
              className={styles.drop_shadow}
              alt={remoteData.name}
              loading="lazy"
            />
          </AspectRatio>
        ) : (
          <Skeleton animate={false} height={500} width={500}></Skeleton>
        )}
      </Card.Section>
      <Title lineClamp={1} order={2} size="h3">
        {remoteData?.preferred_common_name}
      </Title>
      <Title lineClamp={1} order={3} size="h4">
        {remoteData?.name}
      </Title>

      <Text>
        <Interweave content={remoteData?.wikipedia_summary} />
      </Text>

      {/* </Spoiler> */}
    </Card>
  );
}
