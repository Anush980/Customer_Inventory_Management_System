import React, { useState } from "react";
import Button from "../../ui/Button/Button";
import "../../ui/CrudTable/crudTable.css";

const StaffForm = ({ editMode, closeWindow }) => {
  const [formData, setFormData] = useState(
    editMode || {
      name: "",
      staffEmail: "",   // personal email (required)
      staffPhone: "",
      staffAddress: "",
      jobTitle: "",
      salary: "",
    }
  );

  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Handle input change
  // -----------------------------
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------
  // Submit form
  // -----------------------------
  const onSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const method = editMode ? "PUT" : "POST";
      const url = editMode
        ? `${process.env.REACT_APP_API_URL}/api/staff/${editMode._id}`
        : `${process.env.REACT_APP_API_URL}/api/staff`;

      const payload = {
        name: formData.name,
        jobTitle: formData.jobTitle,
        staffEmail: formData.staffEmail,
        staffPhone: formData.staffPhone,
        staffAddress: formData.staffAddress,
        salary: formData.salary,

        // only required on CREATE
        password: editMode ? undefined : "its nothing serious",
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Error saving staff");
      }

      const result = await response.json();
      console.log("Success:", result);

      closeWindow();

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crud-table-wrapper">
      <div className="crud-table-content">
        {/* HEADER */}
        <div className="crud-table-header">
          <h3>{editMode ? "Edit Staff" : "Add Staff"}</h3>
          <button className="close-table" onClick={closeWindow}>
            &times;
          </button>
        </div>

        {/* BODY */}
        <div className="crud-table-body">
          <form onSubmit={onSubmit}>
            <div className="form-column">

              <div className="form-group">
                <label>Staff Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Personal Email *</label>
                <input
                  type="email"
                  name="staffEmail"
                  value={formData.staffEmail}
                  onChange={onChange}
                  required
                  disabled={!!editMode}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="staffPhone"
                  value={formData.staffPhone}
                  onChange={onChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="staffAddress"
                  value={formData.staffAddress}
                  onChange={onChange}
                  className="form-control"
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
                />
              </div>

              {!editMode && (
                <small>
                  Login email & password will be generated and sent automatically.
                </small>
              )}
            </div>

            {/* FOOTER */}
            <div className="crud-table-footer">
              <Button variant="text" onClick={closeWindow} disabled={loading}>
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                isLoading={loading}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaffForm;
