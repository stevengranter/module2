import { Group, Title, ThemeIcon } from '@mantine/core';
import { IconSeeding } from '@tabler/icons-react';

export default function NurseryRoute() {
  return (
    <Group>
      <ThemeIcon
        variant='gradient'
        size='lg'
      >
        <IconSeeding />
      </ThemeIcon>
      <Title order={2}>Nursery</Title>
    </Group>
  );
}
