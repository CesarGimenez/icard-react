import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { useAuth } from "../../../hooks/useAuth";
import "./Menu.scss";

export const TopMenu = () => {
  const {
    auth: {
      me: { username, first_name, last_name, is_staff },
    },
    logout,
  } = useAuth();

  const showName = () => {
    if (first_name && last_name) {
      return `${first_name} ${last_name}`;
    }
    return username;
  };
  return (
    <Menu fixed="top" className="top-menu-admin">
      <Menu.Item className="top-menu-admin__logo">
        {is_staff ? <h3>ICard Admin</h3> : <h3>ICard</h3>}
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>Hola, {showName()}</Menu.Item>
        <Menu.Item onClick={logout}>
          <Icon name="sign-out"></Icon>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
