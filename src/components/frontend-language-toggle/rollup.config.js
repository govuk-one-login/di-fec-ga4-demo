import typescript from "rollup-plugin-typescript2";

export default {
  input: "language-param-setter.ts",
  output: [
    {
      file: "build/cjs/index.cjs",
      format: "cjs"
    },
    {
      file: "build/esm/index.js",
      format: "es"
    }
  ],
  plugins: [typescript()]
};