import { render } from "@testing-library/react";
import Checkbox from "../Checkbox";

test("reder corectly", () => {
  const component = render(<Checkbox value={true} label="Description" name="desc" />);
  expect(component.container).toMatchSnapshot();
});

test("reder corectly with error", () => {
  const component = render(
    <Checkbox value={false} label="Description" name="desc" error="Required field" />,
  );
  expect(component.container).toMatchSnapshot();
});
