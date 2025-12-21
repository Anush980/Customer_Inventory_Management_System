import { getToken } from "../utils/auth";

export const getAuthHeaders = (isFormData = false) => {
  const token = (getToken() || "").trim();

  if (!token) {
    throw new Error("No valid auth token found. Please login again.");
  }

  if (isFormData) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};
