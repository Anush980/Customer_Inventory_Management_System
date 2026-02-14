import { getAuthHeaders } from "./authHeaders";

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/customers`;

export const getCustomers = async ({ search = "", sort = "recent" } = {}) => {  // FIXED: typo "recentp"
  const query = new URLSearchParams({ search, sort });
  const res = await fetch(`${BASE_URL}?${query.toString()}`, {  // FIXED: () not backticks
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch customers");
  }

  return res.json();
};

export const saveCustomer = async (customer) => {
  const method = customer._id ? "PUT" : "POST";
  const url = customer._id ? `${BASE_URL}/${customer._id}` : BASE_URL;

  // FIXED: Should use FormData for image upload
  const formData = new FormData();
  
  // Add all customer fields
  if (customer.customerName) formData.append("customerName", customer.customerName);
  if (customer.customerEmail) formData.append("customerEmail", customer.customerEmail);
  if (customer.customerPhone) formData.append("customerPhone", customer.customerPhone);
  if (customer.customerAddress) formData.append("customerAddress", customer.customerAddress);
  if (customer.creditBalance !== undefined) formData.append("creditBalance", customer.creditBalance);

  // Handle image
  if (customer.image instanceof File) {
    formData.append("image", customer.image);
  }

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      // DO NOT set Content-Type for FormData
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to save customer");
  }

  return res.json();
};

export const deleteCustomer = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {  // FIXED: () not backticks
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to delete customer");
  }

  return res.json();
};