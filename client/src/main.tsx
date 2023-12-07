import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/ThemeContext/ThemeProvider";
import { SnackbarProvider } from "notistack";
import { ErrorSnackbar } from "./components/Snackbar";
import { CartProvider } from "./context/CartContext/CartProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SnackbarProvider
          Components={{
            error: ErrorSnackbar,
          }}
        >
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
