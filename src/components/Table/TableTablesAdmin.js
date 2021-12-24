import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";
import { useAuth } from "../../hooks/useAuth";

export const TableTablesAdmin = ({ tables, updateTable, showConfirm }) => {
  const { auth } = useAuth();
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Numero de mesa</Table.HeaderCell>
          <Table.HeaderCell>Ultima atencion</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(tables, (table, index) => (
          <Table.Row key={index}>
            <Table.Cell>{table.number}</Table.Cell>
            <Table.Cell>
              {table.waiter ? table.waiter_data.first_name : "Sin mesero"}
            </Table.Cell>
            {auth.me.is_staff && (
              <Actions
                updateTable={updateTable}
                table={table}
                showConfirm={showConfirm}
              />
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const Actions = ({ updateTable, table, showConfirm }) => {
  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => updateTable(table)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => showConfirm(table)}>
        <Icon name="trash" />
      </Button>
    </Table.Cell>
  );
};
