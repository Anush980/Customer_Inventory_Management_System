import { useCallback, useEffect, useState } from "react";
import { getCustomers, saveCustomer, deleteCustomer } from "../api/customerApi";

export const useCustomers = ({ search = "", sort = "newest" } = {}) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- FETCH CUSTOMERS ---
  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getCustomers({ search, sort });
      setCustomers(data);
      return { message: "Customers fetched successfully", type: "success" };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to fetch customers";
      setError(msg);
      return { message: msg, type: "error" };
    } finally {
      setLoading(false);
    }
  }, [search, sort]);

  // --- SAVE CUSTOMER (CREATE OR UPDATE) ---
  const saveCustomerById = async (customer) => {
    try {
      const saved = await saveCustomer(customer);

      setCustomers((prev) =>
        customer._id
          ? prev.map((c) => (c._id === saved._id ? saved : c))
          : [saved, ...prev]
      );

      return { ...saved, message: saved.message || "Customer saved successfully", type: saved.type || "success" };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to save customer";
      setError(msg);
      // throw { message: msg, type: "error" };
    }
  };

  // --- DELETE CUSTOMER ---
  const deleteCustomerById = async (id) => {
    try {
      const res = await deleteCustomer(id);
      setCustomers((prev) => prev.filter((c) => c._id !== id));
      return { message: res.message || "Customer deleted successfully", type: res.type || "success" };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to delete customer";
      setError(msg);
      // throw { message: msg, type: "error" };
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return { customers, loading, error, fetchCustomers, saveCustomerById, deleteCustomerById };
};
