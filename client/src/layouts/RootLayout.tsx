import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import { Navbar } from "./Navbar";

export function RootLayout() {
  const { state } = useNavigation();
  const isLoading = state === "loading";

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <ScrollRestoration />
      {isLoading && <div className="loading-spinner" />}
      <div className={`container flex-1 ${isLoading ? "loading" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
}
