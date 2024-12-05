import { Paper, Title } from "@mantine/core"
import NestView from "~/features/dashboard/pages/NestView.tsx"

export default function DashboardPage() {
  return (
    <Paper p="lg" radius="lg" m="lg">
      <Title order={1}>myNest</Title>
      <NestView />
    </Paper>
  )
}
