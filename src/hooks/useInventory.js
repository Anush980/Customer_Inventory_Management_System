import { useEffect, useState, useCallback } from "react";
import { getItems, saveItem, deleteItem } from "../api/inventoryApi";

export const useInventory = ({
  search = "",
  sort = "recent",
  category = "",
  stock = "",
} = {}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- FETCH ITEMS ---
  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getItems({ search, category, sort, stock });
      setItems(data);
    } catch (err) {
      setError(err.message || "Failed to fetch items.");
    } finally {
      setLoading(false);
    }
  }, [search, category, sort, stock]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // --- SAVE ITEM (CREATE OR UPDATE) ---
  const saveItemById = async (item) => {
    try {
      const saved = await saveItem(item); // backend should return { message, type, item }
      
      setItems((prev) => {
        if (item._id) {
          return prev.map((i) => (i._id === saved.item._id ? saved.item : i));
        }
        return [saved.item, ...prev];
      });

      // return message and type for snackbar
      return { message: saved.message || "Item saved successfully", type: saved.type || "success" };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to save item";
      throw { message: msg, type: "error" };
    }
  };

  // --- DELETE ITEM ---
  const deleteItemById = async (id) => {
    try {
      const res = await deleteItem(id); // backend returns { message, type }
      setItems((prev) => prev.filter((i) => i._id !== id));

      return { message: res.message || "Item deleted successfully", type: res.type || "success" };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to delete item";
      throw { message: msg, type: "error" };
    }
  };

  return {
    items,
    loading,
    error,
    fetchItems,
    saveItemById,
    deleteItemById,
  };
};
