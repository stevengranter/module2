import {
  ThemeIcon,
  Progress,
  Text,
  Group,
  Badge,
  Paper,
  rem,
} from '@mantine/core';
import { IconButterfly } from '@tabler/icons-react';
import classes from './StatsCard.module.css';

export function StatsCard() {
  return (
    <Paper
      radius='md'
      withBorder
      className={classes.card}
      mt={20}
    >
      <ThemeIcon
        className={classes.icon}
        size={60}
        radius={60}
      >
        <IconButterfly
          style={{ width: rem(32), height: rem(32) }}
          stroke={1.5}
        />
      </ThemeIcon>

      <Text
        ta='center'
        fw={700}
        className={classes.title}
      >
        Spotted Tussock Moth
      </Text>
      <Text
        c='dimmed'
        ta='center'
        fz='sm'
      >
        Yellow Wooly Bear
      </Text>
      <Group
        justify='space-between'
        mt='xs'
      >
        <Text
          fz='sm'
          c='dimmed'
        >
          Progress
        </Text>
        <Text
          fz='sm'
          c='dimmed'
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
