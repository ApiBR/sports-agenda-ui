import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect } from "vitest";
import App from "../src/App";

describe("App component", () => {
  test("renders Vite and React logos", () => {
    render(<App />);
    const viteLogo = screen.getByAltText("Vite logo");
    const reactLogo = screen.getByAltText("React logo");
    expect(viteLogo).toBeInTheDocument();
    expect(reactLogo).toBeInTheDocument();
  });

  test("renders the heading", () => {
    render(<App />);
    const heading = screen.getByText(/Vite \+ React/i);
    expect(heading).toBeInTheDocument();
  });

  test("renders the button and increments count on click", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /count is 0/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(button).toHaveTextContent("count is 1");
  });

  test("renders the edit message", () => {
    render(<App />);
    const editMessage = screen.getByText(/and save to test HMR/i);
    expect(editMessage).toBeInTheDocument();
  });
});
