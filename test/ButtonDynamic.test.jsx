import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ButtonDynamic } from "../src/components/ButtonDynamic";

describe("ButtonDynamic Component", () => {
  it("renders with the correct text", () => {
    // Arrange
    render(<ButtonDynamic>Click me</ButtonDynamic>);

    // Act - in this simple case, just rendering is enough
    const buttonElement = screen.getByText("Click me");

    // Assert
    expect(buttonElement).toBeInTheDocument();
  });

  it("applies size class correctly", () => {
    render(<ButtonDynamic size="large">Button</ButtonDynamic>);
    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toHaveClass("button default large");
  });
});
