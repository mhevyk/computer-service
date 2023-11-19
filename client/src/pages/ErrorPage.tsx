import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();

  const isRouteError = isRouteErrorResponse(error);

  return (
    <>
      <h1>Error - Something went wrong</h1>
      {import.meta.env.MODE !== "production" && (
        <>
          {isRouteError && (
            <>
              <pre>Route error occured: </pre>
              <pre>{error.status}</pre>
              <pre>{error.statusText}</pre>
              {error.data?.message && <pre>{error.data.message}</pre>}
            </>
          )}
          {!isRouteError && error instanceof Error && (
            <>
              <pre>{error.message}</pre>
              {error.stack && <pre>{error.stack}</pre>}
            </>
          )}
        </>
      )}
    </>
  );
}
