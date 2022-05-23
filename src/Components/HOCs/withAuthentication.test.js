import React, { useState as useStateMock } from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Authentication, User } from "@mov-ai/mov-fe-lib-core";
import withAuthentication from "./withAuthentication";
import jwtDecode from "jwt-decode";

const MockComponent = props => <div></div>;

jest.mock("jwt-decode", () => {
  return function () {
    return { exp: new Date() };
  };
});

// results in a ReferenceError
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

    const { getByTestId, getByText } = render(<HOC />);

    const listNode = getByTestId("section_login-panel");
    const loadingText = getByText("Preparing the bots");
    screen.debug();

    expect(listNode).toBeInTheDocument();
    expect(loadingText).toBeInTheDocument();
  });
});
