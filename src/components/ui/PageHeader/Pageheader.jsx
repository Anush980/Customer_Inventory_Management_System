import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import CrudTable from "../CrudTable/CrudTable";
import Button from '../Button/Button';
import './pageHeader.css';

const Pageheader = ({ title, btnTitle, variant,showBtn= true}) => {
  const [crudTable, setCrudTable] = useState(false);
  
   const [loading, setLoading] = useState(false);
  const [editItem, setEditItem] = useState(null);

  return (
    <div className="page-header">
      <h2>{title}</h2>
     { showBtn && <Button variant='primary' onClick={() => setCrudTable(true)}>
      <FontAwesomeIcon icon="plus" />
        <span> {btnTitle}</span>
      </Button>}

      {crudTable && (
        <CrudTable
          editMode={editItem}
          closeWindow={() => setCrudTable(false)}
          variant={variant}  
        />
      )}
    </div>
  )
}
export default Pageheader;