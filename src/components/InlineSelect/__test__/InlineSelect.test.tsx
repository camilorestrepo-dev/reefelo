import { render, screen, fireEvent } from "@testing-library/react";
import InlineSelect from "../InlineSelect";

test("render correctly", () => {
  const mockFn = () => {};
  const component = render(
    <InlineSelect
      label="Tickets Options"
      defaultValue={10}
      options={[
        { label: "10", value: 10 },
        { label: "100", value: 100 },
        { label: "1000", value: 1000 },
      ]}
      onChange={mockFn}
    />,
  );
  expect(component.container).toMatchSnapshot();
});

test("click in the right option", async () => {
  let pressedOption: number;
  const onPressed = (id: number) => {
    pressedOption = id;
  };
  render(
    <InlineSelect
      label="Tickets Options"
      defaultValue={10}
      options={[
        { label: "10", value: 10 },
        { label: "100", value: 100 },
        { label: "1000", value: 1000 },
        { label: "10000", value: 10000 },
      ]}
      onChange={onPressed}
    />,
  );

  expect(screen.getByText("Tickets Options")).toBeInTheDocument();

  const optionBtn = screen.getByText("10000");
  expect(optionBtn).toBeInTheDocument();

  fireEvent.click(optionBtn);
  expect(pressedOption).toBe(10000);
});
