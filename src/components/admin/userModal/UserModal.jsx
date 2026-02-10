import React from "react";
import UserForm from "./UserForm";

const UserModal = ({ user, isOpen, onClose, onSave, isEditMode }) => {
  if (!isOpen) return null;

  return (
    <div className="modal active">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{isEditMode ? (user?.id ? "Edit User" : "Add New User") : "View User"}</h3>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <UserForm user={user} onChange={(updated) => (user = updated)} />
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          {isEditMode && (
            <button className="btn btn-primary" onClick={() => onSave(user)}>
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserModal;
