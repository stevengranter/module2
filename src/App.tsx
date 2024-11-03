import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GuestSessionProvider from "~/features/guest/GuestSessionProvider.tsx";
import NestProvider from "~/features/nest/NestProvider.tsx";
import { queryINatAPI } from "~/lib/utils.ts";
import ReactDOM from "react-dom/client";
import { router } from "routes.tsx";
import { defaultTheme } from "theme/defaultTheme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: queryINatAPI,
    },
  },
});

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <NestProvider>
          <GuestSessionProvider>
            <ColorSchemeScript defaultColorScheme="auto" />
            <MantineProvider defaultColorScheme="auto" theme={defaultTheme}>
              <ModalsProvider />
              <Notifications position="top-center" />
              <RouterProvider router={router} />
            </MantineProvider>
          </GuestSessionProvider>
        </NestProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}
