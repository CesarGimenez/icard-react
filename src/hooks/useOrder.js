import React, { useState } from "react";
import {
  addOrderToTableApi,
  addPaymentToOrderApi,
  checkDeliveredOrderApi,
  closeOrderApi,
  getOrdersByPaymentApi,
  getOrdersByTableApi,
} from "../api/order";

export const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState(null);

  const getOrdersByTable = async (idTable, status, ordering) => {
    try {
      setLoading(true);
      const response = await getOrdersByTableApi(idTable, status, ordering);
      setOrders(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const checkDeliveredOrder = async (id) => {
    try {
      setLoading(true);
      await checkDeliveredOrderApi(id);
      setLoading(false);
    } catch (error) {
      throw error;
    }
  };

  const addOrderToTable = async (idTable, idProduct) => {
    try {
      await addOrderToTableApi(idTable, idProduct);
    } catch (error) {
      setError(error);
    }
  };

  const addPaymentToOrder = async (idOrder, idPayment) => {
    try {
      await addPaymentToOrderApi(idOrder, idPayment);
    } catch (error) {
      setError(error);
    }
  };

  const closeOrder = async (idOrder) => {
    try {
      await closeOrderApi(idOrder);
    } catch (error) {
      setError(error);
    }
  };

  const getOrderByPayment = async (idPayment) => {
    try {
      return await getOrdersByPaymentApi(idPayment);
    } catch (error) {
      setError(error);
    }
  };
  return {
    orders,
    error,
    loading,
    getOrdersByTable,
    checkDeliveredOrder,
    addOrderToTable,
    addPaymentToOrder,
    closeOrder,
    getOrderByPayment,
  };
};
