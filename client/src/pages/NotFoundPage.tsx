import { useUser } from "@features/authentication/hooks/useUser";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  const user = useUser();

  return (
    <div
      className="flex flex-col gap-4 justify-center items-start pl-[20vw] h-full bg-no-repeat"
      style={{
        backgroundImage: "url(/assets/astronaut.png)",
        backgroundPosition: "90% 50%",
      }}
    >
      <h1 className="text-[60px] font-bold">404</h1>
      <p>На жаль, ми не змогли знайти сторінку, яку Ви шукаєте</p>
      <Link to={user ? "/app" : "/auth/login"} className="btn btn-accent">
        На головну
      </Link>
    </div>
  );
}
