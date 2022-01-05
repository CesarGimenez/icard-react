import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { useTable } from "../../hooks/useTable";
import "./Home.scss";

export const Home = (props) => {
  const [table, setTable] = useState(null);
  const [error, setError] = useState(null);
  const { getTableByNumber } = useTable();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!table) {
      setError("Debe introducir un numero de mesa");
    } else {
      setError(null);
      const exist = await getTableByNumber(table);
      if (exist) {
        navigate(`/client/${table}`);
      } else setError("La mesa no existe");
    }
  };
  return (
    <div className="select-table">
      <div className="select-table__content">
        <h1>Bienvenido a iCard</h1>
        <h2>Introduce tu numero de mesa</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Input
            placeholder="Ej: 1, 3, 5, 20"
            type="number"
            min="1"
            max="100"
            onChange={(_, data) => setTable(data.value)}
          />
          <Button fluid primary content="Entrar" />
        </Form>

        <h2 className="select-table__content-error">{error}</h2>
      </div>
    </div>
  );
};
