import React, { useState } from "react";
import Button from "../../ui/Button/Button";
import "../../ui/CrudTable/crudTable.css";
import Snackbar from "../../ui/Snackbar/Snackbar";

const StaffForm = ({ editMode, closeWindow }) => {
  const [formData, setFormData] = useState(
    editMode || {
      name: "",
      staffEmail: "",
      staffPhone: "",
      staffAddress: "",
      jobTitle: "",
      salary: "",
    }
  );

  const [image, setImage] = useState(null); // new
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(null);


  // Handle input change
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
 const onSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  if (loading) return;
  setLoading(true);

  try {
    const method = editMode ? "PUT" : "POST";
    const url = editMode
      ? `${process.env.REACT_APP_API_URL}/api/staff/${editMode._id}`
      : `${process.env.REACT_APP_API_URL}/api/staff`;

    const form = new FormData();
    form.append("name", formData.name);
    form.append("staffEmail", formData.staffEmail);
    form.append("staffPhone", formData.staffPhone || "");
    form.append("staffAddress", formData.staffAddress || "");
    form.append("jobTitle", formData.jobTitle || "");
    form.append("salary", formData.salary || "");
    if (!editMode) form.append("password", "default123");
    if (image) form.append("image", image);

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: form,
    });

    // Parse server response
    const result = await response.json();

    if (!response.ok) {
      // Show specific server message if available
      throw new Error(result.message || "Error saving staff");
    }

    console.log("Success:", result);
    closeWindow();
    setTimeout(() => window.location.reload(), 500);
  } catch (err) {
    console.error("Error:", err);
    setSnackbar({ message: err.message, type: "error" });
  } finally {
    setLoading(false);
  }
};
const validateForm = () => {
  // Name
  if (!formData.name.trim()) {
    setSnackbar({ message: "Name is required", type: "error" });
    return false;
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.staffEmail || !emailRegex.test(formData.staffEmail)) {
    setSnackbar({ message: "Valid email is required", type: "error" });
    return false;
  }

  // Phone (numbers only, 10 digits)
  const phoneRegex = /^[0-9]{10}$/;
  if (formData.staffPhone && !phoneRegex.test(formData.staffPhone)) {
    setSnackbar({ message: "Phone must be 10 digits", type: "error" });
    return false;
  }

  // Salary (positive number)
  if (formData.salary && Number(formData.salary) < 0) {
    setSnackbar({ message: "Salary must be positive", type: "error" });
    return false;
  }

  return true; // all valid
};


  return (
    <div className="crud-table-wrapper">
      <div className="crud-table-content">
        <div className="crud-table-header">
          <h3>{editMode ? "Edit Staff" : "Add Staff"}</h3>
          <button className="close-table" onClick={closeWindow}>
            &times;
          </button>
        </div>

        <div className="crud-table-body">
          <form onSubmit={onSubmit}>
            <div className="form-column">

              <div className="form-group">
                <label><span style={{ color: "red" }}>*</span>Staff Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  required
                  className="form-control"
                  maxLength="30"
                />
              </div>

              <div className="form-group">
                <label><span style={{ color: "red" }}>*</span>Personal Email</label>
                <input
                  type="email"
                  name="staffEmail"
                  value={formData.staffEmail}
                  onChange={onChange}
                  required
                  disabled={!!editMode}
                  className="form-control"
                   maxLength="30"
                />
              </div>

              <div className="form-group">
                <label><span style={{ color: "red" }}>*</span>Phone</label>
                <input
                  type="text"
                  name="staffPhone"
                  value={formData.staffPhone}
                  onChange={onChange}
                  className="form-control"
                   
                />
              </div>

              <div className="form-group">
                <label><span style={{ color: "red" }}>*</span>Address</label>
                <input
                  type="text"
                  name="staffAddress"
                  value={formData.staffAddress}
                  onChange={onChange}
                  className="form-control"
                   maxLength="30"
                />
              </div>

              <div className="form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={onChange}
                  className="form-control"
                   maxLength="20"
                />
              </div>

              <div className="form-group">
                <label>Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={onChange}
                  className="form-control"
                   max="1000000"
                />
              </div>

              <div className="form-group">
                <label>Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="form-control"
                />
              </div>

              {!editMode && (
                <small>
                  Login email & password will be generated and sent automatically.
                </small>
              )}
            </div>

            <div className="crud-table-footer">
              <Button variant="text" onClick={closeWindow} disabled={loading}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" isLoading={loading} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </div>
      {snackbar && (
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar(null)}
      />
    )}
    </div>
    
  );
 

};



export default StaffForm;
