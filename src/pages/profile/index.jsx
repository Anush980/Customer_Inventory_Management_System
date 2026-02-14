import React, { useEffect, useState } from "react";
import Layout from "../../components/ui/Layout/Layout";
import Button from "../../components/ui/Button/Button";
import Snackbar from "../../components/ui/Snackbar/Snackbar";
import "./profilePage.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [snackbar, setSnackbar] = useState(null);

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  /* ================= FETCH PROFILE ================= */
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setProfile(data);
        setName(data.name);
        setImagePreview(data.image || "/default.jpg");
      } else {
        setSnackbar({ message: data.message || "Failed to fetch profile", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setSnackbar({ message: "Failed to fetch profile", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  /* ================= IMAGE CHANGE ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  /* ================= UPDATE PROFILE ================= */
  const handleProfileUpdate = async () => {
    if (!name) {
      setSnackbar({ message: "Name is required", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      form.append("name", name);

      if (imageFile) {
        form.append("image", imageFile);
      }

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      const data = await res.json();

      if (res.ok) {
        setProfile(data.user || data);
        setEditMode(false);
        setImageFile(null);
        setSnackbar({ message: "Profile updated successfully", type: "success" });
      } else {
        setSnackbar({ message: data.message || "Failed to update profile", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setSnackbar({ message: "Failed to update profile", type: "error" });
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

        {/* ===== PROFILE IMAGE ===== */}
        <div className="profile-image-section">
          <img
            src={imagePreview || "/default.jpg"}
            alt="Profile"
            className="profile-image"
          />

          <p className={`user-role role-${profile.role}`}>
            {profile.role.toUpperCase()}
          </p>

          {editMode && (
            <label className="change-image-btn">
              Change Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>

        {/* ===== PERSONAL DETAILS ===== */}
        <div className="profile-section">
          <h4>Personal Details</h4>

          <div className="profile-field">
            <label>Name:</label>
            {editMode ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength="30"
              />
            ) : (
              <span>{profile.name}</span>
            )}
          </div>

          <div className="profile-field">
            <label>Email:</label>
            <span>{profile.email}</span>
          </div>

          {profile.role !== "admin" && (
            <div className="profile-field">
              <label>Job Title:</label>
              <span>{profile.jobTitle}</span>
            </div>
          )}

          <div className="profile-field">
            <label>Shop:</label>
            <span>{profile.shopName}</span>
          </div>

          {/* ===== ACTIONS ===== */}
          <div className="profile-actions">
            {editMode ? (
              <>
                <Button
                  variant="primary"
                  onClick={handleProfileUpdate}
                  isLoading={loading}
                >
                  Save
                </Button>
                <Button
                  variant="text"
                  onClick={() => {
                    setEditMode(false);
                    setImageFile(null);
                    setImagePreview(profile.image || "/default.jpg");
                    setName(profile.name);
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="secondary"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* ===== SNACKBAR ===== */}
        {snackbar && (
          <Snackbar
            message={snackbar.message}
            type={snackbar.type}
            onClose={() => setSnackbar(null)}
          />
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
