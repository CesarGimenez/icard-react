import { BASE_API } from "../utils/constants";

export const getProductsApi = async () => {
  try {
    const url = `${BASE_API}/api/products/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const addProductsApi = async (data, token) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("active", data.active);
    formData.append("description", data.description);
    formData.append("image", data.image);

    const url = `${BASE_API}/api/products/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateProductApi = async (id, data, token) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("active", data.active);
    formData.append("description", data.description);
    if (data.image) formData.append("image", data.image);

    const url = `${BASE_API}/api/products/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteProductApi = async (id, token) => {
  try {
    const url = `${BASE_API}/api/products/${id}/`;
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

export const getProductApi = async (id) => {
  try {
    const url = `${BASE_API}/api/products/${id}/`;
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
