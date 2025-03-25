import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../src/App";
import { BrowserRouter } from "react-router";

describe("Frontpage", () => {
  it("routes correctly", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const frontPageElement = screen.getByRole("main").childNodes[0];
    expect(frontPageElement).toBeInTheDocument();
  });
});
