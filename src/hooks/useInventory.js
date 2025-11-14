import {useEffect, useState } from "react";
import {getItems,saveItem,deleteItem} from '../api/inventoryApi';

export const useInventory = ({search="",sort="newest",category="",stock=""}={})=>{
    const [items,setItems]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);

    //fetch items
    const fetchItems = async()=>{
        setLoading(true);
        setError(null);
        try{
            const  data = await getItems({search,category,sort});
            setItems(data);
        }
        catch(err){
            setError(err.message||"Failed to fetch Items.")
        }
        finally{
            setLoading(false);
        }
    }

    //Create or update items
    const saveItembyId= async(item)=>{
        try{
            const saved = await saveItem(item);

            //if exists, update
            if(item._id){
                setItems(prev=> prev.map(c=>(c._id ===saved._id ? saved :c)));

            }
            else{
                //if new ,create
                setItems(prev=>[saved,...prev]);
            }
            return saved;
        }
        catch(err){
            setError(err.message||"Failed to save item.");
            throw err;
        }
    };

    //Delete item
    const deleteItemById = async(id)=>{
        try{
await deleteItem(id);
setItems(prev=>prev.filter(c=>c._id !==id));

        }
        catch(err){
            setError(err.message||"Failed to delete item");
        }
    };

    useEffect(()=>{
        fetchItems();
    },[search,sort,category]);

    return {
        items,loading,error,getItems,deleteItemById,saveItembyId
    }


}
