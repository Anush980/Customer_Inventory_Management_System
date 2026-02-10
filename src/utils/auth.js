// auth.js
// Save token (supports remember me)
export const saveToken = (token, remember = true) => {
  if (!token) return;
  const storage = remember ? localStorage : sessionStorage;
  // Strip quotes if they exist
  const cleanToken = typeof token === 'string' ? token.replace(/^"|"$/g, '') : token;
  storage.setItem("token", cleanToken);
};

// Get token (check both) - also strip quotes defensively
export const getToken = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) return null;
  // Remove surrounding quotes if they exist
  return token.replace(/^"|"$/g, '');
};

// Remove token (logout)
export const clearToken = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
};