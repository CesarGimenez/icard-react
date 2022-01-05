import React, { useEffect, useState } from "react";
import { Icon, Loader, Pagination } from "semantic-ui-react";
import { size } from "lodash";
import { HeaderPage } from "../../../components/HeaderPage/HeaderPage";
import { TablePayments } from "../../../components/Payment/TablePayments";
import { usePayment } from "../../../hooks/usePayment";
import { useAuth } from "../../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const PaymentsHistory = () => {
  const { payments, loading, getPayments } = usePayment();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    getPayments();
  }, []);

  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstItems = indexOfLastItems - itemsPerPage;
  const currentItems = payments?.slice(indexOfFirstItems, indexOfLastItems);

  const paginate = (number) => setCurrentPage(number);

  const { auth } = useAuth();
  if (!auth.me.is_staff) {
    return <Navigate to="/admin" />;
  }

  return (
    <div>
      <HeaderPage titlePage="Historial de pagos" />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TablePayments payments={currentItems} />
      )}
      <Pagination
        defaultActivePage={1}
        ellipsisItem={{
          content: <Icon name="ellipsis horizontal" />,
          icon: true,
        }}
        firstItem={{ content: <Icon name="angle double left" />, icon: true }}
        lastItem={{ content: <Icon name="angle double right" />, icon: true }}
        prevItem={{ content: <Icon name="angle left" />, icon: true }}
        nextItem={{ content: <Icon name="angle right" />, icon: true }}
        totalPages={Math.ceil(size(payments) / 10)}
        onPageChange={(_, data) => paginate(data.activePage)}
      />
    </div>
  );
};
