import withTheme from "../src/Components/HOCs/withTheme";
import ApplicationTheme from "../src/styles/Themes";
 
export const decorators = [
  (Story) => {
    const ThemedStory = withTheme(Story, ApplicationTheme);
    return <ThemedStory />;
  },
];
