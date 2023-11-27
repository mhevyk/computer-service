import { Link } from "react-router-dom";
import { ProfileDropDown } from "./components/ProfileDropdown";
import { CartIcon } from "./components/CartIcon";
import { renderCenterMenu } from "./utils/renderCenterMenu";
import { renderMobileMenu } from "./utils/renderMobileMenu";

export function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="lg:hidden">{renderMobileMenu()}</div>
        <Link className="btn btn-ghost text-xl uppercase" to="">
          Computer service
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">{renderCenterMenu()}</div>
      <div className="navbar-end">
        <div className="flex-none">
          <CartIcon />
          <ProfileDropDown />
        </div>
      </div>
    </div>
  );
}