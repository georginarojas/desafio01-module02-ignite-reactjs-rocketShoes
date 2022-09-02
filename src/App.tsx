import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import Routes from "./routes";
import GlobalStyles from "./styles/global";
import Header from "./components/Header";
import store from "./state-management/store";

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <GlobalStyles />
          <Header />
          <Routes />
          <ToastContainer autoClose={3000} />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
