import { Logo } from "../src/components/NavBar/Logo";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router";

describe("Logo", () => {
  it("renders correctly ", () => {
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );
    const logoElement = screen.getByRole("link").childNodes[0];
    expect(logoElement).toBeInTheDocument();
  });

  it("is visible for user ", () => {
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );
    const logoElement = screen.getByRole("link").childNodes[0];
    expect(logoElement).toBeVisible();
  });

  it("contains the correct attribute", () => {
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );
    const logoElement = screen.getByRole("link").childNodes[0];
    expect(logoElement).toHaveAttribute("id", "logo");
  });
});
