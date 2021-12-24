import { useState } from "react";
import {
  closePaymentApi,
  createPaymentApi,
  getPaymentByTableApi,
  getPaymentsApi,
} from "../api/payment";

export const usePayment = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState(null);

  const createPayment = async (paymentData) => {
    try {
      return await createPaymentApi(paymentData);
    } catch (error) {
      setError(error);
    }
  };

  const getPaymentByTable = async (idTable) => {
    try {
      return await getPaymentByTableApi(idTable);
    } catch (error) {
      setError(error);
    }
  };

  const closePayment = async (idPayment) => {
    try {
      return await closePaymentApi(idPayment);
    } catch (error) {
      setError(error);
    }
  };

  const getPayments = async () => {
    try {
      setLoading(true);
      const response = await getPaymentsApi();
      setPayments(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    error,
    payments,
    loading,
    createPayment,
    getPaymentByTable,
    closePayment,
    getPayments,
  };
};
