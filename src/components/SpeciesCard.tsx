import { useState } from 'react';

import {
  AspectRatio,
  Skeleton,
  GridCol,
  Center,
  Image,
  Title,
  Grid,
  Card,
  Text,
} from '@mantine/core';
import { Interweave } from 'interweave';

import type { EnrichedCardType } from 'models/EnrichedCardType';

import styles from './SpeciesCard.module.css';

function SpeciesCard(props: EnrichedCardType) {
  const [showFlipSide, setShowFlipSide] = useState(false);

  function flipCard() {
    console.log('flipping card');
    setShowFlipSide((prevState) => !prevState);
  }

  return (
    <>
      {showFlipSide ? (
        <CardSideB
          {...props}
          flipFn={flipCard}
        />
      ) : (
        <CardSideA
          {...props}
          flipFn={flipCard}
        />
      )}
      <Center>
        <Text
          style={{ cursor: 'pointer' }}
          onClick={flipCard}
        >
          {showFlipSide ? 'Show front side' : 'Show back side'}
        </Text>
      </Center>
    </>
  );
}

function CardSideA(props: { flipFn: () => void } & EnrichedCardType) {
  return (
    <>
      <Card
        className={styles['card-front']}
        key={props.id}
        shadow='md'
        // p='xl'
        radius='lg'
        withBorder
      >
        <Grid
          justify='space-between'
          align='center'
        >
          {props.nickname && (
            <GridCol span={9}>
              <Title
                order={4}
                size='h2'
              >
                {props.nickname}
              </Title>
            </GridCol>
          )}
          <GridCol span={3}>
            <button onClick={props.flipFn}>flip</button>
          </GridCol>
        </Grid>

        <Card.Section>
          {props.imgSrc ? (
            <AspectRatio ratio={1 / 1}>
              <Image
                // radius='lg'
                className={styles.drop_shadow}
                src={props.imgSrc}
                alt={props.name}
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

        <Title
          lineClamp={1}
          order={2}
          size='h3'
        >
          {props.preferred_common_name}
        </Title>
        <Title
          lineClamp={1}
          order={3}
          size='h4'
        >
          {props.name}
        </Title>

        <Card.Section></Card.Section>
      </Card>
    </>
  );
}

function CardSideB(props: { flipFn: () => void } & EnrichedCardType) {
  return (
    <Card
      className={styles['card-back']}
      key={props.id}
      shadow='md'
      // p='xl'
      radius='lg'
      withBorder
    >
      <Grid
        justify='space-between'
        align='center'
      >
        {props.nickname && (
          <GridCol span={9}>
            <Title
              order={4}
              size='h2'
            >
              {props.nickname}
            </Title>
          </GridCol>
        )}
        <GridCol span={3}>
          <button onClick={props.flipFn}>flip</button>
        </GridCol>
      </Grid>
      <Card.Section>
        {props.imgSrc ? (
          <AspectRatio ratio={1 / 1}>
            <Image
              src={props?.default_photo?.medium_url}
              // radius='lg'
              className={styles.drop_shadow}
              alt={props.name}
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
      <Title
        lineClamp={1}
        order={2}
        size='h3'
      >
        {props.preferred_common_name}
      </Title>
      <Title
        lineClamp={1}
        order={3}
        size='h4'
      >
        {props.name}
      </Title>
      {/* <Spoiler
        showLabel='Show more...'
        hideLabel='Hide'
        maxHeight={40}
      > */}
      <Text>
        <Interweave content={props.wikipedia_summary} />
      </Text>
      {/* </Spoiler> */}
    </Card>
  );
}

export default SpeciesCard;
