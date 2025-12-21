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
    } catch (err) {
      setError(err.message || "Failed to fetch sales.");
    } finally {
      setLoading(false);
    }
  }, [search, sort, category]);


  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  // --- SAVE SALE ---
  const saveSaleById = async (sale) => {
    try {
      const saved = await saveSale(sale);

      setSales((prev) => {
        if (sale._id) {
          // update existing
          return prev.map((s) => (s._id === saved._id ? saved : s));
        }
        // new sale → add to top
        return [saved, ...prev];
      });

      return saved;
    } catch (err) {
      setError(err.message || "Failed to save sale.");
      throw err;
    }
  };

  // --- DELETE SALE ---
  const deleteSaleById = async (id) => {
    try {
      await deleteSale(id);
      setSales((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete sale.");
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
