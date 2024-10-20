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
import styles from "~/components/card/WilderKindCard.module.css";
import AddToCollectionButton from "~/components/ui/buttons/AddToCollectionButton.tsx";
import ToggleFavoriteButton from "~/components/ui/buttons/ToggleFavoriteButton.tsx";

export default function WildCard({ data }: { data: any }) {
  return (
    <Card
      className={styles["card-front"]}
      key={data?.id}
      shadow="md"
      radius="lg"
      withBorder
    >
      <Grid justify="space-between" align="center">
        {data?.nickname && (
          <GridCol span={4}>
            <Title order={4} size="h2">
              {data?.nickname}
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
              src={data?.imgSrc}
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
        {data?.current_stage === "egg" && <IconEgg />}
        {data?.current_stage === "larva" && <IconBabyCarriage />}
        {data?.current_stage === "adult" && <IconButterfly />}
      </SimpleGrid>
      {data.id ? (
        <Group justify="space-between">
          <AddToCollectionButton cardId={data?.id} />
          {/*<AddRemoveCardButton cardId={data?.id} />*/}
          <ToggleFavoriteButton cardId={localData?.id} />
        </Group>
      ) : null}
    </Card>
  );
}
