import {
  AspectRatio,
  Button,
  Card,
  Grid,
  GridCol,
  Group,
  Image,
  Loader,
  SimpleGrid,
  Skeleton,
  Title,
} from "@mantine/core";
import { IconBabyCarriage, IconButterfly, IconEgg } from "@tabler/icons-react";
import AddRemoveCardButton from "~/components/ui/buttons/AddRemoveCardButton.tsx";

import AddToCollectionButton from "../ui/buttons/AddToCollectionButton.tsx";
import FavoriteToggleButton from "../ui/buttons/FavoriteToggleButton.tsx";
import styles from "./WilderKindCard.module.css";
import { CardSideProps } from "./WilderKindCard.tsx";

export function WilderKindCard_SideA({
  localData,
  remoteData,
  isLoadingRemote,
  flipFn,
  // isInUserCollection,
}: CardSideProps) {
  return (
    localData && (
      <Card
        className={styles["card-front"]}
        key={localData?.id}
        shadow="md"
        radius="lg"
        withBorder
      >
        <Grid justify="space-between" align="center">
          {localData?.nickname && (
            <GridCol span={4}>
              <Title order={4} size="h2">
                {localData?.nickname}
              </Title>
            </GridCol>
          )}
          <GridCol span={4}>
            <Button onClick={flipFn}>flip</Button>
          </GridCol>
        </Grid>

        <Card.Section>
          <Skeleton visible={isLoadingRemote}>
            <AspectRatio ratio={1}>
              <Image
                className={styles.drop_shadow}
                src={localData?.imgSrc}
                alt={remoteData ? remoteData?.name : "null"}
                loading="lazy"
              />
            </AspectRatio>
          </Skeleton>
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
        {localData.id ? (
          <Group justify="space-between">
            <AddRemoveCardButton cardId={localData?.id} />
            <AddToCollectionButton cardId={localData?.id} />
            <FavoriteToggleButton cardId={localData?.id} />
          </Group>
        ) : null}
      </Card>
    )
  );
}
