import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();

  const isRouteError = isRouteErrorResponse(error);

  return (
    <div
      className="flex flex-col h-screen gap-4 justify-center items-start pl-[20vw] bg-no-repeat"
      style={{
        backgroundImage: "url(/assets/astronaut.png)",
        backgroundPosition: "90% 50%",
      }}
    >
      <h1 className="text-[60px] font-bold uppercase">Упс</h1>
      <p>
        На жаль, виникла помилка.
        <br />
        Спробуйте пізніше або зверніться до адміністратора
      </p>
      <Link to="/app" className="btn btn-accent">
        На головну
      </Link>
      {import.meta.env.MODE !== "production" && (
        <div className="collapse max-w-xl">
          <input type="checkbox" />
          <div className="collapse-title pl-0 text-gray-600">
            Відомості про помилку...
          </div>
          <div className="collapse-content px-4 overflow-x-auto">
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
          </div>
        </div>
      )}
    </div>
  );
}
