import { getAuthHeaders } from "./authHeaders";

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/sales`;

export const getSales = async ({ search="", category="", sort="" } = {}) => {
  const query = new URLSearchParams({ search, category, sort });

  const res = await fetch(`${BASE_URL}?${query.toString()}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch sales");
  return res.json();
};

export const saveSale = async (sale) => {
  const method = sale._id ? "PUT" : "POST";
  const url = sale._id ? `${BASE_URL}/${sale._id}` : BASE_URL;

  const res = await fetch(url, {
    method,
    headers: getAuthHeaders(),
    body: JSON.stringify(sale),
  });

  if (!res.ok) throw new Error("Failed to save sale");
  return res.json();
};

export const deleteSale = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to delete sale");
  return res.json();
};
