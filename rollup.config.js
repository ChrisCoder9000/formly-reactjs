import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: false,
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: false,
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
  ],
  plugins: [
    postcss({
      config: {
        path: "./postcss.config.js",
      },
      extensions: [".css"],
      inject: {
        insertAt: "top",
      },
      modules: false,
      autoModules: false,
      minimize: true,
    }),
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      preferBuiltins: true,
    }),
    commonjs({
      include: /node_modules/,
    }),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "dist",
      exclude: ["node_modules/**"],
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
