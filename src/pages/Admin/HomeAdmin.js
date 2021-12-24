import React from "react";
import { LoginAdmin } from "./LoginAdmin/LoginAdmin";
import { useAuth } from "../../hooks/useAuth";
import { TopMenu } from "../Admin/Menu/Menu";
import { SideMenu } from "../Admin/SideMenu/SideMenu";
import "./HomeAdmin.scss";

export const HomeAdmin = () => {
  const { auth } = useAuth();
  if (!auth || auth.me?.code === "token_not_valid") return <LoginAdmin />;
  return (
    <div className="admin">
      <div className="admin__menu">
        <TopMenu />
      </div>
      <div className="admin__main-content">
        <SideMenu />
      </div>
    </div>
  );
};
