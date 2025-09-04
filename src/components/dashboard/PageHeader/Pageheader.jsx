import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import CrudTable from "../../ui/CrudTable/CrudTable";
import Button from '../../ui/Button/Button';
import './pageHeader.css';

const Pageheader = ({ title, btnTitle, variant }) => {
  const [crudTable, setCrudTable] = useState(false);
   const [loading, setLoading] = useState(false);

  return (
    <div className="page-header">
      <h2>{title}</h2>
      <Button variant='primary' onClick={() => setCrudTable(true)} isLoading={loading}>
      <FontAwesomeIcon icon="plus" />
        <span> {btnTitle}</span>
      </Button>

      {crudTable && (
        <CrudTable
          closeWindow={() => setCrudTable(false)}
          variant={variant}  
        />
      )}
    </div>
  )
}
export default Pageheader;