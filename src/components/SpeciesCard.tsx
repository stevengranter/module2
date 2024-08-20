import {
  AspectRatio,
  Skeleton,
  Spoiler,
  Image,
  Title,
  Card,
  Text,
} from '@mantine/core';
import { Interweave } from 'interweave';

import { speciesType } from 'models/speciesType';

import styles from './SpeciesCard.module.css';

function SpeciesCard({
  scientificName,
  description,
  commonName,
  nickName,
  habitat,
  imgSrc,
  diet,
  id,
}: speciesType) {
  return (
    <Card
      shadow='md'
      // p='xl'
      radius='lg'
      withBorder
      key={id}
    >
      {nickName && (
        <Title
          order={4}
          size='h1'
        >
          {nickName}
        </Title>
      )}

      <Card.Section>
        {imgSrc ? (
          <AspectRatio ratio={1 / 1}>
            <Image
              // radius='lg'
              className={styles.drop_shadow}
              alt={scientificName}
              loading='lazy'
              src={imgSrc}
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
        {commonName}
      </Title>
      <Title
        lineClamp={1}
        order={3}
        size='h4'
      >
        {scientificName}
      </Title>

      <Spoiler
        showLabel='Show more...'
        hideLabel='Hide'
        maxHeight={0}
      >
        <Text>
          <Interweave content={description} />
        </Text>
        <Text
          size='sm'
          mt={12}
        >
          Habitat: {habitat}
        </Text>
        <Text
          size='sm'
          mt={12}
        >
          Diet: {diet}
        </Text>
      </Spoiler>

      <Card.Section></Card.Section>
    </Card>
  );
}
export default SpeciesCard;
