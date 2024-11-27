import { render } from "@testing-library/react";
import EmptyState from "../EmptyState";

test("render correctly", () => {
  const component = render(<EmptyState />);
  expect(component.container).toMatchSnapshot();
});
