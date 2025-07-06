import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "next-themes";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { ToastProvider } from "./components/ui/use-toast.tsx";
import { BrowserRouter, HashRouter } from "react-router-dom";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastProvider>
            <App />
        </ToastProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
