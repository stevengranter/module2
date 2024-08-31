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

import { iNatTaxaResponseType } from "../../models/iNatTaxaResponseType.ts";
import { WilderKindCardType } from "../../models/WilderKindCardType.ts";
import { INAT_API_URL, JSON_SERVER_URL } from "../../utils/constants.ts";
import styles from "./WilderKindCard.module.css";
import { WilderKindCardSkeleton } from "./WilderKindCardSkeleton.tsx";

type LocalDataType = WilderKindCardType[];
type RemoteDataType = iNatTaxaResponseType["results"][0];
interface CardSideProps {
  localData: WilderKindCardType | null | undefined; // assuming localData can be null if it's still loading
  remoteData: RemoteDataType | null | undefined; // Change to the actual type or interface for your remote data
  isLoadingRemote: boolean;
  isLoadingLocal: boolean;
  flipFn: () => void; // Function to flip the card
}

export default function WilderKindCard(props: { cardId?: string }) {
  let cardId;
  const params = useParams();
  params.cardId ? (cardId = params.cardId) : (cardId = props.cardId);

  const [localData, setLocalData] = useState<WilderKindCardType | null>(null);
  const [remoteData, setRemoteData] = useState<RemoteDataType | null>(null);
  const [isLoadingLocal, setIsLoadingLocal] = useState(true);
  const [isLoadingRemote, setIsLoadingRemote] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFlipSide, setShowFlipSide] = useState(false);

  useEffect(() => {
    const fetchLocalData = async (): Promise<void> => {
      try {
        const response = await fetch(`${JSON_SERVER_URL}/cards?id=${cardId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const localCardData: LocalDataType = await response.json();
        if (localCardData.length > 0) {
          setLocalData(localCardData[0]);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoadingLocal(false);
      }
    };
    fetchLocalData();
  }, [cardId]);

  useEffect(() => {
    const fetchRemoteData = async (): Promise<void> => {
      if (localData?.taxon_id) {
        try {
          const remoteResponse = await fetch(
            `${INAT_API_URL}/taxa/${localData.taxon_id}`,
          );
          if (!remoteResponse.ok) {
            throw new Error("Network response was not ok");
          }
          const remoteCardData: RemoteDataType = await remoteResponse.json();
          setRemoteData(remoteCardData);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
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

  error && `Error: ${error}`;

  // return <h1>test</h1>;

  return isLoadingLocal ? (
    <WilderKindCardSkeleton />
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

function CardSideA({
  localData,
  remoteData,
  isLoadingRemote,
  flipFn,
}: CardSideProps) {
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

function CardSideB({
  localData,
  remoteData,
  isLoadingRemote,
  flipFn,
}: CardSideProps) {
  return (
    <Card
      className={styles["card-back"]}
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
        {!isLoadingRemote && remoteData?.default_photo ? (
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
        {!isLoadingRemote && remoteData?.preferred_common_name}
      </Title>
      <Title lineClamp={1} order={3} size="h4">
        {!isLoadingRemote && remoteData?.name}
      </Title>

      <Text>
        <Interweave content={remoteData?.wikipedia_summary} />
      </Text>

      {/* </Spoiler> */}
    </Card>
  );
}
