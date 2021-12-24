import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";
import "./TableUser.scss";

export const TableUsers = ({ users, updateUser, showConfirm }) => {
  return (
    <div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Apellido</Table.HeaderCell>
            <Table.HeaderCell>Activo</Table.HeaderCell>
            <Table.HeaderCell>Staff</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {map(users, (user, index) => (
            <Table.Row key={index}>
              <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.first_name}</Table.Cell>
              <Table.Cell>{user.last_name}</Table.Cell>
              <Table.Cell>
                {user.is_active ? <Icon name="check" /> : <Icon name="close" />}
              </Table.Cell>
              <Table.Cell>
                {user.is_staff ? <Icon name="check" /> : <Icon name="close" />}
              </Table.Cell>

              <Actions
                user={user}
                updateUser={updateUser}
                showConfirm={showConfirm}
              />
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

const Actions = ({ user, updateUser, showConfirm }) => {
  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => updateUser(user)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => showConfirm(user)}>
        <Icon name="trash" />
      </Button>
    </Table.Cell>
  );
};
