import React, { useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { HeaderPage } from "../../../components/HeaderPage/HeaderPage";
import { useTable } from "../../../hooks/useTable";
import { TableLisAdmin } from "../../../components/Table/TableLisAdmin";
import { useAuth } from "../../../hooks/useAuth";
import { getTablesByWaiterApi } from "../../../api/table";

export const Orders = () => {
  const { loading, tables, getTables, getTablesByWaiter } = useTable();
  const { auth } = useAuth();

  useEffect(() => {
    if (auth.me.is_staff) getTables();
    else getTablesByWaiter(auth.me.id);
  }, []);
  return (
    <div>
      <HeaderPage titlePage="Administracion de pedidos" />
      {loading ? (
        <Loader active inline="centered">
          ...Cargando
        </Loader>
      ) : (
        <TableLisAdmin tables={tables} />
      )}
    </div>
  );
};
