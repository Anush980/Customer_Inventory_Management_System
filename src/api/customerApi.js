const BASE_URL= `${process.env.REACT_APP_API_URL}/api/customer`;

 const getCustomers = async ()=>{
    const res = await fetch (BASE_URL);
    if(!res.ok) throw new Error ("Failed to fetch Customers"); 
    return res.json();

};

const deleteCustomers = async (id)=>{
    const res = await fetch(`${BASE_URL}/${id}`,{
        method:"Delete"
    });
    if(!res.ok) throw new Error ("Failed to fdelete customer");
    return res.json();

};