const BASE_URL= `${process.env.REACT_APP_API_URL}/api/customer`;

 export const getCustomers = async ({search="",category="",sort="newest"}={})=>{

    const query= new URLSearchParams();

    if(search) query.append("search",search);
    if(category) query.append("category",category);
    if(sort) query.append("sort",sort);

    const res = await fetch (`${BASE_URL}?${query.toString()}`);
    if(!res.ok) throw new Error ("Failed to fetch Customers"); 
    return res.json();

};

 export const deleteCustomer = async (id)=>{
    const res = await fetch(`${BASE_URL}/${id}`,{
        method:"DELETE"
    });
    if(!res.ok) throw new Error ("Failed to delete customer");
    return res.json();

};
