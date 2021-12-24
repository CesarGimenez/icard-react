import { BASE_API, ORDER_STATUS } from "../utils/constants";

export const getOrdersByTableApi = async (
  idTable,
  status = "",
  ordering = ""
) => {
  const tableFilter = `table=${idTable}`;
  const statusFilter = `status=${status}`;
  const closeFilter = `close=False`;
  try {
    const url = `${BASE_API}/api/orders/?${tableFilter}&${statusFilter}&${closeFilter}&${ordering}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const checkDeliveredOrderApi = async (id) => {
  try {
    const url = `${BASE_API}/api/orders/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: ORDER_STATUS.DELIVERED,
      }),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const addOrderToTableApi = async (idTable, idProduct) => {
  try {
    const url = `${BASE_API}/api/orders/`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: ORDER_STATUS.PENDING,
        table: idTable,
        product: idProduct,
      }),
    };
    await fetch(url, params);
  } catch (error) {
    throw error;
  }
};

export const addPaymentToOrderApi = async (idOrder, idPayment) => {
  try {
    const url = `${BASE_API}/api/orders/${idOrder}/`;
    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payment: idPayment,
      }),
    };
    const response = await fetch(url, params);
    const result = response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const closeOrderApi = async (idOrder) => {
  try {
    const url = `${BASE_API}/api/orders/${idOrder}/`;
    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        close: true,
      }),
    };
    await fetch(url, params);
  } catch (error) {
    throw error;
  }
};

export const getOrdersByPaymentApi = async (idPayment) => {
  try {
    const paymentFilter = `payment=${idPayment}`;
    const url = `${BASE_API}/api/orders/?${paymentFilter}`;
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
