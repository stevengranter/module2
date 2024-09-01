import {
  AspectRatio,
  Card,
  Grid,
  GridCol,
  Image,
  Loader,
  SimpleGrid,
  Skeleton,
  Title,
} from "@mantine/core";
import { IconBabyCarriage, IconButterfly, IconEgg } from "@tabler/icons-react";

import styles from "./WilderKindCard.module.css";
import { CardSideProps } from "./WilderKindCard.tsx";

export function CardSideA({
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
