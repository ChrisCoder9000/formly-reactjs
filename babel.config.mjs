// Created Date: Tuesday February 11th 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Tuesday February 11th 2025 1:40:00 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

export default {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: 3,
        regenerator: true,
        helpers: true,
        useESModules: false,
      },
    ],
  ],
};
