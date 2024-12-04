import { Paper } from "@mantine/core"
import NestView from "~/features/dashboard/pages/NestView.tsx"

export default function DashboardPage() {
  return (
    <Paper p="lg" radius="lg" m="lg">
      <NestView />
    </Paper>
  )
}
