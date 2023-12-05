import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/ThemeContext/ThemeProvider";
import { SnackbarProvider } from "notistack";
import { ErrorSnackbar } from "./components/Snackbar";

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
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
