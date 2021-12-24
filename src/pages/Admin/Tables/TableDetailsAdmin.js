import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import { forEach } from "lodash";
import { toast } from "react-toastify";
import { HeaderPage } from "../../../components/HeaderPage/HeaderPage";
import { OrderListAdmin } from "../../../components/Order/OrderListAdmin";
import { useTable } from "../../../hooks/useTable";
import { useOrder } from "../../../hooks/useOrder";
import { ModalBasic } from "../../../components/Common/ModalBasic/ModalBasic";
import { ConfirmBasic } from "../../../components/Common/Confirm/Confirm";
import { AddOrderForm } from "../../../components/Order/AddOrderForm";
import { usePayment } from "../../../hooks/usePayment";
import { PaymentDetails } from "../../../components/Payment/PaymentDetails";

export const TableDetailsAdmin = () => {
  const { id } = useParams();
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { createPayment, getPaymentByTable } = usePayment();
  const { table, getTable } = useTable();
  const [reload, setReload] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [titleConfirm, setTitleConfirm] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    getOrdersByTable(id, "", "ordering=-status,created_at");
  }, [reload]);

  useEffect(() => {
    getTable(id);
  }, [id]);

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(id);
      if (response.length > 0) setPaymentData(response);
      console.log(response);
    })();
  }, [reload]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onReload = () => setReload((prev) => !prev);

  const onCreatePayment = async () => {
    let totalPayment = 0;
    forEach(orders, (order) => {
      totalPayment += Number(order.product_data.price);
    });
    const paymentData = {
      table: id,
      waiter: table.waiter_data?.id,
      totalPayment: totalPayment.toFixed(2),
      paymentType: "CARD",
      statusPayment: "PENDING",
    };

    const payment = await createPayment(paymentData);
    for await (const order of orders) {
      await addPaymentToOrder(order.id, payment.id);
    }
    onReload();
    setShowConfirm(false);
    toast.info("Se ha creado la cuenta");
  };

  const onShowConfirm = () => {
    setTitleConfirm(
      `Estas seguro de crear la cuenta para la mesa '${table?.number}' ?`
    );
    setShowConfirm(true);
  };
  return (
    <div>
      <HeaderPage
        titlePage={`Detalle de mesa ${table?.number}`}
        btnTitle={!paymentData ? "Agregar pedido" : "Ver cuenta"}
        btnClick={openCloseModal}
        btnTitleTow={!paymentData && orders?.length > 0 ? "Generar cuenta" : ""}
        btnClickTow={onShowConfirm}
      />
      {loading ? (
        <Loader active inline="centered" />
      ) : (
        <OrderListAdmin orders={orders} onReload={onReload} />
      )}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={paymentData ? "Detalle de cuenta" : "Nuevo pedido"}
        content={
          paymentData ? (
            <PaymentDetails
              payment={paymentData}
              orders={orders}
              openCloseModal={openCloseModal}
              onReload={onReload}
            />
          ) : (
            <AddOrderForm
              idTable={id}
              openCloseModal={openCloseModal}
              onReload={onReload}
            />
          )
        }
      />
      <ConfirmBasic
        show={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={onCreatePayment}
        title={titleConfirm}
      />
    </div>
  );
};
