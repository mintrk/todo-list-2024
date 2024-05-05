import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.ts";
import IThemeProvider from "./providers/ThemeProvider.tsx";
import ProjectPage from "./pages/Project.tsx";

import { PersistGate } from "redux-persist/integration/react";
import TodoPage from "./pages/Todo.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/projects",
    element: <ProjectPage />,
  },
  {
    path: "/todo/:id",
    element: <TodoPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IThemeProvider>
          <RouterProvider router={router} />
        </IThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
