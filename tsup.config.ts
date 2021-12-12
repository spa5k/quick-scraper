/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { Options } from "tsup";

const env = process.env.NODE_ENV;

export const tsup: Options = {
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ["cjs", "esm"],
  minify: false,
  bundle: true,
  skipNodeModulesBundle: true,
  watch: env === "development",
  entryPoints: ["src/index.ts"],
  target: "node14",
};
