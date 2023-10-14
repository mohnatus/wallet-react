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
import { addPeriodToDb, initDB, updatePeriodInDb } from "./db";
import { setItems } from "./features/items/itemsSlice";
import { setPeriods } from "./features/periods/periodsSlice";
import { setTags } from "./features/tags/tagsSlice";
import { routes } from "./constants/routes";

const router = createBrowserRouter([
  {
    path: routes.root,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: routes.root,
        element: <ItemsPage />,
      },
      {
        path: routes.stats,
        element: <StatsPage />,
      },
    ],
  },
]);

initDB().then(({ tags, items, periods }) => {
  if (!periods.length || periods[0].createdAt === null) {
    const firstItemDate = items.reduce((min, item) => {
      let minDate = Math.min(min, item.createdAt);

      (item.subitems || []).forEach((subitem) => {
        minDate = Math.min(minDate, subitem.createdAt);
      });

      return minDate;
    }, +new Date());

    if (!periods.length) {
      const period = {
        id: 0,
        createdAt: firstItemDate,
        name: "Начало",
      };

      periods.push(period);

      addPeriodToDb(period);
    } else {
      periods[0].createdAt = firstItemDate;
      updatePeriodInDb(periods[0]);
    }
  }

  store.dispatch(setItems(items));
  store.dispatch(setTags(tags));
  store.dispatch(setPeriods(periods));
});

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
