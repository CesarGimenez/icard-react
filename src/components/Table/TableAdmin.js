import React, { useEffect, useState } from "react";
import { Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { ReactComponent as IcTable } from "../../assets/table.svg";
import { size } from "lodash";
import { getOrdersByTableApi } from "../../api/order";
import { ORDER_STATUS } from "../../utils/constants";
import { usePayment } from "../../hooks/usePayment";
import "./TableAdmin.scss";
import { getPaymentByTableApi } from "../../api/payment";

export const TableAdmin = ({ table, reload }) => {
  const {} = usePayment();
  const [orders, setOrders] = useState(null);
  const [tableBusy, setTableBusy] = useState(null);
  const [pendingPayment, setPendingPayment] = useState(null);
  const { getPaymentByTable } = usePayment();

  useEffect(() => {
    (async () => {
      const response = await getOrdersByTableApi(
        table.id,
        ORDER_STATUS.PENDING
      );
      setOrders(response);
    })();
  }, [reload]);

  useEffect(() => {
    (async () => {
      const response = await getOrdersByTableApi(
        table.id,
        ORDER_STATUS.DELIVERED
      );
      if (size(response) > 0) setTableBusy(response);
      else setTableBusy(false);
    })();
  }, [reload]);

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTableApi(table.id);
      if (size(response) > 0) setPendingPayment(true);
      else setPendingPayment(false);
    })();
  }, [reload]);
  return (
    <Link className="table-admin" to={`tables/${table.id}`}>
      {size(orders) > 0 ? (
        <Label circular color="orange">
          {size(orders)}
        </Label>
      ) : null}
      {pendingPayment && (
        <Label circular color="orange">
          Cuenta
        </Label>
      )}
      <IcTable
        className={classNames({
          pending: size(orders) > 0,
          busy: tableBusy,
          payment: pendingPayment,
        })}
      />
      <p>Mesa {table.number}</p>
    </Link>
  );
};
