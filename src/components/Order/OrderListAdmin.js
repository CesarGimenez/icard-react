import React from "react";
import { map } from "lodash";
import { OrderItemAdmin } from "./OrderItemAdmin";

export const OrderListAdmin = ({ orders, onReload }) => {
  return (
    <div>
      {map(orders, (order) => (
        <OrderItemAdmin key={order.id} order={order} onReload={onReload} />
      ))}
    </div>
  );
};
