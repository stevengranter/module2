import { Group, Title, ThemeIcon } from '@mantine/core';
import { IconRainbow } from '@tabler/icons-react';

export default function NestRoute() {
  return (
    <Group>
      <ThemeIcon
        variant='gradient'
        size='lg'
      >
        <IconRainbow />
      </ThemeIcon>
      <Title order={2}>myNEST</Title>
    </Group>
  );
}
