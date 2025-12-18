import { getAuthHeaders } from "./authHeaders";

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/inventory`;

export const getItems = async ({ search="", category="", sort="newest", stock="" } = {}) => {
  const query = new URLSearchParams({ search, category, sort, stock });

  const res = await fetch(`${BASE_URL}?${query.toString()}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
};

export const saveItem = async (item) => {
  const method = item._id ? "PUT" : "POST";
  const url = item._id ? `${BASE_URL}/${item._id}` : BASE_URL;

  const formData = new FormData();
  for (const key in item) {
    if (key !== "imageFile") formData.append(key, item[key]);
  }
  if (item.imageFile) formData.append("image", item.imageFile);

  const res = await fetch(url, {
    method,
    headers: getAuthHeaders(true), // FormData mode
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to save item");
  return res.json();
};

export const deleteItem = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to delete item");
  return res.json();
};
