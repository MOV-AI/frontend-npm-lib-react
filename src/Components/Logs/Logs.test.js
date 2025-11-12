import React from "react";
import "@testing-library/jest-dom";
import Logs, { logsDedupe } from "./Logs.js";
import { render, waitFor, findByText } from "@testing-library/react";
import withTheme from "./../HOCs/withTheme";

describe("Dedupes logs correctly", () => {
  // this first test is based on an algorithm
  // that does not keep relative order. If that's
  // something we're interested in. We have to change it
  it("Dedupes without keeping relative order", () => {
    const a = [
      { timestamp: 1, message: "e" },
      { timestamp: 1, message: "c" },
      { timestamp: 0, message: "b" },
      { timestamp: 0, message: "a" },
    ];
    const b = [
      { timestamp: 2, message: "f" },
      { timestamp: 1, message: "e" },
      { timestamp: 1, message: "d" },
      { timestamp: 1, message: "c" },
    ];
    expect(logsDedupe(a, b)).toEqual([
      { timestamp: 2, message: "f" },
      { timestamp: 1, message: "d" },
      { timestamp: 1, message: "e" },
      { timestamp: 1, message: "c" },
      { timestamp: 0, message: "b" },
      { timestamp: 0, message: "a" },
    ]);
  });

  it("returns deduped logs 1", () => {
    const a = [
      { timestamp: 1, message: "c" },
      { timestamp: 0, message: "b" },
      { timestamp: 0, message: "a" },
    ];
    const b = [
      { timestamp: 2, message: "f" },
      { timestamp: 1, message: "e" },
      { timestamp: 1, message: "d" },
      { timestamp: 1, message: "c" },
    ];
    expect(logsDedupe(a, b)).toEqual([
      { timestamp: 2, message: "f" },
      { timestamp: 1, message: "e" },
      { timestamp: 1, message: "d" },
      { timestamp: 1, message: "c" },
      { timestamp: 0, message: "b" },
      { timestamp: 0, message: "a" },
    ]);
  });
});

describe("Logs component (smoke test)", () => {
  it("renders without crashing", async () => {
    // Dynamically import React and testing utilities
    const robotsData = [{ name: "robot1" }];
    const Themed = withTheme(Logs);
    const { container } = render(<Themed robotsData={robotsData} />);
    await waitFor(() => findByText(container, "robot1"));
    expect(container).toBeInTheDocument();
  });
});
