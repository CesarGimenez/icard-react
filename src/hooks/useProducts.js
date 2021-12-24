import { useState } from "react";
import {
  getProductsApi,
  addProductsApi,
  updateProductApi,
  deleteProductApi,
  getProductApi,
} from "../api/product";
import "./useAuth";
import { useAuth } from "./useAuth";

export const useProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState(null);

  const { auth } = useAuth();

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await getProductsApi();
      setLoading(false);
      setProducts(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addProduct = async (data) => {
    try {
      setLoading(true);
      await addProductsApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateProducts = async (id, data) => {
    try {
      setLoading(true);
      await updateProductApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deleteProducts = async (id) => {
    try {
      setLoading(true);
      await deleteProductApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getProduct = async (id) => {
    try {
      const product = await getProductApi(id);
      return product;
    } catch (error) {
      setError(error);
    }
  };

  return {
    loading,
    error,
    products,
    getProducts,
    addProduct,
    updateProducts,
    deleteProducts,
    getProduct,
  };
};
