module.exports = {
  stories: ["../stories/**/*.stories.@(js|mdx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-controls"],
  typescript: {
    reactDocgen: 'react-docgen-typescript-plugin'
  },

  webpackFinal: config => {
    const pop = config.entry.pop();
    config.entry = config.entry.concat([process.cwd() + "/src/entry.js", pop]);
    return config;
  },

  core: {
    builder: "webpack5"
  }
};
