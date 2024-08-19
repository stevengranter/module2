import {
  Card,
  Image,
  Skeleton,
  Text,
  Title,
  Spoiler,
  AspectRatio,
} from '@mantine/core';
import styles from './SpeciesCard.module.css';
import { speciesType } from 'models/speciesType';

import { Interweave } from 'interweave';

function SpeciesCard({
  id,
  imgSrc,
  commonName,
  scientificName,
  nickName,
  diet,
  habitat,
  description,
}: speciesType) {
  return (
    <Card
      key={id}
      shadow='md'
      // p='xl'
      radius='lg'
      withBorder
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
              src={imgSrc}
              alt={scientificName}
              // radius='lg'
              className={styles.drop_shadow}
              loading='lazy'
            />
          </AspectRatio>
        ) : (
          <Skeleton
            height={500}
            width={500}
            animate={false}
          ></Skeleton>
        )}
      </Card.Section>

      <Title
        order={2}
        lineClamp={1}
        size='h3'
      >
        {commonName}
      </Title>
      <Title
        order={3}
        lineClamp={1}
        size='h4'
      >
        {scientificName}
      </Title>

      <Spoiler
        maxHeight={0}
        showLabel='Show more...'
        hideLabel='Hide'
      >
        <Text>
          <Interweave content={description} />
        </Text>
        <Text
          mt={12}
          size='sm'
        >
          Habitat: {habitat}
        </Text>
        <Text
          mt={12}
          size='sm'
        >
          Diet: {diet}
        </Text>
      </Spoiler>

      <Card.Section></Card.Section>
    </Card>
  );
}
export default SpeciesCard;
