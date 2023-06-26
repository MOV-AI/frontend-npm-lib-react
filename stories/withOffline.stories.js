import React from "react";
import withMock from "storybook-addon-mock";

import withOfflineValidation from "../src/Components/HOCs/withOfflineValidation";

export default {
    title: "With offline validation Component",
    decorators: [withMock]
};

const withOfflineComponent = () => {
    return (
        <div>
            <h1>Offline validation</h1>
            <div>Please set offline in browser dev tools, network tab</div>
        </div>
    )
};


const Template = () => {
    const WithOfflineValidation = withOfflineValidation(withOfflineComponent);
    return <WithOfflineValidation />;
};

export const offlineStory = Template.bind({});

offlineStory.story = {
    name: "WithOfflineValidations"
};
