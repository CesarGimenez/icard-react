import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, useLocation, Route, Routes } from "react-router-dom";
import "./SideMenu.scss";
import { Products } from "../Products/Products";
import { Categories } from "../Categories/Categories";
import { useAuth } from "../../../hooks/useAuth";
import { Users } from "../Users/Users";
import { Tables } from "../Tables/Tables";
import { Orders } from "../Orders/Orders";
import { TableDetailsAdmin } from "../Tables/TableDetailsAdmin";
import { PaymentsHistory } from "../Payments/PaymentsHistory";

export const SideMenu = () => {
  const { pathname } = useLocation();
  const { auth } = useAuth();
  return (
    <div>
      <div className="side-menu-admin">
        <Menu
          fixed="left"
          borderless
          className="side"
          vertical
          pathname={pathname}
        >
          <Menu.Item as={Link} to={"/admin"} active={pathname === "/admin"}>
            <Icon name="home" /> Pedidos
          </Menu.Item>
          <Menu.Item
            as={Link}
            to={"/admin/tables"}
            active={pathname === "/admin/tables"}
          >
            <Icon name="table" /> Mesas
          </Menu.Item>
          <Menu.Item
            as={Link}
            to={"/admin/categories"}
            active={pathname === "/admin/categories"}
          >
            <Icon name="folder" /> Categorias
          </Menu.Item>
          <Menu.Item
            as={Link}
            to={"/admin/products"}
            active={pathname === "/admin/products"}
          >
            <Icon name="cart" /> Productos
          </Menu.Item>
          {auth.me?.is_staff && (
            <Menu.Item
              as={Link}
              to={"/admin/users"}
              active={pathname === "/admin/users"}
            >
              <Icon name="users" /> Usuarios
            </Menu.Item>
          )}
          <Menu.Item
            as={Link}
            to={"/admin/payments"}
            active={pathname === "/admin/payments"}
          >
            <Icon name="history" /> Historial de pagos
          </Menu.Item>
        </Menu>
        <div className="content">
          <Routes>
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
            <Route path="tables" element={<Tables />} />
            <Route path="payments" element={<PaymentsHistory />} />
            <Route path="" element={<Orders />} />
            <Route path="tables/:id" element={<TableDetailsAdmin />} />
          </Routes>
        </div>
      </div>
      <div className="menu-admin-mobile">
        <Menu
          fixed="bottom"
          horizontal="true"
          widths={auth.me.is_staff ? 6 : 5}
          pathname={pathname}
        >
          <Menu.Item as={Link} to={"/admin"} active={pathname === "/admin"}>
            <Icon name="home" />
          </Menu.Item>
          <Menu.Item
            as={Link}
            to={"/admin/tables"}
            active={pathname === "/admin/tables"}
          >
            <Icon name="table" />
          </Menu.Item>
          <Menu.Item
            as={Link}
            to={"/admin/categories"}
            active={pathname === "/admin/categories"}
          >
            <Icon name="folder" />
          </Menu.Item>
          <Menu.Item
            as={Link}
            to={"/admin/products"}
            active={pathname === "/admin/products"}
          >
            <Icon name="cart" />
          </Menu.Item>
          {auth.me?.is_staff && (
            <Menu.Item
              as={Link}
              to={"/admin/users"}
              active={pathname === "/admin/users"}
            >
              <Icon name="users" />
            </Menu.Item>
          )}
          <Menu.Item
            as={Link}
            to={"/admin/payments"}
            active={pathname === "/admin/payments"}
          >
            <Icon name="history" />
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};
