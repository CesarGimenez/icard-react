import React, { useEffect, useState } from "react";
import { map } from "lodash";
import { Form, Image, Button, Dropdown } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useProducts } from "../../hooks/useProducts";
import { useOrder } from "../../hooks/useOrder";
import "./AddOrderForm.scss";

export const AddOrderForm = ({ idTable, openCloseModal, onReload }) => {
  const { products, getProducts, getProduct } = useProducts();
  const [formatProducts, setFormatProducts] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const { addOrderToTable } = useOrder();

  const productsActive = products?.filter((product) => product.active === true);
  console.log(products);
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(
    () => setFormatProducts(formatDropdownData(productsActive)),
    [products]
  );

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      for await (const idProduct of formValue.products) {
        await addOrderToTable(idTable, idProduct);
      }
      onReload();
      openCloseModal();
    },
  });

  useEffect(() => addProductList(), [formik.values]);

  const addProductList = async () => {
    try {
      const productsId = formik.values.products;
      const arrayTemp = [];
      for await (const idProduct of productsId) {
        const response = await getProduct(idProduct);
        arrayTemp.push(response);
      }
      setProductsData(arrayTemp);
    } catch (error) {
      console.log(error);
    }
  };

  const removeProductList = (index) => {
    const idProducts = [...formik.values.products];
    idProducts.splice(index, 1);
    formik.setFieldValue("products", idProducts);
  };
  return (
    <Form onSubmit={formik.handleSubmit} className="add-order-form">
      <Dropdown
        fluid
        placeholder="productos"
        selection
        search
        value={null}
        options={formatProducts}
        onChange={(_, data) =>
          formik.setFieldValue("products", [
            ...formik.values.products,
            data.value,
          ])
        }
      />
      <div className="add-order-form__list">
        {map(productsData, (product, index) => (
          <div className="add-order-form__list-product" key={index}>
            <div>
              <Image src={product.image} avatar size="tiny" />
              <span>{product.title}</span>
            </div>
            <Button
              type="button"
              content="Eliminar"
              basic
              color="red"
              onClick={() => removeProductList(index)}
            />
          </div>
        ))}
      </div>
      <Button type="Submit" primary fluid content="Crear pedido" />
    </Form>
  );
};

const formatDropdownData = (data) => {
  return map(data, (item) => ({
    key: item.id,
    text: item.title,
    value: item.id,
  }));
};

const initialValues = () => {
  return {
    products: [],
  };
};

const validationSchema = () => {
  return {
    products: Yup.array().required(true),
  };
};
