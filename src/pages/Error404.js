import React from "react";
import { Header, Icon } from "semantic-ui-react";
import "./Error404.scss";

export const Error404 = () => {
  return (
    <div className="error-404">
      <Header as="h1">
        <Icon name="search" />
        <Icon name="meh" />
        <Header.Content>
          Pagina no encontrada
          <Header.Subheader>
            Verifica la direccion a donde quieres acceder
          </Header.Subheader>
        </Header.Content>
      </Header>
    </div>
  );
};
