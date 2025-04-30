import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { unstableSetRender } from "antd";
import "./index.css";
import App from "./App.jsx";
import store from "./store";
import { Provider } from "react-redux";

// Fix for Ant Design's static components in React 19
unstableSetRender((node, container) => {
  container._reactRoot ||= createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
