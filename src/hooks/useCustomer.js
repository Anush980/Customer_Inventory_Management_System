import { useEffect, useState } from "react";
import { getCustomers ,saveCustomer, deleteCustomer } from "../api/customerApi";

export const useCustomers = ({search="",sort="newest"}={})=>{
    const [customers,setCustomers]=useState([]);
    const [loading,setLoading]= useState(false);
    const [error, setError]= useState(null);

    //Fetch Customer
    const fetchCustomers =async()=>{
        setLoading(true);
        setError(null);
        try{
            const data = await getCustomers({search,sort});
            setCustomers(data);
        }
        catch(err){
            setError(err.message || "Failed to fetch customers.");
        }
        finally{
            setLoading(false);
        }
    }

    //Create or update Customer
    const saveCustomerById= async (customer)=>{
        try{
            const saved = await saveCustomer(customer);

            //If exists, udpate
            if(customer._id){
                setCustomers(prev=>
                    prev.map(c=>(c._id === saved._id ? saved : c))
                );
            }
            else{
                //If new ,create
                setCustomers(prev=> [saved,...prev]);
            }
            return saved;
        }
        catch(err){
            setError(err.message || "Failed to save customer");
            throw err;
        }
    };

    //Delete customer
const deleteCustomerById = async(id)=>{
    try{
        await deleteCustomer(id);
        setCustomers(prev=>prev.filter(c=>c._id !==id));
    }
    catch(err){
        setError(err.message || "Failed to delete customer.")
    }
};

useEffect(()=>{
    fetchCustomers();
},[search,sort]);

return {
    customers,loading,error,fetchCustomers,deleteCustomerById,saveCustomerById
};

}