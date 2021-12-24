import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { LoginApi } from "../../api/user";
import { useAuth } from "../../hooks/useAuth";
import "./LoginForms.scss";

export const LoginForm = () => {
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      try {
        const response = await LoginApi(formValue);
        const { access } = response;
        login(access);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    },
  });
  return (
    <Form className="login-form-admin" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="email"
        placeholder="Correo electronico"
        autoComplete="off"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && formik.errors.email}
      />
      <Form.Input
        name="password"
        placeholder="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && formik.errors.password}
      />
      <Button type="submit" content="Iniciar sesion" primary fluid />
    </Form>
  );
};

const initialValues = () => {
  return {
    email: "",
    password: "",
  };
};

const validationSchema = () => {
  return {
    email: Yup.string()
      .email("No es un correo valido")
      .required("Campo requerido"),
    password: Yup.string().required("Campo requerido"),
  };
};
