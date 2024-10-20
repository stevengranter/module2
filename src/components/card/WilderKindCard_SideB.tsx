import {
  AspectRatio,
  Card,
  Grid,
  GridCol,
  Image,
  Loader,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import { Interweave } from "interweave";

import AddToCollectionButton from "../ui/buttons/AddToCollectionButton.tsx";
import styles from "./WilderKindCard.module.css";
import { CardSideProps } from "./WilderKindCard.tsx";

export function WilderKindCard_SideB({
  localData,
  iNatData,
  isLoadingRemote,
  flipFn,
  // isInUserCollection,
}: CardSideProps) {
  return (
    localData && (
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
          {!isLoadingRemote && iNatData?.default_photo ? (
            <AspectRatio ratio={1}>
              <Image
                src={iNatData.default_photo?.medium_url}
                className={styles.drop_shadow}
                alt={iNatData.name}
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
            iNatData?.preferred_common_name
          )}
        </Title>
        <Title lineClamp={1} order={3} size="h4">
          {isLoadingRemote ? <Loader type="dots" /> : iNatData?.name}
        </Title>

        <Text>
          <Interweave
            content={
              isLoadingRemote ? "Loading..." : iNatData?.wikipedia_summary
            }
          />
        </Text>
        {localData.id ? <AddToCollectionButton cardId={localData?.id} /> : null}
      </Card>
    )
  );
}
