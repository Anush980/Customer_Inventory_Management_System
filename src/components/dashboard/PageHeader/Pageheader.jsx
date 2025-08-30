import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import './pageHeader.css';

const Pageheader = ({title,btnTitle}) => {
   const navigate = useNavigate(); 

  const handleButtonClick = () => {
    navigate("/sales"); 
  };
  return (
    <div className="page-header">
            <h2>Dashboard </h2>
            <button className="btn" onClick={handleButtonClick}>
              <FontAwesomeIcon icon="plus" />
              <span> New Sales</span>
            </button>
          </div>
  )
}

export default Pageheader