import { useUser } from "../features/authentication/hooks/useUser";

export function DashboardPage() {
  const user = useUser();

  return (
    <div>
      <h1>Dashboard</h1>
      User is: {JSON.stringify(user)}
    </div>
  );
}
