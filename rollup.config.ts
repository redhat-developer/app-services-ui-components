import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import { importMetaAssets } from "@web/rollup-plugin-import-meta-assets";
import path from "path";
import autoExternals from "rollup-plugin-auto-external";
import postcss from "rollup-plugin-postcss";
import renameNodeModules from "rollup-plugin-rename-node-modules";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

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
    "@patternfly/react-icons/dist/js/icons/external-link-alt-icon",
    "@patternfly/react-icons/dist/js/icons/search-icon",
    "@patternfly/react-icons/dist/js/icons/help-icon",
    "@patternfly/react-icons/dist/js/icons/outlined-clock-icon",
    "@patternfly/react-icons/dist/js/icons/check-circle-icon",
  ],
  plugins: [
    autoExternals(),
    renameNodeModules("external"),
    resolve({ browser: true, preferBuiltins: true, modulesOnly: true }),
    commonjs({
      requireReturnsDefault: "auto",
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      preventAssignment: true,
    }),
    json(),
    typescript({ useTsconfigDeclarationDir: true }),
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
