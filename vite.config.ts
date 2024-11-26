import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import { ViteImageOptimizer } from "vite-plugin-image-optimizer"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), ViteImageOptimizer()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // create a chunk for @mantine dependencies
          if (id.includes("@mantine") || id.includes("tslib")) {
            return "@mantine"
          }
          // create a chunk for react dependencies
          if (
            id.includes("react-router-dom") ||
            id.includes("react-query") ||
            id.includes("react-router")
          ) {
            return "@react-router"
          }
        },
      },
    },
  },
})
