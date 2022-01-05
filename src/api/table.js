import { BASE_API } from "../utils/constants";

export const getTablesApi = async (token) => {
  try {
    const url = `${BASE_API}/api/tables/`;
    const params = {
      Headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getTablesByWaiterApi = async (token, waiter) => {
  try {
    const url = `${BASE_API}/api/tables/?waiter=${waiter}`;
    const params = {
      Headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const addTableApi = async (data, token) => {
  try {
    const url = `${BASE_API}/api/tables/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateTableApi = async (id, data, token) => {
  try {
    const url = `${BASE_API}/api/tables/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteTableApi = async (id, token) => {
  try {
    const url = `${BASE_API}/api/tables/${id}/`;
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getTableApi = async (idTable, token) => {
  try {
    const url = `${BASE_API}/api/tables/${idTable}`;
    const params = {
      Headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getTableByNumberApi = async (number) => {
  try {
    const url = `${BASE_API}/api/tables/?number=${number}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
