import React, { useState } from "react";
import Layout from "../../components/ui/Layout/Layout";
import PageHeader from "../../components/ui/PageHeader/Pageheader";
import FilterBar from "../../components/ui/Filterbar/FilterBar";
import UserCard from "../../components/admin/usersCard/UserCard";
import UserForm from "../../components/admin/userForm/UserForm";
import ConfirmCard from "../../components/ui/ConfirmCard/ConfirmCard";
import AdminCard from "../../components/ui/StatsCard/AdminCard";
import Snackbar from "../../components/ui/Snackbar/Snackbar";
import { sortOptions,categoryOptions } from "../../data/filterConfig/userFilterConfigs";
import { useUsers } from "../../hooks/useUser"; 
import "./user.css";

const UserPage = () => {
  const [sort, setSort] = useState("recent");
  const [category, setCategory] = useState("");
  const [searchText, setSearchText] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewOnly, setViewOnly] = useState(false); 
  const [snackbar, setSnackbar] = useState(null);
  
  

  const {
    users,
    loading,
    error,
    deleteUserById,
    saveUserById,
    toggleBlock,
  } = useUsers({ search: searchText, sort,category });

  // Delete user
  const handleDelete = (id) => {
    setDeleteID(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deleteID) return;
    try {
      await deleteUserById(deleteID); // hook updates state
      setSnackbar({ message: "User deleted successfully", type: "success" });
    } catch (err) {
      console.error("Failed to delete user", err);
      setSnackbar({ message: err.message || "Failed to delete user", type: "error" });
    } finally {
      setShowConfirm(false);
    }
  };

  const totalUsers = users.length;
  const totalOwners = users.filter(c => c.role === "owner").length;
  const totalStaffs = users.filter(c => c.role === "staff").length;
  const totalAdmins = users.filter(c => c.role === "admin").length;
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}"); 

  // Edit user
  const handleEdit = (user) => {
    setSelectedUser(user);
    setViewOnly(false);
    setShowForm(true);
  };

  // View user (read-only)
  const handleView = (user) => {
    setSelectedUser(user);
    setViewOnly(true);
    setShowForm(true);
  };

  // Block / Unblock user
  const handleBlockToggle = async (user) => {
    const loggedInRole = localStorage.getItem("role");
    const loggedInId = localStorage.getItem("userId");

    if (!["superAdmin", "admin"].includes(loggedInRole)) {
      setSnackbar({ message: "Only super admins or admins can block users.", type: "error" });
      return;
    }

    if (user._id === loggedInId) {
      setSnackbar({ message: "You cannot block yourself!", type: "error" });
      return;
    }

    try {
      await toggleBlock(user);
      const action = user.isBlocked ? "unblocked" : "blocked";
      setSnackbar({ message: `User ${action} successfully`, type: "success" });
    } catch (err) {
      console.error("Failed to block/unblock user", err);
      setSnackbar({ message: err.message || "Failed to toggle block status", type: "error" });
    }
  };

  // Handle add/edit form submission
  const handleFormSubmit = async (user) => {
    try {
      await saveUserById(user); // hook updates state internally
      setShowForm(false);
      setSnackbar({ message: "User saved successfully", type: "success" });
    } catch (err) {
      console.error("Failed to save user", err);
      setSnackbar({ message: err.message || "Failed to save user", type: "error" });
    }
  };

  return (
    <Layout>
      <PageHeader
        title="User Management"
        showBtn={false}
        btnTitle="Add User"
        variant="users"
      />

      <div className="stats-container" style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <AdminCard title="Total Users" variant="user" count={totalUsers}/>
        <AdminCard title="Total Owners" variant="owner" count={totalOwners}/>
        <AdminCard title="Total Staffs" variant="staff" count={totalStaffs}  />
        <AdminCard title="Total Admins" variant="admin" count={totalAdmins} />
      </div>

      <FilterBar
        filters={[
          // { value: category, onChange: setCategory, options: categoryOptions },
          { value: sort, onChange: setSort, options: sortOptions }]}
        search={{
          value: searchText,
          onChange: setSearchText,
          placeholder: "Search users...",
        }}
      />
    

      {loading && <div>Loading...</div>}
      {!loading && !error && users.length === 0 && <div className="no-users">No users found</div>}
      {error && <div className="error">{error}</div>}

      <div className="user-card-grid">
        {users.map((u) => (
          <UserCard
            key={u._id}
            user={u}
            onView={handleView}
            currentUser={currentUser}
            onEdit={handleEdit}
            onToggleBlock={handleBlockToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {showConfirm && (
        <ConfirmCard
          closeWindow={() => setShowConfirm(false)}
          onConfirm={confirmDelete}
        />
      )}

      {showForm && (
        <UserForm
          editMode={selectedUser}
          closeWindow={() => setShowForm(false)}
          onSubmitForm={handleFormSubmit}
          viewOnly={viewOnly}
        />
      )}

      {/* SNACKBAR */}
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

export default UserPage;
