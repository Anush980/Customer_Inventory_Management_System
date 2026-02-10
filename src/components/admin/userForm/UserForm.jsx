// src/components/admin/userForm/UserForm.jsx
import React, { useState, useEffect } from "react";
import Button from "../../ui/Button/Button";
import "../../ui/CrudTable/crudTable.css";

const UserForm = ({ editMode, closeWindow, onSubmitForm }) => {
  const [formData, setFormData] = useState(
    editMode || {
      name: "",
      email: "",
      password: "stockmate@123", // default password for new user
      phone: "",
      role: "staff",
      shopName: "",
      staffEmail: "",
      staffPhone: "",
      jobTitle: "staff",
      staffAddress: "",
      salary: 0,
      permissions: { canEdit: false, canDelete: false },
      isBlocked: false,
    }
  );

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  // Handle input changes
  const onChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "canEdit" || name === "canDelete") {
        setFormData((prev) => ({
          ...prev,
          permissions: { ...prev.permissions, [name]: checked },
        }));
      } else if (name === "isBlocked") {
        setFormData((prev) => ({ ...prev, isBlocked: checked }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit form
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const submitData = { ...formData };

      // Include image if uploaded
      if (image) submitData.image = image;

      // Ensure password is included for new users
      if (!editMode && !submitData.password) submitData.password = "stockmate@123";

      await onSubmitForm(submitData);
      closeWindow();
    } catch (err) {
      console.error("Error saving user:", err);
    } finally {
      setLoading(false);
    }
  };

  // Reset form when editMode changes
  useEffect(() => {
    if (editMode) {
      setFormData(editMode);
    } else {
      setFormData({
        name: "",
        email: "",
        password: "stockmate@123", // default for new user
        phone: "",
        role: "staff",
        shopName: "",
        staffEmail: "",
        staffPhone: "",
        jobTitle: "",
        staffAddress: "",
        salary: 0,
        permissions: { canEdit: false, canDelete: false },
        isBlocked: false,
      });
    }
    setImage(null);
  }, [editMode]);

  return (
    <div className="crud-table-wrapper">
      <div className="crud-table-content">
        <div className="crud-table-header">
          <h3>{editMode ? "Edit User" : "Add User"}</h3>
          <button className="close-table" onClick={closeWindow}>
            &times;
          </button>
        </div>

        <div className="crud-table-body">
          <form onSubmit={onSubmit}>
            <div className="form-column">
              {/* Name */}
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  placeholder="Enter Name"
                  required
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  placeholder="Enter Email"
                  required
                />
              </div>

              {/* Password — only show when adding a new user */}
              {!editMode && (
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={onChange}
                    placeholder="Enter Password"
                    required
                  />
                </div>
              )}

              {/* Role */}
              <div className="form-group">
                <label>Role:</label>
                <select name="role" value={formData.role} onChange={onChange}>
                  <option value="admin">Admin</option>
                  <option value="owner">Owner</option>
                  <option value="staff">Staff</option>
                </select>
              </div>

              {/* Phone */}
              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  type="text"
                  value={
                    formData.role === "staff"
                      ? formData.staffPhone
                      : formData.phone
                  }
                  onChange={(e) => {
                    const { value } = e.target;
                    if (formData.role === "staff") {
                      setFormData((prev) => ({ ...prev, staffPhone: value }));
                    } else {
                      setFormData((prev) => ({ ...prev, phone: value }));
                    }
                  }}
                  placeholder="Enter Phone Number"
                  required
                />
              </div>

              {/* Shop Name for owner/staff */}
              {formData.role !== "admin" && (
                <div className="form-group">
                  <label>Shop Name:</label>
                  <input
                    type="text"
                    name="shopName"
                    value={formData.shopName}
                    onChange={onChange}
                    placeholder="Shop Name"
                    required
                  />
                </div>
              )}

              {/* Staff-specific fields */}
              {formData.role === "staff" && (
                <>
                  <div className="form-group">
                    <label>Staff Email:</label>
                    <input
                      type="email"
                      name="staffEmail"
                      value={formData.staffEmail}
                      onChange={onChange}
                      placeholder="Staff Email"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Job Title:</label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={onChange}
                      placeholder="Job Title"
                    />
                  </div>

                  <div className="form-group">
                    <label>Salary:</label>
                    <input
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={onChange}
                      placeholder="Salary"
                    />
                  </div>

                  <div className="form-group">
                    <label>Permissions:</label>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          name="canEdit"
                          checked={formData.permissions.canEdit}
                          onChange={onChange}
                        />{" "}
                        Can Edit
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="canDelete"
                          checked={formData.permissions.canDelete}
                          onChange={onChange}
                        />{" "}
                        Can Delete
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* Blocked */}
              <div className="form-group">
                <label>Blocked:</label>
                <input
                  type="checkbox"
                  name="isBlocked"
                  checked={formData.isBlocked}
                  onChange={onChange}
                />
              </div>

              {/* Profile Image */}
              <div className="form-group">
                <label>Profile Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>

            <div className="crud-table-footer">
              <Button variant="text" onClick={closeWindow}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" isLoading={loading}>
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
