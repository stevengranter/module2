import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';

import {
  AspectRatio,
  Skeleton,
  GridCol,
  Title,
  Image,
  Card,
  Grid,
} from '@mantine/core';

import { SpeciesCardType } from 'models/SpeciesCardType';

import { iNatTaxaResponseType } from '../../../models/iNatTaxaResponseType';

export function CardIdRoute() {
  const { localData, iNatData } = useLoaderData() as {
    iNatData: iNatTaxaResponseType;
    localData: SpeciesCardType[];
  };

  if (!localData) return null;

  const card = { ...localData[0] };

  return (
    <Card
      // className={styles['card-front']}
      key={card.id}
      shadow='md'
      // p='xl'
      radius='lg'
      withBorder
    >
      <Grid
        justify='space-between'
        align='center'
      >
        {card.nickname && (
          <GridCol span={9}>
            <Title
              order={4}
              size='h2'
            >
              {card.nickname}
            </Title>
          </GridCol>
        )}
        <GridCol span={3}>
          {/* <button onClick={props.flipFn}>flip</button> */}
        </GridCol>
      </Grid>

      <Card.Section>
        {card.imgSrc ? (
          <AspectRatio ratio={1 / 1}>
            <Image
              // radius='lg'
              alt={card.nickname}
              // className={styles.drop_shadow}
              src={card.imgSrc}
              loading='lazy'
            />
          </AspectRatio>
        ) : (
          <Skeleton
            animate={false}
            height={500}
            width={500}
          ></Skeleton>
        )}
      </Card.Section>

      <Suspense fallback='Loading...'>
        <Await resolve={iNatData}>
          {(iNatData) => {
            console.log(iNatData);
            return (
              <>
                <Title
                  lineClamp={1}
                  order={2}
                  size='h3'
                >
                  {iNatData.results[0].preferred_common_name}
                </Title>
                <p> {iNatData.results[0].name}</p>
              </>
            );
          }}
        </Await>
      </Suspense>

      <Card.Section></Card.Section>
    </Card>
  );
}
