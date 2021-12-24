import React from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./AddEditUserForm.scss";
import { useUser } from "../../hooks/useUser";

export const AddEditUserForm = ({ closeModal, onRefetch, user }) => {
  const { addUser, updateUser } = useUser();
  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(
      user ? updateValidationSchema() : newValidationSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (user) await updateUser(user.id, formValue);
        else await addUser(formValue);
        onRefetch();
        closeModal();
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <Form className="add-edit-user-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="username"
        placeholder="username"
        autoComplete="off"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && formik.errors.username}
      />
      <Form.Input
        name="email"
        placeholder="email"
        autoComplete="off"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && formik.errors.email}
      />
      <Form.Input
        name="first_name"
        placeholder="Nombres"
        autoComplete="off"
        value={formik.values.first_name}
        onChange={formik.handleChange}
        error={formik.touched.first_name && formik.errors.first_name}
      />
      <Form.Input
        name="last_name"
        placeholder="Apellidos"
        autoComplete="off"
        value={formik.values.last_name}
        onChange={formik.handleChange}
        error={formik.touched.last_name && formik.errors.last_name}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contrase;a"
        autoComplete="off"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && formik.errors.password}
      />
      <div className="add-edit-user-form__Active">
        <Checkbox
          toggle
          checked={formik.values.is_active}
          onChange={(_, data) =>
            formik.setFieldValue("is_active", data.checked)
          }
          error={formik.errors.is_active}
        />{" "}
        Usuario activo
      </div>
      <div className="add-edit-user-form__Staff">
        <Checkbox
          toggle
          checked={formik.values.is_staff}
          onChange={(_, data) => formik.setFieldValue("is_staff", data.checked)}
          error={formik.errors.is_staff}
        />{" "}
        Usuario admin
      </div>
      <Button
        type="submit"
        primary
        fluid
        content={user ? "Actualizar" : "Crear"}
      />{" "}
    </Form>
  );
};

const initialValues = (data) => {
  return {
    username: data?.username || "",
    email: data?.email || "",
    first_name: data?.first_name || "",
    last_name: data?.last_name || "",
    password: "",
    is_active: data?.is_active ? true : false,
    is_staff: data?.is_staff ? true : false,
  };
};

const newValidationSchema = () => {
  return {
    username: Yup.string().required(true),
    email: Yup.string().required(true).email("No es un email"),
    first_name: Yup.string().required(true).max(20, "Es muy largo"),
    last_name: Yup.string().required(true).max(20, "Es muy largo"),
    password: Yup.string().required(true).min(6, "Es muy corta"),
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true),
  };
};

const updateValidationSchema = () => {
  return {
    username: Yup.string().required(true),
    email: Yup.string().required(true).email("No es un email"),
    first_name: Yup.string().required(true).max(20, "Es muy largo"),
    last_name: Yup.string().required(true).max(20, "Es muy largo"),
    password: Yup.string(),
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true),
  };
};
