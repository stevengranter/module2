
import { Card, Image, Skeleton, Text, Title, Spoiler } from '@mantine/core';
import { speciesType } from '../assets/data/speciesData';

import styles from './SpeciesCard.module.css';

type SpeciesCardProps = speciesType;


function SpeciesCard(props:SpeciesCardProps) {
  const imagePath = './images/' + props.imgSrc;
  return (
    <Card shadow="md" p="xl" radius="lg" withBorder>

      {props.nickName && <Title order={4} size="h1">{props.nickName}</Title>}

      <Card.Section>

        {(props.imgSrc) ?
        <div className="image-container">
        <Image
        src={imagePath}
        alt={props.scientificName}
        radius="lg"
        className={styles.drop_shadow} /></div> : <Skeleton height={500} width={500} animate={false}></Skeleton>}
      </Card.Section>

      <Title order={2}>{props.commonName}</Title>
       <Title order={3}>{props.scientificName}</Title>


    <Spoiler maxHeight={40} showLabel="Show more" hideLabel="Hide">
      <Text>{props.description}</Text>
      <Text mt={12} size="sm">Habitat: {props.habitat}</Text>
      <Text mt={12} size="sm">Diet: {props.diet}</Text>
    </Spoiler>


      <Card.Section>

      </Card.Section>



    </Card >
  );
}
export default SpeciesCard;