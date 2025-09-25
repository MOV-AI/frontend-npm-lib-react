import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import withAuthentication from "./withAuthentication";
import withTheme from "./withTheme";

/* =========  MOCKS  ========= */
jest.mock("@mov-ai/mov-fe-lib-core", () => ({
  Authentication: {
    // 👇 Força usuário DESLOGADO
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

    // 1️⃣ Primeiro: tela de loading
    expect(screen.getByText("Preparing the bots")).toBeInTheDocument();

    // 2️⃣ Em seguida: formulário de login com 'Username'
    await waitFor(
      () => expect(screen.getByText("Username")).toBeInTheDocument(),
      { timeout: 6000 },
    );
  });
});
