import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import { AddEditUserForm } from "../../../components/AddEditUserForm.js/AddEditUserForm";
import { ConfirmBasic } from "../../../components/Common/Confirm/Confirm";
import { ModalBasic } from "../../../components/Common/ModalBasic/ModalBasic";
import { HeaderPage } from "../../../components/HeaderPage/HeaderPage";
import { TableUsers } from "../../../components/TableUsers/TableUsers";
import { useUser } from "../../../hooks/useUser";
import { useAuth } from "../../../hooks/useAuth";

export const Users = () => {
  const { loading, users, getUsers, deleteUser } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [confirmState, setConfirmState] = useState(false);
  const [titleConfirm, setTitleConfirm] = useState(null);
  const [userDeleted, setUserDeleted] = useState(null);
  useEffect(() => {
    getUsers();
  }, [refetch]);
  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch(!refetch);
  const addUser = () => {
    setTitleModal("Nuevo usuario");
    setContentModal(
      <AddEditUserForm closeModal={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateUser = (data) => {
    setTitleModal("Actualizar usuario");
    setContentModal(
      <AddEditUserForm
        closeModal={openCloseModal}
        onRefetch={onRefetch}
        user={data}
      />
    );
    openCloseModal();
  };

  const onDeleteUser = async (data) => {
    try {
      await deleteUser(data);
      onRefetch();
      setConfirmState(false);
    } catch (error) {
      throw error;
    }
  };
  const showConfirm = (data) => {
    setTitleConfirm(`Esta seguro de eliminar al usuario ${data.email}?`);
    setUserDeleted(data);
    setConfirmState(true);
  };
  const { auth } = useAuth();
  if (!auth.me.is_staff) {
    return <Navigate to="/admin" />;
  }
  return (
    <div>
      <HeaderPage
        titlePage="Usuarios"
        btnTitle="Nuevo usuario"
        btnClick={addUser}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableUsers
          users={users}
          updateUser={updateUser}
          showConfirm={showConfirm}
        />
      )}
      <ModalBasic
        show={showModal}
        title={titleModal}
        onClose={openCloseModal}
        content={contentModal}
      />
      <ConfirmBasic
        show={confirmState}
        onCancel={() => setConfirmState(false)}
        onConfirm={() => onDeleteUser(userDeleted.id)}
        title={titleConfirm}
      />
    </div>
  );
};
