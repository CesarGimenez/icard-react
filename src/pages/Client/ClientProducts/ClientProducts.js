import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { size } from "lodash";
import { Loader } from "semantic-ui-react";
import { useProducts } from "../../../hooks/useProducts";
import { ListProducts } from "./ListProducts";

export const ClientProducts = ({ onRefetch }) => {
  const { loading, products, getProductByCategory } = useProducts();
  const { idcategory } = useParams();

  useEffect(() => {
    getProductByCategory(idcategory);
  }, []);

  const productsActive = products?.filter((product) => product.active === true);

  return (
    <div>
      {loading ? (
        <Loader active inline="centered"></Loader>
      ) : size(products) < 1 ? (
        <span style={{ textAlign: "center" }}>
          No hay productos disponibles para esta categoria
        </span>
      ) : (
        <ListProducts products={productsActive} onRefetch={onRefetch} />
      )}
    </div>
  );
};
