import React, { useEffect, useState } from "react";
import { map, forEach } from "lodash";
import { Button, Icon, Image } from "semantic-ui-react";
import "./ListProductCart.scss";
import { cleanProductsCart, removeProductsCart } from "../../../api/cart";
import { useOrder } from "../../../hooks/useOrder";
import { useTable } from "../../../hooks/useTable";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const ListProductsCart = ({ products, onRefetch, onReloadCart }) => {
  const [total, setTotal] = useState(0);
  const { addOrderToTable } = useOrder();
  const { getTableByNumberTow } = useTable();
  const { id } = useParams();
  useEffect(() => {
    let totalTemp = 0;
    forEach(products, (product) => {
      totalTemp += Number(product.price);
    });
    setTotal(totalTemp.toFixed(2));
  }, [products]);
  const onRemoveProduct = (index) => {
    removeProductsCart(index);
    onRefetch();
    onReloadCart();
  };

  const onCreateOrder = async () => {
    const response = await getTableByNumberTow(id);
    const tableId = response[0].id;
    for await (const product of products) {
      await addOrderToTable(tableId, product.id);
    }
    cleanProductsCart();
    onReloadCart();
    onRefetch();
    toast.success("Los pedidos han sido ordenados");
  };

  return (
    <div className="list-product-cart">
      {map(products, (product, index) => (
        <div key={index} className="list-product-cart__item">
          <div className="list-product-cart__item-content">
            <Image src={product.image} avatar />
            <span>{product.title}</span>
          </div>
          <span>{product.price} $</span>
          <Icon name="close" onClick={() => onRemoveProduct(index)} />
        </div>
      ))}
      <Button
        fluid
        primary
        content={`Realizar pedido (${total} $)`}
        onClick={() => onCreateOrder()}
      />
    </div>
  );
};
