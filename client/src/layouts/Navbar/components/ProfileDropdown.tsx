import { useLogout } from "../../../features/authentication/hooks/useLogout";
import { useUser } from "../../../features/authentication/hooks/useUser";

function composeInitials(username: string) {
  return username.slice(0, 2).toUpperCase();
}

export function ProfileDropDown() {
  const logout = useLogout();
  const { user } = useUser();

  return (
    <div className="dropdown dropdown-end">
      <div className="avatar placeholder cursor-pointer" tabIndex={0}>
        <div className="bg-neutral text-neutral-content rounded-full w-12">
          <span>{composeInitials(user.username)}</span>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a onClick={() => logout()}>Вихід</a>
        </li>
      </ul>
    </div>
  );
}
