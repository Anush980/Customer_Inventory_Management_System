const BASE_URL= `${process.env.REACT_APP_API_URL}/api/inventory`;

//fetch inventory with optional filters
export const getItems = async ({search="",category="",sort="newest"}={})=>{
    const query = new URLSearchParams();
    if(search) query.append("search",search);
    if(category) query.append("category",category);
    if(sort) query.append("sort",sort);

    const res = await fetch(`${BASE_URL}?${query.toString()}`);
    if(!res.ok) throw new Error ("Failed to fetch items.");
    return res.json();
};

//create or update item
export const saveItem= async (item)=>{
    const method= item._id ?"PUT":"POST";
    const url = item._id ? `${BASE_URL}/${item._id}`:BASE_URL;

    const res= await fetch (url,{
        method,
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(item),
    });
    if(!res.ok) throw new Error ("Failed to save item.")
}

//delete item
export const deleteItem = async (id)=>{
    const res = await fetch(`${BASE_URL}/${id}`,{
        method:"DELETE"
    });
    if(!res.ok) throw new Error ("Failed to delete item.");
    return res.json();
};