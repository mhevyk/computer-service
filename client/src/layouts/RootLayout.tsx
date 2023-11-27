import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import { Navbar } from "./Navbar";

export function RootLayout() {
  const { state } = useNavigation();
  const isLoading = state === "loading";

  return (
    <>
      <Navbar />
      <ScrollRestoration />
      {isLoading && <div className="loading-spinner" />}
      <div className={`container px-2 ${isLoading ? "loading" : ""}`}>
        <Outlet />
      </div>
    </>
  );
}
