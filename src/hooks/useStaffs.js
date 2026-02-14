import { useCallback, useEffect, useState } from "react";
import { getStaffs, saveStaff, deleteStaff } from "../api/staffApi";

export const useStaffs = ({ search = "", sort = "newest" } = {}) => {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- FETCH STAFFS ---
  const fetchStaffs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStaffs({ search, sort });
      setStaffs(data);
    } catch (err) {
      setError(err.message || "Failed to fetch staffs");
    } finally {
      setLoading(false);
    }
  }, [search, sort]);

  // --- SAVE STAFF ---
  const saveStaffById = async (staff) => {
    try {
      const saved = await saveStaff(staff);

      setStaffs((prev) =>
        staff._id ? prev.map((s) => (s._id === saved._id ? saved : s)) : [saved, ...prev]
      );

      // Return for snackbar
      return { message: staff._id ? "Staff updated successfully" : "Staff added successfully", type: "success" };
    } catch (err) {
      setError(err.message);
      return { message: err.message || "Failed to save staff", type: "error" };
    }
  };

  // --- DELETE STAFF ---
  const deleteStaffById = async (id) => {
    try {
      await deleteStaff(id);
      setStaffs((prev) => prev.filter((s) => s._id !== id));
      return { message: "Staff deleted successfully", type: "success" };
    } catch (err) {
      setError(err.message);
      return { message: err.message || "Failed to delete staff", type: "error" };
    }
  };

  // --- CHANGE STAFF PASSWORD ---
  const changeStaffPassword = async (id, newPassword) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/staff/${id}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ newPassword }),
      });
      if (!res.ok) throw new Error("Failed to update password");
      return { message: "Password updated successfully", type: "success" };
    } catch (err) {
      return { message: err.message || "Failed to update password", type: "error" };
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, [fetchStaffs]);

  return {
    staffs,
    loading,
    error,
    fetchStaffs,
    saveStaffById,
    deleteStaffById,
    changeStaffPassword,
  };
};
