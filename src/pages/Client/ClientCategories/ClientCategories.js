import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Icon, Label } from "semantic-ui-react";
import { size } from "lodash";
import { useTable } from "../../../hooks/useTable";
import { ClientListCategories } from "./ClientListCategories";
import { ClientProducts } from "../ClientProducts/ClientProducts";
import { Cart } from "../Cart/Cart";
import { getProductsCart } from "../../../api/cart";
import "./ClientCategories.scss";
import { ClientOrders } from "../Orders/ClientOrders";

export const ClientCategories = ({ children }) => {
  const { getTableByNumber } = useTable();
  const [refetch, setRefetch] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const onRefetch = () => {
    setRefetch((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      const exist = await getTableByNumber(id);
      if (!exist) closeTable();
    })();
  }, [id, refetch]);

  const closeTable = () => {
    navigate("/");
  };

  const goToCart = () => {
    navigate(`/client/${id}/cart`);
  };

  const goToOrders = () => {
    navigate(`/client/${id}/orders`);
  };

  const productsInCart = getProductsCart();
  return (
    <div className="client-layout-bg">
      <Container className="client-layout">
        <div className="client-layout__header">
          <Link to={`/client/${id}`}>
            <h1>iCard</h1>
          </Link>
          <h3>Mesa {id}</h3>
          <div>
            <Button icon onClick={() => goToCart()}>
              <Icon name="shop" />
              {size(productsInCart) > 0 ? (
                <Label circular color="red">
                  {size(productsInCart)}
                </Label>
              ) : null}
            </Button>
            <Button icon onClick={() => goToOrders()}>
              <Icon name="list" />
            </Button>
            <Button icon onClick={() => closeTable()}>
              <Icon name="sign-out" />{" "}
            </Button>
          </div>
        </div>
        <div className="client-layout__content">
          <Routes>
            <Route path="" element={<ClientListCategories />} />
            <Route
              path=":idcategory"
              element={<ClientProducts onRefetch={onRefetch} />}
            />
            <Route path="cart" element={<Cart onRefetch={onRefetch} />} />
            <Route path="orders" element={<ClientOrders />} />
          </Routes>
        </div>
      </Container>
    </div>
  );
};
