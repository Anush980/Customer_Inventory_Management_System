import { getAuthHeaders } from "./authHeaders";

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/sales`;

export const getSales = async ({ search = "", category = "", sort = "" } = {}) => {
  const query = new URLSearchParams({ search, category, sort });
  const res = await fetch(`${BASE_URL}?${query.toString()}`, {  // FIXED: () not backticks
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch sales");
  }

  return res.json();
};

export const saveSale = async (sale) => {
  const method = sale._id ? "PUT" : "POST";
  const url = sale._id ? `${BASE_URL}/${sale._id}` : BASE_URL;

  const res = await fetch(url, {
    method,
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sale),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to save sale");
  }

  return res.json();
};

export const deleteSale = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {  // FIXED: () not backticks
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to delete sale");
  }

  return res.json();
};