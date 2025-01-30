import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";

const isProduction = !process.env.ROLLUP_WATCH;

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: !isProduction,
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: !isProduction,
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
      modules: true,
      autoModules: true,
      minimize: isProduction,
      inject: false,
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
      sourceMap: !isProduction,
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
