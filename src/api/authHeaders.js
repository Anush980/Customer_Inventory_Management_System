import { getToken } from "../utils/auth";

export const getAuthHeaders = (isFormData = false) => {
  const token = getToken();

  if (!token || token === "undefined") {
    throw new Error("No valid auth token found. Please login again.");
  }

  // For FormData (inventory upload)
  if (isFormData) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  // Normal JSON requests
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};
