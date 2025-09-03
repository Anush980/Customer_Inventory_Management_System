import React, { useState } from "react";
import crudTableVarient from "../../../data/crudTableVarient";
import "./crudTable.css";

const CrudTable = ({ variant, itemToEdit, closeWindow, handleSubmit }) => {
  const config = crudTableVarient[variant][0];
  const fields = Object.keys(config).filter((key) => key !== "heading");

  const [formData, setFormData] = useState(itemToEdit || {});

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <div className="crud-table-wrapper">
      <div className="crud-table-content">
        <div className="crud-table-header">
          <h3>{itemToEdit ? `Edit ${config.heading}` : `Add ${config.heading}`}</h3>
          <button className="close-table" onClick={closeWindow}>
            &times;
          </button>
        </div>
        <div className="crud-table-body">
          <form onSubmit={onSubmit}>
            {fields.map((fieldkey) => {
              const fieldConfig = config[fieldkey];
              const { label, type, options } = fieldConfig;
              return (
                <div className="form-row" key={fieldkey}>
                  <div className="form-group">
                    <label>{label}</label>
                    {type === "select" ? (
                      <select
                        name={fieldkey}
                        value={formData[fieldkey] || ""}
                        onChange={onChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select..</option>
                        {options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={type}
                        name={fieldkey}
                        value={formData[fieldkey] || ""}
                        onChange={onChange}
                        className="form-control"
                        required
                      />
                    )}
                  </div>
                </div>
              );
            })}
            <div className="crud-table-footer">
              <button type="button" className="btn-outline" onClick={closeWindow}>
                Cancel
              </button>
              <button type="submit" className="btn">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CrudTable;