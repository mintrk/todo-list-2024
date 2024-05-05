import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import IThemeProvider from "./providers/ThemeProvider.tsx";
import Project from "./pages/Project.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/projects",
    element: <Project />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <IThemeProvider>
        <RouterProvider router={router} />
      </IThemeProvider>
    </Provider>
  </React.StrictMode>
);
