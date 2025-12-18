import React, { useEffect, useState } from "react";
import Layout from "../../components/ui/Layout/Layout";
import Button from "../../components/ui/Button/Button";
import './profilePage.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    shopName: "",
    email: "",
  });
  const [newPassword, setNewPassword] = useState("");

  // Fetch profile
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(data);
        setFormData({
          name: data.name,
          jobTitle: data.jobTitle,
          shopName: data.shopName,
          email: data.email,
        });
      } else alert(data.message || "Failed to fetch profile");
    } catch (err) {
      console.error(err);
      alert("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  // Update profile info
  const handleProfileUpdate = async () => {
    if (!formData.name || !formData.jobTitle || !formData.shopName) {
      return alert("Please fill all fields");
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: formData.name,
          jobTitle: formData.jobTitle,
          shopName: formData.shopName,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(data);
        setEditMode(false);
        alert("Profile updated successfully");
      } else alert(data.message || "Failed to update profile");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Update password
  const handlePasswordUpdate = async () => {
    if (!newPassword) return alert("Enter a new password");
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/profile/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setNewPassword("");
        alert("Password updated successfully");
      } else alert(data.message || "Failed to update password");
    } catch (err) {
      console.error(err);
      alert("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading || !profile) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <div className="profile-page">
        <h2>My Profile</h2>

        {/* Personal Details */}
        <div className="profile-section">
          <h4>Personal Details</h4>

          <div className="profile-field">
            <label>Name:</label>
            {editMode ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            ) : (
              <span>{profile.name}</span>
            )}
          </div>

          <div className="profile-field">
            <label>Email:</label>
            <span>{profile.email}</span>
          </div>

          <div className="profile-field">
            <label>Job Title:</label>
            {editMode ? (
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              />
            ) : (
              <span>{profile.jobTitle}</span>
            )}
          </div>

          <div className="profile-field">
            <label>Shop:</label>
            {editMode ? (
              <input
                type="text"
                value={formData.shopName}
                onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
              />
            ) : (
              <span>{profile.shopName}</span>
            )}
          </div>

          <div className="profile-actions">
            {editMode ? (
              <>
                <Button variant="primary" onClick={handleProfileUpdate} isLoading={loading}>
                  Save
                </Button>
                <Button variant="text" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="secondary" onClick={() => setEditMode(true)}>
                Edit Details
              </Button>
            )}
          </div>
        </div>

        {/* Change Password */}
        <div className="profile-section">
          <h4>Change Password</h4>
          <div className="profile-field">
            <label>New Password:</label>
            <input
              type="text"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="form-control"
            />
          </div>
          <Button variant="primary" onClick={handlePasswordUpdate} isLoading={loading}>
            Update Password
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
