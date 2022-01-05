import React, { useEffect, useState } from "react";
import { Button, Loader } from "semantic-ui-react";
import { map, size, forEach } from "lodash";
import { useParams } from "react-router-dom";
import { useOrder } from "../../../hooks/useOrder";
import { useTable } from "../../../hooks/useTable";
import { usePayment } from "../../../hooks/usePayment";
import { OrderItem } from "./OrderItem";
import { ModalBasic } from "../../../components/Common/ModalBasic/ModalBasic";
import { TypePayment } from "./TypePayment";

export const ClientOrders = () => {
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { createPayment, getPaymentByTable } = usePayment();
  const [idOfTable, setIdOfTable] = useState(null);
  const [requestTable, setRequestTable] = useState(null);
  const { getTableByNumberTow } = useTable();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  const openCloseModal = () => {
    setShowModal((prev) => !prev);
  };
  useEffect(() => {
    (async () => {
      const table = await getTableByNumberTow(id);
      const idTable = table[0].id;
      setIdOfTable(idTable);
      await getOrdersByTable(idTable, "", "ordering=-status,-created_at");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (idOfTable) {
        const response = await getPaymentByTable(idOfTable);
        setRequestTable(response);
      }
    })();
  }, [idOfTable]);

  const onCreatePayment = async (paymentType) => {
    setShowModal(false);
    console.log(`Tipo de pago: ${paymentType}`);
    let totalPayment = 0;
    forEach(orders, (order) => {
      totalPayment += Number(order.product_data.price);
    });
    const paymentData = {
      table: idOfTable,
      totalPayment: totalPayment.toFixed(2),
      paymentType,
      statusPayment: "PENDING",
    };
    const payment = await createPayment(paymentData);
    for await (const order of orders) {
      await addPaymentToOrder(order.id, payment.id);
    }
    window.location.reload();
  };

  return (
    <div>
      <h1>Historial de pedidos</h1>
      {loading ? (
        <Loader active inline="centered"></Loader>
      ) : size(orders) < 1 ? (
        <span>Aun no realiza ningun pedido</span>
      ) : (
        <>
          {size(orders) > 0 && (
            <Button
              positive
              fluid
              content={
                size(requestTable) < 1
                  ? "Pedir la cuenta"
                  : "La cuenta ya fue pedida"
              }
              onClick={() => size(requestTable) === 0 && openCloseModal()}
            />
          )}
          {map(orders, (order, index) => (
            <OrderItem order={order} key={order.id} />
          ))}
        </>
      )}
      <ModalBasic
        title="Decida su metodo de pago"
        show={showModal}
        onClose={openCloseModal}
        content={<TypePayment onCreatePayment={onCreatePayment} />}
      />
    </div>
  );
};
