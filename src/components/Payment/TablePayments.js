import React, { useReducer, useState } from "react";
import { Button, Icon, Table } from "semantic-ui-react";
import { map, orderBy } from "lodash";
import moment from "moment";
import { ModalBasic } from "../Common/ModalBasic/ModalBasic";
import { PaymentProductsList } from "./PaymentProductsList";

export const TablePayments = ({ payments }) => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setcontentModal] = useState(null);
  const [sort, setSort] = useState(false);
  const [orderPayments, setOrderPayments] = useState(payments);

  const getIconPayment = (key) => {
    if (key === "CARD") return "credit card outline";
    if (key === "CASH") return "money bill alternate outline";
    return null;
  };

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onShowDetails = (payment) => {
    setTitleModal(`Detalle de factura '${payment.id}'`);
    setcontentModal(<PaymentProductsList payment={payment} />);
    openCloseModal();
  };

  const handleSort = (column) => {
    setSort(!sort);
    setOrderPayments(orderBy(payments, column, sort ? "asc" : "desc"));
  };

  return (
    <div>
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={sort ? "ascending" : "descending"}
              onClick={() => handleSort("id")}
            >
              ID
            </Table.HeaderCell>
            <Table.HeaderCell>Mesa</Table.HeaderCell>
            <Table.HeaderCell>Mesero</Table.HeaderCell>
            <Table.HeaderCell
              sorted={sort ? "ascending" : "descending"}
              onClick={() => handleSort("totalPayment")}
            >
              Total
            </Table.HeaderCell>
            <Table.HeaderCell>Tipo de pago</Table.HeaderCell>
            <Table.HeaderCell>Fecha</Table.HeaderCell>
            <Table.HeaderCell>Ver detalle</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {map(orderPayments, (payment, index) => (
            <Table.Row key={index}>
              <Table.Cell>{payment.id}</Table.Cell>
              <Table.Cell>{payment.table_data?.number}</Table.Cell>
              <Table.Cell>
                {payment.waiter_data?.first_name
                  ? payment.waiter_data?.first_name
                  : "Sin mesero"}
              </Table.Cell>
              <Table.Cell>{payment.totalPayment} $</Table.Cell>
              <Table.Cell>
                <Icon name={getIconPayment(payment.paymentType)} />
              </Table.Cell>
              <Table.Cell>
                {moment(payment.created_at).format("DD/MM/YYYY - HH:MM")}
              </Table.Cell>
              <Table.Cell textAlign="center">
                <Button icon onClick={() => onShowDetails(payment)}>
                  <Icon name="eye" />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <ModalBasic
        show={showModal}
        title={titleModal}
        onClose={openCloseModal}
        content={contentModal}
      />
    </div>
  );
};
