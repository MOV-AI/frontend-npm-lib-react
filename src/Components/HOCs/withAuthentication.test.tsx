import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import withAuthentication from "./withAuthentication";
import withTheme from "./withTheme";

/* =========  MOCKS  ========= */
jest.mock("@mov-ai/mov-fe-lib-core", () => ({
  Authentication: {
    checkLogin: jest.fn().mockResolvedValue(false),
    getProviders: jest.fn().mockResolvedValue({ domains: ["default"] }),
    getToken: jest.fn().mockReturnValue("fake-token"),
    refreshTokens: jest.fn().mockResolvedValue(false),
    logout: jest.fn(),
    login: jest.fn().mockResolvedValue({}),
  },
  User: jest.fn().mockImplementation(() => ({
    getCurrentUserWithPermissions: jest.fn().mockResolvedValue({
      Resources: { Applications: [] },
      Superuser: false,
    }),
  })),
  PermissionType: {},
}));

jest.mock("jwt-decode", () => () => ({
  exp: Math.floor(Date.now() / 1000) + 3600,
}));
jest.mock("../../i18n/index", () => ({ t: (k: string) => k }));

jest.setTimeout(10000);

const MockComponent = () => <div>hello</div>;

describe("withAuthentication HOC", () => {
  it("mostra o login form quando não autenticado", async () => {
    const HOC = withAuthentication(MockComponent, "testApp");
    const Themed = withTheme(HOC);

    render(<Themed />);

    expect(screen.getByText("Preparing the bots")).toBeInTheDocument();

    await waitFor(
      () => expect(screen.getByText("Username")).toBeInTheDocument(),
      { timeout: 6000 },
    );
  });
});

import { authEmit, loggedOutInfo, authSub } from "./withAuthentication";

describe("authEmit", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authSub.update(loggedOutInfo);
  });

  it("returns logged out info when not authenticated", async () => {
    const core = require("@mov-ai/mov-fe-lib-core");
    core.Authentication.checkLogin.mockResolvedValue(false);
    core.Authentication.refreshTokens.mockResolvedValue(false);

    const result = await authEmit();
    expect(result.loggedIn).toBe(false);
    expect(result.currentUser).toBeDefined();
    expect(result.loading).toBe(false);
    // expect(result.providers).toEqual({ domains: ["default"] });
  });

  it("returns logged in info when authenticated", async () => {
    const core = require("@mov-ai/mov-fe-lib-core");
    core.Authentication.checkLogin.mockResolvedValue(true);
    core.User.mockImplementation(() => ({
      getCurrentUserWithPermissions: jest.fn().mockResolvedValue({
        Resources: { Applications: ["testApp"] },
        Superuser: true,
        Roles: ["admin"],
      }),
    }));

    const result = await authEmit();
    expect(result.loggedIn).toBe(true);
    expect(result.currentUser).toHaveProperty("roles");
    expect(result.loading).toBe(false);
    expect(result.providers).toEqual({ domains: ["default"] });
  });

  it("handles error and emits logged out info", async () => {
    const core = require("@mov-ai/mov-fe-lib-core");
    core.Authentication.checkLogin.mockRejectedValue(new Error("fail"));

    const result = await authEmit();
    expect(result.loggedIn).toBe(false);
    expect(result.currentUser).toBeNull();
    expect(result.loading).toBe(false);
    expect(result.providers).toEqual({ domains: [] });
  });
});
