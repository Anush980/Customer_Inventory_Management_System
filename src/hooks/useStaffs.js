import { useCallback, useEffect, useState } from "react";
import { getStaffs, saveStaff, deleteStaff } from "../api/staffApi";

export const useStaffs = ({ search = "", sort = "newest" } = {}) => {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  },[search,sort]);

  const saveStaffById = async (staff) => {
    const saved = await saveStaff(staff);
    setStaffs((prev) =>
      staff._id ? prev.map((s) => (s._id === saved._id ? saved : s)) : [saved, ...prev]
    );
    return saved;
  };

  const deleteStaffById = async (id) => {
    await deleteStaff(id);
    setStaffs((prev) => prev.filter((s) => s._id !== id));
  };


  const changeStaffPassword = async (id, newPassword) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/staff/${id}/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ newPassword }),
    });
    if (!res.ok) throw new Error("Failed to update password");
    return res.json();
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
