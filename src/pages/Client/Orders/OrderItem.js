import React from "react";
import moment from "moment";
import "moment/locale/es";
import classNames from "classnames";
import { Image } from "semantic-ui-react";
import "./OrderItem.scss";

export const OrderItem = ({ order }) => {
  const { title, image } = order.product_data;

  return (
    <div
      className={classNames("order-item", {
        [order.status]: true,
      })}
    >
      <div className="order-item__time">
        <span>
          Pedido {moment(order.created_at).startOf("seconds").fromNow()}
        </span>
      </div>
      <div className="order-item__product">
        <Image src={image} size="small" />
        <p>{title}</p>
      </div>
      {order.status === "PENDING" ? (
        <span>Pendiente</span>
      ) : (
        <span>Entregado</span>
      )}
    </div>
  );
};
