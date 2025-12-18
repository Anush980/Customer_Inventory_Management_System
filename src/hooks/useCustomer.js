import { useEffect, useState } from "react";
import { getCustomers, saveCustomer, deleteCustomer } from "../api/customerApi";

export const useCustomers = ({ search = "", sort = "newest" } = {}) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCustomers({ search, sort });
      setCustomers(data);
    } catch (err) {
      setError(err.message || "Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  const saveCustomerById = async (customer) => {
    try {
      const saved = await saveCustomer(customer);
      setCustomers((prev) =>
        customer._id
          ? prev.map((c) => (c._id === saved._id ? saved : c))
          : [saved, ...prev]
      );
      return saved;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteCustomerById = async (id) => {
    try {
      await deleteCustomer(id);
      setCustomers((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search, sort]);

  return { customers, loading, error, fetchCustomers, saveCustomerById, deleteCustomerById };
};
