const BASE_URL = `${process.env.REACT_APP_API_URL}/api/inventory`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Authorization": `Bearer ${token}`,
  };
};

// Fetch items
export const getItems = async ({ search = "", category = "", sort = "newest", stock = "" } = {}) => {
  const query = new URLSearchParams();
  if (search) query.append("search", search);
  if (category) query.append("category", category);
  if (sort) query.append("sort", sort);
  if (stock) query.append("stock", stock);

  const res = await fetch(`${BASE_URL}?${query.toString()}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch items.");
  return res.json();
};

// Save item
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
    body: formData,
    headers: getAuthHeaders(), 
  });

  if (!res.ok) throw new Error("Failed to save item.");
  return res.json();
};

// Delete item
export const deleteItem = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to delete item.");
  return res.json();
};
