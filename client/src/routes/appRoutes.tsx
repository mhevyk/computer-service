import { Navigate, RouteObject } from "react-router-dom";
import { NotFoundPage } from "@pages/NotFoundPage";
import { CartPage } from "@pages/CartPage";
import { ChooseComputerTypePage } from "@pages/Computers/ChooseComputerTypePage";
import { FactoryComputersPage } from "@pages/Computers/FactoryComputersPage";
import { ComputerDetailsPage } from "@pages/Computers/ComputerDetailsPage";
import { OrdersPage } from "@pages/OrdersPage";

export const appRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="computers" />,
  },
  {
    path: "computers",
    children: [
      {
        index: true,
        element: <ChooseComputerTypePage />,
      },
      {
        path: "factory",
        children: [
          { index: true, element: <FactoryComputersPage /> },
          { path: ":computerId", element: <ComputerDetailsPage /> },
        ],
      },
    ],
  },
  { path: "cart", element: <CartPage /> },
  { path: "orders", element: <OrdersPage /> },
  { path: "*", element: <NotFoundPage /> },
];
