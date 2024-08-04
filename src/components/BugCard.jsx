
import { Grid, Card, Image, Text, Title } from '@mantine/core';
function BugCard({ bug }) {
  return (
    <Grid.Col
      span={{ base: 12, xs: 6, sm: 4, lg: 3 }}
      justify="space-around"
      align="flex-start">
      <Card shadow="sm" p="xl">
        <Card.Section>

        </Card.Section>

        <Card.Section>
          <Title order={2}></Title>
        </Card.Section>

        <Card.Section>
          <Title order={3}>{bug.commonName}</Title>
          <h4>{bug.scientificName}</h4>
          <p>{bug.description}</p>
          <p>Habitat: {bug.habitat}</p>
          <p>Diet: {bug.diet}</p>

        </Card.Section>
      </Card>
    </Grid.Col>
  );
}
export default BugCard;