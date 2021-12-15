import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import autoExternals from "rollup-plugin-auto-external";
import renameNodeModules from "rollup-plugin-rename-node-modules";
import postcss from "rollup-plugin-postcss";
import replace from "rollup-plugin-replace";
import svg from "rollup-plugin-svg";
import json from "@rollup/plugin-json";
import path from "path";

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
  plugins: [
    autoExternals(),
    renameNodeModules("external"),
    resolve({ browser: true, preferBuiltins: true, modulesOnly: true }),
    commonjs({
      requireReturnsDefault: "auto",
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    svg(),
    json(),
    typescript(),
    postcss({
      extract: true,
      minimize: true,
    }),
    terser(),
  ],
};
