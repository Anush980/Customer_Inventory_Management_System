import { useState, useEffect, useCallback } from "react";
import { getSales, saveSale, deleteSale } from "../api/salesApi";

export const useSales = ({ search = "", sort = "", category = "" } = {}) => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- FETCH SALES ---
  const fetchSales = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSales({ search, sort, category });
      setSales(data);
      return { message: "Sales fetched successfully", type: "success" };
    } catch (err) {
      const msg = err.message || "Failed to fetch sales.";
      setError(msg);
      return { message: msg, type: "error" };
    } finally {
      setLoading(false);
    }
  }, [search, sort, category]);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  // --- SAVE SALE ---
  const saveSaleById = async (sale) => {
    setLoading(true);
    setError(null);
    try {
      const res = await saveSale(sale); // backend returns { message, type, sale }

      if (res.type === "success") {
        setSales((prev) => {
          if (sale._id) {
            // update existing sale
            return prev.map((s) => (s._id === res.sale._id ? res.sale : s));
          }
          // add new sale at top
          return [res.sale, ...prev];
        });
      }

      return { message: res.message || "Sale saved", type: res.type || "success" };
    } catch (err) {
      const msg = err.message || "Failed to save sale.";
      setError(msg);
      return { message: msg, type: "error" };
    } finally {
      setLoading(false);
    }
  };

  // --- DELETE SALE ---
  const deleteSaleById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await deleteSale(id); // backend returns { message, type }

      if (res.type === "success") {
        setSales((prev) => prev.filter((s) => s._id !== id));
      }

      return { message: res.message || "Sale deleted", type: res.type || "success" };
    } catch (err) {
      const msg = err.message || "Failed to delete sale.";
      setError(msg);
      return { message: msg, type: "error" };
    } finally {
      setLoading(false);
    }
  };

  return {
    sales,
    loading,
    error,
    fetchSales,
    saveSaleById,
    deleteSaleById,
  };
};
