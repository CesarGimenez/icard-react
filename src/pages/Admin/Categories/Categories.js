import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { toast } from "react-toastify";
import { TableCategoryAdmin } from "../../../components/Category/TableCategoryAdmin";
import { HeaderPage } from "../../../components/HeaderPage/HeaderPage";
import { ModalBasic } from "../../../components/Common/ModalBasic/ModalBasic";
import { AddEditCategory } from "../../../components/Category/AddEditCategory";
import { useCategory } from "../../../hooks/useCategory";
import { ConfirmBasic } from "../../../components/Common/Confirm/Confirm";
import { useAuth } from "../../../hooks/useAuth";

export const Categories = () => {
  const { loading, categories, getCategories, deleteCategory } = useCategory();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [confirmState, setConfirmState] = useState(false);
  const [titleConfirm, setTitleConfirm] = useState(null);
  const [categoryDeleted, setCategoryDeleted] = useState(null);

  useEffect(() => {
    getCategories();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch(!refetch);

  const addCategory = () => {
    setTitleModal("Nueva categoria");
    setContentModal(
      <AddEditCategory closeModal={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateCategory = (data) => {
    setTitleModal("Actualizar categoria");
    setContentModal(
      <AddEditCategory
        closeModal={openCloseModal}
        onRefetch={onRefetch}
        category={data}
      />
    );
    openCloseModal();
  };

  const showConfirm = (data) => {
    setTitleConfirm(`Esta seguro de eliminar ${data.title}?`);
    setCategoryDeleted(data.id);
    setConfirmState(true);
  };

  const onDelete = async (data) => {
    await deleteCategory(data);
    onRefetch();
    setConfirmState(false);
    toast.info("Categoria eliminada");
  };
  const { auth } = useAuth();
  return (
    <div>
      <HeaderPage
        titlePage="Categorias"
        btnTitle={auth.me.is_staff ? "Nueva categoria" : null}
        btnClick={addCategory}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando..
        </Loader>
      ) : (
        <TableCategoryAdmin
          categories={categories}
          updateCategory={updateCategory}
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
        onConfirm={() => onDelete(categoryDeleted)}
        title={titleConfirm}
      />
    </div>
  );
};
