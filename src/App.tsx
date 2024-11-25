import { StrictMode } from "react"
import { RouterProvider } from "react-router-dom"

import { ColorSchemeScript, MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import { ModalsProvider } from "@mantine/modals"
import { Notifications } from "@mantine/notifications"
import "@mantine/notifications/styles.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import CollectionsProvider from "~/features/_shared/contexts/collections/CollectionsProvider.tsx"
import NestProvider from "~/features/_shared/contexts/nest/NestProvider.tsx"
import { fetchServerData } from "~/features/api/fetchServerData.ts"
import ReactDOM from "react-dom/client"
import { router } from "routes.tsx"
import { defaultTheme } from "theme/defaultTheme"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: ({ queryKey }) => fetchServerData(queryKey),
    },
  },
})

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <NestProvider>
          <CollectionsProvider>
            <ColorSchemeScript defaultColorScheme="light" />
            <MantineProvider defaultColorScheme="light" theme={defaultTheme}>
              <ModalsProvider />
              <Notifications position="top-center" />
              <RouterProvider router={router} />
            </MantineProvider>
          </CollectionsProvider>
        </NestProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}
