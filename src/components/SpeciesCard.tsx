import { Card, Image, Skeleton, Text, Title, Spoiler } from '@mantine/core';
import styles from './SpeciesCard.module.css';

import { Interweave } from 'interweave';

export interface speciesType {
  id: number;
  imgSrc: string;
  commonName: string;
  scientificName: string;
  nickName?: undefined | string;
  family?: string;
  diet?: string;
  habitat?: string;
  description: string;
}

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
      p='xl'
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
          <div className='image-container'>
            <Image
              src={imgSrc}
              alt={scientificName}
              radius='lg'
              className={styles.drop_shadow}
            />
          </div>
        ) : (
          <Skeleton
            height={500}
            width={500}
            animate={false}
          ></Skeleton>
        )}
      </Card.Section>

      <Title order={2}>{commonName}</Title>
      <Title order={3}>{scientificName}</Title>

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
