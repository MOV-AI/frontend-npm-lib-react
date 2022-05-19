import React from "react";
import { render, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "./LoginForm";
import { Authentication } from "@mov-ai/mov-fe-lib-core";

describe("Render", () => {
  it("renders the component (smoke test)", () => {
    const { container } = render(<LoginForm></LoginForm>);
    expect(container).toBeInTheDocument();
  });
});

describe("Initial value", () => {
  it("Initial value of username should be empty", () => {
    const { getByTestId } = render(<LoginForm></LoginForm>);
    const input = getByTestId("input_username");
    expect(input.value).toBe("");
  });

  it("Initial value of password should be empty", () => {
    const { getByTestId } = render(<LoginForm></LoginForm>);
    const input = getByTestId("input_password");
    expect(input.value).toBe("");
  });
});

describe("Domain Selector", () => {
  it("Should not be visible if only default domain exists", () => {
    const { queryByText } = render(
      <LoginForm domains={[Authentication.DEFAULT_PROVIDER]}></LoginForm>
    );
    const domainSelector = queryByText("Domain");
    expect(domainSelector).toBeNull();
  });

  it("Should be visible if default and other domain exists", () => {
    const { queryByText } = render(
      <LoginForm
        domains={[Authentication.DEFAULT_PROVIDER, "otherDomain"]}
      ></LoginForm>
    );
    const domainSelector = queryByText("Domain");
    expect(domainSelector).toBeInTheDocument();
  });

  it("Shoud display the domains", async () => {
    const OTHER_DOMAIN = "OTHER_DOMAIN";
    const domains = [Authentication.DEFAULT_PROVIDER, OTHER_DOMAIN];
    const { getByRole } = render(<LoginForm domains={domains}></LoginForm>);

    const domainSelector = getByRole("button", { name: /internal/ });
    fireEvent.mouseDown(domainSelector);

    const listbox = getByRole("listbox");
    const options = within(listbox).getAllByRole("option");

    expect(options).toHaveLength(domains.length);
  });
});

describe("Selected Domain", () => {
  it("When selector is not visible selected domain should be the default", () => {
    const handleSubmit = jest.fn();
    const { queryByText, getByTestId } = render(
      <LoginForm
        domains={[Authentication.DEFAULT_PROVIDER]}
        onLoginSubmit={handleSubmit}
      ></LoginForm>
    );

    const domainSelector = queryByText("Domain");
    expect(domainSelector).toBeNull();

    const usernameInput = getByTestId("input_username");
    fireEvent.change(usernameInput, {
      target: { value: "username" }
    });

    const password = getByTestId("input_password");
    fireEvent.change(password, {
      target: { value: "notempty" }
    });

    const submitBtn = getByTestId("input_login");
    fireEvent.click(submitBtn);

    expect(handleSubmit).toBeCalledWith(
      expect.objectContaining({
        selectedProvider: Authentication.DEFAULT_PROVIDER
      })
    );
  });

  it("When selector is visible, initial value of selected domain should be the default", () => {
    const { getByTestId } = render(
      <LoginForm
        domains={["other", Authentication.DEFAULT_PROVIDER]}
      ></LoginForm>
    );
    const domainSelector = getByTestId("input_domain");
    expect(domainSelector).toBeInTheDocument();
    expect(domainSelector.value).toBe(Authentication.DEFAULT_PROVIDER);
  });
});

describe("Handle changes", () => {
  it("Selecting a value makes it the current domain value", () => {
    const OTHER_DOMAIN = "OTHER_DOMAIN";

    const { getByTestId } = render(
      <LoginForm
        domains={[OTHER_DOMAIN, Authentication.DEFAULT_PROVIDER]}
      ></LoginForm>
    );
    const domainSelector = getByTestId("input_domain");
    expect(domainSelector).toBeInTheDocument();

    fireEvent.select(domainSelector, {
      target: { value: OTHER_DOMAIN }
    });

    expect(domainSelector.value).toBe(OTHER_DOMAIN);
  });
});

describe("Submit", () => {
  it("Should not be called if password is empty", () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <LoginForm onLoginSubmit={handleSubmit}></LoginForm>
    );

    const password = getByTestId("input_password");
    fireEvent.change(password, {
      target: { value: "" }
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
      <LoginForm onLoginSubmit={handleSubmit}></LoginForm>
    );

    const usernameInput = getByTestId("input_username");
    fireEvent.change(usernameInput, {
      target: { value: username }
    });

    const passwordInput = getByTestId("input_password");
    fireEvent.change(passwordInput, {
      target: { value: password }
    });

    const submitBtn = getByTestId("input_login");
    fireEvent.click(submitBtn);

    expect(handleSubmit).toBeCalledWith(
      expect.objectContaining({
        username,
        password,
        selectedProvider: Authentication.DEFAULT_PROVIDER
      })
    );
  });
});
