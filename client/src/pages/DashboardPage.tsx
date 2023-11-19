import { useLogout } from "../auth/useLogout";
import { useUser } from "../auth/useUser";

export function DashboardPage() {
  const user = useUser();
  const logout = useLogout();

  return (
    <div>
      <h1>Dashboard</h1>
      User is: {JSON.stringify(user)}
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
