import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import CrudTable from "../../ui/CrudTable/CrudTable";
import './pageHeader.css';

const Pageheader = ({ title, btnTitle, variant }) => {
  const [crudTable, setCrudTable] = useState(false);

  return (
    <div className="page-header">
      <h2>{title}</h2>
      <button className="btn" onClick={() => setCrudTable(true)}>
        <FontAwesomeIcon icon="plus" />
        <span> {btnTitle}</span>
      </button>

      {crudTable && (
        <CrudTable
          closeWindow={() => setCrudTable(false)}
          variant={variant}   // dynamic variant
        />
      )}
    </div>
  )
}
export default Pageheader;