// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "78",
          node: "12",
        },
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-transform-runtime", { loose: true }],
    ["@babel/plugin-proposal-private-methods", { loose: true }],
    ["@babel/plugin-transform-private-property-in-object", { loose: true }],
  ],
};
