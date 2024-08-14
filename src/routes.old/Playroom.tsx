import { Group, Title, ThemeIcon } from '@mantine/core';
import { IconHorseToy } from '@tabler/icons-react';

export default function PlayroomRoute() {
  return (
    <Group>
      <ThemeIcon
        variant='gradient'
        size='lg'
      >
        <IconHorseToy />
      </ThemeIcon>
      <Title order={2}>Playroom</Title>
    </Group>
  );
}
