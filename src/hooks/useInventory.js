import { useEffect, useState, useCallback } from "react";
import { getItems, saveItem, deleteItem } from "../api/inventoryApi";

export const useInventory = ({
  search = "",
  sort = "newest",
  category = "",
  stock = "",
} = {}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //FETCH ITEMS 
  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getItems({ search, category, sort, stock });
      setItems(data);
    } catch (err) {
      setError(err.message || "Failed to fetch Items.");
    } finally {
      setLoading(false);
    }
  }, [search, category, sort, stock]);

  // --- RUN WHEN FILTERS CHANGE ---
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // --- SAVE ITEM (CREATE OR UPDATE) ---
  const saveItembyId = async (item) => {
    try {
      const saved = await saveItem(item);

      setItems((prev) => {
        // update existing
        if (item._id) {
          return prev.map((i) => (i._id === saved._id ? saved : i));
        }
        // if new item → add to top of list
        return [saved, ...prev];
      });

      return saved;
    } catch (err) {
      setError(err.message || "Failed to save item.");
      throw err;
    }
  };

  // --- DELETE ITEM ---
  const deleteItemById = async (id) => {
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete item.");
    }
  };

  return {
    items,
    loading,
    error,
    fetchItems,
    deleteItemById,
    saveItembyId,
  };
};
