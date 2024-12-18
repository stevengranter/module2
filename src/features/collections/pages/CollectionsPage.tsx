import { Title } from "@mantine/core"
import DefaultPaper from "~/features/_shared/components/DefaultPaper.tsx"
import NestView from "~/features/collections/pages/NestView.tsx"

export default function CollectionsPage() {
  return (
    <DefaultPaper>
      <Title order={1}>Collections</Title>
      <NestView />
    </DefaultPaper>
  )
}
