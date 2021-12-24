import React, { useCallback, useEffect, useState } from "react";
import {
  Form,
  Image,
  Button,
  Dropdown,
  Checkbox,
  Popup,
} from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCategory } from "../../hooks/useCategory";
import { useProducts } from "../../hooks/useProducts";
import { map } from "lodash";
import "./AddEditProduct.scss";

export const AddEditProduct = ({
  onClose,
  onRefetch,
  product,
  updateProducts,
}) => {
  const { categories, getCategories } = useCategory();
  const { addProduct } = useProducts();

  const [categoriesFormat, setCategoriesFormat] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    product ? product?.image : null
  );

  useEffect(() => getCategories(), []);
  useEffect(() => {
    setCategoriesFormat(formatDropdownData(categories));
  }, [categories]);

  const formik = useFormik({
    initialValues: initialValues(product),
    validationSchema: Yup.object(
      product ? updateValidationSchema() : newValidationSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (product) await updateProducts(product.id, formValue);
      else await addProduct(formValue);
      onRefetch();
      onClose();
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    await formik.setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/png, image/jpeg",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });
  return (
    <Form className="add-edit-product-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="Nombre del producto"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />
      <Form.Input
        type="number"
        name="price"
        step="0.5"
        min="0"
        max="999"
        placeholder="precio"
        value={formik.values.price}
        onChange={formik.handleChange}
        error={formik.errors.price}
      />
      <Dropdown
        placeholder="categoria"
        fluid
        selection
        search
        options={categoriesFormat}
        value={formik.values.category}
        error={formik.errors.category}
        onChange={(_, data) => formik.setFieldValue("category", data.value)}
      />
      <Form.TextArea name="description" placeholder="Descripcion breve" />

      <div className="add-edit-product-form__active">
        <Checkbox
          toggle
          checked={formik.values.active}
          onChange={(_, data) => formik.setFieldValue("active", data.checked)}
        />{" "}
        Producto activo
      </div>

      <Button
        type="button"
        fluid
        {...getRootProps()}
        color={formik.errors.image && "red"}
      >
        {previewImage ? "Cambiar imagen" : "Subir imagen"}
      </Button>
      <input {...getInputProps()} />
      <Image src={previewImage} />

      <Button
        type="submit"
        primary
        fluid
        content={product ? "Actualizar" : "Crear"}
      />
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

const initialValues = (product) => {
  return {
    title: product?.title || "",
    price: product?.price || "",
    category: product?.category || "",
    active: product?.active ? true : false,
    image: "",
    description: product?.description || "",
  };
};

const newValidationSchema = () => {
  return {
    title: Yup.string().required(true),
    price: Yup.number()
      .required(true)
      .min(0.5, "El precio no puede ser menor a 0.5")
      .max(999, "El precio no puede exceder de 999"),
    category: Yup.number().required(true),
    active: Yup.boolean().required(true),
    image: Yup.string().required(true),
    description: Yup.string(),
  };
};

const updateValidationSchema = () => {
  return {
    title: Yup.string().required(true),
    price: Yup.number()
      .required(true)
      .min(0.5, "El precio no puede ser menor a 0.5")
      .max(999, "El precio no puede exceder de 999"),
    category: Yup.number().required(true),
    active: Yup.boolean().required(true),
    image: Yup.string(),
    description: Yup.string(),
  };
};
