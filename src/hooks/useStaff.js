import { useEffect, useState } from "react";
import { getStaffs ,saveStaff, deleteStaff } from "../api/staffApi";

export const useStaffs = ({search="",sort="newest"}={})=>{
    const [staffs,setStaffs]=useState([]);
    const [loading,setLoading]= useState(false);
    const [error, setError]= useState(null);

    //Fetch Staffs
    const fetchStaffs =async()=>{
        setLoading(true);
        setError(null);
        try{
            const data = await getStaffs({search,sort});
            setStaffs(data);
        }
        catch(err){
            setError( "No customers found.");
        }
        finally{
            setLoading(false);
        }
    }

    //Create or update Staff
    const saveStaffById= async (customer)=>{
        try{
            const saved = await saveStaff(customer);

            //If exists, udpate
            if(customer._id){
                setStaffs(prev=>
                    prev.map(c=>(c._id === saved._id ? saved : c))
                );
            }
            else{
                //If new ,create
                setStaffs(prev=> [saved,...prev]);
            }
            return saved;
        }
        catch(err){
            setError(err.message || "Failed to save staff");
            throw err;
        }
    };

    //Delete staff
const deleteStaffById = async(id)=>{
    try{
        await deleteStaff(id);
        setStaffs(prev=>prev.filter(c=>c._id !==id));
    }
    catch(err){
        setError(err.message || "Failed to delete staff.")
    }
};

useEffect(()=>{
    fetchStaffs();
},[search,sort]);

return {
    staffs,loading,error,fetchStaffs,deleteStaffById,saveStaffById
};

}