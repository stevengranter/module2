import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NestProvider from "~/features/_shared/contexts/nest/NestProvider.tsx";
import { queryINatAPI } from "~/features/api/iNaturalist/queryINatAPI.ts";
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
          <ColorSchemeScript defaultColorScheme="light" />
          <MantineProvider defaultColorScheme="light" theme={defaultTheme}>
            <ModalsProvider />
            <Notifications position="top-center" />
            <RouterProvider router={router} />
          </MantineProvider>
        </NestProvider>
      </QueryClientProvider>
      ,
    </StrictMode>,
  );
}
