import { render } from "@testing-library/react";
import FormInputText from "../FormInputText";

test("reder corectly", () => {
  const component = render(
    <FormInputText value="hello" label="Description" name="desc" placeholder="Type description" />,
  );
  expect(component.container).toMatchSnapshot();
});

test("reder corectly with error", () => {
  const component = render(
    <FormInputText
      value="hello"
      label="Description"
      name="desc"
      placeholder="Type description"
      error="Required field"
    />,
  );
  expect(component.container).toMatchSnapshot();
});
