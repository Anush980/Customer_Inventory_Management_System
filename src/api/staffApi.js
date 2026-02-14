import { getAuthHeaders } from "./authHeaders";

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/staff`;

export const getStaffs = async ({ search = "", sort = "newest" } = {}) => {
  const query = new URLSearchParams({ search, sort });
  const res = await fetch(`${BASE_URL}?${query.toString()}`, {  
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch staffs");
  }

  return res.json();
};

export const saveStaff = async (staff) => {
  const method = staff._id ? "PUT" : "POST";
  const url = staff._id ? `${BASE_URL}/${staff._id}` : BASE_URL;

  // FIXED: Should use FormData for image upload
  const formData = new FormData();

  // Add all staff fields
  if (staff.name) formData.append("name", staff.name);
  if (staff.staffEmail) formData.append("staffEmail", staff.staffEmail);
  if (staff.staffPhone) formData.append("staffPhone", staff.staffPhone);
  if (staff.staffAddress) formData.append("staffAddress", staff.staffAddress);
  if (staff.jobTitle) formData.append("jobTitle", staff.jobTitle);
  if (staff.salary !== undefined) formData.append("salary", staff.salary);
  
  // Password (only for new staff)
  if (!staff._id && staff.password) {
    formData.append("password", staff.password);
  }

  // Permissions
  if (staff.permissions) {
    formData.append("permissions", JSON.stringify(staff.permissions));
  }

  // Handle image
  if (staff.image instanceof File) {
    formData.append("image", staff.image);
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
    throw new Error(error.message || "Failed to save staff");
  }

  return res.json();
};

export const deleteStaff = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to delete staff");
  }

  return res.json();
};

// FIXED: Update staff password - endpoint changed
export const updateStaffPassword = async (id, newPassword) => {
  const res = await fetch(`${BASE_URL}/${id}/reset-password`, {  
    method: "POST",  // FIXED: Should be POST
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newPassword }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to update password");
  }

  return res.json();
};

// Resend staff credentials email
export const resendStaffCredentials = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/resend-credentials`, { 
    method: "POST",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to resend credentials");
  }

  return res.json();
};