import { Fragment } from "react";
import { Button } from "../../../components/ui/Button";
import { Dropdown } from "../../../components/ui/Dropdown";
import { NavLink } from "../../../components/ui/NavLink";
import { MenuItem, menu as rootMenu } from "../components/menu";
import { concatPaths } from "./concatPaths";

function renderMenuItems(item: MenuItem) {
  if (item.children) {
    return (
      <Dropdown
        label={<NavLink to={item.path}>{item.label}</NavLink>}
        items={item.children}
        renderItem={childItem => (
          <NavLink to={concatPaths(item.path, childItem.path)}>
            {childItem.label}
          </NavLink>
        )}
      />
    );
  }

  return (
    <Button variant="ghost" size="sm">
      <NavLink to={item.path}>{item.label}</NavLink>
    </Button>
  );
}

export function renderCenterMenu() {
  return (
    <ul className="menu menu-horizontal px-1">
      {rootMenu.map(item => (
        <Fragment key={item.label}>{renderMenuItems(item)}</Fragment>
      ))}
    </ul>
  );
}
