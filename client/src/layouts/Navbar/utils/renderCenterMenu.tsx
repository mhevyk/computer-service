import { Fragment } from "react";
import { Button } from "@components/Button";
import { Dropdown } from "@components/Dropdown";
import { NavLink } from "@components/NavLink";
import { MenuItem, menu as rootMenu } from "../menu";
import { concatPaths } from "./concatPaths";

function renderMenuItems(item: MenuItem) {
  if (item.children) {
    return (
      <Dropdown
        label={<NavLink to={item.path}>{item.label}</NavLink>}
        items={item.children}
        renderItem={(childItem) => (
          <NavLink to={concatPaths(item.path, childItem.path)}>
            {childItem.label}
          </NavLink>
        )}
      />
    );
  }

  return (
    <Button variant="ghost" size="sm" as={NavLink} to={item.path}>
      {item.label}
    </Button>
  );
}

export function renderCenterMenu() {
  return (
    <ul className="menu menu-horizontal px-1">
      {rootMenu.map((item) => (
        <Fragment key={item.label}>{renderMenuItems(item)}</Fragment>
      ))}
    </ul>
  );
}
