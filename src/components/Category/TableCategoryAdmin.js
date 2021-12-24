import React from "react";
import { Table, Button, Icon, Image } from "semantic-ui-react";
import { map } from "lodash";
import "./TableCategoryAdmin.scss";
import { useAuth } from "../../hooks/useAuth";

export const TableCategoryAdmin = ({
  categories,
  updateCategory,
  showConfirm,
}) => {
  const { auth } = useAuth();
  return (
    <Table className="table-category-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Imagen</Table.HeaderCell>
          <Table.HeaderCell>Nombre</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {map(categories, (category, index) => (
          <Table.Row key={index}>
            <Table.Cell width={2}>
              <Image src={category.image} />
            </Table.Cell>
            <Table.Cell>{category.title}</Table.Cell>
            {auth.me.is_staff && (
              <Actions
                category={category}
                updateCategory={updateCategory}
                showConfirm={showConfirm}
              />
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const Actions = ({ category, updateCategory, showConfirm }) => {
  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => updateCategory(category)}>
        <Icon name="pencil"></Icon>
      </Button>
      <Button icon negative onClick={() => showConfirm(category)}>
        <Icon name="trash"></Icon>
      </Button>
    </Table.Cell>
  );
};
