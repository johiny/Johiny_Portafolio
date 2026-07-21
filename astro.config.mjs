import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import compress from "astro-compress";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(),react(),compress()],
  vite: {
    server: {
      allowedHosts: ['johinyjr.tail84d477.ts.net']
    }
  }
});
