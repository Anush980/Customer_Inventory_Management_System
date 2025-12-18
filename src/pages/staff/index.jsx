import React, { useState } from "react";
import Layout from "../../components/ui/Layout/Layout";
import Pageheader from "../../components/ui/PageHeader/Pageheader";
import FilterBar from "../../components/ui/Filterbar/FilterBar";
import StaffCard from "../../components/staff/staffCard/StaffCard";
import StaffForm from "../../components/staff/staffForm/StaffForm";
import ConfirmCard from "../../components/ui/ConfirmCard/ConfirmCard";
import StaffStats from "../../components/staff/staffStats/StaffStats";
import { sortOptions } from "../../data/filterConfig/staffFilterConfigs";
import StaffCreatedModal from "../../components/staff/StaffCreatedModal/StaffCreatedModal";
import { useStaffs } from "../../hooks/useStaff";
import "./staff.css";

const StaffPage = () => {
  const [sort, setSort] = useState("newest");
  const [searchText, setSearchText] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [createdStaff, setCreatedStaff] = useState(null);


  const { staffs, loading, error, deleteStaffById, saveStaffById, fetchStaffs } = useStaffs({
    search: searchText,
    sort,
  });

  // Open form to edit staff
  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setShowForm(true);
  };

  // Delete workflow
  const handleDelete = (id) => {
    setDeleteID(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deleteID) return;
    try {
      await deleteStaffById(deleteID);
      setDeleteID(null);
      setShowConfirm(false);
    } catch (err) {
      console.error("Failed to delete staff", err);
    }
  };

  // Called by StaffForm for create or update
 const handleFormSubmit = async (staffPayload) => {
  try {
    const result = await saveStaffById(staffPayload);

    if (!staffPayload._id) {
      setCreatedStaff(result.staff || result); // depends on API response
    }

    setShowForm(false);
  } catch (err) {
    console.error(err);
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
          <StaffCard key={staff._id} staff={staff} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>

      {showConfirm && <ConfirmCard closeWindow={() => setShowConfirm(false)} onConfirm={confirmDelete} />}

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
      {createdStaff && (
  <StaffCreatedModal
    staff={createdStaff}
    onClose={() => setCreatedStaff(null)}
  />
)}

    </Layout>
  );
};

export default StaffPage;
