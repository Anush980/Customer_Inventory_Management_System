import { useCallback, useEffect, useState } from "react";
import { 
  getAllUsers, 
  getUserDetails, 
  updateStaffPermissions, 
  toggleBlockUser, 
  saveUser,    
  deleteUser   
} from "../api/adminApi";

export const useUsers = ({ search = "", sort = "recent" } = {}) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all users
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUsers({ search, sort });
      setUsers(data.users || []);
    } catch (err) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [search, sort]);

  // Fetch single user details
  const fetchUserDetails = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserDetails(userId);
      setSelectedUser(data.user || null);
      return data.user;
    } catch (err) {
      setError(err.message || "Failed to fetch user details");
      throw err;
    } finally {
      setLoading(false);
    }
  };


const saveUserById = async (user) => {
  setLoading(true);
  setError(null);
  try {
    const res = await saveUser(user); // res = { message, user }
    const savedUser = res.user;

    setUsers((prev) =>
      user._id
        ? prev.map((c) => (c._id === savedUser._id ? savedUser : c))
        : [savedUser, ...prev]
    );

    return savedUser;
  } catch (err) {
    setError(err.response?.data?.message || err.message || "Failed to save user");
    throw err;
  } finally {
    setLoading(false);
  }
};

  // Delete user
  const deleteUserById = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      if (selectedUser && selectedUser._id === userId) setSelectedUser(null);
    } catch (err) {
      setError(err.message || "Failed to delete user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update staff permissions
  const updatePermissions = async (staffId, permissions) => {
    setLoading(true);
    setError(null);
    try {
      const data = await updateStaffPermissions(staffId, permissions);
      const updatedUser = data.user;

      setUsers((prev) => prev.map((u) => (u._id === updatedUser._id ? updatedUser : u)));
      if (selectedUser && selectedUser._id === updatedUser._id) setSelectedUser(updatedUser);

      return updatedUser;
    } catch (err) {
      setError(err.message || "Failed to update permissions");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Toggle block / unblock
const toggleBlock = async (user) => {
  if (user.role === "admin" && user._id === localStorage.getItem("userId")) {
    alert("You cannot block yourself!");
    return;
  }

  setLoading(true);
  setError(null);
  try {
    const updated = await toggleBlockUser(user._id);
    setUsers(prev => prev.map(u => (u._id === updated._id ? updated : u)));
    if (selectedUser && selectedUser._id === updated._id) setSelectedUser(updated);
    return updated;
  } catch (err) {
    setError(err.message || "Failed to block/unblock user");
    throw err;
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    selectedUser,
    loading,
    error,
    fetchUsers,
    fetchUserDetails,
    saveUserById,
    deleteUserById,
    updatePermissions,
    toggleBlock,
  };
};
