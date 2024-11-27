import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import Header from "../Header";
import i18n from "../../../locale";

// Mock the custom hook `useAuth`
jest.mock("../../../hooks/useAuth", () => ({
  useAuth: jest.fn(() => ({
    signInError: "",
    signInLoading: false,
    clearSignInError: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
  })),
}));

// Render providing a Browser Router context
const renderWithRouter = (ui: React.ReactNode) => {
  window.history.pushState({}, "Test page", "/");
  return render(ui, { wrapper: BrowserRouter });
};

test("render correctly", () => {
  const component = renderWithRouter(
    // Render within an i18n context
    <I18nextProvider i18n={i18n}>
      <Header />
    </I18nextProvider>,
  );
  expect(component.container).toMatchSnapshot();
});
