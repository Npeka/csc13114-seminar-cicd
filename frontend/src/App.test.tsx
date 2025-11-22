import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the main heading", () => {
    render(<App />);
    expect(screen.getByText(/vite \+ react/i)).toBeInTheDocument();
  });

  it("shows initial counter value as 0", () => {
    render(<App />);
    expect(screen.getByText(/count is 0/i)).toBeInTheDocument();
  });

  it("increments the counter when button is clicked", () => {
    render(<App />);

    const button = screen.getByRole("button", { name: /count is 0/i });

    fireEvent.click(button);
    expect(screen.getByText(/count is 1/i)).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText(/count is 2/i)).toBeInTheDocument();
  });

  it("renders vite and react logos with correct links", () => {
    render(<App />);

    const viteLogo = screen.getByAltText(/vite logo/i);
    const reactLogo = screen.getByAltText(/react logo/i);

    expect(viteLogo).toBeInTheDocument();
    expect(reactLogo).toBeInTheDocument();

    // kiểm tra href
    expect(viteLogo.closest("a")).toHaveAttribute("href", "https://vite.dev");
    expect(reactLogo.closest("a")).toHaveAttribute("href", "https://react.dev");
  });
});
