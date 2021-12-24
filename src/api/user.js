import { BASE_API } from "./../utils/constants";

export const LoginApi = async (formValue) => {
  try {
    const url = `${BASE_API}/api/auth/login/`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
    };
    const response = await fetch(url, params);
    if (response.status !== 200) {
      throw new Error("usuario o password incorrectos");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getMeApi = async (token) => {
  try {
    const url = `${BASE_API}/api/auth/me`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {}
};

export const getUsersApi = async (token) => {
  try {
    const url = `${BASE_API}/api/users`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {}
};

export const addUserApi = async (data, token) => {
  try {
    const url = `${BASE_API}/api/users/`;
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

export const updateUserApi = async (id, data, token) => {
  try {
    const url = `${BASE_API}/api/users/${id}/`;
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
  } catch (error) {}
};

export const deleteUserApi = async (id, token) => {
  try {
    const url = `${BASE_API}/api/users/${id}/`;
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
