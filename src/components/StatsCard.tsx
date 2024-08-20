import {
  ThemeIcon,
  Progress,
  Group,
  Badge,
  Paper,
  Text,
  rem,
} from '@mantine/core';
import { IconButterfly } from '@tabler/icons-react';

import classes from './StatsCard.module.css';

export function StatsCard() {
  return (
    <Paper
      className={classes.card}
      radius='md'
      withBorder
      mt={20}
    >
      <ThemeIcon
        className={classes.icon}
        radius={60}
        size={60}
      >
        <IconButterfly
          style={{ height: rem(32), width: rem(32) }}
          stroke={1.5}
        />
      </ThemeIcon>

      <Text
        className={classes.title}
        ta='center'
        fw={700}
      >
        Spotted Tussock Moth
      </Text>
      <Text
        ta='center'
        c='dimmed'
        fz='sm'
      >
        Yellow Wooly Bear
      </Text>
      <Group
        justify='space-between'
        mt='xs'
      >
        <Text
          c='dimmed'
          fz='sm'
        >
          Progress
        </Text>
        <Text
          c='dimmed'
          fz='sm'
        >
          70%
        </Text>
      </Group>

      <Progress
        value={62}
        mt={5}
      />

      <Group
        justify='space-between'
        mt='md'
      >
        <Text fz='sm'>August 24</Text>
        <Badge size='sm'>14 days left</Badge>
      </Group>
    </Paper>
  );
}
