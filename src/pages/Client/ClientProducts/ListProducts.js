import React from "react";
import { Button, Icon, Image } from "semantic-ui-react";
import { map } from "lodash";
import { toast } from "react-toastify";
import { addProductToCart } from "../../../api/cart";
import "./ListProducts.scss";

export const ListProducts = ({ products, onRefetch }) => {
  const onAddCart = (product) => {
    addProductToCart(product.id);
    onRefetch();
    toast.success(`${product.title} agregada al carrito`);
  };
  return (
    <div className="list-products">
      {map(products, (product, index) => (
        <div key={index} className="list-products__item">
          <Image src={product.image} size="small" />
          <div className="list-products__item-content">
            <span className="list-products__item-content-title">
              {product.title}
            </span>
            <em>{product.description}</em>
            <div>
              <span className="list-products__item-content-price">
                {product.price} $
              </span>
              <Button icon primary onClick={() => onAddCart(product)}>
                <Icon name="add" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
