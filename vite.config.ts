import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import typescript from "@rollup/plugin-typescript";
import { libInjectCss } from "vite-plugin-lib-inject-css";

function resolve(str: string) {
  return path.resolve(__dirname, str);
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "lib",
    lib: {
      entry: resolve("src/lib/index.ts"),
      name: "MaterialUiToastWrapper",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react-transition-group",
        "uuid",
        "@emotion/react",
        "@emotion/styled",
        "@mui/material",
        "@mui/icons-material",
      ],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  plugins: [
    react(),
    libInjectCss(),
    typescript({
      target: "es5",
      rootDir: resolve("src/lib"),
      outDir: resolve("lib"),
      declaration: true,
      declarationDir: resolve("lib"),
      exclude: resolve("node_modules/**"),
      allowSyntheticDefaultImports: true,
    }),
  ],
});
