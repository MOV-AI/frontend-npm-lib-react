import React from "react";
import SceneViewer from "../src/Components/Viewer/SceneViewer";
import { Authentication } from "mov-fe-lib-core";

export default {
  title: "Scene Viewer"
};

const CRED = { user: "pedro", pass: "abcd" };

export const basicScene = () => {
  const [auth, setAuth] = React.useState(false);
  React.useEffect(() => {
    !auth &&
      Authentication.login(CRED.user, CRED.pass, true)
        .then(() => setAuth(true))
        .catch(e => console.log("Something went wrong", e));
  });
  return (
    <div style={{ height: "100vh" }}>
      {auth ? (
        <SceneViewer sceneName={{ Value: "Pedro" }} />
      ) : (
        <h1>Authenticating...</h1>
      )}
    </div>
  );
};

basicScene.story = {
  name: "basic scene"
};
