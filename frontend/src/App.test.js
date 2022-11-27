import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the app without error", async () => {
  render(<App />);
  const mainApp = await screen.findByTestId("app");
  expect(mainApp).toBeInTheDocument();
});
