const BASE_URL = `${process.env.REACT_APP_API_URL}/api/customers`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
};

// Fetch customers
export const getCustomers = async ({ search = "", sort = "newest" } = {}) => {
  const query = new URLSearchParams();
  if (search) query.append("search", search);
  if (sort) query.append("sort", sort);

  const res = await fetch(`${BASE_URL}?${query.toString()}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch customers.");
  return res.json();
};

// Save customer
export const saveCustomer = async (customer) => {
  const method = customer._id ? "PUT" : "POST";
  const url = customer._id ? `${BASE_URL}/${customer._id}` : BASE_URL;

  const res = await fetch(url, {
    method,
    headers: getAuthHeaders(),
    body: JSON.stringify(customer),
  });

  if (!res.ok) throw new Error("Failed to save customer.");
  return res.json();
};

// Delete customer
export const deleteCustomer = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to delete customer.");
  return res.json();
};
