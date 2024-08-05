
import { Card, Image, Skeleton, Text, Title } from '@mantine/core';
import styles from './CollectibleCard.module.css';


function CollectibleCard({ species }:{species: object}) {
  const imagePath = './images/' + species.imgSrc;
  return (
    <Card shadow="md" p="xl" radius="lg" withBorder className={styles.collectible_card} >

      <Title order={4} size="h1">{species.nickName}</Title>
      <Title order={3}>{species.scientificName}</Title>

      <Card.Section>
        {(species.imgSrc) ? <Image src={imagePath} alt={species.scientificName} /> : <Skeleton height={500} width={500} animate={false}></Skeleton>}
      </Card.Section>

      <Title order={2}>{species.commonName}</Title>
      <Text mt={8} className={styles.description}>{species.description}</Text>

      <Card.Section>

      </Card.Section>
      <Text mt={12} className={styles.habitat} size="sm">Habitat: {species.habitat}</Text>
      <Text mt={12} className={styles.diet} size="sm">Diet: {species.diet}</Text>


    </Card >
  );
}
export default CollectibleCard;