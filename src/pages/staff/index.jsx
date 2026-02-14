import React, { useState } from "react";
import Layout from "../../components/ui/Layout/Layout";
import Pageheader from "../../components/ui/PageHeader/Pageheader";
import FilterBar from "../../components/ui/Filterbar/FilterBar";
import StaffCard from "../../components/staff/staffCard/StaffCard";
import StaffForm from "../../components/staff/staffForm/StaffForm";
import ConfirmCard from "../../components/ui/ConfirmCard/ConfirmCard";
import StaffStats from "../../components/staff/staffStats/StaffStats";
import StaffDetailsModal from "../../components/staff/StaffDetailModal/StaffDetailsModal";
import Snackbar from "../../components/ui/Snackbar/Snackbar";
import { sortOptions } from "../../data/filterConfig/staffFilterConfigs";
import { useStaffs } from "../../hooks/useStaffs";
import "./staff.css";

const StaffPage = () => {
  const [sort, setSort] = useState("newest");
  const [searchText, setSearchText] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  const { staffs, loading, error, deleteStaffById, saveStaffById, changeStaffPassword } = useStaffs({
    search: searchText,
    sort,
  });

  // ---- Handlers ----
  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setShowForm(true);
  };

  const handleShowDetails = (staff) => {
    setSelectedStaff(staff);
    setShowDetails(true);
  };

  const handleDelete = (id) => {
    setDeleteID(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deleteID) return;
    try {
      const res = await deleteStaffById(deleteID);
      setSnackbar(res); // show snackbar
    } catch (err) {
      setSnackbar({ message: "Failed to delete staff", type: "error" });
    } finally {
      setDeleteID(null);
      setShowConfirm(false);
    }
  };

  const handleFormSubmit = async (staffPayload) => {
    try {
      const res = await saveStaffById(staffPayload);
      setSnackbar(res); // show snackbar
      setShowForm(false);
      setSelectedStaff(null);
    } catch (err) {
      setSnackbar({ message: "Failed to save staff", type: "error" });
    }
  };

  const handleChangePassword = async (staffId, newPassword) => {
    const res = await changeStaffPassword(staffId, newPassword);
    setSnackbar(res);
  };

  const handleResendEmail = async (staffId) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/staff/${staffId}/resend-credentials`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to resend email");
      setSnackbar({ message: "Login credentials resent to personal email", type: "success" });
    } catch (err) {
      console.error(err);
      setSnackbar({ message: "Failed to resend email", type: "error" });
    }
  };

  return (
    <Layout>
      <Pageheader
        title="Staff Management"
        btnTitle="Add"
        variant="staff"
        onClickBtn={() => setShowForm(true)}
      />
      <StaffStats />

      <FilterBar
        filters={[{ value: sort, onChange: setSort, options: sortOptions }]}
        search={{ value: searchText, onChange: setSearchText, placeholder: "Search staff..." }}
      />

      {loading && <div>Loading...</div>}
      {!loading && !error && staffs.length === 0 && <div className="no-staffs">No staffs found</div>}
      {error && <div className="error">{error}</div>}

      <div className="customer-card-grid">
        {staffs.map((staff) => (
          <StaffCard
            key={staff._id}
            staff={staff}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onShowDetails={handleShowDetails}
          />
        ))}
      </div>

      {showConfirm && (
        <ConfirmCard closeWindow={() => setShowConfirm(false)} onConfirm={confirmDelete} />
      )}

      {showForm && (
        <StaffForm
          editMode={selectedStaff}
          closeWindow={() => {
            setShowForm(false);
            setSelectedStaff(null);
          }}
          onSubmit={handleFormSubmit}
        />
      )}

      {showDetails && selectedStaff && (
        <StaffDetailsModal
          staff={selectedStaff}
          onClose={() => setShowDetails(false)}
          changeStaffPassword={handleChangePassword} 
          onResendEmail={handleResendEmail}
        />
      )}

      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}
    </Layout>
  );
};

export default StaffPage;
