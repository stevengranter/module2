
import { Container, Center, Card, Grid, SimpleGrid, Skeleton, Image, rem } from '@mantine/core';
import {Link} from 'react-router-dom';
import { StatsCard } from '../components/StatsCard';


import { ButtonLink } from '../components/CustomButtons';
import { IconRainbow } from '@tabler/icons-react';


const PRIMARY_COL_HEIGHT = rem(300);

export default
function Index() {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <Container my="md">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <Card>

          <Card.Section>
            <Link to="/nest">
            <Image src="./images/nest.png" />
            </Link>
          </Card.Section>
          <Center>
             <ButtonLink to="/nest" variant="gradient" justify="center" fullWidth >
       myNEST
      </ButtonLink>
</Center>
        </Card>
          {/* <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} /> */}
        <Grid gutter="md">
          <Grid.Col>
            <StatsCard/>
            {/* <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} /> */}

          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}