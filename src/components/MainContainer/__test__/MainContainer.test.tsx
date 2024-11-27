import { render } from "@testing-library/react";
import MainContainer from "../MainContainer";

test("reder corectly", () => {
  const component = render(
    <MainContainer>
      <div>Some content</div>
    </MainContainer>,
  );
  expect(component.container).toMatchSnapshot();
});
