const BASE_URL= `${process.env.REACT_APP_API_URL}/api/customer`;

//fetch customer with optional filters
 export const getCustomers = async ({search="",category="",sort="newest"}={})=>{

    const query= new URLSearchParams();

    if(search) query.append("search",search);
    if(category) query.append("category",category);
    if(sort) query.append("sort",sort);

    const res = await fetch (`${BASE_URL}?${query.toString()}`);
    if(!res.ok) throw new Error ("Failed to fetch customers."); 
    return res.json();

};

//Create or update customer
export const saveCustomer = async (customer) =>{
    const method = customer._id ? "PUT":"POST";
    const url = customer._id ? `${BASE_URL}/${customer._id}` :BASE_URL;

     const res= await fetch (url,{
        method,
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(customer),
     });
     if(!res.ok) throw new Error("Failed to save customer.")
}

//Delete customer 
 export const deleteCustomer = async (id)=>{
    const res = await fetch(`${BASE_URL}/${id}`,{
        method:"DELETE"
    });
    if(!res.ok) throw new Error ("Failed to delete customer.");
    return res.json();

};
