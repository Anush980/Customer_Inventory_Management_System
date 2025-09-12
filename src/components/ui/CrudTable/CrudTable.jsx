import React from "react";
import "./crudTable.css";
import CustomerForm from "../../customer/CustomerForm/CustomerForm";
import InventoryForm from "../../inventory/InventoryForm";
import SalesForm from "../../sales/SalesForm";


const CrudTable = ({ variant, editMode, closeWindow }) => {

  return (
    <div className="crud-table">
      {variant === "customer" && (
        <CustomerForm editMode={editMode} closeWindow={closeWindow} />
      )}
      {variant === "sales" && (
        <SalesForm editMode={editMode} closeWindow={closeWindow} />
      )} 
      {variant === "inventory" && (
        <InventoryForm editMode={editMode} closeWindow={closeWindow} />
      )}
    </div>
  );
};
export default CrudTable;
