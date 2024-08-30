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

import { useFetch } from "../../hooks/useFetch.ts";
import { EnrichedCardType } from "../../models/EnrichedCardType.ts";
import { SpeciesCardType } from "../../models/SpeciesCardType.ts";
import { JSON_SERVER_URL } from "../../utils/constants.ts";
import styles from "./SpeciesCard.module.css";
import { SpeciesCardSkeleton } from "./SpeciesCardSkeleton.tsx";

export default function WilderKindCard(props: { cardId?: string }) {
  let cardId;
  const params = useParams();
  params.cardId ? (cardId = params.cardId) : (cardId = props.cardId);
  const { isLoading, error, data } = useFetch<
    SpeciesCardType & EnrichedCardType
  >(`${JSON_SERVER_URL}/cards/${cardId}`);
  console.log(`rendering WilderKindCard`);
  console.log(`WilderKindCard data: ${data}`);

  error && `Error: ${error.message}`;

  return isLoading ? (
    <SpeciesCardSkeleton />
  ) : (
    <>
      <Card
        className={styles["card-front"]}
        key={data?.id}
        shadow="md"
        // p='xl'
        radius="lg"
        withBorder
      >
        <Grid justify="space-between" align="center">
          {data?.nickname && (
            <GridCol span={9}>
              <Title order={4} size="h2">
                {data?.nickname}
              </Title>
            </GridCol>
          )}
          <GridCol span={3}>
            {/*<button onClick={data.flipFn}>flip</button>*/}
          </GridCol>
        </Grid>

        <Card.Section>
          {data?.imgSrc ? (
            <AspectRatio ratio={1 / 1}>
              <Image
                // radius='lg'
                className={styles.drop_shadow}
                src={data.imgSrc}
                alt={data?.name}
                loading="lazy"
              />
            </AspectRatio>
          ) : (
            <Skeleton animate={false} height={500} width={500}></Skeleton>
          )}
        </Card.Section>

        <Title lineClamp={1} order={2} size="h3">
          {data?.preferred_common_name}
        </Title>
        <Title lineClamp={1} order={3} size="h4">
          {data?.name}
        </Title>
        <SimpleGrid>
          {data?.current_stage === "egg" && <IconEgg />}
          {data?.current_stage === "larva" && <IconBabyCarriage />}
          {data?.current_stage === "adult" && <IconButterfly />}
        </SimpleGrid>
      </Card>
    </>
  );
}
