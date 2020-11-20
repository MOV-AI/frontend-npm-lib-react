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
    userName: "New user",
    version: "v.1.1.2020",
    extraItems: [{label: "Profile", func: () => console.log("Click MOV.AI ProfileMenu")}],
    style: {},
    onClick: () => console.log("Click MOV.AI ProfileMenu"),
    color: "default", // default, inherit, primary or secondary
    variant: "contained", // text, outlined, contained
    size: "medium", // small, medium, large
};