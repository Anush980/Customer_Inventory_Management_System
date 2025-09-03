import React, { useEffect, useState } from "react";
import "./table.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tableVariants } from "../../data/tableData";
import tableColumns from "../../data/tableColumns";

const Table = ({ variant = "sales", limit, editable = false,onEdit,onDelete}) => {
  const tableInfo = tableVariants[variant];
  const columns = tableColumns[variant] || [];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Display only limited data if needed
  const displayData = limit ? data.slice(0, limit) : data;

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/api/${variant}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((items) => {
        setData(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [variant]);

  const getStatusClass = (status) => {
    switch (status || "") {
      case "Completed":
      case "Available":
        return "status completed";
      case "Pending":
      case "Limited":
        return "status pending";
      case "Cancelled":
      case "No Stock":
        return "status cancelled";
      default:
        return "status";
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="card">
      <div className="card-header">
        <h3>{tableInfo.title}</h3>
        <Link to={`/${variant}`} className="viewbtn">
          View All
        </Link>
      </div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
              {editable && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, index) => (
              <tr key={row._id || index}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.key === "status" ? (
                      <span className={getStatusClass(row[col.key])}>
                        {row[col.key] || "Null"}
                      </span>
                    ) : (
                      row[col.key] ?? "Null"
                    )}
                  </td>
                ))}
                {editable && (
                  <td>
                    <div className="action-btns">
                      <button className="action-btn edit"onClick={() => onEdit && onEdit(row)}>
                        <FontAwesomeIcon icon="pen-to-square" />
                      </button>
                      <button className="action-btn delete" onClick={() => onDelete && onDelete(row)}>
                        <FontAwesomeIcon icon="trash-can" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
