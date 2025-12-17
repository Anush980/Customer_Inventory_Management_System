const BASE_URL = `${process.env.REACT_APP_API_URL}/api/staff/create`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
};

// Fetch staffs
export const getStaffs = async ({ search = "", sort = "newest" } = {}) => {
  const query = new URLSearchParams();
  if (search) query.append("search", search);
  if (sort) query.append("sort", sort);

  const res = await fetch(`${BASE_URL}?${query.toString()}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch staffs.");
  return res.json();
};

// Save Staff
export const saveStaff = async (staff) => {
  const method = staff._id ? "PUT" : "POST";
  const url = staff._id ? `${BASE_URL}/${staff._id}` : BASE_URL;

  const res = await fetch(url, {
    method,
    headers: getAuthHeaders(),
    body: JSON.stringify(staff),
  });

  if (!res.ok) throw new Error("Failed to save staff.");
  return res.json();
};

// Delete staff
export const deleteStaff = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to delete staff.");
  return res.json();
};
