import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "semantic-ui-react";
import { size } from "lodash";
import { getOrdersByTableApi } from "../../../api/order";
import { ConfirmBasic } from "../../../components/Common/Confirm/Confirm";
import { ModalBasic } from "../../../components/Common/ModalBasic/ModalBasic";
import { HeaderPage } from "../../../components/HeaderPage/HeaderPage";
import { AddEditTables } from "../../../components/Table/AddEditTables";
import { TableTablesAdmin } from "../../../components/Table/TableTablesAdmin";
import { useAuth } from "../../../hooks/useAuth";
import { useTable } from "../../../hooks/useTable";

export const Tables = () => {
  const { auth } = useAuth();
  const { loading, tables, getTables, deleteTables } = useTable();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [confirmState, setConfirmState] = useState(false);
  const [titleConfirm, setTitleConfirm] = useState(null);
  const [tableDeleted, setTableDeleted] = useState(null);

  useEffect(() => getTables(), [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addTable = () => {
    setTitleModal("Nueva mesa");
    setContentModal(
      <AddEditTables
        onClose={openCloseModal}
        onRefetch={onRefetch}
        tables={tables}
      />
    );
    openCloseModal();
  };

  const updateTable = (data) => {
    setTitleModal(`Actualizar mesa '${data.number}'`);
    setContentModal(
      <AddEditTables
        onClose={openCloseModal}
        onRefetch={onRefetch}
        tables={tables}
        tableUpdate={data}
      />
    );
    openCloseModal();
  };

  const onDeleteTable = async (data) => {
    try {
      const response = await getOrdersByTableApi(data, "", "");
      console.log(size(response));
      if (size(response) === 0) {
        await deleteTables(data);
        onRefetch();
        setConfirmState(false);
        toast.info("Mesa eliminada");
      } else {
        toast.error(
          "La mesa no puede ser eliminada ya que posee pedidos pendientes"
        );
      }
    } catch (error) {
      throw error;
    }
  };
  const showConfirm = (data) => {
    setTitleConfirm(`Esta seguro de eliminar la mesa ${data.number}?`);
    setTableDeleted(data.id);
    setConfirmState(true);
  };
  return (
    <div>
      <HeaderPage
        titlePage="Mesas"
        btnTitle={auth.me?.is_staff ? "Nueva mesa" : null}
        btnClick={addTable}
      />
      {loading ? (
        <Loader active inline="centered">
          ...Cargando
        </Loader>
      ) : (
        <TableTablesAdmin
          tables={tables}
          updateTable={updateTable}
          showConfirm={showConfirm}
        />
      )}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        content={contentModal}
      />
      <ConfirmBasic
        show={confirmState}
        onCancel={() => setConfirmState(false)}
        onConfirm={() => onDeleteTable(tableDeleted)}
        title={titleConfirm}
      />
    </div>
  );
};
