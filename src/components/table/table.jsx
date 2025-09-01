import React from "react";
import "./table.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tableVariants } from "../../data/tableData";

const Table = ({ variant = "sales", limit = 5, editable = false }) => {
  const tableInfo = tableVariants[variant];
  const displayData = limit ? tableInfo.data.slice(0, limit) : tableInfo.data;

  const getStatusClass = (status) => {
    switch ((status || "").toLowerCase()) {
      case "completed":
      case "available":
        return "status completed";
      case "pending":
      case "low-stock":
        return "status pending";
      case "cancelled":
        return "status cancelled";
      default:
        return "status";
    }
  };

  return (
    <div className="card">
                        <div className="card-header">
                            <h3>{tableInfo.title}</h3>
                            <Link to='/sales' className="viewbtn">View All</Link>
                        </div>
    <div className="table-responsive">
      <table>
        <thead>
          <tr>
            {tableInfo.columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {editable && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {displayData.map((row) => (
            <tr key={row.id}>
              {tableInfo.columns.map((col) => (
                <td key={col.key}>
                  {col.key === "status" ? (
                    <span className={getStatusClass(row[col.key])}>
                      {row[col.key] || "Null"}
                    </span>
                  ) : (
                    row[col.key] || "Null"
                  )}
                </td>
              ))}
              {editable && (
                <td>
                 <div className="action-btns">
                                        <button className="action-btn edit">
                                           <FontAwesomeIcon icon="pen-to-square"/>
                                        </button>
                                        <button className="action-btn delete">
                                            <FontAwesomeIcon icon="trash-can"/>
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
