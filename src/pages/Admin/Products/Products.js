import React, { useEffect, useState } from "react";
import { HeaderPage } from "../../../components/HeaderPage/HeaderPage";
import { useAuth } from "../../../hooks/useAuth";
import { TableProductAdmin } from "../../../components/Product/TableProductAdmin";
import { useProducts } from "../../../hooks/useProducts";
import { Loader } from "semantic-ui-react";
import { toast } from "react-toastify";
import "./Products.scss";
import { ModalBasic } from "../../../components/Common/ModalBasic/ModalBasic";
import { AddEditProduct } from "../../../components/Product/AddEditProduct";
import { ConfirmBasic } from "../../../components/Common/Confirm/Confirm";

export const Products = () => {
  const { auth } = useAuth();
  const { loading, products, getProducts, updateProducts, deleteProducts } =
    useProducts();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [confirmState, setConfirmState] = useState(false);
  const [titleConfirm, setTitleConfirm] = useState(null);
  const [productDeleted, setProductDeleted] = useState(null);

  useEffect(() => getProducts(), [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addProduct = () => {
    setTitleModal("Nuevo producto");
    setContentModal(
      <AddEditProduct onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateProduct = (data) => {
    setTitleModal(`Actualizar producto '${data.title}'`);
    setContentModal(
      <AddEditProduct
        onClose={openCloseModal}
        onRefetch={onRefetch}
        product={data}
        updateProducts={updateProducts}
      />
    );
    openCloseModal();
  };

  const showConfirm = (data) => {
    setTitleConfirm(`Esta seguro de eliminar el producto '${data.title}' ?`);
    setProductDeleted(data.id);
    setConfirmState(true);
  };

  const onDelete = async (id) => {
    await deleteProducts(id);
    onRefetch();
    setConfirmState(false);
    toast.info("Producto eliminado");
  };
  return (
    <div>
      <HeaderPage
        titlePage="Productos"
        btnTitle={auth.me.is_staff ? "Nuevo producto" : null}
        btnClick={addProduct}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando..
        </Loader>
      ) : (
        <TableProductAdmin
          products={products}
          updateProduct={updateProduct}
          showConfirm={showConfirm}
        />
      )}
      <ModalBasic
        show={showModal}
        title={titleModal}
        content={contentModal}
        onClose={openCloseModal}
      />
      <ConfirmBasic
        show={confirmState}
        onCancel={() => setConfirmState(false)}
        onConfirm={() => onDelete(productDeleted)}
        title={titleConfirm}
      />
    </div>
  );
};
