import React, { useState } from "react";
import crudTableVarient from "../../../data/crudTableVarient";
import Button from "../Button/Button";
import "./crudTable.css";

const CrudTable = ({ variant, itemToEdit, closeWindow, handleSubmit }) => {
  const config = crudTableVarient[variant][0];
  const fields = Object.keys(config).filter((key) => key !== "heading");
  const [formData, setFormData] = useState(itemToEdit || {});
  const [loading,setLoading] = useState(false);

  
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
              <Button variant="text" onClick={closeWindow}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" onClick={closeWindow} isLoading={loading}>
                Save
              </Button>
             
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CrudTable;

// import React, { useState } from "react";
// import crudTableVarient from "../../../data/crudTableVarient";
// import Button from "../Button/Button";
// import { useForm } from "react-form-use";
// import "./crudTable.css";

// const CrudTable = ({ variant, itemToEdit, closeWindow, handleSubmit }) => {

//   const config=crudTableVarient[variant][0];
//   const fields=Object.key(config).filter((key)=>key!=="heading");

//   const {register,handleSubmit:submitForm,formState:{errors,isSubmitting}}=useForm({defaultValues:itemToEdit || {}});

//   const onSubmit =async(data)=>{
//     try{
//       await handleSubmit(data);
//       closeWindow();
//     }
//     catch(err){
//       console.error("Error Saving data.",err);
//     }
//   };
//   return(
//     <div className="crud-table-wrapper">
//       <div className="crud-table-content">
//         <div className="crud-table-header">
//           <h3>{itemToEdit?`Edit ${config.heading}`: `Add ${config.heading}`}</h3>
//           <button className="close-table" onClick={closeWindow}>
//         &times;
//           </button>
          
//         </div>
//         <div className="crud-table-body">
//           <form onSubmit={submitForm(onSubmit)}>
//             {fields.map((fieldKey)=>{
//               const {label,type,options}=config[fieldKey];
//               return(
//                 <div className="form-row" key={fieldKey}>
//                   <div className="form-group">
//                     <label>{label}</label>
//                     {type==="select"? (
//                       <select {...register(fieldKey,{require:`$label},required`})} className="form-control">
// <option  value="">select...</option>
// {options.map((option)=>(
//   <option key={option} value={option}>{option}</option>
// ))}
//                       </select>
//                     ):(
//                       <input type={type} {...register(fieldKey,{require:`${label} is required.`})} className="form-control"/>

                     
//                     )
//                   };
//                   {errors[fieldKey]&& <p className="error-message">{errors[fieldKey].message}</p>}
//                   </div>
//                 </div>
//               )
//             })}
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// };
// export default CrudTable;