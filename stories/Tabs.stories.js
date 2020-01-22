import React from "react";
import Tabs from "../src/Components/Tabs";
export default {
  title: "Tabs"
};

export const simpleTab = () => (
  <div style={{ height: "90vh" }}>
    <Tabs
      tabList={[
        { label: "Tab 1", component: <div>Component 1</div> },
        {
          label: "Tab 2",
          component: (
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          )
        },
        { label: "Tab 3", component: <div>Component 3</div> }
      ]}
    >
      Simple
    </Tabs>
  </div>
);

simpleTab.story = {
  name: "simple tab"
};
