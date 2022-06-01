import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import { importMetaAssets } from "@web/rollup-plugin-import-meta-assets";
import path from "path";
import autoExternals from "rollup-plugin-auto-external";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import { swc } from "rollup-plugin-swc3";
import packageJson from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      dir: path.dirname(packageJson.main),
      format: "cjs",
      exports: "named",
      sourcemap: true,
      name: "app-services-ui-components",
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    {
      dir: path.dirname(packageJson.module),
      format: "esm",
      exports: "named",
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: "src",
    },
  ],
  external: [
    "react/jsx-runtime",
    "@swc/helpers/lib/_extends.js",
    "@patternfly/react-styles",
    "@patternfly/react-tokens",
  ],
  plugins: [
    autoExternals(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      preventAssignment: true,
    }),
    json(),
    swc({
      sourceMaps: true,
      jsc: {
        parser: {
          syntax: "typescript",
        },
        transform: {
          react: {
            runtime: "automatic",
          },
        },
        externalHelpers: true,
      },
    }),
    postcss({
      extract: true,
      minimize: true,
    }),
    importMetaAssets(),
    terser(),
  ],
  onwarn: (warning) => {
    // better fail on warnings
    throw new Error("Warning as error: " + warning.message);
  },
};
