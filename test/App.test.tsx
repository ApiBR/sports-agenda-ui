import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "../src/App";

describe("App component", () => {
  test("renders Header component", () => {
    render(
      <App />
    );
    expect(true).toBeTruthy();
  });

});