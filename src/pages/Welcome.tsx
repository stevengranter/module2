import { Group, Card, Title, Image, Skeleton } from '@mantine/core';

import logo from '/images/logo2.png';

export default function WelcomePage() {
  return (
    <Group>
      <Card>
        <Title order={2}>Welcome to...</Title>
        <Card.Section>
          <Image
            src={logo}
            alt='WilderNest Logo'
            w={400}
          />
        </Card.Section>
      </Card>

      <Card>
        <Skeleton
          h={200}
          w={200}
          animate={false}
        ></Skeleton>
      </Card>

      <Card>
        <Skeleton
          h={200}
          w={200}
          animate={false}
        ></Skeleton>
      </Card>
    </Group>
  );
}
