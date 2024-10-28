import React, { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";

import { AspectRatio, Button, Card, Group, Image, Text } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import styles from "~/components/card/WilderKindCard.module.css";
import FoundItButton from "~/components/ui/buttons/FoundItButton.tsx";
import ToggleFavoriteButton from "~/components/ui/buttons/ToggleFavoriteButton.tsx";
import { INAT_API_URL } from "~/lib/constants.ts";
import {
  iNatTaxaResponseType,
  iNatTaxonRecord,
} from "~/models/iNatTaxaResponseType.ts";
import { Interweave } from "interweave";

export function WildCard({
  id,
  dataObject,
}: {
  id?: string | number | undefined;
  dataObject?: iNatTaxonRecord | undefined;
}) {
  const [taxonData, setTaxonData] = useState(dataObject || null);
  const { data, loading, error, refetch } = useFetch<iNatTaxaResponseType>(
    id ? `${INAT_API_URL}/taxa/${id}` : "",
  );
  const [isFlipped, setIsFlipped] = useState(false);

  // If dataObject was passed, use that data
  useEffect(() => {
    if (data) {
      setTaxonData(data.results[0]);
    } else if (dataObject) {
      setTaxonData(dataObject);
    }
    console.log(dataObject);
  }, [data, dataObject]);

  function handleFlip(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setIsFlipped((prevState) => !prevState);
  }

  if (loading) return null;

  return (
    (data || dataObject) && (
      <>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          <WildCard_Front data={taxonData} />
          <WildCard_Back data={taxonData} />
        </ReactCardFlip>
        <Button onClick={(e) => handleFlip(e)}>Flip</Button>
      </>
    )
  );
}

function WildCard_Front({ data }: { data: iNatTaxonRecord | null }) {
  // if (loading) return "Loading...";

  // useEffect(() => {
  //   console.log(data);
  // }, []);
  return (
    data && (
      <Card key={data.id} withBorder>
        <Card.Section>
          <Group justify="space-between">
            <Text fz="lg">{data.preferred_common_name}</Text>
            <ToggleFavoriteButton id={data.id} />
          </Group>
        </Card.Section>

        <Card.Section>
          <AspectRatio ratio={1}>
            {data.default_photo && (
              <Image
                src={data.default_photo?.medium_url}
                className={styles.drop_shadow}
                alt={data.name}
                loading="lazy"
              />
            )}
          </AspectRatio>
        </Card.Section>

        <Card.Section mt="md">
          <a href={data.wikipedia_url}>Wikipedia Link</a>
        </Card.Section>

        <Card.Section mt="md">
          <FoundItButton id={data.id} />
          {/*<AddToCollectionButton id={data.id} fullWidth />*/}
        </Card.Section>
      </Card>
    )
  );
}

function WildCard_Back({ data }: { data: iNatTaxonRecord | null }) {
  return (
    data && (
      <Card>
        <Text size="sm">
          <Interweave content={data.wikipedia_summary} />
        </Text>
      </Card>
    )
  );
}

// export function WildCard_SideA({
//   localData,
//   iNatData,
//   isLoadingRemote,
//   flipFn,
//   // isInUserCollection,
// }: CardSideProps) {
//   return (
//     iNatData && (
//       <Card
//         className={styles["card-front"]}
//         key={localData?.id}
//         shadow="md"
//         radius="lg"
//         withBorder
//       >
//         <Grid justify="space-between" align="center">
//           {localData?.nickname && (
//             <GridCol span={4}>
//               <Title order={4} size="h2">
//                 {localData?.nickname}
//               </Title>
//             </GridCol>
//           )}
//           <ToggleFavoriteButton />
//         </Grid>
//
//         <Card.Section>
//           <Skeleton visible={isLoadingRemote}>
//             <AspectRatio ratio={1}>
//               <Image
//                 className={styles.drop_shadow}
//                 src={localData?.imgSrc}
//                 alt={iNatData ? iNatData?.name : "null"}
//                 loading="lazy"
//               />
//             </AspectRatio>
//           </Skeleton>
//         </Card.Section>
//
//         <Title lineClamp={1} order={2} size="h3">
//           {isLoadingRemote ? (
//             <Loader type="dots" />
//           ) : (
//             iNatData?.preferred_common_name
//           )}
//         </Title>
//         <Title lineClamp={1} order={3} size="h4">
//           {isLoadingRemote ? <Loader type="dots" /> : iNatData?.name}
//         </Title>
//
//         <SimpleGrid>
//           {localData?.current_stage === "egg" && <IconEgg />}
//           {localData?.current_stage === "larva" && <IconBabyCarriage />}
//           {localData?.current_stage === "adult" && <IconButterfly />}
//         </SimpleGrid>
//         {localData.id ? (
//           <Group justify="space-between">
//             <AddToCollectionButton cardId={localData?.id} fullWidth />
//             {/*<AddRemoveCardButton cardId={localData?.id} />*/}
//           </Group>
//         ) : null}
//       </Card>
//     )
//   );
// }
