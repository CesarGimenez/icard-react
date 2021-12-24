import React, { useEffect, useState } from "react";
import { map } from "lodash";
import { Image } from "semantic-ui-react";
import { useOrder } from "../../hooks/useOrder";
import "./PaymentProductsList.scss";

export const PaymentProductsList = ({ payment }) => {
  const { getOrderByPayment } = useOrder();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getOrderByPayment(payment.id);
      setOrders(response);
    })();
  }, []);
  return (
    <div className="payment-product-list">
      {map(orders, (order) => (
        <div className="payment-product-list__product" key={order.id}>
          <div>
            <Image src={order.product_data.image} avatar size="tiny" />
            <span>{order.product_data.title}</span>
          </div>
          <span>{order.product_data.price} $</span>
        </div>
      ))}
    </div>
  );
};
