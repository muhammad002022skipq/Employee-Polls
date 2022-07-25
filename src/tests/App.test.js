import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../reducers";
import middleware from "../middleware";
import { BrowserRouter } from "react-router-dom";
import App from "../components/App";

const store = createStore(reducer, middleware);

describe("Snapshot test", () => {
  it("Will match Snapshot", () => {
    let component = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});

describe("DOM tests", () => {
  it("will check the Error Alert on click fireEvent", async () => {
    let component = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    let loginBtn = component.getByTestId("login-btn");
    fireEvent.click(loginBtn);
    let loginError = component.getByTestId("login-error");
    expect(loginError).toBeInTheDocument();
  });

  it("will check the the employee poll", async () => {
    let component = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    let employeePoll = component.getByTestId("employee-polls");
    expect(employeePoll).toBeInTheDocument();
  });

  it("will check the the icon on page", async () => {
    let component = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    let icon = component.getByTestId("icon");
    expect(icon).toBeInTheDocument();
  });
  it("will check the the Selector on page", async () => {
    let component = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    let selectUser = component.getByTestId("select-user");
    expect(selectUser).toBeInTheDocument();
  });
  it("will check the the Form on page", async () => {
    let component = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    let userForm = component.getByTestId("user-form");
    expect(userForm).toBeInTheDocument();
  });
});
