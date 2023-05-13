const React = require("react");
// const { App } = require("./App");
import { render, act, fireEvent } from "../../testUtils";
import { authSub } from "../HOCs/withAuthentication";
import HomeMenu from "./HomeMenu";

const Applications = [
  "mov-fe-app-ide",
  "mov-fe-app-taskmanager",
  "FleetBoard",
  "AdminBoard",
  "mov-fe-app-launcher",
];

const users = {
  guest: null,
  maria: {
    Label: "maria",
    superUser: true,
    Resources: { Applications },
  },
};

// beforeEach(() => {
//   fetch.mockClear();
// });

it("renders for user maria (Renders and links to the right place)", async () => {
  const mariaAuth = {
    loggedIn: true,
    currentUser: users.maria,
  };

  const { getByTestId } = render(<HomeMenu />);

  const button = getByTestId("home-menu");
  expect(button).toBeTruthy();
  act(() => fireEvent.click(button));
  const container = getByTestId("home-menu-popper");
  expect(container).toBeTruthy();

  await act(async () => await authSub.update(mariaAuth));

  for (let i = 0; i < Applications.length - 1; i++) {
    const name = Applications[i];
    const e2 = getByTestId("home-menu-link-" + name);
    expect(e2).toBeTruthy();
    expect(e2.href).toEqual("http://localhost/api/v1/apps/" + name + "/");
  }
});
