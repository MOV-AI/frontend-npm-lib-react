import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, within } from "@testing-library/react";
import withTheme from "./../HOCs/withTheme";
import LoginForm from "./LoginForm";
import { Authentication } from "@mov-ai/mov-fe-lib-core";
import { EMPTY_FUNCTION } from "../../Utils/Constants";

const Themed = withTheme(LoginForm as any);

const SOME_DOMAIN_NAME = "OTHER_DOMAIN";
const SINGLE_DOMAINS = [Authentication.DEFAULT_PROVIDER];
const MULTIPLE_DOMAINS = [Authentication.DEFAULT_PROVIDER, SOME_DOMAIN_NAME];

describe("Render", () => {
  it("renders the component (smoke test)", () => {
    const { container } = render(
      <Themed
        domains={MULTIPLE_DOMAINS}
        authErrorMessage={""}
        onLoginSubmit={EMPTY_FUNCTION}
      />,
    );
    expect(container).toBeInTheDocument();
  });
});

describe("Initial value", () => {
  it("Initial value of username should be empty", () => {
    const { getByTestId } = render(
      <Themed
        domains={MULTIPLE_DOMAINS}
        authErrorMessage={""}
        onLoginSubmit={EMPTY_FUNCTION}
      />,
    );
    const input = getByTestId("input_username") as HTMLInputElement;
    expect(input.value).toBe("");
  });

  it("Initial value of password should be empty", () => {
    const { getByTestId } = render(
      <Themed
        domains={MULTIPLE_DOMAINS}
        authErrorMessage={""}
        onLoginSubmit={EMPTY_FUNCTION}
      />,
    );
    const input = getByTestId("input_password") as HTMLInputElement;
    expect(input.value).toBe("");
  });
});

describe("Domain Selector", () => {
  it("Should not be visible if only default domain exists", () => {
    const { queryByText } = render(
      <Themed
        domains={SINGLE_DOMAINS}
        authErrorMessage={""}
        onLoginSubmit={EMPTY_FUNCTION}
      />,
    );
    const domainSelector = queryByText("Domain");
    expect(domainSelector).toBeNull();
  });

  it("Should be visible if default and other domain exists", () => {
    const { queryByText } = render(
      <Themed
        domains={MULTIPLE_DOMAINS}
        authErrorMessage={""}
        onLoginSubmit={EMPTY_FUNCTION}
      />,
    );
    const domainSelector = queryByText("Domain");
    expect(domainSelector).toBeInTheDocument();
  });

  /*
  it("Shoud display the domains", async () => {
    const { getByRole } = render(
      <Themed
        domains={MULTIPLE_DOMAINS}
        authErrorMessage={""}
        onLoginSubmit={EMPTY_FUNCTION}
      />,
    );

    const domainSelector = getByRole("button", {
      name: Authentication.DEFAULT_PROVIDER,
    });
    fireEvent.mouseDown(domainSelector);

    const listbox = getByRole("listbox");
    const options = within(listbox).getAllByRole("option");

    expect(options).toHaveLength(MULTIPLE_DOMAINS.length);
  });
  */
});

describe("Selected Domain", () => {
  it("When selector is not visible selected domain should be the default", () => {
    const handleSubmit = jest.fn();
    const { queryByText, getByTestId } = render(
      <Themed
        domains={SINGLE_DOMAINS}
        authErrorMessage={""}
        onLoginSubmit={handleSubmit}
      />,
    );

    const domainSelector = queryByText("Domain");
    expect(domainSelector).toBeNull();

    const usernameInput = getByTestId("input_username");
    fireEvent.change(usernameInput, {
      target: { value: "username" },
    });

    const password = getByTestId("input_password");
    fireEvent.change(password, {
      target: { value: "notempty" },
    });

    const submitBtn = getByTestId("input_login");
    fireEvent.click(submitBtn);

    expect(handleSubmit).toBeCalledWith(
      expect.objectContaining({
        selectedProvider: Authentication.DEFAULT_PROVIDER,
      }),
    );
  });

  it("When selector is visible, initial value of selected domain should be the default", () => {
    const { getByTestId } = render(
      <Themed
        authErrorMessage={""}
        onLoginSubmit={EMPTY_FUNCTION}
        domains={["other", Authentication.DEFAULT_PROVIDER]}
      />,
    );
    const domainSelector = getByTestId("input_domain") as HTMLInputElement;
    expect(domainSelector).toBeInTheDocument();
    expect(domainSelector.value).toBe(Authentication.DEFAULT_PROVIDER);
  });
});

describe("Handle changes", () => {
  it("Selecting a value makes it the current domain value", () => {
    const { getByTestId } = render(
      <Themed
        domains={MULTIPLE_DOMAINS}
        authErrorMessage={""}
        onLoginSubmit={EMPTY_FUNCTION}
      />,
    );
    const domainSelector = getByTestId("input_domain") as HTMLInputElement;
    expect(domainSelector).toBeInTheDocument();

    fireEvent.select(domainSelector, {
      target: { value: SOME_DOMAIN_NAME },
    });

    expect(domainSelector.value).toBe(SOME_DOMAIN_NAME);
  });
});

describe("Submit", () => {
  it("Should not be called if username is empty", () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <Themed
        onLoginSubmit={handleSubmit}
        domains={MULTIPLE_DOMAINS}
        authErrorMessage={""}
      />,
    );

    const usernameInput = getByTestId("input_username");
    fireEvent.change(usernameInput, {
      target: { value: "" },
    });

    const submitBtn = getByTestId("input_login");
    fireEvent.click(submitBtn);

    expect(handleSubmit).toBeCalledTimes(0);
  });

  it("Should not be called if password is empty", () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <Themed
        onLoginSubmit={handleSubmit}
        domains={MULTIPLE_DOMAINS}
        authErrorMessage={""}
      />,
    );

    const passwordInput = getByTestId("input_password");
    fireEvent.change(passwordInput, {
      target: { value: "" },
    });

    const submitBtn = getByTestId("input_login");
    fireEvent.click(submitBtn);

    expect(handleSubmit).toBeCalledTimes(0);
  });

  it("Should be called if fields are not empty", () => {
    const handleSubmit = jest.fn();
    const password = "password";
    const username = "username";
    const { getByTestId } = render(
      <Themed
        onLoginSubmit={handleSubmit}
        domains={MULTIPLE_DOMAINS}
        authErrorMessage={""}
      />,
    );

    const usernameInput = getByTestId("input_username");
    fireEvent.change(usernameInput, {
      target: { value: username },
    });

    const passwordInput = getByTestId("input_password");
    fireEvent.change(passwordInput, {
      target: { value: password },
    });

    const submitBtn = getByTestId("input_login");
    fireEvent.click(submitBtn);

    expect(handleSubmit).toBeCalledWith(
      expect.objectContaining({
        username,
        password,
        selectedProvider: Authentication.DEFAULT_PROVIDER,
      }),
    );
  });
});
