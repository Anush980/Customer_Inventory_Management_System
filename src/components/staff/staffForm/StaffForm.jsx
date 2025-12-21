import React, { useState } from "react";
import Button from "../../ui/Button/Button";
import "../../ui/CrudTable/crudTable.css";

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
    if (loading) return;
    setLoading(true);

    try {
      const method = editMode ? "PUT" : "POST";
      const url = editMode
        ? `${process.env.REACT_APP_API_URL}/api/staff/${editMode._id}`
        : `${process.env.REACT_APP_API_URL}/api/staff`;

      // Use FormData to handle image upload
      const form = new FormData();
      form.append("name", formData.name);
      form.append("staffEmail", formData.staffEmail);
      form.append("staffPhone", formData.staffPhone || "");
      form.append("staffAddress", formData.staffAddress || "");
      form.append("jobTitle", formData.jobTitle || "");
      form.append("salary", formData.salary || "");
      if (!editMode) form.append("password", "default123"); // only for new staff
      if (image) form.append("image", image);

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: form,
      });

      if (!response.ok) throw new Error("Error saving staff");

      const result = await response.json();
      console.log("Success:", result);

      closeWindow();
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
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
    </div>
  );
};

export default StaffForm;
