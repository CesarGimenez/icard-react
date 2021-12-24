import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { useOrder } from "../../hooks/useOrder";
import { usePayment } from "../../hooks/usePayment";

export const PaymentDetails = ({
  payment,
  orders,
  openCloseModal,
  onReload,
}) => {
  const { closePayment } = usePayment();
  const { closeOrder } = useOrder();
  const getIconPayment = (key) => {
    if (key === "CARD") return "credit card outline";
    if (key === "CASH") return "money bill alternate outline";
    return null;
  };

  const onClosePayment = async () => {
    await closePayment(payment[0].id);
    for await (const order of orders) {
      await closeOrder(order.id);
    }
    onReload();
    openCloseModal();
  };

  return (
    <div>
      <Table striped>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Mesa</Table.Cell>
            <Table.Cell>{payment[0].table_data?.number}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Mesero</Table.Cell>
            <Table.Cell>{payment[0].waiter_data?.first_name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Total</Table.Cell>
            <Table.Cell>{payment[0].totalPayment} $</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Metodo de pago</Table.Cell>
            <Table.Cell>
              <Icon name={getIconPayment(payment[0].paymentType)} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button fluid primary onClick={() => onClosePayment()}>
        Marcar como pagado y cerrar mesa
      </Button>
    </div>
  );
};
