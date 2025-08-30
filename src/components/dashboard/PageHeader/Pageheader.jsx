import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './pageHeader.css';

const Pageheader = ({title,btnTitle}) => {
  return (
    <div className="page-header">
            <h2>Dashboard </h2>
            <button className="btn">
              <FontAwesomeIcon icon="plus" />
              <span>New Order</span>
            </button>
          </div>
  )
}

export default Pageheader