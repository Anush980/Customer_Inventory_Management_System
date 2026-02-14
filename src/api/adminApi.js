import { getAuthHeaders } from "./authHeaders";

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/admin`;

// --- Fetch all users ---
export const getAllUsers = async ({ search = "", sort = "recent", category = "" } = {}) => {
  const query = new URLSearchParams({ search, sort, category });
  const res = await fetch(`${BASE_URL}/users?${query.toString()}`, {  
    headers: getAuthHeaders(),
  });
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch users");
  }
  
  return res.json(); 
};

// --- Fetch a single user ---
export const getUserDetails = async (userId) => {
  const res = await fetch(`${BASE_URL}/users/${userId}`, {  
    headers: getAuthHeaders(),
  });
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch user details");
  }
  
  return res.json();
};

// --- Update staff permissions ---
export const updateStaffPermissions = async (staffId, permissions) => {
  const res = await fetch(`${BASE_URL}/staff/${staffId}/permissions`, {  
    method: "PATCH",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(permissions),
  });
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to update staff permissions");
  }
  
  return res.json();
};

// --- Block/unblock user ---
export const toggleBlockUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/toggle-block`, {  
    method: "POST",  
    headers: getAuthHeaders(),
  });
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to toggle block user");
  }
  
  return res.json();
};

// --- Save user (POST new, PUT existing) ---
export const saveUser = async (user) => {
  const method = user._id ? "PUT" : "POST";
  const url = user._id ? `${BASE_URL}/users/${user._id}` : `${BASE_URL}/users`;

  const formData = new FormData();
  formData.append("name", user.name);
  formData.append("email", user.email);
  formData.append("role", user.role);

  // Password: include only for new users
  if (!user._id && user.password) {
    formData.append("password", user.password);
  } else if (!user._id) {
    formData.append("password", "stockmate@123");  // Default password
  }

  // Phone handling
  if (user.role === "staff") {
    formData.append("staffPhone", user.staffPhone || "");
    formData.append("staffEmail", user.staffEmail || "");
    formData.append("staffAddress", user.staffAddress || "");
    if (user.salary !== undefined) formData.append("salary", user.salary);
    if (user.jobTitle) formData.append("jobTitle", user.jobTitle);
  } else {
    formData.append("phone", user.phone || "");
  }

  // Shop name for owners/staff
  if (user.role !== "admin") {
    formData.append("shopName", user.shopName || "");
  }

  // Permissions: serialize object
  if (user.permissions) {
    formData.append("permissions", JSON.stringify(user.permissions));
  }

  // Blocked status
  if (user.isBlocked !== undefined) {
    formData.append("isBlocked", user.isBlocked ? "true" : "false");
  }

  // Super admin (for admins only)
  if (user.superAdmin !== undefined) {
    formData.append("superAdmin", user.superAdmin ? "true" : "false");
  }

  // Image
  if (user.image instanceof File) {
    formData.append("image", user.image);
  }

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      // DO NOT set Content-Type: browser handles multipart
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to save user");
  }

  return res.json(); // returns { message, user }
};

// --- Delete user ---
export const deleteUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/users/${userId}`, {  
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to delete user");
  }

  return res.json();
};