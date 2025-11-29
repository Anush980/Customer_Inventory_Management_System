const BASE_URL= `${process.env.REACT_APP_API_URL}/api/sales`;

//fetch sales with optional filters
export const getSales = async ({search="",category="",sort=""}={})=>{
    const token = localStorage.getItem("token");
    const query = URLSearchParams();
     if(search) query.append("search",search);
    if(category) query.append("category",category);
    if(sort) query.append("sort",sort);

    const res = await fetch (`${BASE_URL}?${query.toString()}`,{
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    if(!res.ok) throw new Error ("Failed to fetch sales."); 
    return res.json();
};

//Create or update sales
export const saveSale = async (sale) =>{
    const token = localStorage.getItem("token");
    const method = sale._id ? "PUT":"POST";
    const url = sale._id ? `${BASE_URL}/${sale._id}` :BASE_URL;

     const res= await fetch (url,{
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify(sale),
     });
     if(!res.ok) throw new Error("Failed to save sale.")
}

//Delete sale
 export const deleteSale = async (id)=>{
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/${id}`,{
        method:"DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if(!res.ok) throw new Error ("Failed to delete sale.");
    return res.json();

};