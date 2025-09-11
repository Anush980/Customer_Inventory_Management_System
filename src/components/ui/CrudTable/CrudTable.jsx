import React from "react";
import "./crudTable.css";
import CustomerForm from "../../customer/CustomerForm/CustomerForm";


const CrudTable = ({ variant, editMode, closeWindow }) => {

  return (
    <div className="crud-table">
      {variant === "customer" && (
        <CustomerForm editMode={editMode} closeWindow={closeWindow} />
      )}
      {/* {variant === "sales" && (
        <SalesForm editMode={editMode} closeWindow={closeWindow} />
      )}
      {variant === "inventory" && (
        <InventoryForm editMode={editMode} closeWindow={closeWindow} />
      )} */}
    </div>
  );
};
export default CrudTable;
