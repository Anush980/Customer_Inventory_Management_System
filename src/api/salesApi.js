const BASE_URL= `${process.env.REACT_APP_API_URL}/api/sales`;

//fetch sales with optional filters
export const getSales = async ({search="",category="",sort=""}={})=>{
    const query = URLSearchParams();
     if(search) query.append("search",search);
    if(category) query.append("category",category);
    if(sort) query.append("sort",sort);

    const res = await fetch (`${BASE_URL}?${query.toString()}`);
    if(!res.ok) throw new Error ("Failed to fetch sales."); 
    return res.json();
};

//Create or update sales
export const saveSale = async (sale) =>{
    const method = sale._id ? "PUT":"POST";
    const url = sale._id ? `${BASE_URL}/${sale._id}` :BASE_URL;

     const res= await fetch (url,{
        method,
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(sale),
     });
     if(!res.ok) throw new Error("Failed to save sale.")
}

//Delete sale
 export const deleteSale = async (id)=>{
    const res = await fetch(`${BASE_URL}/${id}`,{
        method:"DELETE"
    });
    if(!res.ok) throw new Error ("Failed to delete sale.");
    return res.json();

};