/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        open: true,
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "src/test/setup.ts",
        css: true,
    },
});
