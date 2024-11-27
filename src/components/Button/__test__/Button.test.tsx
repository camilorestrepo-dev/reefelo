import { render } from "@testing-library/react";
import Button, { ButtonProps } from "../Button";

const props: ButtonProps = {
  label: "Some button",
  variant: "solid",
};

test("render solid", () => {
  const component = render(<Button {...props} />);
  expect(component.container).toMatchSnapshot();
});

test("render outline", () => {
  const newProps: ButtonProps = { ...props, variant: "outline" };
  const component = render(<Button {...newProps} />);
  expect(component.container).toMatchSnapshot();
});

test("render link", () => {
  const newProps: ButtonProps = { ...props, variant: "link" };
  const component = render(<Button {...newProps} />);
  expect(component.container).toMatchSnapshot();
});
