import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import {
  Card,
  Loader,
  Grid,
  GridCol,
  AspectRatio,
  Image,
  Skeleton,
  Text,
  Title,
  SimpleGrid,
} from "@mantine/core";
import { IconBabyCarriage, IconButterfly, IconEgg } from "@tabler/icons-react";
import { useWilderKindData } from "hooks/useWilderKindData.ts";
import { Interweave } from "interweave";

import type { iNatTaxaResponseType } from "../../models/iNatTaxaResponseType.ts";

import { WilderKindCardType } from "../../models/WilderKindCardType.ts";
import styles from "./WilderKindCard.module.css";
import { WilderKindCardSkeleton } from "./WilderKindCardSkeleton.tsx";

type RemoteDataType = iNatTaxaResponseType["results"][number];

interface CardSideProps {
  localData: WilderKindCardType | null | undefined;
  remoteData: RemoteDataType | null | undefined;
  isLoadingLocal: boolean;
  isLoadingRemote: boolean;
  flipFn: () => void;
}

export default function WilderKindCard(props: { cardId?: string }) {
  const params = useParams();
  const cardId = params.cardId || props.cardId;

  const { localData, remoteData, isLoading, error } = useWilderKindData(cardId);

  const [showFlipSide, setShowFlipSide] = useState(false);
  const flipCard = useCallback(() => setShowFlipSide((prev) => !prev), []);

  if (isLoading.local) return <WilderKindCardSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {!showFlipSide ? (
        <CardSideA
          isLoadingLocal={isLoading.local}
          isLoadingRemote={isLoading.remote}
          localData={localData}
          remoteData={remoteData}
          flipFn={flipCard}
        />
      ) : (
        <CardSideB
          isLoadingLocal={isLoading.local}
          isLoadingRemote={isLoading.remote}
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
    <Card
      className={styles["card-front"]}
      key={localData?.id}
      shadow="md"
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
              className={styles.drop_shadow}
              src={localData.imgSrc}
              alt={remoteData ? remoteData?.name : "null"}
              loading="lazy"
            />
          </AspectRatio>
        ) : (
          <Skeleton animate={false} height={500} width={500}></Skeleton>
        )}
      </Card.Section>

      <Title lineClamp={1} order={2} size="h3">
        {isLoadingRemote ? (
          <Loader type="dots" />
        ) : (
          remoteData?.preferred_common_name
        )}
      </Title>
      <Title lineClamp={1} order={3} size="h4">
        {isLoadingRemote ? <Loader type="dots" /> : remoteData?.name}
      </Title>
      <SimpleGrid>
        {localData?.current_stage === "egg" && <IconEgg />}
        {localData?.current_stage === "larva" && <IconBabyCarriage />}
        {localData?.current_stage === "adult" && <IconButterfly />}
      </SimpleGrid>
    </Card>
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
        {isLoadingRemote ? (
          <Loader type="dots" />
        ) : (
          remoteData?.preferred_common_name
        )}
      </Title>
      <Title lineClamp={1} order={3} size="h4">
        {isLoadingRemote ? <Loader type="dots" /> : remoteData?.name}
      </Title>

      <Text>
        <Interweave
          content={
            isLoadingRemote ? "Loading..." : remoteData?.wikipedia_summary
          }
        />
      </Text>
    </Card>
  );
}
