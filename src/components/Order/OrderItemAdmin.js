import React from "react";
import { Button, Label, Rail, Segment } from "semantic-ui-react";
import moment from "moment";
import classNames from "classnames";
import "moment/locale/es";
import "./OrderItemAdmin.scss";
import { ORDER_STATUS } from "../../utils/constants";
import { useOrder } from "../../hooks/useOrder";

export const OrderItemAdmin = ({ order, onReload }) => {
  const { image, title } = order.product_data;
  const { checkDeliveredOrder } = useOrder();

  const onCheckDelivered = async () => {
    checkDeliveredOrder(order.id);
    onReload();
  };
  return (
    <Segment
      className={classNames("order-item-admin", {
        [order.status.toLowerCase()]: true,
      })}
      raised={true}
    >
      <div className="order-item-admin__time">
        <Segment>
          <span>{moment(order.created_at).format("HH:mm")}</span> {" - "}
          <span>{moment(order.created_at).startOf("seconds").fromNow()}</span>
        </Segment>
      </div>
      <div className="order-item-admin__product">
        <img src={image} />
        <p>{title}</p>
      </div>

      {order.status === ORDER_STATUS.PENDING ? (
        <Button
          primary
          content="Marcar como entregado"
          onClick={onCheckDelivered}
        />
      ) : (
        <Label attached="bottom right" size="big" color="green">
          Entregado
        </Label>
      )}
    </Segment>
  );
};
