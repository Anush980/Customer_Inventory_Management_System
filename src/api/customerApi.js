import { getAuthHeaders } from "./authHeaders";

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/customers`;

export const getCustomers = async ({ search="", sort="newest" } = {}) => {
  const query = new URLSearchParams({ search, sort });

  const res = await fetch(`${BASE_URL}?${query.toString()}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch customers");
  return res.json();
};

export const saveCustomer = async (customer) => {
  const method = customer._id ? "PUT" : "POST";
  const url = customer._id ? `${BASE_URL}/${customer._id}` : BASE_URL;

  const res = await fetch(url, {
    method,
    headers: getAuthHeaders(),
    body: JSON.stringify(customer),
  });

  if (!res.ok) throw new Error("Failed to save customer");
  return res.json();
};

export const deleteCustomer = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to delete customer");
  return res.json();
};
