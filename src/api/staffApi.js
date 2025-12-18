import { getAuthHeaders } from "./authHeaders";

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/staff`;

export const getStaffs = async ({ search="", sort="newest" } = {}) => {
  const query = new URLSearchParams({ search, sort });

  const res = await fetch(`${BASE_URL}?${query.toString()}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch staffs");
  return res.json();
};

export const saveStaff = async (staff) => {
  const method = staff._id ? "PUT" : "POST";
  const url = staff._id ? `${BASE_URL}/${staff._id}` : BASE_URL;

  const res = await fetch(url, {
    method,
    headers: getAuthHeaders(),
    body: JSON.stringify(staff),
  });

  if (!res.ok) throw new Error("Failed to save staff");
  return res.json();
};

export const deleteStaff = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to delete staff");
  return res.json();
};
