import React from "react";
import ProfileMenu from "../src/Components/ProfileMenu";


export default {
    title: "Profile Menu",
    component: ProfileMenu,
    argTypes: {
    }
};

export const profileMenu = args => <ProfileMenu {...args}>Simple</ProfileMenu>;

profileMenu.story = {
    name: "profile menu"
};