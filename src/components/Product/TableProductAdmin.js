import React from "react";
import { Table, Button, Icon, Image } from "semantic-ui-react";
import { map } from "lodash";
import { useAuth } from "../../hooks/useAuth";
import "./TableProductAdmin.scss";

export const TableProductAdmin = ({ products, updateProduct, showConfirm }) => {
  const { auth } = useAuth();
  return (
    <Table className="table-product-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Imagen</Table.HeaderCell>
          <Table.HeaderCell>Nombre</Table.HeaderCell>
          <Table.HeaderCell>Precio</Table.HeaderCell>
          <Table.HeaderCell>Categoria</Table.HeaderCell>
          <Table.HeaderCell>Activo</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {map(products, (product, index) => (
          <Table.Row key={index}>
            <Table.Cell width={2}>
              <Image src={product.image} />
            </Table.Cell>
            <Table.Cell>{product.title}</Table.Cell>
            <Table.Cell>{product.price} $</Table.Cell>
            <Table.Cell>
              {product.category_data?.title || "Sin categoria"}
            </Table.Cell>
            <Table.Cell>
              {product.active ? <Icon name="check" /> : <Icon name="close" />}
            </Table.Cell>
            {auth.me.is_staff && (
              <Actions
                product={product}
                updateProduct={updateProduct}
                showConfirm={showConfirm}
              />
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const Actions = ({ product, updateProduct, showConfirm }) => {
  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => updateProduct(product)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => showConfirm(product)}>
        <Icon name="trash" />
      </Button>
    </Table.Cell>
  );
};
