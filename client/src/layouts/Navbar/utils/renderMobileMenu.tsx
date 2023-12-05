import { Icon } from "@iconify/react";
import { Dropdown } from "../../../components/ui/Dropdown";
import { NavLink } from "../../../components/ui/NavLink";
import { MenuItem, menu } from "../components/menu";
import { concatPaths } from "./concatPaths";

function renderItem(item: MenuItem) {
  if (item.children) {
    return (
      <>
        <NavLink to={item.path}>{item.label}</NavLink>
        <ul className="p-2">
          {item.children.map(childItem => (
            <li key={childItem.label}>
              <NavLink to={concatPaths(item.path, childItem.path)}>
                {childItem.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return <NavLink to={item.path}>{item.label}</NavLink>;
}

export function renderMobileMenu() {
  return (
    <Dropdown
      items={menu}
      renderItem={item => renderItem(item)}
      hideCaretIcon
      label={<Icon icon="iconamoon:menu-burger-horizontal-bold" />}
      size="md"
    />
  );
}
