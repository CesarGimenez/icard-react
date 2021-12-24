import React, { useEffect, useState } from "react";
import { Form, Button, Dropdown } from "semantic-ui-react";
import { map } from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useTable } from "../../hooks/useTable";
import { useUser } from "../../hooks/useUser";

export const AddEditTables = ({ onClose, onRefetch, tables, tableUpdate }) => {
  const { addTables, updateTables } = useTable();
  const { users, getUsers } = useUser();
  const [userFormat, setUserFormat] = useState(null);

  useEffect(() => getUsers(), []);
  useEffect(() => {
    setUserFormat(formatDropdownData(users));
  }, [users]);
  const formik = useFormik({
    initialValues: initialValues(tableUpdate),
    validationSchema: Yup.object(newValidationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const table = tables.find((table) => table.number == formValue.number);
      if (!tableUpdate) {
        if (!table) {
          await addTables(formValue);
          onRefetch();
          onClose();
        } else {
          toast.info("Numero de mesa asignado");
        }
      }
      await updateTables(tableUpdate.id, formValue);
      onRefetch();
      onClose();
    },
  });
  console.log(userFormat);
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="number"
        type="number"
        min="0"
        max="100"
        step="1"
        placeholder="Numero de mesa"
        value={formik.values.number}
        onChange={formik.handleChange}
        error={formik.errors.number}
      />
      <Dropdown
        placeholder="Mesero"
        fluid
        selection
        search
        options={userFormat}
        value={formik.values.waiter}
        error={formik.errors.waiter}
        onChange={(_, data) => formik.setFieldValue("waiter", data.value)}
      />
      <Button
        type="submit"
        primary
        fluid
        content={tableUpdate ? "Actualizar" : "Crear"}
      />
    </Form>
  );
};

const formatDropdownData = (data) => {
  return map(data, (item) => ({
    key: item.id,
    text: item.first_name + " " + item.last_name,
    value: item.id,
  }));
};

const initialValues = (tableUpdate) => {
  return {
    number: tableUpdate?.number || "",
    waiter: tableUpdate?.waiter || "",
  };
};

const newValidationSchema = () => {
  return {
    number: Yup.number()
      .required(true)
      .min(1, "El numero menor para una mesa es 1")
      .max(100, "El numero mayor para una mesa es 100"),
    waiter: Yup.string(),
  };
};

const updateValidationSchema = () => {
  return {};
};
