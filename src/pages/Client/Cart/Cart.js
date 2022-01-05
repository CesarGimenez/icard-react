import React, { useEffect, useState } from "react";
import { size } from "lodash";
import { getProductsCart } from "../../../api/cart";
import { useProducts } from "../../../hooks/useProducts";
import { ListProductsCart } from "./ListProductsCart";

export const Cart = ({ onRefetch, refetch }) => {
  const { getProduct } = useProducts();
  const [productsCart, setProductsCart] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  useEffect(() => {
    (async () => {
      const idProductsCart = getProductsCart();
      const productsArray = [];
      for await (const id of idProductsCart) {
        const response = await getProduct(id);
        productsArray.push(response);
      }
      setProductsCart(productsArray);
    })();
  }, [reloadCart]);

  const onReloadCart = () => setReloadCart((prev) => !prev);
  return (
    <div>
      <h1>carrito</h1>
      {!productsCart ? (
        <h2> Cargando..</h2>
      ) : size(productsCart) < 1 ? (
        <div style={{ textAlign: "center" }}>
          <p>No hay productos en el carrito</p>
        </div>
      ) : (
        <ListProductsCart
          products={productsCart}
          onRefetch={onRefetch}
          onReloadCart={onReloadCart}
        />
      )}
    </div>
  );
};
