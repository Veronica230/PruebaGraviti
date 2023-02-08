import { createBrowserRouter } from "react-router-dom";
import { List, QrView, QrGenerator } from "../components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <QrView />,
  },
  {
    path: "/listado",
    element: <List />,
  },
  {
    path: "/generador",
    element: <QrGenerator />,
  }
]);
