import { Link } from "react-router-dom";
import { ThemeSwitch } from "../components/ui/ThemeSwitch";
import { Button } from "../components/ui/Button";
import { useUser } from "../features/authentication/hooks/useUser";
import { useLogout } from "../features/authentication/hooks/useLogout";

export function Navbar() {
  const userData = useUser();
  const logout = useLogout();

  return (
    <nav className="top-nav">
      <div className="nav-text-large">My App</div>
      <ul className="nav-list">
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/todos">Todos</Link>
        </li>
        {userData && <Button onClick={() => logout()}>Вихід</Button>}
        <ThemeSwitch />
      </ul>
    </nav>
  );
}
