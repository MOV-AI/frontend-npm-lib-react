import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import withAuthentication from "./withAuthentication";

const MockComponent = () => <div></div>;

jest.mock("jwt-decode", () => {
  return function () {
    return { exp: new Date() };
  };
});

jest.mock("@mov-ai/mov-fe-lib-core", () => {
  return {
    Authentication: {
      checkLogin: jest.fn().mockResolvedValue(false),
      getToken: jest.fn().mockReturnValue("token"),
      getProviders: jest
        .fn()
        .mockResolvedValue({ domains: ["internal", "ldap"] })
    },
    User: function () {
      return {
        getCurrentUserWithPermissions: jest.fn().mockResolvedValue({
          Resources: {
            Applications: []
          },
          Superuser: true
        })
      };
    }
  };
});

describe("Render", () => {
  it("renders the component (smoke test)", async () => {
    const HOC = withAuthentication(MockComponent, "testApp");

    const { findByTestId, getByText } = render(<HOC />);

    const listNode = await findByTestId("section_login-panel");
    const loadingText = getByText("Preparing the bots");

    expect(listNode).toBeInTheDocument();
    expect(loadingText).toBeInTheDocument();
  });
});
