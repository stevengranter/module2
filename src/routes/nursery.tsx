import { Group, Title, ThemeIcon } from '@mantine/core'
import {IconSeeding} from '@tabler/icons-react'

export default function Nursery() {
  return (
    <Group>
    <ThemeIcon variant="gradient" size="lg"><IconSeeding /></ThemeIcon>
      <Title order={2}>Nursery</Title>
      </Group>

  )
}