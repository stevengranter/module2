import { Paper, Title } from "@mantine/core"
import DefaultPaper from "~/features/_shared/components/DefaultPaper.tsx"
import NestView from "~/features/dashboard/pages/NestView.tsx"

export default function DashboardPage() {
  return (
    <DefaultPaper>
      <Title order={1}>Collections</Title>
      <NestView />
    </DefaultPaper>
  )
}
