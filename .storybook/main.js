module.exports = {
  stories: ["../stories/**/*.stories.@(js|mdx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-controls"],
  core: {
    builder: "webpack5"
  }
};