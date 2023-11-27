import {
  NavLinkProps,
  NavLink as ReactRouterDomNavLink,
} from "react-router-dom";
import { twMerge } from "tailwind-merge";

export function NavLink({ className, ...rest }: NavLinkProps) {
  return (
    <ReactRouterDomNavLink
      className={({ isActive }) =>
        twMerge(className as string, isActive && "text-accent")
      }
      {...rest}
    ></ReactRouterDomNavLink>
  );
}
