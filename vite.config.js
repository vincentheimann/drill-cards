import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Drill Cards",
        short_name: "Drill Cards",
        description: "Learning using Drill Cards.",
        theme_color: "#1976D2",
        background_color: "#ffffff",
        display: "fullscreen",
        start_url: ".",
        icons: [
          {
            src: "icons/style_192dp_1976D2_FILL1_wght400_GRAD0_opsz48.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/style_512dp_1976D2_FILL1_wght400_GRAD0_opsz48.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        lang: "en",
        scope: "/",
        orientation: "any",
        display_override: ["fullscreen", "standalone"],
      },
    }),
  ],
});
