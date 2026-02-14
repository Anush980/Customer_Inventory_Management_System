import { getAuthHeaders } from "./authHeaders";

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/inventory`;

export const getItems = async ({ search = "", category = "", sort = "newest", stock = "" } = {}) => {
  const query = new URLSearchParams({ search, category, sort, stock });
  const res = await fetch(`${BASE_URL}?${query.toString()}`, { 
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch items");
  }

  return res.json();
};

export const saveItem = async (item) => {
  const method = item._id ? "PUT" : "POST";
  const url = item._id ? `${BASE_URL}/${item._id}` : BASE_URL;

  const formData = new FormData();

  // Add all item fields except imageFile
  if (item.itemName) formData.append("itemName", item.itemName);
  if (item.sku) formData.append("sku", item.sku);
  if (item.category) formData.append("category", item.category);
  if (item.price !== undefined) formData.append("price", item.price);
  if (item.stock !== undefined) formData.append("stock", item.stock);
  if (item.unit) formData.append("unit", item.unit);
  if (item.description) formData.append("description", item.description);

  // Handle image
  if (item.imageFile instanceof File) {
    formData.append("image", item.imageFile);
  } else if (item.image && typeof item.image === 'string') {
    // Existing image URL - no need to send
  }

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to save item");
  }

  return res.json();
};

export const deleteItem = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { 
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to delete item");
  }

  return res.json();
};