import React, { useCallback, useState } from "react";
import { Form, Button, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCategory } from "../../hooks/useCategory";
import "./AddEditCategory.scss";

export const AddEditCategory = ({ closeModal, onRefetch, category }) => {
  const [previewImagen, setPreviewImagen] = useState(category?.image || null);
  const { addCategory, updateCategory } = useCategory();

  const formik = useFormik({
    initialValues: initialValues(category),
    validationSchema: Yup.object(category ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (category) await updateCategory(category.id, formValue);
        else await addCategory(formValue);
        onRefetch();
        closeModal();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    await formik.setFieldValue("image", file);
    setPreviewImagen(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });
  return (
    <Form className="add-edit-category-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="Nombre de la categoria"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />
      <Button
        type="button"
        fluid
        {...getRootProps()}
        color={formik.errors.image && "red"}
      >
        {previewImagen ? "Cambiar imagen" : "Subir imagen"}
      </Button>

      <input {...getInputProps()} />
      <Image src={previewImagen} fluid />

      <Button
        type="submit"
        content={category ? "Actualizar" : "Crear"}
        primary
        fluid
      />
    </Form>
  );
};

const initialValues = (data) => {
  return {
    title: data?.title || "",
    image: "",
  };
};

const newSchema = () => {
  return {
    title: Yup.string().required(true),
    image: Yup.string().required(true),
  };
};

const updateSchema = () => {
  return {
    title: Yup.string().required(true),
    image: Yup.string(),
  };
};
