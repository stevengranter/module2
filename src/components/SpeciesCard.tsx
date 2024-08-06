
import { Card, Image, Skeleton, Text, Title } from '@mantine/core';
import { speciesType } from '../assets/data/speciesData';

type SpeciesCardProps = speciesType;


function SpeciesCard(props:SpeciesCardProps) {
  const imagePath = './images/' + props.imgSrc;
  return (
    <Card shadow="md" p="xl" radius="lg" withBorder>

      {props.nickName && <Title order={4} size="h1">{props.nickName}</Title>}
      <Title order={3}>{props.scientificName}</Title>

      <Card.Section>
        {(props.imgSrc) ? <Image src={imagePath} alt={props.scientificName} /> : <Skeleton height={500} width={500} animate={false}></Skeleton>}
      </Card.Section>

      <Title order={2}>{props.commonName}</Title>
      <Text mt={8}>{props.description}</Text>

      <Card.Section>

      </Card.Section>
      <Text mt={12} size="sm">Habitat: {props.habitat}</Text>
      <Text mt={12} size="sm">Diet: {props.diet}</Text>


    </Card >
  );
}
export default SpeciesCard;