import React, { useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { HeaderPage } from "../../../components/HeaderPage/HeaderPage";
import { TablePayments } from "../../../components/Payment/TablePayments";
import { usePayment } from "../../../hooks/usePayment";

export const PaymentsHistory = () => {
  const { payments, loading, getPayments } = usePayment();

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <div>
      <HeaderPage titlePage="Historial de pagos" />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TablePayments payments={payments} />
      )}
    </div>
  );
};
