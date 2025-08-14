import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { LanguageSelection } from "./ProfileMenu";
import { User } from "@mov-ai/mov-fe-lib-core";

// Mock dependencies
jest.mock("@mov-ai/mov-fe-lib-core", () => ({
  Rest: {
    get: jest.fn(() => Promise.resolve({ languages: ["en", "es"] })),
  },
  User: jest.fn().mockImplementation(() => ({
    getData: jest.fn(() => Promise.resolve({ Language: "en" })),
    setLanguage: jest.fn(() => Promise.resolve()),
  })),
  CONSTANTS: { LOCAL_STORAGE_LANG_KEY: "lang" },
}));

jest.mock("../../i18n", () => ({
  t: (str: string) => str,
  changeLanguage: jest.fn(),
}));

describe("LanguageSelection", () => {
  const theme = createTheme();

  it("renders language selector with default value", async () => {
    render(
      <ThemeProvider theme={theme}>
        <LanguageSelection user={new User()} />
      </ThemeProvider>,
    );

    // Option 1: Use role
    const selectEl = await screen.findByRole("combobox");
    expect(selectEl).toHaveValue("en");
  });
});
