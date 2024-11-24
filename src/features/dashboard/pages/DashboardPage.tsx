import { NestProviderState } from "~/features/_shared/contexts/nest/NestProvider.types.ts"
import useNest from "~/features/_shared/contexts/nest/useNest.ts"
import NestView from "~/features/dashboard/pages/NestView.tsx"

export default function DashboardPage() {


  return (
    <>
          <NestView />
    </>
  )
}
