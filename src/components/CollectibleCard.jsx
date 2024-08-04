
import { Card, Image, Text, Title } from '@mantine/core';
function CollectibleCard({ species }) {
  return (
    <Card shadow="sm" p="xl">
      <Card.Section>

      </Card.Section>

      <Card.Section>
        <Title order={2}></Title>
      </Card.Section>

      <Card.Section>
        <Title order={3}>{species.commonName}</Title>
        <h4>{species.scientificName}</h4>
        <p>{species.description}</p>
        <p>Habitat: {species.habitat}</p>
        <p>Diet: {species.diet}</p>

      </Card.Section>
    </Card>

  );
}
export default CollectibleCard;