import { render } from "@testing-library/react";
import FormInputText from "../FormInputText";

test("reder corectly", () => {
  const component = render(
    <FormInputText
      defaultValue="hello"
      label="Description"
      name="desc"
      placeholder="Type description"
    />,
  );
  expect(component.container).toMatchSnapshot();
});
