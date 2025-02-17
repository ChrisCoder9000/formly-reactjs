import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";

const isProduction = !process.env.ROLLUP_WATCH;

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/cjs/index.js",
      format: "cjs",
      sourcemap: !isProduction,
      exports: "named",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },
    {
      file: "dist/esm/index.js",
      format: "esm",
      sourcemap: !isProduction,
      exports: "named",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },
  ],
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    /^@radix-ui\/.*/,
    /^@hookform\/.*/,
    /^@babel\/runtime.*/,
    /^@babel\/runtime-corejs3.*/,
    "fs",
    "path",
    "crypto",
  ],
  plugins: [
    json(),
    {
      name: "remove-use-client",
      transform(code, id) {
        if (id.endsWith(".tsx") || id.endsWith(".ts")) {
          return {
            code: code.replace(/"use client";?\n?/, ""),
            map: null,
          };
        }
      },
    },
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      preferBuiltins: true,
      browser: true,
    }),
    commonjs({
      include: /node_modules/,
      ignore: ["fs", "path", "crypto"],
    }),
    typescript({
      tsconfig: "tsconfig.build.json",
      noEmitOnError: true,
      compilerOptions: {
        sourceMap: !isProduction,
        inlineSources: !isProduction,
      },
    }),
    babel({
      exclude: "node_modules/**",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      babelHelpers: "runtime",
      presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript",
      ],
    }),
  ],
};
