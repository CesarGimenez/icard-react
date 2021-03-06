import { useState } from "react";
import { size } from "lodash";
import {
  getTablesApi,
  addTableApi,
  updateTableApi,
  deleteTableApi,
  getTablesByWaiterApi,
  getTableApi,
  getTableByNumberApi,
} from "../api/table";
import { useAuth } from "./useAuth";

export const useTable = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tables, setTables] = useState(null);
  const [table, setTable] = useState(null);
  const { auth } = useAuth();

  const getTables = async () => {
    try {
      setLoading(true);
      const response = await getTablesApi(auth.token);
      setLoading(false);
      setTables(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addTables = async (data) => {
    try {
      setLoading(true);
      await addTableApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateTables = async (id, data) => {
    try {
      setLoading(true);
      await updateTableApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deleteTables = async (id) => {
    try {
      setLoading(true);
      await deleteTableApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getTablesByWaiter = async (id) => {
    try {
      setLoading(true);
      const response = await getTablesByWaiterApi(auth.token, id);
      setLoading(false);
      setTables(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getTable = async (id) => {
    try {
      setLoading(true);
      const response = await getTableApi(id, auth.token);
      setLoading(false);
      setTable(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getTableByNumber = async (number) => {
    try {
      const response = await getTableByNumberApi(number);
      if (size(response) === 0) throw Error();
      return true;
    } catch (error) {
      setError(error);
    }
  };

  const getTableByNumberTow = async (number) => {
    try {
      const response = await getTableByNumberApi(number);
      return response;
    } catch (error) {
      setError(error);
    }
  };

  return {
    loading,
    error,
    tables,
    getTables,
    addTables,
    updateTables,
    deleteTables,
    getTablesByWaiter,
    table,
    getTable,
    getTableByNumber,
    getTableByNumberTow,
  };
};
