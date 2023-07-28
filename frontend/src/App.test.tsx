import { render } from "@testing-library/react";
import App from "./App";

test("Correctly calculate overall score", () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId("happinessScore").textContent).toMatch(/\d+/); // Match any positive integer
});

test("Correctly group data and show table", () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId("FreeTextTable").textContent).toMatch(
    /Free text|First item in list|another one/
  );
});
