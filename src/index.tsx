import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store/store";
import { ErrorPage } from "./routes/error";
import { ItemsPage } from "./routes/items";
import { StatsPage } from "./routes/stats";
import { initDB } from "./db";
import { setItems } from "./features/items/itemsSlice";
import { setPeriods } from "./features/periods/periodsSlice";
import { setTags } from "./features/tags/tagsSlice";

const router = createBrowserRouter([
  {
    path: `/wallet`,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/wallet",
        element: <ItemsPage />,
      },
      {
        path: "/wallet/stats",
        element: <StatsPage />,
      },
    ],
  },
]);

initDB().then(({ tags, items, periods }) => {
  store.dispatch(setItems(items));
  store.dispatch(setTags(tags))
  store.dispatch(setPeriods(periods))
})

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
