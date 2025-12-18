import { useEffect, useState } from "react";
import { getStaffs, saveStaff, deleteStaff } from "../api/staffApi";

export const useStaffs = ({ search = "", sort = "newest" } = {}) => {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStaffs = async () => {
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
  };

  const saveStaffById = async (staff) => {
    try {
      const saved = await saveStaff(staff);
      setStaffs((prev) =>
        staff._id
          ? prev.map((s) => (s._id === saved._id ? saved : s))
          : [saved, ...prev]
      );
      return saved;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteStaffById = async (id) => {
    try {
      await deleteStaff(id);
      setStaffs((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, [search, sort]);

  return { staffs, loading, error, fetchStaffs, saveStaffById, deleteStaffById };
};
