// Save token (supports remember me)
export const saveToken = (token, remember = true) => {
  if (!token) return;

  const storage = remember ? localStorage : sessionStorage;
  storage.setItem("token", token);
};

// Get token (check both)
export const getToken = () => {
  return (
    localStorage.getItem("token") ||
    sessionStorage.getItem("token")
  );
};

// Remove token (logout)
export const clearToken = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
};
